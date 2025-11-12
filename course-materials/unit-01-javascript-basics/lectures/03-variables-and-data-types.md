# JavaScript 變數與資料型別

## 什麼是變數？

變數就像是一個「容器」或「標籤」，用來儲存資料。你可以把資料放進變數中，之後再取出來使用。

想像一下：
- 變數就像是一個盒子，上面貼著標籤（變數名稱）
- 盒子裡面可以放東西（資料）
- 你可以隨時打開盒子，看看裡面是什麼
- 你也可以把盒子裡的東西換掉

## 變數宣告

在 JavaScript 中，有三種方式可以宣告變數：

### 1. var（傳統方式）

```javascript
var name = '小明';
var age = 20;
```

**特性：**
- ✅ GAS 完全支援（Rhino 和 V8 都支援）
- 函式作用域（function scope）
- 可以重複宣告
- 可以先使用後宣告（hoisting）

**適用情境：**
- 需要相容舊版 GAS 時使用
- 本課程的範例主要使用 var

### 2. let（現代方式）

```javascript
let name = '小明';
let age = 20;
```

**特性：**
- ⚠️ 需要啟用 V8 Runtime
- 區塊作用域（block scope）
- 不可重複宣告
- 不可先使用後宣告

**適用情境：**
- 需要區塊作用域時
- 變數值會改變時

### 3. const（常數）

```javascript
const PI = 3.14159;
const SCHOOL_NAME = '某某高中';
```

**特性：**
- ⚠️ 需要啟用 V8 Runtime
- 區塊作用域（block scope）
- 宣告後不可改變
- 必須在宣告時賦值

**適用情境：**
- 值不會改變的資料
- 常數定義

### 變數宣告對照表

| 特性 | var | let | const | GAS 支援 |
|------|-----|-----|-------|---------|
| 作用域 | 函式 | 區塊 | 區塊 | - |
| 重複宣告 | ✅ | ❌ | ❌ | - |
| 重新賦值 | ✅ | ✅ | ❌ | - |
| Hoisting | ✅ | ❌ | ❌ | - |
| Rhino 支援 | ✅ | ❌ | ❌ | var 完全支援 |
| V8 支援 | ✅ | ✅ | ✅ | 全部支援 |

## 變數命名規則

### 必須遵守的規則

1. **只能使用字母、數字、底線、錢字號**
   ```javascript
   var name;      // ✅ 正確
   var age1;      // ✅ 正確
   var _temp;     // ✅ 正確
   var $price;    // ✅ 正確
   var my-name;   // ❌ 錯誤：不能使用連字號
   var 1age;      // ❌ 錯誤：不能以數字開頭
   ```

2. **不能以數字開頭**
   ```javascript
   var age1;      // ✅ 正確
   var 1age;      // ❌ 錯誤
   ```

3. **不能使用保留字**
   ```javascript
   var name;      // ✅ 正確
   var function;  // ❌ 錯誤：function 是保留字
   var if;        // ❌ 錯誤：if 是保留字
   ```

### 建議遵守的慣例

1. **使用有意義的名稱**
   ```javascript
   var n;              // ❌ 不好：不知道是什麼
   var studentName;    // ✅ 好：清楚表達意義
   ```

2. **使用駝峰式命名（camelCase）**
   ```javascript
   var studentname;    // ❌ 不好
   var student_name;   // ⚠️ 可以，但不是 JavaScript 慣例
   var studentName;    // ✅ 好：駝峰式命名
   ```

3. **常數使用全大寫**
   ```javascript
   var pi = 3.14;           // ❌ 不好
   var PI = 3.14;           // ✅ 好
   var MAX_STUDENTS = 50;   // ✅ 好：多個單字用底線分隔
   ```

## 資料型別

JavaScript 有以下基本資料型別：

### 1. String（字串）

用來儲存文字資料。

```javascript
var name = '小明';
var message = "Hello World";
var address = '台北市信義區';
```

**特性：**
- ✅ GAS 完全支援
- 可以使用單引號或雙引號
- 字串可以包含任何文字、數字、符號

**常用操作：**
```javascript
var firstName = '王';
var lastName = '小明';
var fullName = firstName + lastName;  // '王小明'（字串連接）

var text = 'Hello';
var length = text.length;  // 5（取得長度）
```

### 2. Number（數字）

用來儲存數值資料。

```javascript
var age = 20;
var price = 99.99;
var temperature = -5;
```

**特性：**
- ✅ GAS 完全支援
- 整數和小數都是 Number 型別
- 可以是正數、負數、零

**常用操作：**
```javascript
var a = 10;
var b = 3;

var sum = a + b;        // 13（加法）
var diff = a - b;       // 7（減法）
var product = a * b;    // 30（乘法）
var quotient = a / b;   // 3.333...（除法）
var remainder = a % b;  // 1（取餘數）
```

### 3. Boolean（布林值）

只有兩個值：`true`（真）或 `false`（假）。

```javascript
var isStudent = true;
var hasGraduated = false;
var isAdult = age >= 18;
```

**特性：**
- ✅ GAS 完全支援
- 用於條件判斷
- 比較運算的結果是布林值

**常用情境：**
```javascript
var score = 85;
var isPassed = score >= 60;  // true

var age = 15;
var isAdult = age >= 18;     // false
```

### 4. Null（空值）

表示「沒有值」或「空的」。

```javascript
var result = null;
```

**特性：**
- ✅ GAS 完全支援
- 明確表示「這個變數是空的」
- 需要手動設定

### 5. Undefined（未定義）

表示變數已宣告但尚未賦值。

```javascript
var name;
Logger.log(name);  // undefined
```

**特性：**
- ✅ GAS 完全支援
- 變數宣告後的預設值
- 通常不需要手動設定

### 資料型別對照表

| 型別 | 範例 | 說明 | GAS 支援 |
|------|------|------|---------|
| String | `'Hello'` | 文字資料 | ✅ 完全支援 |
| Number | `123`, `3.14` | 數值資料 | ✅ 完全支援 |
| Boolean | `true`, `false` | 布林值 | ✅ 完全支援 |
| Null | `null` | 空值 | ✅ 完全支援 |
| Undefined | `undefined` | 未定義 | ✅ 完全支援 |

## 檢查資料型別

使用 `typeof` 運算子可以檢查變數的型別：

```javascript
var name = '小明';
var age = 20;
var isStudent = true;
var nothing = null;
var notDefined;

Logger.log(typeof name);       // 'string'
Logger.log(typeof age);        // 'number'
Logger.log(typeof isStudent);  // 'boolean'
Logger.log(typeof nothing);    // 'object'（這是 JavaScript 的歷史 bug）
Logger.log(typeof notDefined); // 'undefined'
```

## 運算子

### 算術運算子

用於數學運算。

| 運算子 | 說明 | 範例 | 結果 | GAS 支援 |
|--------|------|------|------|---------|
| `+` | 加法 | `5 + 3` | `8` | ✅ |
| `-` | 減法 | `5 - 3` | `2` | ✅ |
| `*` | 乘法 | `5 * 3` | `15` | ✅ |
| `/` | 除法 | `5 / 2` | `2.5` | ✅ |
| `%` | 取餘數 | `5 % 2` | `1` | ✅ |
| `++` | 遞增 | `var a = 5; a++` | `6` | ✅ |
| `--` | 遞減 | `var a = 5; a--` | `4` | ✅ |

```javascript
var a = 10;
var b = 3;

Logger.log(a + b);  // 13
Logger.log(a - b);  // 7
Logger.log(a * b);  // 30
Logger.log(a / b);  // 3.333...
Logger.log(a % b);  // 1

a++;  // a = 11
b--;  // b = 2
```

### 比較運算子

用於比較兩個值，結果是布林值。

| 運算子 | 說明 | 範例 | 結果 | GAS 支援 |
|--------|------|------|------|---------|
| `==` | 相等（會轉型） | `5 == '5'` | `true` | ✅ |
| `===` | 嚴格相等 | `5 === '5'` | `false` | ✅ |
| `!=` | 不相等 | `5 != 3` | `true` | ✅ |
| `!==` | 嚴格不相等 | `5 !== '5'` | `true` | ✅ |
| `>` | 大於 | `5 > 3` | `true` | ✅ |
| `<` | 小於 | `5 < 3` | `false` | ✅ |
| `>=` | 大於等於 | `5 >= 5` | `true` | ✅ |
| `<=` | 小於等於 | `5 <= 3` | `false` | ✅ |

```javascript
var a = 10;
var b = 5;

Logger.log(a > b);   // true
Logger.log(a < b);   // false
Logger.log(a == 10); // true
Logger.log(a === 10); // true
Logger.log(a != b);  // true
```

**注意：建議使用 `===` 和 `!==`，避免型別轉換造成的問題。**

### 邏輯運算子

用於組合多個條件。

| 運算子 | 說明 | 範例 | GAS 支援 |
|--------|------|------|---------|
| `&&` | AND（且） | `true && false` → `false` | ✅ |
| `\|\|` | OR（或） | `true \|\| false` → `true` | ✅ |
| `!` | NOT（非） | `!true` → `false` | ✅ |

```javascript
var age = 20;
var hasLicense = true;

// AND：兩個條件都要成立
var canDrive = age >= 18 && hasLicense;  // true

// OR：至少一個條件成立
var isSpecial = age < 12 || age > 65;    // false

// NOT：反轉布林值
var isMinor = !(age >= 18);              // false
```

### 賦值運算子

用於給變數賦值。

| 運算子 | 說明 | 範例 | 等同於 | GAS 支援 |
|--------|------|------|--------|---------|
| `=` | 賦值 | `a = 5` | - | ✅ |
| `+=` | 加後賦值 | `a += 3` | `a = a + 3` | ✅ |
| `-=` | 減後賦值 | `a -= 3` | `a = a - 3` | ✅ |
| `*=` | 乘後賦值 | `a *= 3` | `a = a * 3` | ✅ |
| `/=` | 除後賦值 | `a /= 3` | `a = a / 3` | ✅ |

```javascript
var score = 80;

score += 10;  // score = 90
score -= 5;   // score = 85
score *= 2;   // score = 170
score /= 2;   // score = 85
```

## 型別轉換

JavaScript 會自動進行型別轉換，但有時需要手動轉換。

### 自動轉換

```javascript
var result1 = '5' + 3;    // '53'（數字轉成字串）
var result2 = '5' - 3;    // 2（字串轉成數字）
var result3 = '5' * '2';  // 10（字串轉成數字）
```

### 手動轉換

```javascript
// 轉成數字
var str = '123';
var num = Number(str);      // 123
var num2 = parseInt(str);   // 123
var num3 = parseFloat('3.14'); // 3.14

// 轉成字串
var num = 123;
var str = String(num);      // '123'
var str2 = num.toString();  // '123'

// 轉成布林值
var bool1 = Boolean(1);     // true
var bool2 = Boolean(0);     // false
var bool3 = Boolean('');    // false
var bool4 = Boolean('text'); // true
```

## 實用範例

### 範例 1：計算成績平均

```javascript
function calculateAverage() {
  var chinese = 85;
  var english = 90;
  var math = 88;
  
  var total = chinese + english + math;
  var average = total / 3;
  
  Logger.log('國文：' + chinese);
  Logger.log('英文：' + english);
  Logger.log('數學：' + math);
  Logger.log('總分：' + total);
  Logger.log('平均：' + average);
}
```

### 範例 2：判斷及格與否

```javascript
function checkPass() {
  var score = 75;
  var passScore = 60;
  
  var isPassed = score >= passScore;
  
  Logger.log('分數：' + score);
  Logger.log('及格分數：' + passScore);
  Logger.log('是否及格：' + isPassed);
}
```

### 範例 3：計算折扣價格

```javascript
function calculateDiscount() {
  var originalPrice = 1000;
  var discountRate = 0.8;  // 8 折
  
  var finalPrice = originalPrice * discountRate;
  var saved = originalPrice - finalPrice;
  
  Logger.log('原價：' + originalPrice);
  Logger.log('折扣：' + (discountRate * 100) + '%');
  Logger.log('售價：' + finalPrice);
  Logger.log('省下：' + saved);
}
```

## 常見錯誤

### 錯誤 1：變數未宣告就使用

```javascript
// ❌ 錯誤
Logger.log(name);  // ReferenceError: name is not defined

// ✅ 正確
var name = '小明';
Logger.log(name);
```

### 錯誤 2：字串和數字相加

```javascript
var age = 20;
var message = '我今年' + age + '歲';  // ✅ 正確：'我今年20歲'

var num1 = '5';
var num2 = 3;
var result = num1 + num2;  // ⚠️ 結果是 '53'，不是 8
```

### 錯誤 3：使用保留字作為變數名

```javascript
// ❌ 錯誤
var function = 123;  // SyntaxError
var if = 456;        // SyntaxError

// ✅ 正確
var myFunction = 123;
var condition = 456;
```

## 練習題

完整的練習題與解答請參考：`exercises/01-variables-exercises.gs`

## 總結

- 變數用來儲存資料
- 使用 `var` 宣告變數（GAS 完全支援）
- JavaScript 有 5 種基本資料型別
- 運算子用於操作資料
- 注意型別轉換的問題
- 使用有意義的變數名稱

下一步，我們將學習流程控制，讓程式能夠做出判斷和重複執行！
