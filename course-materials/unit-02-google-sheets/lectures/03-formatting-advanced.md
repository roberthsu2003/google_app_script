# 格式化與進階操作講義

## 學習目標

- 掌握儲存格格式設定方法
- 學會資料排序與篩選
- 理解公式操作的技巧
- 能夠設定範圍保護

## 格式設定

### 數字格式：setNumberFormat()

✅ **GAS 完全支援**

數字格式可以控制數字、日期、時間、貨幣等的顯示方式。

```javascript
function setNumberFormatExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 整數格式
  sheet.getRange('A1').setValue(1234.5678);
  sheet.getRange('A1').setNumberFormat('0'); // 顯示: 1235
  
  // 小數點格式
  sheet.getRange('A2').setValue(1234.5678);
  sheet.getRange('A2').setNumberFormat('0.00'); // 顯示: 1234.57
  
  // 千分位格式
  sheet.getRange('A3').setValue(1234567);
  sheet.getRange('A3').setNumberFormat('#,##0'); // 顯示: 1,234,567
  
  // 貨幣格式
  sheet.getRange('A4').setValue(1234.5);
  sheet.getRange('A4').setNumberFormat('$#,##0.00'); // 顯示: $1,234.50
  
  Logger.log('✅ 數字格式設定完成');
}
```

**常用數字格式：**

| 格式代碼 | 說明 | 範例輸入 | 顯示結果 |
|---------|------|---------|---------|
| `0` | 整數 | 1234.56 | 1235 |
| `0.00` | 兩位小數 | 1234.5 | 1234.50 |
| `#,##0` | 千分位整數 | 1234567 | 1,234,567 |
| `#,##0.00` | 千分位兩位小數 | 1234.5 | 1,234.50 |
| `$#,##0.00` | 美元格式 | 1234.5 | $1,234.50 |
| `0%` | 百分比 | 0.85 | 85% |
| `0.00%` | 百分比兩位小數 | 0.8567 | 85.67% |
| `yyyy-MM-dd` | 日期格式 | Date | 2024-01-15 |
| `HH:mm:ss` | 時間格式 | Date | 14:30:00 |

### 日期與時間格式

```javascript
function setDateTimeFormat() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var now = new Date();
  
  // 日期格式
  sheet.getRange('B1').setValue(now);
  sheet.getRange('B1').setNumberFormat('yyyy-MM-dd'); // 2024-01-15
  
  sheet.getRange('B2').setValue(now);
  sheet.getRange('B2').setNumberFormat('yyyy年MM月dd日'); // 2024年01月15日
  
  sheet.getRange('B3').setValue(now);
  sheet.getRange('B3').setNumberFormat('MM/dd/yyyy'); // 01/15/2024
  
  // 時間格式
  sheet.getRange('B4').setValue(now);
  sheet.getRange('B4').setNumberFormat('HH:mm:ss'); // 14:30:00
  
  // 日期時間格式
  sheet.getRange('B5').setValue(now);
  sheet.getRange('B5').setNumberFormat('yyyy-MM-dd HH:mm:ss');
  
  Logger.log('✅ 日期時間格式設定完成');
}
```

### 字體顏色：setFontColor()

✅ **GAS 完全支援**

```javascript
function setFontColorExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 使用顏色名稱
  sheet.getRange('C1').setValue('紅色文字');
  sheet.getRange('C1').setFontColor('red');
  
  sheet.getRange('C2').setValue('藍色文字');
  sheet.getRange('C2').setFontColor('blue');
  
  sheet.getRange('C3').setValue('綠色文字');
  sheet.getRange('C3').setFontColor('green');
  
  // 使用 HEX 色碼
  sheet.getRange('C4').setValue('自訂顏色');
  sheet.getRange('C4').setFontColor('#FF6B6B'); // 淺紅色
  
  sheet.getRange('C5').setValue('深藍色');
  sheet.getRange('C5').setFontColor('#1E3A8A');
  
  Logger.log('✅ 字體顏色設定完成');
}
```

**常用顏色：**
- 基本顏色：`'red'`, `'blue'`, `'green'`, `'yellow'`, `'orange'`, `'purple'`, `'black'`, `'white'`
- HEX 色碼：`'#FF0000'`（紅色）、`'#00FF00'`（綠色）、`'#0000FF'`（藍色）

### 背景顏色：setBackground()

✅ **GAS 完全支援**

```javascript
function setBackgroundExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 使用顏色名稱
  sheet.getRange('D1').setValue('黃色背景');
  sheet.getRange('D1').setBackground('yellow');
  
  sheet.getRange('D2').setValue('淺藍背景');
  sheet.getRange('D2').setBackground('#E3F2FD');
  
  sheet.getRange('D3').setValue('淺綠背景');
  sheet.getRange('D3').setBackground('#E8F5E9');
  
  // 批次設定背景顏色
  var range = sheet.getRange('D4:D6');
  range.setBackground('#FFF3E0'); // 淺橘色
  
  Logger.log('✅ 背景顏色設定完成');
}
```

### 其他格式設定

```javascript
function otherFormatExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange('E1:E5');
  
  // 字體大小
  range.setFontSize(14);
  
  // 字體樣式
  range.setFontWeight('bold'); // 粗體
  range.setFontStyle('italic'); // 斜體
  
  // 文字對齊
  range.setHorizontalAlignment('center'); // 水平置中
  range.setVerticalAlignment('middle'); // 垂直置中
  
  // 文字換行
  range.setWrap(true); // 啟用自動換行
  
  // 邊框
  range.setBorder(true, true, true, true, false, false); // 上下左右邊框
  
  Logger.log('✅ 其他格式設定完成');
}
```

### 條件格式化範例

```javascript
function conditionalFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 假設 C 欄是分數
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  var scoreRange = sheet.getRange(2, 3, lastRow - 1, 1);
  var scores = scoreRange.getValues();
  
  // 根據分數設定顏色
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i][0];
    var cell = sheet.getRange(i + 2, 3);
    
    if (typeof score === 'number') {
      if (score >= 90) {
        // 優秀：綠色背景
        cell.setBackground('#C8E6C9');
        cell.setFontColor('#1B5E20');
      } else if (score >= 60) {
        // 及格：黃色背景
        cell.setBackground('#FFF9C4');
        cell.setFontColor('#F57F17');
      } else {
        // 不及格：紅色背景
        cell.setBackground('#FFCDD2');
        cell.setFontColor('#B71C1C');
      }
    }
  }
  
  Logger.log('✅ 條件格式化完成');
}
```

## 排序與篩選

### 資料排序：sort()

✅ **GAS 完全支援**

```javascript
function sortDataExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  if (lastRow < 2) {
    Logger.log('沒有資料可排序');
    return;
  }
  
  // 取得資料範圍（排除標題列）
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
  
  // 方法 1: 依第 1 欄遞增排序
  dataRange.sort(1);
  Logger.log('✅ 依第 1 欄遞增排序');
  
  // 方法 2: 依第 1 欄遞減排序
  dataRange.sort({column: 1, ascending: false});
  Logger.log('✅ 依第 1 欄遞減排序');
  
  // 方法 3: 依第 3 欄（分數）遞減排序
  dataRange.sort({column: 3, ascending: false});
  Logger.log('✅ 依第 3 欄遞減排序');
}
```

### 多欄位排序

```javascript
function multiColumnSort() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  if (lastRow < 2) return;
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
  
  // 先依第 2 欄（班級）排序，再依第 3 欄（分數）遞減排序
  dataRange.sort([
    {column: 2, ascending: true},   // 班級遞增
    {column: 3, ascending: false}   // 分數遞減
  ]);
  
  Logger.log('✅ 多欄位排序完成');
}
```

### 自訂排序函式

```javascript
function customSort() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 取得標題和資料
  var headers = data[0];
  var rows = data.slice(1);
  
  // 自訂排序邏輯：依分數遞減排序
  rows.sort(function(a, b) {
    var scoreA = a[2]; // 假設第 3 欄是分數
    var scoreB = b[2];
    return scoreB - scoreA; // 遞減排序
  });
  
  // 重新組合資料
  var sortedData = [headers].concat(rows);
  
  // 寫回工作表
  sheet.clear();
  sheet.getRange(1, 1, sortedData.length, sortedData[0].length).setValues(sortedData);
  
  Logger.log('✅ 自訂排序完成');
}
```

### 資料篩選

```javascript
function filterDataExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 取得標題和資料
  var headers = data[0];
  var rows = data.slice(1);
  
  Logger.log('=== 資料篩選範例 ===\n');
  Logger.log('原始資料筆數: ' + rows.length);
  
  // 篩選條件：分數 >= 60
  var passedStudents = rows.filter(function(row) {
    var score = row[2]; // 假設第 3 欄是分數
    return typeof score === 'number' && score >= 60;
  });
  
  Logger.log('及格學生: ' + passedStudents.length + ' 人');
  
  // 篩選條件：分數 >= 90
  var excellentStudents = rows.filter(function(row) {
    var score = row[2];
    return typeof score === 'number' && score >= 90;
  });
  
  Logger.log('優秀學生: ' + excellentStudents.length + ' 人');
  
  return passedStudents;
}
```

### 複雜篩選條件

```javascript
function advancedFilter() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var headers = data[0];
  var rows = data.slice(1);
  
  // 複雜條件：班級是 'A' 且分數 >= 80
  var filtered = rows.filter(function(row) {
    var className = row[1]; // 假設第 2 欄是班級
    var score = row[2];     // 假設第 3 欄是分數
    
    return className === 'A' && 
           typeof score === 'number' && 
           score >= 80;
  });
  
  Logger.log('符合條件的學生: ' + filtered.length + ' 人');
  
  // 將篩選結果寫入新工作表
  var resultSheet = getOrCreateSheet('篩選結果');
  resultSheet.clear();
  
  var resultData = [headers].concat(filtered);
  resultSheet.getRange(1, 1, resultData.length, resultData[0].length).setValues(resultData);
  
  Logger.log('✅ 篩選結果已寫入「篩選結果」工作表');
}

function getOrCreateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}
```

## 公式操作

### 設定公式：setFormula()

✅ **GAS 完全支援**

```javascript
function setFormulaExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 公式操作範例 ===\n');
  
  // 範例 1: SUM 加總公式
  sheet.getRange('D1').setValue('總分');
  sheet.getRange('D2').setFormula('=SUM(B2:C2)');
  Logger.log('設定 SUM 公式: =SUM(B2:C2)');
  
  // 範例 2: AVERAGE 平均公式
  sheet.getRange('E1').setValue('平均');
  sheet.getRange('E2').setFormula('=AVERAGE(B2:C2)');
  Logger.log('設定 AVERAGE 公式: =AVERAGE(B2:C2)');
  
  // 範例 3: IF 條件公式
  sheet.getRange('F1').setValue('等級');
  sheet.getRange('F2').setFormula('=IF(E2>=60,"及格","不及格")');
  Logger.log('設定 IF 公式: =IF(E2>=60,"及格","不及格")');
  
  // 範例 4: CONCATENATE 字串連接
  sheet.getRange('G1').setValue('完整資訊');
  sheet.getRange('G2').setFormula('=A2&" - "&F2');
  Logger.log('設定字串連接公式: =A2&" - "&F2');
  
  Logger.log('\n✅ 公式設定完成');
}
```

### 批次設定公式

```javascript
function batchSetFormulas() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    Logger.log('沒有資料列');
    return;
  }
  
  Logger.log('=== 批次設定公式 ===\n');
  
  // 為每一列設定平均分數公式
  var formulas = [];
  for (var i = 2; i <= lastRow; i++) {
    formulas.push(['=AVERAGE(B' + i + ':C' + i + ')']);
  }
  
  // 批次寫入公式
  var range = sheet.getRange(2, 4, formulas.length, 1);
  range.setFormulas(formulas);
  
  Logger.log('✅ 為 ' + formulas.length + ' 列設定平均公式');
}
```

### 讀取公式

```javascript
function readFormulas() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 讀取公式 ===\n');
  
  // 讀取單一儲存格的公式
  var formula = sheet.getRange('D2').getFormula();
  Logger.log('D2 的公式: ' + formula);
  
  // 讀取範圍的所有公式
  var range = sheet.getRange('D2:F5');
  var formulas = range.getFormulas();
  
  Logger.log('\n範圍 D2:F5 的公式:');
  for (var i = 0; i < formulas.length; i++) {
    for (var j = 0; j < formulas[i].length; j++) {
      if (formulas[i][j]) {
        var cell = String.fromCharCode(68 + j) + (i + 2); // D, E, F...
        Logger.log(cell + ': ' + formulas[i][j]);
      }
    }
  }
}
```

### 常用公式範例

```javascript
function commonFormulas() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 常用公式範例 ===\n');
  
  // 1. 數學運算
  sheet.getRange('H1').setValue('數學運算');
  sheet.getRange('H2').setFormula('=B2+C2');        // 加法
  sheet.getRange('H3').setFormula('=B3*C3');        // 乘法
  sheet.getRange('H4').setFormula('=ROUND(B4,2)');  // 四捨五入
  
  // 2. 統計函式
  sheet.getRange('I1').setValue('統計函式');
  sheet.getRange('I2').setFormula('=MAX(B:B)');     // 最大值
  sheet.getRange('I3').setFormula('=MIN(B:B)');     // 最小值
  sheet.getRange('I4').setFormula('=COUNT(B:B)');   // 計數
  
  // 3. 條件判斷
  sheet.getRange('J1').setValue('條件判斷');
  sheet.getRange('J2').setFormula('=IF(B2>80,"優秀",IF(B2>60,"良好","待加強"))');
  
  // 4. 文字處理
  sheet.getRange('K1').setValue('文字處理');
  sheet.getRange('K2').setFormula('=UPPER(A2)');    // 轉大寫
  sheet.getRange('K3').setFormula('=LEN(A3)');      // 字串長度
  sheet.getRange('K4').setFormula('=LEFT(A4,3)');   // 取左邊 3 個字元
  
  // 5. 日期函式
  sheet.getRange('L1').setValue('日期函式');
  sheet.getRange('L2').setFormula('=TODAY()');      // 今天日期
  sheet.getRange('L3').setFormula('=NOW()');        // 現在時間
  sheet.getRange('L4').setFormula('=YEAR(L2)');     // 取得年份
  
  Logger.log('✅ 常用公式範例設定完成');
}
```

### 動態公式生成

```javascript
function dynamicFormulas() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) return;
  
  Logger.log('=== 動態公式生成 ===\n');
  
  // 為每一列生成不同的公式
  for (var i = 2; i <= lastRow; i++) {
    // 計算總分（B 欄 + C 欄）
    var sumFormula = '=B' + i + '+C' + i;
    sheet.getRange(i, 4).setFormula(sumFormula);
    
    // 計算平均（總分 / 2）
    var avgFormula = '=D' + i + '/2';
    sheet.getRange(i, 5).setFormula(avgFormula);
    
    // 判斷等級
    var gradeFormula = '=IF(E' + i + '>=90,"優秀",IF(E' + i + '>=60,"及格","不及格"))';
    sheet.getRange(i, 6).setFormula(gradeFormula);
  }
  
  Logger.log('✅ 為 ' + (lastRow - 1) + ' 列生成動態公式');
}
```

## 範圍保護

### 保護範圍：protect()

✅ **GAS 完全支援**

範圍保護可以防止特定範圍被意外修改，適合用於保護公式、標題列或重要資料。

```javascript
function protectRangeExamples() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範圍保護範例 ===\n');
  
  // 保護標題列（第 1 列）
  var headerRange = sheet.getRange('1:1');
  var protection = headerRange.protect();
  
  // 設定保護說明
  protection.setDescription('標題列保護');
  
  // 設定警告訊息（警告模式）
  protection.setWarningOnly(true);
  
  Logger.log('✅ 已保護標題列（警告模式）');
}
```

### 限制編輯者

```javascript
function protectWithEditors() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 保護 A1:C10 範圍
  var range = sheet.getRange('A1:C10');
  var protection = range.protect();
  
  protection.setDescription('重要資料區域');
  
  // 移除所有編輯者（只有擁有者可以編輯）
  protection.removeEditors(protection.getEditors());
  
  // 或者指定特定使用者可以編輯
  // protection.addEditor('user@example.com');
  
  Logger.log('✅ 已保護 A1:C10 範圍');
  Logger.log('只有擁有者可以編輯');
}
```

### 保護整個工作表

```javascript
function protectSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 保護整個工作表
  var protection = sheet.protect();
  protection.setDescription('工作表保護');
  
  // 設定未保護的範圍（允許編輯）
  var unprotectedRanges = [
    sheet.getRange('B2:B10'),  // 允許編輯 B2:B10
    sheet.getRange('D2:D10')   // 允許編輯 D2:D10
  ];
  protection.setUnprotectedRanges(unprotectedRanges);
  
  Logger.log('✅ 已保護工作表');
  Logger.log('允許編輯範圍: B2:B10, D2:D10');
}
```

### 移除保護

```javascript
function removeProtection() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 移除保護 ===\n');
  
  // 取得所有保護
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  
  Logger.log('找到 ' + protections.length + ' 個受保護的範圍');
  
  // 移除所有範圍保護
  for (var i = 0; i < protections.length; i++) {
    var protection = protections[i];
    var range = protection.getRange();
    Logger.log('移除保護: ' + range.getA1Notation());
    protection.remove();
  }
  
  Logger.log('\n✅ 已移除所有範圍保護');
}
```

### 檢查保護狀態

```javascript
function checkProtection() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 檢查保護狀態 ===\n');
  
  // 檢查工作表保護
  var sheetProtection = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  if (sheetProtection.length > 0) {
    Logger.log('✅ 工作表已保護');
    Logger.log('說明: ' + sheetProtection[0].getDescription());
  } else {
    Logger.log('❌ 工作表未保護');
  }
  
  // 檢查範圍保護
  var rangeProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  Logger.log('\n受保護的範圍數量: ' + rangeProtections.length);
  
  for (var i = 0; i < rangeProtections.length; i++) {
    var protection = rangeProtections[i];
    var range = protection.getRange();
    Logger.log((i + 1) + '. ' + range.getA1Notation());
    Logger.log('   說明: ' + protection.getDescription());
    Logger.log('   警告模式: ' + protection.isWarningOnly());
  }
}
```

## 綜合應用範例

### 範例 1: 成績表格式化

```javascript
function formatGradeSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    Logger.log('沒有資料');
    return;
  }
  
  Logger.log('=== 成績表格式化 ===\n');
  
  // 1. 格式化標題列
  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground('#4A90E2');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // 2. 設定分數格式
  var scoreRange = sheet.getRange(2, 3, lastRow - 1, 1);
  scoreRange.setNumberFormat('0.00');
  
  // 3. 條件格式化（根據分數）
  for (var i = 2; i <= lastRow; i++) {
    var score = sheet.getRange(i, 3).getValue();
    var row = sheet.getRange(i, 1, 1, sheet.getLastColumn());
    
    if (typeof score === 'number') {
      if (score >= 90) {
        row.setBackground('#C8E6C9'); // 綠色
      } else if (score >= 60) {
        row.setBackground('#FFF9C4'); // 黃色
      } else {
        row.setBackground('#FFCDD2'); // 紅色
      }
    }
  }
  
  // 4. 設定邊框
  var dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
  dataRange.setBorder(true, true, true, true, true, true);
  
  // 5. 保護標題列
  var protection = headerRange.protect();
  protection.setDescription('標題列保護');
  protection.setWarningOnly(true);
  
  Logger.log('✅ 成績表格式化完成');
}
```

### 範例 2: 自動統計報表

```javascript
function createStatisticsReport() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) return;
  
  Logger.log('=== 建立統計報表 ===\n');
  
  // 在最後一列下方建立統計區
  var statsRow = lastRow + 2;
  
  // 設定統計標題
  sheet.getRange(statsRow, 1).setValue('統計資料');
  sheet.getRange(statsRow, 1).setFontWeight('bold');
  sheet.getRange(statsRow, 1).setBackground('#E3F2FD');
  
  // 計算統計數據
  var dataCol = 3; // 假設第 3 欄是分數
  
  sheet.getRange(statsRow + 1, 1).setValue('最高分');
  sheet.getRange(statsRow + 1, 2).setFormula('=MAX(C2:C' + lastRow + ')');
  
  sheet.getRange(statsRow + 2, 1).setValue('最低分');
  sheet.getRange(statsRow + 2, 2).setFormula('=MIN(C2:C' + lastRow + ')');
  
  sheet.getRange(statsRow + 3, 1).setValue('平均分');
  sheet.getRange(statsRow + 3, 2).setFormula('=AVERAGE(C2:C' + lastRow + ')');
  
  sheet.getRange(statsRow + 4, 1).setValue('及格人數');
  sheet.getRange(statsRow + 4, 2).setFormula('=COUNTIF(C2:C' + lastRow + ',">=60")');
  
  sheet.getRange(statsRow + 5, 1).setValue('不及格人數');
  sheet.getRange(statsRow + 5, 2).setFormula('=COUNTIF(C2:C' + lastRow + ',"<60")');
  
  // 格式化統計區
  var statsRange = sheet.getRange(statsRow, 1, 6, 2);
  statsRange.setBorder(true, true, true, true, true, true);
  statsRange.setNumberFormat('0.00');
  
  Logger.log('✅ 統計報表建立完成');
}
```

### 範例 3: 資料驗證與自動排序

```javascript
function autoSortAndValidate() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length < 2) return;
  
  Logger.log('=== 資料驗證與自動排序 ===\n');
  
  var headers = data[0];
  var rows = data.slice(1);
  var validRows = [];
  var invalidCount = 0;
  
  // 驗證資料
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var score = row[2]; // 假設第 3 欄是分數
    
    // 檢查分數是否有效
    if (typeof score === 'number' && score >= 0 && score <= 100) {
      validRows.push(row);
    } else {
      invalidCount++;
      Logger.log('無效資料（第 ' + (i + 2) + ' 列）: 分數 = ' + score);
    }
  }
  
  Logger.log('\n有效資料: ' + validRows.length + ' 筆');
  Logger.log('無效資料: ' + invalidCount + ' 筆');
  
  // 排序有效資料（依分數遞減）
  validRows.sort(function(a, b) {
    return b[2] - a[2];
  });
  
  // 寫回工作表
  var sortedData = [headers].concat(validRows);
  sheet.clear();
  sheet.getRange(1, 1, sortedData.length, sortedData[0].length).setValues(sortedData);
  
  // 格式化
  formatGradeSheet();
  
  Logger.log('\n✅ 資料驗證與排序完成');
}
```

## 常見錯誤與解決方案

### 錯誤 1: 格式設定無效

```javascript
// ❌ 錯誤寫法
sheet.getRange('A1').setNumberFormat('invalid'); // 無效的格式代碼

// ✅ 正確寫法
try {
  sheet.getRange('A1').setNumberFormat('0.00');
} catch (error) {
  Logger.log('格式設定錯誤: ' + error.message);
}
```

### 錯誤 2: 公式語法錯誤

```javascript
// ❌ 錯誤寫法
sheet.getRange('A1').setFormula('SUM(B1:B10)'); // 缺少 =

// ✅ 正確寫法
sheet.getRange('A1').setFormula('=SUM(B1:B10)');
```

### 錯誤 3: 保護範圍衝突

```javascript
// ❌ 錯誤寫法：重複保護同一範圍
var range = sheet.getRange('A1:A10');
range.protect(); // 第一次保護
range.protect(); // 會建立第二個保護（可能不是預期行為）

// ✅ 正確寫法：先檢查是否已保護
function protectRangeSafely(range) {
  var protections = range.getSheet().getProtections(SpreadsheetApp.ProtectionType.RANGE);
  
  // 檢查範圍是否已保護
  for (var i = 0; i < protections.length; i++) {
    if (protections[i].getRange().getA1Notation() === range.getA1Notation()) {
      Logger.log('範圍已保護: ' + range.getA1Notation());
      return protections[i];
    }
  }
  
  // 未保護，建立新保護
  return range.protect();
}
```

## 實用技巧

### 技巧 1: 批次格式化

```javascript
function batchFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange('A1:E10');
  
  // 一次設定多種格式
  range
    .setBackground('#FFFFFF')
    .setFontColor('#000000')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false);
  
  Logger.log('✅ 批次格式化完成');
}
```

### 技巧 2: 交替列顏色

```javascript
function alternatingRowColors() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  if (lastRow < 2) return;
  
  // 從第 2 列開始（跳過標題）
  for (var i = 2; i <= lastRow; i++) {
    var range = sheet.getRange(i, 1, 1, lastColumn);
    
    if (i % 2 === 0) {
      range.setBackground('#F5F5F5'); // 偶數列：淺灰色
    } else {
      range.setBackground('#FFFFFF'); // 奇數列：白色
    }
  }
  
  Logger.log('✅ 交替列顏色設定完成');
}
```

### 技巧 3: 複製格式

```javascript
function copyFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 來源範圍
  var sourceRange = sheet.getRange('A1:C1');
  
  // 目標範圍
  var targetRange = sheet.getRange('A10:C10');
  
  // 複製格式（不複製值）
  sourceRange.copyFormatToRange(sheet, 1, 3, 10, 10);
  
  Logger.log('✅ 格式複製完成');
}
```

### 技巧 4: 清除格式

```javascript
function clearFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange('A1:E10');
  
  // 只清除格式，保留內容
  range.clearFormat();
  
  Logger.log('✅ 格式已清除');
}
```

## 練習題

1. 撰寫函式將試算表的標題列設定為藍色背景、白色文字、粗體、置中對齊
2. 建立函式根據分數自動設定儲存格顏色（90+ 綠色、60-89 黃色、<60 紅色）
3. 撰寫函式將資料依指定欄位排序，並在排序後保護標題列
4. 建立函式為每一列自動生成「總分」和「平均」公式
5. 撰寫函式建立統計報表，包含最高分、最低分、平均分、及格率

## 總結

本講義介紹了格式化與進階操作：

- ✅ 格式設定：setNumberFormat()、setFontColor()、setBackground()
- ✅ 資料排序：sort() 方法與自訂排序
- ✅ 資料篩選：filter() 方法與複雜條件
- ✅ 公式操作：setFormula() 與動態公式生成
- ✅ 範圍保護：protect() 方法與權限管理

**重要原則：**
1. 使用批次操作提升效能
2. 條件格式化讓資料更易讀
3. 公式可以自動計算，減少手動更新
4. 保護重要範圍防止誤改
5. 結合多種技巧創造專業報表

## 延伸閱讀

- [Range 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/range)
- [Protection 類別參考](https://developers.google.com/apps-script/reference/spreadsheet/protection)
- [數字格式參考](https://developers.google.com/sheets/api/guides/formats)
