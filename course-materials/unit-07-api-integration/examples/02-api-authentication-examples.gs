/**
 * API 認證範例
 * 
 * 本檔案包含各種 API 認證方式的範例：
 * - API Key 認證
 * - Bearer Token 認證
 * - Basic Authentication
 * - 使用 PropertiesService 安全儲存認證資訊
 */

// ==================== API Key 認證 ====================

/**
 * 範例 1：API Key 在 URL 參數中
 * 適用於：OpenWeatherMap、Google Maps API 等
 */
function auth01_apiKeyInUrl() {
  // 從 PropertiesService 取得 API Key
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 API Key');
    Logger.log('執行 setupApiKeys() 函式來設定');
    return;
  }
  
  var city = 'Taipei';
  var url = 'https://api.openweathermap.org/data/2.5/weather' +
            '?q=' + encodeURIComponent(city) +
            '&appid=' + apiKey +
            '&units=metric' +
            '&lang=zh_tw';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('✅ 認證成功');
    Logger.log('城市：' + data.name);
    Logger.log('溫度：' + data.main.temp + '°C');
    Logger.log('天氣：' + data.weather[0].description);
    
  } catch (error) {
    Logger.log('❌ 認證失敗：' + error.message);
  }
}

/**
 * 範例 2：API Key 在 HTTP 標頭中
 * 適用於：許多 RESTful API
 */
function auth02_apiKeyInHeader() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('CUSTOM_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 API Key');
    return;
  }
  
  var url = 'https://api.example.com/data';
  
  var options = {
    'method': 'get',
    'headers': {
      'X-API-Key': apiKey,
      'Accept': 'application/json'
    },
    'muteHttpExceptions': true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      Logger.log('✅ 認證成功');
      Logger.log(response.getContentText());
    } else if (statusCode === 401) {
      Logger.log('❌ 認證失敗：API Key 無效');
    } else if (statusCode === 403) {
      Logger.log('❌ 認證失敗：沒有權限');
    } else {
      Logger.log('❌ 請求失敗，狀態碼：' + statusCode);
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 範例 3：多個 API Key 的管理
 */
function auth03_multipleApiKeys() {
  var props = PropertiesService.getScriptProperties();
  
  // 取得不同服務的 API Key
  var weatherKey = props.getProperty('WEATHER_API_KEY');
  var mapsKey = props.getProperty('MAPS_API_KEY');
  var newsKey = props.getProperty('NEWS_API_KEY');
  
  Logger.log('=== API Key 狀態 ===');
  Logger.log('天氣 API: ' + (weatherKey ? '✅ 已設定' : '❌ 未設定'));
  Logger.log('地圖 API: ' + (mapsKey ? '✅ 已設定' : '❌ 未設定'));
  Logger.log('新聞 API: ' + (newsKey ? '✅ 已設定' : '❌ 未設定'));
}

// ==================== Bearer Token 認證 ====================

/**
 * 範例 4：Bearer Token 認證
 * 適用於：OAuth 2.0、JWT 認證等
 */
function auth04_bearerToken() {
  var accessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
  
  if (!accessToken) {
    Logger.log('❌ 請先設定 Access Token');
    return;
  }
  
  var url = 'https://api.example.com/user/profile';
  
  var options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/json'
    },
    'muteHttpExceptions': true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      Logger.log('✅ 認證成功');
      var data = JSON.parse(response.getContentText());
      Logger.log('使用者資料：');
      Logger.log(JSON.stringify(data, null, 2));
    } else if (statusCode === 401) {
      Logger.log('❌ Token 無效或已過期');
    } else {
      Logger.log('❌ 請求失敗，狀態碼：' + statusCode);
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 範例 5：Bearer Token - POST 請求
 */
function auth05_bearerTokenPost() {
  var accessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
  
  if (!accessToken) {
    Logger.log('❌ 請先設定 Access Token');
    return;
  }
  
  var url = 'https://api.example.com/posts';
  
  var data = {
    title: '新文章',
    content: '文章內容',
    tags: ['技術', 'GAS']
  };
  
  var options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    'payload': JSON.stringify(data),
    'muteHttpExceptions': true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    if (statusCode === 201) {
      Logger.log('✅ 建立成功');
      var result = JSON.parse(response.getContentText());
      Logger.log('新文章 ID：' + result.id);
    } else {
      Logger.log('❌ 建立失敗，狀態碼：' + statusCode);
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== Basic Authentication ====================

/**
 * 範例 6：Basic Authentication
 * 適用於：需要帳號密碼認證的 API
 */
function auth06_basicAuth() {
  var username = PropertiesService.getScriptProperties().getProperty('API_USERNAME');
  var password = PropertiesService.getScriptProperties().getProperty('API_PASSWORD');
  
  if (!username || !password) {
    Logger.log('❌ 請先設定帳號密碼');
    return;
  }
  
  var url = 'https://api.example.com/protected';
  
  // 建立 Basic Auth 標頭
  var credentials = username + ':' + password;
  var encodedCredentials = Utilities.base64Encode(credentials);
  
  var options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Basic ' + encodedCredentials
    },
    'muteHttpExceptions': true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      Logger.log('✅ 認證成功');
      Logger.log(response.getContentText());
    } else if (statusCode === 401) {
      Logger.log('❌ 帳號或密碼錯誤');
    } else {
      Logger.log('❌ 請求失敗，狀態碼：' + statusCode);
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 範例 7：Basic Auth 輔助函式
 */
function createBasicAuthHeader(username, password) {
  var credentials = username + ':' + password;
  return 'Basic ' + Utilities.base64Encode(credentials);
}

function auth07_useBasicAuthHelper() {
  var username = 'testuser';
  var password = 'testpass';
  
  var url = 'https://httpbin.org/basic-auth/' + username + '/' + password;
  
  var options = {
    'method': 'get',
    'headers': {
      'Authorization': createBasicAuthHeader(username, password)
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('✅ 認證成功');
    Logger.log(response.getContentText());
  } catch (error) {
    Logger.log('❌ 認證失敗');
  }
}

// ==================== PropertiesService 管理 ====================

/**
 * 範例 8：設定所有 API 認證資訊（只需執行一次）
 */
function setupApiKeys() {
  var props = PropertiesService.getScriptProperties();
  
  // 設定各種 API Key
  props.setProperties({
    // OpenWeatherMap API Key（免費註冊：https://openweathermap.org/api）
    'WEATHER_API_KEY': 'your_openweathermap_api_key_here',
    
    // 自訂 API Key
    'CUSTOM_API_KEY': 'your_custom_api_key_here',
    
    // Access Token
    'ACCESS_TOKEN': 'your_access_token_here',
    
    // 帳號密碼
    'API_USERNAME': 'your_username',
    'API_PASSWORD': 'your_password'
  });
  
  Logger.log('✅ 所有 API 認證資訊已設定');
  Logger.log('');
  Logger.log('⚠️ 重要提醒：');
  Logger.log('1. 請將上方的範例值替換為真實的 API Key');
  Logger.log('2. 不要將此檔案分享給他人');
  Logger.log('3. 不要將 API Key 上傳到公開的程式碼庫');
}

/**
 * 範例 9：查看已設定的 API Key（隱藏部分內容）
 */
function viewApiKeys() {
  var props = PropertiesService.getScriptProperties();
  var allProps = props.getProperties();
  
  Logger.log('=== 已設定的 API 認證資訊 ===');
  
  for (var key in allProps) {
    var value = allProps[key];
    
    // 只顯示前 4 個字元和後 4 個字元
    if (value && value.length > 8) {
      var masked = value.substring(0, 4) + '****' + value.substring(value.length - 4);
      Logger.log(key + ': ' + masked);
    } else {
      Logger.log(key + ': ****');
    }
  }
}

/**
 * 範例 10：刪除特定 API Key
 */
function deleteApiKey(keyName) {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty(keyName);
  Logger.log('✅ 已刪除：' + keyName);
}

/**
 * 範例 11：刪除所有 API Key
 */
function deleteAllApiKeys() {
  var props = PropertiesService.getScriptProperties();
  props.deleteAllProperties();
  Logger.log('✅ 已刪除所有 API 認證資訊');
}

// ==================== 實用的認證函式 ====================

/**
 * 範例 12：通用的 API 呼叫函式（支援多種認證方式）
 */
function apiCallWithAuth(url, method, data, authType, authValue) {
  method = method || 'get';
  authType = authType || 'none';
  
  var options = {
    'method': method,
    'muteHttpExceptions': true,
    'headers': {}
  };
  
  // 設定認證標頭
  switch (authType) {
    case 'apikey-header':
      options.headers['X-API-Key'] = authValue;
      break;
    case 'bearer':
      options.headers['Authorization'] = 'Bearer ' + authValue;
      break;
    case 'basic':
      options.headers['Authorization'] = authValue; // 已編碼的 Basic Auth
      break;
  }
  
  // 設定請求資料
  if (data) {
    options.contentType = 'application/json';
    options.payload = JSON.stringify(data);
  }
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    return {
      success: statusCode >= 200 && statusCode < 300,
      statusCode: statusCode,
      data: response.getContentText()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 範例 13：使用通用認證函式
 */
function auth13_useGenericAuthFunction() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  // API Key 在 URL 中的情況
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=' + apiKey + '&units=metric';
  var result = apiCallWithAuth(url, 'get', null, 'none');
  
  if (result.success) {
    var data = JSON.parse(result.data);
    Logger.log('✅ 天氣查詢成功');
    Logger.log('溫度：' + data.main.temp + '°C');
  } else {
    Logger.log('❌ 查詢失敗：' + result.error);
  }
}

// ==================== 錯誤處理與重試 ====================

/**
 * 範例 14：帶重試機制的 API 呼叫
 */
function apiCallWithRetry(url, options, maxRetries) {
  maxRetries = maxRetries || 3;
  var retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      var response = UrlFetchApp.fetch(url, options);
      var statusCode = response.getResponseCode();
      
      // 成功
      if (statusCode >= 200 && statusCode < 300) {
        return {
          success: true,
          data: response.getContentText(),
          retries: retryCount
        };
      }
      
      // 認證錯誤，不重試
      if (statusCode === 401 || statusCode === 403) {
        return {
          success: false,
          error: '認證失敗',
          statusCode: statusCode
        };
      }
      
      // 其他錯誤，重試
      retryCount++;
      if (retryCount < maxRetries) {
        Logger.log('請求失敗，' + (maxRetries - retryCount) + ' 次重試機會...');
        Utilities.sleep(1000 * retryCount); // 指數退避
      }
      
    } catch (error) {
      retryCount++;
      if (retryCount < maxRetries) {
        Logger.log('發生錯誤，重試中... (' + retryCount + '/' + maxRetries + ')');
        Utilities.sleep(1000 * retryCount);
      } else {
        return {
          success: false,
          error: error.message
        };
      }
    }
  }
  
  return {
    success: false,
    error: '超過最大重試次數'
  };
}

/**
 * 範例 15：使用重試機制
 */
function auth15_useRetryMechanism() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=' + apiKey;
  
  var options = {
    'method': 'get',
    'muteHttpExceptions': true
  };
  
  Logger.log('開始 API 呼叫（最多重試 3 次）...');
  var result = apiCallWithRetry(url, options, 3);
  
  if (result.success) {
    Logger.log('✅ 成功（重試次數：' + result.retries + '）');
    var data = JSON.parse(result.data);
    Logger.log('溫度：' + data.main.temp + 'K');
  } else {
    Logger.log('❌ 失敗：' + result.error);
  }
}

// ==================== 測試與除錯 ====================

/**
 * 範例 16：測試 API 認證是否正確
 */
function testApiAuthentication() {
  Logger.log('=== API 認證測試 ===');
  Logger.log('');
  
  // 測試 OpenWeatherMap API
  var weatherKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  if (weatherKey) {
    Logger.log('1. 測試 OpenWeatherMap API...');
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + weatherKey;
    try {
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      if (response.getResponseCode() === 200) {
        Logger.log('   ✅ OpenWeatherMap API 認證成功');
      } else {
        Logger.log('   ❌ OpenWeatherMap API 認證失敗（狀態碼：' + response.getResponseCode() + '）');
      }
    } catch (error) {
      Logger.log('   ❌ OpenWeatherMap API 測試失敗：' + error.message);
    }
  } else {
    Logger.log('1. ⚠️ 未設定 OpenWeatherMap API Key');
  }
  
  Logger.log('');
  Logger.log('測試完成！');
}

/**
 * 範例 17：顯示 API 請求的詳細資訊（除錯用）
 */
function debugApiRequest(url, options) {
  Logger.log('=== API 請求詳細資訊 ===');
  Logger.log('URL: ' + url);
  Logger.log('方法: ' + (options.method || 'GET'));
  
  if (options.headers) {
    Logger.log('標頭:');
    for (var key in options.headers) {
      var value = options.headers[key];
      // 隱藏敏感資訊
      if (key.toLowerCase().indexOf('auth') !== -1 || key.toLowerCase().indexOf('key') !== -1) {
        value = '****';
      }
      Logger.log('  ' + key + ': ' + value);
    }
  }
  
  if (options.payload) {
    Logger.log('請求主體:');
    Logger.log(options.payload);
  }
  
  Logger.log('========================');
}
