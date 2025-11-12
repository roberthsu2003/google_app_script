/**
 * 流程控制練習題解答
 * 
 * 本檔案包含所有 15 題練習題的完整解答
 * 每題都附有詳細註解說明解題思路
 */

// ============================================
// 條件判斷練習解答（第 1-5 題）
// ============================================

/**
 * 練習 1 解答：判斷奇偶數
 */
function exercise1_isEvenOrOdd(num) {
  // 使用 % 運算子判斷是否能被 2 整除
  if (num % 2 === 0) {
    return '偶數';
  } else {
    return '奇數';
  }
  
  // 也可以使用三元運算子簡化：
  // return num % 2 === 0 ? '偶數' : '奇數';
}

/**
 * 練習 2 解答：判斷三個數字的大小關係
 */
function exercise2_findMax(a, b, c) {
  // 方法 1：使用巢狀 if-else
  if (a >= b && a >= c) {
    return a;
  } else if (b >= a && b >= c) {
    return b;
  } else {
    return c;
  }
  
  // 方法 2：使用 Math.max()
  // return Math.max(a, b, c);
  
  // 方法 3：逐步比較
  // var max = a;
  // if (b > max) max = b;
  // if (c > max) max = c;
  // return max;
}

/**
 * 練習 3 解答：計算 BMI 並判斷體重狀態
 */
function exercise3_calculateBMI(weight, height) {
  // 計算 BMI
  var bmi = weight / (height * height);
  
  // 根據 BMI 值判斷體重狀態
  if (bmi < 18.5) {
    return '體重過輕';
  } else if (bmi < 24) {
    return '正常範圍';
  } else if (bmi < 27) {
    return '過重';
  } else {
    return '肥胖';
  }
}

/**
 * 練習 4 解答：判斷三角形類型
 */
function exercise4_triangleType(a, b, c) {
  // 先判斷是否能構成三角形（任兩邊之和大於第三邊）
  if (a + b <= c || a + c <= b || b + c <= a) {
    return '不是三角形';
  }
  
  // 判斷三角形類型
  if (a === b && b === c) {
    return '正三角形';
  } else if (a === b || b === c || a === c) {
    return '等腰三角形';
  } else {
    return '不等邊三角形';
  }
}

/**
 * 練習 5 解答：成績等級轉換（使用 switch-case）
 */
function exercise5_gradeToText(grade) {
  var result;
  
  // 使用 switch-case，多個 case 可以共用同一段程式碼
  switch (grade) {
    case 'A':
    case 'a':
      result = '優秀';
      break;
    case 'B':
    case 'b':
      result = '良好';
      break;
    case 'C':
    case 'c':
      result = '普通';
      break;
    case 'D':
    case 'd':
      result = '及格';
      break;
    case 'F':
    case 'f':
      result = '不及格';
      break;
    default:
      result = '無效等級';
  }
  
  return result;
}

// ============================================
// for 迴圈練習解答（第 6-10 題）
// ============================================

/**
 * 練習 6 解答：計算 1 到 n 之間所有偶數的總和
 */
function exercise6_sumEvenNumbers(n) {
  var sum = 0;
  
  // 方法 1：遍歷所有數字，只加偶數
  for (var i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  
  return sum;
  
  // 方法 2：直接從 2 開始，每次加 2（更有效率）
  // var sum = 0;
  // for (var i = 2; i <= n; i += 2) {
  //   sum += i;
  // }
  // return sum;
}

/**
 * 練習 7 解答：反轉字串
 */
function exercise7_reverseString(str) {
  var reversed = '';
  
  // 從字串的最後一個字元開始，往前遍歷
  for (var i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  
  return reversed;
  
  // 也可以從前往後，但將字元加在前面：
  // var reversed = '';
  // for (var i = 0; i < str.length; i++) {
  //   reversed = str[i] + reversed;
  // }
  // return reversed;
}

/**
 * 練習 8 解答：找出陣列中所有大於平均值的數字
 */
function exercise8_aboveAverage(numbers) {
  // 步驟 1：計算平均值
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  var average = sum / numbers.length;
  
  // 步驟 2：找出所有大於平均值的數字
  var result = [];
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > average) {
      result.push(numbers[i]);
    }
  }
  
  return result;
}

/**
 * 練習 9 解答：印出直角三角形圖案
 */
function exercise9_printTriangle(n) {
  var result = '';
  
  // 外層迴圈控制行數
  for (var i = 1; i <= n; i++) {
    // 內層迴圈控制每行的星號數量
    for (var j = 1; j <= i; j++) {
      result += '*';
    }
    // 每行結束後換行（最後一行不加換行）
    if (i < n) {
      result += '\n';
    }
  }
  
  return result;
}

/**
 * 練習 10 解答：計算陣列中每個元素出現的次數
 */
function exercise10_countOccurrences(arr) {
  var counts = {};
  
  // 遍歷陣列中的每個元素
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    
    // 如果該元素已經在物件中，次數加 1
    if (counts[element]) {
      counts[element]++;
    } else {
      // 如果是第一次出現，設定為 1
      counts[element] = 1;
    }
  }
  
  return counts;
}

// ============================================
// while 迴圈練習解答（第 11-12 題）
// ============================================

/**
 * 練習 11 解答：找出小於 n 的所有 2 的次方數
 */
function exercise11_powersOfTwo(n) {
  var result = [];
  var power = 1;
  
  // 持續將 power 乘以 2，直到大於等於 n
  while (power < n) {
    result.push(power);
    power *= 2;
  }
  
  return result;
}

/**
 * 練習 12 解答：數字反轉
 */
function exercise12_reverseNumber(num) {
  var reversed = 0;
  
  // 持續取出最後一位數，加到 reversed 中
  while (num > 0) {
    var digit = num % 10;        // 取得最後一位數
    reversed = reversed * 10 + digit;  // 將數字加到 reversed
    num = Math.floor(num / 10);  // 移除最後一位數
  }
  
  return reversed;
  
  // 解題思路：
  // 12345 -> 取出 5，reversed = 5，num = 1234
  // 1234  -> 取出 4，reversed = 54，num = 123
  // 123   -> 取出 3，reversed = 543，num = 12
  // 12    -> 取出 2，reversed = 5432，num = 1
  // 1     -> 取出 1，reversed = 54321，num = 0
}

// ============================================
// break 和 continue 練習解答（第 13-15 題）
// ============================================

/**
 * 練習 13 解答：找出陣列中第一個負數的索引
 */
function exercise13_findFirstNegative(numbers) {
  // 遍歷陣列
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      return i;  // 找到第一個負數，立即返回索引
    }
  }
  
  // 如果沒有找到負數，返回 -1
  return -1;
}

/**
 * 練習 14 解答：計算陣列中所有質數的總和
 */
function exercise14_sumPrimes(numbers) {
  var sum = 0;
  
  // 遍歷陣列中的每個數字
  for (var i = 0; i < numbers.length; i++) {
    var num = numbers[i];
    
    // 小於 2 的數字不是質數，跳過
    if (num < 2) {
      continue;
    }
    
    // 檢查是否為質數
    var isPrime = true;
    for (var j = 2; j <= Math.sqrt(num); j++) {
      if (num % j === 0) {
        isPrime = false;
        break;  // 找到因數，不是質數，跳出檢查
      }
    }
    
    // 如果是質數，加到總和
    if (isPrime) {
      sum += num;
    }
  }
  
  return sum;
}

/**
 * 練習 15 解答：移除陣列中的重複元素
 */
function exercise15_removeDuplicates(arr) {
  var result = [];
  
  // 遍歷原始陣列
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    var isDuplicate = false;
    
    // 檢查該元素是否已經在結果陣列中
    for (var j = 0; j < result.length; j++) {
      if (result[j] === element) {
        isDuplicate = true;
        break;
      }
    }
    
    // 如果是重複的，跳過
    if (isDuplicate) {
      continue;
    }
    
    // 如果不是重複的，加入結果陣列
    result.push(element);
  }
  
  return result;
  
  // 替代方法：使用物件記錄已出現的元素
  // var result = [];
  // var seen = {};
  // 
  // for (var i = 0; i < arr.length; i++) {
  //   if (seen[arr[i]]) {
  //     continue;
  //   }
  //   seen[arr[i]] = true;
  //   result.push(arr[i]);
  // }
  // 
  // return result;
}

// ============================================
// 測試函式
// ============================================

/**
 * 測試所有練習題解答
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
  Logger.log('exercise5_gradeToText("X") = ' + exercise5_gradeToText('X') + ' (應為: 無效等級)');
  
  Logger.log('\n=== 測試練習 6：偶數總和 ===');
  Logger.log('exercise6_sumEvenNumbers(10) = ' + exercise6_sumEvenNumbers(10) + ' (應為: 30)');
  Logger.log('exercise6_sumEvenNumbers(20) = ' + exercise6_sumEvenNumbers(20) + ' (應為: 110)');
  
  Logger.log('\n=== 測試練習 7：反轉字串 ===');
  Logger.log('exercise7_reverseString("hello") = ' + exercise7_reverseString('hello') + ' (應為: olleh)');
  Logger.log('exercise7_reverseString("JavaScript") = ' + exercise7_reverseString('JavaScript') + ' (應為: tpircSavaJ)');
  
  Logger.log('\n=== 測試練習 8：大於平均值的數字 ===');
  Logger.log('exercise8_aboveAverage([1,2,3,4,5]) = ' + exercise8_aboveAverage([1,2,3,4,5]) + ' (應為: 4,5)');
  Logger.log('exercise8_aboveAverage([10,20,30,40]) = ' + exercise8_aboveAverage([10,20,30,40]) + ' (應為: 30,40)');
  
  Logger.log('\n=== 測試練習 9：印出三角形 ===');
  Logger.log('exercise9_printTriangle(5) =\n' + exercise9_printTriangle(5));
  
  Logger.log('\n=== 測試練習 10：計算出現次數 ===');
  Logger.log('exercise10_countOccurrences(["a","b","a","c","b","a"]) = ' + 
              JSON.stringify(exercise10_countOccurrences(['a','b','a','c','b','a'])) + 
              ' (應為: {"a":3,"b":2,"c":1})');
  
  Logger.log('\n=== 測試練習 11：2 的次方數 ===');
  Logger.log('exercise11_powersOfTwo(50) = ' + exercise11_powersOfTwo(50) + ' (應為: 1,2,4,8,16,32)');
  Logger.log('exercise11_powersOfTwo(100) = ' + exercise11_powersOfTwo(100) + ' (應為: 1,2,4,8,16,32,64)');
  
  Logger.log('\n=== 測試練習 12：數字反轉 ===');
  Logger.log('exercise12_reverseNumber(12345) = ' + exercise12_reverseNumber(12345) + ' (應為: 54321)');
  Logger.log('exercise12_reverseNumber(100) = ' + exercise12_reverseNumber(100) + ' (應為: 1)');
  Logger.log('exercise12_reverseNumber(9876) = ' + exercise12_reverseNumber(9876) + ' (應為: 6789)');
  
  Logger.log('\n=== 測試練習 13：找出第一個負數 ===');
  Logger.log('exercise13_findFirstNegative([1,2,-3,4,-5]) = ' + 
              exercise13_findFirstNegative([1,2,-3,4,-5]) + ' (應為: 2)');
  Logger.log('exercise13_findFirstNegative([1,2,3]) = ' + 
              exercise13_findFirstNegative([1,2,3]) + ' (應為: -1)');
  Logger.log('exercise13_findFirstNegative([-1,2,3]) = ' + 
              exercise13_findFirstNegative([-1,2,3]) + ' (應為: 0)');
  
  Logger.log('\n=== 測試練習 14：質數總和 ===');
  Logger.log('exercise14_sumPrimes([1,2,3,4,5,6,7,8,9,10]) = ' + 
              exercise14_sumPrimes([1,2,3,4,5,6,7,8,9,10]) + ' (應為: 17)');
  Logger.log('exercise14_sumPrimes([11,12,13,14,15]) = ' + 
              exercise14_sumPrimes([11,12,13,14,15]) + ' (應為: 24)');
  
  Logger.log('\n=== 測試練習 15：移除重複元素 ===');
  Logger.log('exercise15_removeDuplicates([1,2,2,3,4,3,5]) = ' + 
              exercise15_removeDuplicates([1,2,2,3,4,3,5]) + ' (應為: 1,2,3,4,5)');
  Logger.log('exercise15_removeDuplicates(["a","b","a","c"]) = ' + 
              exercise15_removeDuplicates(['a','b','a','c']) + ' (應為: a,b,c)');
}

// ============================================
// 額外說明與學習重點
// ============================================

/**
 * 學習重點總結：
 * 
 * 1. 條件判斷：
 *    - 使用 if-else 處理簡單的二選一或多選一情況
 *    - 使用 switch-case 處理多個固定值的判斷
 *    - 注意條件的順序，避免邏輯錯誤
 * 
 * 2. for 迴圈：
 *    - 適合已知執行次數的情況
 *    - 可以使用巢狀迴圈處理二維問題
 *    - 注意迴圈變數的初始值、條件和遞增方式
 * 
 * 3. while 迴圈：
 *    - 適合不確定執行次數的情況
 *    - 確保迴圈條件會改變，避免無窮迴圈
 *    - do-while 保證至少執行一次
 * 
 * 4. break 和 continue：
 *    - break 用於立即跳出迴圈
 *    - continue 用於跳過本次迴圈，繼續下一次
 *    - 適當使用可以提高程式效率
 * 
 * 5. 常見模式：
 *    - 累加：使用變數累積結果
 *    - 搜尋：遍歷陣列尋找特定元素
 *    - 過濾：根據條件篩選元素
 *    - 計數：統計符合條件的元素數量
 */
