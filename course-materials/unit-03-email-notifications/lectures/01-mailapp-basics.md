# MailApp 與 GmailApp 服務

## 學習目標

- 理解 MailApp 與 GmailApp 的差異與應用場景
- 掌握 sendEmail() 方法與郵件參數設定
- 能夠發送文字郵件、HTML 格式郵件與帶附件的郵件
- 了解 GmailApp 的進階功能（標籤、草稿、搜尋）

## MailApp 服務簡介

MailApp 是 Google Apps Script 提供的郵件發送服務，讓你可以透過程式碼自動發送電子郵件。這個服務特別適合用於：

- 自動通知與提醒
- 報表寄送
- 表單回應確認
- 批次郵件發送

### MailApp vs GmailApp

| 特性 | MailApp | GmailApp |
|------|---------|----------|
| 發送郵件 | ✅ 簡單易用 | ✅ 功能更豐富 |
| HTML 格式 | ✅ 支援 | ✅ 支援 |
| 附件 | ✅ 支援 | ✅ 支援 |
| 讀取郵件 | ❌ 不支援 | ✅ 支援 |
| 標籤管理 | ❌ 不支援 | ✅ 支援 |
| 草稿管理 | ❌ 不支援 | ✅ 支援 |
| 搜尋郵件 | ❌ 不支援 | ✅ 支援 |

**建議使用場景：**
- 只需要發送郵件 → 使用 MailApp（簡單直接）
- 需要讀取或管理郵件 → 使用 GmailApp（功能完整）

## MailApp.sendEmail() 方法

### 基本語法

```javascript
MailApp.sendEmail(recipient, subject, body);
```

### 參數說明

| 參數 | 類型 | 說明 |
|------|------|------|
| recipient | String | 收件者的 Email 地址 |
| subject | String | 郵件主旨 |
| body | String | 郵件內容（純文字） |

### 進階語法（使用選項物件）

```javascript
MailApp.sendEmail(recipient, subject, body, options);
```

### 選項物件參數

| 選項 | 類型 | 說明 |
|------|------|------|
| cc | String | 副本收件者（多個用逗號分隔） |
| bcc | String | 密件副本收件者（多個用逗號分隔） |
| htmlBody | String | HTML 格式的郵件內容 |
| attachments | Array | 附件陣列 |
| name | String | 寄件者顯示名稱 |
| replyTo | String | 回覆地址 |
| noReply | Boolean | 是否為不可回覆郵件 |

## 發送文字郵件

### 範例 1：簡單文字郵件

```javascript
function sendSimpleEmail() {
  var recipient = 'student@example.com';
  var subject = '課程通知';
  var body = '您好，\n\n這是一封測試郵件。\n\n祝好';
  
  MailApp.sendEmail(recipient, subject, body);
  Logger.log('郵件已發送給：' + recipient);
}
```

### 範例 2：使用變數組合郵件內容

```javascript
function sendPersonalizedEmail() {
  var studentName = '王小明';
  var courseName = 'Google Apps Script 應用開發';
  var date = '2024年12月15日';
  
  var recipient = 'student@example.com';
  var subject = '課程提醒：' + courseName;
  var body = studentName + ' 同學您好，\n\n' +
             '提醒您 ' + date + ' 有 ' + courseName + ' 課程。\n' +
             '請準時出席。\n\n' +
             '祝學習愉快！';
  
  MailApp.sendEmail(recipient, subject, body);
}
```

## 發送 HTML 格式郵件

HTML 格式郵件可以包含豐富的排版、顏色、圖片和連結，讓郵件更加美觀專業。

### 範例 3：基本 HTML 郵件

```javascript
function sendHtmlEmail() {
  var recipient = 'student@example.com';
  var subject = '成績通知';
  var plainBody = '您的成績已公布，請查看郵件內容。';
  
  var htmlBody = '<h2>成績通知</h2>' +
                 '<p>王小明同學您好，</p>' +
                 '<p>您的期中考成績如下：</p>' +
                 '<ul>' +
                 '  <li>國文：85 分</li>' +
                 '  <li>英文：90 分</li>' +
                 '  <li>數學：88 分</li>' +
                 '</ul>' +
                 '<p><strong>平均：87.67 分</strong></p>' +
                 '<p>祝學習進步！</p>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
}
```

### 範例 4：使用 CSS 樣式的 HTML 郵件

```javascript
function sendStyledHtmlEmail() {
  var recipient = 'student@example.com';
  var subject = '活動邀請';
  var plainBody = '誠摯邀請您參加校內活動。';
  
  var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">' +
                 '  <div style="background-color: #4285f4; color: white; padding: 20px; text-align: center;">' +
                 '    <h1 style="margin: 0;">校內活動邀請</h1>' +
                 '  </div>' +
                 '  <div style="padding: 20px; background-color: #f5f5f5;">' +
                 '    <p>親愛的同學您好，</p>' +
                 '    <p>我們誠摯邀請您參加以下活動：</p>' +
                 '    <div style="background-color: white; padding: 15px; border-left: 4px solid #4285f4;">' +
                 '      <h3 style="margin-top: 0;">程式設計工作坊</h3>' +
                 '      <p><strong>時間：</strong>2024年12月20日 14:00-17:00</p>' +
                 '      <p><strong>地點：</strong>電腦教室 A</p>' +
                 '    </div>' +
                 '    <p style="margin-top: 20px;">' +
                 '      <a href="https://example.com/register" style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">立即報名</a>' +
                 '    </p>' +
                 '  </div>' +
                 '  <div style="background-color: #e0e0e0; padding: 10px; text-align: center; font-size: 12px;">' +
                 '    <p>此郵件由系統自動發送，請勿直接回覆</p>' +
                 '  </div>' +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody,
    name: '教務處'
  });
}
```

## 發送帶附件的郵件

### 範例 5：發送 Google Drive 檔案作為附件

```javascript
function sendEmailWithAttachment() {
  var recipient = 'student@example.com';
  var subject = '課程講義';
  var body = '您好，\n\n附件為本週課程講義，請下載參考。';
  
  // 從 Google Drive 取得檔案
  var fileId = 'YOUR_FILE_ID_HERE';
  var file = DriveApp.getFileById(fileId);
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [file.getAs(MimeType.PDF)],
    name: '課程助教'
  });
  
  Logger.log('已發送郵件並附上檔案：' + file.getName());
}
```

### 範例 6：發送多個附件

```javascript
function sendEmailWithMultipleAttachments() {
  var recipient = 'student@example.com';
  var subject = '本週教材';
  var body = '您好，\n\n附件包含本週所有教材，請查收。';
  
  // 取得多個檔案
  var folder = DriveApp.getFolderById('YOUR_FOLDER_ID_HERE');
  var files = folder.getFiles();
  var attachments = [];
  
  while (files.hasNext()) {
    var file = files.next();
    attachments.push(file.getBlob());
  }
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: attachments
  });
  
  Logger.log('已發送 ' + attachments.length + ' 個附件');
}
```

### 範例 7：從試算表產生 CSV 附件

```javascript
function sendEmailWithCsvAttachment() {
  var recipient = 'teacher@example.com';
  var subject = '學生名單';
  var body = '您好，\n\n附件為學生名單 CSV 檔案。';
  
  // 從試算表取得資料
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('學生名單');
  var data = sheet.getDataRange().getValues();
  
  // 轉換為 CSV 格式
  var csv = '';
  for (var i = 0; i < data.length; i++) {
    csv += data[i].join(',') + '\n';
  }
  
  // 建立 CSV 附件
  var csvBlob = Utilities.newBlob(csv, 'text/csv', '學生名單.csv');
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [csvBlob]
  });
}
```

## 進階郵件選項

### 範例 8：設定副本與密件副本

```javascript
function sendEmailWithCcBcc() {
  var recipient = 'student@example.com';
  var subject = '專案進度報告';
  var body = '您好，\n\n本週專案進度報告請見附件。';
  
  MailApp.sendEmail(recipient, subject, body, {
    cc: 'supervisor@example.com, manager@example.com',
    bcc: 'archive@example.com',
    name: '專案組'
  });
}
```

### 範例 9：設定回覆地址

```javascript
function sendEmailWithReplyTo() {
  var recipient = 'student@example.com';
  var subject = '課程問卷';
  var body = '您好，\n\n請填寫課程問卷，如有問題請回覆此郵件。';
  
  MailApp.sendEmail(recipient, subject, body, {
    replyTo: 'support@example.com',
    name: '課程小組'
  });
}
```

## GmailApp 進階功能

GmailApp 提供了更多進階功能，讓你可以完整管理 Gmail 信箱。

### 讀取郵件

```javascript
function readEmails() {
  // 搜尋未讀郵件
  var threads = GmailApp.search('is:unread');
  
  Logger.log('未讀郵件數量：' + threads.length);
  
  // 讀取第一封郵件
  if (threads.length > 0) {
    var messages = threads[0].getMessages();
    var firstMessage = messages[0];
    
    Logger.log('寄件者：' + firstMessage.getFrom());
    Logger.log('主旨：' + firstMessage.getSubject());
    Logger.log('內容：' + firstMessage.getPlainBody());
  }
}
```

### 標籤管理

```javascript
function manageLabels() {
  // 建立標籤
  var label = GmailApp.createLabel('課程通知');
  
  // 搜尋特定郵件並加上標籤
  var threads = GmailApp.search('subject:課程');
  
  for (var i = 0; i < threads.length; i++) {
    threads[i].addLabel(label);
  }
  
  Logger.log('已為 ' + threads.length + ' 封郵件加上標籤');
}
```

### 草稿管理

```javascript
function createDraft() {
  var recipient = 'student@example.com';
  var subject = '課程提醒';
  var body = '您好，\n\n這是一封草稿郵件。';
  
  // 建立草稿
  GmailApp.createDraft(recipient, subject, body);
  
  Logger.log('草稿已建立');
}
```

### 搜尋郵件

```javascript
function searchEmails() {
  // 搜尋特定寄件者的郵件
  var threads = GmailApp.search('from:teacher@example.com');
  Logger.log('找到 ' + threads.length + ' 封郵件');
  
  // 搜尋包含特定關鍵字的郵件
  var threads2 = GmailApp.search('subject:作業 after:2024/12/01');
  Logger.log('找到 ' + threads2.length + ' 封作業相關郵件');
  
  // 搜尋有附件的郵件
  var threads3 = GmailApp.search('has:attachment');
  Logger.log('找到 ' + threads3.length + ' 封有附件的郵件');
}
```

### 標記為已讀/未讀

```javascript
function markAsRead() {
  var threads = GmailApp.search('is:unread subject:通知');
  
  for (var i = 0; i < threads.length; i++) {
    threads[i].markRead();
  }
  
  Logger.log('已將 ' + threads.length + ' 封郵件標記為已讀');
}
```

## 郵件發送配額

Google Apps Script 對郵件發送有每日配額限制：

| 帳號類型 | 每日配額 |
|---------|---------|
| 一般 Gmail 帳號 | 100 封 |
| Google Workspace 帳號 | 1,500 封 |

### 檢查剩餘配額

```javascript
function checkEmailQuota() {
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log('今日剩餘郵件配額：' + quota + ' 封');
}
```

### 批次發送時的配額管理

```javascript
function sendBatchEmailsWithQuotaCheck() {
  var quota = MailApp.getRemainingDailyQuota();
  var recipients = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
  
  if (quota < recipients.length) {
    Logger.log('配額不足！剩餘：' + quota + '，需要：' + recipients.length);
    return;
  }
  
  for (var i = 0; i < recipients.length; i++) {
    MailApp.sendEmail(recipients[i], '通知', '這是一封通知郵件');
  }
  
  Logger.log('已發送 ' + recipients.length + ' 封郵件');
}
```

## 最佳實踐

### 1. 錯誤處理

```javascript
function sendEmailWithErrorHandling() {
  try {
    var recipient = 'student@example.com';
    var subject = '測試郵件';
    var body = '這是測試內容';
    
    MailApp.sendEmail(recipient, subject, body);
    Logger.log('郵件發送成功');
  } catch (error) {
    Logger.log('郵件發送失敗：' + error.message);
  }
}
```

### 2. 驗證 Email 格式

```javascript
function validateAndSendEmail(recipient, subject, body) {
  // 簡單的 Email 格式驗證
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(recipient)) {
    Logger.log('Email 格式不正確：' + recipient);
    return false;
  }
  
  try {
    MailApp.sendEmail(recipient, subject, body);
    Logger.log('郵件已發送給：' + recipient);
    return true;
  } catch (error) {
    Logger.log('發送失敗：' + error.message);
    return false;
  }
}
```

### 3. 記錄發送狀態

```javascript
function sendEmailAndLog() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('發送記錄');
  var recipient = 'student@example.com';
  var subject = '課程通知';
  var body = '您好，這是課程通知。';
  
  try {
    MailApp.sendEmail(recipient, subject, body);
    
    // 記錄成功
    sheet.appendRow([
      new Date(),
      recipient,
      subject,
      '成功',
      ''
    ]);
  } catch (error) {
    // 記錄失敗
    sheet.appendRow([
      new Date(),
      recipient,
      subject,
      '失敗',
      error.message
    ]);
  }
}
```

## 常見問題

### Q1: 為什麼我的郵件被標記為垃圾郵件？

**可能原因：**
- 郵件內容包含過多連結
- 使用了垃圾郵件常見的關鍵字
- 短時間內發送大量郵件
- 沒有設定適當的寄件者名稱

**解決方案：**
- 使用 `name` 選項設定寄件者名稱
- 避免使用全大寫或過多驚嘆號
- 分批發送郵件，避免短時間大量發送
- 在郵件中加入取消訂閱連結

### Q2: 如何發送大量郵件？

建議使用批次處理並加入延遲：

```javascript
function sendBulkEmails() {
  var recipients = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
  
  for (var i = 0; i < recipients.length; i++) {
    MailApp.sendEmail(recipients[i], '通知', '郵件內容');
    
    // 每發送 10 封就暫停 1 秒
    if ((i + 1) % 10 === 0) {
      Utilities.sleep(1000);
    }
  }
}
```

### Q3: 如何在郵件中嵌入圖片？

使用 `inlineImages` 選項：

```javascript
function sendEmailWithInlineImage() {
  var imageBlob = DriveApp.getFileById('IMAGE_FILE_ID').getBlob();
  
  var htmlBody = '<p>您好，</p>' +
                 '<p>以下是活動海報：</p>' +
                 '<img src="cid:poster" width="400">';
  
  MailApp.sendEmail('student@example.com', '活動海報', '', {
    htmlBody: htmlBody,
    inlineImages: {
      poster: imageBlob
    }
  });
}
```

## 小結

本講義介紹了 MailApp 與 GmailApp 的核心功能：

✅ **MailApp 基本用法**：發送文字郵件、HTML 郵件、帶附件郵件
✅ **進階選項**：副本、密件副本、回覆地址、寄件者名稱
✅ **GmailApp 進階功能**：讀取郵件、標籤管理、草稿管理、搜尋郵件
✅ **配額管理**：了解發送限制並檢查剩餘配額
✅ **最佳實踐**：錯誤處理、格式驗證、發送記錄

下一步，我們將學習如何使用時間觸發器（Trigger）來自動化郵件發送！
