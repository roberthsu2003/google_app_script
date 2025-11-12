/**
 * JavaScript 運算子範例程式碼
 * 
 * 本檔案包含各種運算子的使用範例
 * ✅ 所有範例都使用 GAS 完全支援的語法
 */

// ==================== 算術運算子範例 ====================

function arithmeticOperators() {
  Logger.log('=== 算術運算子範例 ===');
  
  var a = 10;
  var b = 3;
  
  // 基本運算
  Logger.log('a = ' + a);
  Logger.log('b = ' + b);
  Logger.log('---');
  Logger.log('a + b = ' + (a + b));  // 13（加法）
  Logger.log('a - b = ' + (a - b));  // 7（減法）
  Logger.log('a * b = ' + (a * b));  // 30（乘法）
  Logger.log('a / b = ' + (a / b));  // 3.333...（除法）
  Logger.log('a % b = ' + (a % b));  // 1（取餘數）
  
  // 遞增和遞減
  Logger.log('---');
  var count = 5;
  Logger.log('count = ' + count);
  count++;
  Logger.log('count++ 後 = ' + count);  // 6
  count--;
  Logger.log('count-- 後 = ' + count);  // 5
}

// ==================== 比較運算子範例 ====================

function comparisonOperators() {
  Logger.log('=== 比較運算子範例 ===');
  
  var a = 10;
  var b = 5;
  var c = '10';
  
  Logger.log('a = ' + a + ' (數字)');
  Logger.log('b = ' + b + ' (數字)');
  Logger.log('c = "' + c + '" (字串)');
  Logger.log('---');
  
  // 大於、小於
  Logger.log('a > b = ' + (a > b));    // true
  Logger.log('a < b = ' + (a < b));    // false
  Logger.log('a >= 10 = ' + (a >= 10)); // true
  Logger.log('b <= 5 = ' + (b <= 5));   // true
  
  // 相等比較
  Logger.log('---');
  Logger.log('a == c = ' + (a == c));   // true（會轉型）
  Logger.log('a === c = ' + (a === c)); // false（嚴格比較）
  Logger.log('a != b = ' + (a != b));   // true
  Logger.log('a !== c = ' + (a !== c)); // true
}

// ==================== 邏輯運算子範例 ====================

function logicalOperators() {
  Logger.log('=== 邏輯運算子範例 ===');
  
  var age = 20;
  var hasLicense = true;
  var hasInsurance = false;
  
  Logger.log('年齡：' + age);
  Logger.log('有駕照：' + hasLicense);
  Logger.log('有保險：' + hasInsurance);
  Logger.log('---');
  
  // AND 運算子（&&）：所有條件都要成立
  var canDrive = age >= 18 && hasLicense;
  Logger.log('可以開車（年滿18且有駕照）：' + canDrive);  // true
  
  var canDriveLegally = age >= 18 && hasLicense && hasInsurance;
  Logger.log('可以合法開車（年滿18且有駕照且有保險）：' + canDriveLegally);  // false
  
  // OR 運算子（||）：至少一個條件成立
  var needsAttention = age < 18 || !hasLicense || !hasInsurance;
  Logger.log('需要注意（未成年或無駕照或無保險）：' + needsAttention);  // true
  
  // NOT 運算子（!）：反轉布林值
  var isMinor = !(age >= 18);
  Logger.log('是未成年：' + isMinor);  // false
}

// ==================== 賦值運算子範例 ====================

function assignmentOperators() {
  Logger.log('=== 賦值運算子範例 ===');
  
  var score = 80;
  Logger.log('初始分數：' + score);
  
  // 加法賦值
  score += 10;  // 等同於 score = score + 10
  Logger.log('加 10 分後：' + score);  // 90
  
  // 減法賦值
  score -= 5;   // 等同於 score = score - 5
  Logger.log('減 5 分後：' + score);   // 85
  
  // 乘法賦值
  score *= 2;   // 等同於 score = score * 2
  Logger.log('乘以 2 後：' + score);   // 170
  
  // 除法賦值
  score /= 2;   // 等同於 score = score / 2
  Logger.log('除以 2 後：' + score);   // 85
  
  // 取餘數賦值
  score %= 10;  // 等同於 score = score % 10
  Logger.log('對 10 取餘數後：' + score);  // 5
}

// ==================== 運算子優先順序範例 ====================

function operatorPrecedence() {
  Logger.log('=== 運算子優先順序範例 ===');
  
  // 先乘除後加減
  var result1 = 2 + 3 * 4;
  Logger.log('2 + 3 * 4 = ' + result1);  // 14（不是 20）
  
  // 使用括號改變優先順序
  var result2 = (2 + 3) * 4;
  Logger.log('(2 + 3) * 4 = ' + result2);  // 20
  
  // 複雜運算
  var result3 = 10 + 5 * 2 - 3;
  Logger.log('10 + 5 * 2 - 3 = ' + result3);  // 17
  
  var result4 = (10 + 5) * (2 - 3);
  Logger.log('(10 + 5) * (2 - 3) = ' + result4);  // -15
}

// ==================== 實用範例：成績計算 ====================

function gradeCalculation() {
  Logger.log('=== 成績計算範例 ===');
  
  var chinese = 85;
  var english = 90;
  var math = 88;
  
  // 計算總分和平均
  var total = chinese + english + math;
  var average = total / 3;
  
  // 判斷及格（平均 60 分以上）
  var isPassed = average >= 60;
  
  // 判斷優秀（平均 90 分以上）
  var isExcellent = average >= 90;
  
  // 判斷需要補考（任一科目低於 60 分）
  var needsRetake = chinese < 60 || english < 60 || math < 60;
  
  // 判斷全科及格（所有科目都 60 分以上）
  var allPassed = chinese >= 60 && english >= 60 && math >= 60;
  
  Logger.log('國文：' + chinese);
  Logger.log('英文：' + english);
  Logger.log('數學：' + math);
  Logger.log('總分：' + total);
  Logger.log('平均：' + average.toFixed(2));
  Logger.log('---');
  Logger.log('及格：' + isPassed);
  Logger.log('優秀：' + isExcellent);
  Logger.log('需要補考：' + needsRetake);
  Logger.log('全科及格：' + allPassed);
}

// ==================== 實用範例：折扣計算 ====================

function discountCalculation() {
  Logger.log('=== 折扣計算範例 ===');
  
  var originalPrice = 1000;
  var quantity = 3;
  
  // 計算小計
  var subtotal = originalPrice * quantity;
  
  // 折扣規則：購買 3 件以上打 9 折
  var hasDiscount = quantity >= 3;
  var discountRate = hasDiscount ? 0.9 : 1.0;
  
  // 計算最終價格
  var finalPrice = subtotal * discountRate;
  
  // 計算節省金額
  var savedAmount = subtotal - finalPrice;
  
  Logger.log('單價：$' + originalPrice);
  Logger.log('數量：' + quantity);
  Logger.log('小計：$' + subtotal);
  Logger.log('有折扣：' + hasDiscount);
  Logger.log('折扣率：' + (discountRate * 100) + '%');
  Logger.log('最終價格：$' + finalPrice);
  Logger.log('節省：$' + savedAmount);
}

// ==================== 實用範例：BMI 計算 ====================

function bmiCalculation() {
  Logger.log('=== BMI 計算範例 ===');
  
  var weight = 65;  // 公斤
  var height = 170; // 公分
  
  // 計算 BMI：體重(kg) / (身高(m) * 身高(m))
  var heightInMeters = height / 100;
  var bmi = weight / (heightInMeters * heightInMeters);
  
  // 判斷體重狀態
  var isUnderweight = bmi < 18.5;
  var isNormal = bmi >= 18.5 && bmi < 24;
  var isOverweight = bmi >= 24 && bmi < 27;
  var isObese = bmi >= 27;
  
  Logger.log('體重：' + weight + ' kg');
  Logger.log('身高：' + height + ' cm');
  Logger.log('BMI：' + bmi.toFixed(2));
  Logger.log('---');
  Logger.log('過輕：' + isUnderweight);
  Logger.log('正常：' + isNormal);
  Logger.log('過重：' + isOverweight);
  Logger.log('肥胖：' + isObese);
}

// ==================== 實用範例：時間計算 ====================

function timeCalculation() {
  Logger.log('=== 時間計算範例 ===');
  
  var totalMinutes = 125;
  
  // 計算小時和分鐘
  var hours = Math.floor(totalMinutes / 60);  // 取整數部分
  var minutes = totalMinutes % 60;             // 取餘數
  
  Logger.log('總分鐘數：' + totalMinutes);
  Logger.log('等於：' + hours + ' 小時 ' + minutes + ' 分鐘');
  
  // 計算秒數
  var totalSeconds = 3665;
  var h = Math.floor(totalSeconds / 3600);
  var m = Math.floor((totalSeconds % 3600) / 60);
  var s = totalSeconds % 60;
  
  Logger.log('---');
  Logger.log('總秒數：' + totalSeconds);
  Logger.log('等於：' + h + ' 小時 ' + m + ' 分鐘 ' + s + ' 秒');
}

// ==================== 實用範例：奇偶數判斷 ====================

function oddEvenCheck() {
  Logger.log('=== 奇偶數判斷範例 ===');
  
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  for (var i = 0; i < numbers.length; i++) {
    var num = numbers[i];
    var isEven = num % 2 === 0;  // 偶數：除以 2 餘數為 0
    var isOdd = num % 2 !== 0;   // 奇數：除以 2 餘數不為 0
    
    Logger.log(num + ' 是' + (isEven ? '偶數' : '奇數'));
  }
}

// ==================== 實用範例：年齡分組 ====================

function ageGrouping() {
  Logger.log('=== 年齡分組範例 ===');
  
  var age = 25;
  
  // 判斷年齡組別
  var isChild = age < 12;
  var isTeen = age >= 12 && age < 18;
  var isAdult = age >= 18 && age < 65;
  var isSenior = age >= 65;
  
  // 判斷票價（兒童半價、老人優惠、成人全價）
  var fullPrice = 100;
  var ticketPrice;
  
  if (isChild || isSenior) {
    ticketPrice = fullPrice * 0.5;  // 半價
  } else {
    ticketPrice = fullPrice;         // 全價
  }
  
  Logger.log('年齡：' + age);
  Logger.log('兒童（<12）：' + isChild);
  Logger.log('青少年（12-17）：' + isTeen);
  Logger.log('成人（18-64）：' + isAdult);
  Logger.log('老人（>=65）：' + isSenior);
  Logger.log('---');
  Logger.log('票價：$' + ticketPrice);
}

/**
 * 執行所有範例
 */
function runAllOperatorExamples() {
  arithmeticOperators();
  Logger.log('');
  
  comparisonOperators();
  Logger.log('');
  
  logicalOperators();
  Logger.log('');
  
  assignmentOperators();
  Logger.log('');
  
  operatorPrecedence();
  Logger.log('');
  
  gradeCalculation();
  Logger.log('');
  
  discountCalculation();
  Logger.log('');
  
  bmiCalculation();
  Logger.log('');
  
  timeCalculation();
  Logger.log('');
  
  oddEvenCheck();
  Logger.log('');
  
  ageGrouping();
}
