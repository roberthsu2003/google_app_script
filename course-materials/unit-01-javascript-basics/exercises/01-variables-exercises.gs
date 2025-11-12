/**
 * 變數與資料型別練習題
 * 
 * 共 10 題，涵蓋變數宣告、資料型別、運算子等基礎概念
 * 每題都包含題目說明、提示和完整解答
 */

// ==================== 練習題 1：基本變數宣告 ====================

/**
 * 題目：宣告變數並輸出
 * 
 * 要求：
 * 1. 宣告一個變數 name，值為你的名字
 * 2. 宣告一個變數 age，值為你的年齡
 * 3. 使用 Logger.log() 輸出這兩個變數
 * 
 * 提示：使用 var 宣告變數，使用 + 連接字串
 */

function exercise01() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise01_solution() {
  var name = '小明';
  var age = 16;
  
  Logger.log('我的名字是：' + name);
  Logger.log('我的年齡是：' + age);
}

// ==================== 練習題 2：計算總分 ====================

/**
 * 題目：計算三科總分
 * 
 * 要求：
 * 1. 宣告三個變數：chinese = 85, english = 90, math = 88
 * 2. 計算總分並儲存在變數 total 中
 * 3. 輸出每科分數和總分
 * 
 * 提示：使用 + 運算子計算總分
 */

function exercise02() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise02_solution() {
  var chinese = 85;
  var english = 90;
  var math = 88;
  var total = chinese + english + math;
  
  Logger.log('國文：' + chinese);
  Logger.log('英文：' + english);
  Logger.log('數學：' + math);
  Logger.log('總分：' + total);
}

// ==================== 練習題 3：計算平均分數 ====================

/**
 * 題目：計算平均分數
 * 
 * 要求：
 * 1. 使用練習題 2 的三科分數
 * 2. 計算平均分數（總分除以 3）
 * 3. 輸出平均分數，保留兩位小數
 * 
 * 提示：使用 toFixed(2) 保留兩位小數
 */

function exercise03() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise03_solution() {
  var chinese = 85;
  var english = 90;
  var math = 88;
  var total = chinese + english + math;
  var average = total / 3;
  
  Logger.log('總分：' + total);
  Logger.log('平均：' + average.toFixed(2));
}

// ==================== 練習題 4：判斷及格 ====================

/**
 * 題目：判斷是否及格
 * 
 * 要求：
 * 1. 宣告一個變數 score = 75
 * 2. 判斷分數是否大於等於 60（及格標準）
 * 3. 將結果儲存在變數 isPassed 中
 * 4. 輸出分數和是否及格
 * 
 * 提示：使用 >= 比較運算子
 */

function exercise04() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise04_solution() {
  var score = 75;
  var isPassed = score >= 60;
  
  Logger.log('分數：' + score);
  Logger.log('是否及格：' + isPassed);
}

// ==================== 練習題 5：計算折扣價格 ====================

/**
 * 題目：計算折扣後的價格
 * 
 * 要求：
 * 1. 原價 originalPrice = 1000
 * 2. 折扣率 discountRate = 0.8（8 折）
 * 3. 計算折扣後的價格
 * 4. 計算節省的金額
 * 5. 輸出原價、折扣後價格、節省金額
 * 
 * 提示：折扣後價格 = 原價 × 折扣率
 */

function exercise05() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise05_solution() {
  var originalPrice = 1000;
  var discountRate = 0.8;
  var finalPrice = originalPrice * discountRate;
  var savedAmount = originalPrice - finalPrice;
  
  Logger.log('原價：$' + originalPrice);
  Logger.log('折扣：' + (discountRate * 100) + '%');
  Logger.log('折扣後價格：$' + finalPrice);
  Logger.log('節省：$' + savedAmount);
}

// ==================== 練習題 6：溫度轉換 ====================

/**
 * 題目：攝氏轉華氏
 * 
 * 要求：
 * 1. 宣告攝氏溫度 celsius = 25
 * 2. 轉換為華氏溫度：fahrenheit = celsius × 9/5 + 32
 * 3. 輸出攝氏和華氏溫度
 * 
 * 提示：注意運算順序，先乘除後加減
 */

function exercise06() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise06_solution() {
  var celsius = 25;
  var fahrenheit = celsius * 9 / 5 + 32;
  
  Logger.log('攝氏溫度：' + celsius + '°C');
  Logger.log('華氏溫度：' + fahrenheit + '°F');
}

// ==================== 練習題 7：判斷成年 ====================

/**
 * 題目：判斷是否成年
 * 
 * 要求：
 * 1. 宣告年齡 age = 17
 * 2. 判斷是否成年（年滿 18 歲）
 * 3. 判斷是否可以投票（年滿 20 歲）
 * 4. 輸出年齡和兩個判斷結果
 * 
 * 提示：使用 >= 比較運算子
 */

function exercise07() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise07_solution() {
  var age = 17;
  var isAdult = age >= 18;
  var canVote = age >= 20;
  
  Logger.log('年齡：' + age);
  Logger.log('是否成年：' + isAdult);
  Logger.log('可以投票：' + canVote);
}

// ==================== 練習題 8：計算 BMI ====================

/**
 * 題目：計算 BMI 值
 * 
 * 要求：
 * 1. 體重 weight = 65（公斤）
 * 2. 身高 height = 170（公分）
 * 3. 計算 BMI：體重 / (身高(公尺) × 身高(公尺))
 * 4. 判斷是否正常（18.5 <= BMI < 24）
 * 5. 輸出體重、身高、BMI 和是否正常
 * 
 * 提示：先將身高轉換為公尺（除以 100）
 */

function exercise08() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise08_solution() {
  var weight = 65;
  var height = 170;
  var heightInMeters = height / 100;
  var bmi = weight / (heightInMeters * heightInMeters);
  var isNormal = bmi >= 18.5 && bmi < 24;
  
  Logger.log('體重：' + weight + ' kg');
  Logger.log('身高：' + height + ' cm');
  Logger.log('BMI：' + bmi.toFixed(2));
  Logger.log('體重正常：' + isNormal);
}

// ==================== 練習題 9：字串操作 ====================

/**
 * 題目：組合完整資訊
 * 
 * 要求：
 * 1. 姓氏 lastName = '王'
 * 2. 名字 firstName = '小明'
 * 3. 年齡 age = 16
 * 4. 學校 school = '某某高中'
 * 5. 組合成完整的自我介紹：「我是王小明，今年 16 歲，就讀於某某高中」
 * 6. 輸出自我介紹
 * 
 * 提示：使用 + 連接多個字串和變數
 */

function exercise09() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise09_solution() {
  var lastName = '王';
  var firstName = '小明';
  var age = 16;
  var school = '某某高中';
  
  var fullName = lastName + firstName;
  var introduction = '我是' + fullName + '，今年 ' + age + ' 歲，就讀於' + school;
  
  Logger.log(introduction);
}

// ==================== 練習題 10：綜合應用 ====================

/**
 * 題目：購物車計算
 * 
 * 要求：
 * 1. 商品 A：單價 50，數量 3
 * 2. 商品 B：單價 80，數量 2
 * 3. 商品 C：單價 120，數量 1
 * 4. 計算每個商品的小計
 * 5. 計算總金額
 * 6. 如果總金額超過 300，打 9 折
 * 7. 輸出每個商品的小計、總金額、折扣後金額
 * 
 * 提示：使用條件運算子或 if-else 判斷是否打折
 */

function exercise10() {
  // 在這裡寫你的程式碼
  
}

// 解答
function exercise10_solution() {
  // 商品資訊
  var priceA = 50;
  var quantityA = 3;
  var priceB = 80;
  var quantityB = 2;
  var priceC = 120;
  var quantityC = 1;
  
  // 計算小計
  var subtotalA = priceA * quantityA;
  var subtotalB = priceB * quantityB;
  var subtotalC = priceC * quantityC;
  
  // 計算總金額
  var total = subtotalA + subtotalB + subtotalC;
  
  // 判斷是否打折
  var hasDiscount = total > 300;
  var discountRate = hasDiscount ? 0.9 : 1.0;
  var finalTotal = total * discountRate;
  
  // 輸出結果
  Logger.log('商品 A 小計：$' + subtotalA);
  Logger.log('商品 B 小計：$' + subtotalB);
  Logger.log('商品 C 小計：$' + subtotalC);
  Logger.log('總金額：$' + total);
  Logger.log('有折扣：' + hasDiscount);
  if (hasDiscount) {
    Logger.log('折扣後：$' + finalTotal);
    Logger.log('節省：$' + (total - finalTotal));
  }
}

// ==================== 執行所有解答 ====================

/**
 * 執行所有練習題的解答
 * 用於檢查答案是否正確
 */
function runAllSolutions() {
  Logger.log('=== 練習題 1 ===');
  exercise01_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 2 ===');
  exercise02_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 3 ===');
  exercise03_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 4 ===');
  exercise04_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 5 ===');
  exercise05_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 6 ===');
  exercise06_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 7 ===');
  exercise07_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 8 ===');
  exercise08_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 9 ===');
  exercise09_solution();
  Logger.log('');
  
  Logger.log('=== 練習題 10 ===');
  exercise10_solution();
}

/**
 * 使用說明：
 * 
 * 1. 先嘗試自己完成每個練習題
 * 2. 在對應的 exercise 函式中寫程式碼
 * 3. 執行你的函式，查看結果
 * 4. 如果不確定答案，可以執行 _solution 函式查看解答
 * 5. 執行 runAllSolutions() 可以一次查看所有解答
 * 
 * 學習建議：
 * - 不要直接看解答，先自己思考和嘗試
 * - 如果遇到困難，先查看提示
 * - 完成後比對解答，看看有沒有更好的寫法
 * - 理解每一行程式碼的作用
 */
