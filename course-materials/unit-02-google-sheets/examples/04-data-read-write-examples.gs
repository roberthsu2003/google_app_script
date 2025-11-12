/**
 * 單元 2：Google Sheets 操作
 * 範例 4：資料讀寫範例
 * 
 * 本檔案包含：
 * - getValue() 和 getValues() 讀取範例
 * - setValue() 和 setValues() 寫入範例
 * - 批次操作範例
 * - 效能優化範例
 * - 資料驗證與錯誤處理範例
 */

// ==================== 資料讀取範例 ====================

/**
 * 範例 1: 讀取單一儲存格
 * 使用 getValue() 讀取單一儲存格的值
 */
function example01_readSingleCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 1: 讀取單一儲存格 ===\n');
  
  // 方法 1: 使用 A1 標記法
  var value1 = sheet.getRange('A1').getValue();
  Logger.log('A1 的值: ' + value1);
  Logger.log('A1 的型別: ' + typeof value1);
  
  // 方法 2: 使用列欄索引（列, 欄）
  var value2 = sheet.getRange(2, 2).getValue();
  Logger.log('B2 的值: ' + value2);
  Logger.log('B2 的型別: ' + typeof value2);
  
  // 讀取不同型別的資料
  var textValue = sheet.getRange('A1').getValue();    // 字串
  var numberValue = sheet.getRange('B1').getValue();  // 數字
  var dateValue = sheet.getRange('C1').getValue();    // 日期
  
  Logger.log('\n不同型別的資料:');
  Logger.log('文字: ' + textValue + ' (型別: ' + typeof textValue + ')');
  Logger.log('數字: ' + numberValue + ' (型別: ' + typeof numberValue + ')');
  Logger.log('日期: ' + dateValue + ' (型別: ' + (dateValue instanceof Date ? 'Date' : typeof dateValue) + ')');
}

/**
 * 範例 2: 讀取多個儲存格
 * 使用 getValues() 讀取範圍內的所有值
 */
function example02_readMultipleCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 2: 讀取多個儲存格 ===\n');
  
  // 讀取 A1:C3 範圍（3列 x 3欄）
  var range = sheet.getRange('A1:C3');
  var values = range.getValues();
  
  Logger.log('讀取範圍: A1:C3');
  Logger.log('資料是二維陣列: ' + (Array.isArray(values) && Array.isArray(values[0])));
  Logger.log('列數: ' + values.length);
  Logger.log('欄數: ' + values[0].length);
  
  // 遍歷所有資料
  Logger.log('\n所有資料:');
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      Logger.log('第 ' + (i+1) + ' 列第 ' + (j+1) + ' 欄: ' + values[i][j]);
    }
  }
  
  // 存取特定儲存格
  Logger.log('\n存取特定儲存格:');
  Logger.log('A1 (values[0][0]): ' + values[0][0]);
  Logger.log('B2 (values[1][1]): ' + values[1][1]);
  Logger.log('C3 (values[2][2]): ' + values[2][2]);
}

/**
 * 範例 3: 讀取標題列與資料列
 * 常見的資料讀取模式
 */
function example03_readHeadersAndData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 3: 讀取標題列與資料列 ===\n');
  
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  Logger.log('工作表資訊:');
  Logger.log('最後一列: ' + lastRow);
  Logger.log('最後一欄: ' + lastColumn);
  
  // 讀取標題列（第 1 列）
  var headerRange = sheet.getRange(1, 1, 1, lastColumn);
  var headers = headerRange.getValues()[0];
  Logger.log('\n標題列: ' + headers.join(', '));
  
  // 讀取資料列（第 2 列開始）
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    var data = dataRange.getValues();
    
    Logger.log('\n資料列數: ' + data.length);
    Logger.log('前 3 筆資料:');
    for (var i = 0; i < Math.min(3, data.length); i++) {
      Logger.log('第 ' + (i+1) + ' 筆: ' + data[i].join(', '));
    }
  } else {
    Logger.log('\n沒有資料列');
  }
}

/**
 * 範例 4: 讀取特定欄位
 * 讀取單一欄的所有資料
 */
function example04_readSpecificColumn() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 4: 讀取特定欄位 ===\n');
  
  var lastRow = sheet.getLastRow();
  
  // 讀取 B 欄（第 2 欄）的所有資料
  var columnData = sheet.getRange(1, 2, lastRow, 1).getValues();
  
  Logger.log('讀取 B 欄，共 ' + columnData.length + ' 列');
  
  // 將二維陣列轉換為一維陣列
  var values = columnData.map(function(row) {
    return row[0];
  });
  
  Logger.log('B 欄資料: ' + values.join(', '));
  
  // 計算數字欄位的總和
  var sum = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i] === 'number') {
      sum += values[i];
      count++;
    }
  }
  
  if (count > 0) {
    Logger.log('\nB 欄數字統計:');
    Logger.log('總和: ' + sum);
    Logger.log('平均: ' + (sum / count).toFixed(2));
  }
}

// ==================== 資料寫入範例 ====================

/**
 * 範例 5: 寫入單一儲存格
 * 使用 setValue() 寫入不同型別的資料
 */
function example05_writeSingleCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 5: 寫入單一儲存格 ===\n');
  
  // 寫入文字
  sheet.getRange('A1').setValue('學號');
  Logger.log('✅ A1 寫入文字: 學號');
  
  // 寫入數字
  sheet.getRange('B1').setValue(100);
  Logger.log('✅ B1 寫入數字: 100');
  
  // 寫入日期
  sheet.getRange('C1').setValue(new Date());
  Logger.log('✅ C1 寫入日期: ' + new Date());
  
  // 寫入布林值
  sheet.getRange('D1').setValue(true);
  Logger.log('✅ D1 寫入布林值: true');
  
  // 寫入公式
  sheet.getRange('E1').setValue('=SUM(B1:B10)');
  Logger.log('✅ E1 寫入公式: =SUM(B1:B10)');
  
  Logger.log('\n✅ 所有資料寫入完成');
}

/**
 * 範例 6: 寫入多個儲存格
 * 使用 setValues() 批次寫入資料
 */
function example06_writeMultipleCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 6: 寫入多個儲存格 ===\n');
  
  // 準備二維陣列資料
  var data = [
    ['學號', '姓名', '分數', '等級'],
    ['A001', '王小明', 85, '良'],
    ['A002', '李小華', 92, '優'],
    ['A003', '張小美', 78, '可'],
    ['A004', '陳小強', 88, '良']
  ];
  
  Logger.log('準備寫入 ' + data.length + ' 列 x ' + data[0].length + ' 欄的資料');
  
  // 計算範圍大小
  var numRows = data.length;
  var numCols = data[0].length;
  
  // 寫入 A1 開始的範圍
  var range = sheet.getRange(1, 1, numRows, numCols);
  range.setValues(data);
  
  Logger.log('✅ 成功寫入 ' + numRows + ' 列資料到 A1:' + 
             String.fromCharCode(64 + numCols) + numRows);
}

/**
 * 範例 7: 新增一列資料
 * 在最後一列後面新增資料
 */
function example07_appendRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 7: 新增一列資料 ===\n');
  
  var lastRow = sheet.getLastRow();
  Logger.log('目前最後一列: ' + lastRow);
  
  // 新資料
  var newData = ['A005', '林小芳', 91, '優'];
  
  // 寫入到最後一列的下一列
  var newRow = lastRow + 1;
  var range = sheet.getRange(newRow, 1, 1, newData.length);
  range.setValues([newData]); // 注意：要包在陣列中成為二維陣列
  
  Logger.log('✅ 新增資料到第 ' + newRow + ' 列');
  Logger.log('新增內容: ' + newData.join(', '));
}

/**
 * 範例 8: 批次新增多列資料
 * 一次新增多筆資料
 */
function example08_appendMultipleRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 8: 批次新增多列資料 ===\n');
  
  var lastRow = sheet.getLastRow();
  Logger.log('目前最後一列: ' + lastRow);
  
  // 多筆新資料
  var newData = [
    ['A006', '黃小明', 76, '可'],
    ['A007', '吳小華', 89, '良'],
    ['A008', '周小傑', 95, '優']
  ];
  
  Logger.log('準備新增 ' + newData.length + ' 列資料');
  
  // 批次寫入
  var startRow = lastRow + 1;
  var range = sheet.getRange(startRow, 1, newData.length, newData[0].length);
  range.setValues(newData);
  
  Logger.log('✅ 成功新增 ' + newData.length + ' 列資料');
  Logger.log('新增範圍: 第 ' + startRow + ' 列到第 ' + (startRow + newData.length - 1) + ' 列');
}

// ==================== 批次操作 vs 逐格操作 ====================

/**
 * 範例 9: 逐格操作（效能差）
 * ❌ 不建議使用的方法
 */
function example09_slowMethod() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 9: 逐格操作（效能差）===\n');
  
  var startTime = new Date().getTime();
  
  // 逐格寫入 50 筆資料
  for (var i = 1; i <= 50; i++) {
    sheet.getRange(i, 1).setValue('資料' + i);
    sheet.getRange(i, 2).setValue(i * 10);
    sheet.getRange(i, 3).setValue(new Date());
  }
  
  var endTime = new Date().getTime();
  var duration = endTime - startTime;
  
  Logger.log('❌ 逐格操作完成');
  Logger.log('寫入 50 列 x 3 欄 = 150 個儲存格');
  Logger.log('耗時: ' + duration + ' 毫秒');
  Logger.log('平均每個儲存格: ' + (duration / 150).toFixed(2) + ' 毫秒');
  
  return duration;
}

/**
 * 範例 10: 批次操作（效能好）
 * ✅ 建議使用的方法
 */
function example10_fastMethod() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 10: 批次操作（效能好）===\n');
  
  var startTime = new Date().getTime();
  
  // 準備所有資料
  var data = [];
  for (var i = 1; i <= 50; i++) {
    data.push(['資料' + i, i * 10, new Date()]);
  }
  
  // 一次寫入所有資料
  var range = sheet.getRange(1, 1, data.length, data[0].length);
  range.setValues(data);
  
  var endTime = new Date().getTime();
  var duration = endTime - startTime;
  
  Logger.log('✅ 批次操作完成');
  Logger.log('寫入 50 列 x 3 欄 = 150 個儲存格');
  Logger.log('耗時: ' + duration + ' 毫秒');
  Logger.log('平均每個儲存格: ' + (duration / 150).toFixed(2) + ' 毫秒');
  
  return duration;
}

/**
 * 範例 11: 效能比較測試
 * 比較逐格操作與批次操作的效能差異
 */
function example11_performanceComparison() {
  Logger.log('=== 範例 11: 效能比較測試 ===\n');
  Logger.log('⚠️  注意：此測試會清空工作表並寫入測試資料\n');
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 建立測試工作表 1（逐格操作）
  var sheet1 = ss.insertSheet('測試_逐格操作');
  SpreadsheetApp.setActiveSheet(sheet1);
  var time1 = example09_slowMethod();
  
  // 建立測試工作表 2（批次操作）
  var sheet2 = ss.insertSheet('測試_批次操作');
  SpreadsheetApp.setActiveSheet(sheet2);
  var time2 = example10_fastMethod();
  
  // 比較結果
  Logger.log('\n=== 效能比較結果 ===');
  Logger.log('逐格操作耗時: ' + time1 + ' 毫秒');
  Logger.log('批次操作耗時: ' + time2 + ' 毫秒');
  Logger.log('速度提升: ' + (time1 / time2).toFixed(2) + ' 倍');
  Logger.log('\n結論: 批次操作比逐格操作快 ' + (time1 / time2).toFixed(0) + ' 倍！');
  
  // 清理測試工作表
  Logger.log('\n清理測試工作表...');
  ss.deleteSheet(sheet1);
  ss.deleteSheet(sheet2);
  Logger.log('✅ 測試完成');
}

// ==================== 資料驗證與錯誤處理 ====================

/**
 * 範例 12: 驗證資料型別
 * 檢查儲存格資料的型別
 */
function example12_validateDataType() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 12: 驗證資料型別 ===\n');
  
  // 讀取 A1 的值
  var value = sheet.getRange('A1').getValue();
  
  Logger.log('A1 的值: ' + value);
  Logger.log('A1 的型別: ' + typeof value);
  
  // 檢查資料型別
  if (typeof value === 'number') {
    Logger.log('✅ 這是數字');
    Logger.log('數字值: ' + value);
  } else if (typeof value === 'string') {
    Logger.log('✅ 這是字串');
    Logger.log('字串長度: ' + value.length);
  } else if (value instanceof Date) {
    Logger.log('✅ 這是日期');
    Logger.log('日期: ' + value.toLocaleDateString());
  } else if (typeof value === 'boolean') {
    Logger.log('✅ 這是布林值');
    Logger.log('布林值: ' + value);
  } else if (value === '') {
    Logger.log('⚠️  這是空值');
  } else {
    Logger.log('❓ 未知的資料型別');
  }
}

/**
 * 範例 13: 驗證資料範圍
 * 檢查數值是否在有效範圍內
 */
function example13_validateDataRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 13: 驗證資料範圍 ===\n');
  
  // 讀取 B2 的分數
  var score = sheet.getRange('B2').getValue();
  
  Logger.log('讀取的分數: ' + score);
  Logger.log('分數型別: ' + typeof score);
  
  // 驗證分數
  var isValid = true;
  var errorMessage = '';
  
  // 檢查是否為數字
  if (typeof score !== 'number') {
    isValid = false;
    errorMessage = '分數必須是數字';
  }
  // 檢查範圍
  else if (score < 0 || score > 100) {
    isValid = false;
    errorMessage = '分數必須在 0-100 之間';
  }
  
  // 顯示驗證結果
  if (isValid) {
    Logger.log('✅ 分數有效');
    
    // 判斷等級
    var grade;
    if (score >= 90) {
      grade = '優';
    } else if (score >= 80) {
      grade = '良';
    } else if (score >= 60) {
      grade = '可';
    } else {
      grade = '待加強';
    }
    
    Logger.log('等級: ' + grade);
  } else {
    Logger.log('❌ 分數無效: ' + errorMessage);
  }
  
  return isValid;
}

/**
 * 範例 14: 錯誤處理範例
 * 使用 try-catch 處理可能的錯誤
 */
function example14_errorHandling() {
  Logger.log('=== 範例 14: 錯誤處理範例 ===\n');
  
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // 檢查工作表是否為空
    var lastRow = sheet.getLastRow();
    Logger.log('工作表最後一列: ' + lastRow);
    
    if (lastRow === 0) {
      throw new Error('工作表是空的，沒有資料');
    }
    
    // 讀取資料
    var data = sheet.getRange(1, 1, lastRow, 3).getValues();
    Logger.log('成功讀取 ' + data.length + ' 列資料');
    
    // 驗證資料
    if (data.length === 0) {
      throw new Error('沒有資料可以處理');
    }
    
    // 處理資料
    Logger.log('處理資料中...');
    for (var i = 0; i < data.length; i++) {
      // 檢查每列是否有足夠的欄位
      if (data[i].length < 3) {
        Logger.log('⚠️  警告: 第 ' + (i+1) + ' 列資料不完整');
        continue;
      }
      
      Logger.log('第 ' + (i+1) + ' 列: ' + data[i].join(', '));
    }
    
    Logger.log('\n✅ 資料處理完成');
    
  } catch (error) {
    Logger.log('❌ 發生錯誤: ' + error.message);
    Logger.log('錯誤堆疊: ' + error.stack);
    
    // 可以在這裡進行錯誤處理，例如：
    // - 記錄錯誤到另一個工作表
    // - 發送錯誤通知郵件
    // - 回傳錯誤訊息給使用者
  }
}

/**
 * 範例 15: 安全的資料讀寫
 * 包含完整的驗證與錯誤處理
 */
function example15_safeReadWrite() {
  Logger.log('=== 範例 15: 安全的資料讀寫 ===\n');
  
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // 步驟 1: 驗證工作表
    Logger.log('步驟 1: 驗證工作表');
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    
    if (lastRow === 0) {
      throw new Error('工作表是空的');
    }
    
    Logger.log('✅ 工作表有 ' + lastRow + ' 列 x ' + lastColumn + ' 欄');
    
    // 步驟 2: 讀取資料
    Logger.log('\n步驟 2: 讀取資料');
    var data = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
    Logger.log('✅ 成功讀取 ' + data.length + ' 列資料');
    
    // 步驟 3: 驗證資料
    Logger.log('\n步驟 3: 驗證資料');
    var validRows = 0;
    var invalidRows = 0;
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var isEmpty = row.every(function(cell) {
        return cell === '' || cell === null || cell === undefined;
      });
      
      if (isEmpty) {
        invalidRows++;
      } else {
        validRows++;
      }
    }
    
    Logger.log('有效資料列: ' + validRows);
    Logger.log('無效資料列: ' + invalidRows);
    
    // 步驟 4: 寫入新資料
    Logger.log('\n步驟 4: 寫入新資料');
    var newData = [
      ['新資料1', 100, new Date()],
      ['新資料2', 200, new Date()]
    ];
    
    var newRow = lastRow + 1;
    var range = sheet.getRange(newRow, 1, newData.length, newData[0].length);
    range.setValues(newData);
    
    Logger.log('✅ 成功寫入 ' + newData.length + ' 列新資料到第 ' + newRow + ' 列');
    
    Logger.log('\n✅ 所有操作完成');
    return true;
    
  } catch (error) {
    Logger.log('\n❌ 操作失敗: ' + error.message);
    Logger.log('詳細錯誤: ' + error.stack);
    return false;
  }
}

/**
 * 範例 16: 資料清理
 * 移除空白列與清理資料
 */
function example16_cleanData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 16: 資料清理 ===\n');
  
  try {
    // 讀取所有資料
    var data = sheet.getDataRange().getValues();
    Logger.log('原始資料筆數: ' + data.length);
    
    // 清理資料
    var cleanedData = [];
    var removedCount = 0;
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      
      // 檢查是否為空白列
      var isEmpty = row.every(function(cell) {
        if (typeof cell === 'string') {
          return cell.trim() === '';
        }
        return cell === '' || cell === null || cell === undefined;
      });
      
      if (isEmpty) {
        removedCount++;
        Logger.log('移除空白列: 第 ' + (i+1) + ' 列');
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
    
    Logger.log('\n清理結果:');
    Logger.log('原始資料: ' + data.length + ' 列');
    Logger.log('清理後資料: ' + cleanedData.length + ' 列');
    Logger.log('移除了 ' + removedCount + ' 列空白資料');
    
    // 寫回工作表
    if (cleanedData.length > 0) {
      sheet.clear();
      sheet.getRange(1, 1, cleanedData.length, cleanedData[0].length).setValues(cleanedData);
      Logger.log('\n✅ 資料清理完成並寫回工作表');
    } else {
      Logger.log('\n⚠️  警告: 清理後沒有資料');
    }
    
  } catch (error) {
    Logger.log('❌ 資料清理失敗: ' + error.message);
  }
}

// ==================== 進階技巧 ====================

/**
 * 範例 17: 資料轉換為物件陣列
 * 將試算表資料轉換為 JavaScript 物件陣列
 */
function example17_dataToObjects() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 17: 資料轉換為物件陣列 ===\n');
  
  try {
    var data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      Logger.log('⚠️  工作表沒有資料');
      return [];
    }
    
    // 第一列是標題
    var headers = data[0];
    Logger.log('標題列: ' + headers.join(', '));
    
    // 從第二列開始轉換為物件
    var objects = [];
    for (var i = 1; i < data.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[i][j];
      }
      objects.push(obj);
    }
    
    Logger.log('\n成功轉換為 ' + objects.length + ' 個物件');
    Logger.log('\n前 3 個物件:');
    for (var i = 0; i < Math.min(3, objects.length); i++) {
      Logger.log('物件 ' + (i+1) + ': ' + JSON.stringify(objects[i]));
    }
    
    return objects;
    
  } catch (error) {
    Logger.log('❌ 轉換失敗: ' + error.message);
    return [];
  }
}

/**
 * 範例 18: 物件陣列寫入試算表
 * 將 JavaScript 物件陣列寫入試算表
 */
function example18_objectsToData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 18: 物件陣列寫入試算表 ===\n');
  
  try {
    // 物件陣列
    var objects = [
      {學號: 'A001', 姓名: '王小明', 分數: 85, 等級: '良'},
      {學號: 'A002', 姓名: '李小華', 分數: 92, 等級: '優'},
      {學號: 'A003', 姓名: '張小美', 分數: 78, 等級: '可'}
    ];
    
    Logger.log('物件數量: ' + objects.length);
    
    if (objects.length === 0) {
      Logger.log('⚠️  沒有物件可以寫入');
      return;
    }
    
    // 取得標題（物件的鍵）
    var headers = Object.keys(objects[0]);
    Logger.log('標題: ' + headers.join(', '));
    
    // 轉換為二維陣列
    var data = [headers]; // 第一列是標題
    
    for (var i = 0; i < objects.length; i++) {
      var row = [];
      for (var j = 0; j < headers.length; j++) {
        row.push(objects[i][headers[j]]);
      }
      data.push(row);
    }
    
    Logger.log('轉換為 ' + data.length + ' 列 x ' + data[0].length + ' 欄的陣列');
    
    // 寫入試算表
    sheet.clear();
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    
    Logger.log('✅ 成功寫入 ' + objects.length + ' 筆資料到試算表');
    
  } catch (error) {
    Logger.log('❌ 寫入失敗: ' + error.message);
  }
}

/**
 * 範例 19: 條件更新資料
 * 根據條件更新特定資料
 */
function example19_conditionalUpdate() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範例 19: 條件更新資料 ===\n');
  
  try {
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('⚠️  沒有資料列可以更新');
      return;
    }
    
    Logger.log('資料列數: ' + (data.length - 1)); // 扣除標題列
    
    var updateCount = 0;
    
    // 假設第 3 欄是分數，第 4 欄是等級
    // 根據分數更新等級
    for (var i = 1; i < data.length; i++) { // 從第 2 列開始（跳過標題）
      var score = data[i][2]; // 第 3 欄（索引 2）
      
      if (typeof score === 'number') {
        var oldGrade = data[i][3];
        var newGrade;
        
        if (score >= 90) {
          newGrade = '優';
        } else if (score >= 80) {
          newGrade = '良';
        } else if (score >= 60) {
          newGrade = '可';
        } else {
          newGrade = '待加強';
        }
        
        if (oldGrade !== newGrade) {
          data[i][3] = newGrade;
          updateCount++;
          Logger.log('更新第 ' + (i+1) + ' 列: 分數 ' + score + ' → 等級 ' + newGrade);
        }
      }
    }
    
    // 寫回試算表
    if (updateCount > 0) {
      sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
      Logger.log('\n✅ 成功更新 ' + updateCount + ' 筆資料');
    } else {
      Logger.log('\n⚠️  沒有資料需要更新');
    }
    
  } catch (error) {
    Logger.log('❌ 更新失敗: ' + error.message);
  }
}

/**
 * 範例 20: 綜合應用 - 學生成績處理系統
 * 整合讀取、驗證、處理、寫入的完整流程
 */
function example20_comprehensiveExample() {
  Logger.log('=== 範例 20: 綜合應用 - 學生成績處理系統 ===\n');
  
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // 步驟 1: 讀取資料
    Logger.log('步驟 1: 讀取資料');
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      throw new Error('沒有學生資料');
    }
    
    var headers = data[0];
    Logger.log('✅ 讀取 ' + (data.length - 1) + ' 位學生的資料');
    Logger.log('欄位: ' + headers.join(', '));
    
    // 步驟 2: 驗證與處理資料
    Logger.log('\n步驟 2: 驗證與處理資料');
    var validCount = 0;
    var invalidCount = 0;
    var totalScore = 0;
    
    for (var i = 1; i < data.length; i++) {
      var studentId = data[i][0];
      var name = data[i][1];
      var score = data[i][2];
      
      // 驗證資料
      if (!studentId || !name) {
        Logger.log('⚠️  第 ' + (i+1) + ' 列: 學號或姓名為空');
        invalidCount++;
        continue;
      }
      
      if (typeof score !== 'number' || score < 0 || score > 100) {
        Logger.log('⚠️  第 ' + (i+1) + ' 列: 分數無效 (' + score + ')');
        invalidCount++;
        continue;
      }
      
      validCount++;
      totalScore += score;
      
      // 計算等級
      var grade;
      if (score >= 90) {
        grade = '優';
      } else if (score >= 80) {
        grade = '良';
      } else if (score >= 60) {
        grade = '可';
      } else {
        grade = '待加強';
      }
      
      // 更新等級（假設第 4 欄是等級）
      if (data[i].length >= 4) {
        data[i][3] = grade;
      } else {
        data[i].push(grade);
      }
    }
    
    Logger.log('有效資料: ' + validCount + ' 筆');
    Logger.log('無效資料: ' + invalidCount + ' 筆');
    
    // 步驟 3: 計算統計資料
    Logger.log('\n步驟 3: 計算統計資料');
    if (validCount > 0) {
      var average = totalScore / validCount;
      Logger.log('平均分數: ' + average.toFixed(2));
      
      // 找出最高分
      var maxScore = 0;
      var topStudent = '';
      for (var i = 1; i < data.length; i++) {
        if (typeof data[i][2] === 'number' && data[i][2] > maxScore) {
          maxScore = data[i][2];
          topStudent = data[i][1];
        }
      }
      Logger.log('最高分: ' + maxScore + ' (' + topStudent + ')');
    }
    
    // 步驟 4: 寫回資料
    Logger.log('\n步驟 4: 寫回資料');
    
    // 確保標題列有「等級」欄位
    if (headers.length < 4 || headers[3] !== '等級') {
      headers[3] = '等級';
      data[0] = headers;
    }
    
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    Logger.log('✅ 資料已更新到試算表');
    
    // 步驟 5: 新增統計資料
    Logger.log('\n步驟 5: 新增統計資料');
    var statsRow = data.length + 2; // 空一列
    sheet.getRange(statsRow, 1).setValue('統計資料');
    sheet.getRange(statsRow + 1, 1).setValue('總人數');
    sheet.getRange(statsRow + 1, 2).setValue(validCount);
    sheet.getRange(statsRow + 2, 1).setValue('平均分數');
    sheet.getRange(statsRow + 2, 2).setValue(validCount > 0 ? average.toFixed(2) : 0);
    sheet.getRange(statsRow + 3, 1).setValue('最高分');
    sheet.getRange(statsRow + 3, 2).setValue(maxScore);
    
    Logger.log('✅ 統計資料已新增');
    
    Logger.log('\n✅ 所有處理完成！');
    
  } catch (error) {
    Logger.log('❌ 處理失敗: ' + error.message);
    Logger.log('錯誤詳情: ' + error.stack);
  }
}

// ==================== 測試用函式 ====================

/**
 * 建立測試資料
 * 用於測試上述範例
 */
function createTestData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 建立測試資料 ===\n');
  
  // 清空工作表
  sheet.clear();
  
  // 建立測試資料
  var testData = [
    ['學號', '姓名', '分數', '等級'],
    ['A001', '王小明', 85, ''],
    ['A002', '李小華', 92, ''],
    ['A003', '張小美', 78, ''],
    ['A004', '陳小強', 88, ''],
    ['A005', '林小芳', 95, ''],
    ['A006', '黃小明', 72, ''],
    ['A007', '吳小華', 89, ''],
    ['A008', '周小傑', 91, ''],
    ['A009', '鄭小美', 76, ''],
    ['A010', '謝小華', 83, '']
  ];
  
  // 寫入測試資料
  sheet.getRange(1, 1, testData.length, testData[0].length).setValues(testData);
  
  Logger.log('✅ 測試資料建立完成');
  Logger.log('資料筆數: ' + (testData.length - 1) + ' 位學生');
}
