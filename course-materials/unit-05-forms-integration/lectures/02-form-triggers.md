# 表單觸發器

## 學習目標

- 理解表單觸發器的運作原理
- 掌握 onFormSubmit 觸發器的使用方法
- 學習處理觸發器事件物件
- 能夠建立即時回應機制
- 掌握觸發器除錯技巧

## 表單觸發器簡介

表單觸發器（Form Trigger）是當表單發生特定事件時自動執行程式碼的機制。最常用的是 **表單提交觸發器（onFormSubmit）**，當有人提交表單時會自動執行指定的函式。

### 表單觸發器的應用場景

- 表單提交後自動發送確認郵件
- 即時處理表單資料並寫入試算表
- 根據回應內容觸發不同的後續動作
- 自動通知相關人員
- 即時統計與分析

## 建立表單提交觸發器

### 方法 1：透過 UI 介面建立

1. 開啟 Google Form 表單
2. 點選右上角的「更多選項」（三個點）
3. 選擇「指令碼編輯器」
4. 在編輯器中撰寫處理函式
5. 點選「觸發條件」（時鐘圖示）
6. 點選「新增觸發條件」
7. 選擇函式、事件來源（來自試算表）、事件類型（提交表單時）

### 方法 2：透過程式碼建立

```javascript
function createFormSubmitTrigger() {
  var form = FormApp.getActiveForm();
  
  // 建立表單提交觸發器
  ScriptApp.newTrigger('onFormSubmitHandler')
    .forForm(form)
    .onFormSubmit()
    .create();
  
  Logger.log('表單提交觸發器已建立');
}
```

### 方法 3：從試算表建立（推薦）

當表單回應連結到試算表時，可以從試算表建立觸發器：

```javascript
function createSpreadsheetFormTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 建立試算表的表單提交觸發器
  ScriptApp.newTrigger('onFormSubmitHandler')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  Logger.log('試算表表單提交觸發器已建立');
}
```

## 觸發器處理函式

### 基本結構

```javascript
function onFormSubmitHandler(e) {
  // e 是觸發器事件物件
  // 在這裡處理表單提交後的邏輯
  
  Logger.log('表單已提交');
}
```

### 事件物件（Event Object）

觸發器函式會接收一個事件物件 `e`，包含以下資訊：

#### 從表單觸發器取得的資訊

```javascript
function onFormSubmitHandler(e) {
  // 取得表單回應物件
  var response = e.response;
  
  // 取得回應時間
  var timestamp = response.getTimestamp();
  Logger.log('回應時間：' + timestamp);
  
  // 取得回應者 Email（如果有收集）
  var email = response.getRespondentEmail();
  Logger.log('回應者：' + email);
  
  // 取得所有題目回應
  var itemResponses = response.getItemResponses();
  itemResponses.forEach(function(itemResponse) {
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    Logger.log(question + ': ' + answer);
  });
}
```

#### 從試算表觸發器取得的資訊

```javascript
function onFormSubmitHandler(e) {
  // 取得試算表相關資訊
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // 取得提交的值（陣列）
  var values = e.values;
  Logger.log('提交的資料：' + values);
  
  // 取得命名範圍
  var namedValues = e.namedValues;
  // namedValues 是物件，key 是題目標題，value 是回應陣列
  for (var key in namedValues) {
    Logger.log(key + ': ' + namedValues[key][0]);
  }
}
```

## 實用範例

### 範例 1：發送確認郵件

```javascript
function onFormSubmitHandler(e) {
  var response = e.response;
  var email = response.getRespondentEmail();
  
  if (!email) {
    Logger.log('未收集 Email，無法發送確認信');
    return;
  }
  
  // 取得表單名稱
  var form = FormApp.getActiveForm();
  var formTitle = form.getTitle();
  
  // 發送確認郵件
  var subject = '【確認】' + formTitle + ' 已收到您的回應';
  var body = '您好，\n\n' +
             '感謝您填寫「' + formTitle + '」。\n' +
             '我們已收到您的回應，將盡快處理。\n\n' +
             '回應時間：' + response.getTimestamp() + '\n\n' +
             '如有任何問題，請隨時與我們聯繫。\n\n' +
             '此為系統自動發送的郵件，請勿直接回覆。';
  
  MailApp.sendEmail(email, subject, body);
  Logger.log('確認郵件已發送至：' + email);
}
```

### 範例 2：根據回應內容發送不同郵件

```javascript
function onFormSubmitHandler(e) {
  var itemResponses = e.response.getItemResponses();
  var email = e.response.getRespondentEmail();
  
  if (!email) return;
  
  // 找到滿意度題目的回應
  var satisfaction = '';
  itemResponses.forEach(function(itemResponse) {
    if (itemResponse.getItem().getTitle() === '整體滿意度') {
      satisfaction = itemResponse.getResponse();
    }
  });
  
  // 根據滿意度發送不同內容
  var subject = '感謝您的回饋';
  var body = '';
  
  if (satisfaction === '非常滿意' || satisfaction === '滿意') {
    body = '感謝您的肯定！我們會繼續努力提供更好的服務。';
  } else if (satisfaction === '普通') {
    body = '感謝您的回饋，我們會努力改進。';
  } else {
    body = '很抱歉未能達到您的期望，我們會盡快改善。如有具體建議，歡迎與我們聯繫。';
  }
  
  MailApp.sendEmail(email, subject, body);
}
```

### 範例 3：自動標註狀態

```javascript
function onFormSubmitHandler(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // 在最後一欄新增「待處理」狀態
  var lastCol = sheet.getLastColumn();
  sheet.getRange(row, lastCol + 1).setValue('待處理');
  
  // 設定背景顏色
  sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#fff3cd');
  
  Logger.log('已標註第 ' + row + ' 列為待處理');
}
```

### 範例 4：即時通知管理員

```javascript
function onFormSubmitHandler(e) {
  var response = e.response;
  var itemResponses = response.getItemResponses();
  
  // 整理回應內容
  var content = '';
  itemResponses.forEach(function(itemResponse) {
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    content += question + '：' + answer + '\n';
  });
  
  // 發送通知給管理員
  var adminEmail = 'admin@example.com'; // 請替換為實際的管理員 Email
  var subject = '【新回應】' + FormApp.getActiveForm().getTitle();
  var body = '收到新的表單回應：\n\n' +
             '回應時間：' + response.getTimestamp() + '\n' +
             '回應者：' + response.getRespondentEmail() + '\n\n' +
             '回應內容：\n' + content;
  
  MailApp.sendEmail(adminEmail, subject, body);
  Logger.log('已通知管理員');
}
```

### 範例 5：資料驗證與處理

```javascript
function onFormSubmitHandler(e) {
  var namedValues = e.namedValues;
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // 取得年齡欄位
  var age = parseInt(namedValues['年齡'][0]);
  
  // 驗證年齡
  if (age < 18) {
    // 標註為「需要家長同意」
    var lastCol = sheet.getLastColumn();
    sheet.getRange(row, lastCol + 1).setValue('需要家長同意');
    sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#ffcccc');
    
    // 發送通知
    var email = namedValues['Email'][0];
    MailApp.sendEmail(
      email,
      '需要家長同意',
      '由於您未滿 18 歲，需要家長同意才能參加。請家長填寫同意書。'
    );
  } else {
    // 標註為「已確認」
    var lastCol = sheet.getLastColumn();
    sheet.getRange(row, lastCol + 1).setValue('已確認');
    sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#ccffcc');
  }
}
```

### 範例 6：自動編號

```javascript
function onFormSubmitHandler(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // 產生申請編號（格式：YYYYMMDD-XXX）
  var today = new Date();
  var dateStr = Utilities.formatDate(today, 'GMT+8', 'yyyyMMdd');
  
  // 計算今天的第幾筆申請
  var allData = sheet.getDataRange().getValues();
  var todayCount = 0;
  
  for (var i = 1; i < allData.length; i++) {
    var timestamp = allData[i][0];
    if (timestamp instanceof Date) {
      var recordDate = Utilities.formatDate(timestamp, 'GMT+8', 'yyyyMMdd');
      if (recordDate === dateStr) {
        todayCount++;
      }
    }
  }
  
  // 產生編號
  var applicationId = dateStr + '-' + String(todayCount).padStart(3, '0');
  
  // 寫入編號到第一欄
  sheet.getRange(row, 1).setValue(applicationId);
  
  Logger.log('已產生申請編號：' + applicationId);
}
```

## 管理觸發器

### 列出所有觸發器

```javascript
function listAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('觸發器總數：' + triggers.length);
  
  triggers.forEach(function(trigger, index) {
    Logger.log('--- 觸發器 ' + (index + 1) + ' ---');
    Logger.log('處理函式：' + trigger.getHandlerFunction());
    Logger.log('事件類型：' + trigger.getEventType());
    Logger.log('觸發器 ID：' + trigger.getUniqueId());
  });
}
```

### 刪除特定觸發器

```javascript
function deleteFormTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(function(trigger) {
    // 只刪除表單提交觸發器
    if (trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
      ScriptApp.deleteTrigger(trigger);
      Logger.log('已刪除觸發器：' + trigger.getHandlerFunction());
    }
  });
}
```

### 刪除所有觸發器

```javascript
function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  
  Logger.log('已刪除所有觸發器');
}
```

## 觸發器除錯技巧

### 1. 使用 Logger.log()

```javascript
function onFormSubmitHandler(e) {
  Logger.log('觸發器已執行');
  Logger.log('事件物件：' + JSON.stringify(e));
  
  try {
    // 你的程式碼
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}
```

### 2. 發送除錯郵件

```javascript
function onFormSubmitHandler(e) {
  try {
    // 你的程式碼
    
  } catch (error) {
    // 發送錯誤通知
    MailApp.sendEmail(
      'your-email@example.com',
      '觸發器執行錯誤',
      '錯誤訊息：' + error.message + '\n\n' +
      '錯誤堆疊：' + error.stack
    );
  }
}
```

### 3. 寫入錯誤日誌到試算表

```javascript
function onFormSubmitHandler(e) {
  try {
    // 你的程式碼
    
  } catch (error) {
    // 寫入錯誤日誌
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = ss.getSheetByName('錯誤日誌');
    
    if (!logSheet) {
      logSheet = ss.insertSheet('錯誤日誌');
      logSheet.appendRow(['時間', '錯誤訊息', '錯誤堆疊']);
    }
    
    logSheet.appendRow([
      new Date(),
      error.message,
      error.stack
    ]);
  }
}
```

### 4. 查看執行記錄

在 Apps Script 編輯器中：
1. 點選「執行作業」（左側選單）
2. 查看觸發器的執行記錄
3. 點選執行記錄可查看詳細的 Logger 輸出

## 觸發器限制與注意事項

### 執行時間限制
- 觸發器函式最多執行 6 分鐘
- 超過時間會自動終止

### 配額限制
- 每天的觸發器執行次數有限制
- 郵件發送有每日配額限制

### 權限問題
- 觸發器需要適當的權限才能執行
- 首次執行時需要授權

### 最佳實踐
1. **保持簡潔**：觸發器函式應該快速執行
2. **錯誤處理**：使用 try-catch 捕捉錯誤
3. **避免重複**：檢查是否已有相同的觸發器
4. **測試充分**：在正式使用前充分測試
5. **記錄日誌**：記錄重要的執行資訊

## 完整範例：課程報名系統

```javascript
/**
 * 建立表單提交觸發器
 */
function setupFormTrigger() {
  // 刪除舊的觸發器
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onCourseRegistration') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // 建立新的觸發器
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onCourseRegistration')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  Logger.log('課程報名觸發器已建立');
}

/**
 * 處理課程報名
 */
function onCourseRegistration(e) {
  try {
    var namedValues = e.namedValues;
    var sheet = e.range.getSheet();
    var row = e.range.getRow();
    
    // 取得報名資料
    var name = namedValues['姓名'][0];
    var email = namedValues['Email'][0];
    var course = namedValues['課程選擇'][0];
    
    // 產生報名編號
    var registrationId = generateRegistrationId();
    
    // 寫入報名編號
    var lastCol = sheet.getLastColumn();
    sheet.getRange(row, lastCol + 1).setValue(registrationId);
    sheet.getRange(row, lastCol + 2).setValue('已確認');
    
    // 發送確認郵件
    sendConfirmationEmail(name, email, course, registrationId);
    
    // 通知管理員
    notifyAdmin(name, email, course, registrationId);
    
    Logger.log('報名處理完成：' + registrationId);
    
  } catch (error) {
    Logger.log('錯誤：' + error.message);
    
    // 發送錯誤通知
    MailApp.sendEmail(
      'admin@example.com',
      '報名系統錯誤',
      '錯誤訊息：' + error.message
    );
  }
}

/**
 * 產生報名編號
 */
function generateRegistrationId() {
  var today = new Date();
  var dateStr = Utilities.formatDate(today, 'GMT+8', 'yyyyMMdd');
  var randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return 'REG-' + dateStr + '-' + randomNum;
}

/**
 * 發送確認郵件
 */
function sendConfirmationEmail(name, email, course, registrationId) {
  var subject = '【確認】課程報名成功';
  var body = name + ' 您好，\n\n' +
             '感謝您報名「' + course + '」課程。\n\n' +
             '報名編號：' + registrationId + '\n' +
             '報名時間：' + new Date() + '\n\n' +
             '我們會在開課前一週寄送詳細資訊給您。\n\n' +
             '如有任何問題，請隨時與我們聯繫。';
  
  MailApp.sendEmail(email, subject, body);
}

/**
 * 通知管理員
 */
function notifyAdmin(name, email, course, registrationId) {
  var adminEmail = 'admin@example.com';
  var subject = '【新報名】' + course;
  var body = '收到新的課程報名：\n\n' +
             '報名編號：' + registrationId + '\n' +
             '姓名：' + name + '\n' +
             'Email：' + email + '\n' +
             '課程：' + course + '\n' +
             '報名時間：' + new Date();
  
  MailApp.sendEmail(adminEmail, subject, body);
}
```

## GAS 支援說明

✅ **完全支援**：表單觸發器的所有功能在 GAS 中都完全支援，無需啟用 V8 runtime。

## 練習題

請參考 `exercises` 資料夾中的練習題，實際操作表單觸發器的各項功能。

## 下一步

結合 FormApp 與觸發器，完成簡易簽到系統實作案例。
