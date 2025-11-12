# 實作案例 3：Google Form 自動收集與統計 - 逐步實作指引

## 📋 目錄

1. [專案準備](#專案準備)
2. [階段 1：建立表單](#階段-1建立表單)
3. [階段 2：設定資料收集](#階段-2設定資料收集)
4. [階段 3：實作統計分析](#階段-3實作統計分析)
5. [階段 4：產生圖表](#階段-4產生圖表)
6. [階段 5：設定觸發器](#階段-5設定觸發器)
7. [測試與除錯](#測試與除錯)
8. [常見問題](#常見問題)

---

## 專案準備

### 1. 建立新的 Google Apps Script 專案

1. 開啟 [Google Apps Script](https://script.google.com/)
2. 點選「新專案」
3. 將專案命名為「表單自動統計系統」
4. 將 `Code.gs` 中的程式碼複製到編輯器

### 2. 了解專案結構

```
專案架構：
├── Code.gs (主程式)
│   ├── 全域設定
│   ├── 建立表單函式
│   ├── 觸發器處理函式
│   ├── 統計分析函式
│   ├── 圖表產生函式
│   └── 測試函式
```

### 3. 需要的權限

執行程式時，系統會要求以下權限：
- ✓ 建立與管理 Google Form
- ✓ 讀寫 Google Sheets
- ✓ 建立觸發器

---

## 階段 1：建立表單

### 步驟 1.1：執行建立表單函式

1. 在編輯器中找到 `createSurveyForm()` 函式
2. 點選函式名稱
3. 點選上方的「執行」按鈕（▶️）
4. 首次執行需要授權，點選「檢查權限」
5. 選擇您的 Google 帳號
6. 點選「進階」→「前往專案（不安全）」→「允許」

### 步驟 1.2：查看建立結果

執行完成後：
1. 點選下方的「執行記錄」
2. 查看記錄中的表單網址和試算表網址
3. 複製這兩個網址並開啟

```javascript
// 執行記錄範例：
// 表單建立成功！
// 表單網址：https://docs.google.com/forms/d/xxxxx/edit
// 試算表網址：https://docs.google.com/spreadsheets/d/xxxxx/edit
```

### 步驟 1.3：檢查表單內容

開啟表單後，確認包含以下題目：

- ✓ 姓名（文字題，必填）
- ✓ 課程整體滿意度（單選題，必填）
- ✓ 最喜歡的課程單元（多選題）
- ✓ 課程難度評分（評分題，1-5 分）
- ✓ 建議與回饋（長文字題）

### 💡 重點說明

**FormApp 服務的核心方法：**

```javascript
// 建立表單
var form = FormApp.create('表單標題');

// 設定表單屬性
form.setDescription('表單說明');
form.setCollectEmail(false);  // 不收集 Email

// 新增文字題
var textItem = form.addTextItem();
textItem.setTitle('題目標題');
textItem.setRequired(true);  // 設為必填

// 新增單選題
var choiceItem = form.addMultipleChoiceItem();
choiceItem.setTitle('題目標題');
choiceItem.setChoiceValues(['選項1', '選項2', '選項3']);

// 新增多選題
var checkboxItem = form.addCheckboxItem();
checkboxItem.setChoiceValues(['選項1', '選項2']);

// 新增評分題
var scaleItem = form.addScaleItem();
scaleItem.setBounds(1, 5);  // 設定分數範圍

// 連結到試算表
form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
```

---

## 階段 2：設定資料收集

### 步驟 2.1：了解試算表結構

開啟建立的試算表，你會看到：

1. **工作表 1：「表單回應 1」**（自動產生）
   - 由 Google Form 自動建立
   - 每次有人填寫表單，資料會自動新增到這裡
   - 第一欄是時間戳記

2. **工作表 2：「統計分析」**（程式建立）
   - 用來顯示統計結果
   - 包含標題列：題目、選項、數量、百分比、備註

### 步驟 2.2：測試表單填寫

1. 開啟表單的「預覽」模式（點選右上角的眼睛圖示）
2. 填寫並提交表單
3. 回到試算表，確認資料已自動新增

### 步驟 2.3：產生測試資料

為了方便測試，可以執行 `generateTestResponses()` 函式：

1. 在編輯器中選擇 `generateTestResponses` 函式
2. 點選「執行」
3. 這會自動新增 5 筆測試資料並執行分析

---

## 階段 3：實作統計分析

### 步驟 3.1：理解統計邏輯

統計分析函式 `analyzeResponses()` 會：

1. 讀取所有表單回應
2. 根據題目類型進行不同的統計：
   - **文字題**：統計回答人數
   - **選擇題**：統計各選項次數與百分比
   - **評分題**：計算平均分數與分數分布
3. 將結果寫入「統計分析」工作表

### 步驟 3.2：手動執行統計

1. 確保試算表中有回應資料
2. 在編輯器中選擇 `manualAnalysis` 函式
3. 點選「執行」
4. 查看「統計分析」工作表的結果

### 步驟 3.3：檢查統計結果

統計分析工作表應該顯示：

```
題目                    | 選項/統計項目 | 數量 | 百分比  | 備註
--------------------|-----------|-----|-------|--------
課程整體滿意度            | 非常滿意      | 2   | 40.0% |
                    | 滿意        | 2   | 40.0% |
                    | 普通        | 1   | 20.0% |
                    |           |     |       |
最喜歡的課程單元（可複選）    | JavaScript 基礎 | 3 | 60.0% |
                    | Web App 開發 | 2 | 40.0% |
...
```

### 💡 重點說明

**統計分析的核心邏輯：**

```javascript
// 1. 讀取所有回應
var data = responseSheet.getDataRange().getValues();
var headers = data[0];
var responses = data.slice(1);

// 2. 統計選項次數
var optionCounts = {};
for (var i = 0; i < responses.length; i++) {
  var answer = responses[i][columnIndex];
  optionCounts[answer] = (optionCounts[answer] || 0) + 1;
}

// 3. 計算百分比
var percentage = (count / totalResponses * 100).toFixed(1) + '%';

// 4. 處理多選題（以逗號分隔）
var options = answer.split(',');
for (var j = 0; j < options.length; j++) {
  var option = options[j].trim();
  optionCounts[option] = (optionCounts[option] || 0) + 1;
}

// 5. 計算平均分數
var sum = scores.reduce(function(acc, val) { 
  return acc + Number(val); 
}, 0);
var average = (sum / scores.length).toFixed(2);
```

---

## 階段 4：產生圖表

### 步驟 4.1：理解圖表類型

程式會根據題目類型產生不同的圖表：

- **滿意度題目** → 圓餅圖（Pie Chart）
- **評分題目** → 長條圖（Column Chart）
- **其他選擇題** → 橫向長條圖（Bar Chart）

### 步驟 4.2：執行圖表產生

圖表會在執行 `manualAnalysis()` 時自動產生，或單獨執行：

1. 確保已執行統計分析
2. 在編輯器中選擇 `generateCharts` 函式
3. 傳入試算表物件並執行
4. 查看「統計分析」工作表右側的圖表

### 步驟 4.3：調整圖表位置

圖表會自動放置在工作表的右側（F 欄開始）。如需調整：

1. 修改 `CONFIG` 中的設定：
```javascript
var CONFIG = {
  CHART_POSITION_ROW: 2,    // 起始列
  CHART_POSITION_COL: 6     // 起始欄（F 欄）
};
```

### 💡 重點說明

**圖表產生的核心方法：**

```javascript
// 建立圓餅圖
var chart = statsSheet.newChart()
  .setChartType(Charts.ChartType.PIE)
  .addRange(dataRange)
  .setPosition(row, col, 0, 0)
  .setOption('title', '圖表標題')
  .setOption('width', 400)
  .setOption('height', 300)
  .setOption('pieHole', 0.4)  // 甜甜圈效果
  .build();

statsSheet.insertChart(chart);

// 建立長條圖
var chart = statsSheet.newChart()
  .setChartType(Charts.ChartType.COLUMN)
  .addRange(dataRange)
  .setOption('legend', {position: 'none'})
  .setOption('hAxis', {title: 'X 軸標題'})
  .setOption('vAxis', {title: 'Y 軸標題'})
  .build();
```

---

## 階段 5：設定觸發器

### 步驟 5.1：建立表單提交觸發器

1. 開啟包含表單回應的試算表
2. 點選「擴充功能」→「Apps Script」
3. 將 Code.gs 的程式碼貼上（如果還沒有）
4. 執行 `setupFormSubmitTrigger()` 函式
5. 查看執行記錄確認觸發器建立成功

### 步驟 5.2：驗證觸發器

1. 在編輯器中點選左側的「觸發器」圖示（⏰）
2. 確認看到一個觸發器：
   - 函式：`onFormSubmit`
   - 事件來源：來自試算表
   - 事件類型：提交表單時

### 步驟 5.3：測試自動執行

1. 開啟表單並填寫新的回應
2. 提交表單
3. 等待幾秒鐘
4. 回到試算表的「統計分析」工作表
5. 確認統計資料和圖表已自動更新

### 💡 重點說明

**觸發器的運作方式：**

```javascript
// 設定觸發器
ScriptApp.newTrigger('onFormSubmit')
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()  // 表單提交時觸發
  .create();

// 觸發器會呼叫的函式
function onFormSubmit(e) {
  // e 是事件物件，包含表單回應資訊
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  analyzeResponses(spreadsheet);
  generateCharts(spreadsheet);
}
```

**注意事項：**
- 觸發器有執行時間限制（6 分鐘）
- 如果資料量很大，可能需要優化程式碼
- 觸發器執行失敗會收到 Email 通知

---

## 測試與除錯

### 測試清單

完成實作後，請依序測試以下項目：

- [ ] 表單可以正常開啟並填寫
- [ ] 表單回應自動記錄到試算表
- [ ] 手動執行統計分析功能正常
- [ ] 統計結果正確顯示在「統計分析」工作表
- [ ] 圖表正確產生並顯示
- [ ] 觸發器已正確設定
- [ ] 提交新表單後統計自動更新
- [ ] 多筆回應的統計計算正確

### 除錯技巧

#### 1. 查看執行記錄

```javascript
// 在程式中加入 Logger.log() 來追蹤執行過程
Logger.log('開始分析，共有 ' + responses.length + ' 筆回應');
Logger.log('選項統計：' + JSON.stringify(optionCounts));
```

查看記錄：點選編輯器下方的「執行記錄」

#### 2. 使用 try-catch 捕捉錯誤

```javascript
try {
  // 你的程式碼
} catch (error) {
  Logger.log('發生錯誤：' + error.message);
  Logger.log('錯誤堆疊：' + error.stack);
}
```

#### 3. 測試個別函式

不要一次執行全部，先測試個別函式：
1. 先測試 `createSurveyForm()`
2. 再測試 `analyzeResponses()`
3. 最後測試 `generateCharts()`

#### 4. 檢查資料格式

```javascript
// 檢查讀取的資料
var data = sheet.getDataRange().getValues();
Logger.log('資料列數：' + data.length);
Logger.log('第一列：' + JSON.stringify(data[0]));
```

---

## 常見問題

### Q1: 執行 createSurveyForm() 時出現權限錯誤

**解決方案：**
1. 點選「檢查權限」
2. 選擇您的 Google 帳號
3. 點選「進階」→「前往專案（不安全）」
4. 點選「允許」授予權限

### Q2: 統計分析沒有資料

**可能原因：**
- 表單還沒有回應資料
- 工作表名稱不正確

**解決方案：**
1. 確認試算表中有回應資料
2. 檢查工作表名稱是否為「表單回應 1」或類似名稱
3. 執行 `generateTestResponses()` 產生測試資料

### Q3: 圖表沒有顯示

**可能原因：**
- 統計資料不足
- 圖表被刪除了

**解決方案：**
1. 確認「統計分析」工作表有資料
2. 重新執行 `manualAnalysis()`
3. 檢查執行記錄是否有錯誤訊息

### Q4: 觸發器沒有自動執行

**可能原因：**
- 觸發器沒有正確設定
- 程式有錯誤導致執行失敗

**解決方案：**
1. 檢查「觸發器」頁面確認觸發器存在
2. 查看觸發器的執行記錄（點選觸發器右側的「...」→「執行記錄」）
3. 如果有錯誤，修正後重新設定觸發器

### Q5: 多選題的統計不正確

**可能原因：**
- 多選題的答案格式不是以逗號分隔

**解決方案：**
檢查表單回應的格式，Google Form 的多選題會以逗號加空格分隔（例如：「選項1, 選項2」）

### Q6: 圖表位置重疊

**解決方案：**
調整 `generateCharts()` 函式中的 `chartRow` 增量：

```javascript
chartRow += 20; // 增加間距，避免重疊
```

---

## 🎯 學習檢核點

完成本專案後，你應該能夠：

- ✅ 使用 FormApp 程式化建立表單
- ✅ 設定不同類型的表單題目（文字、單選、多選、評分）
- ✅ 將表單連結到試算表
- ✅ 讀取並處理表單回應資料
- ✅ 進行資料統計分析（計數、百分比、平均值）
- ✅ 使用 Charts 服務產生圖表
- ✅ 設定表單提交觸發器
- ✅ 處理觸發器事件
- ✅ 整合多個 GAS 服務完成完整功能

---

## 🚀 延伸挑戰

完成基本功能後，試試看這些進階功能：

1. **Email 通知**
   - 達到 10 筆回應時自動寄信通知管理員
   - 在郵件中包含統計摘要

2. **進階圖表**
   - 新增趨勢圖（比較不同時間段的回應）
   - 新增交叉分析（例如：不同滿意度的人選擇的課程單元）

3. **資料篩選**
   - 新增日期範圍篩選
   - 只統計特定條件的回應

4. **Web App 介面**
   - 建立 Web App 顯示即時統計
   - 提供互動式圖表

5. **匯出功能**
   - 將統計結果匯出為 PDF
   - 產生 PowerPoint 簡報

---

## 📚 相關學習資源

- [FormApp 官方文件](https://developers.google.com/apps-script/reference/forms)
- [SpreadsheetApp 官方文件](https://developers.google.com/apps-script/reference/spreadsheet)
- [Charts 服務文件](https://developers.google.com/apps-script/reference/charts)
- [觸發器官方指南](https://developers.google.com/apps-script/guides/triggers)

---

**恭喜你完成實作案例 3！** 🎉

你現在已經掌握了表單自動收集與統計的完整流程，這個技能可以應用在問卷調查、活動報名、意見收集等各種場景。繼續加油！
