# 實作案例 9：天氣查詢 Web App - 實作指引

## 開發流程概覽

本指引將帶領你逐步完成天氣查詢 Web App 的開發，從 API 註冊到最終部署。

### 開發階段

1. **準備階段**：註冊 API、設定環境
2. **後端開發**：實作 API 呼叫、錯誤處理、快取機制
3. **前端開發**：建立使用者介面
4. **整合測試**：前後端整合、功能測試
5. **部署上線**：部署 Web App、使用者測試

預計開發時間：2-3 小時

---

## 階段 1：準備工作（15 分鐘）

### 步驟 1.1：註冊 OpenWeatherMap API

1. 前往 [OpenWeatherMap](https://openweathermap.org/api)
2. 點選「Sign Up」註冊免費帳號
3. 填寫註冊資訊（Email、密碼）
4. 驗證 Email
5. 登入後，前往「API keys」頁面
6. 複製你的 API Key（類似：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`）

**注意事項：**
- 新註冊的 API Key 可能需要 1-2 小時才能啟用
- 免費方案限制：60 次/分鐘，1,000,000 次/月
- 請妥善保管你的 API Key，不要公開分享

### 步驟 1.2：建立 Google Apps Script 專案

1. 前往 [Google Apps Script](https://script.google.com/)
2. 點選「新專案」
3. 將專案命名為「天氣查詢 Web App」
4. 建立以下檔案：
   - `Code.gs`（已存在）
   - `Index.html`（點選「+」→「HTML」）

### 步驟 1.3：設定 API Key

1. 複製 `Code.gs` 的完整程式碼
2. 找到 `setupApiKey()` 函式
3. 將 `'your_api_key_here'` 替換為你的 API Key
4. 執行 `setupApiKey()` 函式
5. 檢查 Logger 確認設定成功

```javascript
function setupApiKey() {
  var apiKey = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';  // 替換為你的 API Key
  PropertiesService.getScriptProperties().setProperty('WEATHER_API_KEY', apiKey);
  Logger.log('✅ API Key 已設定');
}
```

---

## 階段 2：後端開發（45 分鐘）

### 步驟 2.1：實作基本 API 呼叫（15 分鐘）

**目標**：建立能夠呼叫 OpenWeatherMap API 的基本函式

**實作重點：**

1. **建立 API URL**
   ```javascript
   var url = 'https://api.openweathermap.org/data/2.5/weather' +
             '?q=' + encodeURIComponent(city) +
             '&appid=' + apiKey +
             '&units=metric' +
             '&lang=zh_tw';
   ```

2. **使用 UrlFetchApp 呼叫 API**
   ```javascript
   var response = UrlFetchApp.fetch(url, {
     'muteHttpExceptions': true
   });
   ```

3. **解析 JSON 回應**
   ```javascript
   var data = JSON.parse(response.getContentText());
   ```

**測試方法：**
```javascript
function testBasicApiCall() {
  var result = getWeather('Taipei');
  Logger.log(result);
}
```

### 步驟 2.2：實作錯誤處理（15 分鐘）

**目標**：處理各種可能的錯誤情況

**需要處理的錯誤：**

1. **城市不存在（404）**
   ```javascript
   if (statusCode === 404) {
     return {
       success: false,
       error: '找不到城市「' + city + '」'
     };
   }
   ```

2. **API Key 無效（401）**
   ```javascript
   if (statusCode === 401) {
     return {
       success: false,
       error: 'API Key 無效或已過期'
     };
   }
   ```

3. **請求次數過多（429）**
   ```javascript
   if (statusCode === 429) {
     return {
       success: false,
       error: '請求次數過多，請稍後再試'
     };
   }
   ```

4. **網路錯誤**
   ```javascript
   try {
     // API 呼叫
   } catch (error) {
     return {
       success: false,
       error: '網路錯誤，請稍後再試'
     };
   }
   ```

**測試方法：**
```javascript
function testErrorHandling() {
  // 測試城市不存在
  var result1 = getWeather('InvalidCity123');
  Logger.log('城市不存在：', result1);
  
  // 測試空輸入
  var result2 = getWeather('');
  Logger.log('空輸入：', result2);
}
```

### 步驟 2.3：實作快取機制（15 分鐘）

**目標**：減少 API 呼叫次數，提升效能

**實作步驟：**

1. **檢查快取**
   ```javascript
   var cachedData = getCachedWeather(city);
   if (cachedData) {
     Logger.log('✅ 從快取取得資料');
     return cachedData;
   }
   ```

2. **儲存到快取**
   ```javascript
   function cacheWeatherData(city, weatherData) {
     var cache = CacheService.getScriptCache();
     var cacheKey = 'WEATHER_' + city.toLowerCase();
     var cacheTime = 600; // 10 分鐘
     
     cache.put(cacheKey, JSON.stringify(weatherData), cacheTime);
   }
   ```

3. **從快取讀取**
   ```javascript
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
   ```

**測試方法：**
```javascript
function testCache() {
  // 第一次呼叫（應該呼叫 API）
  Logger.log('第一次查詢：');
  var result1 = getWeather('Taipei');
  Logger.log('資料來源：' + (result1.fromCache ? '快取' : 'API'));
  
  // 第二次呼叫（應該使用快取）
  Logger.log('第二次查詢：');
  var result2 = getWeather('Taipei');
  Logger.log('資料來源：' + (result2.fromCache ? '快取' : 'API'));
}
```

---

## 階段 3：前端開發（30 分鐘）

### 步驟 3.1：建立基本 HTML 結構（10 分鐘）

**目標**：建立使用者介面的基本架構

**主要元素：**

1. **搜尋框**
   ```html
   <input type="text" id="cityInput" placeholder="輸入城市名稱">
   <button onclick="searchWeather()">查詢天氣</button>
   ```

2. **載入狀態**
   ```html
   <div id="loading" style="display: none;">
     載入中...
   </div>
   ```

3. **錯誤訊息**
   ```html
   <div id="errorMessage" style="display: none;">
     <span id="errorText"></span>
   </div>
   ```

4. **結果顯示**
   ```html
   <div id="weatherResult" style="display: none;">
     <!-- 天氣資訊 -->
   </div>
   ```

### 步驟 3.2：加入 Bootstrap 樣式（10 分鐘）

**目標**：美化介面，提升使用者體驗

**引入 Bootstrap：**
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

**使用 Bootstrap 元件：**
- `input-group`：搜尋框組合
- `btn btn-primary`：按鈕樣式
- `card`：卡片容器
- `spinner-border`：載入動畫

### 步驟 3.3：實作 JavaScript 互動（10 分鐘）

**目標**：實作前後端資料傳遞

**核心函式：**

1. **查詢天氣**
   ```javascript
   function searchWeather() {
     var city = document.getElementById('cityInput').value.trim();
     
     if (!city) {
       showError('請輸入城市名稱');
       return;
     }
     
     showLoading();
     
     google.script.run
       .withSuccessHandler(onSuccess)
       .withFailureHandler(onFailure)
       .getWeather(city);
   }
   ```

2. **成功回調**
   ```javascript
   function onSuccess(result) {
     hideLoading();
     
     if (result.success) {
       displayWeather(result);
     } else {
       showError(result.error);
     }
   }
   ```

3. **顯示天氣**
   ```javascript
   function displayWeather(result) {
     var data = result.data;
     
     document.getElementById('cityName').textContent = data.city;
     document.getElementById('temperature').textContent = data.temperature + '°C';
     document.getElementById('description').textContent = data.description;
     
     document.getElementById('weatherResult').style.display = 'block';
   }
   ```

---

## 階段 4：整合測試（20 分鐘）

### 步驟 4.1：後端單元測試

執行以下測試函式：

```javascript
// 1. 測試基本查詢
testWeatherQuery();

// 2. 測試快取
testCache();

// 3. 測試錯誤處理
testErrorHandling();

// 4. 測試多城市查詢
testMultipleCities();
```

**檢查項目：**
- ✅ API 呼叫成功
- ✅ 資料格式正確
- ✅ 快取機制運作
- ✅ 錯誤處理正確

### 步驟 4.2：前端功能測試

**測試項目：**

1. **正常查詢**
   - 輸入：Taipei
   - 預期：顯示台北天氣

2. **錯誤處理**
   - 輸入：InvalidCity123
   - 預期：顯示「找不到城市」錯誤

3. **空輸入**
   - 輸入：（空白）
   - 預期：顯示「請輸入城市名稱」

4. **快取測試**
   - 連續查詢同一城市兩次
   - 預期：第二次顯示「快取資料」標記

5. **Enter 鍵**
   - 輸入城市後按 Enter
   - 預期：開始查詢

### 步驟 4.3：使用者體驗測試

**檢查項目：**
- ✅ 載入狀態顯示
- ✅ 錯誤訊息清楚
- ✅ 結果顯示完整
- ✅ 介面美觀
- ✅ 響應速度快

---

## 階段 5：部署上線（10 分鐘）

### 步驟 5.1：部署 Web App

1. 點選「部署」→「新增部署作業」
2. 選擇類型：「網頁應用程式」
3. 設定：
   - 說明：天氣查詢 Web App v1.0
   - 執行身分：我
   - 存取權：任何人
4. 點選「部署」
5. 複製 Web App URL

### 步驟 5.2：測試部署的 Web App

1. 開啟 Web App URL
2. 執行完整功能測試
3. 確認所有功能正常運作

### 步驟 5.3：分享給使用者

1. 將 Web App URL 分享給使用者
2. 提供使用說明
3. 收集使用者回饋

---

## 常見問題排除

### 問題 1：API Key 無效

**症狀**：顯示「API Key 無效或已過期」

**解決方案：**
1. 檢查 API Key 是否正確設定
2. 確認 API Key 已啟用（新註冊需等待 1-2 小時）
3. 重新執行 `setupApiKey()` 函式
4. 執行 `checkApiKey()` 確認設定

### 問題 2：找不到城市

**症狀**：輸入城市後顯示「找不到城市」

**解決方案：**
1. 使用英文城市名稱
2. 檢查拼字是否正確
3. 嘗試使用完整名稱（例如：New York 而非 NY）
4. 查看 [OpenWeatherMap 城市列表](https://openweathermap.org/find)

### 問題 3：快取沒有作用

**症狀**：每次查詢都呼叫 API

**解決方案：**
1. 檢查 `getCachedWeather()` 函式
2. 確認快取鍵值格式正確
3. 查看 Logger 確認快取狀態
4. 嘗試清除快取：`clearAllWeatherCache()`

### 問題 4：前端無法呼叫後端

**症狀**：點選查詢按鈕沒有反應

**解決方案：**
1. 檢查 `doGet()` 函式是否正確
2. 確認 HTML 檔案名稱為 `Index.html`
3. 查看瀏覽器 Console 的錯誤訊息
4. 重新部署 Web App

### 問題 5：顯示亂碼

**症狀**：天氣描述顯示亂碼

**解決方案：**
1. 確認 API 請求中有 `lang=zh_tw` 參數
2. 檢查 HTML 的 `<meta charset="UTF-8">`
3. 確認檔案編碼為 UTF-8

---

## 效能優化建議

### 1. 快取策略優化

```javascript
// 根據天氣變化頻率調整快取時間
var cacheTime = 600; // 10 分鐘

// 熱門城市可以延長快取時間
if (['Taipei', 'Tokyo', 'London'].indexOf(city) !== -1) {
  cacheTime = 1800; // 30 分鐘
}
```

### 2. 請求去抖動

```javascript
var searchTimeout;

function searchWeather() {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(function() {
    // 執行查詢
  }, 500);
}
```

### 3. 預載常用城市

```javascript
function preloadPopularCities() {
  var cities = ['Taipei', 'Tokyo', 'Seoul', 'Bangkok'];
  
  cities.forEach(function(city) {
    getWeather(city);
    Utilities.sleep(200);
  });
}
```

---

## 進階功能實作

### 功能 1：5 天天氣預報

```javascript
function getWeatherForecast(city) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  var url = 'https://api.openweathermap.org/data/2.5/forecast' +
            '?q=' + encodeURIComponent(city) +
            '&appid=' + apiKey +
            '&units=metric' +
            '&lang=zh_tw';
  
  // 實作邏輯...
}
```

### 功能 2：多城市比較

```javascript
function compareMultipleCities(cities) {
  var results = [];
  
  cities.forEach(function(city) {
    var weather = getWeather(city);
    if (weather.success) {
      results.push(weather.data);
    }
  });
  
  return results;
}
```

### 功能 3：歷史記錄

```javascript
function saveSearchHistory(city) {
  var props = PropertiesService.getUserProperties();
  var history = JSON.parse(props.getProperty('SEARCH_HISTORY') || '[]');
  
  // 避免重複
  history = history.filter(function(item) {
    return item !== city;
  });
  
  // 加到最前面
  history.unshift(city);
  
  // 只保留最近 10 筆
  history = history.slice(0, 10);
  
  props.setProperty('SEARCH_HISTORY', JSON.stringify(history));
}
```

---

## 學習檢核清單

完成本專案後，確認你已掌握以下技能：

### 後端技能
- ✅ 使用 UrlFetchApp 呼叫外部 API
- ✅ 處理 API 認證（API Key）
- ✅ 解析 JSON 資料
- ✅ 實作錯誤處理機制
- ✅ 使用 CacheService 實作快取
- ✅ 使用 PropertiesService 儲存設定

### 前端技能
- ✅ 建立 HTML 表單
- ✅ 使用 Bootstrap 美化介面
- ✅ 實作 JavaScript 事件處理
- ✅ 使用 google.script.run 呼叫後端
- ✅ 動態更新 UI
- ✅ 處理非同步操作

### 整合技能
- ✅ 前後端資料傳遞
- ✅ 錯誤處理與使用者提示
- ✅ 效能優化（快取）
- ✅ 使用者體驗設計
- ✅ Web App 部署

---

## 下一步

完成本專案後，你可以：

1. **擴展功能**
   - 加入 5 天天氣預報
   - 實作多城市比較
   - 加入地理位置自動偵測

2. **優化體驗**
   - 加入動畫效果
   - 實作深色模式
   - 加入更多天氣圖示

3. **學習進階主題**
   - OAuth 2.0 認證
   - WebSocket 即時更新
   - Service Worker 離線支援

4. **開發其他專案**
   - 匯率查詢 App
   - 新聞聚合器
   - 股票追蹤器

恭喜你完成天氣查詢 Web App！繼續加油！🎉
