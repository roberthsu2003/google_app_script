# UrlFetchApp 與 RESTful API

## 學習目標

- 理解 RESTful API 的基本概念
- 掌握 HTTP 方法的使用時機
- 學會使用 UrlFetchApp 呼叫外部 API
- 了解 API 認證的常見方式

## 什麼是 API？

API（Application Programming Interface，應用程式介面）是不同軟體系統之間溝通的橋樑。透過 API，我們可以：

- 取得外部服務的資料（如天氣資訊、匯率資料）
- 將資料傳送到其他系統（如發送訊息到 Slack）
- 整合第三方服務到我們的應用程式中

### 日常生活中的 API 範例

1. **天氣 App**：從氣象局 API 取得天氣預報
2. **地圖導航**：使用 Google Maps API 顯示地圖和路線
3. **社群媒體**：透過 Facebook API 分享貼文
4. **金融服務**：從銀行 API 查詢帳戶餘額

## RESTful API 基本概念

REST（Representational State Transfer）是一種設計 API 的架構風格，具有以下特點：

### 1. 使用 HTTP 協定

RESTful API 使用標準的 HTTP 協定進行通訊，包括：
- **URL（網址）**：指定要存取的資源
- **HTTP 方法**：指定要執行的操作
- **HTTP 標頭**：傳遞額外資訊（如認證資訊）
- **請求主體**：傳送資料給伺服器
- **回應主體**：伺服器回傳的資料

### 2. 資源導向

每個 URL 代表一個資源（Resource），例如：
- `https://api.example.com/users` - 使用者清單
- `https://api.example.com/users/123` - ID 為 123 的使用者
- `https://api.example.com/products` - 產品清單

### 3. 無狀態（Stateless）

每個請求都是獨立的，伺服器不會記住之前的請求狀態。

## HTTP 方法

HTTP 定義了多種方法來操作資源，最常用的四種：

### GET - 讀取資料

用於從伺服器取得資料，不會修改伺服器上的資料。

**範例：**
```
GET https://api.example.com/users/123
```
取得 ID 為 123 的使用者資料

**特點：**
- ✅ 安全：不會修改資料
- ✅ 可快取：可以被瀏覽器快取
- ✅ 可重複執行：多次執行結果相同

### POST - 建立資料

用於在伺服器上建立新資源。

**範例：**
```
POST https://api.example.com/users
Body: { "name": "王小明", "email": "wang@example.com" }
```
建立一個新使用者

**特點：**
- ❌ 不安全：會修改伺服器資料
- ❌ 不可快取
- ❌ 不可重複執行：每次執行都會建立新資源

### PUT - 更新資料

用於更新伺服器上的現有資源（完整更新）。

**範例：**
```
PUT https://api.example.com/users/123
Body: { "name": "王小明", "email": "new@example.com" }
```
更新 ID 為 123 的使用者資料

**特點：**
- ❌ 不安全：會修改伺服器資料
- ✅ 可重複執行：多次執行結果相同

### DELETE - 刪除資料

用於刪除伺服器上的資源。

**範例：**
```
DELETE https://api.example.com/users/123
```
刪除 ID 為 123 的使用者

**特點：**
- ❌ 不安全：會修改伺服器資料
- ✅ 可重複執行：多次執行結果相同

### HTTP 方法對照表

| 方法 | 用途 | 是否修改資料 | 是否可重複執行 | 常見用途 |
|------|------|-------------|---------------|---------|
| GET | 讀取 | ❌ | ✅ | 查詢資料、取得清單 |
| POST | 建立 | ✅ | ❌ | 新增資料、提交表單 |
| PUT | 更新 | ✅ | ✅ | 完整更新資料 |
| DELETE | 刪除 | ✅ | ✅ | 刪除資料 |

## UrlFetchApp 服務

Google Apps Script 提供 `UrlFetchApp` 服務來呼叫外部 API。

### 基本語法

```javascript
var response = UrlFetchApp.fetch(url);
```

### 完整語法

```javascript
var response = UrlFetchApp.fetch(url, options);
```

### 參數說明

#### url（必填）
要呼叫的 API 網址（字串）

#### options（選填）
一個物件，包含以下可選屬性：

| 屬性 | 說明 | 預設值 |
|------|------|--------|
| `method` | HTTP 方法（'get', 'post', 'put', 'delete'） | 'get' |
| `headers` | HTTP 標頭（物件） | {} |
| `payload` | 請求主體（字串或物件） | null |
| `contentType` | 內容類型 | 'application/x-www-form-urlencoded' |
| `muteHttpExceptions` | 是否靜音 HTTP 錯誤 | false |

### 回應物件

`UrlFetchApp.fetch()` 回傳一個 `HTTPResponse` 物件，常用方法：

| 方法 | 說明 | 回傳值 |
|------|------|--------|
| `getContentText()` | 取得回應內容（文字） | String |
| `getResponseCode()` | 取得 HTTP 狀態碼 | Number |
| `getHeaders()` | 取得回應標頭 | Object |

## 簡單範例

### 範例 1：GET 請求

```javascript
function getExample() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  var response = UrlFetchApp.fetch(url);
  var data = response.getContentText();
  Logger.log(data);
}
```

### 範例 2：POST 請求

```javascript
function postExample() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      title: '測試文章',
      body: '這是文章內容',
      userId: 1
    })
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var data = response.getContentText();
  Logger.log(data);
}
```

## API 認證方式

許多 API 需要認證才能使用，常見的認證方式：

### 1. API Key（最常見）

API Key 是一串唯一的識別碼，通常透過以下方式傳遞：

#### 方式 A：URL 參數
```javascript
var url = 'https://api.example.com/data?api_key=YOUR_API_KEY';
var response = UrlFetchApp.fetch(url);
```

#### 方式 B：HTTP 標頭
```javascript
var url = 'https://api.example.com/data';
var options = {
  'headers': {
    'X-API-Key': 'YOUR_API_KEY'
  }
};
var response = UrlFetchApp.fetch(url, options);
```

### 2. Bearer Token

常用於 OAuth 2.0 認證：

```javascript
var url = 'https://api.example.com/data';
var options = {
  'headers': {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
};
var response = UrlFetchApp.fetch(url, options);
```

### 3. Basic Authentication

使用帳號密碼認證：

```javascript
var url = 'https://api.example.com/data';
var username = 'your_username';
var password = 'your_password';

var options = {
  'headers': {
    'Authorization': 'Basic ' + Utilities.base64Encode(username + ':' + password)
  }
};
var response = UrlFetchApp.fetch(url, options);
```

## 安全儲存 API Key

**❌ 不要直接寫在程式碼中：**
```javascript
var apiKey = 'sk_live_1234567890abcdef'; // 不安全！
```

**✅ 使用 PropertiesService 儲存：**

```javascript
// 設定 API Key（只需執行一次）
function setApiKey() {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('WEATHER_API_KEY', 'your_api_key_here');
}

// 使用 API Key
function useApiKey() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var apiKey = scriptProperties.getProperty('WEATHER_API_KEY');
  
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=' + apiKey;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
```

## HTTP 狀態碼

API 回應會包含狀態碼，表示請求的結果：

### 成功狀態碼（2xx）

| 狀態碼 | 說明 |
|--------|------|
| 200 | OK - 請求成功 |
| 201 | Created - 資源已建立 |
| 204 | No Content - 請求成功但無回應內容 |

### 客戶端錯誤（4xx）

| 狀態碼 | 說明 |
|--------|------|
| 400 | Bad Request - 請求格式錯誤 |
| 401 | Unauthorized - 未授權（需要認證） |
| 403 | Forbidden - 禁止存取 |
| 404 | Not Found - 找不到資源 |
| 429 | Too Many Requests - 請求次數過多 |

### 伺服器錯誤（5xx）

| 狀態碼 | 說明 |
|--------|------|
| 500 | Internal Server Error - 伺服器內部錯誤 |
| 503 | Service Unavailable - 服務暫時無法使用 |

### 檢查狀態碼

```javascript
function checkStatusCode() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  var response = UrlFetchApp.fetch(url);
  var statusCode = response.getResponseCode();
  
  if (statusCode === 200) {
    Logger.log('請求成功！');
    Logger.log(response.getContentText());
  } else {
    Logger.log('請求失敗，狀態碼：' + statusCode);
  }
}
```

## 實用的公開測試 API

以下是一些免費的公開 API，適合練習使用：

### 1. JSONPlaceholder
- **網址**：https://jsonplaceholder.typicode.com
- **說明**：假資料 API，提供使用者、文章、評論等資源
- **認證**：不需要
- **範例**：
  - 取得使用者清單：`GET /users`
  - 取得單一使用者：`GET /users/1`
  - 建立文章：`POST /posts`

### 2. OpenWeatherMap
- **網址**：https://openweathermap.org/api
- **說明**：天氣資料 API
- **認證**：需要 API Key（免費註冊）
- **範例**：
  - 取得城市天氣：`GET /data/2.5/weather?q=Taipei&appid=YOUR_API_KEY`

### 3. CoinGecko
- **網址**：https://www.coingecko.com/en/api
- **說明**：加密貨幣價格 API
- **認證**：不需要（基本功能）
- **範例**：
  - 取得比特幣價格：`GET /api/v3/simple/price?ids=bitcoin&vs_currencies=usd`

### 4. REST Countries
- **網址**：https://restcountries.com
- **說明**：國家資訊 API
- **認證**：不需要
- **範例**：
  - 取得所有國家：`GET /v3.1/all`
  - 搜尋國家：`GET /v3.1/name/taiwan`

## 練習題

### 練習 1：取得使用者清單
使用 JSONPlaceholder API 取得所有使用者，並在 Logger 中顯示每個使用者的姓名和 Email。

### 練習 2：建立新文章
使用 JSONPlaceholder API 建立一篇新文章，標題和內容自訂。

### 練習 3：查詢天氣
註冊 OpenWeatherMap API Key，查詢台北的當前天氣，並顯示溫度和天氣描述。

### 練習 4：取得國家資訊
使用 REST Countries API 查詢台灣的資訊，顯示首都、人口和貨幣。

### 練習 5：錯誤處理
嘗試呼叫一個不存在的 API 端點，並使用 try-catch 處理錯誤。

## 小結

本講義介紹了：

✅ RESTful API 的基本概念
✅ HTTP 方法（GET、POST、PUT、DELETE）的用途
✅ UrlFetchApp 的基本使用方式
✅ API 認證的常見方式
✅ HTTP 狀態碼的意義
✅ 實用的公開測試 API

下一步，我們將學習如何處理 API 回傳的 JSON 資料，以及如何實作完整的錯誤處理機制。

## 延伸閱讀

- [Google Apps Script - UrlFetchApp 官方文件](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app)
- [HTTP 方法詳解](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods)
- [RESTful API 設計指南](https://restfulapi.net/)
