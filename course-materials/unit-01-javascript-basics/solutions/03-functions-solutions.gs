/**
 * 單元 1.4：函式練習題解答
 * 
 * 本檔案包含所有函式練習題的完整解答與說明。
 */

// ============================================
// 練習題 1：計算矩形面積
// ============================================
/**
 * 解答 1：計算矩形面積
 * 
 * 解題思路：
 * - 矩形面積 = 寬 × 高
 * - 直接將兩個參數相乘並回傳
 */
function calculateRectangleArea(width, height) {
  return width * height;
}

// 測試函式 1
function testExercise1() {
  Logger.log('=== 測試練習 1 ===');
  Logger.log('5 × 10 = ' + calculateRectangleArea(5, 10));  // 50
  Logger.log('3 × 7 = ' + calculateRectangleArea(3, 7));    // 21
  Logger.log('8 × 8 = ' + calculateRectangleArea(8, 8));    // 64
}

// ============================================
// 練習題 2：判斷奇偶數
// ============================================
/**
 * 解答 2：判斷奇偶數
 * 
 * 解題思路：
 * - 偶數除以 2 的餘數為 0
 * - 使用 % 運算子取餘數
 * - 回傳布林值
 */
function isEvenNumber(number) {
  return number % 2 === 0;
}

// 測試函式 2
function testExercise2() {
  Logger.log('=== 測試練習 2 ===');
  Logger.log('10 是偶數嗎？' + isEvenNumber(10));  // true
  Logger.log('7 是偶數嗎？' + isEvenNumber(7));    // false
  Logger.log('0 是偶數嗎？' + isEvenNumber(0));    // true
}

// ============================================
// 練習題 3：找出最大值
// ============================================
/**
 * 解答 3：找出最大值
 * 
 * 解題思路：
 * - 方法 1：使用 if-else 逐一比較
 * - 方法 2：使用 Math.max() 函式
 * - 這裡示範兩種方法
 */
function findMax(a, b, c) {
  // 方法 1：使用 if-else
  var max = a;
  if (b > max) {
    max = b;
  }
  if (c > max) {
    max = c;
  }
  return max;
  
  // 方法 2：使用 Math.max()（更簡潔）
  // return Math.max(a, b, c);
}

// 測試函式 3
function testExercise3() {
  Logger.log('=== 測試練習 3 ===');
  Logger.log('5, 10, 3 的最大值：' + findMax(5, 10, 3));    // 10
  Logger.log('15, 8, 20 的最大值：' + findMax(15, 8, 20));  // 20
  Logger.log('7, 7, 7 的最大值：' + findMax(7, 7, 7));      // 7
}

// ============================================
// 練習題 4：攝氏轉華氏
// ============================================
/**
 * 解答 4：攝氏轉華氏
 * 
 * 解題思路：
 * - 使用公式：華氏 = 攝氏 × 9/5 + 32
 * - 直接套用公式計算
 */
function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

// 測試函式 4
function testExercise4() {
  Logger.log('=== 測試練習 4 ===');
  Logger.log('0°C = ' + celsiusToFahrenheit(0) + '°F');    // 32
  Logger.log('100°C = ' + celsiusToFahrenheit(100) + '°F'); // 212
  Logger.log('25°C = ' + celsiusToFahrenheit(25) + '°F');   // 77
}

// ============================================
// 練習題 5：計算折扣價格
// ============================================
/**
 * 解答 5：計算折扣價格
 * 
 * 解題思路：
 * - 折扣後價格 = 原價 × (1 - 折扣百分比/100)
 * - 例如：1000 元打 8 折 = 1000 × (1 - 20/100) = 800
 * - 使用 Math.round() 四捨五入到整數
 */
function calculateDiscount(price, discount) {
  var discountedPrice = price * (1 - discount / 100);
  return Math.round(discountedPrice);
}

// 測試函式 5
function testExercise5() {
  Logger.log('=== 測試練習 5 ===');
  Logger.log('1000 元打 8 折：' + calculateDiscount(1000, 20) + ' 元');  // 800
  Logger.log('500 元打 9 折：' + calculateDiscount(500, 10) + ' 元');    // 450
  Logger.log('1500 元打 7 折：' + calculateDiscount(1500, 30) + ' 元');  // 1050
}

// ============================================
// 練習題 6：判斷成績等級
// ============================================
/**
 * 解答 6：判斷成績等級
 * 
 * 解題思路：
 * - 使用 if-else 或 if-else if 結構
 * - 從高分到低分依序判斷
 * - 注意判斷順序很重要
 */
function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

// 測試函式 6
function testExercise6() {
  Logger.log('=== 測試練習 6 ===');
  Logger.log('95 分的等級：' + getGrade(95));  // A
  Logger.log('85 分的等級：' + getGrade(85));  // B
  Logger.log('75 分的等級：' + getGrade(75));  // C
  Logger.log('65 分的等級：' + getGrade(65));  // D
  Logger.log('55 分的等級：' + getGrade(55));  // F
}

// ============================================
// 練習題 7：計算字串長度（不含空格）
// ============================================
/**
 * 解答 7：計算字串長度（不含空格）
 * 
 * 解題思路：
 * - 方法 1：使用迴圈逐字元檢查
 * - 方法 2：使用 replace() 移除所有空格後計算長度
 * - 這裡示範兩種方法
 */
function countNonSpaceCharacters(text) {
  // 方法 1：使用迴圈
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    if (text[i] !== ' ') {
      count++;
    }
  }
  return count;
  
  // 方法 2：使用 replace()（更簡潔）
  // return text.replace(/ /g, '').length;
}

// 測試函式 7
function testExercise7() {
  Logger.log('=== 測試練習 7 ===');
  Logger.log('"Hello World" 不含空格的字元數：' + countNonSpaceCharacters('Hello World'));  // 10
  Logger.log('"Google Apps Script" 不含空格的字元數：' + countNonSpaceCharacters('Google Apps Script'));  // 17
  Logger.log('"   test   " 不含空格的字元數：' + countNonSpaceCharacters('   test   '));  // 4
}

// ============================================
// 練習題 8：判斷質數
// ============================================
/**
 * 解答 8：判斷質數
 * 
 * 解題思路：
 * - 質數定義：只能被 1 和自己整除的大於 1 的自然數
 * - 小於 2 的數字不是質數
 * - 從 2 開始檢查到 n-1，看是否有能整除的數
 * - 優化：只需檢查到 √n 即可
 */
function isPrime(number) {
  // 小於 2 的數字不是質數
  if (number < 2) {
    return false;
  }
  
  // 2 是質數
  if (number === 2) {
    return true;
  }
  
  // 偶數不是質數（除了 2）
  if (number % 2 === 0) {
    return false;
  }
  
  // 檢查是否有其他因數（只需檢查到 √n）
  for (var i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false;
    }
  }
  
  return true;
}

// 測試函式 8
function testExercise8() {
  Logger.log('=== 測試練習 8 ===');
  Logger.log('2 是質數嗎？' + isPrime(2));   // true
  Logger.log('7 是質數嗎？' + isPrime(7));   // true
  Logger.log('10 是質數嗎？' + isPrime(10)); // false
  Logger.log('17 是質數嗎？' + isPrime(17)); // true
  Logger.log('20 是質數嗎？' + isPrime(20)); // false
}

// ============================================
// 練習題 9：計算陣列平均值
// ============================================
/**
 * 解答 9：計算陣列平均值
 * 
 * 解題思路：
 * - 先檢查陣列是否為空
 * - 計算總和
 * - 總和除以數量得到平均值
 * - 使用 Math.round() 四捨五入到小數點後兩位
 */
function calculateAverage(numbers) {
  // 檢查陣列是否為空
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  
  // 計算總和
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  // 計算平均值並四捨五入到小數點後兩位
  var average = sum / numbers.length;
  return Math.round(average * 100) / 100;
}

// 測試函式 9
function testExercise9() {
  Logger.log('=== 測試練習 9 ===');
  Logger.log('[80, 90, 85] 的平均：' + calculateAverage([80, 90, 85]));  // 85
  Logger.log('[70, 80, 90, 100] 的平均：' + calculateAverage([70, 80, 90, 100]));  // 85
  Logger.log('[95, 88, 92] 的平均：' + calculateAverage([95, 88, 92]));  // 91.67
  Logger.log('[] 的平均：' + calculateAverage([]));  // 0
}

// ============================================
// 練習題 10：產生星號三角形
// ============================================
/**
 * 解答 10：產生星號三角形
 * 
 * 解題思路：
 * - 使用巢狀迴圈
 * - 外層迴圈控制行數（1 到 height）
 * - 內層迴圈產生每行的星號
 * - 使用字串累加產生星號
 */
function printTriangle(height) {
  for (var i = 1; i <= height; i++) {
    var stars = '';
    for (var j = 1; j <= i; j++) {
      stars += '*';
    }
    Logger.log(stars);
  }
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
// 進階挑戰題解答
// ============================================

/**
 * 挑戰題 1：計算費氏數列
 * 
 * 解題思路：
 * - 方法 1：使用遞迴（簡潔但效能較差）
 * - 方法 2：使用迴圈（效能較好）
 * - 這裡示範迴圈方法
 */
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  var prev = 0;
  var current = 1;
  
  for (var i = 2; i <= n; i++) {
    var next = prev + current;
    prev = current;
    current = next;
  }
  
  return current;
}

// 測試挑戰題 1
function testChallenge1() {
  Logger.log('=== 測試挑戰題 1 ===');
  for (var i = 0; i <= 10; i++) {
    Logger.log('F(' + i + ') = ' + fibonacci(i));
  }
}

/**
 * 挑戰題 2：反轉字串
 * 
 * 解題思路：
 * - 方法 1：使用迴圈從後往前讀取
 * - 方法 2：轉成陣列、反轉、再合併
 * - 這裡示範兩種方法
 */
function reverseString(text) {
  // 方法 1：使用迴圈
  var reversed = '';
  for (var i = text.length - 1; i >= 0; i--) {
    reversed += text[i];
  }
  return reversed;
  
  // 方法 2：使用陣列方法（更簡潔）
  // return text.split('').reverse().join('');
}

// 測試挑戰題 2
function testChallenge2() {
  Logger.log('=== 測試挑戰題 2 ===');
  Logger.log('hello → ' + reverseString('hello'));
  Logger.log('Google → ' + reverseString('Google'));
  Logger.log('Apps Script → ' + reverseString('Apps Script'));
}

/**
 * 挑戰題 3：找出陣列中的第二大值
 * 
 * 解題思路：
 * - 方法 1：排序後取倒數第二個
 * - 方法 2：遍歷一次找出最大和第二大
 * - 這裡示範方法 2（效能較好）
 */
function findSecondLargest(numbers) {
  if (!numbers || numbers.length < 2) {
    return null;
  }
  
  var largest = -Infinity;
  var secondLargest = -Infinity;
  
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      secondLargest = largest;
      largest = numbers[i];
    } else if (numbers[i] > secondLargest && numbers[i] < largest) {
      secondLargest = numbers[i];
    }
  }
  
  return secondLargest;
}

// 測試挑戰題 3
function testChallenge3() {
  Logger.log('=== 測試挑戰題 3 ===');
  Logger.log('[5, 10, 3, 8] 的第二大值：' + findSecondLargest([5, 10, 3, 8]));  // 8
  Logger.log('[1, 2, 3, 4, 5] 的第二大值：' + findSecondLargest([1, 2, 3, 4, 5]));  // 4
  Logger.log('[20, 15, 30, 25] 的第二大值：' + findSecondLargest([20, 15, 30, 25]));  // 25
}

// ============================================
// 執行所有挑戰題測試
// ============================================
function runAllChallengeTests() {
  testChallenge1();
  testChallenge2();
  testChallenge3();
}

// ============================================
// 學習重點總結
// ============================================
/**
 * 函式練習重點總結：
 * 
 * 1. 函式定義：使用 function 關鍵字
 * 2. 參數傳遞：可以有多個參數，未傳入的參數為 undefined
 * 3. 回傳值：使用 return 回傳結果
 * 4. 命名規範：使用有意義的名稱，動詞開頭
 * 5. 單一職責：每個函式只做一件事
 * 6. 參數驗證：檢查參數是否有效
 * 7. 錯誤處理：處理邊界情況（如空陣列、除以零）
 * 8. 程式碼重用：將重複的邏輯抽取成函式
 * 9. 可讀性：適當的註解和清晰的邏輯
 * 10. 測試：撰寫測試函式驗證功能
 * 
 * 常見錯誤：
 * - 忘記 return
 * - 參數數量不符
 * - 沒有處理邊界情況
 * - 函式名稱不清楚
 * - 函式做太多事情
 */
