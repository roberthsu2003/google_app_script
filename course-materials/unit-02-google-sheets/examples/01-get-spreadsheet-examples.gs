/**
 * SpreadsheetApp 基礎範例
 * 示範如何取得試算表、操作工作表、選取範圍
 */

// ==================== 取得試算表範例 ====================

/**
 * 範例 1: 使用 getActiveSpreadsheet() 取得目前試算表
 * ✅ GAS 完全支援
 */
function example01_getActiveSpreadsheet() {
  // 取得目前開啟的試算表
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 顯示試算表資訊
  Logger.log('=== 試算表資訊 ===');
  Logger.log('名稱: ' + spreadsheet.getName());
  Logger.log('ID: ' + spreadsheet.getId());
  Logger.log('URL: ' + spreadsheet.getUrl());
  Logger.log('工作表數量: ' + spreadsheet.getNumSheets());
}

/**
 * 範例 2: 使用 openById() 開啟特定試算表
 * ✅ GAS 完全支援
 */
function example02_openById() {
  // ⚠️ 請替換成你的試算表 ID
  var spreadsheetId = '請替換成你的試算表ID';
  
  try {
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log('成功開啟試算表: ' + spreadsheet.getName());
    Logger.log('URL: ' + spreadsheet.getUrl());
  } catch (error) {
    Logger.log('❌ 無法開啟試算表');
    Logger.log('錯誤訊息: ' + error.message);
    Logger.log('請確認：');
    Logger.log('1. 試算表 ID 是否正確');
    Logger.log('2. 是否有權限存取該試算表');
  }
}

/**
 * 範例 3: 使用 openByUrl() 開啟試算表
 * ✅ GAS 完全支援
 */
function example03_openByUrl() {
  // ⚠️ 請替換成你的試算表 URL
  var url = 'https://docs.google.com/spreadsheets/d/你的試算表ID/edit';
  
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(url);
    Logger.log('成功開啟試算表: ' + spreadsheet.getName());
    Logger.log('ID: ' + spreadsheet.getId());
  } catch (error) {
    Logger.log('❌ 無法開啟試算表');
    Logger.log('錯誤訊息: ' + error.message);
  }
}

/**
 * 範例 4: 比較三種取得試算表的方法
 */
function example04_compareThreeMethods() {
  Logger.log('=== 三種取得試算表的方法比較 ===\n');
  
  // 方法 1: getActiveSpreadsheet()
  Logger.log('方法 1: getActiveSpreadsheet()');
  Logger.log('優點: 最簡單，不需要 ID 或 URL');
  Logger.log('缺點: 只能操作目前開啟的試算表');
  Logger.log('使用時機: 腳本綁定在試算表上\n');
  
  // 方法 2: openById()
  Logger.log('方法 2: openById(id)');
  Logger.log('優點: 可操作任何有權限的試算表');
  Logger.log('缺點: 需要知道試算表 ID');
  Logger.log('使用時機: 跨試算表操作\n');
  
  // 方法 3: openByUrl()
  Logger.log('方法 3: openByUrl(url)');
  Logger.log('優點: 使用完整 URL，容易從設定中讀取');
  Logger.log('缺點: URL 較長');
  Logger.log('使用時機: 從設定檔或使用者輸入取得 URL');
}

// ==================== 工作表操作範例 ====================

/**
 * 範例 5: 取得工作表的各種方法
 * ✅ GAS 完全支援
 */
function example05_getSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  Logger.log('=== 取得工作表範例 ===\n');
  
  // 方法 1: 透過名稱取得工作表
  var sheet1 = spreadsheet.getSheetByName('工作表1');
  if (sheet1) {
    Logger.log('方法 1: getSheetByName()');
    Logger.log('工作表名稱: ' + sheet1.getName());
    Logger.log('工作表 ID: ' + sheet1.getSheetId() + '\n');
  }
  
  // 方法 2: 取得目前作用中的工作表
  var activeSheet = spreadsheet.getActiveSheet();
  Logger.log('方法 2: getActiveSheet()');
  Logger.log('目前工作表: ' + activeSheet.getName() + '\n');
  
  // 方法 3: 取得所有工作表
  var sheets = spreadsheet.getSheets();
  Logger.log('方法 3: getSheets()');
  Logger.log('工作表總數: ' + sheets.length);
  Logger.log('所有工作表:');
  for (var i = 0; i < sheets.length; i++) {
    Logger.log('  ' + (i + 1) + '. ' + sheets[i].getName());
  }
}

/**
 * 範例 6: 新增工作表
 * ✅ GAS 完全支援
 */
function example06_insertSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  Logger.log('=== 新增工作表範例 ===\n');
  
  // 方法 1: 新增工作表（自動命名）
  var newSheet1 = spreadsheet.insertSheet();
  Logger.log('方法 1: 自動命名');
  Logger.log('新增工作表: ' + newSheet1.getName() + '\n');
  
  // 方法 2: 新增工作表並指定名稱
  var timestamp = Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyyMMdd_HHmmss');
  var newSheet2 = spreadsheet.insertSheet('測試_' + timestamp);
  Logger.log('方法 2: 指定名稱');
  Logger.log('新增工作表: ' + newSheet2.getName() + '\n');
  
  // 方法 3: 在特定位置新增工作表
  var newSheet3 = spreadsheet.insertSheet('第一個工作表', 0);
  Logger.log('方法 3: 指定位置');
  Logger.log('在第一個位置新增: ' + newSheet3.getName());
}

/**
 * 範例 7: 刪除工作表（含安全檢查）
 * ✅ GAS 完全支援
 */
function example07_deleteSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = '測試工作表';
  
  Logger.log('=== 刪除工作表範例 ===\n');
  
  // 檢查工作表是否存在
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    Logger.log('❌ 找不到工作表: ' + sheetName);
    return;
  }
  
  // 檢查是否為最後一個工作表
  var sheets = spreadsheet.getSheets();
  if (sheets.length === 1) {
    Logger.log('❌ 無法刪除最後一個工作表');
    return;
  }
  
  // 刪除工作表
  try {
    spreadsheet.deleteSheet(sheet);
    Logger.log('✅ 已刪除工作表: ' + sheetName);
  } catch (error) {
    Logger.log('❌ 刪除失敗: ' + error.message);
  }
}

/**
 * 範例 8: 檢查工作表是否存在
 * ✅ GAS 完全支援
 */
function example08_checkSheetExists() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['工作表1', '學生成績', '不存在的工作表'];
  
  Logger.log('=== 檢查工作表是否存在 ===\n');
  
  for (var i = 0; i < sheetNames.length; i++) {
    var sheetName = sheetNames[i];
    var sheet = spreadsheet.getSheetByName(sheetName);
    
    if (sheet) {
      Logger.log('✅ ' + sheetName + ' - 存在');
    } else {
      Logger.log('❌ ' + sheetName + ' - 不存在');
    }
  }
}

// ==================== 範圍選取範例 ====================

/**
 * 範例 9: getRange() 的各種用法
 * ✅ GAS 完全支援
 */
function example09_getRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== getRange() 範例 ===\n');
  
  // 方法 1: 使用 A1 表示法（單一儲存格）
  var range1 = sheet.getRange('A1');
  Logger.log('方法 1: A1 表示法（單一儲存格）');
  Logger.log('範圍: ' + range1.getA1Notation() + '\n');
  
  // 方法 2: 使用 A1 表示法（範圍）
  var range2 = sheet.getRange('A1:C10');
  Logger.log('方法 2: A1 表示法（範圍）');
  Logger.log('範圍: ' + range2.getA1Notation());
  Logger.log('列數: ' + range2.getNumRows());
  Logger.log('欄數: ' + range2.getNumColumns() + '\n');
  
  // 方法 3: 使用行列數字（單一儲存格）
  var range3 = sheet.getRange(1, 1); // 第 1 列第 1 欄 = A1
  Logger.log('方法 3: 行列數字（單一儲存格）');
  Logger.log('範圍: ' + range3.getA1Notation() + '\n');
  
  // 方法 4: 使用行列數字（指定列數）
  var range4 = sheet.getRange(1, 1, 10); // 從 A1 開始，10 列 = A1:A10
  Logger.log('方法 4: 行列數字（指定列數）');
  Logger.log('範圍: ' + range4.getA1Notation() + '\n');
  
  // 方法 5: 使用行列數字（指定列數和欄數）
  var range5 = sheet.getRange(1, 1, 10, 3); // 從 A1 開始，10 列 3 欄 = A1:C10
  Logger.log('方法 5: 行列數字（指定列數和欄數）');
  Logger.log('範圍: ' + range5.getA1Notation());
  Logger.log('列數: ' + range5.getNumRows());
  Logger.log('欄數: ' + range5.getNumColumns());
}

/**
 * 範例 10: getDataRange() 取得有資料的範圍
 * ✅ GAS 完全支援
 */
function example10_getDataRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== getDataRange() 範例 ===\n');
  
  // 取得包含所有資料的範圍
  var dataRange = sheet.getDataRange();
  
  Logger.log('資料範圍: ' + dataRange.getA1Notation());
  Logger.log('起始列: ' + dataRange.getRow());
  Logger.log('起始欄: ' + dataRange.getColumn());
  Logger.log('列數: ' + dataRange.getNumRows());
  Logger.log('欄數: ' + dataRange.getNumColumns());
  
  // 取得所有資料
  var values = dataRange.getValues();
  Logger.log('\n資料內容:');
  for (var i = 0; i < Math.min(values.length, 5); i++) {
    Logger.log('第 ' + (i + 1) + ' 列: ' + values[i].join(', '));
  }
  
  if (values.length > 5) {
    Logger.log('... 還有 ' + (values.length - 5) + ' 列');
  }
}

/**
 * 範例 11: getLastRow() 和 getLastColumn()
 * ✅ GAS 完全支援
 */
function example11_getLastRowColumn() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== getLastRow() 和 getLastColumn() 範例 ===\n');
  
  // 取得最後一列和最後一欄
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  Logger.log('最後一列: ' + lastRow);
  Logger.log('最後一欄: ' + lastColumn);
  Logger.log('最後一欄字母: ' + columnToLetter(lastColumn) + '\n');
  
  // 實用範例：取得 A 欄所有資料
  if (lastRow > 0) {
    Logger.log('取得 A 欄所有資料:');
    var range = sheet.getRange(1, 1, lastRow, 1);
    var values = range.getValues();
    
    for (var i = 0; i < Math.min(values.length, 5); i++) {
      Logger.log('A' + (i + 1) + ': ' + values[i][0]);
    }
    
    if (values.length > 5) {
      Logger.log('... 還有 ' + (values.length - 5) + ' 筆');
    }
  }
}

/**
 * 範例 12: 範圍選取綜合應用
 * ✅ GAS 完全支援
 */
function example12_rangeSelectionPractice() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  Logger.log('=== 範圍選取綜合應用 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  Logger.log('資料範圍: ' + lastRow + ' 列 x ' + lastColumn + ' 欄\n');
  
  // 情境 1: 讀取標題列（第一列）
  if (lastColumn > 0) {
    Logger.log('情境 1: 讀取標題列');
    var headerRange = sheet.getRange(1, 1, 1, lastColumn);
    var headers = headerRange.getValues()[0];
    Logger.log('標題: ' + headers.join(' | ') + '\n');
  }
  
  // 情境 2: 讀取資料列（排除標題）
  if (lastRow > 1) {
    Logger.log('情境 2: 讀取資料列（排除標題）');
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    Logger.log('資料範圍: ' + dataRange.getA1Notation());
    Logger.log('資料筆數: ' + (lastRow - 1) + ' 筆\n');
  }
  
  // 情境 3: 讀取特定欄位（例如 B 欄）
  if (lastRow > 0 && lastColumn >= 2) {
    Logger.log('情境 3: 讀取 B 欄所有資料');
    var columnB = sheet.getRange(1, 2, lastRow, 1);
    Logger.log('範圍: ' + columnB.getA1Notation() + '\n');
  }
  
  // 情境 4: 新增資料到最後一列
  Logger.log('情境 4: 新增資料位置');
  var newRow = lastRow + 1;
  Logger.log('新資料將寫入第 ' + newRow + ' 列');
  Logger.log('範圍: A' + newRow + ':' + columnToLetter(lastColumn) + newRow);
}

/**
 * 範例 13: 取得範圍詳細資訊
 * ✅ GAS 完全支援
 */
function example13_getRangeInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange('B2:D10');
  
  Logger.log('=== 範圍詳細資訊 ===\n');
  Logger.log('A1 表示法: ' + range.getA1Notation());
  Logger.log('起始列: ' + range.getRow());
  Logger.log('起始欄: ' + range.getColumn());
  Logger.log('列數: ' + range.getNumRows());
  Logger.log('欄數: ' + range.getNumColumns());
  Logger.log('儲存格總數: ' + (range.getNumRows() * range.getNumColumns()));
  Logger.log('工作表名稱: ' + range.getSheet().getName());
}

// ==================== 輔助函式 ====================

/**
 * 將欄號轉換為字母（例如 1 -> A, 27 -> AA）
 */
function columnToLetter(column) {
  var temp;
  var letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/**
 * 實用函式：安全地取得或建立工作表
 */
function getOrCreateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log('✅ 建立新工作表: ' + sheetName);
  } else {
    Logger.log('✅ 工作表已存在: ' + sheetName);
  }
  
  return sheet;
}

/**
 * 實用函式：列出所有工作表資訊
 */
function listAllSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  
  Logger.log('=== 試算表工作表清單 ===');
  Logger.log('試算表: ' + spreadsheet.getName());
  Logger.log('工作表總數: ' + sheets.length + '\n');
  
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    Logger.log((i + 1) + '. ' + sheet.getName());
    Logger.log('   ID: ' + sheet.getSheetId());
    Logger.log('   資料範圍: ' + sheet.getLastRow() + ' 列 x ' + sheet.getLastColumn() + ' 欄');
    Logger.log('   最大範圍: ' + sheet.getMaxRows() + ' 列 x ' + sheet.getMaxColumns() + ' 欄');
    Logger.log('');
  }
}
