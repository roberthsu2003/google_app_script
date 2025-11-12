# 前後端互動

## 學習目標

- 理解 google.script.run 的運作原理
- 掌握成功與失敗回調函式
- 學習參數傳遞與資料回傳
- 理解非同步處理概念
- 掌握載入狀態處理技巧

## google.script.run 簡介

`google.script.run` 是 Google Apps Script 提供的 API，讓前端 HTML 頁面可以呼叫後端 GAS 函式。這是 Web App 中前後端溝通的核心機制。

### 基本語法

```javascript
google.script.run
  .withSuccessHandler(onSuccess)
  .withFailureHandler(onFailure)
  .backendFunction(param1, param2);
```

### 運作流程

1. 前端呼叫 `google.script.run.functionName()`
2. 請求發送到 GAS 後端
3. 後端執行函式
4. 結果回傳到前端
5. 執行成功或失敗的回調函式

## 基本範例

### 後端函式（Code.gs）

```javascript
function getMessage() {
  return 'Hello from server!';
}

function addNumbers(a, b) {
  return a + b;
}
```

### 前端呼叫（HTML）

```html
<script>
  // 簡單呼叫
  google.script.run
    .withSuccessHandler(function(result) {
      console.log(result); // 'Hello from server!'
    })
    .getMessage();
  
  // 傳遞參數
  google.script.run
    .withSuccessHandler(function(result) {
      console.log(result); // 15
    })
    .addNumbers(5, 10);
</script>
```

## 成功回調（Success Handler）

當後端函式成功執行並回傳結果時，會呼叫成功回調函式。

### 基本用法

```javascript
function onSuccess(result) {
  console.log('成功！結果：', result);
  document.getElementById('output').textContent = result;
}

google.script.run
  .withSuccessHandler(onSuccess)
  .backendFunction();
```

### 使用匿名函式

```javascript
google.script.run
  .withSuccessHandler(function(result) {
    alert('結果：' + result);
  })
  .backendFunction();
```

### 傳遞額外參數

```javascript
function onSuccess(result, userObject) {
  console.log('結果：', result);
  console.log('使用者物件：', userObject);
}

google.script.run
  .withSuccessHandler(onSuccess)
  .withUserObject({ id: 123, name: 'John' })
  .backendFunction();
```

## 失敗回調（Failure Handler）

當後端函式執行失敗時，會呼叫失敗回調函式。

### 基本用法

```javascript
function onFailure(error) {
  console.error('錯誤：', error.message);
  alert('發生錯誤：' + error.message);
}

google.script.run
  .withSuccessHandler(onSuccess)
  .withFailureHandler(onFailure)
  .backendFunction();
```

### 完整錯誤處理

```javascript
function onFailure(error, userObject) {
  console.error('錯誤訊息：', error.message);
  console.error('錯誤堆疊：', error.stack);
  
  // 顯示友善的錯誤訊息
  document.getElementById('error').textContent = 
    '操作失敗，請稍後再試。';
  
  // 隱藏載入動畫
  document.getElementById('loading').style.display = 'none';
}
```

## 參數傳遞

### 傳遞基本型別

```javascript
// 後端
function processData(name, age, isStudent) {
  return {
    name: name,
    age: age,
    isStudent: isStudent
  };
}

// 前端
google.script.run
  .withSuccessHandler(function(result) {
    console.log(result);
  })
  .processData('John', 25, true);
```

### 傳遞物件

```javascript
// 後端
function saveUser(user) {
  Logger.log('姓名：' + user.name);
  Logger.log('Email：' + user.email);
  return '使用者已儲存';
}

// 前端
var user = {
  name: 'John',
  email: 'john@example.com',
  age: 25
};

google.script.run
  .withSuccessHandler(function(result) {
    alert(result);
  })
  .saveUser(user);
```

### 傳遞陣列

```javascript
// 後端
function calculateSum(numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// 前端
var numbers = [1, 2, 3, 4, 5];

google.script.run
  .withSuccessHandler(function(result) {
    console.log('總和：' + result);
  })
  .calculateSum(numbers);
```

## 資料回傳

### 回傳基本型別

```javascript
// 後端
function getCount() {
  return 42;
}

function getMessage() {
  return 'Hello';
}

function isValid() {
  return true;
}
```

### 回傳物件

```javascript
// 後端
function getUserInfo() {
  return {
    name: 'John',
    email: 'john@example.com',
    age: 25,
    roles: ['user', 'admin']
  };
}

// 前端
google.script.run
  .withSuccessHandler(function(user) {
    console.log('姓名：' + user.name);
    console.log('Email：' + user.email);
    console.log('角色：' + user.roles.join(', '));
  })
  .getUserInfo();
```

### 回傳陣列

```javascript
// 後端
function getStudents() {
  return [
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 92 },
    { name: 'Charlie', score: 78 }
  ];
}

// 前端
google.script.run
  .withSuccessHandler(function(students) {
    students.forEach(function(student) {
      console.log(student.name + ': ' + student.score);
    });
  })
  .getStudents();
```

## 非同步處理

`google.script.run` 是非同步的，函式呼叫後不會立即得到結果。

### 錯誤示範

```javascript
// ❌ 錯誤：result 會是 undefined
var result;
google.script.run
  .withSuccessHandler(function(data) {
    result = data;
  })
  .getData();

console.log(result); // undefined（因為非同步）
```

### 正確做法

```javascript
// ✅ 正確：在回調函式中處理結果
google.script.run
  .withSuccessHandler(function(result) {
    console.log(result); // 正確取得結果
    processResult(result);
  })
  .getData();

function processResult(data) {
  // 處理資料
}
```

### 連續呼叫

```javascript
// 方法 1：巢狀呼叫
google.script.run
  .withSuccessHandler(function(result1) {
    console.log('第一個結果：', result1);
    
    // 在第一個完成後呼叫第二個
    google.script.run
      .withSuccessHandler(function(result2) {
        console.log('第二個結果：', result2);
      })
      .getSecondData();
  })
  .getFirstData();

// 方法 2：使用 Promise（需要自行封裝）
function runAsync(functionName, ...args) {
  return new Promise(function(resolve, reject) {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](...args);
  });
}

// 使用
runAsync('getFirstData')
  .then(function(result1) {
    console.log('第一個結果：', result1);
    return runAsync('getSecondData');
  })
  .then(function(result2) {
    console.log('第二個結果：', result2);
  })
  .catch(function(error) {
    console.error('錯誤：', error);
  });
```

## 載入狀態處理

### 顯示載入動畫

```html
<div id="loading" style="display: none;">
  <p>載入中...</p>
</div>
<div id="content"></div>

<script>
  function loadData() {
    // 顯示載入動畫
    document.getElementById('loading').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    
    google.script.run
      .withSuccessHandler(function(data) {
        // 隱藏載入動畫
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        
        // 顯示資料
        document.getElementById('content').textContent = data;
      })
      .withFailureHandler(function(error) {
        // 隱藏載入動畫
        document.getElementById('loading').style.display = 'none';
        alert('載入失敗：' + error.message);
      })
      .getData();
  }
</script>
```

### 禁用按鈕

```html
<button id="submitBtn" onclick="submitForm()">提交</button>

<script>
  function submitForm() {
    var btn = document.getElementById('submitBtn');
    
    // 禁用按鈕
    btn.disabled = true;
    btn.textContent = '處理中...';
    
    google.script.run
      .withSuccessHandler(function(result) {
        // 啟用按鈕
        btn.disabled = false;
        btn.textContent = '提交';
        
        alert('提交成功！');
      })
      .withFailureHandler(function(error) {
        // 啟用按鈕
        btn.disabled = false;
        btn.textContent = '提交';
        
        alert('提交失敗：' + error.message);
      })
      .processForm();
  }
</script>
```

## 完整範例：學生成績查詢系統

### 後端（Code.gs）

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('student-query')
    .setTitle('學生成績查詢');
}

function getStudentScore(studentId) {
  // 模擬從試算表讀取資料
  var students = {
    '001': { name: '王小明', score: 85 },
    '002': { name: '李小華', score: 92 },
    '003': { name: '張小美', score: 78 }
  };
  
  var student = students[studentId];
  
  if (!student) {
    throw new Error('找不到學號：' + studentId);
  }
  
  return student;
}
```

### 前端（student-query.html）

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
      }
      .form-group {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        background: #4285f4;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      #loading {
        display: none;
        color: #666;
      }
      #result {
        margin-top: 20px;
        padding: 15px;
        background: #f0f0f0;
        border-radius: 4px;
        display: none;
      }
      #error {
        margin-top: 20px;
        padding: 15px;
        background: #ffebee;
        color: #c62828;
        border-radius: 4px;
        display: none;
      }
    </style>
  </head>
  <body>
    <h1>學生成績查詢</h1>
    
    <div class="form-group">
      <label for="studentId">學號：</label>
      <input type="text" id="studentId" placeholder="請輸入學號（例如：001）">
    </div>
    
    <button id="queryBtn" onclick="queryScore()">查詢</button>
    
    <div id="loading">查詢中...</div>
    <div id="result"></div>
    <div id="error"></div>
    
    <script>
      function queryScore() {
        var studentId = document.getElementById('studentId').value;
        
        if (!studentId) {
          alert('請輸入學號');
          return;
        }
        
        // 顯示載入狀態
        var btn = document.getElementById('queryBtn');
        btn.disabled = true;
        btn.textContent = '查詢中...';
        document.getElementById('loading').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        
        // 呼叫後端函式
        google.script.run
          .withSuccessHandler(onSuccess)
          .withFailureHandler(onFailure)
          .getStudentScore(studentId);
      }
      
      function onSuccess(student) {
        // 隱藏載入狀態
        var btn = document.getElementById('queryBtn');
        btn.disabled = false;
        btn.textContent = '查詢';
        document.getElementById('loading').style.display = 'none';
        
        // 顯示結果
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 
          '<h3>查詢結果</h3>' +
          '<p><strong>姓名：</strong>' + student.name + '</p>' +
          '<p><strong>成績：</strong>' + student.score + ' 分</p>';
        resultDiv.style.display = 'block';
      }
      
      function onFailure(error) {
        // 隱藏載入狀態
        var btn = document.getElementById('queryBtn');
        btn.disabled = false;
        btn.textContent = '查詢';
        document.getElementById('loading').style.display = 'none';
        
        // 顯示錯誤
        var errorDiv = document.getElementById('error');
        errorDiv.textContent = '查詢失敗：' + error.message;
        errorDiv.style.display = 'block';
      }
    </script>
  </body>
</html>
```

## 最佳實踐

1. **總是處理錯誤**：使用 `withFailureHandler` 處理可能的錯誤
2. **顯示載入狀態**：讓使用者知道操作正在進行中
3. **禁用按鈕**：防止重複提交
4. **驗證輸入**：在前端先驗證，減少不必要的後端呼叫
5. **友善的錯誤訊息**：不要直接顯示技術性錯誤訊息

## GAS 支援說明

✅ **完全支援**：google.script.run 的所有功能在 GAS 中都完全支援。

## 下一步

學習 HTML/CSS/JavaScript 基礎，建立更美觀的使用者介面。
