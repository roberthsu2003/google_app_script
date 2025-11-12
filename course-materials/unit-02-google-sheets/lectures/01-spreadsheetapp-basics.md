# SpreadsheetApp 服務架構講義

## 學習目標

- 理解 SpreadsheetApp 服務的基本架構
- 掌握取得試算表的三種方法
- 學會工作表的基本操作
- 熟悉範圍選取的各種方式

## SpreadsheetApp 服務架構

SpreadsheetApp 是 Google Apps Script 中用來操作 Google Sheets 的核心服務。它提供了完整的 API 來讀取、寫入、格式化試算表資料。

### 物件階層結構

```
SpreadsheetApp (服務)
    └── Spreadsheet (試算表)
            └── Sheet (工作表)
                    └── Range (範圍)
                            └── Cell (儲存格)
```

### 基本概念

1. **Spreadsheet（試算表）**：一個完整的 Google Sheets 檔案
2. **Sheet（工作表）**：試算表中的單一分頁
3. **Range（範圍）**：一個或多個儲存格的集合
4. **Cell（儲存格）**：最小的資料單位

## 取得試算表的三種方法

### 1. getActiveSpreadsheet()

取得目前正在編輯的試算表（最常用）。

✅ **GAS 完全支援**

```javascript
function getActiveSpreadsheetExample() {
  // 取得目前開啟的試算表
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 顯示試算表名稱
  Logger.log('試算表名稱: ' + spreadsheet.getName());
  
  // 顯示試算表 ID
  Logger.log('試算表 ID: ' + spreadsheet.getId());
  
  // 顯示試算表 URL
  Logger.log('試算表 URL: ' + spreadsheet.getUrl());
}
```

**使用時機：**
- 腳本綁定在特定試算表上
- 操作目前開啟的試算表

### 2. openById(id)

透過試算表 ID 開啟特定試算表。

✅ **GAS 完全支援**

```javascript
function openByIdExample() {
  // 替換成你的試算表 ID
  var spreadsheetId = '1ABC...XYZ';
  
  try {
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log('成功開啟試算表: ' + spreadsheet.getName());
  } catch (error) {
    Logger.log('無法開啟試算表: ' + error.message);
  }
}
```

**如何取得試算表 ID：**
- 從 URL 中取得：`https://docs.google.com/spreadsheets/d/【這裡是ID】/edit`
- 使用 `spreadsheet.getId()` 方法

**使用時機：**
- 需要操作其他試算表
- 建立跨試算表的資料處理

### 3. openByUrl(url)

透過完整 URL 開啟試算表。

✅ **GAS 完全支援**

```javascript
function openByUrlExample() {
  // 替換成你的試算表 URL
  var url = 'https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit';
  
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(url);
    Logger.log('成功開啟試算表: ' + spreadsheet.getName());
  } catch (error) {
    Logger.log('無法開啟試算表: ' + error.message);
  }
}
```

**使用時機：**
- 從設定檔或試算表中讀取 URL
- 使用者提供試算表連結

## 工作表操作

### 取得工作表

```javascript
function getSheetExamples() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 方法 1: 透過名稱取得工作表
  var sheet1 = spreadsheet.getSheetByName('工作表1');
  Logger.log('工作表名稱: ' + sheet1.getName());
  
  // 方法 2: 取得目前作用中的工作表
  var activeSheet = spreadsheet.getActiveSheet();
  Logger.log('目前工作表: ' + activeSheet.getName());
  
  // 方法 3: 取得所有工作表
  var sheets = spreadsheet.getSheets();
  Logger.log('工作表總數: ' + sheets.length);
  
  // 列出所有工作表名稱
  for (var i = 0; i < sheets.length; i++) {
    Logger.log('工作表 ' + (i + 1) + ': ' + sheets[i].getName());
  }
}
```

### 新增工作表

```javascript
function insertSheetExamples() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 方法 1: 新增工作表（自動命名）
  var newSheet1 = spreadsheet.insertSheet();
  Logger.log('新增工作表: ' + newSheet1.getName());
  
  // 方法 2: 新增工作表並指定名稱
  var newSheet2 = spreadsheet.insertSheet('學生成績');
  Logger.log('新增工作表: ' + newSheet2.getName());
  
  // 方法 3: 在特定位置新增工作表
  var newSheet3 = spreadsheet.insertSheet('統計報表', 0); // 0 表示第一個位置
  Logger.log('在第一個位置新增工作表: ' + newSheet3.getName());
}
```

### 刪除工作表

```javascript
function deleteSheetExample() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 取得要刪除的工作表
  var sheetToDelete = spreadsheet.getSheetByName('暫存資料');
  
  if (sheetToDelete) {
    // 刪除工作表
    spreadsheet.deleteSheet(sheetToDelete);
    Logger.log('已刪除工作表: 暫存資料');
  } else {
    Logger.log('找不到工作表: 暫存資料');
  }
}
```

**注意事項：**
- 試算表至少要保留一個工作表，無法刪除最後一個工作表
- 刪除操作無法復原，請謹慎使用

## 範圍選取

範圍（Range）是 SpreadsheetApp 中最重要的概念之一，所有的資料讀寫都是透過範圍來操作。

### 1. getRange() - 指定範圍

```javascript
function getRangeExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 方法 1: 使用 A1 表示法
  var range1 = sheet.getRange('A1');
  Logger.log('單一儲存格: A1');
  
  var range2 = sheet.getRange('A1:C10');
  Logger.log('範圍: A1 到 C10');
  
  // 方法 2: 使用行列數字
  // getRange(row, column)
  var range3 = sheet.getRange(1, 1); // A1
  Logger.log('第 1 列第 1 欄');
  
  // getRange(row, column, numRows)
  var range4 = sheet.getRange(1, 1, 10); // A1:A10
  Logger.log('從 A1 開始，10 列');
  
  // getRange(row, column, numRows, numColumns)
  var range5 = sheet.getRange(1, 1, 10, 3); // A1:C10
  Logger.log('從 A1 開始，10 列 3 欄');
}
```

### 2. getDataRange() - 取得有資料的範圍

```javascript
function getDataRangeExample() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 取得包含所有資料的範圍
  var dataRange = sheet.getDataRange();
  
  Logger.log('資料範圍: ' + dataRange.getA1Notation());
  Logger.log('列數: ' + dataRange.getNumRows());
  Logger.log('欄數: ' + dataRange.getNumColumns());
  
  // 取得所有資料
  var values = dataRange.getValues();
  Logger.log('資料筆數: ' + values.length);
}
```

**使用時機：**
- 不確定資料範圍大小
- 需要處理所有資料
- 匯出整個工作表

### 3. getLastRow() / getLastColumn() - 取得最後一列/欄

```javascript
function getLastRowColumnExample() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 取得最後一列的列號
  var lastRow = sheet.getLastRow();
  Logger.log('最後一列: ' + lastRow);
  
  // 取得最後一欄的欄號
  var lastColumn = sheet.getLastColumn();
  Logger.log('最後一欄: ' + lastColumn);
  
  // 實用範例：取得 A 欄所有資料
  if (lastRow > 0) {
    var range = sheet.getRange(1, 1, lastRow, 1); // A1 到 A[lastRow]
    var values = range.getValues();
    Logger.log('A 欄資料筆數: ' + values.length);
  }
}
```

**使用時機：**
- 新增資料到最後一列
- 動態取得資料範圍
- 避免讀取空白列

### 範圍選取綜合範例

```javascript
function rangeSelectionPractice() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 情境 1: 讀取標題列（第一列）
  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var headers = headerRange.getValues()[0];
  Logger.log('標題: ' + headers.join(', '));
  
  // 情境 2: 讀取資料列（排除標題）
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
    var data = dataRange.getValues();
    Logger.log('資料筆數: ' + data.length);
  }
  
  // 情境 3: 讀取特定欄位（例如 B 欄）
  if (lastRow > 0) {
    var columnB = sheet.getRange(1, 2, lastRow, 1);
    var values = columnB.getValues();
    Logger.log('B 欄資料: ' + values.length + ' 筆');
  }
  
  // 情境 4: 新增資料到最後一列
  var newRow = lastRow + 1;
  var newDataRange = sheet.getRange(newRow, 1, 1, 3);
  Logger.log('新資料將寫入第 ' + newRow + ' 列');
}
```

## 常見錯誤與解決方案

### 錯誤 1: 找不到工作表

```javascript
// ❌ 錯誤寫法
var sheet = spreadsheet.getSheetByName('成績表');
sheet.getRange('A1').setValue('測試'); // 如果工作表不存在會出錯

// ✅ 正確寫法
var sheet = spreadsheet.getSheetByName('成績表');
if (sheet) {
  sheet.getRange('A1').setValue('測試');
} else {
  Logger.log('找不到工作表: 成績表');
}
```

### 錯誤 2: 範圍超出工作表大小

```javascript
// ❌ 錯誤寫法
var range = sheet.getRange(1, 1, 1000, 100); // 可能超出工作表大小

// ✅ 正確寫法
var maxRows = sheet.getMaxRows();
var maxColumns = sheet.getMaxColumns();
var range = sheet.getRange(1, 1, Math.min(1000, maxRows), Math.min(100, maxColumns));
```

### 錯誤 3: 沒有檢查資料是否存在

```javascript
// ❌ 錯誤寫法
var lastRow = sheet.getLastRow();
var range = sheet.getRange(2, 1, lastRow - 1, 3); // 如果只有標題列會出錯

// ✅ 正確寫法
var lastRow = sheet.getLastRow();
if (lastRow > 1) {
  var range = sheet.getRange(2, 1, lastRow - 1, 3);
  // 處理資料
} else {
  Logger.log('沒有資料列');
}
```

## 實用技巧

### 技巧 1: 取得範圍資訊

```javascript
function getRangeInfo() {
  var range = SpreadsheetApp.getActiveSheet().getRange('A1:C10');
  
  Logger.log('A1 表示法: ' + range.getA1Notation());
  Logger.log('起始列: ' + range.getRow());
  Logger.log('起始欄: ' + range.getColumn());
  Logger.log('列數: ' + range.getNumRows());
  Logger.log('欄數: ' + range.getNumColumns());
}
```

### 技巧 2: 檢查工作表是否存在

```javascript
function sheetExists(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  return sheet !== null;
}

// 使用範例
if (sheetExists('學生成績')) {
  Logger.log('工作表存在');
} else {
  Logger.log('工作表不存在');
}
```

### 技巧 3: 安全地取得或建立工作表

```javascript
function getOrCreateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log('建立新工作表: ' + sheetName);
  }
  
  return sheet;
}

// 使用範例
var sheet = getOrCreateSheet('統計報表');
```

## 練習題

1. 撰寫函式取得目前試算表的所有工作表名稱，並以陣列形式回傳
2. 建立一個函式，檢查指定名稱的工作表是否存在，若不存在則建立它
3. 撰寫函式取得工作表中有資料的範圍，並回傳該範圍的 A1 表示法
4. 建立函式取得工作表的最後一列資料，並回傳該列的所有值
5. 撰寫函式複製一個工作表的所有資料到另一個工作表

## 總結

本講義介紹了 SpreadsheetApp 的基礎操作：

- ✅ 三種取得試算表的方法：getActiveSpreadsheet()、openById()、openByUrl()
- ✅ 工作表操作：取得、新增、刪除
- ✅ 範圍選取：getRange()、getDataRange()、getLastRow()、getLastColumn()
- ✅ 常見錯誤處理與實用技巧

掌握這些基礎後，就可以開始進行資料的讀取與寫入操作了！

## 延伸閱讀

- [SpreadsheetApp 官方文件](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)
- [Spreadsheet 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet)
- [Sheet 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/sheet)
- [Range 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/range)
