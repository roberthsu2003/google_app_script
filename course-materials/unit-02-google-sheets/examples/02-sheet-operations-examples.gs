/**
 * 工作表操作範例
 * 示範工作表的建立、複製、重新命名、排序等進階操作
 */

/**
 * 範例 1: 複製工作表
 * ✅ GAS 完全支援
 */
function example01_copySheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = spreadsheet.getActiveSheet();
  
  Logger.log('=== 複製工作表範例 ===\n');
  
  // 複製工作表
  var copiedSheet = sourceSheet.copyTo(spreadsheet);
  
  // 重新命名複製的工作表
  var timestamp = Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyyMMdd_HHmmss');
  var newName = sourceSheet.getName() + '_備份_' + timestamp;
  copiedSheet.setName(newName);
  
  Logger.log('原始工作表: ' + sourceSheet.getName());
  Logger.log('複製工作表: ' + copiedSheet.getName());
  Logger.log('✅ 複製完成');
}

/**
 * 範例 2: 重新命名工作表
 * ✅ GAS 完全支援
 */
function example02_renameSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var oldName = sheet.getName();
  var newName = '新名稱_' + Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyyMMdd');
  
  Logger.log('=== 重新命名工作表 ===\n');
  Logger.log('原名稱: ' + oldName);
  
  try {
    sheet.setName(newName);
    Logger.log('新名稱: ' + sheet.getName());
    Logger.log('✅ 重新命名成功');
  } catch (error) {
    Logger.log('❌ 重新命名失敗: ' + error.message);
    Logger.log('可能原因: 工作表名稱已存在');
  }
}

/**
 * 範例 3: 移動工作表位置
 * ✅ GAS 完全支援
 */
function example03_moveSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  Logger.log('=== 移動工作表位置 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  Logger.log('目前位置: ' + (sheet.getIndex() + 1));
  
  // 移動到第一個位置
  spreadsheet.setActiveSheet(sheet);
  spreadsheet.moveActiveSheet(1);
  
  Logger.log('新位置: ' + (sheet.getIndex() + 1));
  Logger.log('✅ 移動完成');
}

/**
 * 範例 4: 隱藏和顯示工作表
 * ✅ GAS 完全支援
 */
function example04_hideShowSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 隱藏和顯示工作表 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 檢查目前狀態
  var isHidden = sheet.isSheetHidden();
  Logger.log('目前狀態: ' + (isHidden ? '隱藏' : '顯示'));
  
  // 切換狀態
  if (isHidden) {
    sheet.showSheet();
    Logger.log('✅ 已顯示工作表');
  } else {
    // 注意：無法隱藏最後一個可見的工作表
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var visibleSheets = spreadsheet.getSheets().filter(function(s) {
      return !s.isSheetHidden();
    });
    
    if (visibleSheets.length > 1) {
      sheet.hideSheet();
      Logger.log('✅ 已隱藏工作表');
    } else {
      Logger.log('❌ 無法隱藏最後一個可見的工作表');
    }
  }
}

/**
 * 範例 5: 保護工作表
 * ✅ GAS 完全支援
 */
function example05_protectSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 保護工作表 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 保護整個工作表
  var protection = sheet.protect();
  
  // 設定保護說明
  protection.setDescription('此工作表已被保護，請勿隨意修改');
  
  // 設定警告模式（允許編輯但會顯示警告）
  protection.setWarningOnly(true);
  
  Logger.log('✅ 工作表已保護');
  Logger.log('保護模式: 警告模式');
  Logger.log('說明: ' + protection.getDescription());
}

/**
 * 範例 6: 取消工作表保護
 * ✅ GAS 完全支援
 */
function example06_unprotectSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 取消工作表保護 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 取得所有保護
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  
  if (protections.length === 0) {
    Logger.log('此工作表沒有保護');
    return;
  }
  
  // 移除所有保護
  for (var i = 0; i < protections.length; i++) {
    protections[i].remove();
  }
  
  Logger.log('✅ 已移除 ' + protections.length + ' 個保護');
}

/**
 * 範例 7: 清除工作表內容
 * ✅ GAS 完全支援
 */
function example07_clearSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 清除工作表內容 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 取得資料範圍
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  if (lastRow === 0 || lastColumn === 0) {
    Logger.log('工作表已經是空的');
    return;
  }
  
  Logger.log('清除前: ' + lastRow + ' 列 x ' + lastColumn + ' 欄');
  
  // 清除所有內容和格式
  sheet.clear();
  
  Logger.log('✅ 已清除所有內容和格式');
  
  // 或者只清除內容，保留格式
  // sheet.clearContents();
  
  // 或者只清除格式，保留內容
  // sheet.clearFormats();
}

/**
 * 範例 8: 調整工作表大小
 * ✅ GAS 完全支援
 */
function example08_resizeSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 調整工作表大小 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  Logger.log('目前大小: ' + sheet.getMaxRows() + ' 列 x ' + sheet.getMaxColumns() + ' 欄');
  
  // 設定新的大小
  var newRows = 100;
  var newColumns = 20;
  
  // 調整列數
  var currentRows = sheet.getMaxRows();
  if (newRows > currentRows) {
    sheet.insertRowsAfter(currentRows, newRows - currentRows);
  } else if (newRows < currentRows) {
    sheet.deleteRows(newRows + 1, currentRows - newRows);
  }
  
  // 調整欄數
  var currentColumns = sheet.getMaxColumns();
  if (newColumns > currentColumns) {
    sheet.insertColumnsAfter(currentColumns, newColumns - currentColumns);
  } else if (newColumns < currentColumns) {
    sheet.deleteColumns(newColumns + 1, currentColumns - newColumns);
  }
  
  Logger.log('新大小: ' + sheet.getMaxRows() + ' 列 x ' + sheet.getMaxColumns() + ' 欄');
  Logger.log('✅ 調整完成');
}

/**
 * 範例 9: 插入和刪除列
 * ✅ GAS 完全支援
 */
function example09_insertDeleteRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 插入和刪除列 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  Logger.log('目前列數: ' + sheet.getMaxRows());
  
  // 在第 5 列之前插入 3 列
  sheet.insertRowsBefore(5, 3);
  Logger.log('在第 5 列之前插入 3 列');
  Logger.log('新列數: ' + sheet.getMaxRows());
  
  // 在第 10 列之後插入 2 列
  sheet.insertRowsAfter(10, 2);
  Logger.log('在第 10 列之後插入 2 列');
  Logger.log('新列數: ' + sheet.getMaxRows());
  
  // 刪除第 5 到 7 列（共 3 列）
  sheet.deleteRows(5, 3);
  Logger.log('刪除第 5 到 7 列');
  Logger.log('最終列數: ' + sheet.getMaxRows());
}

/**
 * 範例 10: 插入和刪除欄
 * ✅ GAS 完全支援
 */
function example10_insertDeleteColumns() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 插入和刪除欄 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  Logger.log('目前欄數: ' + sheet.getMaxColumns());
  
  // 在第 3 欄之前插入 2 欄
  sheet.insertColumnsBefore(3, 2);
  Logger.log('在第 3 欄之前插入 2 欄');
  Logger.log('新欄數: ' + sheet.getMaxColumns());
  
  // 在第 5 欄之後插入 1 欄
  sheet.insertColumnsAfter(5, 1);
  Logger.log('在第 5 欄之後插入 1 欄');
  Logger.log('新欄數: ' + sheet.getMaxColumns());
  
  // 刪除第 3 到 4 欄（共 2 欄）
  sheet.deleteColumns(3, 2);
  Logger.log('刪除第 3 到 4 欄');
  Logger.log('最終欄數: ' + sheet.getMaxColumns());
}

/**
 * 範例 11: 凍結列和欄
 * ✅ GAS 完全支援
 */
function example11_freezeRowsColumns() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 凍結列和欄 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 凍結第一列（標題列）
  sheet.setFrozenRows(1);
  Logger.log('✅ 凍結第 1 列');
  
  // 凍結第一欄
  sheet.setFrozenColumns(1);
  Logger.log('✅ 凍結第 1 欄');
  
  // 查詢凍結狀態
  Logger.log('\n目前凍結狀態:');
  Logger.log('凍結列數: ' + sheet.getFrozenRows());
  Logger.log('凍結欄數: ' + sheet.getFrozenColumns());
  
  // 取消凍結
  // sheet.setFrozenRows(0);
  // sheet.setFrozenColumns(0);
}

/**
 * 範例 12: 設定工作表標籤顏色
 * ✅ GAS 完全支援
 */
function example12_setTabColor() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 設定工作表標籤顏色 ===\n');
  Logger.log('工作表: ' + sheet.getName());
  
  // 設定標籤顏色（使用顏色名稱）
  sheet.setTabColor('red');
  Logger.log('✅ 標籤顏色設為紅色');
  
  // 或使用 RGB 十六進位值
  // sheet.setTabColor('#FF0000');
  
  // 常用顏色範例
  Logger.log('\n常用顏色:');
  Logger.log('紅色: red 或 #FF0000');
  Logger.log('綠色: green 或 #00FF00');
  Logger.log('藍色: blue 或 #0000FF');
  Logger.log('黃色: yellow 或 #FFFF00');
  Logger.log('橙色: orange 或 #FFA500');
}

/**
 * 範例 13: 批次建立多個工作表
 * ✅ GAS 完全支援
 */
function example13_createMultipleSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['學生資料', '成績記錄', '統計分析', '設定'];
  
  Logger.log('=== 批次建立工作表 ===\n');
  
  for (var i = 0; i < sheetNames.length; i++) {
    var sheetName = sheetNames[i];
    
    // 檢查工作表是否已存在
    var existingSheet = spreadsheet.getSheetByName(sheetName);
    
    if (existingSheet) {
      Logger.log('⚠️  工作表已存在: ' + sheetName);
    } else {
      var newSheet = spreadsheet.insertSheet(sheetName);
      Logger.log('✅ 建立工作表: ' + sheetName);
      
      // 設定不同的標籤顏色
      var colors = ['red', 'green', 'blue', 'yellow'];
      newSheet.setTabColor(colors[i % colors.length]);
    }
  }
  
  Logger.log('\n完成！共處理 ' + sheetNames.length + ' 個工作表');
}

/**
 * 範例 14: 工作表資訊摘要
 * ✅ GAS 完全支援
 */
function example14_sheetSummary() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 工作表資訊摘要 ===\n');
  Logger.log('名稱: ' + sheet.getName());
  Logger.log('ID: ' + sheet.getSheetId());
  Logger.log('索引位置: ' + (sheet.getIndex() + 1));
  Logger.log('');
  
  Logger.log('大小:');
  Logger.log('  最大列數: ' + sheet.getMaxRows());
  Logger.log('  最大欄數: ' + sheet.getMaxColumns());
  Logger.log('  資料列數: ' + sheet.getLastRow());
  Logger.log('  資料欄數: ' + sheet.getLastColumn());
  Logger.log('');
  
  Logger.log('狀態:');
  Logger.log('  是否隱藏: ' + (sheet.isSheetHidden() ? '是' : '否'));
  Logger.log('  凍結列數: ' + sheet.getFrozenRows());
  Logger.log('  凍結欄數: ' + sheet.getFrozenColumns());
  Logger.log('');
  
  Logger.log('保護:');
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  Logger.log('  保護數量: ' + protections.length);
  if (protections.length > 0) {
    Logger.log('  保護說明: ' + protections[0].getDescription());
  }
}
