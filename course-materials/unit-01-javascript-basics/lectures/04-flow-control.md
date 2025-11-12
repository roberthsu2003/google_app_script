# 流程控制

## 學習目標

- 理解條件判斷的概念與應用
- 掌握 if-else 與 switch-case 語法
- 理解迴圈的運作原理
- 熟練使用 for、while、do-while 迴圈
- 了解 break 與 continue 的使用時機
- 認識 GAS 對各種流程控制語法的支援情況

---

## 1. 條件判斷

### 1.1 if-else 條件判斷

條件判斷讓程式能夠根據不同情況執行不同的程式碼。

#### 基本語法

```javascript
if (條件) {
  // 條件為 true 時執行
}
```

#### 單層判斷範例

```javascript
function checkAge(age) {
  if (age >= 18) {
    Logger.log('已成年');
  }
}
```

**GAS 支援狀態：** ✅ 完全支援

#### if-else 雙向判斷

```javascript
function checkPass(score) {
  if (score >= 60) {
    Logger.log('及格');
  } else {
    Logger.log('不及格');
  }
}
```

#### 多層判斷（if-else if-else）

```javascript
function getGrade(score) {
  if (score >= 90) {
    return '優';
  } else if (score >= 80) {
    return '良';
  } else if (score >= 70) {
    return '可';
  } else if (score >= 60) {
    return '及格';
  } else {
    return '不及格';
  }
}
```

#### 巢狀判斷

```javascript
function checkDiscount(age, isMember) {
  if (isMember) {
    if (age >= 65) {
      return '會員敬老優惠：7折';
    } else {
      return '會員優惠：8折';
    }
  } else {
    if (age >= 65) {
      return '敬老優惠：9折';
    } else {
      return '無優惠';
    }
  }
}
```

### 1.2 switch-case 語法

當需要根據一個變數的不同值執行不同程式碼時，switch-case 比多層 if-else 更清晰。

#### 基本語法

```javascript
switch (變數) {
  case 值1:
    // 執行程式碼
    break;
  case 值2:
    // 執行程式碼
    break;
  default:
    // 都不符合時執行
}
```

#### 實際範例

```javascript
function getDayName(dayNumber) {
  var dayName;
  
  switch (dayNumber) {
    case 1:
      dayName = '星期一';
      break;
    case 2:
      dayName = '星期二';
      break;
    case 3:
      dayName = '星期三';
      break;
    case 4:
      dayName = '星期四';
      break;
    case 5:
      dayName = '星期五';
      break;
    case 6:
      dayName = '星期六';
      break;
    case 7:
      dayName = '星期日';
      break;
    default:
      dayName = '無效的日期';
  }
  
  return dayName;
}
```

**GAS 支援狀態：** ✅ 完全支援

#### 多個 case 共用程式碼

```javascript
function getSeasonByMonth(month) {
  var season;
  
  switch (month) {
    case 3:
    case 4:
    case 5:
      season = '春季';
      break;
    case 6:
    case 7:
    case 8:
      season = '夏季';
      break;
    case 9:
    case 10:
    case 11:
      season = '秋季';
      break;
    case 12:
    case 1:
    case 2:
      season = '冬季';
      break;
    default:
      season = '無效的月份';
  }
  
  return season;
}
```

---

## 2. 迴圈

迴圈讓程式能夠重複執行相同的程式碼，直到滿足特定條件為止。

### 2.1 for 迴圈

for 迴圈適合用於已知執行次數的情況。

#### 基本語法

```javascript
for (初始值; 條件; 遞增/遞減) {
  // 重複執行的程式碼
}
```

#### 基本範例

```javascript
function printNumbers() {
  for (var i = 1; i <= 5; i++) {
    Logger.log(i);
  }
}
// 輸出：1, 2, 3, 4, 5
```

**GAS 支援狀態：** ✅ 完全支援

#### 遞減迴圈

```javascript
function countdown() {
  for (var i = 10; i >= 1; i--) {
    Logger.log(i);
  }
  Logger.log('發射！');
}
```

#### 遍歷陣列

```javascript
function printStudents() {
  var students = ['小明', '小華', '小美'];
  
  for (var i = 0; i < students.length; i++) {
    Logger.log((i + 1) + '. ' + students[i]);
  }
}
// 輸出：
// 1. 小明
// 2. 小華
// 3. 小美
```

#### 巢狀迴圈

```javascript
function multiplicationTable() {
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      Logger.log(i + ' x ' + j + ' = ' + (i * j));
    }
  }
}
```

### 2.2 while 迴圈

while 迴圈適合用於不確定執行次數，但知道結束條件的情況。

#### 基本語法

```javascript
while (條件) {
  // 重複執行的程式碼
}
```

#### 基本範例

```javascript
function countToTen() {
  var i = 1;
  
  while (i <= 10) {
    Logger.log(i);
    i++;
  }
}
```

**GAS 支援狀態：** ✅ 完全支援

#### 實際應用範例

```javascript
function findFirstDivisible(start, divisor) {
  var num = start;
  
  while (num % divisor !== 0) {
    num++;
  }
  
  return num;
}

// 使用範例
Logger.log(findFirstDivisible(10, 7)); // 輸出：14
```

### 2.3 do-while 迴圈

do-while 迴圈會先執行一次程式碼，再檢查條件。保證至少執行一次。

#### 基本語法

```javascript
do {
  // 重複執行的程式碼
} while (條件);
```

#### 基本範例

```javascript
function printAtLeastOnce() {
  var i = 10;
  
  do {
    Logger.log(i);
    i++;
  } while (i < 5);
}
// 即使條件不成立，仍會輸出：10
```

**GAS 支援狀態：** ✅ 完全支援

#### while 與 do-while 的差異

```javascript
// while：可能一次都不執行
function whileExample() {
  var i = 10;
  while (i < 5) {
    Logger.log(i); // 不會執行
    i++;
  }
}

// do-while：至少執行一次
function doWhileExample() {
  var i = 10;
  do {
    Logger.log(i); // 會執行一次，輸出 10
    i++;
  } while (i < 5);
}
```

### 2.4 for...of 迴圈（需要 V8 Runtime）

for...of 是現代 JavaScript 提供的陣列遍歷語法，更簡潔易讀。

#### 基本語法

```javascript
for (var item of array) {
  // 處理每個元素
}
```

#### 範例

```javascript
function printFruits() {
  var fruits = ['蘋果', '香蕉', '橘子'];
  
  for (var fruit of fruits) {
    Logger.log(fruit);
  }
}
```

**GAS 支援狀態：** ⚠️ 需要啟用 V8 Runtime

#### 傳統替代方案

如果未啟用 V8 Runtime，請使用傳統 for 迴圈或 forEach：

```javascript
// 方法 1：傳統 for 迴圈
function printFruitsTraditional() {
  var fruits = ['蘋果', '香蕉', '橘子'];
  
  for (var i = 0; i < fruits.length; i++) {
    Logger.log(fruits[i]);
  }
}

// 方法 2：forEach（GAS 完全支援）
function printFruitsForEach() {
  var fruits = ['蘋果', '香蕉', '橘子'];
  
  fruits.forEach(function(fruit) {
    Logger.log(fruit);
  });
}
```

---

## 3. 迴圈控制

### 3.1 break 語句

break 用於立即跳出迴圈。

#### 範例

```javascript
function findNumber(target) {
  for (var i = 1; i <= 100; i++) {
    if (i === target) {
      Logger.log('找到了：' + i);
      break; // 找到後立即跳出
    }
  }
}
```

**GAS 支援狀態：** ✅ 完全支援

#### 在巢狀迴圈中使用

```javascript
function findPair() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 5; j++) {
      if (i * j === 12) {
        Logger.log('找到配對：' + i + ' x ' + j + ' = 12');
        break; // 只跳出內層迴圈
      }
    }
  }
}
```

### 3.2 continue 語句

continue 用於跳過本次迴圈，繼續下一次迴圈。

#### 範例

```javascript
function printOddNumbers() {
  for (var i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      continue; // 跳過偶數
    }
    Logger.log(i);
  }
}
// 輸出：1, 3, 5, 7, 9
```

**GAS 支援狀態：** ✅ 完全支援

#### 實際應用

```javascript
function processValidScores(scores) {
  var total = 0;
  var count = 0;
  
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] < 0 || scores[i] > 100) {
      continue; // 跳過無效分數
    }
    total += scores[i];
    count++;
  }
  
  return count > 0 ? total / count : 0;
}

// 使用範例
var scores = [85, -5, 92, 150, 78, 88];
Logger.log('平均分數：' + processValidScores(scores)); // 只計算有效分數
```

---

## 4. 流程控制最佳實踐

### 4.1 避免無窮迴圈

```javascript
// ❌ 錯誤：無窮迴圈
function badLoop() {
  var i = 1;
  while (i <= 10) {
    Logger.log(i);
    // 忘記遞增 i，造成無窮迴圈
  }
}

// ✅ 正確：確保條件會改變
function goodLoop() {
  var i = 1;
  while (i <= 10) {
    Logger.log(i);
    i++; // 記得遞增
  }
}
```

### 4.2 選擇適當的迴圈類型

- **for 迴圈**：已知執行次數
- **while 迴圈**：不確定執行次數，先檢查條件
- **do-while 迴圈**：至少執行一次
- **forEach**：遍歷陣列（推薦）

### 4.3 簡化條件判斷

```javascript
// ❌ 複雜的巢狀判斷
function checkStatusBad(score) {
  if (score >= 60) {
    if (score >= 80) {
      if (score >= 90) {
        return '優';
      } else {
        return '良';
      }
    } else {
      return '可';
    }
  } else {
    return '不及格';
  }
}

// ✅ 使用 early return 簡化
function checkStatusGood(score) {
  if (score >= 90) return '優';
  if (score >= 80) return '良';
  if (score >= 60) return '可';
  return '不及格';
}
```

---

## 5. GAS 語法支援總結

| 語法 | 支援狀態 | 說明 |
|------|---------|------|
| if-else | ✅ 完全支援 | 所有條件判斷語法 |
| switch-case | ✅ 完全支援 | 多分支選擇 |
| for 迴圈 | ✅ 完全支援 | 傳統 for 迴圈 |
| while 迴圈 | ✅ 完全支援 | 條件迴圈 |
| do-while 迴圈 | ✅ 完全支援 | 至少執行一次 |
| break | ✅ 完全支援 | 跳出迴圈 |
| continue | ✅ 完全支援 | 跳過本次迴圈 |
| for...of | ⚠️ 需 V8 Runtime | 現代陣列遍歷語法 |

---

## 6. 實用範例

### 範例 1：計算總和

```javascript
function calculateSum(numbers) {
  var sum = 0;
  
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  return sum;
}
```

### 範例 2：尋找最大值

```javascript
function findMax(numbers) {
  if (numbers.length === 0) return null;
  
  var max = numbers[0];
  
  for (var i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  
  return max;
}
```

### 範例 3：過濾陣列

```javascript
function filterPassingScores(scores) {
  var passing = [];
  
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
      passing.push(scores[i]);
    }
  }
  
  return passing;
}
```

---

## 練習時間

完成 `02-flow-control-exercises.gs` 中的 15 個練習題，鞏固流程控制的概念！

---

## 延伸閱讀

- [MDN - if...else](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN - switch](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/switch)
- [MDN - for](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/for)
- [MDN - while](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/while)
