# 實作案例 3：Google Form 自動收集與統計 - 實作指引

## 前言

本指引將帶領你逐步完成 Google Form 自動收集與統計系統的開發。請按照步驟依序進行，每個步驟都包含詳細的說明與程式碼。

## 開發環境準備

### 1. 建立 Apps Script 專案

1. 開啟 [Google Apps Script](https://script.google.com/)
2. 點擊「新專案」
3. 將專案命名為「表單自動收集與統計」

### 2. 複製程式碼

1. 將 `Code.gs` 的內容複製到 Apps Script 編輯器
2. 儲存專案（Ctrl+S 或 Cmd+S）

## 實作步驟

### 步驟 1：建立表單與試算表

#### 1.1 執行建立函式

1. 在 Apps Script 編輯器中，選擇函式 `createFormAndSpreadsheet`
2. 點擊「執行」按鈕（▶️）
3. 第一次執行時，需要授權腳本權限：
   - 點擊「檢閱權限」
   - 選擇你的 Google 帳號
   - 點擊「進階」→「前往專案名稱（不安全）」
   - 點擊「允許」

#### 1.2 查看執行結果

執行完成後，查看執行記錄（Ctrl+Enter 或 Cmd+Enter）：

```
=== 建立表單 ===
表單名稱：課程滿意度調查

✅ 已新增題目：姓名
✅ 已新增題目：課程內容滿意度
✅ 已新增題目：講師教學滿意度
✅ 已新增題目：課程難度
✅ 已新增題目：整體評分
✅ 已新增題目：建議與回饋

=== 建立試算表 ===
試算表名稱：課程滿意度調查 - 回應
試算表 ID：1ABC...XYZ

✅ 已建立工作表：統計分析
✅ 已建立工作表：選項統計

=== 完成 ===
表單 URL：
https://docs.google.com/forms/d/...

試算表 URL：
https://docs.google.com/spreadsheets/d/...

📝 請將試算表 ID 複製到程式碼中的 SPREADSHEET_ID 變數
試算表 ID：1ABC...XYZ
```

#### 1.3 設定試算表 ID

1. 從執行記錄中複製試算表 ID
2. 在程式碼開頭找到 `SPREADSHEET_ID` 變數
3. 將 ID 貼上：

```javascript
var SPREADSHEET_ID = '1ABC...XYZ';  // 貼上你的試算表 ID
```

4. 儲存程式碼

#### 1.4 檢查建立的表單

1. 點擊執行記錄中的表單 URL
2. 確認表單包含以下題目：
   - 姓名（簡答題）
   - 課程內容滿意度（選擇題）
   - 講師教學滿意度（選擇題）
   - 課程難度（選擇題）
   - 整體評分（線性刻度 1-5）
   - 建議與回饋（段落文字）

#### 1.5 檢查建立的試算表

1. 點擊執行記錄中的試算表 URL
2. 確認試算表包含三個工作表：
   - 表單回應（空白，等待表單提交）
   - 統計分析（空白，等待統計）
   - 選項統計（空白，等待統計）

### 步驟 2：填寫測試資料

#### 2.1 填寫表單

1. 開啟表單 URL
2. 填寫至少 5 筆測試資料
3. 建議填寫不同的選項，以便測試統計功能

**測試資料範例：**

| 姓名 | 課程內容滿意度 | 講師教學滿意度 | 課程難度 | 整體評分 | 建議與回饋 |
|-----|-------------|-------------|---------|---------|-----------|
| 王小明 | 非常滿意 | 滿意 | 適中 | 5 | 課程很棒！ |
| 李小華 | 滿意 | 滿意 | 適中 | 4 | 希望有更多實作 |
| 張小美 | 滿意 | 非常滿意 | 適中 | 5 | 講師教學很清楚 |
| 陳大明 | 普通 | 滿意 | 太困難 | 3 | 進度有點快 |
| 林小芳 | 非常滿意 | 非常滿意 | 適中 | 5 | 非常實用！ |

#### 2.2 確認資料已寫入試算表

1. 開啟試算表
2. 查看「表單回應」工作表
3. 確認有 5 筆回應資料

### 步驟 3：執行統計分析

#### 3.1 執行分析函式

1. 回到 Apps Script 編輯器
2. 選擇函式 `analyzeResponses`
3. 點擊「執行」按鈕

#### 3.2 查看執行結果

執行記錄應顯示：

```
=== 開始統計分析 ===

✅ 已讀取 5 筆回應

【基本統計】
總回應數：5
平均評分：4.40
最高評分：5
最低評分：3

✅ 已更新統計分析工作表
✅ 已更新選項統計工作表
✅ 統計分析完成
```

#### 3.3 檢查統計結果

1. 開啟試算表
2. 查看「統計分析」工作表，應包含：
   - 總回應數
   - 平均評分
   - 最高評分
   - 最低評分
   - 各題目的選項統計

3. 查看「選項統計」工作表，應包含：
   - 題目名稱
   - 選項
   - 次數
   - 百分比

### 步驟 4：產生圖表

#### 4.1 執行圖表產生函式

1. 選擇函式 `createCharts`
2. 點擊「執行」按鈕

#### 4.2 查看執行結果

執行記錄應顯示：

```
=== 開始產生圖表 ===

✅ 已產生課程內容滿意度圓餅圖
✅ 已產生講師教學滿意度圓餅圖
✅ 已產生課程難度長條圖

✅ 圖表產生完成
```

#### 4.3 檢查圖表

1. 開啟試算表
2. 查看「選項統計」工作表
3. 應該看到三個圖表：
   - 課程內容滿意度（圓餅圖）
   - 講師教學滿意度（圓餅圖）
   - 課程難度（長條圖）

### 步驟 5：設定自動觸發器

#### 5.1 執行觸發器設定函式

1. 選擇函式 `setupTrigger`
2. 點擊「執行」按鈕

#### 5.2 查看執行結果

執行記錄應顯示：

```
✅ 已設定表單提交觸發器
當有新的表單回應時，會自動執行統計分析
```

#### 5.3 確認觸發器已建立

1. 在 Apps Script 編輯器左側，點擊「觸發器」圖示（⏰）
2. 應該看到一個觸發器：
   - 函式：`onFormSubmit`
   - 事件來源：來自試算表
   - 事件類型：提交表單時

#### 5.4 測試自動觸發

1. 開啟表單 URL
2. 填寫一筆新的回應
3. 提交表單
4. 等待約 10 秒
5. 開啟試算表，查看統計是否自動更新

### 步驟 6：測試完整流程

#### 6.1 執行完整流程

1. 選擇函式 `runFullProcess`
2. 點擊「執行」按鈕
3. 這會依序執行統計分析和圖表產生

#### 6.2 驗證結果

1. 開啟試算表
2. 確認所有工作表都有最新資料
3. 確認圖表正確顯示

## 程式碼說明

### 核心函式解析

#### 1. createFormAndSpreadsheet()

**功能：** 建立表單與試算表

**關鍵程式碼：**

```javascript
// 建立表單
var form = FormApp.create('課程滿意度調查');

// 新增選擇題
var contentItem = form.addMultipleChoiceItem();
contentItem.setTitle('課程內容滿意度');
contentItem.setChoiceValues(['非常滿意', '滿意', '普通', '不滿意', '非常不滿意']);
contentItem.setRequired(true);

// 建立試算表
var spreadsheet = SpreadsheetApp.create('課程滿意度調查 - 回應');

// 連結表單與試算表
form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
```

**學習重點：**
- `FormApp.create()` - 建立新表單
- `addMultipleChoiceItem()` - 新增選擇題
- `addScaleItem()` - 新增線性刻度題
- `setDestination()` - 設定表單回應目的地

#### 2. getFormResponses()

**功能：** 讀取表單回應資料

**關鍵程式碼：**

```javascript
var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
var sheet = spreadsheet.getSheetByName(SHEET_RESPONSES);
var data = sheet.getDataRange().getValues();

// 移除標題列
var headers = data.shift();
```

**學習重點：**
- `openById()` - 使用 ID 開啟試算表
- `getDataRange()` - 取得所有資料範圍
- `getValues()` - 讀取資料為二維陣列
- `shift()` - 移除陣列第一個元素

#### 3. analyzeResponses()

**功能：** 統計分析回應資料

**關鍵程式碼：**

```javascript
// 統計選項次數
var contentStats = {};
for (var i = 0; i < responses.length; i++) {
  var answer = responses[i][3];
  contentStats[answer] = (contentStats[answer] || 0) + 1;
}

// 計算平均值
var avgRating = ratings.reduce(function(a, b) { return a + b; }) / ratings.length;
```

**學習重點：**
- 使用物件統計次數
- `reduce()` - 陣列累加
- 計算百分比

#### 4. createCharts()

**功能：** 產生統計圖表

**關鍵程式碼：**

```javascript
var chart = sheet.newChart()
  .setChartType(Charts.ChartType.PIE)
  .addRange(sheet.getRange(1, 1, chartData.length, 2))
  .setPosition(anchorRow, anchorCol, 0, 0)
  .setOption('title', title)
  .setOption('width', 400)
  .setOption('height', 300)
  .build();

sheet.insertChart(chart);
```

**學習重點：**
- `newChart()` - 建立圖表建構器
- `setChartType()` - 設定圖表類型
- `addRange()` - 指定資料範圍
- `setOption()` - 設定圖表選項
- `insertChart()` - 插入圖表到工作表

#### 5. setupTrigger()

**功能：** 設定表單提交觸發器

**關鍵程式碼：**

```javascript
ScriptApp.newTrigger('onFormSubmit')
  .forSpreadsheet(spreadsheet)
  .onFormSubmit()
  .create();
```

**學習重點：**
- `ScriptApp.newTrigger()` - 建立觸發器
- `forSpreadsheet()` - 指定試算表
- `onFormSubmit()` - 表單提交事件
- `create()` - 建立觸發器

## 常見問題與解決方案

### Q1：執行 createFormAndSpreadsheet 時出現權限錯誤

**解決方案：**
1. 點擊「檢閱權限」
2. 選擇你的 Google 帳號
3. 點擊「進階」
4. 點擊「前往專案名稱（不安全）」
5. 點擊「允許」

### Q2：統計分析沒有資料

**可能原因：**
- 尚未填寫表單
- SPREADSHEET_ID 未設定或錯誤

**解決方案：**
1. 確認已填寫至少一筆表單
2. 檢查 SPREADSHEET_ID 是否正確
3. 確認試算表「表單回應」工作表有資料

### Q3：圖表沒有顯示

**可能原因：**
- 尚未執行統計分析
- 資料格式不正確

**解決方案：**
1. 先執行 `analyzeResponses()`
2. 確認「選項統計」工作表有資料
3. 再執行 `createCharts()`

### Q4：觸發器沒有自動執行

**可能原因：**
- 觸發器未正確設定
- 權限問題

**解決方案：**
1. 檢查觸發器是否存在（左側觸發器圖示）
2. 重新執行 `setupTrigger()`
3. 查看執行記錄是否有錯誤訊息

### Q5：欄位順序不符

**可能原因：**
- 表單題目順序與程式碼假設不同

**解決方案：**
1. 查看「表單回應」工作表的欄位順序
2. 修改 `analyzeResponses()` 中的欄位索引
3. 例如：`var contentAnswer = response[3];` 改為正確的索引

## 延伸練習

完成基本功能後，可以嘗試以下延伸練習：

### 練習 1：新增更多統計指標

在統計分析中新增：
- 中位數
- 標準差
- 滿意度（非常滿意+滿意）比例

### 練習 2：自動寄送感謝信

表單提交後自動寄送感謝信給填寫者：

```javascript
function onFormSubmit(e) {
  // 取得填寫者 Email
  var email = e.values[1];  // 假設 Email 在第 2 欄
  
  // 寄送感謝信
  MailApp.sendEmail({
    to: email,
    subject: '感謝您填寫課程滿意度調查',
    body: '感謝您的寶貴意見！我們會持續改進課程品質。'
  });
  
  // 執行統計分析
  analyzeResponses();
  createCharts();
}
```

### 練習 3：定期統計報表

每週自動產生統計報表並寄送給管理員：

```javascript
function sendWeeklyReport() {
  // 執行統計
  analyzeResponses();
  createCharts();
  
  // 取得試算表 URL
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var url = spreadsheet.getUrl();
  
  // 寄送報表
  MailApp.sendEmail({
    to: 'admin@example.com',
    subject: '每週課程滿意度統計報表',
    body: '本週統計報表已更新，請查看：\n' + url
  });
}

// 設定每週一早上 9 點執行
function setupWeeklyTrigger() {
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
}
```

### 練習 4：異常回應提醒

當收到低分評價時自動通知：

```javascript
function onFormSubmit(e) {
  var rating = e.values[6];  // 假設評分在第 7 欄
  
  // 如果評分低於 3 分，發送提醒
  if (rating < 3) {
    MailApp.sendEmail({
      to: 'admin@example.com',
      subject: '⚠️ 收到低分評價',
      body: '有學生給予 ' + rating + ' 分的評價，請關注。'
    });
  }
  
  // 執行統計分析
  analyzeResponses();
  createCharts();
}
```

## 總結

恭喜你完成了 Google Form 自動收集與統計系統！

你已經學會：
- ✅ 使用 FormApp 建立表單
- ✅ 讀取表單回應資料
- ✅ 統計分析資料
- ✅ 產生視覺化圖表
- ✅ 設定表單提交觸發器
- ✅ 自動化資料處理流程

這個系統可以應用在：
- 課程滿意度調查
- 活動報名統計
- 問卷調查分析
- 意見回饋收集

繼續探索更多功能，讓你的系統更加完善！
