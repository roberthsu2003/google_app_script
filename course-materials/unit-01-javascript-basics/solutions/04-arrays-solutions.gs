/**
 * 陣列操作練習題 - 解答
 * 
 * 本檔案包含所有練習題的完整解答與說明
 */

// ============================================
// 練習 1：建立與存取陣列
// ============================================

/**
 * 解答 1：建立陣列並存取特定元素
 */
function exercise01_createAndAccessArray() {
  // 建立包含 5 個水果的陣列
  var fruits = ['蘋果', '香蕉', '橘子', '芒果', '草莓'];
  
  // 回傳第 3 個水果（索引 2）
  return fruits[2];
}

// ============================================
// 練習 2：使用 push 和 pop
// ============================================

/**
 * 解答 2：使用 push 新增元素，pop 移除元素
 */
function exercise02_pushAndPop() {
  // 建立空陣列
  var numbers = [];
  
  // 使用 push 新增元素
  numbers.push(10);
  numbers.push(20);
  numbers.push(30);
  
  // 使用 pop 移除最後一個元素
  numbers.pop();
  
  // 回傳最終陣列
  return numbers;
}

// ============================================
// 練習 3：陣列反轉
// ============================================

/**
 * 解答 3：使用迴圈反轉陣列
 */
function exercise03_reverseArray() {
  var numbers = [1, 2, 3, 4, 5];
  var reversed = [];
  
  // 從後往前遍歷原陣列
  for (var i = numbers.length - 1; i >= 0; i--) {
    reversed.push(numbers[i]);
  }
  
  return reversed;
}

// 替代解法：使用 unshift
function exercise03_reverseArray_alternative() {
  var numbers = [1, 2, 3, 4, 5];
  var reversed = [];
  
  // 從前往後遍歷，但用 unshift 插入到開頭
  for (var i = 0; i < numbers.length; i++) {
    reversed.unshift(numbers[i]);
  }
  
  return reversed;
}

// ============================================
// 練習 4：計算陣列總和
// ============================================

/**
 * 解答 4：使用 forEach 計算總和
 */
function exercise04_sumWithForEach() {
  var numbers = [10, 20, 30, 40, 50];
  var sum = 0;
  
  // 使用 forEach 遍歷並累加
  numbers.forEach(function(num) {
    sum += num;
  });
  
  return sum;
}

// ============================================
// 練習 5：使用 map 轉換陣列
// ============================================

/**
 * 解答 5：使用 map 將數字平方
 */
function exercise05_squareNumbers() {
  var numbers = [1, 2, 3, 4, 5];
  
  // 使用 map 將每個數字平方
  var squared = numbers.map(function(num) {
    return num * num;
  });
  
  return squared;
}

// ============================================
// 練習 6：使用 filter 篩選陣列
// ============================================

/**
 * 解答 6：使用 filter 篩選大於 20 的數字
 */
function exercise06_filterLargeNumbers() {
  var numbers = [15, 8, 23, 42, 7, 31, 19];
  
  // 使用 filter 篩選大於 20 的數字
  var filtered = numbers.filter(function(num) {
    return num > 20;
  });
  
  return filtered;
}

// ============================================
// 練習 7：使用 reduce 計算平均
// ============================================

/**
 * 解答 7：使用 reduce 計算平均分數
 */
function exercise07_calculateAverage() {
  var scores = [85, 92, 78, 90, 88];
  
  // 使用 reduce 計算總和
  var sum = scores.reduce(function(total, score) {
    return total + score;
  }, 0);
  
  // 計算平均並四捨五入到小數點後 2 位
  var average = sum / scores.length;
  return Math.round(average * 10) / 10;
}

// 替代解法：一行完成
function exercise07_calculateAverage_alternative() {
  var scores = [85, 92, 78, 90, 88];
  
  return Math.round(scores.reduce(function(sum, score) {
    return sum + score;
  }, 0) / scores.length * 10) / 10;
}

// ============================================
// 練習 8：移除陣列中的特定元素
// ============================================

/**
 * 解答 8：使用 filter 移除特定元素
 */
function exercise08_removeElement() {
  var fruits = ['蘋果', '香蕉', '橘子', '香蕉', '芒果'];
  
  // 使用 filter 保留不是 '香蕉' 的元素
  var filtered = fruits.filter(function(fruit) {
    return fruit !== '香蕉';
  });
  
  return filtered;
}

// ============================================
// 練習 9：找出陣列中的最大值
// ============================================

/**
 * 解答 9：使用 reduce 找出最大值
 */
function exercise09_findMaximum() {
  var numbers = [45, 23, 67, 12, 89, 34];
  
  // 使用 reduce 比較並保留較大的值
  var max = numbers.reduce(function(maximum, num) {
    return num > maximum ? num : maximum;
  }, 0);
  
  return max;
}

// 替代解法：使用 Math.max
function exercise09_findMaximum_alternative() {
  var numbers = [45, 23, 67, 12, 89, 34];
  return Math.max.apply(null, numbers);
}

// ============================================
// 練習 10：組合使用 filter 和 map
// ============================================

/**
 * 解答 10：先篩選再轉換
 */
function exercise10_filterAndMap() {
  var scores = [85, 55, 92, 48, 78, 90, 35, 88];
  
  // 先篩選出及格的成績
  var passedScores = scores.filter(function(score) {
    return score >= 60;
  });
  
  // 再將每個成績加 5 分
  var boostedScores = passedScores.map(function(score) {
    return score + 5;
  });
  
  return boostedScores;
}

// 替代解法：鏈式呼叫
function exercise10_filterAndMap_alternative() {
  var scores = [85, 55, 92, 48, 78, 90, 35, 88];
  
  return scores
    .filter(function(score) { return score >= 60; })
    .map(function(score) { return score + 5; });
}

// ============================================
// 練習 11：處理二維陣列
// ============================================

/**
 * 解答 11：計算每位學生的平均分數
 */
function exercise11_processStudentGrades() {
  var students = [
    ['王小明', 85, 90],
    ['李小華', 92, 88],
    ['張小美', 78, 85]
  ];
  
  // 使用 map 轉換每個學生資料
  var result = students.map(function(student) {
    var name = student[0];
    var score1 = student[1];
    var score2 = student[2];
    var average = (score1 + score2) / 2;
    
    return {
      name: name,
      average: average
    };
  });
  
  return result;
}

// 替代解法：使用 slice 取得分數部分
function exercise11_processStudentGrades_alternative() {
  var students = [
    ['王小明', 85, 90],
    ['李小華', 92, 88],
    ['張小美', 78, 85]
  ];
  
  return students.map(function(student) {
    var name = student[0];
    var scores = student.slice(1);  // 取得所有分數
    var sum = scores.reduce(function(total, score) {
      return total + score;
    }, 0);
    var average = sum / scores.length;
    
    return { name: name, average: average };
  });
}

// ============================================
// 練習 12：統計陣列元素出現次數
// ============================================

/**
 * 解答 12：使用 reduce 統計出現次數
 */
function exercise12_countOccurrences() {
  var fruits = ['蘋果', '香蕉', '蘋果', '橘子', '香蕉', '蘋果', '芒果'];
  
  // 使用 reduce 累積統計
  var count = fruits.reduce(function(acc, fruit) {
    // 如果該水果已存在，次數加 1；否則設為 1
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
  }, {});
  
  return count;
}

// 替代解法：使用 forEach
function exercise12_countOccurrences_alternative() {
  var fruits = ['蘋果', '香蕉', '蘋果', '橘子', '香蕉', '蘋果', '芒果'];
  var count = {};
  
  fruits.forEach(function(fruit) {
    if (count[fruit]) {
      count[fruit]++;
    } else {
      count[fruit] = 1;
    }
  });
  
  return count;
}

// ============================================
// 執行所有解答並顯示結果
// ============================================

function runAllSolutions() {
  Logger.log('========================================');
  Logger.log('陣列操作練習題 - 解答');
  Logger.log('========================================\n');
  
  Logger.log('練習 1：' + exercise01_createAndAccessArray());
  Logger.log('練習 2：' + exercise02_pushAndPop());
  Logger.log('練習 3：' + exercise03_reverseArray());
  Logger.log('練習 4：' + exercise04_sumWithForEach());
  Logger.log('練習 5：' + exercise05_squareNumbers());
  Logger.log('練習 6：' + exercise06_filterLargeNumbers());
  Logger.log('練習 7：' + exercise07_calculateAverage());
  Logger.log('練習 8：' + exercise08_removeElement());
  Logger.log('練習 9：' + exercise09_findMaximum());
  Logger.log('練習 10：' + exercise10_filterAndMap());
  Logger.log('練習 11：');
  Logger.log(JSON.stringify(exercise11_processStudentGrades(), null, 2));
  Logger.log('練習 12：');
  Logger.log(JSON.stringify(exercise12_countOccurrences(), null, 2));
  
  Logger.log('\n========================================');
  Logger.log('所有解答執行完成！');
  Logger.log('========================================');
}

// ============================================
// 學習重點總結
// ============================================

/**
 * 本練習題涵蓋的重點：
 * 
 * 1. 陣列基礎操作
 *    - 建立陣列
 *    - 存取元素（使用索引）
 *    - 取得陣列長度
 * 
 * 2. 陣列方法
 *    - push/pop：末端新增/移除
 *    - unshift/shift：開頭新增/移除
 *    - splice：插入/刪除/取代
 *    - slice：複製部分陣列
 * 
 * 3. 陣列遍歷
 *    - forEach：遍歷每個元素
 *    - map：轉換陣列元素
 *    - filter：篩選符合條件的元素
 *    - reduce：累積成單一值
 * 
 * 4. 進階技巧
 *    - 組合使用多個陣列方法
 *    - 處理二維陣列
 *    - 統計與分析資料
 * 
 * 5. GAS 相容性
 *    - 所有解答都使用 GAS 完全支援的語法
 *    - 避免使用需要 V8 runtime 的方法
 *    - 提供替代方案
 */
