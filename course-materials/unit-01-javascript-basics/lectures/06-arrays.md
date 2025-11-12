# 陣列操作

## 學習目標

- 理解陣列的概念與用途
- 掌握陣列的建立、存取與修改方法
- 熟悉常用陣列方法（push、pop、shift、unshift、splice、slice）
- 學會使用陣列遍歷方法（forEach、map、filter、reduce）
- 了解 GAS 對陣列方法的支援情況

---

## 1. 陣列基礎

### 1.1 什麼是陣列？

陣列是一種用來儲存多個值的資料結構。想像陣列就像一個有編號的置物櫃，每個櫃子可以放一個東西，而且可以透過編號快速找到。

```javascript
// 學生名單
var students = ['王小明', '李小華', '張小美'];

// 成績清單
var scores = [85, 90, 78, 92, 88];

// 混合型別（雖然可以，但不建議）
var mixed = [1, 'hello', true, null];
```

### 1.2 建立陣列

**方法 1：陣列字面量（推薦）**
```javascript
var fruits = ['蘋果', '香蕉', '橘子'];
var numbers = [1, 2, 3, 4, 5];
var empty = [];  // 空陣列
```

**方法 2：使用 Array 建構函式**
```javascript
var arr1 = new Array();           // 空陣列
var arr2 = new Array(5);          // 長度為 5 的空陣列
var arr3 = new Array(1, 2, 3);    // [1, 2, 3]
```

✅ **GAS 支援狀態：完全支援**

### 1.3 存取陣列元素

陣列的索引（index）從 0 開始計算。

```javascript
var fruits = ['蘋果', '香蕉', '橘子', '芒果'];

Logger.log(fruits[0]);  // 輸出：蘋果
Logger.log(fruits[1]);  // 輸出：香蕉
Logger.log(fruits[3]);  // 輸出：芒果

// 取得陣列長度
Logger.log(fruits.length);  // 輸出：4

// 取得最後一個元素
Logger.log(fruits[fruits.length - 1]);  // 輸出：芒果
```

✅ **GAS 支援狀態：完全支援**

### 1.4 修改陣列元素

```javascript
var fruits = ['蘋果', '香蕉', '橘子'];

// 修改特定位置的元素
fruits[1] = '草莓';
Logger.log(fruits);  // ['蘋果', '草莓', '橘子']

// 新增元素到陣列末端
fruits[3] = '芒果';
Logger.log(fruits);  // ['蘋果', '草莓', '橘子', '芒果']
```

✅ **GAS 支援狀態：完全支援**

---

## 2. 常用陣列方法

### 2.1 push() - 在陣列末端新增元素

```javascript
var fruits = ['蘋果', '香蕉'];
fruits.push('橘子');
Logger.log(fruits);  // ['蘋果', '香蕉', '橘子']

// 可以一次新增多個元素
fruits.push('芒果', '草莓');
Logger.log(fruits);  // ['蘋果', '香蕉', '橘子', '芒果', '草莓']

// push() 會回傳新的陣列長度
var newLength = fruits.push('西瓜');
Logger.log(newLength);  // 6
```

✅ **GAS 支援狀態：完全支援**

### 2.2 pop() - 移除並回傳陣列最後一個元素

```javascript
var fruits = ['蘋果', '香蕉', '橘子'];
var lastFruit = fruits.pop();

Logger.log(lastFruit);  // 橘子
Logger.log(fruits);     // ['蘋果', '香蕉']
```

✅ **GAS 支援狀態：完全支援**

### 2.3 unshift() - 在陣列開頭新增元素

```javascript
var fruits = ['香蕉', '橘子'];
fruits.unshift('蘋果');
Logger.log(fruits);  // ['蘋果', '香蕉', '橘子']

// 可以一次新增多個元素
fruits.unshift('芒果', '草莓');
Logger.log(fruits);  // ['芒果', '草莓', '蘋果', '香蕉', '橘子']
```

✅ **GAS 支援狀態：完全支援**

### 2.4 shift() - 移除並回傳陣列第一個元素

```javascript
var fruits = ['蘋果', '香蕉', '橘子'];
var firstFruit = fruits.shift();

Logger.log(firstFruit);  // 蘋果
Logger.log(fruits);      // ['香蕉', '橘子']
```

✅ **GAS 支援狀態：完全支援**

### 2.5 splice() - 新增、移除或取代陣列元素

**語法：** `array.splice(start, deleteCount, item1, item2, ...)`

```javascript
var fruits = ['蘋果', '香蕉', '橘子', '芒果', '草莓'];

// 從索引 2 開始，刪除 1 個元素
fruits.splice(2, 1);
Logger.log(fruits);  // ['蘋果', '香蕉', '芒果', '草莓']

// 從索引 1 開始，刪除 0 個元素，插入 '西瓜'
fruits.splice(1, 0, '西瓜');
Logger.log(fruits);  // ['蘋果', '西瓜', '香蕉', '芒果', '草莓']

// 從索引 2 開始，刪除 2 個元素，插入 '鳳梨', '葡萄'
fruits.splice(2, 2, '鳳梨', '葡萄');
Logger.log(fruits);  // ['蘋果', '西瓜', '鳳梨', '葡萄', '草莓']
```

✅ **GAS 支援狀態：完全支援**

### 2.6 slice() - 複製陣列的一部分

**語法：** `array.slice(start, end)`  
注意：不會修改原陣列，會回傳新陣列

```javascript
var fruits = ['蘋果', '香蕉', '橘子', '芒果', '草莓'];

// 從索引 1 到索引 3（不包含 3）
var sliced1 = fruits.slice(1, 3);
Logger.log(sliced1);  // ['香蕉', '橘子']

// 從索引 2 到結尾
var sliced2 = fruits.slice(2);
Logger.log(sliced2);  // ['橘子', '芒果', '草莓']

// 複製整個陣列
var copy = fruits.slice();
Logger.log(copy);  // ['蘋果', '香蕉', '橘子', '芒果', '草莓']

// 原陣列不受影響
Logger.log(fruits);  // ['蘋果', '香蕉', '橘子', '芒果', '草莓']
```

✅ **GAS 支援狀態：完全支援**

---

## 3. 陣列遍歷方法

### 3.1 forEach() - 遍歷陣列的每個元素

```javascript
var fruits = ['蘋果', '香蕉', '橘子'];

// 基本用法
fruits.forEach(function(fruit) {
  Logger.log(fruit);
});
// 輸出：
// 蘋果
// 香蕉
// 橘子

// 完整參數：元素、索引、陣列本身
fruits.forEach(function(fruit, index, array) {
  Logger.log(index + ': ' + fruit);
});
// 輸出：
// 0: 蘋果
// 1: 香蕉
// 2: 橘子
```

✅ **GAS 支援狀態：完全支援**

### 3.2 map() - 轉換陣列元素

map() 會建立一個新陣列，內容是原陣列每個元素經過函式處理後的結果。

```javascript
var numbers = [1, 2, 3, 4, 5];

// 將每個數字乘以 2
var doubled = numbers.map(function(num) {
  return num * 2;
});
Logger.log(doubled);  // [2, 4, 6, 8, 10]

// 原陣列不變
Logger.log(numbers);  // [1, 2, 3, 4, 5]

// 實用範例：將分數轉換為等級
var scores = [85, 92, 78, 95, 88];
var grades = scores.map(function(score) {
  if (score >= 90) return '優';
  if (score >= 80) return '良';
  if (score >= 70) return '可';
  return '待加強';
});
Logger.log(grades);  // ['良', '優', '可', '優', '良']
```

✅ **GAS 支援狀態：完全支援**

### 3.3 filter() - 篩選陣列元素

filter() 會建立一個新陣列，只包含通過測試的元素。

```javascript
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 篩選出偶數
var evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
Logger.log(evenNumbers);  // [2, 4, 6, 8, 10]

// 實用範例：篩選及格的成績
var scores = [85, 92, 58, 95, 45, 88, 72];
var passedScores = scores.filter(function(score) {
  return score >= 60;
});
Logger.log(passedScores);  // [85, 92, 95, 88, 72]

// 篩選特定條件的物件
var students = [
  { name: '王小明', score: 85 },
  { name: '李小華', score: 92 },
  { name: '張小美', score: 58 }
];
var passedStudents = students.filter(function(student) {
  return student.score >= 60;
});
Logger.log(passedStudents);
// [{ name: '王小明', score: 85 }, { name: '李小華', score: 92 }]
```

✅ **GAS 支援狀態：完全支援**

### 3.4 reduce() - 累積陣列元素

reduce() 將陣列元素累積成單一值。

**語法：** `array.reduce(function(accumulator, currentValue) { ... }, initialValue)`

```javascript
var numbers = [1, 2, 3, 4, 5];

// 計算總和
var sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);
Logger.log(sum);  // 15

// 計算乘積
var product = numbers.reduce(function(result, num) {
  return result * num;
}, 1);
Logger.log(product);  // 120

// 實用範例：計算平均分數
var scores = [85, 92, 78, 95, 88];
var average = scores.reduce(function(sum, score) {
  return sum + score;
}, 0) / scores.length;
Logger.log(average);  // 87.6

// 進階範例：統計出現次數
var fruits = ['蘋果', '香蕉', '蘋果', '橘子', '香蕉', '蘋果'];
var count = fruits.reduce(function(acc, fruit) {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
Logger.log(count);  // { 蘋果: 3, 香蕉: 2, 橘子: 1 }
```

✅ **GAS 支援狀態：完全支援**

---

## 4. 其他常用陣列方法

### 4.1 join() - 將陣列元素連接成字串

```javascript
var fruits = ['蘋果', '香蕉', '橘子'];
var str1 = fruits.join();      // '蘋果,香蕉,橘子'
var str2 = fruits.join(' - '); // '蘋果 - 香蕉 - 橘子'
var str3 = fruits.join('');    // '蘋果香蕉橘子'
```

✅ **GAS 支援狀態：完全支援**

### 4.2 concat() - 合併陣列

```javascript
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var combined = arr1.concat(arr2);
Logger.log(combined);  // [1, 2, 3, 4, 5, 6]
```

✅ **GAS 支援狀態：完全支援**

### 4.3 reverse() - 反轉陣列

```javascript
var numbers = [1, 2, 3, 4, 5];
numbers.reverse();
Logger.log(numbers);  // [5, 4, 3, 2, 1]
```

⚠️ **注意：** reverse() 會修改原陣列

✅ **GAS 支援狀態：完全支援**

### 4.4 sort() - 排序陣列

```javascript
// 字串排序
var fruits = ['香蕉', '蘋果', '橘子'];
fruits.sort();
Logger.log(fruits);  // ['橘子', '蘋果', '香蕉']（依 Unicode 排序）

// 數字排序（需要提供比較函式）
var numbers = [10, 5, 40, 25, 1000, 1];
numbers.sort(function(a, b) {
  return a - b;  // 升序
});
Logger.log(numbers);  // [1, 5, 10, 25, 40, 1000]

// 降序排序
numbers.sort(function(a, b) {
  return b - a;
});
Logger.log(numbers);  // [1000, 40, 25, 10, 5, 1]
```

⚠️ **注意：** sort() 會修改原陣列

✅ **GAS 支援狀態：完全支援**

### 4.5 indexOf() - 尋找元素的索引

```javascript
var fruits = ['蘋果', '香蕉', '橘子', '香蕉'];
Logger.log(fruits.indexOf('香蕉'));    // 1（第一次出現的位置）
Logger.log(fruits.indexOf('芒果'));    // -1（找不到）
Logger.log(fruits.indexOf('香蕉', 2)); // 3（從索引 2 開始找）
```

✅ **GAS 支援狀態：完全支援**

---

## 5. 多維陣列

陣列的元素也可以是陣列，形成多維陣列（常用於表格資料）。

```javascript
// 二維陣列：學生成績表
var grades = [
  ['王小明', 85, 90, 88],
  ['李小華', 92, 88, 95],
  ['張小美', 78, 85, 82]
];

// 存取元素
Logger.log(grades[0][0]);  // '王小明'
Logger.log(grades[0][1]);  // 85
Logger.log(grades[1][2]);  // 88

// 遍歷二維陣列
for (var i = 0; i < grades.length; i++) {
  var student = grades[i][0];
  var score1 = grades[i][1];
  var score2 = grades[i][2];
  var score3 = grades[i][3];
  var average = (score1 + score2 + score3) / 3;
  Logger.log(student + ' 的平均分數：' + average);
}
```

✅ **GAS 支援狀態：完全支援**

---

## 6. GAS 不支援的陣列方法

以下方法需要啟用 V8 runtime 才能使用：

### ❌ includes() - 檢查陣列是否包含某元素

```javascript
// ❌ 在未啟用 V8 runtime 的 GAS 中不支援
var fruits = ['蘋果', '香蕉', '橘子'];
// var hasApple = fruits.includes('蘋果');  // 會出錯

// ✅ 替代方案：使用 indexOf()
var hasApple = fruits.indexOf('蘋果') !== -1;
Logger.log(hasApple);  // true
```

### ❌ flat() - 扁平化多維陣列

```javascript
// ❌ 在未啟用 V8 runtime 的 GAS 中不支援
var nested = [1, [2, 3], [4, [5, 6]]];
// var flattened = nested.flat();  // 會出錯

// ✅ 替代方案：自行實作
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
Logger.log(flattened);  // [1, 2, 3, 4, 5, 6]
```

### ❌ flatMap() - map 後扁平化

```javascript
// ❌ 在未啟用 V8 runtime 的 GAS 中不支援
var numbers = [1, 2, 3];
// var result = numbers.flatMap(x => [x, x * 2]);  // 會出錯

// ✅ 替代方案：使用 map() + concat()
var result = [];
numbers.forEach(function(x) {
  result = result.concat([x, x * 2]);
});
Logger.log(result);  // [1, 2, 2, 4, 3, 6]
```

### ❌ find() / findIndex() - 尋找符合條件的元素

```javascript
// ❌ 在未啟用 V8 runtime 的 GAS 中不支援
var numbers = [5, 12, 8, 130, 44];
// var found = numbers.find(x => x > 10);  // 會出錯

// ✅ 替代方案：使用 filter() 取第一個
var found = numbers.filter(function(x) {
  return x > 10;
})[0];
Logger.log(found);  // 12
```

---

## 7. 實用技巧與最佳實踐

### 7.1 複製陣列

```javascript
var original = [1, 2, 3];

// 方法 1：使用 slice()
var copy1 = original.slice();

// 方法 2：使用 concat()
var copy2 = [].concat(original);

// ⚠️ 錯誤示範：直接賦值只是複製參考
var notACopy = original;
notACopy.push(4);
Logger.log(original);  // [1, 2, 3, 4]（原陣列也被修改了！）
```

### 7.2 清空陣列

```javascript
var arr = [1, 2, 3, 4, 5];

// 方法 1：設定 length 為 0
arr.length = 0;

// 方法 2：重新賦值為空陣列
arr = [];
```

### 7.3 移除陣列中的特定元素

```javascript
var fruits = ['蘋果', '香蕉', '橘子', '香蕉', '芒果'];

// 移除第一個 '香蕉'
var index = fruits.indexOf('香蕉');
if (index !== -1) {
  fruits.splice(index, 1);
}
Logger.log(fruits);  // ['蘋果', '橘子', '香蕉', '芒果']

// 移除所有 '香蕉'
var filtered = fruits.filter(function(fruit) {
  return fruit !== '香蕉';
});
Logger.log(filtered);  // ['蘋果', '橘子', '芒果']
```

### 7.4 檢查是否為陣列

```javascript
var arr = [1, 2, 3];
var notArr = 'hello';

Logger.log(Array.isArray(arr));     // true
Logger.log(Array.isArray(notArr));  // false
```

---

## 8. 常見錯誤與除錯

### 錯誤 1：索引超出範圍

```javascript
var arr = [1, 2, 3];
Logger.log(arr[5]);  // undefined（不會報錯，但回傳 undefined）
```

### 錯誤 2：忘記 map/filter 會回傳新陣列

```javascript
var numbers = [1, 2, 3];
numbers.map(function(num) {
  return num * 2;
});
// ❌ 原陣列不會改變
Logger.log(numbers);  // [1, 2, 3]

// ✅ 正確做法：接收回傳值
var doubled = numbers.map(function(num) {
  return num * 2;
});
Logger.log(doubled);  // [2, 4, 6]
```

### 錯誤 3：sort() 數字排序錯誤

```javascript
var numbers = [10, 5, 40, 25];
numbers.sort();
Logger.log(numbers);  // [10, 25, 40, 5]（錯誤！）

// ✅ 正確做法：提供比較函式
numbers.sort(function(a, b) {
  return a - b;
});
Logger.log(numbers);  // [5, 10, 25, 40]
```

---

## 9. 總結

### 完全支援的陣列方法（GAS）
- 基本操作：push, pop, shift, unshift, splice, slice
- 遍歷方法：forEach, map, filter, reduce
- 其他方法：join, concat, reverse, sort, indexOf

### 需要 V8 Runtime 的方法
- includes, find, findIndex, flat, flatMap

### 學習重點
1. 陣列索引從 0 開始
2. 某些方法會修改原陣列（push, pop, splice, reverse, sort）
3. 某些方法會回傳新陣列（map, filter, slice, concat）
4. 使用 forEach 遍歷，map 轉換，filter 篩選，reduce 累積
5. 在 GAS 中優先使用完全支援的語法

---

## 練習題

請完成 `exercises/04-arrays-exercises.gs` 中的 12 個練習題，鞏固陣列操作技能！
