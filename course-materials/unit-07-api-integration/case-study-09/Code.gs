/**
 * 實作案例 9：天氣查詢 Web App
 * 
 * 功能：
 * - 整合 OpenWeatherMap API 查詢天氣
 * - 實作快取機制減少 API 呼叫
 * - 完整的錯誤處理
 * - 使用者友善的 Web 介面
 */

// ==================== 設定與初始化 ====================

/**
 * 設定 OpenWeatherMap API Key（只需執行一次）
 * 
 * 使用說明：
 * 1. 到 https://openweathermap.org/api 註冊免費帳號
 * 2. 取得 API Key
 * 3. 將下方的 'your_api_key_here' 替換為你的 API Key
 * 4. 執行此函式
 */
function setupApiKey() {
  var apiKey = 'your_api_key_here';  // 請替換為你的 API Key
  
  if (apiKey === 'your_api_key_here') {
    Logger.log('❌ 請先設定你的 API Key');
    return;
  }
  
  PropertiesService.getScriptProperties().setProperty('WEATHER_API_KEY', apiKey);
  Logger.log('✅ API Key 已設定');
}

/**
 * 檢查 API Key 是否已設定
 */
function checkApiKey() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (apiKey) {
    Logger.log('✅ API Key 已設定');
    Logger.log('Key: ' + apiKey.substring(0, 8) + '****');
  } else {
    Logger.log('❌ 尚未設定 API Key');
    Logger.log('請執行 setupApiKey() 函式');
  }
}

// ==================== Web App 入口 ====================

/**
 * Web App 的 GET 請求處理
 * 當使用者訪問 Web App URL 時會執行此函式
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('天氣查詢')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ==================== 核心功能 ====================

/**
 * 查詢城市天氣（主要函式）
 * 
 * @param {string} city - 城市名稱（英文）
 * @return {Object} 天氣資訊或錯誤訊息
 */
function getWeather(city) {
  // 驗證輸入
  if (!city || city.trim() === '') {
    return {
      success: false,
      error: '請輸入城市名稱'
    };
  }
  
  city = city.trim();
  
  // 檢查 API Key
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  if (!apiKey) {
    return {
      success: false,
      error: '系統設定錯誤：未設定 API Key'
    };
  }
  
  // 檢查快取
  var cachedData = getCachedWeather(city);
  if (cachedData) {
    Logger.log('✅ 從快取取得 ' + city + ' 的天氣資料');
    return cachedData;
  }
  
  // 呼叫 API
  Logger.log('📡 呼叫 API 查詢 ' + city + ' 的天氣');
  
  var url = 'https://api.openweathermap.org/data/2.5/weather' +
            '?q=' + encodeURIComponent(city) +
            '&appid=' + apiKey +
            '&units=metric' +
            '&lang=zh_tw';
  
  try {
    var response = UrlFetchApp.fetch(url, {
      'muteHttpExceptions': true
    });
    
    var statusCode = response.getResponseCode();
    
    // 成功
    if (statusCode === 200) {
      var data = JSON.parse(response.getContentText());
      var weatherData = formatWeatherData(data);
      
      // 儲存到快取（10 分鐘）
      cacheWeatherData(city, weatherData);
      
      return weatherData;
    }
    
    // 錯誤處理
    if (statusCode === 404) {
      return {
        success: false,
        error: '找不到城市「' + city + '」，請檢查拼字是否正確'
      };
    }
    
    if (statusCode === 401) {
      return {
        success: false,
        error: 'API Key 無效或已過期'
      };
    }
    
    if (statusCode === 429) {
      return {
        success: false,
        error: '請求次數過多，請稍後再試'
      };
    }
    
    return {
      success: false,
      error: 'API 錯誤（狀態碼：' + statusCode + '）'
    };
    
  } catch (error) {
    Logger.log('❌ API 呼叫失敗：' + error.message);
    return {
      success: false,
      error: '網路錯誤，請稍後再試'
    };
  }
}

/**
 * 格式化 API 回應資料
 * 
 * @param {Object} apiData - OpenWeatherMap API 回應
 * @return {Object} 格式化後的天氣資料
 */
function formatWeatherData(apiData) {
  return {
    success: true,
    data: {
      city: apiData.name,
      country: apiData.sys.country,
      temperature: Math.round(apiData.main.temp * 10) / 10,
      feelsLike: Math.round(apiData.main.feels_like * 10) / 10,
      tempMin: Math.round(apiData.main.temp_min * 10) / 10,
      tempMax: Math.round(apiData.main.temp_max * 10) / 10,
      humidity: apiData.main.humidity,
      pressure: apiData.main.pressure,
      description: apiData.weather[0].description,
      main: apiData.weather[0].main,
      icon: apiData.weather[0].icon,
      windSpeed: apiData.wind.speed,
      windDeg: apiData.wind.deg || 0,
      clouds: apiData.clouds.all,
      visibility: apiData.visibility / 1000, // 轉換為公里
      sunrise: new Date(apiData.sys.sunrise * 1000).toLocaleTimeString('zh-TW', {hour: '2-digit', minute: '2-digit'}),
      sunset: new Date(apiData.sys.sunset * 1000).toLocaleTimeString('zh-TW', {hour: '2-digit', minute: '2-digit'})
    },
    fromCache: false,
    timestamp: new Date().toLocaleString('zh-TW')
  };
}

// ==================== 快取管理 ====================

/**
 * 從快取取得天氣資料
 * 
 * @param {string} city - 城市名稱
 * @return {Object|null} 快取的天氣資料或 null
 */
function getCachedWeather(city) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'WEATHER_' + city.toLowerCase();
  
  var cached = cache.get(cacheKey);
  
  if (cached) {
    var data = JSON.parse(cached);
    data.fromCache = true;
    return data;
  }
  
  return null;
}

/**
 * 將天氣資料儲存到快取
 * 
 * @param {string} city - 城市名稱
 * @param {Object} weatherData - 天氣資料
 */
function cacheWeatherData(city, weatherData) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'WEATHER_' + city.toLowerCase();
  var cacheTime = 600; // 10 分鐘
  
  cache.put(cacheKey, JSON.stringify(weatherData), cacheTime);
  Logger.log('💾 已快取 ' + city + ' 的天氣資料（' + cacheTime + ' 秒）');
}

/**
 * 清除特定城市的快取
 * 
 * @param {string} city - 城市名稱
 */
function clearWeatherCache(city) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'WEATHER_' + city.toLowerCase();
  
  cache.remove(cacheKey);
  Logger.log('🗑️ 已清除 ' + city + ' 的快取');
}

/**
 * 清除所有天氣快取
 */
function clearAllWeatherCache() {
  var cache = CacheService.getScriptCache();
  cache.removeAll(['WEATHER_']);
  Logger.log('🗑️ 已清除所有天氣快取');
}

// ==================== 進階功能 ====================

/**
 * 查詢多個城市的天氣
 * 
 * @param {Array} cities - 城市名稱陣列
 * @return {Array} 多個城市的天氣資料
 */
function getMultipleCitiesWeather(cities) {
  if (!Array.isArray(cities) || cities.length === 0) {
    return {
      success: false,
      error: '請提供城市清單'
    };
  }
  
  var results = [];
  
  for (var i = 0; i < cities.length; i++) {
    var result = getWeather(cities[i]);
    results.push(result);
    
    // 避免請求過快
    if (i < cities.length - 1) {
      Utilities.sleep(200);
    }
  }
  
  return {
    success: true,
    data: results
  };
}

/**
 * 取得天氣圖示 URL
 * 
 * @param {string} iconCode - 圖示代碼（例如：'01d'）
 * @return {string} 圖示 URL
 */
function getWeatherIconUrl(iconCode) {
  return 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
}

// ==================== 測試函式 ====================

/**
 * 測試天氣查詢功能
 */
function testWeatherQuery() {
  Logger.log('=== 測試天氣查詢 ===');
  
  // 測試 1：正常查詢
  Logger.log('\n1. 測試正常查詢（Taipei）');
  var result1 = getWeather('Taipei');
  if (result1.success) {
    Logger.log('✅ 成功');
    Logger.log('城市：' + result1.data.city);
    Logger.log('溫度：' + result1.data.temperature + '°C');
    Logger.log('天氣：' + result1.data.description);
    Logger.log('資料來源：' + (result1.fromCache ? '快取' : 'API'));
  } else {
    Logger.log('❌ 失敗：' + result1.error);
  }
  
  // 測試 2：快取測試
  Logger.log('\n2. 測試快取（再次查詢 Taipei）');
  var result2 = getWeather('Taipei');
  if (result2.success) {
    Logger.log('✅ 成功');
    Logger.log('資料來源：' + (result2.fromCache ? '快取' : 'API'));
  }
  
  // 測試 3：錯誤處理（城市不存在）
  Logger.log('\n3. 測試錯誤處理（不存在的城市）');
  var result3 = getWeather('InvalidCityName123');
  if (!result3.success) {
    Logger.log('✅ 正確處理錯誤');
    Logger.log('錯誤訊息：' + result3.error);
  }
  
  // 測試 4：空輸入
  Logger.log('\n4. 測試空輸入');
  var result4 = getWeather('');
  if (!result4.success) {
    Logger.log('✅ 正確處理空輸入');
    Logger.log('錯誤訊息：' + result4.error);
  }
  
  Logger.log('\n=== 測試完成 ===');
}

/**
 * 測試多城市查詢
 */
function testMultipleCities() {
  Logger.log('=== 測試多城市查詢 ===');
  
  var cities = ['Taipei', 'Tokyo', 'Seoul', 'Bangkok'];
  var result = getMultipleCitiesWeather(cities);
  
  if (result.success) {
    Logger.log('✅ 成功查詢 ' + result.data.length + ' 個城市');
    
    result.data.forEach(function(cityData) {
      if (cityData.success) {
        Logger.log(cityData.data.city + ': ' + cityData.data.temperature + '°C, ' + cityData.data.description);
      } else {
        Logger.log('查詢失敗：' + cityData.error);
      }
    });
  } else {
    Logger.log('❌ 失敗：' + result.error);
  }
}

// ==================== 工具函式 ====================

/**
 * 取得 API 使用統計
 */
function getApiUsageStats() {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  var key = 'API_USAGE_WEATHER_' + today;
  
  var count = parseInt(props.getProperty(key) || '0');
  
  Logger.log('=== API 使用統計 ===');
  Logger.log('日期：' + today);
  Logger.log('使用次數：' + count);
  Logger.log('免費配額：1000 次/天');
  Logger.log('剩餘：' + (1000 - count) + ' 次');
}

/**
 * 記錄 API 使用
 */
function trackApiUsage() {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  var key = 'API_USAGE_WEATHER_' + today;
  
  var count = parseInt(props.getProperty(key) || '0');
  count++;
  props.setProperty(key, count.toString());
  
  return count;
}
