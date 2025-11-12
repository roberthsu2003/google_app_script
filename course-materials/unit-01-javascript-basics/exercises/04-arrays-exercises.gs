/**
 * 陣列操作練習題
 * 
 * 說明：
 * 1. 請完成以下 12 個練習題
 * 2. 每題都有詳細的說明和預期輸出
 * 3. 完成後執行對應的測試函式檢查答案
 * 4. 解答請參考 solutions/04-arrays-solutions.gs
 */

// ============================================
// 練習 1：建立與存取陣列
// ============================================

/**
 * 練習 1：建立一個包含 5 個你喜歡的水果名稱的陣列，
 * 然後回傳第 3 個水果（索引 2）
 * 
 * 預期輸出範例：'橘子'（依你的陣列內容而定）
 */
function exercise01_createAndAccessArray() {
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise01() {
  var result = exercise01_createAndAccessArray();
  Logger.log('練習 1 結果：' + result);
  Logger.log('提示：應該回傳陣列中索引 2 的元素');
}

// ============================================
// 練習 2：使用 push 和 pop
// ============================================

/**
 * 練習 2：建立一個空陣列，使用 push 新增數字 10, 20, 30，
 * 然後使用 pop 移除最後一個元素，回傳最終的陣列
 * 
 * 預期輸出：[10, 20]
 */
function exercise02_pushAndPop() {
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise02() {
  var result = exercise02_pushAndPop();
  Logger.log('練習 2 結果：' + result);
  Logger.log('預期結果：[10, 20]');
}

// ============================================
// 練習 3：陣列反轉
// ============================================

/**
 * 練習 3：給定一個陣列 [1, 2, 3, 4, 5]，
 * 回傳反轉後的陣列（不要使用 reverse() 方法，請用迴圈實作）
 * 
 * 預期輸出：[5, 4, 3, 2, 1]
 */
function exercise03_reverseArray() {
  var numbers = [1, 2, 3, 4, 5];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise03() {
  var result = exercise03_reverseArray();
  Logger.log('練習 3 結果：' + result);
  Logger.log('預期結果：[5, 4, 3, 2, 1]');
}

// ============================================
// 練習 4：計算陣列總和
// ============================================

/**
 * 練習 4：使用 forEach 計算陣列 [10, 20, 30, 40, 50] 的總和
 * 
 * 預期輸出：150
 */
function exercise04_sumWithForEach() {
  var numbers = [10, 20, 30, 40, 50];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise04() {
  var result = exercise04_sumWithForEach();
  Logger.log('練習 4 結果：' + result);
  Logger.log('預期結果：150');
}

// ============================================
// 練習 5：使用 map 轉換陣列
// ============================================

/**
 * 練習 5：給定一個陣列 [1, 2, 3, 4, 5]，
 * 使用 map 將每個數字平方，回傳新陣列
 * 
 * 預期輸出：[1, 4, 9, 16, 25]
 */
function exercise05_squareNumbers() {
  var numbers = [1, 2, 3, 4, 5];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise05() {
  var result = exercise05_squareNumbers();
  Logger.log('練習 5 結果：' + result);
  Logger.log('預期結果：[1, 4, 9, 16, 25]');
}

// ============================================
// 練習 6：使用 filter 篩選陣列
// ============================================

/**
 * 練習 6：給定一個陣列 [15, 8, 23, 42, 7, 31, 19]，
 * 使用 filter 篩選出大於 20 的數字
 * 
 * 預期輸出：[23, 42, 31]
 */
function exercise06_filterLargeNumbers() {
  var numbers = [15, 8, 23, 42, 7, 31, 19];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise06() {
  var result = exercise06_filterLargeNumbers();
  Logger.log('練習 6 結果：' + result);
  Logger.log('預期結果：[23, 42, 31]');
}

// ============================================
// 練習 7：使用 reduce 計算平均
// ============================================

/**
 * 練習 7：給定一個成績陣列 [85, 92, 78, 90, 88]，
 * 使用 reduce 計算平均分數（四捨五入到小數點後 2 位）
 * 
 * 預期輸出：86.6
 */
function exercise07_calculateAverage() {
  var scores = [85, 92, 78, 90, 88];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise07() {
  var result = exercise07_calculateAverage();
  Logger.log('練習 7 結果：' + result);
  Logger.log('預期結果：86.6');
}

// ============================================
// 練習 8：移除陣列中的特定元素
// ============================================

/**
 * 練習 8：給定一個陣列 ['蘋果', '香蕉', '橘子', '香蕉', '芒果']，
 * 使用 filter 移除所有的 '香蕉'，回傳新陣列
 * 
 * 預期輸出：['蘋果', '橘子', '芒果']
 */
function exercise08_removeElement() {
  var fruits = ['蘋果', '香蕉', '橘子', '香蕉', '芒果'];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise08() {
  var result = exercise08_removeElement();
  Logger.log('練習 8 結果：' + result);
  Logger.log('預期結果：[蘋果, 橘子, 芒果]');
}

// ============================================
// 練習 9：找出陣列中的最大值
// ============================================

/**
 * 練習 9：給定一個陣列 [45, 23, 67, 12, 89, 34]，
 * 使用 reduce 找出最大值
 * 
 * 預期輸出：89
 */
function exercise09_findMaximum() {
  var numbers = [45, 23, 67, 12, 89, 34];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise09() {
  var result = exercise09_findMaximum();
  Logger.log('練習 9 結果：' + result);
  Logger.log('預期結果：89');
}

// ============================================
// 練習 10：組合使用 filter 和 map
// ============================================

/**
 * 練習 10：給定一個成績陣列 [85, 55, 92, 48, 78, 90, 35, 88]，
 * 先篩選出及格的成績（>= 60），然後將這些成績都加 5 分
 * 
 * 預期輸出：[90, 97, 83, 95, 93]
 */
function exercise10_filterAndMap() {
  var scores = [85, 55, 92, 48, 78, 90, 35, 88];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise10() {
  var result = exercise10_filterAndMap();
  Logger.log('練習 10 結果：' + result);
  Logger.log('預期結果：[90, 97, 83, 95, 93]');
}

// ============================================
// 練習 11：處理二維陣列
// ============================================

/**
 * 練習 11：給定一個二維陣列（學生成績表）：
 * [
 *   ['王小明', 85, 90],
 *   ['李小華', 92, 88],
 *   ['張小美', 78, 85]
 * ]
 * 計算每位學生的平均分數，回傳一個包含姓名和平均分數的陣列
 * 
 * 預期輸出：
 * [
 *   { name: '王小明', average: 87.5 },
 *   { name: '李小華', average: 90 },
 *   { name: '張小美', average: 81.5 }
 * ]
 */
function exercise11_processStudentGrades() {
  var students = [
    ['王小明', 85, 90],
    ['李小華', 92, 88],
    ['張小美', 78, 85]
  ];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise11() {
  var result = exercise11_processStudentGrades();
  Logger.log('練習 11 結果：');
  Logger.log(JSON.stringify(result, null, 2));
}

// ============================================
// 練習 12：統計陣列元素出現次數
// ============================================

/**
 * 練習 12：給定一個陣列 ['蘋果', '香蕉', '蘋果', '橘子', '香蕉', '蘋果', '芒果']，
 * 使用 reduce 統計每種水果出現的次數，回傳一個物件
 * 
 * 預期輸出：
 * {
 *   '蘋果': 3,
 *   '香蕉': 2,
 *   '橘子': 1,
 *   '芒果': 1
 * }
 */
function exercise12_countOccurrences() {
  var fruits = ['蘋果', '香蕉', '蘋果', '橘子', '香蕉', '蘋果', '芒果'];
  // 請在此撰寫程式碼
  
}

// 測試函式
function test_exercise12() {
  var result = exercise12_countOccurrences();
  Logger.log('練習 12 結果：');
  Logger.log(JSON.stringify(result, null, 2));
}

// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  Logger.log('========================================');
  Logger.log('開始執行陣列操作練習題測試');
  Logger.log('========================================\n');
  
  test_exercise01();
  Logger.log('\n');
  
  test_exercise02();
  Logger.log('\n');
  
  test_exercise03();
  Logger.log('\n');
  
  test_exercise04();
  Logger.log('\n');
  
  test_exercise05();
  Logger.log('\n');
  
  test_exercise06();
  Logger.log('\n');
  
  test_exercise07();
  Logger.log('\n');
  
  test_exercise08();
  Logger.log('\n');
  
  test_exercise09();
  Logger.log('\n');
  
  test_exercise10();
  Logger.log('\n');
  
  test_exercise11();
  Logger.log('\n');
  
  test_exercise12();
  Logger.log('\n');
  
  Logger.log('========================================');
  Logger.log('測試完成！');
  Logger.log('========================================');
}
