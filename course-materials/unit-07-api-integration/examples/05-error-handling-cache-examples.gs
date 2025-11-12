/**
 * API 錯誤處理與快取範例
 * 
 * 本檔案包含：
 * - HTTP 狀態碼處理
 * - 重試機制
 * - 快取機制
 * - API 配額管理
 * - 完整的錯誤處理範例
 */

// ==================== HTTP 狀態碼處理 ====================

/**
 * 範例 1：檢查 HTTP 狀態碼
 */
function error01_checkStatusCode() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  var options = {
    'muteHttpExceptions': true
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var statusCode = response.getResponseCode();
  
  Logger.log('HTTP 狀態碼：' + statusCode);
  
  if (statusCode === 200) {
    Logger.log('✅ 請求成功');
    var data = JSON.parse(response.getContentText());
    Logger.log('使用者：' + data.name);
  } else if (statusCode === 404) {
    Logger.log('❌ 找不到資源');
  } else if (statusCode >= 500) {
    Logger.log('❌ 伺服器錯誤');
  } else {
    Logger.log('❌ 請求失敗');
  }
}

/**
 * 範例 2：分類處理不同錯誤
 */
function error02_handleDifferentErrors() {
  var testUrls = [
    'https://jsonplaceholder.typicode.com/users/1',      // 200 OK
    'https://jsonplaceholder.typicode.com/users/999',    // 404 Not Found
    'https://httpstat.us/500'                             // 500 Server Error
  ];
  
  testUrls.forEach(function(url) {
    Logger.log('測試 URL：' + url);
    
    try {
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      var statusCode = response.getResponseCode();
      
      if (statusCode >= 200 && statusCode < 300) {
        Logger.log('  ✅ 成功（' + statusCode + '）');
      } else if (statusCode >= 400 && statusCode < 500) {
        Logger.log('  ❌ 客戶端錯誤（' + statusCode + '）');
      } else if (statusCode >= 500) {
        Logger.log('  ❌ 伺服器錯誤（' + statusCode + '）');
      }
    } catch (error) {
      Logger.log('  ❌ 網路錯誤：' + error.message);
    }
    
    Logger.log('');
  });
}

/**
 * 範例 3：使用者友善的錯誤訊息
 */
function getUserFriendlyError(statusCode) {
  var messages = {
    400: '輸入的資料格式不正確',
    401: 'API 金鑰無效或已過期',
    403: '沒有權限執行此操作',
    404: '找不到您要查詢的資料',
    429: '請求次數過多，請稍後再試',
    500: '伺服器發生錯誤',
    503: '服務暫時無法使用'
  };
  
  return messages[statusCode] || '發生未知錯誤（錯誤代碼：' + statusCode + '）';
}

function error03_friendlyErrorMessages() {
  var statusCodes = [200, 400, 401, 404, 429, 500];
  
  Logger.log('=== 錯誤訊息對照 ===');
  statusCodes.forEach(function(code) {
    Logger.log(code + ': ' + getUserFriendlyError(code));
  });
}

// ==================== 重試機制 ====================

/**
 * 範例 4：基本重試機制
 */
function error04_basicRetry(url, maxRetries) {
  maxRetries = maxRetries || 3;
  
  for (var i = 0; i < maxRetries; i++) {
    try {
      Logger.log('嘗試 ' + (i + 1) + '/' + maxRetries);
      
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      var statusCode = response.getResponseCode();
      
      if (statusCode === 200) {
        Logger.log('✅ 成功！');
        return JSON.parse(response.getContentText());
      }
      
      Logger.log('  狀態碼：' + statusCode);
      
      if (i < maxRetries - 1) {
        Logger.log('  等待 1 秒後重試...');
        Utilities.sleep(1000);
      }
      
    } catch (error) {
      Logger.log('  錯誤：' + error.message);
      
      if (i < maxRetries - 1) {
        Utilities.sleep(1000);
      }
    }
  }
  
  Logger.log('❌ 超過最大重試次數');
  return null;
}

/**
 * 範例 5：指數退避重試
 */
function error05_exponentialBackoff(url, maxRetries) {
  maxRetries = maxRetries || 3;
  
  for (var i = 0; i < maxRetries; i++) {
    try {
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      var statusCode = response.getResponseCode();
      
      if (statusCode === 200) {
        Logger.log('✅ 成功（嘗試 ' + (i + 1) + ' 次）');
        return JSON.parse(response.getContentText());
      }
      
      // 客戶端錯誤不重試
      if (statusCode >= 400 && statusCode < 500) {
        Logger.log('❌ 客戶端錯誤，不重試');
        return null;
      }
      
      // 計算等待時間：1秒、2秒、4秒...
      if (i < maxRetries - 1) {
        var waitTime = Math.pow(2, i) * 1000;
        Logger.log('等待 ' + (waitTime / 1000) + ' 秒後重試...');
        Utilities.sleep(waitTime);
      }
      
    } catch (error) {
      if (i < maxRetries - 1) {
        var waitTime = Math.pow(2, i) * 1000;
        Utilities.sleep(waitTime);
      }
    }
  }
  
  Logger.log('❌ 超過最大重試次數');
  return null;
}

// ==================== 快取機制 ====================

/**
 * 範例 6：基本快取
 */
function cache01_basicCache(url, cacheTime) {
  cacheTime = cacheTime || 3600; // 預設 1 小時
  
  var cache = CacheService.getScriptCache();
  var cacheKey = 'API_' + url;
  
  // 嘗試從快取取得
  var cached = cache.get(cacheKey);
  if (cached) {
    Logger.log('✅ 從快取取得資料');
    return JSON.parse(cached);
  }
  
  // 呼叫 API
  Logger.log('📡 呼叫 API');
  var response = UrlFetchApp.fetch(url);
  var data = response.getContentText();
  
  // 儲存到快取
  cache.put(cacheKey, data, cacheTime);
  Logger.log('💾 已儲存到快取（' + cacheTime + ' 秒）');
  
  return JSON.parse(data);
}

/**
 * 範例 7：測試快取效果
 */
function cache02_testCache() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  Logger.log('=== 第一次呼叫 ===');
  var start1 = Date.now();
  var data1 = cache01_basicCache(url, 300);
  var time1 = Date.now() - start1;
  Logger.log('耗時：' + time1 + 'ms');
  Logger.log('');
  
  Logger.log('=== 第二次呼叫（應該使用快取）===');
  var start2 = Date.now();
  var data2 = cache01_basicCache(url, 300);
  var time2 = Date.now() - start2;
  Logger.log('耗時：' + time2 + 'ms');
  Logger.log('');
  
  Logger.log('速度提升：' + ((time1 - time2) / time1 * 100).toFixed(1) + '%');
}

/**
 * 範例 8：清除快取
 */
function cache03_clearCache(url) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'API_' + url;
  
  cache.remove(cacheKey);
  Logger.log('✅ 已清除快取');
}

/**
 * 範例 9：智慧快取（可強制重新整理）
 */
function cache04_smartCache(url, options) {
  options = options || {};
  var cacheTime = options.cacheTime || 3600;
  var forceRefresh = options.forceRefresh || false;
  
  var cache = CacheService.getScriptCache();
  var cacheKey = 'API_' + url;
  
  // 強制重新整理
  if (forceRefresh) {
    Logger.log('🔄 強制重新整理');
    cache.remove(cacheKey);
  }
  
  // 檢查快取
  var cached = cache.get(cacheKey);
  if (cached) {
    Logger.log('✅ 使用快取資料');
    return {
      data: JSON.parse(cached),
      fromCache: true
    };
  }
  
  // 呼叫 API
  Logger.log('📡 呼叫 API');
  var response = UrlFetchApp.fetch(url);
  var data = response.getContentText();
  
  // 儲存快取
  cache.put(cacheKey, data, cacheTime);
  
  return {
    data: JSON.parse(data),
    fromCache: false
  };
}

// ==================== API 配額管理 ====================

/**
 * 範例 10：追蹤 API 使用量
 */
function quota01_trackUsage(apiName) {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  var key = 'API_USAGE_' + apiName + '_' + today;
  
  var count = parseInt(props.getProperty(key) || '0');
  count++;
  props.setProperty(key, count.toString());
  
  Logger.log(apiName + ' 今日使用次數：' + count);
  return count;
}

/**
 * 範例 11：檢查配額
 */
function quota02_checkQuota(apiName, dailyLimit) {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  var key = 'API_USAGE_' + apiName + '_' + today;
  
  var count = parseInt(props.getProperty(key) || '0');
  
  Logger.log('=== ' + apiName + ' 配額檢查 ===');
  Logger.log('已使用：' + count + '/' + dailyLimit);
  Logger.log('剩餘：' + (dailyLimit - count));
  
  if (count >= dailyLimit) {
    Logger.log('❌ 已達到每日配額限制');
    return false;
  }
  
  Logger.log('✅ 配額充足');
  return true;
}

/**
 * 範例 12：限制請求頻率
 */
function quota03_rateLimit(url, minInterval) {
  minInterval = minInterval || 1000; // 預設 1 秒
  
  var props = PropertiesService.getScriptProperties();
  var lastCallKey = 'LAST_CALL_' + url;
  var lastCall = props.getProperty(lastCallKey);
  
  if (lastCall) {
    var timeSinceLastCall = Date.now() - parseInt(lastCall);
    
    if (timeSinceLastCall < minInterval) {
      var waitTime = minInterval - timeSinceLastCall;
      Logger.log('⏱️ 等待 ' + waitTime + 'ms...');
      Utilities.sleep(waitTime);
    }
  }
  
  // 執行 API 呼叫
  var response = UrlFetchApp.fetch(url);
  
  // 記錄呼叫時間
  props.setProperty(lastCallKey, Date.now().toString());
  
  return response;
}

// ==================== 完整範例 ====================

/**
 * 範例 13：完整的 API 呼叫函式
 */
function robustApiCall(url, options) {
  options = options || {};
  var maxRetries = options.maxRetries || 3;
  var cacheTime = options.cacheTime || 0;
  
  // 檢查快取
  if (cacheTime > 0) {
    var cache = CacheService.getScriptCache();
    var cacheKey = 'API_' + url;
    var cached = cache.get(cacheKey);
    
    if (cached) {
      Logger.log('✅ 從快取取得資料');
      return {
        success: true,
        data: JSON.parse(cached),
        fromCache: true
      };
    }
  }
  
  // 重試機制
  for (var i = 0; i < maxRetries; i++) {
    try {
      var fetchOptions = {
        'muteHttpExceptions': true,
        'method': options.method || 'get'
      };
      
      if (options.headers) {
        fetchOptions.headers = options.headers;
      }
      
      if (options.payload) {
        fetchOptions.payload = options.payload;
        fetchOptions.contentType = 'application/json';
      }
      
      var response = UrlFetchApp.fetch(url, fetchOptions);
      var statusCode = response.getResponseCode();
      
      // 成功
      if (statusCode >= 200 && statusCode < 300) {
        var data = response.getContentText();
        
        // 儲存快取
        if (cacheTime > 0) {
          var cache = CacheService.getScriptCache();
          var cacheKey = 'API_' + url;
          cache.put(cacheKey, data, cacheTime);
        }
        
        return {
          success: true,
          data: JSON.parse(data),
          fromCache: false,
          attempts: i + 1
        };
      }
      
      // 客戶端錯誤（不重試）
      if (statusCode >= 400 && statusCode < 500) {
        return {
          success: false,
          error: getUserFriendlyError(statusCode),
          statusCode: statusCode
        };
      }
      
      // 伺服器錯誤（重試）
      if (i < maxRetries - 1) {
        var waitTime = Math.pow(2, i) * 1000;
        Logger.log('重試中... (' + (waitTime / 1000) + '秒後)');
        Utilities.sleep(waitTime);
      }
      
    } catch (error) {
      Logger.log('嘗試 ' + (i + 1) + ' 失敗：' + error.message);
      
      if (i < maxRetries - 1) {
        var waitTime = Math.pow(2, i) * 1000;
        Utilities.sleep(waitTime);
      }
    }
  }
  
  return {
    success: false,
    error: '超過最大重試次數'
  };
}

/**
 * 範例 14：使用完整的 API 呼叫函式
 */
function example_useRobustApiCall() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  Logger.log('=== 測試完整的 API 呼叫 ===');
  
  var result = robustApiCall(url, {
    maxRetries: 3,
    cacheTime: 300  // 快取 5 分鐘
  });
  
  if (result.success) {
    Logger.log('✅ 成功');
    Logger.log('資料來源：' + (result.fromCache ? '快取' : 'API'));
    if (result.attempts) {
      Logger.log('嘗試次數：' + result.attempts);
    }
    Logger.log('使用者：' + result.data.name);
  } else {
    Logger.log('❌ 失敗：' + result.error);
  }
}

/**
 * 範例 15：批次 API 呼叫（帶錯誤處理）
 */
function example_batchApiCalls() {
  var userIds = [1, 2, 3, 999]; // 999 不存在
  var results = [];
  
  Logger.log('=== 批次取得使用者資料 ===');
  
  for (var i = 0; i < userIds.length; i++) {
    var url = 'https://jsonplaceholder.typicode.com/users/' + userIds[i];
    
    var result = robustApiCall(url, {
      maxRetries: 2,
      cacheTime: 300
    });
    
    if (result.success) {
      Logger.log('✅ 使用者 ' + userIds[i] + ': ' + result.data.name);
      results.push(result.data);
    } else {
      Logger.log('❌ 使用者 ' + userIds[i] + ': ' + result.error);
    }
    
    // 避免請求過快
    Utilities.sleep(200);
  }
  
  Logger.log('');
  Logger.log('成功取得 ' + results.length + '/' + userIds.length + ' 筆資料');
}
