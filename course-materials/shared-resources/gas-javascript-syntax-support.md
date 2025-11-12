# GAS JavaScript 語法支援對照表

本文件詳細列出 Google Apps Script 對各種 JavaScript 語法的支援情況，幫助學習者快速查詢並選擇適當的語法。

## 使用說明

- ✅ **完全支援**：無需啟用 V8 runtime，可直接使用
- ⚠️ **需要 V8 Runtime**：必須啟用 V8 runtime 才能使用
- ❌ **不支援**：即使啟用 V8 runtime 也無法使用

## V8 Runtime 啟用方式

1. 開啟 Apps Script 專案
2. 點選左側「專案設定」（齒輪圖示）
3. 勾選「啟用 Chrome V8 runtime」
4. 儲存設定

**建議：** 新專案建議啟用 V8 runtime，以使用現代 JavaScript 語法。

---

## 1. 變數宣告

| 語法 | 支援狀態 | 說明 | 替代方案 |
|------|---------|------|---------|
| `var` | ✅ 完全支援 | 傳統變數宣告，函式作用域 | - |
| `let` | ⚠️ 需要 V8 | 區塊作用域變數 | 使用 `var` |
| `const` | ⚠️ 需要 V8 | 區塊作用域常數 | 使用 `var` |

### 範例

```javascript
// ✅ 完全支援
var name = '王小明';
var age = 20;

// ⚠️ 需要 V8 Runtime
let score = 85;
const PI = 3.14159;
```

---

## 2. 資料型別

| 型別 | 支援狀態 | 說明 |
|------|---------|------|
| String | ✅ 完全支援 | 字串型別 |
| Number | ✅ 完全支援 | 數字型別 |
| Boolean | ✅ 完全支援 | 布林值 |
| Null | ✅ 完全支援 | 空值 |
| Undefined | ✅ 完全支援 | 未定義 |
| Object | ✅ 完全支援 | 物件型別 |
| Array | ✅ 完全支援 | 陣列型別 |
| Symbol | ⚠️ 需要 V8 | 符號型別 |

---

## 3. 運算子

| 運算子類型 | 支援狀態 | 包含運算子 |
|-----------|---------|-----------|
| 算術運算子 | ✅ 完全支援 | `+`, `-`, `*`, `/`, `%`, `++`, `--` |
| 比較運算子 | ✅ 完全支援 | `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=` |
| 邏輯運算子 | ✅ 完全支援 | `&&`, `||`, `!` |
| 賦值運算子 | ✅ 完全支援 | `=`, `+=`, `-=`, `*=`, `/=`, `%=` |
| 三元運算子 | ✅ 完全支援 | `condition ? true : false` |
| 展開運算子 | ⚠️ 需要 V8 | `...` (spread operator) |
| 可選鏈 | ⚠️ 需要 V8 | `?.` (optional chaining) |
| 空值合併 | ⚠️ 需要 V8 | `??` (nullish coalescing) |

---

## 4. 流程控制

| 語法 | 支援狀態 | 說明 | 替代方案 |
|------|---------|------|---------|
| `if-else` | ✅ 完全支援 | 條件判斷 | - |
| `switch-case` | ✅ 完全支援 | 多條件判斷 | - |
| `? :` (三元) | ✅ 完全支援 | 簡短條件判斷 | - |

---

## 5. 迴圈

| 語法 | 支援狀態 | 說明 | 替代方案 |
|------|---------|------|---------|
| `for` | ✅ 完全支援 | 傳統 for 迴圈 | - |
| `while` | ✅ 完全支援 | while 迴圈 | - |
| `do-while` | ✅ 完全支援 | do-while 迴圈 | - |
| `for...in` | ✅ 完全支援 | 遍歷物件屬性 | - |
| `for...of` | ⚠️ 需要 V8 | 遍歷可迭代物件 | 使用傳統 `for` 或 `forEach` |
| `break` | ✅ 完全支援 | 跳出迴圈 | - |
| `continue` | ✅ 完全支援 | 跳過本次迭代 | - |

### 範例

```javascript
// ✅ 完全支援
for (var i = 0; i < 10; i++) {
  Logger.log(i);
}

var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  Logger.log(arr[i]);
}

// ⚠️ 需要 V8 Runtime
for (var item of arr) {
  Logger.log(item);
}
```

---

## 6. 函式

| 語法 | 支援狀態 | 說明 | 替代方案 |
|------|---------|------|---------|
| `function` 宣告 | ✅ 完全支援 | 傳統函式宣告 | - |
| 函式表達式 | ✅ 完全支援 | `var fn = function() {}` | - |
| 箭頭函式 | ⚠️ 需要 V8 | `() => {}` | 使用 `function` |
| 預設參數 | ⚠️ 需要 V8 | `function(a = 1) {}` | 手動檢查 `undefined` |
| 其餘參數 | ⚠️ 需要 V8 | `function(...args) {}` | 使用 `arguments` |
| `arguments` | ✅ 完全支援 | 函式參數物件 | - |

### 範例

```javascript
// ✅ 完全支援
function add(a, b) {
  return a + b;
}

var multiply = function(a, b) {
  return a * b;
};

// ⚠️ 需要 V8 Runtime
var subtract = (a, b) => a - b;

function greet(name = '訪客') {
  return '你好，' + name;
}
```

---

## 7. 陣列方法

### 完全支援的方法

| 方法 | 說明 | 範例 |
|------|------|------|
| `push()` | 新增元素到陣列末端 | `arr.push(4)` |
| `pop()` | 移除並回傳最後一個元素 | `arr.pop()` |
| `shift()` | 移除並回傳第一個元素 | `arr.shift()` |
| `unshift()` | 新增元素到陣列開頭 | `arr.unshift(0)` |
| `splice()` | 新增/移除元素 | `arr.splice(1, 2)` |
| `slice()` | 複製陣列片段 | `arr.slice(1, 3)` |
| `concat()` | 合併陣列 | `arr1.concat(arr2)` |
| `join()` | 轉換為字串 | `arr.join(',')` |
| `reverse()` | 反轉陣列 | `arr.reverse()` |
| `sort()` | 排序陣列 | `arr.sort()` |
| `indexOf()` | 尋找元素索引 | `arr.indexOf(3)` |
| `lastIndexOf()` | 從後尋找元素索引 | `arr.lastIndexOf(3)` |

### 完全支援的高階方法

| 方法 | 說明 | 範例 |
|------|------|------|
| `forEach()` | 遍歷陣列 | `arr.forEach(function(item) {})` |
| `map()` | 映射轉換 | `arr.map(function(x) { return x * 2; })` |
| `filter()` | 過濾元素 | `arr.filter(function(x) { return x > 5; })` |
| `reduce()` | 累積計算 | `arr.reduce(function(sum, x) { return sum + x; }, 0)` |
| `some()` | 檢查是否有元素符合 | `arr.some(function(x) { return x > 10; })` |
| `every()` | 檢查是否全部符合 | `arr.every(function(x) { return x > 0; })` |

### 需要 V8 Runtime 的方法

| 方法 | 支援狀態 | 替代方案 |
|------|---------|---------|
| `includes()` | ⚠️ 需要 V8 | 使用 `indexOf() !== -1` |
| `find()` | ⚠️ 需要 V8 | 使用 `filter()[0]` |
| `findIndex()` | ⚠️ 需要 V8 | 手動實作 |
| `flat()` | ⚠️ 需要 V8 | 手動實作 |
| `flatMap()` | ⚠️ 需要 V8 | 使用 `map()` + `concat()` |
| `from()` | ⚠️ 需要 V8 | 手動轉換 |

### 範例

```javascript
var arr = [1, 2, 3, 4, 5];

// ✅ 完全支援
var doubled = arr.map(function(x) {
  return x * 2;
});

var filtered = arr.filter(function(x) {
  return x > 2;
});

var sum = arr.reduce(function(total, x) {
  return total + x;
}, 0);

// ⚠️ 需要 V8 Runtime
var hasThree = arr.includes(3);

// ✅ 替代方案
var hasThree = arr.indexOf(3) !== -1;
```

---

## 8. 物件操作

| 語法/方法 | 支援狀態 | 說明 | 替代方案 |
|----------|---------|------|---------|
| 物件字面量 | ✅ 完全支援 | `{key: value}` | - |
| 點記法存取 | ✅ 完全支援 | `obj.property` | - |
| 括號記法存取 | ✅ 完全支援 | `obj['property']` | - |
| `for...in` | ✅ 完全支援 | 遍歷物件屬性 | - |
| `Object.keys()` | ✅ 完全支援 | 取得所有鍵 | - |
| `Object.values()` | ⚠️ 需要 V8 | 取得所有值 | 手動遍歷 |
| `Object.entries()` | ⚠️ 需要 V8 | 取得鍵值對陣列 | 手動遍歷 |
| `Object.assign()` | ⚠️ 需要 V8 | 合併物件 | 手動複製屬性 |
| 解構賦值 | ⚠️ 需要 V8 | `var {a, b} = obj` | 逐一取值 |
| 展開運算子 | ⚠️ 需要 V8 | `{...obj}` | 使用迴圈複製 |
| 簡寫屬性 | ⚠️ 需要 V8 | `{name}` 等同 `{name: name}` | 完整寫法 |
| 簡寫方法 | ⚠️ 需要 V8 | `{method() {}}` | `{method: function() {}}` |

### 範例

```javascript
// ✅ 完全支援
var student = {
  name: '王小明',
  age: 20,
  greet: function() {
    return '你好，我是 ' + this.name;
  }
};

var keys = Object.keys(student);
Logger.log(keys); // ['name', 'age', 'greet']

for (var key in student) {
  Logger.log(key + ': ' + student[key]);
}

// ⚠️ 需要 V8 Runtime
var {name, age} = student;
var newStudent = {...student, grade: 'A'};
```

---

## 9. 字串操作

### 完全支援的方法

| 方法 | 說明 | 範例 |
|------|------|------|
| `length` | 字串長度 | `str.length` |
| `charAt()` | 取得指定位置字元 | `str.charAt(0)` |
| `charCodeAt()` | 取得字元編碼 | `str.charCodeAt(0)` |
| `concat()` | 連接字串 | `str1.concat(str2)` |
| `indexOf()` | 尋找子字串 | `str.indexOf('hello')` |
| `lastIndexOf()` | 從後尋找子字串 | `str.lastIndexOf('world')` |
| `substring()` | 擷取子字串 | `str.substring(0, 5)` |
| `substr()` | 擷取子字串 | `str.substr(0, 5)` |
| `slice()` | 擷取子字串 | `str.slice(0, 5)` |
| `split()` | 分割字串 | `str.split(',')` |
| `replace()` | 取代字串 | `str.replace('old', 'new')` |
| `toLowerCase()` | 轉小寫 | `str.toLowerCase()` |
| `toUpperCase()` | 轉大寫 | `str.toUpperCase()` |
| `trim()` | 移除前後空白 | `str.trim()` |
| `match()` | 正規表達式比對 | `str.match(/pattern/)` |
| `search()` | 搜尋正規表達式 | `str.search(/pattern/)` |

### 字串連接

| 語法 | 支援狀態 | 說明 | 範例 |
|------|---------|------|------|
| `+` 運算子 | ✅ 完全支援 | 傳統字串連接 | `'Hello ' + name` |
| 模板字串 | ⚠️ 需要 V8 | 使用反引號 | `` `Hello ${name}` `` |

### 範例

```javascript
var name = '王小明';
var age = 20;

// ✅ 完全支援
var message = '你好，' + name + '，你今年 ' + age + ' 歲';
var upper = name.toUpperCase();
var parts = message.split('，');

// ⚠️ 需要 V8 Runtime
var message = `你好，${name}，你今年 ${age} 歲`;
```

---

## 10. JSON 處理

| 方法 | 支援狀態 | 說明 |
|------|---------|------|
| `JSON.stringify()` | ✅ 完全支援 | 物件轉 JSON 字串 |
| `JSON.parse()` | ✅ 完全支援 | JSON 字串轉物件 |

### 範例

```javascript
// ✅ 完全支援
var obj = {name: '王小明', age: 20};
var jsonStr = JSON.stringify(obj);
Logger.log(jsonStr); // {"name":"王小明","age":20}

var parsed = JSON.parse(jsonStr);
Logger.log(parsed.name); // 王小明
```

---

## 11. 錯誤處理

| 語法 | 支援狀態 | 說明 |
|------|---------|------|
| `try-catch` | ✅ 完全支援 | 捕捉錯誤 |
| `try-catch-finally` | ✅ 完全支援 | 捕捉錯誤並執行清理 |
| `throw` | ✅ 完全支援 | 拋出錯誤 |
| `Error` 物件 | ✅ 完全支援 | 建立錯誤物件 |

### 範例

```javascript
// ✅ 完全支援
try {
  var result = riskyOperation();
  Logger.log(result);
} catch (error) {
  Logger.log('發生錯誤: ' + error.message);
} finally {
  Logger.log('清理資源');
}

function validateAge(age) {
  if (age < 0) {
    throw new Error('年齡不能為負數');
  }
  return true;
}
```

---

## 12. 除錯工具

| 工具 | 支援狀態 | 說明 | 使用場景 |
|------|---------|------|---------|
| `Logger.log()` | ✅ 完全支援 | GAS 專用日誌 | 所有環境 |
| `console.log()` | ⚠️ 需要 V8 | 標準 console 輸出 | V8 runtime |
| `console.error()` | ⚠️ 需要 V8 | 錯誤訊息輸出 | V8 runtime |
| `console.warn()` | ⚠️ 需要 V8 | 警告訊息輸出 | V8 runtime |

### 範例

```javascript
// ✅ 完全支援（建議使用）
Logger.log('這是一般訊息');
Logger.log('變數值: ' + myVar);

// ⚠️ 需要 V8 Runtime
console.log('這是一般訊息');
console.error('這是錯誤訊息');
console.warn('這是警告訊息');
```

---

## 13. 類別與物件導向

| 語法 | 支援狀態 | 說明 | 替代方案 |
|------|---------|------|---------|
| 建構函式 | ✅ 完全支援 | `function Constructor() {}` | - |
| `prototype` | ✅ 完全支援 | 原型繼承 | - |
| `class` 語法 | ⚠️ 需要 V8 | ES6 類別語法 | 使用建構函式 |
| `extends` | ⚠️ 需要 V8 | 類別繼承 | 使用原型鏈 |
| `super` | ⚠️ 需要 V8 | 呼叫父類別 | 手動呼叫 |

### 範例

```javascript
// ✅ 完全支援
function Student(name, age) {
  this.name = name;
  this.age = age;
}

Student.prototype.greet = function() {
  return '你好，我是 ' + this.name;
};

var student = new Student('王小明', 20);
Logger.log(student.greet());

// ⚠️ 需要 V8 Runtime
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `你好，我是 ${this.name}`;
  }
}
```

---

## 14. Promise 與非同步

| 語法 | 支援狀態 | 說明 |
|------|---------|------|
| `Promise` | ⚠️ 需要 V8 | Promise 物件 |
| `async/await` | ⚠️ 需要 V8 | 非同步語法糖 |
| `setTimeout()` | ❌ 不支援 | GAS 不支援 |
| `setInterval()` | ❌ 不支援 | GAS 不支援 |

**注意：** GAS 是同步執行環境，不支援傳統的非同步操作。使用時間觸發器來實現定時任務。

---

## 15. 正規表達式

| 語法 | 支援狀態 | 說明 |
|------|---------|------|
| `/pattern/` | ✅ 完全支援 | 正規表達式字面量 |
| `RegExp` | ✅ 完全支援 | RegExp 建構函式 |
| `test()` | ✅ 完全支援 | 測試是否符合 |
| `exec()` | ✅ 完全支援 | 執行比對 |
| `match()` | ✅ 完全支援 | 字串比對方法 |
| `replace()` | ✅ 完全支援 | 字串取代方法 |

---

## 快速參考：常用語法選擇指南

### 變數宣告
- ✅ 使用 `var`（相容性最佳）
- ⚠️ 啟用 V8 後可使用 `let` 和 `const`

### 函式定義
- ✅ 使用 `function` 宣告（相容性最佳）
- ⚠️ 啟用 V8 後可使用箭頭函式

### 字串處理
- ✅ 使用 `+` 連接字串（相容性最佳）
- ⚠️ 啟用 V8 後可使用模板字串

### 陣列遍歷
- ✅ 使用 `forEach`、`map`、`filter`（相容性最佳）
- ⚠️ 啟用 V8 後可使用 `for...of`

### 物件操作
- ✅ 使用 `Object.keys()` + `for` 迴圈（相容性最佳）
- ⚠️ 啟用 V8 後可使用解構賦值和展開運算子

### 除錯
- ✅ 使用 `Logger.log()`（相容性最佳）
- ⚠️ 啟用 V8 後可使用 `console.log()`

---

## 總結

### 建議的開發策略

1. **新專案**：建議啟用 V8 runtime，可使用現代 JavaScript 語法
2. **舊專案**：保持使用傳統語法，確保相容性
3. **教學用途**：優先教授完全支援的語法，再介紹 V8 runtime 功能
4. **生產環境**：評估團隊技術水平，選擇適當的語法風格

### 學習路徑建議

1. 先掌握完全支援的基礎語法
2. 完成基本實作案例
3. 啟用 V8 runtime 學習現代語法
4. 比較兩種寫法的差異
5. 根據專案需求選擇適當語法

---

**最後更新：** 2024 年

**參考資源：**
- [Google Apps Script 官方文件](https://developers.google.com/apps-script)
- [V8 Runtime 說明](https://developers.google.com/apps-script/guides/v8-runtime)
