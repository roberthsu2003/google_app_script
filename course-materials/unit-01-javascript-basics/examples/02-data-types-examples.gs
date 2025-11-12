/**
 * JavaScript 資料型別範例程式碼
 * 
 * 本檔案包含各種資料型別的使用範例
 * ✅ 所有範例都使用 GAS 完全支援的語法
 */

// ==================== 字串（String）範例 ====================

function stringExamples() {
  Logger.log('=== 字串範例 ===');
  
  // 宣告字串
  var name = '王小明';
  var school = "某某高中";
  var grade = '高一';
  
  Logger.log('姓名：' + name);
  Logger.log('學校：' + school);
  Logger.log('年級：' + grade);
  
  // 字串連接
  var fullInfo = name + ' 就讀於 ' + school + grade;
  Logger.log(fullInfo);
  
  // 字串長度
  Logger.log('姓名長度：' + name.length);
  
  // 字串方法
  var text = 'Hello World';
  Logger.log('原始文字：' + text);
  Logger.log('轉大寫：' + text.toUpperCase());
  Logger.log('轉小寫：' + text.toLowerCase());
  Logger.log('第一個字元：' + text.charAt(0));
}

// ==================== 數字（Number）範例 ====================

function numberExamples() {
  Logger.log('=== 數字範例 ===');
  
  // 整數
  var age = 16;
  var studentCount = 30;
  
  // 小數
  var height = 165.5;
  var weight = 55.3;
  var bmi = weight / ((height / 100) * (height / 100));
  
  Logger.log('年齡：' + age);
  Logger.log('學生人數：' + studentCount);
  Logger.log('身高：' + height + ' cm');
  Logger.log('體重：' + weight + ' kg');
  Logger.log('BMI：' + bmi.toFixed(2));  // 保留兩位小數
  
  // 負數
  var temperature = -5;
  Logger.log('溫度：' + temperature + '°C');
}

// ==================== 布林值（Boolean）範例 ====================

function booleanExamples() {
  Logger.log('=== 布林值範例 ===');
  
  var isStudent = true;
  var hasGraduated = false;
  
  Logger.log('是學生：' + isStudent);
  Logger.log('已畢業：' + hasGraduated);
  
  // 比較運算產生布林值
  var age = 16;
  var isAdult = age >= 18;
  var isMinor = age < 18;
  
  Logger.log('年齡：' + age);
  Logger.log('是成年人：' + isAdult);
  Logger.log('是未成年：' + isMinor);
  
  // 成績判斷
  var score = 85;
  var isPassed = score >= 60;
  var isExcellent = score >= 90;
  
  Logger.log('分數：' + score);
  Logger.log('及格：' + isPassed);
  Logger.log('優秀：' + isExcellent);
}

// ==================== Null 和 Undefined 範例 ====================

function nullAndUndefinedExamples() {
  Logger.log('=== Null 和 Undefined 範例 ===');
  
  // Undefined：變數已宣告但未賦值
  var notAssigned;
  Logger.log('未賦值的變數：' + notAssigned);  // undefined
  Logger.log('型別：' + typeof notAssigned);    // 'undefined'
  
  // Null：明確表示「沒有值」
  var emptyValue = null;
  Logger.log('空值：' + emptyValue);            // null
  Logger.log('型別：' + typeof emptyValue);     // 'object'（JavaScript 的歷史 bug）
  
  // 實際應用：搜尋結果
  var searchResult = null;  // 表示「沒有找到」
  if (searchResult === null) {
    Logger.log('查無資料');
  }
}

// ==================== 型別檢查範例 ====================

function typeCheckExamples() {
  Logger.log('=== 型別檢查範例 ===');
  
  var name = '小明';
  var age = 20;
  var isStudent = true;
  var nothing = null;
  var notDefined;
  
  Logger.log('name 的型別：' + typeof name);           // 'string'
  Logger.log('age 的型別：' + typeof age);             // 'number'
  Logger.log('isStudent 的型別：' + typeof isStudent); // 'boolean'
  Logger.log('nothing 的型別：' + typeof nothing);     // 'object'
  Logger.log('notDefined 的型別：' + typeof notDefined); // 'undefined'
}

// ==================== 型別轉換範例 ====================

function typeConversionExamples() {
  Logger.log('=== 型別轉換範例 ===');
  
  // 字串轉數字
  var strNum = '123';
  var num1 = Number(strNum);
  var num2 = parseInt(strNum);
  var num3 = parseFloat('3.14');
  
  Logger.log('字串 "123" 轉數字：' + num1);
  Logger.log('使用 parseInt：' + num2);
  Logger.log('使用 parseFloat：' + num3);
  
  // 數字轉字串
  var number = 456;
  var str1 = String(number);
  var str2 = number.toString();
  
  Logger.log('數字 456 轉字串：' + str1);
  Logger.log('使用 toString：' + str2);
  
  // 自動型別轉換
  var result1 = '5' + 3;    // '53'（數字轉字串）
  var result2 = '5' - 3;    // 2（字串轉數字）
  var result3 = '5' * '2';  // 10（字串轉數字）
  
  Logger.log('"5" + 3 = ' + result1);
  Logger.log('"5" - 3 = ' + result2);
  Logger.log('"5" * "2" = ' + result3);
}

// ==================== 實用範例：學生資料 ====================

function studentDataExample() {
  Logger.log('=== 學生資料範例 ===');
  
  // 學生基本資料
  var studentId = 'S20240001';
  var studentName = '王小明';
  var age = 16;
  var grade = '高一';
  var isActive = true;
  
  // 成績資料
  var chineseScore = 85;
  var englishScore = 90;
  var mathScore = 88;
  
  // 計算總分和平均
  var totalScore = chineseScore + englishScore + mathScore;
  var averageScore = totalScore / 3;
  
  // 判斷是否及格（平均 60 分以上）
  var isPassed = averageScore >= 60;
  
  // 判斷等級
  var grade_level;
  if (averageScore >= 90) {
    grade_level = '優';
  } else if (averageScore >= 80) {
    grade_level = '良';
  } else if (averageScore >= 70) {
    grade_level = '可';
  } else if (averageScore >= 60) {
    grade_level = '尚可';
  } else {
    grade_level = '待加強';
  }
  
  // 輸出結果
  Logger.log('學號：' + studentId);
  Logger.log('姓名：' + studentName);
  Logger.log('年齡：' + age);
  Logger.log('年級：' + grade);
  Logger.log('在學狀態：' + (isActive ? '在學' : '休學'));
  Logger.log('---');
  Logger.log('國文：' + chineseScore);
  Logger.log('英文：' + englishScore);
  Logger.log('數學：' + mathScore);
  Logger.log('總分：' + totalScore);
  Logger.log('平均：' + averageScore.toFixed(2));
  Logger.log('是否及格：' + (isPassed ? '是' : '否'));
  Logger.log('等級：' + grade_level);
}

// ==================== 實用範例：購物計算 ====================

function shoppingCalculationExample() {
  Logger.log('=== 購物計算範例 ===');
  
  // 商品資訊
  var productName = '筆記本';
  var unitPrice = 50;
  var quantity = 3;
  
  // 計算小計
  var subtotal = unitPrice * quantity;
  
  // 折扣資訊
  var hasDiscount = true;
  var discountRate = 0.9;  // 9 折
  
  // 計算最終價格
  var finalPrice;
  if (hasDiscount) {
    finalPrice = subtotal * discountRate;
  } else {
    finalPrice = subtotal;
  }
  
  // 計算節省金額
  var savedAmount = subtotal - finalPrice;
  
  // 輸出結果
  Logger.log('商品名稱：' + productName);
  Logger.log('單價：$' + unitPrice);
  Logger.log('數量：' + quantity);
  Logger.log('小計：$' + subtotal);
  Logger.log('有折扣：' + (hasDiscount ? '是' : '否'));
  if (hasDiscount) {
    Logger.log('折扣：' + (discountRate * 100) + '%');
  }
  Logger.log('最終價格：$' + finalPrice);
  Logger.log('節省：$' + savedAmount);
}

// ==================== 實用範例：溫度轉換 ====================

function temperatureConversionExample() {
  Logger.log('=== 溫度轉換範例 ===');
  
  // 攝氏溫度
  var celsius = 25;
  
  // 轉換為華氏溫度：F = C × 9/5 + 32
  var fahrenheit = celsius * 9 / 5 + 32;
  
  // 轉換為克氏溫度：K = C + 273.15
  var kelvin = celsius + 273.15;
  
  // 輸出結果
  Logger.log('攝氏溫度：' + celsius + '°C');
  Logger.log('華氏溫度：' + fahrenheit + '°F');
  Logger.log('克氏溫度：' + kelvin + ' K');
  
  // 溫度判斷
  var isCold = celsius < 15;
  var isComfortable = celsius >= 15 && celsius <= 25;
  var isHot = celsius > 25;
  
  Logger.log('---');
  Logger.log('寒冷：' + isCold);
  Logger.log('舒適：' + isComfortable);
  Logger.log('炎熱：' + isHot);
}

/**
 * 執行所有範例
 */
function runAllExamples() {
  stringExamples();
  Logger.log('');
  
  numberExamples();
  Logger.log('');
  
  booleanExamples();
  Logger.log('');
  
  nullAndUndefinedExamples();
  Logger.log('');
  
  typeCheckExamples();
  Logger.log('');
  
  typeConversionExamples();
  Logger.log('');
  
  studentDataExample();
  Logger.log('');
  
  shoppingCalculationExample();
  Logger.log('');
  
  temperatureConversionExample();
}
