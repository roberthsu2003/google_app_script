/**
 * 流程控制練習題
 * 
 * 共 15 題練習題，涵蓋條件判斷、迴圈、break/continue 等概念
 * 請在每個函式中完成程式碼
 * 完成後可執行 testAllExercises() 來測試你的答案
 */

// ============================================
// 條件判斷練習（第 1-5 題）
// ============================================

/**
 * 練習 1：判斷奇偶數
 * 
 * 要求：
 * - 如果 num 是偶數，返回 "偶數"
 * - 如果 num 是奇數，返回 "奇數"
 * 
 * 提示：使用 % 運算子判斷是否能被 2 整除
 */
function exercise1_isEvenOrOdd(num) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 2：判斷三個數字的大小關係
 * 
 * 要求：
 * - 返回三個數字中的最大值
 * 
 * 範例：
 * exercise2_findMax(5, 3, 8) 應返回 8
 */
function exercise2_findMax(a, b, c) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 3：計算 BMI 並判斷體重狀態
 * 
 * 要求：
 * - 計算 BMI = weight / (height * height)
 * - BMI < 18.5: 返回 "體重過輕"
 * - 18.5 <= BMI < 24: 返回 "正常範圍"
 * - 24 <= BMI < 27: 返回 "過重"
 * - BMI >= 27: 返回 "肥胖"
 * 
 * 參數：
 * @param {number} weight - 體重（公斤）
 * @param {number} height - 身高（公尺）
 */
function exercise3_calculateBMI(weight, height) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 4：判斷三角形類型
 * 
 * 要求：
 * - 先判斷三邊長是否能構成三角形（任兩邊之和大於第三邊）
 * - 如果不能構成三角形，返回 "不是三角形"
 * - 如果三邊相等，返回 "正三角形"
 * - 如果兩邊相等，返回 "等腰三角形"
 * - 如果三邊都不相等，返回 "不等邊三角形"
 */
function exercise4_triangleType(a, b, c) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 5：成績等級轉換（使用 switch-case）
 * 
 * 要求：
 * - 使用 switch-case 語法
 * - 'A' 或 'a': 返回 "優秀"
 * - 'B' 或 'b': 返回 "良好"
 * - 'C' 或 'c': 返回 "普通"
 * - 'D' 或 'd': 返回 "及格"
 * - 'F' 或 'f': 返回 "不及格"
 * - 其他: 返回 "無效等級"
 */
function exercise5_gradeToText(grade) {
  // 在此撰寫你的程式碼（使用 switch-case）
  
}

// ============================================
// for 迴圈練習（第 6-10 題）
// ============================================

/**
 * 練習 6：計算 1 到 n 之間所有偶數的總和
 * 
 * 要求：
 * - 使用 for 迴圈
 * - 只加總偶數
 * 
 * 範例：
 * exercise6_sumEvenNumbers(10) 應返回 30 (2+4+6+8+10)
 */
function exercise6_sumEvenNumbers(n) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 7：反轉字串
 * 
 * 要求：
 * - 使用 for 迴圈將字串反轉
 * - 不可使用內建的 reverse() 方法
 * 
 * 範例：
 * exercise7_reverseString("hello") 應返回 "olleh"
 */
function exercise7_reverseString(str) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 8：找出陣列中所有大於平均值的數字
 * 
 * 要求：
 * - 先計算陣列的平均值
 * - 返回所有大於平均值的數字組成的新陣列
 * 
 * 範例：
 * exercise8_aboveAverage([1, 2, 3, 4, 5]) 應返回 [4, 5]
 * （平均值是 3，大於 3 的有 4 和 5）
 */
function exercise8_aboveAverage(numbers) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 9：印出直角三角形圖案
 * 
 * 要求：
 * - 使用巢狀 for 迴圈
 * - 返回一個字串，每行用 \n 分隔
 * 
 * 範例：
 * exercise9_printTriangle(5) 應返回：
 * *
 * **
 * ***
 * ****
 * *****
 */
function exercise9_printTriangle(n) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 10：計算陣列中每個元素出現的次數
 * 
 * 要求：
 * - 返回一個物件，key 是元素，value 是出現次數
 * 
 * 範例：
 * exercise10_countOccurrences(['a', 'b', 'a', 'c', 'b', 'a'])
 * 應返回 { a: 3, b: 2, c: 1 }
 */
function exercise10_countOccurrences(arr) {
  // 在此撰寫你的程式碼
  
}

// ============================================
// while 迴圈練習（第 11-12 題）
// ============================================

/**
 * 練習 11：找出小於 n 的所有 2 的次方數
 * 
 * 要求：
 * - 使用 while 迴圈
 * - 返回一個陣列，包含所有小於 n 的 2 的次方數
 * 
 * 範例：
 * exercise11_powersOfTwo(50) 應返回 [1, 2, 4, 8, 16, 32]
 */
function exercise11_powersOfTwo(n) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 12：數字反轉
 * 
 * 要求：
 * - 使用 while 迴圈將數字的各位數反轉
 * - 不可使用字串方法
 * 
 * 範例：
 * exercise12_reverseNumber(12345) 應返回 54321
 * exercise12_reverseNumber(100) 應返回 1
 */
function exercise12_reverseNumber(num) {
  // 在此撰寫你的程式碼
  
}

// ============================================
// break 和 continue 練習（第 13-15 題）
// ============================================

/**
 * 練習 13：找出陣列中第一個負數的索引
 * 
 * 要求：
 * - 使用 for 迴圈和 break
 * - 找到第一個負數後立即返回其索引
 * - 如果沒有負數，返回 -1
 * 
 * 範例：
 * exercise13_findFirstNegative([1, 2, -3, 4, -5]) 應返回 2
 */
function exercise13_findFirstNegative(numbers) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 14：計算陣列中所有質數的總和
 * 
 * 要求：
 * - 使用 continue 跳過非質數
 * - 質數定義：大於 1 且只能被 1 和自己整除的數
 * 
 * 範例：
 * exercise14_sumPrimes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * 應返回 17 (2+3+5+7)
 */
function exercise14_sumPrimes(numbers) {
  // 在此撰寫你的程式碼
  
}

/**
 * 練習 15：移除陣列中的重複元素
 * 
 * 要求：
 * - 返回一個新陣列，不包含重複的元素
 * - 保持原始順序（保留第一次出現的元素）
 * - 使用 continue 跳過已經出現過的元素
 * 
 * 範例：
 * exercise15_removeDuplicates([1, 2, 2, 3, 4, 3, 5])
 * 應返回 [1, 2, 3, 4, 5]
 */
function exercise15_removeDuplicates(arr) {
  // 在此撰寫你的程式碼
  
}

// ============================================
// 測試函式
// ============================================

/**
 * 測試所有練習題
 * 執行此函式來檢查你的答案
 */
function testAllExercises() {
  Logger.log('=== 測試練習 1：判斷奇偶數 ===');
  Logger.log('exercise1_isEvenOrOdd(4) = ' + exercise1_isEvenOrOdd(4) + ' (應為: 偶數)');
  Logger.log('exercise1_isEvenOrOdd(7) = ' + exercise1_isEvenOrOdd(7) + ' (應為: 奇數)');
  
  Logger.log('\n=== 測試練習 2：找出最大值 ===');
  Logger.log('exercise2_findMax(5, 3, 8) = ' + exercise2_findMax(5, 3, 8) + ' (應為: 8)');
  Logger.log('exercise2_findMax(10, 15, 12) = ' + exercise2_findMax(10, 15, 12) + ' (應為: 15)');
  
  Logger.log('\n=== 測試練習 3：計算 BMI ===');
  Logger.log('exercise3_calculateBMI(70, 1.75) = ' + exercise3_calculateBMI(70, 1.75) + ' (應為: 正常範圍)');
  Logger.log('exercise3_calculateBMI(50, 1.75) = ' + exercise3_calculateBMI(50, 1.75) + ' (應為: 體重過輕)');
  
  Logger.log('\n=== 測試練習 4：判斷三角形類型 ===');
  Logger.log('exercise4_triangleType(3, 3, 3) = ' + exercise4_triangleType(3, 3, 3) + ' (應為: 正三角形)');
  Logger.log('exercise4_triangleType(3, 3, 5) = ' + exercise4_triangleType(3, 3, 5) + ' (應為: 等腰三角形)');
  Logger.log('exercise4_triangleType(3, 4, 5) = ' + exercise4_triangleType(3, 4, 5) + ' (應為: 不等邊三角形)');
  Logger.log('exercise4_triangleType(1, 2, 10) = ' + exercise4_triangleType(1, 2, 10) + ' (應為: 不是三角形)');
  
  Logger.log('\n=== 測試練習 5：成績等級轉換 ===');
  Logger.log('exercise5_gradeToText("A") = ' + exercise5_gradeToText('A') + ' (應為: 優秀)');
  Logger.log('exercise5_gradeToText("c") = ' + exercise5_gradeToText('c') + ' (應為: 普通)');
  
  Logger.log('\n=== 測試練習 6：偶數總和 ===');
  Logger.log('exercise6_sumEvenNumbers(10) = ' + exercise6_sumEvenNumbers(10) + ' (應為: 30)');
  
  Logger.log('\n=== 測試練習 7：反轉字串 ===');
  Logger.log('exercise7_reverseString("hello") = ' + exercise7_reverseString('hello') + ' (應為: olleh)');
  
  Logger.log('\n=== 測試練習 8：大於平均值的數字 ===');
  Logger.log('exercise8_aboveAverage([1,2,3,4,5]) = ' + exercise8_aboveAverage([1,2,3,4,5]) + ' (應為: 4,5)');
  
  Logger.log('\n=== 測試練習 9：印出三角形 ===');
  Logger.log('exercise9_printTriangle(5) =\n' + exercise9_printTriangle(5));
  
  Logger.log('\n=== 測試練習 10：計算出現次數 ===');
  Logger.log('exercise10_countOccurrences(["a","b","a","c","b","a"]) = ' + 
              JSON.stringify(exercise10_countOccurrences(['a','b','a','c','b','a'])) + 
              ' (應為: {"a":3,"b":2,"c":1})');
  
  Logger.log('\n=== 測試練習 11：2 的次方數 ===');
  Logger.log('exercise11_powersOfTwo(50) = ' + exercise11_powersOfTwo(50) + ' (應為: 1,2,4,8,16,32)');
  
  Logger.log('\n=== 測試練習 12：數字反轉 ===');
  Logger.log('exercise12_reverseNumber(12345) = ' + exercise12_reverseNumber(12345) + ' (應為: 54321)');
  Logger.log('exercise12_reverseNumber(100) = ' + exercise12_reverseNumber(100) + ' (應為: 1)');
  
  Logger.log('\n=== 測試練習 13：找出第一個負數 ===');
  Logger.log('exercise13_findFirstNegative([1,2,-3,4,-5]) = ' + 
              exercise13_findFirstNegative([1,2,-3,4,-5]) + ' (應為: 2)');
  Logger.log('exercise13_findFirstNegative([1,2,3]) = ' + 
              exercise13_findFirstNegative([1,2,3]) + ' (應為: -1)');
  
  Logger.log('\n=== 測試練習 14：質數總和 ===');
  Logger.log('exercise14_sumPrimes([1,2,3,4,5,6,7,8,9,10]) = ' + 
              exercise14_sumPrimes([1,2,3,4,5,6,7,8,9,10]) + ' (應為: 17)');
  
  Logger.log('\n=== 測試練習 15：移除重複元素 ===');
  Logger.log('exercise15_removeDuplicates([1,2,2,3,4,3,5]) = ' + 
              exercise15_removeDuplicates([1,2,2,3,4,3,5]) + ' (應為: 1,2,3,4,5)');
}
