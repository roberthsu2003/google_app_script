/**
 * UrlFetchApp 基礎範例
 * 
 * 本檔案包含 UrlFetchApp 的基本使用範例，包括：
 * - GET 請求
 * - POST 請求
 * - PUT 請求
 * - DELETE 請求
 * - 設定 HTTP 標頭
 * - 處理回應
 */

// ==================== GET 請求範例 ====================

/**
 * 範例 1：最簡單的 GET 請求
 * 取得單一使用者資料
 */
function example01_simpleGet() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  // 發送 GET 請求
  var response = UrlFetchApp.fetch(url);
  
  // 取得回應內容
  var content = response.getContentText();
  
  Logger.log('回應內容：');
  Logger.log(content);
}

/**
 * 範例 2：GET 請求 - 取得清單
 * 取得所有使用者並顯示姓名
 */
function example02_getList() {
  var url = 'https://jsonplaceholder.typicode.com/users';
  
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  
  // 將 JSON 字串轉換為物件
  var users = JSON.parse(content);
  
  Logger.log('使用者清單：');
  for (var i = 0; i < users.length; i++) {
    Logger.log((i + 1) + '. ' + users[i].name + ' (' + users[i].email + ')');
  }
}

/**
 * 範例 3：GET 請求 - 帶參數
 * 使用 URL 參數篩選資料
 */
function example03_getWithParams() {
  // 取得 userId 為 1 的所有文章
  var url = 'https://jsonplaceholder.typicode.com/posts?userId=1';
  
  var response = UrlFetchApp.fetch(url);
  var posts = JSON.parse(response.getContentText());
  
  Logger.log('使用者 1 的文章數量：' + posts.length);
  Logger.log('第一篇文章標題：' + posts[0].title);
}

/**
 * 範例 4：GET 請求 - 動態組合 URL 參數
 */
function example04_buildUrlParams() {
  var baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  var userId = 2;
  var limit = 5;
  
  // 組合 URL 參數
  var url = baseUrl + '?userId=' + userId + '&_limit=' + limit;
  
  Logger.log('請求 URL：' + url);
  
  var response = UrlFetchApp.fetch(url);
  var posts = JSON.parse(response.getContentText());
  
  Logger.log('取得 ' + posts.length + ' 篇文章');
}

// ==================== POST 請求範例 ====================

/**
 * 範例 5：POST 請求 - 建立資源
 * 建立新文章
 */
function example05_simplePost() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  // 準備要傳送的資料
  var data = {
    title: '我的第一篇文章',
    body: '這是文章內容，使用 GAS 建立。',
    userId: 1
  };
  
  // 設定請求選項
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  };
  
  // 發送 POST 請求
  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());
  
  Logger.log('建立成功！');
  Logger.log('新文章 ID：' + result.id);
  Logger.log('標題：' + result.title);
}

/**
 * 範例 6：POST 請求 - 表單資料
 * 使用表單格式傳送資料
 */
function example06_postFormData() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var options = {
    'method': 'post',
    'payload': {
      'title': '表單提交的文章',
      'body': '使用表單格式傳送',
      'userId': '1'
    }
  };
  
  var response = UrlFetchApp.fetch(url, options);
  Logger.log('回應：' + response.getContentText());
}

// ==================== PUT 請求範例 ====================

/**
 * 範例 7：PUT 請求 - 更新資源
 * 更新現有文章
 */
function example07_putRequest() {
  var postId = 1;
  var url = 'https://jsonplaceholder.typicode.com/posts/' + postId;
  
  var data = {
    id: postId,
    title: '更新後的標題',
    body: '更新後的內容',
    userId: 1
  };
  
  var options = {
    'method': 'put',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());
  
  Logger.log('更新成功！');
  Logger.log('文章 ID：' + result.id);
  Logger.log('新標題：' + result.title);
}

// ==================== DELETE 請求範例 ====================

/**
 * 範例 8：DELETE 請求 - 刪除資源
 * 刪除文章
 */
function example08_deleteRequest() {
  var postId = 1;
  var url = 'https://jsonplaceholder.typicode.com/posts/' + postId;
  
  var options = {
    'method': 'delete'
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var statusCode = response.getResponseCode();
  
  if (statusCode === 200) {
    Logger.log('刪除成功！文章 ID：' + postId);
  } else {
    Logger.log('刪除失敗，狀態碼：' + statusCode);
  }
}

// ==================== HTTP 標頭範例 ====================

/**
 * 範例 9：設定自訂 HTTP 標頭
 */
function example09_customHeaders() {
  var url = 'https://jsonplaceholder.typicode.com/posts/1';
  
  var options = {
    'headers': {
      'User-Agent': 'Google Apps Script',
      'Accept': 'application/json',
      'Custom-Header': 'Custom-Value'
    }
  };
  
  var response = UrlFetchApp.fetch(url, options);
  Logger.log('回應：' + response.getContentText());
}

/**
 * 範例 10：API Key 認證（URL 參數方式）
 * 注意：這是示範用的假 API Key
 */
function example10_apiKeyInUrl() {
  var apiKey = 'YOUR_API_KEY_HERE';
  var city = 'Taipei';
  
  // 將 API Key 加入 URL 參數
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    Logger.log('城市：' + data.name);
    Logger.log('溫度：' + data.main.temp);
  } catch (error) {
    Logger.log('錯誤：請設定有效的 API Key');
  }
}

/**
 * 範例 11：API Key 認證（HTTP 標頭方式）
 */
function example11_apiKeyInHeader() {
  var url = 'https://api.example.com/data';
  var apiKey = 'YOUR_API_KEY_HERE';
  
  var options = {
    'headers': {
      'X-API-Key': apiKey
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('回應：' + response.getContentText());
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}

/**
 * 範例 12：Bearer Token 認證
 */
function example12_bearerToken() {
  var url = 'https://api.example.com/protected';
  var accessToken = 'YOUR_ACCESS_TOKEN_HERE';
  
  var options = {
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('回應：' + response.getContentText());
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}

// ==================== 回應處理範例 ====================

/**
 * 範例 13：檢查 HTTP 狀態碼
 */
function example13_checkStatusCode() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  var response = UrlFetchApp.fetch(url);
  var statusCode = response.getResponseCode();
  
  Logger.log('HTTP 狀態碼：' + statusCode);
  
  if (statusCode === 200) {
    Logger.log('✅ 請求成功');
    Logger.log(response.getContentText());
  } else if (statusCode === 404) {
    Logger.log('❌ 找不到資源');
  } else {
    Logger.log('❌ 請求失敗');
  }
}

/**
 * 範例 14：取得回應標頭
 */
function example14_responseHeaders() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  var response = UrlFetchApp.fetch(url);
  var headers = response.getHeaders();
  
  Logger.log('回應標頭：');
  for (var key in headers) {
    Logger.log(key + ': ' + headers[key]);
  }
}

/**
 * 範例 15：完整的請求與回應處理
 */
function example15_completeExample() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var data = {
    title: '完整範例',
    body: '這是一個完整的 API 呼叫範例',
    userId: 1
  };
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data),
    'headers': {
      'User-Agent': 'Google Apps Script'
    }
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    Logger.log('=== 請求資訊 ===');
    Logger.log('URL: ' + url);
    Logger.log('方法: POST');
    Logger.log('');
    
    Logger.log('=== 回應資訊 ===');
    Logger.log('狀態碼: ' + statusCode);
    
    if (statusCode === 201) {
      var result = JSON.parse(response.getContentText());
      Logger.log('✅ 建立成功');
      Logger.log('新資源 ID: ' + result.id);
      Logger.log('標題: ' + result.title);
    } else {
      Logger.log('❌ 請求失敗');
    }
    
  } catch (error) {
    Logger.log('❌ 發生錯誤: ' + error.message);
  }
}

// ==================== 使用 PropertiesService 儲存 API Key ====================

/**
 * 範例 16：設定 API Key（只需執行一次）
 */
function example16_setApiKey() {
  var scriptProperties = PropertiesService.getScriptProperties();
  
  // 設定 OpenWeatherMap API Key
  scriptProperties.setProperty('WEATHER_API_KEY', 'your_api_key_here');
  
  Logger.log('✅ API Key 已儲存');
}

/**
 * 範例 17：使用儲存的 API Key
 */
function example17_useStoredApiKey() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var apiKey = scriptProperties.getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先執行 example16_setApiKey() 設定 API Key');
    return;
  }
  
  var city = 'Taipei';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    Logger.log('城市：' + data.name);
    Logger.log('溫度：' + data.main.temp + '°C');
    Logger.log('天氣：' + data.weather[0].description);
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}

// ==================== 實用函式 ====================

/**
 * 範例 18：建立可重複使用的 API 呼叫函式
 */
function apiCall(url, method, data) {
  method = method || 'get';
  
  var options = {
    'method': method,
    'muteHttpExceptions': true
  };
  
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
      data: JSON.parse(response.getContentText())
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 範例 19：使用封裝的 API 呼叫函式
 */
function example19_useApiCallFunction() {
  // GET 請求
  var result1 = apiCall('https://jsonplaceholder.typicode.com/users/1');
  if (result1.success) {
    Logger.log('使用者姓名：' + result1.data.name);
  }
  
  // POST 請求
  var newPost = {
    title: '測試文章',
    body: '測試內容',
    userId: 1
  };
  var result2 = apiCall('https://jsonplaceholder.typicode.com/posts', 'post', newPost);
  if (result2.success) {
    Logger.log('建立成功，ID：' + result2.data.id);
  }
}

/**
 * 範例 20：批次 API 請求
 */
function example20_batchRequests() {
  var userIds = [1, 2, 3, 4, 5];
  var users = [];
  
  Logger.log('開始批次取得使用者資料...');
  
  for (var i = 0; i < userIds.length; i++) {
    var url = 'https://jsonplaceholder.typicode.com/users/' + userIds[i];
    var response = UrlFetchApp.fetch(url);
    var user = JSON.parse(response.getContentText());
    users.push(user);
    
    Logger.log((i + 1) + '. ' + user.name);
    
    // 避免請求過快，稍微延遲
    Utilities.sleep(100);
  }
  
  Logger.log('完成！共取得 ' + users.length + ' 位使用者');
}
