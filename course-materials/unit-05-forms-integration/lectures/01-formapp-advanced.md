# FormApp 進階操作

## 學習目標

- 理解如何程式化建立 Google Form 表單
- 掌握各種題目類型的新增方法
- 學習設定題目屬性與驗證規則
- 能夠讀取並處理表單回應資料

## FormApp 服務簡介

FormApp 是 Google Apps Script 提供的服務，用於程式化操作 Google Forms。透過 FormApp，我們可以：

- 建立新表單
- 新增各種類型的題目
- 設定表單屬性與選項
- 讀取表單回應
- 管理表單設定

## 程式化建立表單

### 建立新表單

使用 `FormApp.create()` 方法建立新表單：

```javascript
function createNewForm() {
  // 建立新表單
  var form = FormApp.create('課程意見調查表');
  
  // 設定表單描述
  form.setDescription('請填寫您對本課程的意見與建議');
  
  // 設定是否收集 Email
  form.setCollectEmail(true);
  
  // 設定是否限制一次回應
  form.setLimitOneResponsePerUser(true);
  
  // 取得表單 URL
  var formUrl = form.getPublishedUrl();
  Logger.log('表單已建立：' + formUrl);
  
  return form;
}
```

### 開啟現有表單

```javascript
function openExistingForm() {
  // 透過 ID 開啟表單
  var formId = 'YOUR_FORM_ID';
  var form = FormApp.openById(formId);
  
  // 透過 URL 開啟表單
  var formUrl = 'https://docs.google.com/forms/d/YOUR_FORM_ID/edit';
  var form2 = FormApp.openByUrl(formUrl);
  
  // 取得目前作用中的表單（在表單編輯器中執行）
  var form3 = FormApp.getActiveForm();
  
  return form;
}
```

## 新增題目

### 1. 簡答題（Text Item）

```javascript
function addTextItem(form) {
  var textItem = form.addTextItem();
  textItem.setTitle('請輸入您的姓名');
  textItem.setHelpText('請填寫真實姓名');
  textItem.setRequired(true);
  
  // 設定驗證規則（例如：Email 格式）
  var validation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  textItem.setValidation(validation);
}
```

### 2. 段落題（Paragraph Text Item）

```javascript
function addParagraphItem(form) {
  var paragraphItem = form.addParagraphTextItem();
  paragraphItem.setTitle('請分享您的學習心得');
  paragraphItem.setHelpText('請至少填寫 50 字');
  paragraphItem.setRequired(true);
}
```

### 3. 單選題（Multiple Choice Item）

```javascript
function addMultipleChoiceItem(form) {
  var item = form.addMultipleChoiceItem();
  item.setTitle('您對本課程的整體滿意度？');
  item.setChoices([
    item.createChoice('非常滿意'),
    item.createChoice('滿意'),
    item.createChoice('普通'),
    item.createChoice('不滿意'),
    item.createChoice('非常不滿意')
  ]);
  item.setRequired(true);
}
```

### 4. 核取方塊（Checkbox Item）

```javascript
function addCheckboxItem(form) {
  var item = form.addCheckboxItem();
  item.setTitle('您希望加強哪些主題？（可複選）');
  item.setChoices([
    item.createChoice('JavaScript 基礎'),
    item.createChoice('Google Sheets 操作'),
    item.createChoice('自動化流程'),
    item.createChoice('Web App 開發'),
    item.createChoice('API 整合')
  ]);
  item.setRequired(false);
}
```

### 5. 下拉式選單（List Item）

```javascript
function addListItem(form) {
  var item = form.addListItem();
  item.setTitle('您的職業類別');
  item.setChoices([
    item.createChoice('學生'),
    item.createChoice('教師'),
    item.createChoice('工程師'),
    item.createChoice('行政人員'),
    item.createChoice('其他')
  ]);
  item.setRequired(true);
}
```

### 6. 線性刻度（Scale Item）

```javascript
function addScaleItem(form) {
  var item = form.addScaleItem();
  item.setTitle('課程難度評分（1=太簡單，5=太困難）');
  item.setBounds(1, 5);
  item.setLabels('太簡單', '太困難');
  item.setRequired(true);
}
```

### 7. 日期與時間

```javascript
function addDateTimeItems(form) {
  // 日期題
  var dateItem = form.addDateItem();
  dateItem.setTitle('請選擇您方便的上課日期');
  dateItem.setRequired(true);
  
  // 時間題
  var timeItem = form.addTimeItem();
  timeItem.setTitle('請選擇您方便的上課時間');
  timeItem.setRequired(true);
  
  // 日期時間題
  var dateTimeItem = form.addDateTimeItem();
  dateTimeItem.setTitle('請選擇完整的日期與時間');
}
```

### 8. 格狀題（Grid Item）

```javascript
function addGridItem(form) {
  var item = form.addGridItem();
  item.setTitle('請評分各單元的教學品質');
  item.setRows(['單元 1', '單元 2', '單元 3', '單元 4']);
  item.setColumns(['非常好', '好', '普通', '差', '非常差']);
  item.setRequired(true);
}
```

## 設定題目屬性

### 必填設定

```javascript
function setRequiredItems(form) {
  var items = form.getItems();
  
  items.forEach(function(item) {
    // 檢查題目類型
    if (item.getType() === FormApp.ItemType.TEXT) {
      item.asTextItem().setRequired(true);
    }
  });
}
```

### 說明文字

```javascript
function setHelpText(form) {
  var textItem = form.addTextItem();
  textItem.setTitle('Email');
  textItem.setHelpText('請填寫常用的 Email 地址，我們會寄送課程資訊');
}
```

### 驗證規則

```javascript
function addValidation(form) {
  // Email 驗證
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  emailItem.setValidation(emailValidation);
  
  // 數字範圍驗證
  var ageItem = form.addTextItem();
  ageItem.setTitle('年齡');
  var numberValidation = FormApp.createTextValidation()
    .requireNumberBetween(18, 100)
    .build();
  ageItem.setValidation(numberValidation);
  
  // 文字長度驗證
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  var lengthValidation = FormApp.createTextValidation()
    .requireTextLengthGreaterThanOrEqualTo(2)
    .build();
  nameItem.setValidation(lengthValidation);
}
```

## 讀取表單回應

### 取得所有回應

```javascript
function getAllResponses() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  Logger.log('總回應數：' + responses.length);
  
  responses.forEach(function(response) {
    var timestamp = response.getTimestamp();
    var email = response.getRespondentEmail();
    
    Logger.log('回應時間：' + timestamp);
    Logger.log('回應者：' + email);
    
    // 取得各題回應
    var itemResponses = response.getItemResponses();
    itemResponses.forEach(function(itemResponse) {
      var question = itemResponse.getItem().getTitle();
      var answer = itemResponse.getResponse();
      Logger.log(question + ': ' + answer);
    });
    Logger.log('---');
  });
}
```

### 取得特定題目的回應

```javascript
function getSpecificItemResponses() {
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  
  // 找到特定題目
  var targetItem = null;
  items.forEach(function(item) {
    if (item.getTitle() === '您對本課程的整體滿意度？') {
      targetItem = item;
    }
  });
  
  if (!targetItem) {
    Logger.log('找不到指定題目');
    return;
  }
  
  // 統計該題目的回應
  var responses = form.getResponses();
  var answerCount = {};
  
  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    itemResponses.forEach(function(itemResponse) {
      if (itemResponse.getItem().getId() === targetItem.getId()) {
        var answer = itemResponse.getResponse();
        answerCount[answer] = (answerCount[answer] || 0) + 1;
      }
    });
  });
  
  Logger.log('回應統計：');
  for (var answer in answerCount) {
    Logger.log(answer + ': ' + answerCount[answer] + ' 人');
  }
}
```

### 將回應寫入試算表

```javascript
function exportResponsesToSheet() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  // 建立或開啟試算表
  var ss = SpreadsheetApp.create('表單回應匯出');
  var sheet = ss.getActiveSheet();
  
  // 寫入標題列
  var items = form.getItems();
  var headers = ['時間戳記', 'Email'];
  items.forEach(function(item) {
    headers.push(item.getTitle());
  });
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // 寫入回應資料
  var data = [];
  responses.forEach(function(response) {
    var row = [
      response.getTimestamp(),
      response.getRespondentEmail()
    ];
    
    var itemResponses = response.getItemResponses();
    items.forEach(function(item) {
      var answer = '';
      itemResponses.forEach(function(itemResponse) {
        if (itemResponse.getItem().getId() === item.getId()) {
          answer = itemResponse.getResponse();
        }
      });
      row.push(answer);
    });
    
    data.push(row);
  });
  
  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
  }
  
  Logger.log('回應已匯出到：' + ss.getUrl());
}
```

## 表單設定

### 設定回應目的地

```javascript
function setDestination() {
  var form = FormApp.getActiveForm();
  
  // 建立新試算表作為回應目的地
  var ss = SpreadsheetApp.create('表單回應');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  Logger.log('回應將儲存到：' + ss.getUrl());
}
```

### 其他表單設定

```javascript
function configureForm() {
  var form = FormApp.getActiveForm();
  
  // 設定確認訊息
  form.setConfirmationMessage('感謝您的填寫！我們會盡快處理您的意見。');
  
  // 設定是否允許編輯回應
  form.setAllowResponseEdits(true);
  
  // 設定是否顯示進度列
  form.setProgressBar(true);
  
  // 設定是否隨機排列題目
  form.setShuffleQuestions(false);
  
  // 設定是否顯示回應摘要連結
  form.setShowLinkToRespondAgain(false);
}
```

## 完整範例：建立課程意見調查表

```javascript
function createCourseFeedbackForm() {
  // 建立表單
  var form = FormApp.create('課程意見調查表');
  form.setDescription('感謝您參與本課程，請填寫以下問卷協助我們改進');
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  
  // 1. 基本資料
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setRequired(true);
  
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  emailItem.setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  emailItem.setValidation(emailValidation);
  
  // 2. 滿意度評分
  var satisfactionItem = form.addMultipleChoiceItem();
  satisfactionItem.setTitle('整體滿意度');
  satisfactionItem.setChoices([
    satisfactionItem.createChoice('非常滿意'),
    satisfactionItem.createChoice('滿意'),
    satisfactionItem.createChoice('普通'),
    satisfactionItem.createChoice('不滿意'),
    satisfactionItem.createChoice('非常不滿意')
  ]);
  satisfactionItem.setRequired(true);
  
  // 3. 各單元評分
  var gridItem = form.addGridItem();
  gridItem.setTitle('請評分各單元的教學品質');
  gridItem.setRows([
    'JavaScript 基礎',
    'Google Sheets 操作',
    '自動寄信與通知',
    '檔案與雲端操作'
  ]);
  gridItem.setColumns(['非常好', '好', '普通', '差', '非常差']);
  gridItem.setRequired(true);
  
  // 4. 希望加強的主題
  var topicsItem = form.addCheckboxItem();
  topicsItem.setTitle('您希望加強哪些主題？（可複選）');
  topicsItem.setChoices([
    topicsItem.createChoice('JavaScript 進階語法'),
    topicsItem.createChoice('更多實作案例'),
    topicsItem.createChoice('除錯技巧'),
    topicsItem.createChoice('效能優化'),
    topicsItem.createChoice('其他')
  ]);
  
  // 5. 建議與回饋
  var feedbackItem = form.addParagraphTextItem();
  feedbackItem.setTitle('其他建議與回饋');
  feedbackItem.setHelpText('請分享您的想法，幫助我們改進課程');
  
  // 設定回應目的地
  var ss = SpreadsheetApp.create('課程意見調查回應');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // 設定確認訊息
  form.setConfirmationMessage('感謝您的寶貴意見！');
  
  Logger.log('表單已建立：' + form.getPublishedUrl());
  Logger.log('回應試算表：' + ss.getUrl());
  
  return form;
}
```

## GAS 支援說明

✅ **完全支援**：FormApp 的所有功能在 GAS 中都完全支援，無需啟用 V8 runtime。

## 最佳實踐

1. **題目設計**：題目標題要清楚明確，避免模糊不清
2. **必填設定**：重要資訊設為必填，避免收集不完整的資料
3. **驗證規則**：使用驗證規則確保資料品質
4. **說明文字**：提供清楚的說明文字，幫助填寫者理解
5. **回應處理**：定期處理表單回應，避免資料累積過多

## 常見問題

### Q1: 如何取得表單 ID？
A: 從表單 URL 中取得，格式為 `https://docs.google.com/forms/d/FORM_ID/edit`

### Q2: 如何刪除表單中的題目？
A: 使用 `item.delete()` 方法刪除題目

### Q3: 如何修改已建立的題目？
A: 先取得題目，再使用對應的 setter 方法修改屬性

### Q4: 表單回應會自動儲存嗎？
A: 是的，回應會自動儲存到 Google 伺服器，也可以設定儲存到試算表

## 練習題

請參考 `exercises` 資料夾中的練習題，實際操作 FormApp 的各項功能。

## 下一步

學習如何使用表單觸發器，在表單提交時自動執行程式碼。
