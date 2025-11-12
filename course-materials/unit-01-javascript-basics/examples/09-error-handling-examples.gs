/**
 * 錯誤處理範例程式碼
 * 
 * 本檔案包含各種錯誤處理的實作範例
 * 示範如何使用 try-catch-finally 處理不同類型的錯誤
 */

// ============================================
// 範例 1: 基本 try-catch 語法
// ============================================

function example1_BasicTryCatch() {
  Logger.log('=== 範例 1: 基本 try-catch ===');
  
  try {
    // 可能會發生錯誤的程式碼
    var result = 10 / 2;
    Logger.log('計算結果: ' + result);
    
    // 故意製造錯誤
    var undefinedVar;
    Logger.log(undefinedVar.length);  // 會發生錯誤
    
  } catch (error) {
    // 捕捉錯誤並處理
    Logger.log('發生錯誤!');
    Logger.log('錯誤類型: ' + error.name);
    Logger.log('錯誤訊息: ' + error.message);
  }
  
  Logger.log('程式繼續執行');
}


// ============================================
// 範例 2: try-catch-finally 完整語法
// ============================================

function example2_TryCatchFinally() {
  Logger.log('=== 範例 2: try-catch-finally ===');
  
  try {
    Logger.log('try 區塊: 開始執行');
    var data = [1, 2, 3];
    Logger.log('資料長度: ' + data.length);
    
    // 嘗試存取不存在的索引
    Logger.log('存取索引 10: ' + data[10]);  // undefined，不會拋出錯誤
    
    // 故意拋出錯誤
    throw new Error('這是一個測試錯誤');
    
  } catch (error) {
    Logger.log('catch 區塊: 捕捉到錯誤');
    Logger.log('錯誤訊息: ' + error.message);
    
  } finally {
    Logger.log('finally 區塊: 無論如何都會執行');
    Logger.log('用於清理資源或記錄');
  }
  
  Logger.log('函式執行完畢');
}


// ============================================
// 範例 3: 常見錯誤類型
// ============================================

function example3_ErrorTypes() {
  Logger.log('=== 範例 3: 常見錯誤類型 ===');
  
  // TypeError - 型別錯誤
  try {
    var num = 123;
    num.toUpperCase();  // 數字沒有 toUpperCase 方法
  } catch (error) {
    Logger.log('TypeError 範例:');
    Logger.log('  錯誤類型: ' + error.name);
    Logger.log('  錯誤訊息: ' + error.message);
  }
  
  // ReferenceError - 參考錯誤
  try {
    Logger.log(nonExistentVariable);  // 變數不存在
  } catch (error) {
    Logger.log('ReferenceError 範例:');
    Logger.log('  錯誤類型: ' + error.name);
    Logger.log('  錯誤訊息: ' + error.message);
  }
  
  // RangeError - 範圍錯誤
  try {
    var arr = new Array(-1);  // 陣列長度不能為負數
  } catch (error) {
    Logger.log('RangeError 範例:');
    Logger.log('  錯誤類型: ' + error.name);
    Logger.log('  錯誤訊息: ' + error.message);
  }
}


// ============================================
// 範例 4: 自訂錯誤與 throw
// ============================================

function example4_CustomErrors() {
  Logger.log('=== 範例 4: 自訂錯誤 ===');
  
  function validateAge(age) {
    if (typeof age !== 'number') {
      throw new Error('年齡必須是數字');
    }
    if (age < 0) {
      throw new Error('年齡不能為負數');
    }
    if (age > 150) {
      throw new Error('年齡超出合理範圍');
    }
    return true;
  }
  
  // 測試各種情況
  var testCases = [25, -5, 200, '30'];
  
  for (var i = 0; i < testCases.length; i++) {
    try {
      var age = testCases[i];
      validateAge(age);
      Logger.log('年齡 ' + age + ' 驗證通過');
    } catch (error) {
      Logger.log('年齡 ' + testCases[i] + ' 驗證失敗: ' + error.message);
    }
  }
}


// ============================================
// 範例 5: Logger.log() 除錯
// ============================================

function example5_LoggerDebugging() {
  Logger.log('=== 範例 5: Logger.log() 除錯 ===');
  
  // 記錄基本資料
  var name = '王小明';
  var age = 20;
  Logger.log('姓名: ' + name);
  Logger.log('年齡: ' + age);
  
  // 記錄陣列
  var scores = [85, 90, 88];
  Logger.log('成績陣列: ' + scores);
  Logger.log('成績陣列 (JSON): ' + JSON.stringify(scores));
  
  // 記錄物件
  var student = {
    name: '李小華',
    age: 21,
    scores: [92, 88, 95]
  };
  Logger.log('學生物件: ' + student);  // 會顯示 [object Object]
  Logger.log('學生物件 (JSON): ' + JSON.stringify(student));
  Logger.log('學生物件 (格式化): ' + JSON.stringify(student, null, 2));
  
  // 格式化輸出
  Logger.log('格式化: 姓名=%s, 年齡=%s', name, age);
}


// ============================================
// 範例 6: 實用的錯誤處理函式
// ============================================

function example6_PracticalErrorHandling() {
  Logger.log('=== 範例 6: 實用的錯誤處理 ===');
  
  // 安全的除法函式
  function safeDivide(a, b) {
    try {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('參數必須是數字');
      }
      if (b === 0) {
        throw new Error('除數不能為零');
      }
      return a / b;
    } catch (error) {
      Logger.log('除法錯誤: ' + error.message);
      return null;
    }
  }
  
  // 測試
  Logger.log('10 / 2 = ' + safeDivide(10, 2));      // 5
  Logger.log('10 / 0 = ' + safeDivide(10, 0));      // null
  Logger.log('10 / "a" = ' + safeDivide(10, 'a'));  // null
  
  
  // 安全的陣列存取
  function safeArrayAccess(arr, index) {
    try {
      if (!Array.isArray(arr)) {
        throw new Error('第一個參數必須是陣列');
      }
      if (index < 0 || index >= arr.length) {
        throw new Error('索引超出範圍: ' + index);
      }
      return arr[index];
    } catch (error) {
      Logger.log('陣列存取錯誤: ' + error.message);
      return undefined;
    }
  }
  
  // 測試
  var data = [10, 20, 30];
  Logger.log('data[1] = ' + safeArrayAccess(data, 1));   // 20
  Logger.log('data[5] = ' + safeArrayAccess(data, 5));   // undefined
  Logger.log('data[-1] = ' + safeArrayAccess(data, -1)); // undefined
}


// ============================================
// 範例 7: Email 驗證與錯誤處理
// ============================================

function example7_EmailValidation() {
  Logger.log('=== 範例 7: Email 驗證 ===');
  
  function validateEmail(email) {
    try {
      // 檢查是否為空
      if (!email || email.trim() === '') {
        throw new Error('Email 不能為空');
      }
      
      // 檢查格式
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        throw new Error('Email 格式不正確');
      }
      
      return { valid: true, message: 'Email 有效' };
      
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
  
  // 測試各種 email
  var testEmails = [
    'test@example.com',
    'invalid.email',
    '',
    'user@domain',
    'user@domain.com'
  ];
  
  for (var i = 0; i < testEmails.length; i++) {
    var result = validateEmail(testEmails[i]);
    Logger.log('Email: "' + testEmails[i] + '" - ' + result.message);
  }
}


// ============================================
// 範例 8: 試算表操作的錯誤處理
// ============================================

function example8_SpreadsheetErrorHandling() {
  Logger.log('=== 範例 8: 試算表錯誤處理 ===');
  
  function safeGetSheetData(sheetName) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) {
        throw new Error('找不到工作表: ' + sheetName);
      }
      
      var data = sheet.getDataRange().getValues();
      Logger.log('成功讀取 ' + data.length + ' 列資料');
      return data;
      
    } catch (error) {
      Logger.log('讀取試算表錯誤: ' + error.message);
      return null;
    }
  }
  
  // 測試（需要在實際的試算表中執行）
  // safeGetSheetData('工作表1');
  // safeGetSheetData('不存在的工作表');
  
  Logger.log('此範例需要在實際的試算表中執行');
}


// ============================================
// 範例 9: 巢狀錯誤處理
// ============================================

function example9_NestedErrorHandling() {
  Logger.log('=== 範例 9: 巢狀錯誤處理 ===');
  
  function processUserData(userData) {
    try {
      Logger.log('開始處理使用者資料');
      
      // 驗證資料
      try {
        if (!userData.name) {
          throw new Error('姓名為必填');
        }
        if (!userData.email) {
          throw new Error('Email 為必填');
        }
      } catch (validationError) {
        Logger.log('驗證錯誤: ' + validationError.message);
        throw new Error('資料驗證失敗');
      }
      
      // 處理資料
      Logger.log('處理使用者: ' + userData.name);
      return { success: true, message: '處理成功' };
      
    } catch (error) {
      Logger.log('處理失敗: ' + error.message);
      return { success: false, message: error.message };
    }
  }
  
  // 測試
  var user1 = { name: '王小明', email: 'wang@example.com' };
  var user2 = { name: '李小華' };  // 缺少 email
  var user3 = { email: 'chen@example.com' };  // 缺少 name
  
  Logger.log('測試 1: ' + JSON.stringify(processUserData(user1)));
  Logger.log('測試 2: ' + JSON.stringify(processUserData(user2)));
  Logger.log('測試 3: ' + JSON.stringify(processUserData(user3)));
}


// ============================================
// 範例 10: 除錯技巧 - 分段測試
// ============================================

function example10_DebuggingTechniques() {
  Logger.log('=== 範例 10: 除錯技巧 ===');
  
  function complexCalculation(numbers) {
    Logger.log('步驟 1: 開始計算');
    Logger.log('輸入資料: ' + JSON.stringify(numbers));
    
    try {
      // 步驟 1: 過濾負數
      Logger.log('步驟 2: 過濾負數');
      var positive = [];
      for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] >= 0) {
          positive.push(numbers[i]);
        }
      }
      Logger.log('過濾後: ' + JSON.stringify(positive));
      
      // 步驟 2: 計算總和
      Logger.log('步驟 3: 計算總和');
      var sum = 0;
      for (var i = 0; i < positive.length; i++) {
        sum += positive[i];
        Logger.log('  累加 ' + positive[i] + ', 目前總和: ' + sum);
      }
      
      // 步驟 3: 計算平均
      Logger.log('步驟 4: 計算平均');
      if (positive.length === 0) {
        throw new Error('沒有有效的數字');
      }
      var average = sum / positive.length;
      Logger.log('平均值: ' + average);
      
      Logger.log('步驟 5: 計算完成');
      return average;
      
    } catch (error) {
      Logger.log('計算錯誤: ' + error.message);
      return null;
    }
  }
  
  // 測試
  var testData = [10, -5, 20, 30, -10, 15];
  var result = complexCalculation(testData);
  Logger.log('最終結果: ' + result);
}


// ============================================
// 範例 11: 友善的錯誤訊息
// ============================================

function example11_UserFriendlyErrors() {
  Logger.log('=== 範例 11: 友善的錯誤訊息 ===');
  
  function getUserFriendlyMessage(error) {
    var message = error.message.toLowerCase();
    
    // 將技術性錯誤轉換為使用者友善的訊息
    if (message.indexOf('permission') !== -1) {
      return '您沒有執行此操作的權限，請聯絡管理員';
    } else if (message.indexOf('not found') !== -1) {
      return '找不到指定的資源，請確認後再試';
    } else if (message.indexOf('network') !== -1) {
      return '網路連線發生問題，請檢查網路後再試';
    } else if (message.indexOf('timeout') !== -1) {
      return '操作逾時，請稍後再試';
    } else {
      return '發生未預期的錯誤，請稍後再試或聯絡技術支援';
    }
  }
  
  // 模擬各種錯誤
  var errors = [
    new Error('Permission denied'),
    new Error('File not found'),
    new Error('Network connection failed'),
    new Error('Request timeout'),
    new Error('Unknown error occurred')
  ];
  
  for (var i = 0; i < errors.length; i++) {
    Logger.log('技術錯誤: ' + errors[i].message);
    Logger.log('使用者訊息: ' + getUserFriendlyMessage(errors[i]));
    Logger.log('---');
  }
}


// ============================================
// 範例 12: 條件式除錯
// ============================================

// 全域除錯開關
var DEBUG_MODE = true;

function debugLog(message, data) {
  if (DEBUG_MODE) {
    var timestamp = new Date().toLocaleTimeString();
    Logger.log('[DEBUG ' + timestamp + '] ' + message);
    if (data !== undefined) {
      Logger.log('[DATA] ' + JSON.stringify(data));
    }
  }
}

function example12_ConditionalDebugging() {
  Logger.log('=== 範例 12: 條件式除錯 ===');
  
  debugLog('函式開始執行');
  
  var users = [
    { name: '王小明', age: 20 },
    { name: '李小華', age: 22 },
    { name: '陳大同', age: 19 }
  ];
  
  debugLog('使用者資料', users);
  
  for (var i = 0; i < users.length; i++) {
    debugLog('處理使用者 ' + (i + 1), users[i]);
    // 處理邏輯...
  }
  
  debugLog('函式執行完成');
  
  Logger.log('提示: 將 DEBUG_MODE 設為 false 可關閉除錯訊息');
}


// ============================================
// 執行所有範例
// ============================================

function runAllExamples() {
  example1_BasicTryCatch();
  Logger.log('\n');
  
  example2_TryCatchFinally();
  Logger.log('\n');
  
  example3_ErrorTypes();
  Logger.log('\n');
  
  example4_CustomErrors();
  Logger.log('\n');
  
  example5_LoggerDebugging();
  Logger.log('\n');
  
  example6_PracticalErrorHandling();
  Logger.log('\n');
  
  example7_EmailValidation();
  Logger.log('\n');
  
  // example8_SpreadsheetErrorHandling();  // 需要在試算表中執行
  // Logger.log('\n');
  
  example9_NestedErrorHandling();
  Logger.log('\n');
  
  example10_DebuggingTechniques();
  Logger.log('\n');
  
  example11_UserFriendlyErrors();
  Logger.log('\n');
  
  example12_ConditionalDebugging();
}
