/**
 * 公開 API 練習範例
 * 
 * 本檔案包含使用各種免費公開 API 的練習範例：
 * - JSONPlaceholder（假資料 API）
 * - REST Countries（國家資訊 API）
 * - CoinGecko（加密貨幣價格 API）
 * - OpenWeatherMap（天氣 API）
 * - 其他實用的公開 API
 */

// ==================== JSONPlaceholder API ====================

/**
 * 練習 1：取得所有使用者並顯示基本資訊
 */
function practice01_getAllUsers() {
  var url = 'https://jsonplaceholder.typicode.com/users';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var users = JSON.parse(response.getContentText());
    
    Logger.log('=== 使用者清單 ===');
    for (var i = 0; i < users.length; i++) {
      Logger.log((i + 1) + '. ' + users[i].name);
      Logger.log('   Email: ' + users[i].email);
      Logger.log('   公司: ' + users[i].company.name);
      Logger.log('   城市: ' + users[i].address.city);
      Logger.log('');
    }
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 2：搜尋特定使用者的所有文章
 */
function practice02_getUserPosts() {
  var userId = 1;
  var url = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var posts = JSON.parse(response.getContentText());
    
    Logger.log('=== 使用者 ' + userId + ' 的文章 ===');
    Logger.log('共 ' + posts.length + ' 篇文章');
    Logger.log('');
    
    for (var i = 0; i < Math.min(5, posts.length); i++) {
      Logger.log((i + 1) + '. ' + posts[i].title);
      Logger.log('   ' + posts[i].body.substring(0, 50) + '...');
      Logger.log('');
    }
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 3：取得文章的所有評論
 */
function practice03_getPostComments() {
  var postId = 1;
  var url = 'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var comments = JSON.parse(response.getContentText());
    
    Logger.log('=== 文章 ' + postId + ' 的評論 ===');
    Logger.log('共 ' + comments.length + ' 則評論');
    Logger.log('');
    
    for (var i = 0; i < comments.length; i++) {
      Logger.log((i + 1) + '. ' + comments[i].name);
      Logger.log('   作者: ' + comments[i].email);
      Logger.log('   內容: ' + comments[i].body.substring(0, 60) + '...');
      Logger.log('');
    }
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 4：建立新文章並取得回應
 */
function practice04_createPost() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var newPost = {
    title: '學習 Google Apps Script',
    body: '今天學習了如何使用 UrlFetchApp 呼叫 API，非常實用！',
    userId: 1
  };
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(newPost)
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    
    Logger.log('✅ 文章建立成功！');
    Logger.log('文章 ID: ' + result.id);
    Logger.log('標題: ' + result.title);
    Logger.log('內容: ' + result.body);
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== REST Countries API ====================

/**
 * 練習 5：查詢台灣的國家資訊
 */
function practice05_getCountryInfo() {
  var url = 'https://restcountries.com/v3.1/name/taiwan';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var countries = JSON.parse(response.getContentText());
    var taiwan = countries[0];
    
    Logger.log('=== 台灣資訊 ===');
    Logger.log('正式名稱: ' + taiwan.name.official);
    Logger.log('首都: ' + taiwan.capital[0]);
    Logger.log('人口: ' + taiwan.population.toLocaleString());
    Logger.log('面積: ' + taiwan.area.toLocaleString() + ' 平方公里');
    Logger.log('貨幣: ' + Object.keys(taiwan.currencies)[0]);
    Logger.log('語言: ' + Object.values(taiwan.languages).join(', '));
    Logger.log('時區: ' + taiwan.timezones.join(', '));
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 6：比較多個國家的人口
 */
function practice06_compareCountries() {
  var countries = ['japan', 'korea', 'taiwan'];
  var results = [];
  
  Logger.log('=== 國家人口比較 ===');
  
  for (var i = 0; i < countries.length; i++) {
    var url = 'https://restcountries.com/v3.1/name/' + countries[i];
    
    try {
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());
      var country = data[0];
      
      results.push({
        name: country.name.common,
        population: country.population
      });
      
      // 避免請求過快
      Utilities.sleep(200);
      
    } catch (error) {
      Logger.log('❌ 無法取得 ' + countries[i] + ' 的資料');
    }
  }
  
  // 按人口排序
  results.sort(function(a, b) {
    return b.population - a.population;
  });
  
  // 顯示結果
  for (var i = 0; i < results.length; i++) {
    Logger.log((i + 1) + '. ' + results[i].name + ': ' + results[i].population.toLocaleString() + ' 人');
  }
}

/**
 * 練習 7：查詢特定地區的所有國家
 */
function practice07_getCountriesByRegion() {
  var region = 'asia';
  var url = 'https://restcountries.com/v3.1/region/' + region;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var countries = JSON.parse(response.getContentText());
    
    Logger.log('=== ' + region.toUpperCase() + ' 地區國家 ===');
    Logger.log('共 ' + countries.length + ' 個國家');
    Logger.log('');
    
    // 只顯示前 10 個
    for (var i = 0; i < Math.min(10, countries.length); i++) {
      Logger.log((i + 1) + '. ' + countries[i].name.common + ' (' + countries[i].capital + ')');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== CoinGecko API ====================

/**
 * 練習 8：查詢比特幣當前價格
 */
function practice08_getBitcoinPrice() {
  var url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,twd';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== 比特幣價格 ===');
    Logger.log('美元: $' + data.bitcoin.usd.toLocaleString());
    Logger.log('台幣: NT$' + data.bitcoin.twd.toLocaleString());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 9：查詢多種加密貨幣價格
 */
function practice09_getMultipleCryptos() {
  var cryptos = ['bitcoin', 'ethereum', 'cardano', 'dogecoin'];
  var url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + 
            cryptos.join(',') + 
            '&vs_currencies=usd&include_24hr_change=true';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== 加密貨幣價格 ===');
    
    for (var i = 0; i < cryptos.length; i++) {
      var crypto = cryptos[i];
      var price = data[crypto].usd;
      var change = data[crypto].usd_24h_change;
      var changeSymbol = change >= 0 ? '📈' : '📉';
      
      Logger.log(crypto.toUpperCase() + ': $' + price.toLocaleString() + 
                ' (' + changeSymbol + ' ' + change.toFixed(2) + '%)');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 10：取得加密貨幣的詳細資訊
 */
function practice10_getCryptoDetails() {
  var cryptoId = 'bitcoin';
  var url = 'https://api.coingecko.com/api/v3/coins/' + cryptoId;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== ' + data.name + ' 詳細資訊 ===');
    Logger.log('符號: ' + data.symbol.toUpperCase());
    Logger.log('當前價格: $' + data.market_data.current_price.usd.toLocaleString());
    Logger.log('市值: $' + data.market_data.market_cap.usd.toLocaleString());
    Logger.log('24小時最高: $' + data.market_data.high_24h.usd.toLocaleString());
    Logger.log('24小時最低: $' + data.market_data.low_24h.usd.toLocaleString());
    Logger.log('24小時變化: ' + data.market_data.price_change_percentage_24h.toFixed(2) + '%');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== OpenWeatherMap API ====================

/**
 * 練習 11：查詢城市天氣（需要 API Key）
 */
function practice11_getWeather() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 WEATHER_API_KEY');
    Logger.log('1. 到 https://openweathermap.org/api 註冊免費帳號');
    Logger.log('2. 取得 API Key');
    Logger.log('3. 執行 setupWeatherApiKey() 函式設定');
    return;
  }
  
  var city = 'Taipei';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + 
            encodeURIComponent(city) + 
            '&appid=' + apiKey + 
            '&units=metric' +
            '&lang=zh_tw';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== ' + data.name + ' 天氣 ===');
    Logger.log('天氣: ' + data.weather[0].description);
    Logger.log('溫度: ' + data.main.temp + '°C');
    Logger.log('體感溫度: ' + data.main.feels_like + '°C');
    Logger.log('濕度: ' + data.main.humidity + '%');
    Logger.log('風速: ' + data.wind.speed + ' m/s');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 12：查詢多個城市的天氣
 */
function practice12_getMultipleCitiesWeather() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 WEATHER_API_KEY');
    return;
  }
  
  var cities = ['Taipei', 'Tokyo', 'Seoul', 'Bangkok'];
  
  Logger.log('=== 多城市天氣查詢 ===');
  Logger.log('');
  
  for (var i = 0; i < cities.length; i++) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + 
              encodeURIComponent(cities[i]) + 
              '&appid=' + apiKey + 
              '&units=metric';
    
    try {
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());
      
      Logger.log(data.name + ': ' + data.main.temp + '°C, ' + data.weather[0].description);
      
      // 避免請求過快
      Utilities.sleep(200);
      
    } catch (error) {
      Logger.log(cities[i] + ': 查詢失敗');
    }
  }
}

/**
 * 練習 13：取得 5 天天氣預報
 */
function practice13_getWeatherForecast() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 WEATHER_API_KEY');
    return;
  }
  
  var city = 'Taipei';
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + 
            encodeURIComponent(city) + 
            '&appid=' + apiKey + 
            '&units=metric' +
            '&cnt=5'; // 只取前 5 筆
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== ' + data.city.name + ' 天氣預報 ===');
    Logger.log('');
    
    for (var i = 0; i < data.list.length; i++) {
      var forecast = data.list[i];
      var date = new Date(forecast.dt * 1000);
      
      Logger.log(date.toLocaleString('zh-TW'));
      Logger.log('  溫度: ' + forecast.main.temp + '°C');
      Logger.log('  天氣: ' + forecast.weather[0].description);
      Logger.log('');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== 其他實用 API ====================

/**
 * 練習 14：隨機笑話 API
 */
function practice14_getRandomJoke() {
  var url = 'https://official-joke-api.appspot.com/random_joke';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var joke = JSON.parse(response.getContentText());
    
    Logger.log('=== 隨機笑話 ===');
    Logger.log('Q: ' + joke.setup);
    Logger.log('A: ' + joke.punchline);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 15：隨機名言 API
 */
function practice15_getRandomQuote() {
  var url = 'https://api.quotable.io/random';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var quote = JSON.parse(response.getContentText());
    
    Logger.log('=== 每日名言 ===');
    Logger.log('"' + quote.content + '"');
    Logger.log('— ' + quote.author);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 16：貓咪圖片 API
 */
function practice16_getCatImage() {
  var url = 'https://api.thecatapi.com/v1/images/search';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== 隨機貓咪圖片 ===');
    Logger.log('圖片網址: ' + data[0].url);
    Logger.log('寬度: ' + data[0].width + 'px');
    Logger.log('高度: ' + data[0].height + 'px');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 練習 17：IP 位址資訊查詢
 */
function practice17_getIpInfo() {
  var url = 'https://ipapi.co/json/';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('=== IP 位址資訊 ===');
    Logger.log('IP: ' + data.ip);
    Logger.log('城市: ' + data.city);
    Logger.log('國家: ' + data.country_name);
    Logger.log('時區: ' + data.timezone);
    Logger.log('ISP: ' + data.org);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

// ==================== 綜合練習 ====================

/**
 * 練習 18：建立每日資訊摘要
 * 整合多個 API 的資料
 */
function practice18_dailySummary() {
  Logger.log('========================================');
  Logger.log('           每日資訊摘要');
  Logger.log('========================================');
  Logger.log('');
  
  // 1. 天氣資訊
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  if (apiKey) {
    try {
      var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=' + apiKey + '&units=metric';
      var weatherResponse = UrlFetchApp.fetch(weatherUrl);
      var weather = JSON.parse(weatherResponse.getContentText());
      Logger.log('📍 台北天氣: ' + weather.main.temp + '°C, ' + weather.weather[0].description);
    } catch (e) {
      Logger.log('📍 天氣: 無法取得');
    }
  }
  
  // 2. 比特幣價格
  try {
    var cryptoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    var cryptoResponse = UrlFetchApp.fetch(cryptoUrl);
    var crypto = JSON.parse(cryptoResponse.getContentText());
    Logger.log('💰 比特幣: $' + crypto.bitcoin.usd.toLocaleString());
  } catch (e) {
    Logger.log('💰 比特幣: 無法取得');
  }
  
  // 3. 每日名言
  try {
    var quoteUrl = 'https://api.quotable.io/random';
    var quoteResponse = UrlFetchApp.fetch(quoteUrl);
    var quote = JSON.parse(quoteResponse.getContentText());
    Logger.log('');
    Logger.log('💭 每日名言:');
    Logger.log('   "' + quote.content + '"');
    Logger.log('   — ' + quote.author);
  } catch (e) {
    Logger.log('💭 每日名言: 無法取得');
  }
  
  Logger.log('');
  Logger.log('========================================');
}

/**
 * 練習 19：將 API 資料寫入試算表
 */
function practice19_writeToSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('API資料') || ss.insertSheet('API資料');
  
  // 清除舊資料
  sheet.clear();
  
  // 設定標題
  sheet.getRange(1, 1, 1, 4).setValues([['時間', '城市', '溫度', '天氣']]);
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  
  // 取得多個城市的天氣
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  if (!apiKey) {
    Logger.log('❌ 請先設定 WEATHER_API_KEY');
    return;
  }
  
  var cities = ['Taipei', 'Tokyo', 'Seoul'];
  var data = [];
  
  for (var i = 0; i < cities.length; i++) {
    try {
      var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities[i] + '&appid=' + apiKey + '&units=metric';
      var response = UrlFetchApp.fetch(url);
      var weather = JSON.parse(response.getContentText());
      
      data.push([
        new Date(),
        weather.name,
        weather.main.temp,
        weather.weather[0].description
      ]);
      
      Utilities.sleep(200);
    } catch (error) {
      Logger.log('無法取得 ' + cities[i] + ' 的天氣');
    }
  }
  
  // 寫入資料
  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, 4).setValues(data);
    Logger.log('✅ 已將 ' + data.length + ' 筆資料寫入試算表');
  }
}

/**
 * 練習 20：定時更新資料（配合觸發器使用）
 */
function practice20_scheduledUpdate() {
  // 這個函式可以設定為定時觸發器，例如每小時執行一次
  practice19_writeToSheet();
  Logger.log('✅ 定時更新完成：' + new Date().toLocaleString('zh-TW'));
}

// ==================== 設定函式 ====================

/**
 * 設定 OpenWeatherMap API Key
 */
function setupWeatherApiKey() {
  var apiKey = Browser.inputBox(
    '設定 OpenWeatherMap API Key',
    '請輸入你的 API Key（到 https://openweathermap.org/api 註冊）:',
    Browser.Buttons.OK_CANCEL
  );
  
  if (apiKey !== 'cancel') {
    PropertiesService.getScriptProperties().setProperty('WEATHER_API_KEY', apiKey);
    Logger.log('✅ API Key 已設定');
  }
}
