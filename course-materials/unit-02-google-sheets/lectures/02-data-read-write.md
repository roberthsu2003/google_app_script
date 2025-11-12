# 資料讀寫講義

## 學習目標

- 掌握 getValue() 和 getValues() 的使用方法
- 學會 setValue() 和 setValues() 的資料寫入技巧
- 理解批次操作的重要性與效能優化
- 能夠進行資料驗證與錯誤處理

## 資料讀取

### 單一儲存格讀取：getValue()

✅ **GAS 完全支援**

```javascript
function readSingleCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 讀取 A1 儲存格的值
  var value = sheet.getRange('A1').getValue();
  Logger.log('A1 的值: ' + value);
  
  // 讀取 B2 儲存格的值
  var value2 = sheet.getRange(2, 2).getValue();
  Logger.log('B2 的值: ' + value2);
}
```

**getValue() 特性：**
- 回傳單一儲存格的值
- 回傳值的型別取決於儲存格內容（字串、數字、日期等）
- 空白儲存格回傳空字串 `''`

### 多個儲存格讀取：getValues()

✅ **GAS 完全支援**

```javascript
function readMultipleCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 讀取 A1:C3 範圍的值
  var range = sheet.getRange('A1:C3');
  var values = range.getValues();
  
  // values 是二維陣列
  Logger.log('第 1 列第 1 欄: ' + values[0][0]); // A1
  Logger.log('第 1 列第 2 欄: ' + values[0][1]); // B1
  Logger.log('第 2 列第 1 欄: ' + values[1][0]); // A2
}
```

**getValues() 特性：**
- 回傳二維陣列 `[[row1], [row2], ...]`
- 即使只有一列或一欄，仍然是二維陣列
- 空白儲存格在陣列中是空字串 `''`

### 讀取資料的常見模式

#### 模式 1: 讀取標題列

```javascript
function readHeaders() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastColumn = sheet.getLastColumn();
  
  // 讀取第一列作為標題
  var headerRange = sheet.getRange(1, 1, 1, lastColumn);
  var headers = headerRange.getValues()[0]; // 取得第一列
  
  Logger.log('標題: ' + headers.join(', '));
  return headers;
}
```

#### 模式 2: 讀取所有資料列（排除標題）

```javascript
function readDataRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  if (lastRow <= 1) {
    Logger.log('沒有資料列');
    return [];
  }
  
  // 從第 2 列開始讀取
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
  var data = dataRange.getValues();
  
  Logger.log('資料筆數: ' + data.length);
  return data;
}
```

#### 模式 3: 讀取特定欄位

```javascript
function readSpecificColumn() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  // 讀取 B 欄（第 2 欄）的所有資料
  var columnData = sheet.getRange(1, 2, lastRow, 1).getValues();
  
  // 將二維陣列轉換為一維陣列
  var values = columnData.map(function(row) {
    return row[0];
  });
  
  Logger.log('B 欄資料: ' + values.join(', '));
  return values;
}
```

## 資料寫入

### 單一儲存格寫入：setValue()

✅ **GAS 完全支援**

```javascript
function writeSingleCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 寫入文字
  sheet.getRange('A1').setValue('學號');
  
  // 寫入數字
  sheet.getRange('B1').setValue(100);
  
  // 寫入日期
  sheet.getRange('C1').setValue(new Date());
  
  // 寫入公式
  sheet.getRange('D1').setValue('=SUM(B1:B10)');
  
  Logger.log('✅ 資料寫入完成');
}
```

**setValue() 特性：**
- 可寫入字串、數字、布林值、日期、公式
- 會覆蓋原有的值
- 自動判斷資料型別

### 多個儲存格寫入：setValues()

✅ **GAS 完全支援**

```javascript
function writeMultipleCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 準備二維陣列資料
  var data = [
    ['學號', '姓名', '分數'],
    ['A001', '王小明', 85],
    ['A002', '李小華', 92],
    ['A003', '張小美', 78]
  ];
  
  // 寫入 A1:C4 範圍
  var range = sheet.getRange(1, 1, data.length, data[0].length);
  range.setValues(data);
  
  Logger.log('✅ 寫入 ' + data.length + ' 列資料');
}
```

**setValues() 特性：**
- 接受二維陣列作為參數
- 陣列的大小必須與範圍大小一致
- 比多次呼叫 setValue() 快很多

### 資料寫入的常見模式

#### 模式 1: 新增一列資料

```javascript
function appendRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  // 新資料
  var newData = ['A004', '陳小強', 88];
  
  // 寫入到最後一列的下一列
  var newRow = lastRow + 1;
  var range = sheet.getRange(newRow, 1, 1, newData.length);
  range.setValues([newData]); // 注意：要包在陣列中
  
  Logger.log('✅ 新增資料到第 ' + newRow + ' 列');
}
```

#### 模式 2: 批次新增多列資料

```javascript
function appendMultipleRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  // 多筆新資料
  var newData = [
    ['A005', '林小芳', 91],
    ['A006', '黃小明', 76],
    ['A007', '吳小華', 89]
  ];
  
  // 批次寫入
  var startRow = lastRow + 1;
  var range = sheet.getRange(startRow, 1, newData.length, newData[0].length);
  range.setValues(newData);
  
  Logger.log('✅ 新增 ' + newData.length + ' 列資料');
}
```

#### 模式 3: 更新特定儲存格

```javascript
function updateSpecificCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 更新第 3 列第 3 欄（C3）的分數
  var row = 3;
  var col = 3;
  var newScore = 95;
  
  sheet.getRange(row, col).setValue(newScore);
  
  Logger.log('✅ 更新第 ' + row + ' 列第 ' + col + ' 欄為 ' + newScore);
}
```

#### 模式 4: 更新整欄資料

```javascript
function updateColumn() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  // 準備新的欄位資料
  var newColumnData = [];
  for (var i = 1; i <= lastRow; i++) {
    newColumnData.push(['更新_' + i]);
  }
  
  // 更新 D 欄
  var range = sheet.getRange(1, 4, lastRow, 1);
  range.setValues(newColumnData);
  
  Logger.log('✅ 更新 D 欄 ' + lastRow + ' 列資料');
}
```

## 批次操作 vs 逐格操作

### ❌ 效能差的寫法（逐格操作）

```javascript
function slowMethod() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startTime = new Date().getTime();
  
  // 逐格寫入 100 筆資料
  for (var i = 1; i <= 100; i++) {
    sheet.getRange(i, 1).setValue('資料' + i);
    sheet.getRange(i, 2).setValue(i * 10);
    sheet.getRange(i, 3).setValue(new Date());
  }
  
  var endTime = new Date().getTime();
  Logger.log('❌ 逐格操作耗時: ' + (endTime - startTime) + ' 毫秒');
}
```

**問題：**
- 每次 setValue() 都會與 Google Sheets 通訊一次
- 100 列 x 3 欄 = 300 次通訊
- 非常慢，容易超時

### ✅ 效能好的寫法（批次操作）

```javascript
function fastMethod() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startTime = new Date().getTime();
  
  // 準備所有資料
  var data = [];
  for (var i = 1; i <= 100; i++) {
    data.push(['資料' + i, i * 10, new Date()]);
  }
  
  // 一次寫入所有資料
  var range = sheet.getRange(1, 1, data.length, data[0].length);
  range.setValues(data);
  
  var endTime = new Date().getTime();
  Logger.log('✅ 批次操作耗時: ' + (endTime - startTime) + ' 毫秒');
}
```

**優點：**
- 只與 Google Sheets 通訊一次
- 速度快 10-100 倍
- 不容易超時

### 效能比較範例

```javascript
function comparePerformance() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 效能比較測試 ===\n');
  
  // 測試 1: 逐格操作（10 列）
  var start1 = new Date().getTime();
  for (var i = 1; i <= 10; i++) {
    sheet.getRange(i, 1).setValue('測試' + i);
  }
  var time1 = new Date().getTime() - start1;
  Logger.log('逐格操作（10 列）: ' + time1 + ' 毫秒');
  
  // 測試 2: 批次操作（10 列）
  var data = [];
  for (var i = 1; i <= 10; i++) {
    data.push(['測試' + i]);
  }
  var start2 = new Date().getTime();
  sheet.getRange(1, 2, data.length, 1).setValues(data);
  var time2 = new Date().getTime() - start2;
  Logger.log('批次操作（10 列）: ' + time2 + ' 毫秒');
  
  Logger.log('\n速度提升: ' + (time1 / time2).toFixed(2) + ' 倍');
}
```

## 資料驗證與錯誤處理

### 驗證資料型別

```javascript
function validateDataType() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var value = sheet.getRange('A1').getValue();
  
  Logger.log('=== 資料型別驗證 ===\n');
  Logger.log('值: ' + value);
  Logger.log('型別: ' + typeof value);
  
  // 檢查是否為數字
  if (typeof value === 'number') {
    Logger.log('✅ 這是數字');
  } else if (typeof value === 'string') {
    Logger.log('✅ 這是字串');
  } else if (value instanceof Date) {
    Logger.log('✅ 這是日期');
  } else if (value === '') {
    Logger.log('⚠️  這是空值');
  }
}
```

### 驗證資料範圍

```javascript
function validateDataRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var score = sheet.getRange('B2').getValue();
  
  Logger.log('=== 資料範圍驗證 ===\n');
  Logger.log('分數: ' + score);
  
  // 檢查是否為有效分數
  if (typeof score !== 'number') {
    Logger.log('❌ 錯誤：分數必須是數字');
    return false;
  }
  
  if (score < 0 || score > 100) {
    Logger.log('❌ 錯誤：分數必須在 0-100 之間');
    return false;
  }
  
  Logger.log('✅ 分數有效');
  return true;
}
```

### 錯誤處理範例

```javascript
function safeReadWrite() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  try {
    // 讀取資料
    var lastRow = sheet.getLastRow();
    
    if (lastRow === 0) {
      throw new Error('工作表是空的');
    }
    
    var data = sheet.getRange(1, 1, lastRow, 3).getValues();
    
    // 驗證資料
    if (data.length === 0) {
      throw new Error('沒有資料');
    }
    
    // 處理資料
    Logger.log('✅ 成功讀取 ' + data.length + ' 列資料');
    
    // 寫入資料
    var newData = [['新資料', 100, new Date()]];
    sheet.getRange(lastRow + 1, 1, 1, 3).setValues(newData);
    Logger.log('✅ 成功寫入新資料');
    
  } catch (error) {
    Logger.log('❌ 發生錯誤: ' + error.message);
    Logger.log('錯誤堆疊: ' + error.stack);
  }
}
```

### 資料清理

```javascript
function cleanData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log('=== 資料清理 ===\n');
  Logger.log('原始資料筆數: ' + data.length);
  
  // 清理資料
  var cleanedData = [];
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    
    // 跳過空白列
    if (row.join('').trim() === '') {
      continue;
    }
    
    // 清理每個儲存格
    var cleanedRow = row.map(function(cell) {
      if (typeof cell === 'string') {
        return cell.trim(); // 移除前後空白
      }
      return cell;
    });
    
    cleanedData.push(cleanedRow);
  }
  
  Logger.log('清理後資料筆數: ' + cleanedData.length);
  Logger.log('移除了 ' + (data.length - cleanedData.length) + ' 列空白資料');
  
  // 寫回工作表
  if (cleanedData.length > 0) {
    sheet.clear();
    sheet.getRange(1, 1, cleanedData.length, cleanedData[0].length).setValues(cleanedData);
    Logger.log('✅ 資料清理完成');
  }
}
```

## 進階技巧

### 技巧 1: 讀取資料並轉換為物件陣列

```javascript
function dataToObjects() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 第一列是標題
  var headers = data[0];
  var objects = [];
  
  // 從第二列開始轉換
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    objects.push(obj);
  }
  
  Logger.log('轉換為 ' + objects.length + ' 個物件');
  Logger.log('第一個物件: ' + JSON.stringify(objects[0]));
  
  return objects;
}
```

### 技巧 2: 物件陣列寫入試算表

```javascript
function objectsToData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 物件陣列
  var objects = [
    {學號: 'A001', 姓名: '王小明', 分數: 85},
    {學號: 'A002', 姓名: '李小華', 分數: 92},
    {學號: 'A003', 姓名: '張小美', 分數: 78}
  ];
  
  // 取得標題
  var headers = Object.keys(objects[0]);
  
  // 轉換為二維陣列
  var data = [headers];
  for (var i = 0; i < objects.length; i++) {
    var row = [];
    for (var j = 0; j < headers.length; j++) {
      row.push(objects[i][headers[j]]);
    }
    data.push(row);
  }
  
  // 寫入試算表
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  Logger.log('✅ 寫入 ' + objects.length + ' 筆資料');
}
```

### 技巧 3: 條件更新資料

```javascript
function conditionalUpdate() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log('=== 條件更新 ===\n');
  
  var updateCount = 0;
  
  // 假設第 3 欄是分數，將低於 60 分的標記為「不及格」
  for (var i = 1; i < data.length; i++) { // 從第 2 列開始（跳過標題）
    var score = data[i][2]; // 第 3 欄
    
    if (typeof score === 'number' && score < 60) {
      data[i][3] = '不及格'; // 在第 4 欄標記
      updateCount++;
    } else if (typeof score === 'number') {
      data[i][3] = '及格';
    }
  }
  
  // 寫回試算表
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  
  Logger.log('✅ 更新了 ' + updateCount + ' 筆資料');
}
```

## 常見錯誤與解決方案

### 錯誤 1: 陣列維度不匹配

```javascript
// ❌ 錯誤寫法
var data = ['A', 'B', 'C']; // 一維陣列
sheet.getRange('A1:C1').setValues(data); // 錯誤！

// ✅ 正確寫法
var data = [['A', 'B', 'C']]; // 二維陣列
sheet.getRange('A1:C1').setValues(data);
```

### 錯誤 2: 範圍大小不匹配

```javascript
// ❌ 錯誤寫法
var data = [['A', 'B'], ['C', 'D']]; // 2x2
sheet.getRange('A1:C3').setValues(data); // 3x3 範圍，錯誤！

// ✅ 正確寫法
var data = [['A', 'B'], ['C', 'D']];
sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
```

### 錯誤 3: 未檢查空值

```javascript
// ❌ 錯誤寫法
var value = sheet.getRange('A1').getValue();
var result = value.toUpperCase(); // 如果是數字會出錯

// ✅ 正確寫法
var value = sheet.getRange('A1').getValue();
if (typeof value === 'string') {
  var result = value.toUpperCase();
} else {
  Logger.log('不是字串');
}
```

## 練習題

1. 撰寫函式讀取試算表的所有資料，並計算每一列的總和
2. 建立函式批次寫入 50 筆測試資料到試算表
3. 撰寫函式找出分數最高的學生，並更新其等級為「優秀」
4. 建立函式將試算表資料匯出為 JSON 格式
5. 撰寫函式驗證試算表中的 Email 格式是否正確

## 總結

本講義介紹了資料讀寫的核心技巧：

- ✅ getValue() / getValues() 讀取資料
- ✅ setValue() / setValues() 寫入資料
- ✅ 批次操作比逐格操作快 10-100 倍
- ✅ 資料驗證與錯誤處理的重要性
- ✅ 實用的資料轉換技巧

**重要原則：**
1. 永遠使用批次操作（setValues）而非逐格操作（setValue）
2. 讀取資料前先檢查範圍大小
3. 寫入資料前先驗證資料格式
4. 使用 try-catch 處理可能的錯誤

## 延伸閱讀

- [Range 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/range)
- [最佳實踐：減少服務呼叫](https://developers.google.com/apps-script/guides/support/best-practices#reduce_calls_to_services)
