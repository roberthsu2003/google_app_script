# 函式 (Functions)

## 學習目標
- 理解函式的概念與用途
- 掌握函式的定義與呼叫方式
- 了解參數傳遞與回傳值
- 理解函式作用域 (Scope)
- 認識箭頭函式與 V8 runtime 需求

---

## 1. 什麼是函式？

函式是一段可以重複使用的程式碼區塊，用來完成特定的任務。使用函式可以：
- **避免重複撰寫相同的程式碼**
- **提高程式碼的可讀性與維護性**
- **將複雜問題拆解成小單元**
- **方便測試與除錯**

### 函式的基本概念
```javascript
// 定義函式
function sayHello() {
  Logger.log('Hello, World!');
}

// 呼叫函式
sayHello();  // 輸出: Hello, World!
```

---

## 2. 函式定義與呼叫

### 2.1 基本語法（✅ GAS 完全支援）

```javascript
function 函式名稱(參數1, 參數2, ...) {
  // 函式主體
  // 執行的程式碼
  return 回傳值;  // 可選
}
```

### 2.2 無參數函式

```javascript
function greet() {
  Logger.log('歡迎使用 Google Apps Script!');
}

greet();  // 呼叫函式
```

### 2.3 有參數函式

```javascript
function greetUser(name) {
  Logger.log('你好，' + name + '!');
}

greetUser('小明');  // 輸出: 你好，小明!
greetUser('小華');  // 輸出: 你好，小華!
```

### 2.4 多個參數

```javascript
function addNumbers(a, b) {
  var sum = a + b;
  Logger.log(a + ' + ' + b + ' = ' + sum);
}

addNumbers(5, 3);   // 輸出: 5 + 3 = 8
addNumbers(10, 20); // 輸出: 10 + 20 = 30
```

---

## 3. 參數傳遞

### 3.1 必要參數與選擇性參數

```javascript
// 所有參數都是選擇性的，未傳入的參數值為 undefined
function introduce(name, age, city) {
  Logger.log('姓名: ' + name);
  Logger.log('年齡: ' + age);
  Logger.log('城市: ' + city);
}

introduce('小明', 20, '台北');
// 輸出:
// 姓名: 小明
// 年齡: 20
// 城市: 台北

introduce('小華');
// 輸出:
// 姓名: 小華
// 年齡: undefined
// 城市: undefined
```

### 3.2 預設參數值

```javascript
function greetWithDefault(name, greeting) {
  // 如果 greeting 未提供，使用預設值
  if (greeting === undefined) {
    greeting = '你好';
  }
  Logger.log(greeting + '，' + name + '!');
}

greetWithDefault('小明', '早安');  // 輸出: 早安，小明!
greetWithDefault('小華');          // 輸出: 你好，小華!
```

### 3.3 參數數量不固定 - arguments 物件

```javascript
function sumAll() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

Logger.log(sumAll(1, 2, 3));        // 輸出: 6
Logger.log(sumAll(5, 10, 15, 20));  // 輸出: 50
```

---

## 4. 回傳值 (Return Value)

### 4.1 使用 return 回傳結果

```javascript
function multiply(a, b) {
  return a * b;
}

var result = multiply(4, 5);
Logger.log(result);  // 輸出: 20

// 可以直接在運算式中使用
Logger.log('10 × 3 = ' + multiply(10, 3));  // 輸出: 10 × 3 = 30
```

### 4.2 沒有 return 的函式

```javascript
function printMessage(msg) {
  Logger.log(msg);
  // 沒有 return，函式會回傳 undefined
}

var result = printMessage('測試訊息');
Logger.log(result);  // 輸出: undefined
```

### 4.3 提前結束函式

```javascript
function divide(a, b) {
  if (b === 0) {
    Logger.log('錯誤：除數不能為 0');
    return;  // 提前結束函式
  }
  return a / b;
}

Logger.log(divide(10, 2));  // 輸出: 5
divide(10, 0);              // 輸出: 錯誤：除數不能為 0
```

### 4.4 回傳物件或陣列

```javascript
function getStudentInfo(name, score) {
  return {
    name: name,
    score: score,
    passed: score >= 60
  };
}

var student = getStudentInfo('小明', 85);
Logger.log(student.name);    // 輸出: 小明
Logger.log(student.passed);  // 輸出: true
```

---

## 5. 函式作用域 (Scope)（✅ GAS 完全支援）

### 5.1 全域變數 vs 區域變數

```javascript
var globalVar = '我是全域變數';

function testScope() {
  var localVar = '我是區域變數';
  Logger.log(globalVar);  // 可以存取全域變數
  Logger.log(localVar);   // 可以存取區域變數
}

testScope();
Logger.log(globalVar);  // 可以存取全域變數
// Logger.log(localVar);  // 錯誤！無法存取區域變數
```

### 5.2 變數遮蔽 (Variable Shadowing)

```javascript
var name = '全域小明';

function showName() {
  var name = '區域小華';  // 遮蔽全域變數
  Logger.log(name);       // 輸出: 區域小華
}

showName();
Logger.log(name);  // 輸出: 全域小明
```

### 5.3 巢狀函式

```javascript
function outer() {
  var outerVar = '外層變數';
  
  function inner() {
    var innerVar = '內層變數';
    Logger.log(outerVar);  // 可以存取外層變數
    Logger.log(innerVar);  // 可以存取內層變數
  }
  
  inner();
  // Logger.log(innerVar);  // 錯誤！無法存取內層變數
}

outer();
```

---

## 6. 函式命名規範

### 6.1 命名原則
- 使用有意義的名稱，清楚描述函式功能
- 使用駝峰式命名法 (camelCase)
- 動詞開頭，表示動作：`calculateTotal`, `getUserName`, `sendEmail`
- 布林值回傳的函式可用 `is`, `has`, `can` 開頭：`isValid`, `hasPermission`, `canEdit`

### 6.2 良好的命名範例

```javascript
// ✅ 好的命名
function calculateAverage(scores) { /* ... */ }
function sendWelcomeEmail(userEmail) { /* ... */ }
function isValidEmail(email) { /* ... */ }
function getUserById(id) { /* ... */ }

// ❌ 不好的命名
function calc(s) { /* ... */ }
function doStuff() { /* ... */ }
function x(a, b) { /* ... */ }
```

---

## 7. 箭頭函式 (Arrow Functions)（⚠️ 需 V8 Runtime）

### 7.1 箭頭函式語法

箭頭函式是 ES6 引入的新語法，提供更簡潔的函式寫法。

**⚠️ 重要：箭頭函式僅在啟用 V8 runtime 後才支援！**

```javascript
// 傳統函式寫法（✅ GAS 完全支援）
var add = function(a, b) {
  return a + b;
};

// 箭頭函式寫法（⚠️ 需 V8 runtime）
var add = (a, b) => {
  return a + b;
};

// 更簡潔的寫法（單一運算式可省略 return）
var add = (a, b) => a + b;
```

### 7.2 箭頭函式的不同形式

```javascript
// 無參數
var greet = () => Logger.log('Hello!');

// 單一參數（可省略括號）
var square = x => x * x;

// 多個參數
var multiply = (a, b) => a * b;

// 多行程式碼（需要大括號和 return）
var calculateGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};
```

### 7.3 箭頭函式在陣列方法中的應用

```javascript
// 傳統寫法（✅ GAS 完全支援）
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function(n) {
  return n * 2;
});

// 箭頭函式寫法（⚠️ 需 V8 runtime）
var doubled = numbers.map(n => n * 2);
```

### 7.4 如何啟用 V8 Runtime

1. 開啟 Apps Script 專案
2. 點選左側「專案設定」（齒輪圖示）
3. 勾選「啟用 Chrome V8 runtime」
4. 儲存設定

**建議：**
- 新專案建議啟用 V8 runtime，可使用現代 JavaScript 語法
- 本課程範例優先使用傳統語法，確保在任何環境都能執行
- 學習箭頭函式有助於閱讀現代 JavaScript 程式碼

---

## 8. 函式的最佳實踐

### 8.1 單一職責原則
每個函式應該只做一件事，並把它做好。

```javascript
// ❌ 不好：函式做太多事
function processUser(name, email, age) {
  // 驗證資料
  if (!name || !email) return false;
  // 計算年齡分類
  var category = age < 18 ? '未成年' : '成年';
  // 發送郵件
  MailApp.sendEmail(email, '歡迎', '歡迎 ' + name);
  // 記錄到試算表
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([name, email, age, category]);
}

// ✅ 好：拆分成多個函式
function validateUser(name, email) {
  return name && email;
}

function getAgeCategory(age) {
  return age < 18 ? '未成年' : '成年';
}

function sendWelcomeEmail(email, name) {
  MailApp.sendEmail(email, '歡迎', '歡迎 ' + name);
}

function saveUserToSheet(name, email, age, category) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([name, email, age, category]);
}
```

### 8.2 避免過多參數
如果函式需要很多參數，考慮使用物件。

```javascript
// ❌ 參數太多
function createUser(name, email, age, city, phone, address) {
  // ...
}

// ✅ 使用物件
function createUser(userInfo) {
  var name = userInfo.name;
  var email = userInfo.email;
  var age = userInfo.age;
  // ...
}

// 呼叫時更清楚
createUser({
  name: '小明',
  email: 'ming@example.com',
  age: 20,
  city: '台北'
});
```

### 8.3 適當的註解

```javascript
/**
 * 計算學生的平均成績
 * @param {Array} scores - 成績陣列
 * @return {number} 平均成績（四捨五入到小數點後兩位）
 */
function calculateAverage(scores) {
  if (scores.length === 0) return 0;
  
  var sum = 0;
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  
  var average = sum / scores.length;
  return Math.round(average * 100) / 100;
}
```

---

## 9. 常見錯誤與除錯

### 9.1 忘記呼叫函式

```javascript
function sayHello() {
  Logger.log('Hello!');
}

sayHello;   // ❌ 錯誤：沒有執行函式
sayHello(); // ✅ 正確：有執行函式
```

### 9.2 參數數量不符

```javascript
function add(a, b) {
  return a + b;
}

Logger.log(add(5));      // 輸出: NaN (5 + undefined)
Logger.log(add(5, 3));   // 輸出: 8
Logger.log(add(5, 3, 2)); // 輸出: 8 (忽略第三個參數)
```

### 9.3 忘記 return

```javascript
function multiply(a, b) {
  a * b;  // ❌ 忘記 return
}

var result = multiply(3, 4);
Logger.log(result);  // 輸出: undefined

// ✅ 正確寫法
function multiply(a, b) {
  return a * b;
}
```

---

## 10. 實用範例

### 範例 1：判斷閏年

```javascript
function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

Logger.log(isLeapYear(2024));  // true
Logger.log(isLeapYear(2023));  // false
```

### 範例 2：格式化日期

```javascript
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  
  // 補零
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  
  return year + '-' + month + '-' + day;
}

var today = new Date();
Logger.log(formatDate(today));  // 例如: 2024-03-15
```

### 範例 3：驗證 Email

```javascript
function isValidEmail(email) {
  if (!email) return false;
  
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

Logger.log(isValidEmail('test@example.com'));  // true
Logger.log(isValidEmail('invalid-email'));     // false
```

---

## 總結

### 重點回顧
1. ✅ **函式定義與呼叫**：使用 `function` 關鍵字定義，加上 `()` 呼叫
2. ✅ **參數傳遞**：可以傳入多個參數，未傳入的參數為 `undefined`
3. ✅ **回傳值**：使用 `return` 回傳結果，沒有 `return` 則回傳 `undefined`
4. ✅ **作用域**：區域變數只在函式內有效，全域變數可在任何地方存取
5. ⚠️ **箭頭函式**：需要啟用 V8 runtime 才能使用

### GAS 支援狀態
- ✅ **完全支援**：傳統函式語法、參數、回傳值、作用域
- ⚠️ **需 V8 runtime**：箭頭函式、預設參數（ES6 語法）

### 下一步
完成函式練習題，熟練函式的定義與使用，為後續的陣列操作與物件處理打好基礎！
