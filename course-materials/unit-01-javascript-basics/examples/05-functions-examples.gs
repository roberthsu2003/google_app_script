/**
 * 單元 1.4：函式範例程式碼
 * 
 * 本檔案包含函式的各種範例，展示：
 * 1. 傳統函式定義與呼叫
 * 2. 參數傳遞
 * 3. 回傳值
 * 4. 函式作用域
 * 5. 箭頭函式（需 V8 runtime）
 * 
 * ✅ 標記表示 GAS 完全支援
 * ⚠️ 標記表示需要啟用 V8 runtime
 */

// ============================================
// 1. 基本函式定義與呼叫（✅ GAS 完全支援）
// ============================================

/**
 * 範例 1.1：無參數、無回傳值的函式
 */
function example1_1_simpleFunction() {
  Logger.log('=== 範例 1.1：簡單函式 ===');
  
  function sayHello() {
    Logger.log('Hello, Google Apps Script!');
  }
  
  sayHello();  // 呼叫函式
  sayHello();  // 可以多次呼叫
}

/**
 * 範例 1.2：有參數的函式
 */
function example1_2_functionWithParameters() {
  Logger.log('=== 範例 1.2：有參數的函式 ===');
  
  function greetUser(name) {
    Logger.log('你好，' + name + '！');
  }
  
  greetUser('小明');
  greetUser('小華');
  greetUser('小美');
}

/**
 * 範例 1.3：多個參數的函式
 */
function example1_3_multipleParameters() {
  Logger.log('=== 範例 1.3：多個參數 ===');
  
  function introduce(name, age, city) {
    Logger.log('姓名：' + name);
    Logger.log('年齡：' + age);
    Logger.log('城市：' + city);
    Logger.log('---');
  }
  
  introduce('小明', 20, '台北');
  introduce('小華', 22, '台中');
}

// ============================================
// 2. 回傳值（✅ GAS 完全支援）
// ============================================

/**
 * 範例 2.1：回傳計算結果
 */
function example2_1_returnValue() {
  Logger.log('=== 範例 2.1：回傳值 ===');
  
  function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  var sum = add(5, 3);
  var product = multiply(4, 6);
  
  Logger.log('5 + 3 = ' + sum);
  Logger.log('4 × 6 = ' + product);
  
  // 可以直接在運算式中使用
  Logger.log('(5 + 3) × (4 + 2) = ' + multiply(add(5, 3), add(4, 2)));
}

/**
 * 範例 2.2：回傳布林值
 */
function example2_2_returnBoolean() {
  Logger.log('=== 範例 2.2：回傳布林值 ===');
  
  function isAdult(age) {
    return age >= 18;
  }
  
  function isEven(number) {
    return number % 2 === 0;
  }
  
  Logger.log('20歲是成年人嗎？' + isAdult(20));
  Logger.log('15歲是成年人嗎？' + isAdult(15));
  Logger.log('10是偶數嗎？' + isEven(10));
  Logger.log('7是偶數嗎？' + isEven(7));
}

/**
 * 範例 2.3：回傳物件
 */
function example2_3_returnObject() {
  Logger.log('=== 範例 2.3：回傳物件 ===');
  
  function getStudentInfo(name, score) {
    return {
      name: name,
      score: score,
      passed: score >= 60,
      grade: getGrade(score)
    };
  }
  
  function getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
  
  var student1 = getStudentInfo('小明', 85);
  var student2 = getStudentInfo('小華', 55);
  
  Logger.log(student1.name + '：' + student1.score + '分，等級' + student1.grade + '，' + (student1.passed ? '及格' : '不及格'));
  Logger.log(student2.name + '：' + student2.score + '分，等級' + student2.grade + '，' + (student2.passed ? '及格' : '不及格'));
}

/**
 * 範例 2.4：提前結束函式
 */
function example2_4_earlyReturn() {
  Logger.log('=== 範例 2.4：提前結束函式 ===');
  
  function divide(a, b) {
    if (b === 0) {
      Logger.log('錯誤：除數不能為 0');
      return;  // 提前結束
    }
    return a / b;
  }
  
  Logger.log('10 ÷ 2 = ' + divide(10, 2));
  Logger.log('10 ÷ 0 = ' + divide(10, 0));
  Logger.log('20 ÷ 4 = ' + divide(20, 4));
}

// ============================================
// 3. 參數處理（✅ GAS 完全支援）
// ============================================

/**
 * 範例 3.1：預設參數值
 */
function example3_1_defaultParameters() {
  Logger.log('=== 範例 3.1：預設參數值 ===');
  
  function greet(name, greeting) {
    // 如果 greeting 未提供，使用預設值
    if (greeting === undefined) {
      greeting = '你好';
    }
    Logger.log(greeting + '，' + name + '！');
  }
  
  greet('小明', '早安');
  greet('小華', '午安');
  greet('小美');  // 使用預設值
}

/**
 * 範例 3.2：參數數量不固定 - arguments 物件
 */
function example3_2_variableArguments() {
  Logger.log('=== 範例 3.2：不定數量參數 ===');
  
  function sumAll() {
    var total = 0;
    Logger.log('參數數量：' + arguments.length);
    
    for (var i = 0; i < arguments.length; i++) {
      total += arguments[i];
      Logger.log('  參數 ' + (i + 1) + '：' + arguments[i]);
    }
    
    return total;
  }
  
  Logger.log('總和：' + sumAll(1, 2, 3));
  Logger.log('---');
  Logger.log('總和：' + sumAll(5, 10, 15, 20, 25));
}

/**
 * 範例 3.3：參數驗證
 */
function example3_3_parameterValidation() {
  Logger.log('=== 範例 3.3：參數驗證 ===');
  
  function calculateAverage(scores) {
    // 驗證參數
    if (!scores || scores.length === 0) {
      Logger.log('錯誤：成績陣列不能為空');
      return 0;
    }
    
    var sum = 0;
    for (var i = 0; i < scores.length; i++) {
      sum += scores[i];
    }
    
    return sum / scores.length;
  }
  
  Logger.log('平均：' + calculateAverage([80, 90, 85]));
  Logger.log('平均：' + calculateAverage([]));
  Logger.log('平均：' + calculateAverage(null));
}

// ============================================
// 4. 函式作用域（✅ GAS 完全支援）
// ============================================

/**
 * 範例 4.1：全域變數 vs 區域變數
 */
var globalCounter = 0;  // 全域變數

function example4_1_scope() {
  Logger.log('=== 範例 4.1：變數作用域 ===');
  
  function incrementGlobal() {
    globalCounter++;  // 可以存取全域變數
    Logger.log('全域計數器：' + globalCounter);
  }
  
  function useLocalVariable() {
    var localCounter = 0;  // 區域變數
    localCounter++;
    Logger.log('區域計數器：' + localCounter);
  }
  
  incrementGlobal();  // 1
  incrementGlobal();  // 2
  incrementGlobal();  // 3
  
  useLocalVariable();  // 1
  useLocalVariable();  // 1（每次都重新宣告）
  useLocalVariable();  // 1
}

/**
 * 範例 4.2：變數遮蔽
 */
function example4_2_variableShadowing() {
  Logger.log('=== 範例 4.2：變數遮蔽 ===');
  
  var name = '全域小明';
  
  function showName() {
    var name = '區域小華';  // 遮蔽全域變數
    Logger.log('函式內：' + name);
  }
  
  Logger.log('函式外：' + name);
  showName();
  Logger.log('函式外：' + name);
}

/**
 * 範例 4.3：巢狀函式
 */
function example4_3_nestedFunctions() {
  Logger.log('=== 範例 4.3：巢狀函式 ===');
  
  function outer(x) {
    Logger.log('外層函式，x = ' + x);
    
    function inner(y) {
      Logger.log('內層函式，y = ' + y);
      Logger.log('可以存取外層的 x：' + x);
      Logger.log('x + y = ' + (x + y));
    }
    
    inner(5);
  }
  
  outer(10);
}

// ============================================
// 5. 實用函式範例（✅ GAS 完全支援）
// ============================================

/**
 * 範例 5.1：判斷閏年
 */
function example5_1_leapYear() {
  Logger.log('=== 範例 5.1：判斷閏年 ===');
  
  function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
  }
  
  var years = [2020, 2021, 2024, 2100, 2400];
  for (var i = 0; i < years.length; i++) {
    var year = years[i];
    Logger.log(year + '年' + (isLeapYear(year) ? '是' : '不是') + '閏年');
  }
}

/**
 * 範例 5.2：計算階乘
 */
function example5_2_factorial() {
  Logger.log('=== 範例 5.2：計算階乘 ===');
  
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // 遞迴呼叫
  }
  
  for (var i = 1; i <= 6; i++) {
    Logger.log(i + '! = ' + factorial(i));
  }
}

/**
 * 範例 5.3：驗證 Email
 */
function example5_3_validateEmail() {
  Logger.log('=== 範例 5.3：驗證 Email ===');
  
  function isValidEmail(email) {
    if (!email) return false;
    
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  
  var emails = [
    'test@example.com',
    'user.name@domain.co.tw',
    'invalid-email',
    'missing@domain',
    '@nodomain.com'
  ];
  
  for (var i = 0; i < emails.length; i++) {
    var email = emails[i];
    Logger.log(email + ' → ' + (isValidEmail(email) ? '有效' : '無效'));
  }
}

/**
 * 範例 5.4：格式化數字（加千分位）
 */
function example5_4_formatNumber() {
  Logger.log('=== 範例 5.4：格式化數字 ===');
  
  function formatWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  var numbers = [1000, 50000, 1234567, 999];
  for (var i = 0; i < numbers.length; i++) {
    Logger.log(numbers[i] + ' → ' + formatWithCommas(numbers[i]));
  }
}

/**
 * 範例 5.5：計算兩個日期之間的天數
 */
function example5_5_daysBetween() {
  Logger.log('=== 範例 5.5：計算日期差 ===');
  
  function daysBetween(date1, date2) {
    var oneDay = 24 * 60 * 60 * 1000;  // 一天的毫秒數
    var diffMs = Math.abs(date2 - date1);
    return Math.round(diffMs / oneDay);
  }
  
  var today = new Date();
  var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  var lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  Logger.log('今天到下週：' + daysBetween(today, nextWeek) + ' 天');
  Logger.log('上個月到今天：' + daysBetween(lastMonth, today) + ' 天');
}

// ============================================
// 6. 箭頭函式範例（⚠️ 需 V8 Runtime）
// ============================================

/**
 * 範例 6.1：箭頭函式基本語法
 * ⚠️ 此範例需要啟用 V8 runtime 才能執行
 * 
 * 如何啟用 V8 runtime：
 * 1. 點選左側「專案設定」（齒輪圖示）
 * 2. 勾選「啟用 Chrome V8 runtime」
 * 3. 儲存設定
 */
function example6_1_arrowFunctions() {
  Logger.log('=== 範例 6.1：箭頭函式（需 V8 runtime）===');
  
  // 傳統函式寫法（✅ GAS 完全支援）
  var addTraditional = function(a, b) {
    return a + b;
  };
  
  // 箭頭函式寫法（⚠️ 需 V8 runtime）
  // var addArrow = (a, b) => a + b;
  
  Logger.log('傳統函式：5 + 3 = ' + addTraditional(5, 3));
  // Logger.log('箭頭函式：5 + 3 = ' + addArrow(5, 3));
  
  Logger.log('⚠️ 箭頭函式範例已註解，需啟用 V8 runtime 後才能使用');
}

/**
 * 範例 6.2：箭頭函式在陣列方法中的應用
 * ⚠️ 此範例需要啟用 V8 runtime 才能執行
 */
function example6_2_arrowFunctionsWithArrays() {
  Logger.log('=== 範例 6.2：箭頭函式與陣列（需 V8 runtime）===');
  
  var numbers = [1, 2, 3, 4, 5];
  
  // 傳統寫法（✅ GAS 完全支援）
  var doubledTraditional = numbers.map(function(n) {
    return n * 2;
  });
  
  // 箭頭函式寫法（⚠️ 需 V8 runtime）
  // var doubledArrow = numbers.map(n => n * 2);
  
  Logger.log('傳統寫法：' + doubledTraditional);
  // Logger.log('箭頭函式：' + doubledArrow);
  
  Logger.log('⚠️ 箭頭函式範例已註解，需啟用 V8 runtime 後才能使用');
}

// ============================================
// 執行所有範例
// ============================================

/**
 * 執行所有範例函式
 */
function runAllExamples() {
  // 基本函式
  example1_1_simpleFunction();
  example1_2_functionWithParameters();
  example1_3_multipleParameters();
  
  // 回傳值
  example2_1_returnValue();
  example2_2_returnBoolean();
  example2_3_returnObject();
  example2_4_earlyReturn();
  
  // 參數處理
  example3_1_defaultParameters();
  example3_2_variableArguments();
  example3_3_parameterValidation();
  
  // 作用域
  example4_1_scope();
  example4_2_variableShadowing();
  example4_3_nestedFunctions();
  
  // 實用範例
  example5_1_leapYear();
  example5_2_factorial();
  example5_3_validateEmail();
  example5_4_formatNumber();
  example5_5_daysBetween();
  
  // 箭頭函式（需 V8 runtime）
  example6_1_arrowFunctions();
  example6_2_arrowFunctionsWithArrays();
}
