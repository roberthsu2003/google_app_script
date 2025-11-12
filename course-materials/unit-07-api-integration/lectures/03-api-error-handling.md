# API 錯誤處理與最佳實踐

## 學習目標

- 理解 HTTP 狀態碼的意義
- 掌握 API 錯誤處理的策略
- 學會實作重試機制
- 了解 API 配額管理
- 學會使用快取機制提升效能

## HTTP 狀態碼

HTTP 狀態碼是伺服器回應請求時返回的三位數字代碼，表示請求的處理結果。

### 狀態碼分類

| 範圍 | 類別 | 說明 |
|------|------|------|
| 1xx | 資訊回應 | 請求已接收，繼續處理 |
| 2xx | 成功 | 請求已成功處理 |
| 3xx | 重新導向 | 需要進一步操作才能完成請求 |
| 4xx | 客戶端錯誤 | 請求有誤或無法完成 |
| 5xx | 伺服器錯誤 | 伺服器處理請求時發生錯誤 |

### 常見的成功狀態碼（2xx）

| 狀態碼 | 名稱 | 說明 | 使用場景 |
|--------|------|------|---------|
| 200 | OK | 請求成功 | GET、PUT、DELETE 成功 |
| 201 | Created | 資源已建立 | POST 建立資源成功 |
| 204 | No Content | 請求成功但無回應內容 | DELETE 成功但不回傳資料 |

### 常見的客戶端錯誤（4xx）

| 狀態碼 | 名稱 | 說明 | 可能原因 |
|--------|------|------|---------|
| 400 | Bad Request | 請求格式錯誤 | JSON 格式錯誤、缺少必要參數 |
| 401 | Unauthorized | 未授權 | 缺少認證資訊、API Key 無效 |
| 403 | Forbidden | 禁止存取 | 沒有權限、API Key 權限不足 |
| 404 | Not Found | 找不到資源 | URL 錯誤、資源不存在 |
| 429 | Too Many Requests | 請求次數過多 | 超過 API 配額限制 |

### 常見的伺服器錯誤（5xx）

| 狀態碼 | 名稱 | 說明 | 可能原因 |
|--------|------|------|---------|
| 500 | Internal Server Error | 伺服器內部錯誤 | 伺服器程式錯誤 |
| 502 | Bad Gateway | 閘道錯誤 | 上游伺服器回應無效 |
| 503 | Service Unavailable | 服務暫時無法使用 | 伺服器維護、過載 |
| 504 | Gateway Timeout | 閘道逾時 | 上游伺服器回應超時 |

## 基本錯誤處理

### 檢查狀態碼

```javascript
function checkStatusCode() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  try {
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
    var statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      Logger.log('✅ 請求成功');
      var data = JSON.parse(response.getContentText());
      Logger.log(data);
    } else if (statusCode === 404) {
      Logger.log('❌ 找不到資源');
    } else if (statusCode >= 500) {
      Logger.log('❌ 伺服器錯誤：' + statusCode);
    } else {
      Logger.log('❌ 請求失敗：' + statusCode);
    }
  } catch (error) {
    Logger.log('❌ 發生錯誤：' + error.message);
  }
}
```

### 使用 try-catch

```javascript
function handleApiError() {
  var url = 'https://api.example.com/data';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    return {
      success: true,
      data: data
    };
  } catch (error) {
    Logger.log('API 呼叫失敗：' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}
```

### muteHttpExceptions 參數

預設情況下，UrlFetchApp 在遇到 4xx 或 5xx 狀態碼時會拋出例外。使用 `muteHttpExceptions: true` 可以避免拋出例外，讓我們自行處理錯誤。

```javascript
// ❌ 預設行為：會拋出例外
var response = UrlFetchApp.fetch(url);

// ✅ 靜音例外：不會拋出例外
var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
var statusCode = response.getResponseCode();
```

## 錯誤處理策略

### 策略 1：分類處理不同錯誤

```javascript
function handleDifferentErrors(url) {
  var options = {'muteHttpExceptions': true};
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    
    // 成功
    if (statusCode >= 200 && statusCode < 300) {
      return {
        success: true,
        data: JSON.parse(response.getContentText())
      };
    }
    
    // 客戶端錯誤
    if (statusCode >= 400 && statusCode < 500) {
      var errorMessage = '';
      
      switch (statusCode) {
        case 400:
          errorMessage = '請求格式錯誤';
          break;
        case 401:
          errorMessage = '未授權，請檢查 API Key';
          break;
        case 403:
          errorMessage = '沒有權限存取此資源';
          break;
        case 404:
          errorMessage = '找不到資源';
          break;
        case 429:
          errorMessage = '請求次數過多，請稍後再試';
          break;
        default:
          errorMessage = '客戶端錯誤：' + statusCode;
      }
      
      return {
        success: false,
        error: errorMessage,
        statusCode: statusCode
      };
    }
    
    // 伺服器錯誤
    if (statusCode >= 500) {
      return {
        success: false,
        error: '伺服器錯誤，請稍後再試',
        statusCode: statusCode
      };
    }
    
  } catch (error) {
    return {
      success: false,
      error: '網路錯誤：' + error.message
    };
  }
}
```

### 策略 2：使用者友善的錯誤訊息

```javascript
function getUserFriendlyError(statusCode) {
  var messages = {
    400: '輸入的資料格式不正確，請檢查後重試',
    401: '您的 API 金鑰無效或已過期',
    403: '您沒有權限執行此操作',
    404: '找不到您要查詢的資料',
    429: '您的請求次數過多，請稍後再試',
    500: '伺服器發生錯誤，我們正在處理中',
    503: '服務暫時無法使用，請稍後再試'
  };
  
  return messages[statusCode] || '發生未知錯誤（錯誤代碼：' + statusCode + '）';
}
```

## 重試機制

### 基本重試

```javascript
function apiCallWithRetry(url, maxRetries) {
  maxRetries = maxRetries || 3;
  
  for (var i = 0; i < maxRetries; i++) {
    try {
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      var statusCode = response.getResponseCode();
      
      // 成功
      if (statusCode >= 200 && statusCode < 300) {
        return {
          success: true,
          data: JSON.parse(response.getContentText()),
          attempts: i + 1
        };
      }
      
      // 客戶端錯誤不重試
      if (statusCode >= 400 && statusCode < 500) {
        return {
          success: false,
          error: '客戶端錯誤：' + statusCode,
          statusCode: statusCode
        };
      }
      
      // 伺服器錯誤，重試
      Logger.log('嘗試 ' + (i + 1) + ' 失敗，狀態碼：' + statusCode);
      
      if (i < maxRetries - 1) {
        Utilities.sleep(1000); // 等待 1 秒後重試
      }
      
    } catch (error) {
      Logger.log('嘗試 ' + (i + 1) + ' 發生錯誤：' + error.message);
      
      if (i < maxRetries - 1) {
        Utilities.sleep(1000);
      }
    }
  }
  
  return {
    success: false,
    error: '超過最大重試次數'
  };
}
```

### 指數退避（Exponential Backoff）

當重試時，每次等待的時間逐漸增加，避免對伺服器造成過大壓力。

```javascript
function apiCallWithExponentialBackoff(url, maxRetries) {
  maxRetries = maxRetries || 3;
  
  for (var i = 0; i < maxRetries; i++) {
    try {
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      var statusCode = response.getResponseCode();
      
      if (statusCode >= 200 && statusCode < 300) {
        return {
          success: true,
          data: JSON.parse(response.getContentText())
        };
      }
      
      // 客戶端錯誤不重試
      if (statusCode >= 400 && statusCode < 500) {
        return {
          success: false,
          error: '客戶端錯誤：' + statusCode
        };
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
  
  return {
    success: false,
    error: '超過最大重試次數'
  };
}
```

## API 配額管理

### 了解配額限制

大多數 API 都有使用限制：

- **每分鐘請求數**：例如 60 次/分鐘
- **每日請求數**：例如 1000 次/天
- **並發請求數**：同時進行的請求數量

### 追蹤 API 使用量

```javascript
function trackApiUsage(apiName) {
  var props = PropertiesService.getScriptProperties();
  var key = 'API_USAGE_' + apiName + '_' + Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  
  var count = parseInt(props.getProperty(key) || '0');
  count++;
  props.setProperty(key, count.toString());
  
  Logger.log(apiName + ' 今日使用次數：' + count);
  return count;
}

function checkApiQuota(apiName, dailyLimit) {
  var props = PropertiesService.getScriptProperties();
  var key = 'API_USAGE_' + apiName + '_' + Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  
  var count = parseInt(props.getProperty(key) || '0');
  
  if (count >= dailyLimit) {
    Logger.log('❌ 已達到每日配額限制：' + count + '/' + dailyLimit);
    return false;
  }
  
  return true;
}
```

### 限制請求頻率

```javascript
function rateLimitedApiCall(url, minInterval) {
  minInterval = minInterval || 1000; // 預設 1 秒
  
  var props = PropertiesService.getScriptProperties();
  var lastCallKey = 'LAST_API_CALL_' + url;
  var lastCall = props.getProperty(lastCallKey);
  
  if (lastCall) {
    var timeSinceLastCall = Date.now() - parseInt(lastCall);
    
    if (timeSinceLastCall < minInterval) {
      var waitTime = minInterval - timeSinceLastCall;
      Logger.log('等待 ' + waitTime + 'ms 以符合頻率限制...');
      Utilities.sleep(waitTime);
    }
  }
  
  // 執行 API 呼叫
  var response = UrlFetchApp.fetch(url);
  
  // 記錄呼叫時間
  props.setProperty(lastCallKey, Date.now().toString());
  
  return response;
}
```

## 快取機制

使用快取可以減少 API 呼叫次數，提升效能並節省配額。

### 使用 CacheService

```javascript
function getCachedData(url, cacheTime) {
  cacheTime = cacheTime || 3600; // 預設快取 1 小時
  
  var cache = CacheService.getScriptCache();
  var cacheKey = 'API_' + Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, url).join('');
  
  // 嘗試從快取取得
  var cached = cache.get(cacheKey);
  if (cached) {
    Logger.log('✅ 從快取取得資料');
    return JSON.parse(cached);
  }
  
  // 快取中沒有，呼叫 API
  Logger.log('📡 呼叫 API 取得資料');
  var response = UrlFetchApp.fetch(url);
  var data = response.getContentText();
  
  // 儲存到快取
  cache.put(cacheKey, data, cacheTime);
  
  return JSON.parse(data);
}
```

### 快取策略

```javascript
function smartCache(url, options) {
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
```

## 完整的錯誤處理範例

```javascript
function robustApiCall(url, options) {
  options = options || {};
  var maxRetries = options.maxRetries || 3;
  var cacheTime = options.cacheTime || 0;
  var timeout = options.timeout || 30000;
  
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
        Logger.log('伺服器錯誤，' + (waitTime / 1000) + ' 秒後重試...');
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
    error: '超過最大重試次數，請稍後再試'
  };
}

// 使用範例
function useRobustApiCall() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  
  var result = robustApiCall(url, {
    maxRetries: 3,
    cacheTime: 3600,  // 快取 1 小時
    timeout: 30000
  });
  
  if (result.success) {
    Logger.log('✅ 成功');
    Logger.log('資料來源：' + (result.fromCache ? '快取' : 'API'));
    Logger.log('嘗試次數：' + (result.attempts || 1));
    Logger.log(result.data);
  } else {
    Logger.log('❌ 失敗：' + result.error);
  }
}
```

## 最佳實踐

### 1. 總是處理錯誤

```javascript
// ❌ 不好的做法
var response = UrlFetchApp.fetch(url);
var data = JSON.parse(response.getContentText());

// ✅ 好的做法
try {
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var statusCode = response.getResponseCode();
  
  if (statusCode === 200) {
    var data = JSON.parse(response.getContentText());
    // 處理資料
  } else {
    Logger.log('請求失敗：' + statusCode);
  }
} catch (error) {
  Logger.log('發生錯誤：' + error.message);
}
```

### 2. 記錄錯誤資訊

```javascript
function logApiError(url, error, context) {
  var errorLog = {
    timestamp: new Date().toISOString(),
    url: url,
    error: error.message || error,
    context: context
  };
  
  Logger.log('API 錯誤：' + JSON.stringify(errorLog, null, 2));
  
  // 可以選擇將錯誤記錄到試算表
  // logErrorToSheet(errorLog);
}
```

### 3. 設定合理的逾時時間

```javascript
var options = {
  'muteHttpExceptions': true,
  'timeout': 30000  // 30 秒逾時
};
```

### 4. 使用環境變數儲存 API Key

```javascript
// ❌ 不要寫死在程式碼中
var apiKey = 'sk_live_1234567890';

// ✅ 使用 PropertiesService
var apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
```

### 5. 監控 API 使用狀況

定期檢查 API 使用量，避免超過配額：

```javascript
function monitorApiUsage() {
  var props = PropertiesService.getScriptProperties();
  var today = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd');
  
  var weatherUsage = props.getProperty('API_USAGE_WEATHER_' + today) || '0';
  var usersUsage = props.getProperty('API_USAGE_USERS_' + today) || '0';
  
  Logger.log('=== 今日 API 使用量 ===');
  Logger.log('天氣 API：' + weatherUsage + ' 次');
  Logger.log('使用者 API：' + usersUsage + ' 次');
}
```

## 小結

本講義介紹了：

✅ HTTP 狀態碼的意義和分類
✅ 基本的錯誤處理方法
✅ 重試機制和指數退避策略
✅ API 配額管理技巧
✅ 快取機制的實作
✅ 完整的錯誤處理範例
✅ API 呼叫的最佳實踐

良好的錯誤處理能讓你的應用程式更穩定、更可靠，提供更好的使用者體驗。

## 延伸閱讀

- [HTTP 狀態碼完整列表](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)
- [Google Apps Script - CacheService](https://developers.google.com/apps-script/reference/cache/cache-service)
- [API 設計最佳實踐](https://restfulapi.net/)
