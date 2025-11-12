# 錯誤處理與除錯

## 學習目標

- 理解程式執行時可能發生的錯誤類型
- 掌握 try-catch-finally 語法進行錯誤處理
- 學會使用 Logger.log() 進行除錯
- 了解 console.log() 的 V8 runtime 需求
- 能夠撰寫具有錯誤處理機制的穩健程式

---

## 為什麼需要錯誤處理？

在程式執行過程中，可能會遇到各種預期或非預期的錯誤：
- 使用者輸入不正確的資料
- 網路連線失敗
- 檔案不存在
- 權限不足
- 資料格式錯誤

如果不處理這些錯誤，程式會直接中斷執行，造成不良的使用者體驗。透過適當的錯誤處理，我們可以：
1. 捕捉錯誤並給予友善的提示
2. 記錄錯誤資訊以便除錯
3. 提供備用方案或重試機制
4. 確保程式的穩定性

---

## try-catch-finally 語法

### 基本語法

✅ **GAS 完全支援**

```javascript
try {
  // 可能會發生錯誤的程式碼
  var result = riskyOperation();
} catch (error) {
  // 錯誤發生時執行的程式碼
  Logger.log('發生錯誤: ' + error.message);
} finally {
  // 無論是否發生錯誤都會執行的程式碼（選擇性）
  Logger.log('執行完畢');
}
```

### try-catch 區塊說明

**try 區塊**
- 放置可能會發生錯誤的程式碼
- 如果發生錯誤，會立即跳到 catch 區塊

**catch 區塊**
- 接收錯誤物件（通常命名為 error 或 e）
- 處理錯誤的邏輯
- 可以記錄錯誤、顯示訊息、或執行備用方案

**finally 區塊（選擇性）**
- 無論是否發生錯誤都會執行
- 常用於清理資源、關閉連線等

### 範例：處理除以零的錯誤

```javascript
function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error('除數不能為零');
    }
    return a / b;
  } catch (error) {
    Logger.log('計算錯誤: ' + error.message);
    return null;
  }
}

// 測試
Logger.log(safeDivide(10, 2));  // 5
Logger.log(safeDivide(10, 0));  // null，並記錄錯誤訊息
```

---

## 常見錯誤類型

### 1. ReferenceError（參考錯誤）

當使用未宣告的變數時發生：

```javascript
try {
  Logger.log(undefinedVariable);  // 變數未定義
} catch (error) {
  Logger.log('錯誤類型: ' + error.name);  // ReferenceError
  Logger.log('錯誤訊息: ' + error.message);
}
```

### 2. TypeError（型別錯誤）

當對不適當的型別進行操作時發生：

```javascript
try {
  var num = 123;
  num.toUpperCase();  // 數字沒有 toUpperCase 方法
} catch (error) {
  Logger.log('錯誤類型: ' + error.name);  // TypeError
  Logger.log('錯誤訊息: ' + error.message);
}
```

### 3. RangeError（範圍錯誤）

當數值超出有效範圍時發生：

```javascript
try {
  var arr = new Array(-1);  // 陣列長度不能為負數
} catch (error) {
  Logger.log('錯誤類型: ' + error.name);  // RangeError
  Logger.log('錯誤訊息: ' + error.message);
}
```

### 4. SyntaxError（語法錯誤）

程式碼語法不正確（通常在執行前就會被發現）：

```javascript
try {
  eval('var x = ;');  // 語法錯誤
} catch (error) {
  Logger.log('錯誤類型: ' + error.name);  // SyntaxError
  Logger.log('錯誤訊息: ' + error.message);
}
```

### 5. 自訂錯誤

使用 `throw` 關鍵字拋出自訂錯誤：

```javascript
function validateAge(age) {
  if (age < 0) {
    throw new Error('年齡不能為負數');
  }
  if (age > 150) {
    throw new Error('年齡超出合理範圍');
  }
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  Logger.log('驗證失敗: ' + error.message);
}
```

---

## 除錯工具

### Logger.log() - GAS 專用日誌

✅ **GAS 完全支援**

`Logger.log()` 是 Google Apps Script 提供的日誌記錄工具，用於輸出除錯訊息。

**基本用法：**

```javascript
function testLogger() {
  var name = '王小明';
  var age = 20;
  
  Logger.log('姓名: ' + name);
  Logger.log('年齡: ' + age);
  Logger.log('姓名: %s, 年齡: %s', name, age);  // 格式化輸出
}
```

**查看日誌：**
1. 執行函式後，點選「執行記錄」或「查看」→「記錄」
2. 或使用快捷鍵：Ctrl+Enter（Windows）/ Cmd+Enter（Mac）

**記錄物件和陣列：**

```javascript
function logComplexData() {
  var student = {
    name: '李小華',
    scores: [85, 90, 88]
  };
  
  Logger.log(student);  // 記錄整個物件
  Logger.log(JSON.stringify(student, null, 2));  // 格式化輸出
}
```

### console.log() - 現代除錯工具

⚠️ **需要啟用 V8 Runtime**

`console.log()` 是標準 JavaScript 的除錯工具，在 GAS 中需要啟用 V8 runtime 才能使用。

**啟用 V8 Runtime：**
1. 開啟 Apps Script 專案
2. 點選左側「專案設定」（齒輪圖示）
3. 勾選「啟用 Chrome V8 runtime」
4. 儲存設定

**使用方式：**

```javascript
function testConsole() {
  var data = { name: '測試', value: 100 };
  
  console.log('這是 console.log');
  console.log('資料:', data);
  console.error('這是錯誤訊息');
  console.warn('這是警告訊息');
  console.info('這是資訊訊息');
}
```

**Logger.log() vs console.log()**

| 特性 | Logger.log() | console.log() |
|------|-------------|---------------|
| GAS 支援 | ✅ 完全支援 | ⚠️ 需 V8 runtime |
| 查看方式 | 執行記錄 | 執行記錄 |
| 格式化 | 基本 | 較豐富 |
| 建議使用 | 預設選擇 | V8 專案可用 |

---

## 錯誤處理最佳實踐

### 1. 驗證使用者輸入

```javascript
function processUserInput(email) {
  try {
    // 驗證 email 格式
    if (!email || email.trim() === '') {
      throw new Error('Email 不能為空');
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Email 格式不正確');
    }
    
    // 處理有效的 email
    Logger.log('Email 有效: ' + email);
    return true;
    
  } catch (error) {
    Logger.log('輸入驗證失敗: ' + error.message);
    return false;
  }
}
```

### 2. 處理外部服務錯誤

```javascript
function sendEmailSafely(recipient, subject, body) {
  try {
    MailApp.sendEmail(recipient, subject, body);
    Logger.log('郵件發送成功');
    return { success: true, message: '郵件已發送' };
    
  } catch (error) {
    Logger.log('郵件發送失敗: ' + error.message);
    return { success: false, message: '郵件發送失敗，請稍後再試' };
  }
}
```

### 3. 資源清理

```javascript
function processSpreadsheet() {
  var sheet = null;
  
  try {
    sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // 處理資料
    Logger.log('處理了 ' + data.length + ' 筆資料');
    
  } catch (error) {
    Logger.log('處理試算表時發生錯誤: ' + error.message);
    
  } finally {
    // 清理工作（如果需要）
    Logger.log('處理完成');
  }
}
```

### 4. 提供友善的錯誤訊息

```javascript
function getUserFriendlyError(error) {
  // 將技術性錯誤轉換為使用者友善的訊息
  var message = error.message.toLowerCase();
  
  if (message.indexOf('permission') !== -1) {
    return '您沒有執行此操作的權限';
  } else if (message.indexOf('not found') !== -1) {
    return '找不到指定的資源';
  } else if (message.indexOf('network') !== -1) {
    return '網路連線發生問題，請稍後再試';
  } else {
    return '發生未預期的錯誤，請聯絡管理員';
  }
}

function safeOperation() {
  try {
    // 執行操作
    throw new Error('Permission denied');
    
  } catch (error) {
    Logger.log('技術錯誤: ' + error.message);
    var friendlyMessage = getUserFriendlyError(error);
    Logger.log('使用者訊息: ' + friendlyMessage);
  }
}
```

---

## 除錯技巧

### 1. 分段測試

將複雜的程式碼分段測試，逐步找出問題：

```javascript
function complexOperation() {
  Logger.log('步驟 1: 開始');
  var data = getData();
  Logger.log('步驟 2: 取得資料，筆數: ' + data.length);
  
  var processed = processData(data);
  Logger.log('步驟 3: 處理完成');
  
  saveData(processed);
  Logger.log('步驟 4: 儲存完成');
}
```

### 2. 記錄變數值

在關鍵位置記錄變數的值：

```javascript
function calculateTotal(items) {
  Logger.log('輸入項目: ' + JSON.stringify(items));
  
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    Logger.log('處理項目 ' + i + ': ' + items[i]);
    total += items[i];
  }
  
  Logger.log('計算結果: ' + total);
  return total;
}
```

### 3. 使用條件式除錯

```javascript
var DEBUG_MODE = true;  // 開發時設為 true，上線時設為 false

function debugLog(message) {
  if (DEBUG_MODE) {
    Logger.log('[DEBUG] ' + message);
  }
}

function myFunction() {
  debugLog('函式開始執行');
  // 程式邏輯
  debugLog('函式執行完成');
}
```

---

## 常見錯誤情境與處理

### 情境 1：試算表不存在

```javascript
function openSpreadsheet(spreadsheetId) {
  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    return ss;
  } catch (error) {
    Logger.log('無法開啟試算表: ' + error.message);
    return null;
  }
}
```

### 情境 2：資料格式錯誤

```javascript
function parseNumber(value) {
  try {
    var num = Number(value);
    if (isNaN(num)) {
      throw new Error('無法轉換為數字: ' + value);
    }
    return num;
  } catch (error) {
    Logger.log('數字轉換錯誤: ' + error.message);
    return 0;  // 回傳預設值
  }
}
```

### 情境 3：陣列索引超出範圍

```javascript
function getArrayItem(arr, index) {
  try {
    if (index < 0 || index >= arr.length) {
      throw new Error('索引超出範圍: ' + index);
    }
    return arr[index];
  } catch (error) {
    Logger.log('存取陣列錯誤: ' + error.message);
    return null;
  }
}
```

---

## 錯誤處理檢查清單

在撰寫程式時，考慮以下問題：

- [ ] 使用者輸入是否已驗證？
- [ ] 外部服務呼叫是否有錯誤處理？
- [ ] 陣列存取是否檢查索引範圍？
- [ ] 物件屬性存取是否檢查存在性？
- [ ] 數學運算是否檢查除以零？
- [ ] 檔案操作是否檢查檔案存在？
- [ ] 是否提供友善的錯誤訊息？
- [ ] 是否記錄錯誤以便除錯？

---

## 小結

錯誤處理是撰寫穩健程式的重要技能：

1. **使用 try-catch-finally** 捕捉和處理錯誤
2. **了解常見錯誤類型** 並適當處理
3. **使用 Logger.log()** 進行除錯（GAS 完全支援）
4. **console.log() 需要 V8 runtime** 才能使用
5. **提供友善的錯誤訊息** 給使用者
6. **記錄詳細的錯誤資訊** 以便除錯
7. **驗證輸入資料** 避免錯誤發生
8. **分段測試** 快速找出問題

良好的錯誤處理能讓你的程式更穩定、更容易維護，也能提供更好的使用者體驗！

---

## 練習題

完成「錯誤處理練習題」檔案中的 5 個實作範例，練習各種錯誤處理情境。
