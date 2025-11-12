/**
 * 單元 3：自動寄信與通知
 * 範例 3：帶附件郵件範例
 * 
 * 本檔案示範如何使用 MailApp 發送帶有附件的郵件
 * 包含從 Google Drive 取得檔案、產生 PDF、建立 CSV 等
 */

/**
 * 範例 3-1：發送 Google Drive 檔案作為附件
 * 
 * 從 Google Drive 取得檔案並作為附件發送
 * 注意：請將 'YOUR_FILE_ID_HERE' 替換為實際的檔案 ID
 */
function example01_sendEmailWithDriveFile() {
  var recipient = 'student@example.com';
  var subject = '課程講義';
  var body = '您好，\n\n附件為本週課程講義，請下載參考。\n\n祝學習愉快！';
  
  // 從 Google Drive 取得檔案
  // 檔案 ID 可以從檔案的分享連結中取得
  var fileId = 'YOUR_FILE_ID_HERE';
  var file = DriveApp.getFileById(fileId);
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [file.getAs(MimeType.PDF)],
    name: '課程助教'
  });
  
  Logger.log('已發送郵件並附上檔案：' + file.getName());
}

/**
 * 範例 3-2：發送多個附件
 * 
 * 從資料夾中取得所有檔案並作為附件發送
 */
function example02_sendEmailWithMultipleAttachments() {
  var recipient = 'student@example.com';
  var subject = '本週教材';
  var body = '您好，\n\n附件包含本週所有教材，請查收。\n\n祝學習愉快！';
  
  // 取得資料夾中的所有檔案
  var folderId = 'YOUR_FOLDER_ID_HERE';
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var attachments = [];
  
  // 將所有檔案加入附件陣列
  while (files.hasNext()) {
    var file = files.next();
    attachments.push(file.getBlob());
  }
  
  if (attachments.length > 0) {
    MailApp.sendEmail(recipient, subject, body, {
      attachments: attachments
    });
    
    Logger.log('已發送 ' + attachments.length + ' 個附件');
  } else {
    Logger.log('資料夾中沒有檔案');
  }
}

/**
 * 範例 3-3：從試算表產生 CSV 附件
 * 
 * 將試算表資料轉換為 CSV 格式並作為附件發送
 */
function example03_sendEmailWithCsvAttachment() {
  var recipient = 'teacher@example.com';
  var subject = '學生名單';
  var body = '您好，\n\n附件為學生名單 CSV 檔案。\n\n祝好';
  
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
  
  Logger.log('CSV 附件已發送');
}

/**
 * 範例 3-4：將試算表匯出為 PDF 附件
 * 
 * 將整個試算表或特定工作表匯出為 PDF 並發送
 */
function example04_sendEmailWithSpreadsheetPdf() {
  var recipient = 'teacher@example.com';
  var subject = '成績報表';
  var body = '您好，\n\n附件為本次考試的成績報表 PDF。\n\n祝好';
  
  // 取得試算表
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetId = spreadsheet.getId();
  
  // 取得特定工作表
  var sheet = spreadsheet.getSheetByName('成績');
  var sheetId = sheet.getSheetId();
  
  // 建立 PDF 匯出 URL
  var url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=pdf&gid=' + sheetId;
  
  // 取得 PDF
  var response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
    }
  });
  
  var pdfBlob = response.getBlob().setName('成績報表.pdf');
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [pdfBlob]
  });
  
  Logger.log('PDF 附件已發送');
}

/**
 * 範例 3-5：產生文字檔案附件
 * 
 * 動態產生文字內容並作為附件發送
 */
function example05_sendEmailWithTextFile() {
  var recipient = 'student@example.com';
  var subject = '課程筆記';
  var body = '您好，\n\n附件為本週課程重點筆記。\n\n祝學習愉快！';
  
  // 產生文字內容
  var noteContent = '課程重點筆記\n' +
                    '================\n\n' +
                    '1. JavaScript 變數宣告\n' +
                    '   - var: 函式作用域\n' +
                    '   - let: 區塊作用域（需 V8 runtime）\n' +
                    '   - const: 常數（需 V8 runtime）\n\n' +
                    '2. 資料型別\n' +
                    '   - String: 字串\n' +
                    '   - Number: 數字\n' +
                    '   - Boolean: 布林值\n\n' +
                    '3. 流程控制\n' +
                    '   - if-else: 條件判斷\n' +
                    '   - for: 迴圈\n' +
                    '   - while: 迴圈\n';
  
  // 建立文字檔案附件
  var textBlob = Utilities.newBlob(noteContent, 'text/plain', '課程筆記.txt');
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [textBlob]
  });
  
  Logger.log('文字檔案附件已發送');
}

/**
 * 範例 3-6：發送圖片附件
 * 
 * 從 Google Drive 取得圖片並作為附件發送
 */
function example06_sendEmailWithImage() {
  var recipient = 'student@example.com';
  var subject = '活動海報';
  var body = '您好，\n\n附件為本次活動海報，歡迎參加！\n\n祝好';
  
  // 取得圖片檔案
  var imageId = 'YOUR_IMAGE_ID_HERE';
  var image = DriveApp.getFileById(imageId);
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [image.getBlob()]
  });
  
  Logger.log('圖片附件已發送');
}

/**
 * 範例 3-7：在 HTML 郵件中嵌入圖片
 * 
 * 使用 inlineImages 選項在 HTML 郵件中嵌入圖片
 */
function example07_sendEmailWithInlineImage() {
  var recipient = 'student@example.com';
  var subject = '活動海報';
  var plainBody = '活動海報請見郵件內容。';
  
  // 取得圖片檔案
  var imageId = 'YOUR_IMAGE_ID_HERE';
  var imageBlob = DriveApp.getFileById(imageId).getBlob();
  
  // 建立 HTML 內容，使用 cid: 引用嵌入的圖片
  var htmlBody = '<div style="font-family: Arial, sans-serif;">' +
                 '  <h2>活動海報</h2>' +
                 '  <p>您好，</p>' +
                 '  <p>以下是本次活動海報：</p>' +
                 '  <img src="cid:poster" style="max-width: 600px; width: 100%;">' +
                 '  <p>歡迎參加！</p>' +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody,
    inlineImages: {
      poster: imageBlob
    }
  });
  
  Logger.log('嵌入圖片的郵件已發送');
}

/**
 * 範例 3-8：批次發送個人化附件
 * 
 * 為每位學生產生個人化的成績單 PDF 並發送
 */
function example08_sendPersonalizedAttachments() {
  // 取得學生資料
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('學生成績');
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
  
  // 為每位學生發送個人化郵件
  for (var i = 0; i < data.length; i++) {
    var name = data[i][0];
    var email = data[i][1];
    var chinese = data[i][2];
    var english = data[i][3];
    var math = data[i][4];
    
    if (email) {
      // 產生個人化成績單內容
      var reportContent = '成績單\n' +
                         '==================\n\n' +
                         '姓名：' + name + '\n\n' +
                         '科目成績：\n' +
                         '  國文：' + chinese + ' 分\n' +
                         '  英文：' + english + ' 分\n' +
                         '  數學：' + math + ' 分\n\n' +
                         '平均：' + ((chinese + english + math) / 3).toFixed(2) + ' 分\n';
      
      var reportBlob = Utilities.newBlob(reportContent, 'text/plain', name + '_成績單.txt');
      
      var subject = '個人成績單';
      var body = name + ' 同學您好，\n\n' +
                 '附件為您的個人成績單，請查收。\n\n' +
                 '祝學習進步！';
      
      MailApp.sendEmail(email, subject, body, {
        attachments: [reportBlob]
      });
      
      Logger.log('已發送成績單給：' + name);
      
      // 避免觸發配額限制，每發送一封就暫停 0.5 秒
      Utilities.sleep(500);
    }
  }
  
  Logger.log('批次發送完成');
}

/**
 * 範例 3-9：發送壓縮檔附件
 * 
 * 將多個檔案壓縮後作為附件發送
 * 注意：GAS 沒有內建的壓縮功能，此範例示範概念
 */
function example09_sendEmailWithZipConcept() {
  var recipient = 'student@example.com';
  var subject = '課程教材包';
  var body = '您好，\n\n' +
             '由於檔案較多，建議您直接從以下連結下載：\n' +
             'https://drive.google.com/folder/YOUR_FOLDER_ID\n\n' +
             '祝學習愉快！';
  
  // 實際應用中，建議提供 Google Drive 資料夾連結
  // 而不是發送大量附件或壓縮檔
  
  MailApp.sendEmail(recipient, subject, body);
  
  Logger.log('教材包連結已發送');
}

/**
 * 範例 3-10：檢查附件大小限制
 * 
 * Gmail 附件大小限制為 25MB
 * 發送前應檢查附件大小
 */
function example10_checkAttachmentSize() {
  var fileId = 'YOUR_FILE_ID_HERE';
  var file = DriveApp.getFileById(fileId);
  var fileSize = file.getSize();
  var maxSize = 25 * 1024 * 1024; // 25MB in bytes
  
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('檔案大小：' + (fileSize / 1024 / 1024).toFixed(2) + ' MB');
  
  if (fileSize > maxSize) {
    Logger.log('警告：檔案超過 25MB 限制！');
    Logger.log('建議改用 Google Drive 分享連結');
    return false;
  } else {
    Logger.log('檔案大小符合限制，可以作為附件發送');
    return true;
  }
}

/**
 * 範例 3-11：發送附件並提供 Drive 連結
 * 
 * 同時提供附件和 Google Drive 連結，讓收件者有多種選擇
 */
function example11_sendEmailWithAttachmentAndLink() {
  var recipient = 'student@example.com';
  var subject = '課程講義';
  
  var fileId = 'YOUR_FILE_ID_HERE';
  var file = DriveApp.getFileById(fileId);
  
  // 設定檔案為任何人可檢視
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var fileUrl = file.getUrl();
  
  var body = '您好，\n\n' +
             '附件為本週課程講義。\n\n' +
             '如果附件無法開啟，也可以從以下連結下載：\n' +
             fileUrl + '\n\n' +
             '祝學習愉快！';
  
  MailApp.sendEmail(recipient, subject, body, {
    attachments: [file.getAs(MimeType.PDF)]
  });
  
  Logger.log('郵件已發送，包含附件和 Drive 連結');
}

/**
 * 輔助函式：將檔案大小轉換為易讀格式
 */
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }
}

/**
 * 範例 3-12：發送附件前的完整檢查
 */
function example12_sendEmailWithFullCheck() {
  var recipient = 'student@example.com';
  var subject = '課程講義';
  var body = '您好，\n\n附件為本週課程講義。\n\n祝學習愉快！';
  
  try {
    var fileId = 'YOUR_FILE_ID_HERE';
    var file = DriveApp.getFileById(fileId);
    var fileSize = file.getSize();
    var maxSize = 25 * 1024 * 1024; // 25MB
    
    Logger.log('準備發送檔案：' + file.getName());
    Logger.log('檔案大小：' + formatFileSize(fileSize));
    
    if (fileSize > maxSize) {
      Logger.log('檔案過大，改為發送 Drive 連結');
      
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      var fileUrl = file.getUrl();
      
      body = '您好，\n\n' +
             '由於檔案較大，請從以下連結下載：\n' +
             fileUrl + '\n\n' +
             '祝學習愉快！';
      
      MailApp.sendEmail(recipient, subject, body);
    } else {
      Logger.log('檔案大小符合限制，發送附件');
      
      MailApp.sendEmail(recipient, subject, body, {
        attachments: [file.getBlob()]
      });
    }
    
    Logger.log('郵件發送成功');
    
  } catch (error) {
    Logger.log('發送失敗：' + error.message);
  }
}

/**
 * 練習題：
 * 
 * 1. 建立一個函式，將試算表的特定範圍匯出為 PDF 附件
 * 2. 建立一個函式，批次發送不同的附件給不同的收件者
 * 3. 建立一個函式，產生 JSON 格式的資料檔案並作為附件發送
 * 4. 建立一個函式，檢查資料夾中所有檔案的大小，並只發送符合限制的檔案
 * 5. 建立一個函式，為每位學生產生個人化的 HTML 格式成績單並轉為 PDF 附件
 */
