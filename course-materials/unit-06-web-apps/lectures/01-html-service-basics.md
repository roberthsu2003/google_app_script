# HTML Service 基礎

## 學習目標

- 理解 HTML Service 的概念與應用
- 掌握建立 Web App 的基本方法
- 學習 doGet() 和 doPost() 函式
- 了解 Web App 的部署與權限設定
- 掌握測試與除錯技巧

## HTML Service 簡介

HTML Service 是 Google Apps Script 提供的服務，讓您可以建立網頁應用程式（Web App）。透過 HTML Service，您可以：

- 建立使用者介面
- 顯示動態內容
- 接收使用者輸入
- 與後端 GAS 程式碼互動
- 整合 Google 服務

### 應用場景

- 資料輸入表單
- 查詢系統
- 儀表板與報表
- 檔案上傳工具
- 管理介面

## 建立第一個 Web App

### 基本結構

一個 Web App 包含兩個部分：

1. **後端程式碼**（Code.gs）：處理邏輯與資料
2. **前端頁面**（HTML 檔案）：使用者介面

### 步驟 1：建立 HTML 檔案

在 Apps Script 編輯器中：
1. 點選「檔案」→「新增」→「HTML」
2. 命名為 `index.html`
3. 輸入 HTML 內容

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <title>我的第一個 Web App</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>這是我的第一個 Google Apps Script Web App</p>
  </body>
</html>
```

### 步驟 2：建立 doGet() 函式

在 `Code.gs` 中：

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
```

### 步驟 3：部署 Web App

1. 點選「部署」→「新增部署作業」
2. 選擇類型：「網頁應用程式」
3. 設定：
   - 說明：第一個版本
   - 執行身分：我
   - 具有存取權的使用者：任何人
4. 點選「部署」
5. 複製網頁應用程式 URL

### 步驟 4：測試

開啟網頁應用程式 URL，應該會看到「Hello, World!」頁面。

## doGet() 和 doPost()

### doGet() - 處理 GET 請求

當使用者訪問 Web App URL 時，會執行 `doGet()` 函式。

```javascript
function doGet(e) {
  // e 是事件物件，包含請求參數
  return HtmlService.createHtmlOutputFromFile('index');
}
```

### doPost() - 處理 POST 請求

當表單以 POST 方式提交時，會執行 `doPost()` 函式。

```javascript
function doPost(e) {
  // 處理 POST 資料
  var data = e.parameter;
  
  // 回傳結果
  return HtmlService.createHtmlOutput('資料已接收');
}
```

### 事件物件（e）

```javascript
function doGet(e) {
  // 取得 URL 參數
  var name = e.parameter.name;
  var age = e.parameter.age;
  
  Logger.log('姓名：' + name);
  Logger.log('年齡：' + age);
  
  return HtmlService.createHtmlOutput('Hello, ' + name);
}
```

訪問：`https://script.google.com/...?name=John&age=25`

## 建立 HTML 輸出的方法

### 方法 1：從檔案建立

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
```

### 方法 2：從字串建立

```javascript
function doGet() {
  var html = '<h1>Hello</h1><p>這是動態產生的內容</p>';
  return HtmlService.createHtmlOutput(html);
}
```

### 方法 3：使用範本

```javascript
function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  
  // 設定範本變數
  template.userName = 'John';
  template.currentDate = new Date();
  
  return template.evaluate();
}
```

在 `index.html` 中使用範本變數：

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>歡迎，<?= userName ?>！</h1>
    <p>今天是：<?= currentDate ?></p>
  </body>
</html>
```

## 設定 HTML 輸出屬性

### 設定標題

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('我的 Web App');
}
```

### 設定寬度與高度（對話框使用）

```javascript
function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('dialog')
    .setWidth(400)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(html, '對話框標題');
}
```

### 設定 X-Frame-Options

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

## 包含其他 HTML 檔案

### include() 函式

在 `Code.gs` 中建立 include 函式：

```javascript
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

在 HTML 中使用：

```html
<!DOCTYPE html>
<html>
  <head>
    <?!= include('stylesheet') ?>
  </head>
  <body>
    <h1>主頁面</h1>
    <?!= include('content') ?>
  </body>
</html>
```

建立 `stylesheet.html`：

```html
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  h1 {
    color: #4285f4;
  }
</style>
```

## Web App 部署設定

### 執行身分

- **我**：以您的身分執行，使用您的權限
- **存取網頁應用程式的使用者**：以訪問者的身分執行

### 具有存取權的使用者

- **僅限我自己**：只有您可以訪問
- **網域內的任何人**：您的 Google Workspace 網域內的使用者
- **任何人**：任何人都可以訪問（包含匿名使用者）

### 版本管理

每次修改後需要重新部署：
1. 點選「部署」→「管理部署作業」
2. 點選「編輯」
3. 選擇「新版本」
4. 點選「部署」

**測試部署**：
- 點選「部署」→「測試部署作業」
- 使用測試 URL 可以立即看到最新變更
- 不需要建立新版本

## 完整範例：簡單的問候頁面

### Code.gs

```javascript
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('greeting');
  
  // 取得 URL 參數
  var name = e.parameter.name || '訪客';
  
  // 設定範本變數
  template.userName = name;
  template.currentTime = Utilities.formatDate(
    new Date(), 
    'GMT+8', 
    'yyyy-MM-dd HH:mm:ss'
  );
  
  return template.evaluate()
    .setTitle('問候頁面')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

### greeting.html

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <?!= include('stylesheet') ?>
  </head>
  <body>
    <div class="container">
      <h1>歡迎，<?= userName ?>！</h1>
      <p>現在時間：<?= currentTime ?></p>
      <p>感謝您訪問我們的 Web App。</p>
    </div>
  </body>
</html>
```

### stylesheet.html

```html
<style>
  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    text-align: center;
  }
  
  h1 {
    color: #667eea;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
</style>
```

## 測試與除錯

### 方法 1：使用測試部署

1. 點選「部署」→「測試部署作業」
2. 複製測試 URL
3. 在瀏覽器中開啟
4. 修改程式碼後，重新整理頁面即可看到變更

### 方法 2：使用 Logger.log()

在後端程式碼中：

```javascript
function doGet(e) {
  Logger.log('doGet 被呼叫');
  Logger.log('參數：' + JSON.stringify(e.parameter));
  
  return HtmlService.createHtmlOutputFromFile('index');
}
```

查看執行記錄：
1. 訪問 Web App
2. 回到 Apps Script 編輯器
3. 點選「執行作業」查看記錄

### 方法 3：使用瀏覽器開發者工具

1. 在 Web App 頁面按 F12 開啟開發者工具
2. 查看 Console 標籤的錯誤訊息
3. 使用 Network 標籤檢查請求

### 方法 4：在前端使用 console.log()

```html
<script>
  console.log('頁面已載入');
  console.log('測試資料：', { name: 'John', age: 25 });
</script>
```

## 常見問題

### Q1: 修改程式碼後沒有變化？
A: 需要重新部署或使用測試部署 URL。

### Q2: 出現「授權需求」錯誤？
A: 需要授權 Web App 的權限，點選「審查權限」並允許。

### Q3: 如何傳遞參數給 Web App？
A: 在 URL 後加上參數，例如：`?name=John&age=25`

### Q4: 如何在 Web App 中使用 CSS 和 JavaScript？
A: 可以直接寫在 HTML 中，或使用 include() 函式引入。

## GAS 支援說明

✅ **完全支援**：HTML Service 的所有功能在 GAS 中都完全支援。

## 最佳實踐

1. **使用範本**：將動態內容與靜態 HTML 分離
2. **模組化**：使用 include() 分離 CSS 和 JavaScript
3. **測試部署**：開發時使用測試部署，正式發布時建立新版本
4. **錯誤處理**：在前後端都加入適當的錯誤處理
5. **安全性**：注意權限設定，避免洩露敏感資料

## 下一步

學習前後端互動，使用 google.script.run 呼叫後端函式。
