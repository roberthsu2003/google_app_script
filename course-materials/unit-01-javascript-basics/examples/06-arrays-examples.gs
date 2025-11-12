/**
 * 陣列操作範例程式碼
 * 
 * 本檔案包含：
 * 1. 陣列基礎操作
 * 2. 常用陣列方法（push, pop, shift, unshift, splice, slice）
 * 3. 陣列遍歷方法（forEach, map, filter, reduce）
 * 4. 多維陣列操作
 * 5. 實用技巧
 */

// ============================================
// 1. 陣列基礎操作
// ============================================

function example01_arrayBasics() {
  Logger.log('=== 範例 1：陣列基礎操作 ===');
  
  // 建立陣列
  var fruits = ['蘋果', '香蕉', '橘子'];
  Logger.log('水果陣列：' + fruits);
  
  // 存取元素
  Logger.log('第一個水果：' + fruits[0]);
  Logger.log('第二個水果：' + fruits[1]);
  
  // 陣列長度
  Logger.log('水果數量：' + fruits.length);
  
  // 修改元素
  fruits[1] = '草莓';
  Logger.log('修改後：' + fruits);
  
  // 取得最後一個元素
  var lastFruit = fruits[fruits.length - 1];
  Logger.log('最後一個水果：' + lastFruit);
}

// ============================================
// 2. push() 和 pop() - 陣列末端操作
// ============================================

function example02_pushAndPop() {
  Logger.log('=== 範例 2：push() 和 pop() ===');
  
  var stack = [];
  Logger.log('初始陣列：' + stack);
  
  // push() - 新增到末端
  stack.push('第一個');
  Logger.log('push 後：' + stack);
  
  stack.push('第二個');
  stack.push('第三個');
  Logger.log('多次 push 後：' + stack);
  
  // pop() - 移除末端元素
  var removed = stack.pop();
  Logger.log('pop 移除的元素：' + removed);
  Logger.log('pop 後的陣列：' + stack);
}

// ============================================
// 3. unshift() 和 shift() - 陣列開頭操作
// ============================================

function example03_unshiftAndShift() {
  Logger.log('=== 範例 3：unshift() 和 shift() ===');
  
  var queue = ['第二個', '第三個'];
  Logger.log('初始陣列：' + queue);
  
  // unshift() - 新增到開頭
  queue.unshift('第一個');
  Logger.log('unshift 後：' + queue);
  
  // shift() - 移除開頭元素
  var removed = queue.shift();
  Logger.log('shift 移除的元素：' + removed);
  Logger.log('shift 後的陣列：' + queue);
}

// ============================================
// 4. splice() - 新增、移除或取代元素
// ============================================

function example04_splice() {
  Logger.log('=== 範例 4：splice() 方法 ===');
  
  // 範例 1：刪除元素
  var fruits = ['蘋果', '香蕉', '橘子', '芒果', '草莓'];
  Logger.log('原始陣列：' + fruits);
  
  fruits.splice(2, 1);  // 從索引 2 刪除 1 個元素
  Logger.log('刪除橘子後：' + fruits);
  
  // 範例 2：插入元素
  fruits.splice(1, 0, '西瓜', '鳳梨');  // 從索引 1 插入，不刪除
  Logger.log('插入西瓜和鳳梨後：' + fruits);
  
  // 範例 3：取代元素
  fruits.splice(0, 2, '葡萄');  // 從索引 0 刪除 2 個，插入葡萄
  Logger.log('取代前兩個元素後：' + fruits);
}

// ============================================
// 5. slice() - 複製陣列的一部分
// ============================================

function example05_slice() {
  Logger.log('=== 範例 5：slice() 方法 ===');
  
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  Logger.log('原始陣列：' + numbers);
  
  // 取得部分元素
  var part1 = numbers.slice(2, 5);  // 索引 2 到 4
  Logger.log('slice(2, 5)：' + part1);
  
  var part2 = numbers.slice(5);  // 從索引 5 到結尾
  Logger.log('slice(5)：' + part2);
  
  var part3 = numbers.slice(-3);  // 最後 3 個元素
  Logger.log('slice(-3)：' + part3);
  
  // 複製整個陣列
  var copy = numbers.slice();
  Logger.log('複製的陣列：' + copy);
  Logger.log('原始陣列不變：' + numbers);
}

// ============================================
// 6. forEach() - 遍歷陣列
// ============================================

function example06_forEach() {
  Logger.log('=== 範例 6：forEach() 遍歷 ===');
  
  var fruits = ['蘋果', '香蕉', '橘子'];
  
  // 基本用法
  Logger.log('--- 基本遍歷 ---');
  fruits.forEach(function(fruit) {
    Logger.log('水果：' + fruit);
  });
  
  // 使用索引
  Logger.log('--- 帶索引的遍歷 ---');
  fruits.forEach(function(fruit, index) {
    Logger.log(index + ': ' + fruit);
  });
  
  // 實用範例：計算總和
  var numbers = [10, 20, 30, 40, 50];
  var sum = 0;
  numbers.forEach(function(num) {
    sum += num;
  });
  Logger.log('數字總和：' + sum);
}

// ============================================
// 7. map() - 轉換陣列元素
// ============================================

function example07_map() {
  Logger.log('=== 範例 7：map() 轉換 ===');
  
  // 範例 1：數字運算
  var numbers = [1, 2, 3, 4, 5];
  var doubled = numbers.map(function(num) {
    return num * 2;
  });
  Logger.log('原始陣列：' + numbers);
  Logger.log('每個數字 x2：' + doubled);
  
  // 範例 2：字串處理
  var names = ['alice', 'bob', 'charlie'];
  var upperNames = names.map(function(name) {
    return name.toUpperCase();
  });
  Logger.log('轉大寫：' + upperNames);
  
  // 範例 3：分數轉等級
  var scores = [85, 92, 78, 95, 88, 65, 72];
  var grades = scores.map(function(score) {
    if (score >= 90) return '優';
    if (score >= 80) return '良';
    if (score >= 70) return '可';
    if (score >= 60) return '及格';
    return '不及格';
  });
  Logger.log('分數：' + scores);
  Logger.log('等級：' + grades);
}

// ============================================
// 8. filter() - 篩選陣列元素
// ============================================

function example08_filter() {
  Logger.log('=== 範例 8：filter() 篩選 ===');
  
  // 範例 1：篩選偶數
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var evenNumbers = numbers.filter(function(num) {
    return num % 2 === 0;
  });
  Logger.log('原始陣列：' + numbers);
  Logger.log('偶數：' + evenNumbers);
  
  // 範例 2：篩選及格成績
  var scores = [85, 92, 58, 95, 45, 88, 72, 35];
  var passedScores = scores.filter(function(score) {
    return score >= 60;
  });
  Logger.log('所有成績：' + scores);
  Logger.log('及格成績：' + passedScores);
  
  // 範例 3：篩選長字串
  var words = ['hi', 'hello', 'hey', 'goodbye', 'bye'];
  var longWords = words.filter(function(word) {
    return word.length > 3;
  });
  Logger.log('所有單字：' + words);
  Logger.log('長度 > 3 的單字：' + longWords);
}

// ============================================
// 9. reduce() - 累積陣列元素
// ============================================

function example09_reduce() {
  Logger.log('=== 範例 9：reduce() 累積 ===');
  
  // 範例 1：計算總和
  var numbers = [1, 2, 3, 4, 5];
  var sum = numbers.reduce(function(total, num) {
    return total + num;
  }, 0);
  Logger.log('數字：' + numbers);
  Logger.log('總和：' + sum);
  
  // 範例 2：計算乘積
  var product = numbers.reduce(function(result, num) {
    return result * num;
  }, 1);
  Logger.log('乘積：' + product);
  
  // 範例 3：找出最大值
  var scores = [85, 92, 78, 95, 88];
  var maxScore = scores.reduce(function(max, score) {
    return score > max ? score : max;
  }, 0);
  Logger.log('成績：' + scores);
  Logger.log('最高分：' + maxScore);
  
  // 範例 4：計算平均
  var average = scores.reduce(function(sum, score) {
    return sum + score;
  }, 0) / scores.length;
  Logger.log('平均分數：' + average);
}

// ============================================
// 10. 組合使用多個陣列方法
// ============================================

function example10_combiningMethods() {
  Logger.log('=== 範例 10：組合使用陣列方法 ===');
  
  var scores = [85, 92, 58, 95, 45, 88, 72, 35, 90];
  
  // 找出及格成績，並計算平均
  var passedScores = scores.filter(function(score) {
    return score >= 60;
  });
  
  var average = passedScores.reduce(function(sum, score) {
    return sum + score;
  }, 0) / passedScores.length;
  
  Logger.log('所有成績：' + scores);
  Logger.log('及格成績：' + passedScores);
  Logger.log('及格者平均：' + average.toFixed(2));
  
  // 將分數轉換為等級，然後統計各等級人數
  var grades = scores.map(function(score) {
    if (score >= 90) return '優';
    if (score >= 80) return '良';
    if (score >= 70) return '可';
    if (score >= 60) return '及格';
    return '不及格';
  });
  
  var gradeCount = grades.reduce(function(count, grade) {
    count[grade] = (count[grade] || 0) + 1;
    return count;
  }, {});
  
  Logger.log('等級分布：');
  Logger.log(JSON.stringify(gradeCount, null, 2));
}

// ============================================
// 11. 多維陣列操作
// ============================================

function example11_multiDimensionalArrays() {
  Logger.log('=== 範例 11：多維陣列 ===');
  
  // 學生成績表（二維陣列）
  var grades = [
    ['王小明', 85, 90, 88],
    ['李小華', 92, 88, 95],
    ['張小美', 78, 85, 82],
    ['陳大同', 95, 92, 90]
  ];
  
  Logger.log('--- 學生成績表 ---');
  
  // 遍歷並計算每位學生的平均
  grades.forEach(function(student) {
    var name = student[0];
    var score1 = student[1];
    var score2 = student[2];
    var score3 = student[3];
    var average = (score1 + score2 + score3) / 3;
    
    Logger.log(name + ' 的成績：' + score1 + ', ' + score2 + ', ' + score3);
    Logger.log(name + ' 的平均：' + average.toFixed(2));
  });
  
  // 計算每科的平均分數
  Logger.log('--- 各科平均分數 ---');
  for (var subject = 1; subject <= 3; subject++) {
    var sum = 0;
    for (var i = 0; i < grades.length; i++) {
      sum += grades[i][subject];
    }
    var average = sum / grades.length;
    Logger.log('科目 ' + subject + ' 平均：' + average.toFixed(2));
  }
}

// ============================================
// 12. 實用技巧
// ============================================

function example12_usefulTricks() {
  Logger.log('=== 範例 12：實用技巧 ===');
  
  // 技巧 1：複製陣列
  var original = [1, 2, 3, 4, 5];
  var copy = original.slice();
  copy.push(6);
  Logger.log('原始陣列：' + original);
  Logger.log('複製陣列：' + copy);
  
  // 技巧 2：移除重複元素
  var numbers = [1, 2, 2, 3, 4, 4, 5, 1, 3];
  var unique = numbers.filter(function(num, index, arr) {
    return arr.indexOf(num) === index;
  });
  Logger.log('原始陣列：' + numbers);
  Logger.log('去除重複：' + unique);
  
  // 技巧 3：陣列扁平化（一層）
  var nested = [[1, 2], [3, 4], [5, 6]];
  var flattened = [].concat.apply([], nested);
  Logger.log('巢狀陣列：' + JSON.stringify(nested));
  Logger.log('扁平化後：' + flattened);
  
  // 技巧 4：建立數字序列
  var sequence = [];
  for (var i = 1; i <= 10; i++) {
    sequence.push(i);
  }
  Logger.log('1 到 10 的序列：' + sequence);
  
  // 技巧 5：檢查陣列是否包含某元素（GAS 相容寫法）
  var fruits = ['蘋果', '香蕉', '橘子'];
  var hasApple = fruits.indexOf('蘋果') !== -1;
  var hasMango = fruits.indexOf('芒果') !== -1;
  Logger.log('包含蘋果：' + hasApple);
  Logger.log('包含芒果：' + hasMango);
}

// ============================================
// 13. 不支援的方法與替代方案
// ============================================

function example13_unsupportedMethods() {
  Logger.log('=== 範例 13：不支援方法的替代方案 ===');
  
  // includes() 的替代方案
  var fruits = ['蘋果', '香蕉', '橘子'];
  // var hasApple = fruits.includes('蘋果');  // ❌ GAS 不支援
  var hasApple = fruits.indexOf('蘋果') !== -1;  // ✅ 使用 indexOf
  Logger.log('包含蘋果：' + hasApple);
  
  // find() 的替代方案
  var numbers = [5, 12, 8, 130, 44];
  // var found = numbers.find(x => x > 10);  // ❌ GAS 不支援
  var found = numbers.filter(function(x) {
    return x > 10;
  })[0];  // ✅ 使用 filter 取第一個
  Logger.log('第一個大於 10 的數字：' + found);
  
  // flat() 的替代方案
  var nested = [1, [2, 3], [4, [5, 6]]];
  // var flattened = nested.flat();  // ❌ GAS 不支援
  
  // ✅ 自行實作扁平化函式
  function flattenArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flattenArray(arr[i]));
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  }
  
  var flattened = flattenArray(nested);
  Logger.log('巢狀陣列：' + JSON.stringify(nested));
  Logger.log('扁平化後：' + flattened);
}

// ============================================
// 執行所有範例
// ============================================

function runAllExamples() {
  example01_arrayBasics();
  Logger.log('\n');
  
  example02_pushAndPop();
  Logger.log('\n');
  
  example03_unshiftAndShift();
  Logger.log('\n');
  
  example04_splice();
  Logger.log('\n');
  
  example05_slice();
  Logger.log('\n');
  
  example06_forEach();
  Logger.log('\n');
  
  example07_map();
  Logger.log('\n');
  
  example08_filter();
  Logger.log('\n');
  
  example09_reduce();
  Logger.log('\n');
  
  example10_combiningMethods();
  Logger.log('\n');
  
  example11_multiDimensionalArrays();
  Logger.log('\n');
  
  example12_usefulTricks();
  Logger.log('\n');
  
  example13_unsupportedMethods();
}
