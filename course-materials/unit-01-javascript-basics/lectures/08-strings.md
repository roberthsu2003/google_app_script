# 字串處理

## 學習目標

- 掌握字串的建立與連接方式
- 學會常用的字串方法
- 理解字串的不可變性
- 了解字串與數字的轉換
- 理解 GAS 對字串相關語法的支援情況

---

## 什麼是字串？

字串（String）是用來表示文字的資料型別。在 JavaScript 中，字串可以用單引號、雙引號或反引號（模板字串）包圍。

✅ **GAS 完全支援單引號和雙引號**

```javascript
var str1 = 'Hello';        // 單引號
var str2 = "World";        // 雙引號
var str3 = 'It\'s OK';     // 使用跳脫字元
var str4 = "He said \"Hi\"";  // 使用跳脫字元
```

---

## 字串連接

### 方法 1：使用 + 運算子

✅ **GAS 完全支援**

```javascript
var firstName = '王';
var lastName = '小明';
var fullName = firstName + lastName;
Logger.log(fullName);  // 王小明

// 連接多個字串
var greeting = 'Hello, ' + fullName + '!';
Logger.log(greeting);  // Hello, 王小明!

// 字串與數字連接
var age = 18;
var message = '我今年 ' + age + ' 歲';
Logger.log(message);  // 我今年 18 歲
```

### 方法 2：使用 += 運算子

✅ **GAS 完全支援**

```javascript
var message = 'Hello';
message += ', ';
message += 'World';
message += '!';
Logger.log(message);  // Hello, World!
```

### 方法 3：模板字串（Template Literals）

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var name = '王小明';
var age = 18;
var message = `我是 ${name}，今年 ${age} 歲`;
Logger.log(message);  // 我是 王小明，今年 18 歲

// 多行字串
var multiLine = `第一行
第二行
第三行`;

// 傳統替代方案（GAS 完全支援）
var message = '我是 ' + name + '，今年 ' + age + ' 歲';
var multiLine = '第一行\n第二行\n第三行';
```

---

## 字串屬性

### length - 取得字串長度

✅ **GAS 完全支援**

```javascript
var str = 'Hello';
Logger.log(str.length);  // 5

var chinese = '你好世界';
Logger.log(chinese.length);  // 4

// 空字串
var empty = '';
Logger.log(empty.length);  // 0
```

---

## 常用字串方法

### 1. charAt() - 取得指定位置的字元

✅ **GAS 完全支援**

```javascript
var str = 'Hello';
Logger.log(str.charAt(0));  // H
Logger.log(str.charAt(1));  // e
Logger.log(str.charAt(4));  // o

// 也可以使用括號記法
Logger.log(str[0]);  // H
```

### 2. indexOf() - 搜尋子字串的位置

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
Logger.log(str.indexOf('World'));  // 6
Logger.log(str.indexOf('o'));      // 4（第一次出現的位置）
Logger.log(str.indexOf('xyz'));    // -1（找不到）

// 從指定位置開始搜尋
Logger.log(str.indexOf('o', 5));   // 7（從索引 5 開始找）
```

### 3. lastIndexOf() - 從後面搜尋子字串

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
Logger.log(str.lastIndexOf('o'));  // 7（最後一次出現的位置）
```

### 4. substring() - 擷取子字串

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
Logger.log(str.substring(0, 5));   // Hello（從索引 0 到 5，不含 5）
Logger.log(str.substring(6));      // World（從索引 6 到結尾）
Logger.log(str.substring(6, 11));  // World
```

### 5. slice() - 擷取子字串（支援負數索引）

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
Logger.log(str.slice(0, 5));    // Hello
Logger.log(str.slice(6));       // World
Logger.log(str.slice(-5));      // World（從倒數第 5 個開始）
Logger.log(str.slice(-5, -1));  // Worl（從倒數第 5 到倒數第 1）
```

### 6. split() - 分割字串為陣列

✅ **GAS 完全支援**

```javascript
var str = 'apple,banana,orange';
var fruits = str.split(',');
Logger.log(fruits);  // ['apple', 'banana', 'orange']

// 分割每個字元
var word = 'Hello';
var chars = word.split('');
Logger.log(chars);  // ['H', 'e', 'l', 'l', 'o']

// 分割空格
var sentence = 'Hello World JavaScript';
var words = sentence.split(' ');
Logger.log(words);  // ['Hello', 'World', 'JavaScript']
```

### 7. replace() - 取代字串

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
var newStr = str.replace('World', 'JavaScript');
Logger.log(newStr);  // Hello JavaScript

// 只會取代第一個符合的
var text = 'apple apple orange';
Logger.log(text.replace('apple', 'banana'));  // banana apple orange

// 使用正規表達式取代全部
var text = 'apple apple orange';
Logger.log(text.replace(/apple/g, 'banana'));  // banana banana orange
```

### 8. toUpperCase() / toLowerCase() - 轉換大小寫

✅ **GAS 完全支援**

```javascript
var str = 'Hello World';
Logger.log(str.toUpperCase());  // HELLO WORLD
Logger.log(str.toLowerCase());  // hello world

// 原字串不會改變
Logger.log(str);  // Hello World
```

### 9. trim() - 移除前後空白

✅ **GAS 完全支援**

```javascript
var str = '  Hello World  ';
Logger.log(str.trim());  // 'Hello World'

// 常用於處理使用者輸入
var userInput = '  example@email.com  ';
var email = userInput.trim();
Logger.log(email);  // 'example@email.com'
```

### 10. startsWith() / endsWith() - 檢查開頭或結尾

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var str = 'Hello World';
Logger.log(str.startsWith('Hello'));  // true
Logger.log(str.endsWith('World'));    // true

// 傳統替代方案（GAS 完全支援）
Logger.log(str.indexOf('Hello') === 0);  // true
Logger.log(str.lastIndexOf('World') === str.length - 5);  // true
```

### 11. includes() - 檢查是否包含子字串

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var str = 'Hello World';
Logger.log(str.includes('World'));  // true

// 傳統替代方案（GAS 完全支援）
Logger.log(str.indexOf('World') !== -1);  // true
```

### 12. repeat() - 重複字串

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var str = 'Ha';
Logger.log(str.repeat(3));  // HaHaHa

// 傳統替代方案（GAS 完全支援）
var result = '';
for (var i = 0; i < 3; i++) {
  result += str;
}
Logger.log(result);  // HaHaHa
```

---

## 字串的不可變性

字串是不可變的（immutable），意思是字串一旦建立就無法修改。所有字串方法都會回傳新字串，而不會改變原字串。

✅ **GAS 完全支援**

```javascript
var str = 'Hello';
str.toUpperCase();
Logger.log(str);  // Hello（原字串沒有改變）

// 必須重新賦值
str = str.toUpperCase();
Logger.log(str);  // HELLO
```

---

## 字串與數字轉換

### 字串轉數字

✅ **GAS 完全支援**

```javascript
// 方法 1：Number()
var str = '123';
var num = Number(str);
Logger.log(num);        // 123
Logger.log(typeof num); // number

// 方法 2：parseInt()（整數）
var str = '123.45';
var num = parseInt(str);
Logger.log(num);  // 123

// 方法 3：parseFloat()（浮點數）
var str = '123.45';
var num = parseFloat(str);
Logger.log(num);  // 123.45

// 方法 4：使用 + 運算子
var str = '123';
var num = +str;
Logger.log(num);  // 123
```

### 數字轉字串

✅ **GAS 完全支援**

```javascript
// 方法 1：String()
var num = 123;
var str = String(num);
Logger.log(str);        // '123'
Logger.log(typeof str); // string

// 方法 2：toString()
var num = 123;
var str = num.toString();
Logger.log(str);  // '123'

// 方法 3：連接空字串
var num = 123;
var str = num + '';
Logger.log(str);  // '123'
```

---

## 跳脫字元

使用反斜線 `\` 來表示特殊字元。

✅ **GAS 完全支援**

| 跳脫字元 | 說明 |
|---------|------|
| `\'` | 單引號 |
| `\"` | 雙引號 |
| `\\` | 反斜線 |
| `\n` | 換行 |
| `\t` | Tab |
| `\r` | 回車 |

```javascript
var str1 = 'It\'s a beautiful day';
var str2 = "He said \"Hello\"";
var str3 = 'First line\nSecond line';
var str4 = 'Name:\tJohn';

Logger.log(str1);  // It's a beautiful day
Logger.log(str2);  // He said "Hello"
Logger.log(str3);  // First line
                   // Second line
Logger.log(str4);  // Name:	John
```

---

## 常用字串方法總整理

| 方法 | 說明 | GAS 支援 |
|-----|------|---------|
| `length` | 取得字串長度 | ✅ 完全支援 |
| `charAt(index)` | 取得指定位置字元 | ✅ 完全支援 |
| `indexOf(str)` | 搜尋子字串位置 | ✅ 完全支援 |
| `lastIndexOf(str)` | 從後搜尋子字串 | ✅ 完全支援 |
| `substring(start, end)` | 擷取子字串 | ✅ 完全支援 |
| `slice(start, end)` | 擷取子字串（支援負數） | ✅ 完全支援 |
| `split(separator)` | 分割字串為陣列 | ✅ 完全支援 |
| `replace(old, new)` | 取代字串 | ✅ 完全支援 |
| `toUpperCase()` | 轉大寫 | ✅ 完全支援 |
| `toLowerCase()` | 轉小寫 | ✅ 完全支援 |
| `trim()` | 移除前後空白 | ✅ 完全支援 |
| `startsWith(str)` | 檢查開頭 | ⚠️ 需 V8 |
| `endsWith(str)` | 檢查結尾 | ⚠️ 需 V8 |
| `includes(str)` | 檢查是否包含 | ⚠️ 需 V8 |
| `repeat(count)` | 重複字串 | ⚠️ 需 V8 |

---

## 實務應用範例

### 範例 1：Email 驗證

```javascript
function validateEmail(email) {
  // 移除前後空白
  email = email.trim();
  
  // 檢查是否包含 @
  if (email.indexOf('@') === -1) {
    return false;
  }
  
  // 檢查 @ 的位置
  var atIndex = email.indexOf('@');
  if (atIndex === 0 || atIndex === email.length - 1) {
    return false;
  }
  
  // 檢查是否包含 .
  var dotIndex = email.lastIndexOf('.');
  if (dotIndex === -1 || dotIndex < atIndex) {
    return false;
  }
  
  return true;
}

Logger.log(validateEmail('example@email.com'));  // true
Logger.log(validateEmail('invalid-email'));      // false
```

### 範例 2：格式化姓名

```javascript
function formatName(name) {
  // 移除前後空白
  name = name.trim();
  
  // 轉為小寫
  name = name.toLowerCase();
  
  // 首字母大寫
  if (name.length > 0) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  return name;
}

Logger.log(formatName('  JOHN  '));  // John
Logger.log(formatName('mary'));      // Mary
```

### 範例 3：產生縮寫

```javascript
function createAbbreviation(text) {
  var words = text.split(' ');
  var abbreviation = '';
  
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      abbreviation += words[i].charAt(0).toUpperCase();
    }
  }
  
  return abbreviation;
}

Logger.log(createAbbreviation('Google Apps Script'));  // GAS
Logger.log(createAbbreviation('United States'));       // US
```

### 範例 4：隱藏部分資訊

```javascript
function maskEmail(email) {
  var atIndex = email.indexOf('@');
  if (atIndex === -1) return email;
  
  var username = email.substring(0, atIndex);
  var domain = email.substring(atIndex);
  
  // 只顯示前 2 個字元
  var masked = username.substring(0, 2) + '***' + domain;
  return masked;
}

Logger.log(maskEmail('example@email.com'));  // ex***@email.com
```

### 範例 5：從試算表處理文字資料

```javascript
function processSheetText() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    // 假設第一欄是姓名，需要格式化
    var name = data[i][0];
    if (typeof name === 'string') {
      // 移除空白並轉為適當格式
      name = name.trim();
      data[i][0] = name;
    }
    
    // 假設第二欄是 Email，需要轉小寫
    var email = data[i][1];
    if (typeof email === 'string') {
      email = email.trim().toLowerCase();
      data[i][1] = email;
    }
  }
  
  // 寫回試算表
  sheet.getDataRange().setValues(data);
}
```

---

## 小結

- 字串用單引號或雙引號包圍
- 使用 `+` 運算子連接字串
- 字串是不可變的，方法會回傳新字串
- 常用方法：`indexOf`、`substring`、`slice`、`split`、`replace`、`trim`
- 模板字串、`includes`、`startsWith` 等需要 V8 runtime
- 字串與數字可以互相轉換

---

## 練習建議

完成本單元後，請練習：
1. 連接多個字串
2. 使用各種字串方法處理文字
3. 分割與組合字串
4. 驗證與格式化使用者輸入
5. 處理試算表中的文字資料
