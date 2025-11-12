/**
 * 錯誤處理練習題 - 解答
 * 
 * 本檔案包含所有練習題的完整解答
 * 每個解答都包含詳細的註解說明
 */


// ============================================
// 練習 1: 安全的數學運算 - 解答
// ============================================

function calculate(num1, num2, operator) {
  try {
    // 驗證參數是否為數字
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('參數必須是數字');
    }
    
    // 驗證數字是否有效（不是 NaN）
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error('參數不是有效的數字');
    }
    
    // 根據運算子執行計算
    var result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        // 檢查除數是否為零
        if (num2 === 0) {
          throw new Error('除數不能為零');
        }
        result = num1 / num2;
        break;
      default:
        throw new Error('不支援的運算子: ' + operator);
    }
    
    return result;
    
  } catch (error) {
    Logger.log('計算錯誤: ' + error.message);
    return '錯誤：' + error.message;
  }
}

// 測試函式
function testCalculate() {
  Logger.log('=== 練習 1: 安全的數學運算 - 解答 ===');
  
  Logger.log('10 + 5 = ' + calculate(10, 5, '+'));      // 15
  Logger.log('10 - 5 = ' + calculate(10, 5, '-'));      // 5
  Logger.log('10 * 5 = ' + calculate(10, 5, '*'));      // 50
  Logger.log('10 / 5 = ' + calculate(10, 5, '/'));      // 2
  Logger.log('10 / 0 = ' + calculate(10, 0, '/'));      // 錯誤
  Logger.log('10 + "a" = ' + calculate(10, 'a', '+'));  // 錯誤
  Logger.log('10 % 5 = ' + calculate(10, 5, '%'));      // 錯誤
}


// ============================================
// 練習 2: 學生成績處理系統 - 解答
// ============================================

function processStudentGrade(name, scores) {
  try {
    // 驗證姓名
    if (!name || name.trim() === '') {
      throw new Error('姓名不能為空');
    }
    
    // 驗證成績陣列
    if (!Array.isArray(scores)) {
      throw new Error('成績必須是陣列');
    }
    
    if (scores.length === 0) {
      throw new Error('成績陣列不能為空');
    }
    
    // 驗證每個成績
    for (var i = 0; i < scores.length; i++) {
      if (typeof scores[i] !== 'number' || isNaN(scores[i])) {
        throw new Error('成績必須是數字');
      }
      if (scores[i] < 0 || scores[i] > 100) {
        throw new Error('成績必須在 0-100 之間');
      }
    }
    
    // 計算平均分數
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
      sum += scores[i];
    }
    var average = sum / scores.length;
    
    // 判定等級
    var grade;
    if (average >= 90) {
      grade = '優秀';
    } else if (average >= 80) {
      grade = '良好';
    } else if (average >= 70) {
      grade = '普通';
    } else if (average >= 60) {
      grade = '及格';
    } else {
      grade = '不及格';
    }
    
    // 回傳結果
    return {
      success: true,
      name: name,
      average: Math.round(average * 100) / 100,  // 四捨五入到小數點後兩位
      grade: grade
    };
    
  } catch (error) {
    Logger.log('處理成績錯誤: ' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 測試函式
function testProcessStudentGrade() {
  Logger.log('=== 練習 2: 學生成績處理系統 - 解答 ===');
  
  var result1 = processStudentGrade('王小明', [85, 90, 88]);
  Logger.log('測試 1: ' + JSON.stringify(result1));
  
  var result2 = processStudentGrade('', [85, 90]);
  Logger.log('測試 2: ' + JSON.stringify(result2));
  
  var result3 = processStudentGrade('李小華', []);
  Logger.log('測試 3: ' + JSON.stringify(result3));
  
  var result4 = processStudentGrade('陳大同', [85, 105, 90]);
  Logger.log('測試 4: ' + JSON.stringify(result4));
  
  var result5 = processStudentGrade('張小美', [92, 88, 95, 90]);
  Logger.log('測試 5: ' + JSON.stringify(result5));
}


// ============================================
// 練習 3: 資料格式轉換器 - 解答
// ============================================

function parseUserData(jsonString) {
  try {
    // 驗證輸入
    if (!jsonString || jsonString.trim() === '') {
      throw new Error('JSON 字串不能為空');
    }
    
    // 嘗試解析 JSON
    var data;
    try {
      data = JSON.parse(jsonString);
    } catch (parseError) {
      throw new Error('JSON 格式不正確');
    }
    
    // 驗證必要欄位
    if (!data.name) {
      throw new Error('缺少必要欄位: name');
    }
    
    if (data.age === undefined || data.age === null) {
      throw new Error('缺少必要欄位: age');
    }
    
    // 驗證 age 型別和值
    if (typeof data.age !== 'number' || isNaN(data.age)) {
      throw new Error('年齡必須是數字');
    }
    
    if (data.age < 0) {
      throw new Error('年齡必須是正整數');
    }
    
    if (data.age !== Math.floor(data.age)) {
      throw new Error('年齡必須是整數');
    }
    
    // 回傳成功結果
    return {
      success: true,
      data: {
        name: data.name,
        age: data.age
      }
    };
    
  } catch (error) {
    Logger.log('解析資料錯誤: ' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 測試函式
function testParseUserData() {
  Logger.log('=== 練習 3: 資料格式轉換器 - 解答 ===');
  
  var test1 = parseUserData('{"name":"王小明","age":20}');
  Logger.log('測試 1: ' + JSON.stringify(test1));
  
  var test2 = parseUserData('{"name":"李小華"}');
  Logger.log('測試 2: ' + JSON.stringify(test2));
  
  var test3 = parseUserData('invalid json');
  Logger.log('測試 3: ' + JSON.stringify(test3));
  
  var test4 = parseUserData('{"name":"陳大同","age":-5}');
  Logger.log('測試 4: ' + JSON.stringify(test4));
  
  var test5 = parseUserData('{"name":"張小美","age":25}');
  Logger.log('測試 5: ' + JSON.stringify(test5));
}


// ============================================
// 練習 4: 陣列資料處理器 - 解答
// ============================================

function analyzeNumbers(arr) {
  try {
    // 驗證輸入是否為陣列
    if (!Array.isArray(arr)) {
      throw new Error('輸入必須是陣列');
    }
    
    // 驗證陣列不能為空
    if (arr.length === 0) {
      throw new Error('陣列不能為空');
    }
    
    // 過濾出有效的數字
    var validNumbers = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'number' && !isNaN(arr[i])) {
        validNumbers.push(arr[i]);
      }
    }
    
    // 檢查是否有有效數字
    if (validNumbers.length === 0) {
      throw new Error('陣列中沒有有效的數字');
    }
    
    // 計算統計資料
    var sum = 0;
    var max = validNumbers[0];
    var min = validNumbers[0];
    
    for (var i = 0; i < validNumbers.length; i++) {
      sum += validNumbers[i];
      if (validNumbers[i] > max) {
        max = validNumbers[i];
      }
      if (validNumbers[i] < min) {
        min = validNumbers[i];
      }
    }
    
    var average = sum / validNumbers.length;
    
    // 回傳結果
    return {
      success: true,
      sum: sum,
      avg: Math.round(average * 100) / 100,
      max: max,
      min: min,
      count: validNumbers.length
    };
    
  } catch (error) {
    Logger.log('分析數字錯誤: ' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 測試函式
function testAnalyzeNumbers() {
  Logger.log('=== 練習 4: 陣列資料處理器 - 解答 ===');
  
  var test1 = analyzeNumbers([10, 20, 30, 40]);
  Logger.log('測試 1: ' + JSON.stringify(test1));
  
  var test2 = analyzeNumbers([10, 'a', 20, null, 30]);
  Logger.log('測試 2: ' + JSON.stringify(test2));
  
  var test3 = analyzeNumbers([]);
  Logger.log('測試 3: ' + JSON.stringify(test3));
  
  var test4 = analyzeNumbers('not array');
  Logger.log('測試 4: ' + JSON.stringify(test4));
  
  var test5 = analyzeNumbers(['a', 'b', 'c']);
  Logger.log('測試 5: ' + JSON.stringify(test5));
}


// ============================================
// 練習 5: 試算表資料讀取器 - 解答
// ============================================

function readSheetData(sheetName, range) {
  try {
    // 驗證工作表名稱
    if (!sheetName || sheetName.trim() === '') {
      throw new Error('工作表名稱不能為空');
    }
    
    // 取得試算表
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('無法取得試算表');
    }
    
    // 取得工作表
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('找不到工作表: ' + sheetName);
    }
    
    // 讀取資料
    var data;
    if (range) {
      // 驗證範圍格式（簡單驗證）
      var rangePattern = /^[A-Z]+[0-9]+:[A-Z]+[0-9]+$/;
      if (!rangePattern.test(range)) {
        throw new Error('範圍格式不正確: ' + range);
      }
      
      try {
        data = sheet.getRange(range).getValues();
      } catch (rangeError) {
        throw new Error('無法讀取指定範圍: ' + range);
      }
    } else {
      // 讀取所有資料
      data = sheet.getDataRange().getValues();
    }
    
    // 回傳成功結果
    return {
      success: true,
      sheetName: sheetName,
      range: range || '全部',
      rowCount: data.length,
      data: data
    };
    
  } catch (error) {
    Logger.log('讀取試算表錯誤: ' + error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 測試函式
function testReadSheetData() {
  Logger.log('=== 練習 5: 試算表資料讀取器 - 解答 ===');
  
  // 測試讀取整個工作表
  var test1 = readSheetData('工作表1');
  Logger.log('測試 1: ' + JSON.stringify({
    success: test1.success,
    sheetName: test1.sheetName,
    rowCount: test1.rowCount
  }));
  
  // 測試讀取指定範圍
  var test2 = readSheetData('工作表1', 'A1:B10');
  Logger.log('測試 2: ' + JSON.stringify({
    success: test2.success,
    range: test2.range
  }));
  
  // 測試不存在的工作表
  var test3 = readSheetData('不存在的工作表');
  Logger.log('測試 3: ' + JSON.stringify(test3));
  
  // 測試錯誤的範圍格式
  var test4 = readSheetData('工作表1', 'XYZ');
  Logger.log('測試 4: ' + JSON.stringify(test4));
}


// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  testCalculate();
  Logger.log('\n');
  
  testProcessStudentGrade();
  Logger.log('\n');
  
  testParseUserData();
  Logger.log('\n');
  
  testAnalyzeNumbers();
  Logger.log('\n');
  
  // testReadSheetData();  // 需要在實際試算表中執行
  Logger.log('=== 練習 5 需要在實際的 Google Sheets 中執行 ===');
}


// ============================================
// 額外挑戰：錯誤日誌系統 - 解答
// ============================================

// 全域錯誤日誌
var errorLog = [];

/**
 * 記錄錯誤到日誌系統
 */
function logError(error, context) {
  var errorEntry = {
    timestamp: new Date(),
    message: error.message,
    type: error.name,
    context: context || '未指定',
    stack: error.stack || '無堆疊資訊'
  };
  
  errorLog.push(errorEntry);
  
  // 同時輸出到 Logger
  Logger.log('[錯誤記錄] ' + errorEntry.timestamp.toLocaleString() + 
             ' - ' + errorEntry.context + ': ' + errorEntry.message);
}

/**
 * 取得所有錯誤記錄
 */
function getErrorLog() {
  return errorLog;
}

/**
 * 清除錯誤記錄
 */
function clearErrorLog() {
  errorLog = [];
  Logger.log('錯誤日誌已清除');
}

/**
 * 顯示錯誤日誌摘要
 */
function showErrorLogSummary() {
  Logger.log('=== 錯誤日誌摘要 ===');
  Logger.log('總錯誤數: ' + errorLog.length);
  
  if (errorLog.length > 0) {
    Logger.log('\n最近 5 筆錯誤:');
    var recentErrors = errorLog.slice(-5);
    for (var i = 0; i < recentErrors.length; i++) {
      var err = recentErrors[i];
      Logger.log((i + 1) + '. [' + err.timestamp.toLocaleTimeString() + '] ' +
                 err.context + ': ' + err.message);
    }
  }
}

/**
 * 整合錯誤日誌的計算函式範例
 */
function calculateWithLogging(num1, num2, operator) {
  try {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('參數必須是數字');
    }
    
    if (operator === '/' && num2 === 0) {
      throw new Error('除數不能為零');
    }
    
    var result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num1 / num2; break;
      default: throw new Error('不支援的運算子');
    }
    
    return result;
    
  } catch (error) {
    // 記錄錯誤到日誌系統
    logError(error, 'calculateWithLogging(' + num1 + ', ' + num2 + ', "' + operator + '")');
    return null;
  }
}

// 測試錯誤日誌系統
function testErrorLogSystem() {
  Logger.log('=== 挑戰題: 錯誤日誌系統 - 解答 ===');
  
  // 清除舊的日誌
  clearErrorLog();
  
  // 執行一些會產生錯誤的操作
  calculateWithLogging(10, 0, '/');
  calculateWithLogging(10, 'a', '+');
  calculateWithLogging(10, 5, '%');
  
  // 顯示錯誤日誌摘要
  showErrorLogSummary();
  
  // 取得完整日誌
  var fullLog = getErrorLog();
  Logger.log('\n完整日誌:');
  Logger.log(JSON.stringify(fullLog, null, 2));
}


// ============================================
// 進階範例：重試機制
// ============================================

/**
 * 帶有重試機制的函式執行器
 */
function executeWithRetry(func, maxRetries, delayMs) {
  maxRetries = maxRetries || 3;
  delayMs = delayMs || 1000;
  
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      Logger.log('嘗試執行 (第 ' + attempt + ' 次)...');
      var result = func();
      Logger.log('執行成功!');
      return { success: true, result: result, attempts: attempt };
      
    } catch (error) {
      Logger.log('執行失敗: ' + error.message);
      
      if (attempt < maxRetries) {
        Logger.log('等待 ' + delayMs + 'ms 後重試...');
        Utilities.sleep(delayMs);
      } else {
        Logger.log('已達最大重試次數');
        return { success: false, error: error.message, attempts: attempt };
      }
    }
  }
}

// 測試重試機制
function testRetryMechanism() {
  Logger.log('=== 進階範例: 重試機制 ===');
  
  var attemptCount = 0;
  
  // 模擬一個會失敗兩次才成功的函式
  function unreliableFunction() {
    attemptCount++;
    if (attemptCount < 3) {
      throw new Error('模擬失敗 (嘗試 ' + attemptCount + ')');
    }
    return '成功!';
  }
  
  var result = executeWithRetry(unreliableFunction, 5, 500);
  Logger.log('最終結果: ' + JSON.stringify(result));
}
