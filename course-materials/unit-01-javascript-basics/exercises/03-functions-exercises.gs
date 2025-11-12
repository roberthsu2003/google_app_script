/**
 * 單元 1.4：函式練習題
 * 
 * 本檔案包含 10 個函式練習題，從基礎到進階。
 * 請在每個函式中完成指定的功能。
 * 
 * 提示：
 * - 先閱讀函式說明，了解需求
 * - 思考需要什麼參數和回傳值
 * - 完成後執行測試函式檢查結果
 * - 所有練習都使用 GAS 完全支援的語法
 */

// ============================================
// 練習題 1：計算矩形面積
// ============================================
/**
 * 練習 1：撰寫一個函式計算矩形面積
 * 
 * 要求：
 * - 函式名稱：calculateRectangleArea
 * - 參數：width（寬度）, height（高度）
 * - 回傳：矩形面積（寬 × 高）
 * 
 * 範例：
 * calculateRectangleArea(5, 10) → 50
 * calculateRectangleArea(3, 7) → 21
 */
function calculateRectangleArea(width, height) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 1
function testExercise1() {
  Logger.log('=== 測試練習 1 ===');
  Logger.log('5 × 10 = ' + calculateRectangleArea(5, 10));  // 應該是 50
  Logger.log('3 × 7 = ' + calculateRectangleArea(3, 7));    // 應該是 21
  Logger.log('8 × 8 = ' + calculateRectangleArea(8, 8));    // 應該是 64
}

// ============================================
// 練習題 2：判斷奇偶數
// ============================================
/**
 * 練習 2：撰寫一個函式判斷數字是奇數還是偶數
 * 
 * 要求：
 * - 函式名稱：isEvenNumber
 * - 參數：number（要判斷的數字）
 * - 回傳：true（偶數）或 false（奇數）
 * 
 * 範例：
 * isEvenNumber(10) → true
 * isEvenNumber(7) → false
 */
function isEvenNumber(number) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 2
function testExercise2() {
  Logger.log('=== 測試練習 2 ===');
  Logger.log('10 是偶數嗎？' + isEvenNumber(10));  // 應該是 true
  Logger.log('7 是偶數嗎？' + isEvenNumber(7));    // 應該是 false
  Logger.log('0 是偶數嗎？' + isEvenNumber(0));    // 應該是 true
}

// ============================================
// 練習題 3：找出最大值
// ============================================
/**
 * 練習 3：撰寫一個函式找出三個數字中的最大值
 * 
 * 要求：
 * - 函式名稱：findMax
 * - 參數：a, b, c（三個數字）
 * - 回傳：三個數字中的最大值
 * 
 * 範例：
 * findMax(5, 10, 3) → 10
 * findMax(15, 8, 20) → 20
 */
function findMax(a, b, c) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 3
function testExercise3() {
  Logger.log('=== 測試練習 3 ===');
  Logger.log('5, 10, 3 的最大值：' + findMax(5, 10, 3));    // 應該是 10
  Logger.log('15, 8, 20 的最大值：' + findMax(15, 8, 20));  // 應該是 20
  Logger.log('7, 7, 7 的最大值：' + findMax(7, 7, 7));      // 應該是 7
}

// ============================================
// 練習題 4：攝氏轉華氏
// ============================================
/**
 * 練習 4：撰寫一個函式將攝氏溫度轉換為華氏溫度
 * 
 * 要求：
 * - 函式名稱：celsiusToFahrenheit
 * - 參數：celsius（攝氏溫度）
 * - 回傳：華氏溫度
 * - 公式：華氏 = 攝氏 × 9/5 + 32
 * 
 * 範例：
 * celsiusToFahrenheit(0) → 32
 * celsiusToFahrenheit(100) → 212
 */
function celsiusToFahrenheit(celsius) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 4
function testExercise4() {
  Logger.log('=== 測試練習 4 ===');
  Logger.log('0°C = ' + celsiusToFahrenheit(0) + '°F');    // 應該是 32
  Logger.log('100°C = ' + celsiusToFahrenheit(100) + '°F'); // 應該是 212
  Logger.log('25°C = ' + celsiusToFahrenheit(25) + '°F');   // 應該是 77
}

// ============================================
// 練習題 5：計算折扣價格
// ============================================
/**
 * 練習 5：撰寫一個函式計算折扣後的價格
 * 
 * 要求：
 * - 函式名稱：calculateDiscount
 * - 參數：price（原價）, discount（折扣百分比，例如 20 表示 8 折）
 * - 回傳：折扣後的價格（四捨五入到整數）
 * 
 * 範例：
 * calculateDiscount(1000, 20) → 800（打 8 折）
 * calculateDiscount(500, 10) → 450（打 9 折）
 */
function calculateDiscount(price, discount) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 5
function testExercise5() {
  Logger.log('=== 測試練習 5 ===');
  Logger.log('1000 元打 8 折：' + calculateDiscount(1000, 20) + ' 元');  // 應該是 800
  Logger.log('500 元打 9 折：' + calculateDiscount(500, 10) + ' 元');    // 應該是 450
  Logger.log('1500 元打 7 折：' + calculateDiscount(1500, 30) + ' 元');  // 應該是 1050
}

// ============================================
// 練習題 6：判斷成績等級
// ============================================
/**
 * 練習 6：撰寫一個函式根據分數判斷成績等級
 * 
 * 要求：
 * - 函式名稱：getGrade
 * - 參數：score（分數，0-100）
 * - 回傳：等級字串
 *   - 90 以上：'A'
 *   - 80-89：'B'
 *   - 70-79：'C'
 *   - 60-69：'D'
 *   - 60 以下：'F'
 * 
 * 範例：
 * getGrade(95) → 'A'
 * getGrade(75) → 'C'
 */
function getGrade(score) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 6
function testExercise6() {
  Logger.log('=== 測試練習 6 ===');
  Logger.log('95 分的等級：' + getGrade(95));  // 應該是 A
  Logger.log('85 分的等級：' + getGrade(85));  // 應該是 B
  Logger.log('75 分的等級：' + getGrade(75));  // 應該是 C
  Logger.log('65 分的等級：' + getGrade(65));  // 應該是 D
  Logger.log('55 分的等級：' + getGrade(55));  // 應該是 F
}

// ============================================
// 練習題 7：計算字串長度（不含空格）
// ============================================
/**
 * 練習 7：撰寫一個函式計算字串長度（不包含空格）
 * 
 * 要求：
 * - 函式名稱：countNonSpaceCharacters
 * - 參數：text（字串）
 * - 回傳：不含空格的字元數量
 * 
 * 範例：
 * countNonSpaceCharacters('Hello World') → 10
 * countNonSpaceCharacters('Google Apps Script') → 17
 */
function countNonSpaceCharacters(text) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 7
function testExercise7() {
  Logger.log('=== 測試練習 7 ===');
  Logger.log('"Hello World" 不含空格的字元數：' + countNonSpaceCharacters('Hello World'));  // 應該是 10
  Logger.log('"Google Apps Script" 不含空格的字元數：' + countNonSpaceCharacters('Google Apps Script'));  // 應該是 17
  Logger.log('"   test   " 不含空格的字元數：' + countNonSpaceCharacters('   test   '));  // 應該是 4
}

// ============================================
// 練習題 8：判斷質數
// ============================================
/**
 * 練習 8：撰寫一個函式判斷一個數字是否為質數
 * 
 * 要求：
 * - 函式名稱：isPrime
 * - 參數：number（要判斷的數字）
 * - 回傳：true（是質數）或 false（不是質數）
 * - 提示：質數是只能被 1 和自己整除的大於 1 的自然數
 * 
 * 範例：
 * isPrime(7) → true
 * isPrime(10) → false
 */
function isPrime(number) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 8
function testExercise8() {
  Logger.log('=== 測試練習 8 ===');
  Logger.log('2 是質數嗎？' + isPrime(2));   // 應該是 true
  Logger.log('7 是質數嗎？' + isPrime(7));   // 應該是 true
  Logger.log('10 是質數嗎？' + isPrime(10)); // 應該是 false
  Logger.log('17 是質數嗎？' + isPrime(17)); // 應該是 true
  Logger.log('20 是質數嗎？' + isPrime(20)); // 應該是 false
}

// ============================================
// 練習題 9：計算陣列平均值
// ============================================
/**
 * 練習 9：撰寫一個函式計算數字陣列的平均值
 * 
 * 要求：
 * - 函式名稱：calculateAverage
 * - 參數：numbers（數字陣列）
 * - 回傳：平均值（四捨五入到小數點後兩位）
 * - 如果陣列為空，回傳 0
 * 
 * 範例：
 * calculateAverage([80, 90, 85]) → 85
 * calculateAverage([70, 80, 90, 100]) → 85
 */
function calculateAverage(numbers) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 9
function testExercise9() {
  Logger.log('=== 測試練習 9 ===');
  Logger.log('[80, 90, 85] 的平均：' + calculateAverage([80, 90, 85]));  // 應該是 85
  Logger.log('[70, 80, 90, 100] 的平均：' + calculateAverage([70, 80, 90, 100]));  // 應該是 85
  Logger.log('[95, 88, 92] 的平均：' + calculateAverage([95, 88, 92]));  // 應該是 91.67
  Logger.log('[] 的平均：' + calculateAverage([]));  // 應該是 0
}

// ============================================
// 練習題 10：產生星號三角形
// ============================================
/**
 * 練習 10：撰寫一個函式產生指定高度的星號三角形
 * 
 * 要求：
 * - 函式名稱：printTriangle
 * - 參數：height（三角形高度）
 * - 功能：使用 Logger.log() 印出星號三角形
 * - 無回傳值
 * 
 * 範例：
 * printTriangle(3) 應該印出：
 * *
 * **
 * ***
 * 
 * printTriangle(5) 應該印出：
 * *
 * **
 * ***
 * ****
 * *****
 */
function printTriangle(height) {
  // 請在此處撰寫程式碼
  
}

// 測試函式 10
function testExercise10() {
  Logger.log('=== 測試練習 10 ===');
  Logger.log('高度 3 的三角形：');
  printTriangle(3);
  Logger.log('---');
  Logger.log('高度 5 的三角形：');
  printTriangle(5);
}

// ============================================
// 執行所有測試
// ============================================
/**
 * 執行所有測試函式
 * 完成練習後，執行此函式檢查結果
 */
function runAllTests() {
  testExercise1();
  testExercise2();
  testExercise3();
  testExercise4();
  testExercise5();
  testExercise6();
  testExercise7();
  testExercise8();
  testExercise9();
  testExercise10();
}

// ============================================
// 進階挑戰題（選做）
// ============================================

/**
 * 挑戰題 1：計算費氏數列
 * 
 * 撰寫一個函式計算費氏數列的第 n 項
 * 費氏數列：0, 1, 1, 2, 3, 5, 8, 13, 21...
 * 規則：F(n) = F(n-1) + F(n-2)，F(0) = 0, F(1) = 1
 * 
 * 範例：
 * fibonacci(0) → 0
 * fibonacci(5) → 5
 * fibonacci(10) → 55
 */
function fibonacci(n) {
  // 請在此處撰寫程式碼（選做）
  
}

/**
 * 挑戰題 2：反轉字串
 * 
 * 撰寫一個函式反轉字串
 * 
 * 範例：
 * reverseString('hello') → 'olleh'
 * reverseString('Google') → 'elgooG'
 */
function reverseString(text) {
  // 請在此處撰寫程式碼（選做）
  
}

/**
 * 挑戰題 3：找出陣列中的第二大值
 * 
 * 撰寫一個函式找出數字陣列中的第二大值
 * 
 * 範例：
 * findSecondLargest([5, 10, 3, 8]) → 8
 * findSecondLargest([1, 2, 3, 4, 5]) → 4
 */
function findSecondLargest(numbers) {
  // 請在此處撰寫程式碼（選做）
  
}
