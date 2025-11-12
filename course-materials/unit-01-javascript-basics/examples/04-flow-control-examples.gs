/**
 * 流程控制範例程式碼
 * 
 * 本檔案包含各種流程控制的實用範例
 * GAS 支援狀態已標註在每個範例中
 */

// ============================================
// 1. 條件判斷範例
// ============================================

/**
 * 範例 1.1：判斷成績等級
 * GAS 支援：✅ 完全支援
 */
function getGradeLevel(score) {
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

/**
 * 範例 1.2：判斷閏年
 * GAS 支援：✅ 完全支援
 */
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * 範例 1.3：計算票價（多重條件）
 * GAS 支援：✅ 完全支援
 */
function calculateTicketPrice(age, isStudent, isWeekend) {
  var basePrice = isWeekend ? 300 : 250;
  
  if (age < 6) {
    return 0; // 6歲以下免費
  } else if (age >= 65) {
    return basePrice * 0.5; // 敬老半價
  } else if (isStudent) {
    return basePrice * 0.7; // 學生7折
  } else {
    return basePrice; // 全票
  }
}

/**
 * 範例 1.4：switch-case 判斷月份天數
 * GAS 支援：✅ 完全支援
 */
function getDaysInMonth(month, year) {
  var days;
  
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    case 2:
      days = isLeapYear(year) ? 29 : 28;
      break;
    default:
      days = 0;
  }
  
  return days;
}

/**
 * 範例 1.5：switch-case 判斷運算
 * GAS 支援：✅ 完全支援
 */
function calculate(num1, num2, operator) {
  var result;
  
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : '除數不能為零';
      break;
    default:
      result = '無效的運算子';
  }
  
  return result;
}

// ============================================
// 2. for 迴圈範例
// ============================================

/**
 * 範例 2.1：計算 1 到 n 的總和
 * GAS 支援：✅ 完全支援
 */
function sumToN(n) {
  var sum = 0;
  
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  
  return sum;
}

/**
 * 範例 2.2：計算階乘
 * GAS 支援：✅ 完全支援
 */
function factorial(n) {
  var result = 1;
  
  for (var i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
}

/**
 * 範例 2.3：印出九九乘法表
 * GAS 支援：✅ 完全支援
 */
function printMultiplicationTable() {
  for (var i = 1; i <= 9; i++) {
    var row = '';
    for (var j = 1; j <= 9; j++) {
      row += i + 'x' + j + '=' + (i * j) + '\t';
    }
    Logger.log(row);
  }
}

/**
 * 範例 2.4：反轉陣列
 * GAS 支援：✅ 完全支援
 */
function reverseArray(arr) {
  var reversed = [];
  
  for (var i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  
  return reversed;
}

/**
 * 範例 2.5：尋找陣列中的最大值和最小值
 * GAS 支援：✅ 完全支援
 */
function findMinMax(numbers) {
  if (numbers.length === 0) {
    return { min: null, max: null };
  }
  
  var min = numbers[0];
  var max = numbers[0];
  
  for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  
  return { min: min, max: max };
}

// ============================================
// 3. while 迴圈範例
// ============================================

/**
 * 範例 3.1：猜數字遊戲（模擬）
 * GAS 支援：✅ 完全支援
 */
function guessNumberSimulation(target, maxGuesses) {
  var guess = 1;
  var attempts = 0;
  
  while (guess !== target && attempts < maxGuesses) {
    guess = Math.floor(Math.random() * 100) + 1;
    attempts++;
    Logger.log('第 ' + attempts + ' 次猜測：' + guess);
  }
  
  if (guess === target) {
    Logger.log('猜中了！共猜了 ' + attempts + ' 次');
    return attempts;
  } else {
    Logger.log('超過最大猜測次數');
    return -1;
  }
}

/**
 * 範例 3.2：計算數字的位數
 * GAS 支援：✅ 完全支援
 */
function countDigits(num) {
  if (num === 0) return 1;
  
  var count = 0;
  var n = Math.abs(num);
  
  while (n > 0) {
    n = Math.floor(n / 10);
    count++;
  }
  
  return count;
}

/**
 * 範例 3.3：找出第一個大於 n 的 2 的次方數
 * GAS 支援：✅ 完全支援
 */
function nextPowerOfTwo(n) {
  var power = 1;
  
  while (power <= n) {
    power *= 2;
  }
  
  return power;
}

// ============================================
// 4. do-while 迴圈範例
// ============================================

/**
 * 範例 4.1：輸入驗證（模擬）
 * GAS 支援：✅ 完全支援
 */
function validateInput(input) {
  var attempts = 0;
  var maxAttempts = 3;
  var isValid = false;
  
  do {
    attempts++;
    // 模擬驗證邏輯
    isValid = input >= 1 && input <= 100;
    
    if (!isValid && attempts < maxAttempts) {
      Logger.log('輸入無效，請重試（' + attempts + '/' + maxAttempts + '）');
    }
  } while (!isValid && attempts < maxAttempts);
  
  return isValid;
}

/**
 * 範例 4.2：產生隨機數直到符合條件
 * GAS 支援：✅ 完全支援
 */
function generateUntilCondition(min, max, target) {
  var num;
  var count = 0;
  
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    count++;
    Logger.log('第 ' + count + ' 次產生：' + num);
  } while (num !== target && count < 100);
  
  return count < 100 ? count : -1;
}

// ============================================
// 5. break 和 continue 範例
// ============================================

/**
 * 範例 5.1：尋找第一個質數
 * GAS 支援：✅ 完全支援
 */
function findFirstPrime(start) {
  for (var num = start; num < 10000; num++) {
    var isPrime = true;
    
    if (num < 2) {
      continue;
    }
    
    for (var i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break; // 找到因數，不是質數，跳出內層迴圈
      }
    }
    
    if (isPrime) {
      return num; // 找到質數，返回結果
    }
  }
  
  return null;
}

/**
 * 範例 5.2：計算陣列中正數的總和
 * GAS 支援：✅ 完全支援
 */
function sumPositiveNumbers(numbers) {
  var sum = 0;
  
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] <= 0) {
      continue; // 跳過非正數
    }
    sum += numbers[i];
  }
  
  return sum;
}

/**
 * 範例 5.3：尋找陣列中的特定元素
 * GAS 支援：✅ 完全支援
 */
function findElement(arr, target) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // 找到後立即返回索引
    }
  }
  
  return -1; // 找不到
}

/**
 * 範例 5.4：過濾無效資料
 * GAS 支援：✅ 完全支援
 */
function filterValidScores(scores) {
  var validScores = [];
  
  for (var i = 0; i < scores.length; i++) {
    // 跳過無效分數
    if (scores[i] < 0 || scores[i] > 100) {
      Logger.log('跳過無效分數：' + scores[i]);
      continue;
    }
    
    validScores.push(scores[i]);
  }
  
  return validScores;
}

// ============================================
// 6. 綜合應用範例
// ============================================

/**
 * 範例 6.1：計算平均分數（排除最高和最低）
 * GAS 支援：✅ 完全支援
 */
function calculateAverageExcludeExtremes(scores) {
  if (scores.length <= 2) {
    return 0;
  }
  
  var min = scores[0];
  var max = scores[0];
  var sum = 0;
  
  // 找出最大值和最小值，同時計算總和
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
    
    if (scores[i] < min) {
      min = scores[i];
    }
    if (scores[i] > max) {
      max = scores[i];
    }
  }
  
  // 排除最大和最小值後計算平均
  return (sum - min - max) / (scores.length - 2);
}

/**
 * 範例 6.2：產生費氏數列
 * GAS 支援：✅ 完全支援
 */
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  var fibonacci = [0, 1];
  
  for (var i = 2; i < n; i++) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }
  
  return fibonacci;
}

/**
 * 範例 6.3：檢查字串是否為迴文
 * GAS 支援：✅ 完全支援
 */
function isPalindrome(str) {
  var cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  var len = cleanStr.length;
  
  for (var i = 0; i < len / 2; i++) {
    if (cleanStr[i] !== cleanStr[len - 1 - i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * 範例 6.4：統計字串中各字元出現次數
 * GAS 支援：✅ 完全支援
 */
function countCharacters(str) {
  var counts = {};
  
  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    
    if (counts[char]) {
      counts[char]++;
    } else {
      counts[char] = 1;
    }
  }
  
  return counts;
}

// ============================================
// 測試函式
// ============================================

/**
 * 測試所有範例
 */
function testAllExamples() {
  Logger.log('=== 測試條件判斷 ===');
  Logger.log('成績 85 的等級：' + getGradeLevel(85));
  Logger.log('2024 是閏年嗎？' + isLeapYear(2024));
  Logger.log('學生週末票價：' + calculateTicketPrice(20, true, true));
  Logger.log('2月有幾天（2024）：' + getDaysInMonth(2, 2024));
  Logger.log('10 + 5 = ' + calculate(10, 5, '+'));
  
  Logger.log('\n=== 測試 for 迴圈 ===');
  Logger.log('1到10的總和：' + sumToN(10));
  Logger.log('5的階乘：' + factorial(5));
  Logger.log('反轉陣列 [1,2,3,4,5]：' + reverseArray([1,2,3,4,5]));
  Logger.log('最大最小值：' + JSON.stringify(findMinMax([3, 7, 1, 9, 2])));
  
  Logger.log('\n=== 測試 while 迴圈 ===');
  Logger.log('12345 有幾位數：' + countDigits(12345));
  Logger.log('大於 100 的第一個 2 的次方：' + nextPowerOfTwo(100));
  
  Logger.log('\n=== 測試 break 和 continue ===');
  Logger.log('從 10 開始的第一個質數：' + findFirstPrime(10));
  Logger.log('正數總和 [1,-2,3,-4,5]：' + sumPositiveNumbers([1,-2,3,-4,5]));
  Logger.log('尋找元素 3 的位置：' + findElement([1,2,3,4,5], 3));
  
  Logger.log('\n=== 測試綜合應用 ===');
  Logger.log('平均分數（排除極值）：' + calculateAverageExcludeExtremes([85, 90, 78, 95, 88]));
  Logger.log('前 10 個費氏數：' + generateFibonacci(10));
  Logger.log('"racecar" 是迴文嗎？' + isPalindrome('racecar'));
  Logger.log('字元統計 "hello"：' + JSON.stringify(countCharacters('hello')));
}
