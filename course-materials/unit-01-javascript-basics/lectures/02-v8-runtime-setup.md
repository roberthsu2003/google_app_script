# V8 Runtime 啟用教學

## 什麼是 V8 Runtime？

V8 是 Google Chrome 瀏覽器使用的 JavaScript 引擎，也是 Node.js 的核心。Google Apps Script 支援使用 V8 引擎來執行程式碼，讓你可以使用現代 JavaScript 的新語法。

## 為什麼要啟用 V8 Runtime？

### Rhino Runtime（舊版，預設）的限制

GAS 預設使用 Rhino Runtime，這是較舊的 JavaScript 引擎，有以下限制：

❌ **不支援的語法：**
- `let` 和 `const` 變數宣告
- 箭頭函式 `() => {}`
- 模板字串 `` `Hello ${name}` ``
- 解構賦值 `const {a, b} = obj`
- 展開運算子 `...array`
- `for...of` 迴圈
- `Promise` 和 `async/await`
- 許多現代陣列方法（如 `includes`、`flat`、`flatMap`）

### V8 Runtime（新版）的優勢

✅ **支援現代 JavaScript 語法：**
- ES6+ 所有新語法
- 更好的效能
- 更豐富的內建方法
- 與現代 JavaScript 開發一致

## 如何啟用 V8 Runtime？

### 步驟 1：開啟專案設定

1. 在 GAS 編輯器中，點選左側的「專案設定」圖示（⚙️ 齒輪）
2. 或點選上方選單「專案設定」

### 步驟 2：啟用 V8 Runtime

1. 在「專案設定」頁面中，找到「一般設定」區塊
2. 勾選「啟用 Chrome V8 runtime」選項
3. 系統會自動儲存設定

### 步驟 3：確認啟用成功

回到程式碼編輯器，你現在可以使用現代 JavaScript 語法了！

## 語法對照表

以下是常用語法在兩種 Runtime 下的支援情況：

### 變數宣告

| 語法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `var` | ✅ | ✅ | 傳統變數宣告 |
| `let` | ❌ | ✅ | 區塊作用域變數 |
| `const` | ❌ | ✅ | 常數宣告 |

**Rhino 寫法：**
```javascript
var name = '小明';
var age = 20;
```

**V8 寫法：**
```javascript
const name = '小明';
let age = 20;
```

### 函式定義

| 語法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `function` | ✅ | ✅ | 傳統函式 |
| `() => {}` | ❌ | ✅ | 箭頭函式 |

**Rhino 寫法：**
```javascript
function add(a, b) {
  return a + b;
}

var numbers = [1, 2, 3];
var doubled = numbers.map(function(n) {
  return n * 2;
});
```

**V8 寫法：**
```javascript
const add = (a, b) => a + b;

const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
```

### 字串處理

| 語法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `+` 連接 | ✅ | ✅ | 字串連接 |
| 模板字串 | ❌ | ✅ | 更方便的字串格式化 |

**Rhino 寫法：**
```javascript
var name = '小明';
var age = 20;
var message = '我是' + name + '，今年' + age + '歲';
```

**V8 寫法：**
```javascript
const name = '小明';
const age = 20;
const message = `我是${name}，今年${age}歲`;
```

### 陣列方法

| 方法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `forEach`, `map`, `filter`, `reduce` | ✅ | ✅ | 基本陣列方法 |
| `includes` | ❌ | ✅ | 檢查元素是否存在 |
| `find`, `findIndex` | ❌ | ✅ | 尋找元素 |
| `flat`, `flatMap` | ❌ | ✅ | 陣列扁平化 |

**Rhino 寫法：**
```javascript
var numbers = [1, 2, 3, 4, 5];
var hasThree = numbers.indexOf(3) !== -1; // 檢查是否包含 3
```

**V8 寫法：**
```javascript
const numbers = [1, 2, 3, 4, 5];
const hasThree = numbers.includes(3); // 更直觀
```

### 物件操作

| 語法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| 物件字面量 | ✅ | ✅ | 基本物件建立 |
| 解構賦值 | ❌ | ✅ | 快速提取屬性 |
| 展開運算子 | ❌ | ✅ | 複製/合併物件 |

**Rhino 寫法：**
```javascript
var person = {name: '小明', age: 20};
var name = person.name;
var age = person.age;

// 複製物件
var newPerson = {};
for (var key in person) {
  newPerson[key] = person[key];
}
```

**V8 寫法：**
```javascript
const person = {name: '小明', age: 20};
const {name, age} = person; // 解構賦值

// 複製物件
const newPerson = {...person}; // 展開運算子
```

### 迴圈

| 語法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `for`, `while` | ✅ | ✅ | 傳統迴圈 |
| `for...in` | ✅ | ✅ | 遍歷物件屬性 |
| `for...of` | ❌ | ✅ | 遍歷陣列元素 |

**Rhino 寫法：**
```javascript
var numbers = [1, 2, 3];
for (var i = 0; i < numbers.length; i++) {
  Logger.log(numbers[i]);
}
```

**V8 寫法：**
```javascript
const numbers = [1, 2, 3];
for (const num of numbers) {
  Logger.log(num);
}
```

### 除錯輸出

| 方法 | Rhino | V8 | 說明 |
|------|-------|-----|------|
| `Logger.log()` | ✅ | ✅ | GAS 專用日誌 |
| `console.log()` | ❌ | ✅ | 標準 JavaScript 日誌 |

**Rhino 寫法：**
```javascript
Logger.log('Hello World');
```

**V8 寫法：**
```javascript
console.log('Hello World'); // 也可以用
Logger.log('Hello World');  // 兩者都支援
```

## 本課程的語法策略

為了確保所有學習者都能順利執行範例程式碼，本課程採用以下策略：

### 1. 優先使用相容語法
- 範例程式碼優先使用 Rhino 也支援的語法
- 確保在任何環境都能執行

### 2. 標註 V8 專屬語法
- 當介紹 V8 專屬語法時，會明確標註
- 提供 Rhino 的替代寫法

### 3. 建議啟用 V8
- 新專案建議啟用 V8 Runtime
- 享受現代 JavaScript 的便利性

## 測試 V8 Runtime

建立一個測試函式來確認 V8 是否已啟用：

```javascript
function testV8Runtime() {
  try {
    // 測試 let 和 const
    const message = 'V8 Runtime 已啟用！';
    let count = 0;
    
    // 測試箭頭函式
    const add = (a, b) => a + b;
    
    // 測試模板字串
    const result = `測試結果：${add(1, 2)}`;
    
    // 測試 for...of
    const numbers = [1, 2, 3];
    for (const num of numbers) {
      count += num;
    }
    
    console.log(message);
    console.log(result);
    console.log(`總和：${count}`);
    
    return 'V8 Runtime 測試成功！';
    
  } catch (error) {
    Logger.log('V8 Runtime 未啟用或測試失敗');
    Logger.log('錯誤訊息：' + error.message);
    return 'V8 Runtime 未啟用';
  }
}
```

執行這個函式：
- 如果成功，表示 V8 Runtime 已啟用
- 如果失敗，請檢查專案設定

## 常見問題

### Q1: 啟用 V8 後，舊程式碼會壞掉嗎？
**A:** 不會。V8 完全向下相容 Rhino 的語法，舊程式碼可以正常執行。

### Q2: 可以在同一個專案中混用兩種語法嗎？
**A:** 可以。啟用 V8 後，你可以同時使用舊語法和新語法。

### Q3: 已經部署的 Web App 需要重新部署嗎？
**A:** 建議重新部署，以確保使用新的 Runtime。

### Q4: 所有 GAS 專案都應該啟用 V8 嗎？
**A:** 建議新專案都啟用 V8。舊專案如果運作正常，可以不用特別更改。

### Q5: V8 Runtime 有什麼缺點嗎？
**A:** 幾乎沒有。唯一要注意的是，如果你的程式碼需要分享給使用舊版 GAS 的人，可能需要避免使用 V8 專屬語法。

## 學習建議

1. **初學者**：先學習相容語法，打好基礎
2. **有經驗者**：直接啟用 V8，使用現代語法
3. **團隊開發**：統一啟用 V8，提升開發效率

## 總結

- V8 Runtime 提供更好的 JavaScript 支援
- 啟用方式簡單，只需勾選一個選項
- 建議所有新專案都啟用 V8
- 本課程會標註哪些語法需要 V8
- 範例程式碼優先使用相容語法，確保都能執行

現在你已經了解 V8 Runtime，可以開始學習 JavaScript 語法了！
