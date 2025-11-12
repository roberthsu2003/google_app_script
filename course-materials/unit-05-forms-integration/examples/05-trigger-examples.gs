/**
 * FormApp 範例 5：表單觸發器
 * 
 * 本範例展示如何建立和使用表單提交觸發器
 */

/**
 * 範例 5.1：建立表單提交觸發器
 */
function example5_1_createFormTrigger() {
  var form = FormApp.getActiveForm();
  
  // 建立表單提交觸發器
  ScriptApp.newTrigger('onFormSubmitHandler')
    .forForm(form)
    .onFormSubmit()
    .create();
  
  Logger.log('表單提交觸發器已建立');
  Logger.log('處理函式：onFormSubmitHandler');
}

/**
 * 範例 5.2：從試算表建立觸發器（推薦）
 */
function example5_2_createSpreadsheetTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 建立試算表的表單提交觸發器
  ScriptApp.newTrigger('onFormSubmitHandler')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  Logger.log('試算表表單提交觸發器已建立');
}

/**
 * 範例 5.3：基本觸發器處理函式
 */
function onFormSubmitHandler(e) {
  Logger.log('表單已提交！');
  Logger.log('觸發時間：' + new Date());
  
  // 取得回應物件
  var response = e.response;
  Logger.log('回應時間：' + response.getTimestamp());
  Logger.log('回應者：' + response.getRespondentEmail());
}

/**
 * 範例 5.4：讀取事件物件資料
 */
function onFormSubmitWithData(e) {
  // 方法 1：從 response 物件取得
  if (e.response) {
    var response = e.response;
    var itemResponses = response.getItemResponses();
    
    Logger.log('=== 從 response 物件取得 ===');
    itemResponses.forEach(function(itemResponse) {
      var question = itemResponse.getItem().getTitle();
      var answer = itemResponse.getResponse();
      Logger.log(question + ': ' + answer);
    });
  }
  
  // 方法 2：從 namedValues 取得（試算表觸發器）
  if (e.namedValues) {
    Logger.log('=== 從 namedValues 取得 ===');
    for (var key in e.namedValues) {
      Logger.log(key + ': ' + e.namedValues[key][0]);
    }
  }
  
  // 方法 3：從 values 陣列取得（試算表觸發器）
  if (e.values) {
    Logger.log('=== 從 values 陣列取得 ===');
    Logger.log('資料：' + e.values.join(', '));
  }
}

/**
 * 範例 5.5：發送確認郵件
 */
function onFormSubmitSendConfirmation(e) {
  var response = e.response;
  var email = response.getRespondentEmail();
  
  if (!email) {
    Logger.log('未收集 Email，無法發送確認信');
    return;
  }
  
  var form = FormApp.getActiveForm();
  var subject = '【確認】' + form.getTitle() + ' 已收到您的回應';
  var body = '您好，\n\n' +
             '感謝您填寫表單。\n' +
             '我們已收到您的回應，將盡快處理。\n\n' +
             '回應時間：' + response.getTimestamp() + '\n\n' +
             '此為系統自動發送的郵件。';
  
  MailApp.sendEmail(email, subject, body);
  Logger.log('確認郵件已發送至：' + email);
}

/**
 * 範例 5.6：根據回應內容發送不同郵件
 */
function onFormSubmitConditionalEmail(e) {
  var namedValues = e.namedValues;
  var email = namedValues['Email'][0];
  var satisfaction = namedValues['滿意度'][0];
  
  var subject = '感謝您的回饋';
  var body = '';
  
  if (satisfaction === '非常滿意' || satisfaction === '滿意') {
    body = '感謝您的肯定！我們會繼續努力。';
  } else if (satisfaction === '普通') {
    body = '感謝您的回饋，我們會努力改進。';
  } else {
    body = '很抱歉未能達到您的期望，我們會盡快改善。';
  }
  
  MailApp.sendEmail(email, subject, body);
  Logger.log('已發送郵件至：' + email);
}

/**
 * 範例 5.7：自動標註狀態
 */
function onFormSubmitAddStatus(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var lastCol = sheet.getLastColumn();
  
  // 新增「待處理」狀態
  sheet.getRange(row, lastCol + 1).setValue('待處理');
  
  // 設定背景顏色（淺黃色）
  sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#fff3cd');
  
  // 新增處理時間欄位
  sheet.getRange(row, lastCol + 2).setValue(new Date());
  
  Logger.log('已標註第 ' + row + ' 列為待處理');
}

/**
 * 範例 5.8：通知管理員
 */
function onFormSubmitNotifyAdmin(e) {
  var namedValues = e.namedValues;
  
  // 整理回應內容
  var content = '';
  for (var key in namedValues) {
    content += key + '：' + namedValues[key][0] + '\n';
  }
  
  // 發送通知給管理員
  var adminEmail = 'admin@example.com'; // 請替換為實際的管理員 Email
  var subject = '【新回應】收到新的表單提交';
  var body = '收到新的表單回應：\n\n' + content;
  
  MailApp.sendEmail(adminEmail, subject, body);
  Logger.log('已通知管理員');
}

/**
 * 範例 5.9：資料驗證與條件處理
 */
function onFormSubmitValidateData(e) {
  var namedValues = e.namedValues;
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var lastCol = sheet.getLastColumn();
  
  // 取得年齡
  var age = parseInt(namedValues['年齡'][0]);
  var email = namedValues['Email'][0];
  
  if (age < 18) {
    // 未滿 18 歲
    sheet.getRange(row, lastCol + 1).setValue('需要家長同意');
    sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#ffcccc');
    
    MailApp.sendEmail(
      email,
      '需要家長同意',
      '由於您未滿 18 歲，需要家長同意才能參加。'
    );
  } else {
    // 已滿 18 歲
    sheet.getRange(row, lastCol + 1).setValue('已確認');
    sheet.getRange(row, 1, 1, lastCol + 1).setBackground('#ccffcc');
    
    MailApp.sendEmail(
      email,
      '報名確認',
      '您的報名已確認，感謝您的參與！'
    );
  }
  
  Logger.log('資料驗證完成');
}

/**
 * 範例 5.10：自動產生編號
 */
function onFormSubmitGenerateId(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // 產生編號（格式：YYYYMMDD-XXX）
  var today = new Date();
  var dateStr = Utilities.formatDate(today, 'GMT+8', 'yyyyMMdd');
  
  // 計算今天的第幾筆
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
  var id = dateStr + '-' + String(todayCount).padStart(3, '0');
  
  // 寫入編號（假設在第 2 欄）
  sheet.getRange(row, 2).setValue(id);
  
  Logger.log('已產生編號：' + id);
}

/**
 * 範例 5.11：列出所有觸發器
 */
function example5_11_listTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('觸發器總數：' + triggers.length);
  Logger.log('');
  
  triggers.forEach(function(trigger, index) {
    Logger.log('=== 觸發器 ' + (index + 1) + ' ===');
    Logger.log('處理函式：' + trigger.getHandlerFunction());
    Logger.log('事件類型：' + trigger.getEventType());
    Logger.log('觸發器 ID：' + trigger.getUniqueId());
    Logger.log('');
  });
}

/**
 * 範例 5.12：刪除表單觸發器
 */
function example5_12_deleteFormTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  var deletedCount = 0;
  
  triggers.forEach(function(trigger) {
    if (trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
      ScriptApp.deleteTrigger(trigger);
      deletedCount++;
      Logger.log('已刪除觸發器：' + trigger.getHandlerFunction());
    }
  });
  
  Logger.log('共刪除 ' + deletedCount + ' 個表單觸發器');
}

/**
 * 範例 5.13：刪除所有觸發器
 */
function example5_13_deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  
  Logger.log('已刪除所有觸發器（共 ' + triggers.length + ' 個）');
}

/**
 * 範例 5.14：觸發器錯誤處理
 */
function onFormSubmitWithErrorHandling(e) {
  try {
    // 你的程式碼
    var namedValues = e.namedValues;
    var email = namedValues['Email'][0];
    
    // 發送郵件
    MailApp.sendEmail(email, '測試', '這是測試郵件');
    
    Logger.log('處理成功');
    
  } catch (error) {
    // 記錄錯誤
    Logger.log('錯誤：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
    
    // 發送錯誤通知
    MailApp.sendEmail(
      'admin@example.com',
      '觸發器執行錯誤',
      '錯誤訊息：' + error.message + '\n\n' +
      '錯誤堆疊：' + error.stack
    );
  }
}

/**
 * 範例 5.15：寫入錯誤日誌
 */
function onFormSubmitWithLogging(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = ss.getSheetByName('執行日誌');
  
  // 如果日誌工作表不存在，建立它
  if (!logSheet) {
    logSheet = ss.insertSheet('執行日誌');
    logSheet.appendRow(['時間', '狀態', '訊息']);
  }
  
  try {
    // 你的程式碼
    var namedValues = e.namedValues;
    
    // 記錄成功
    logSheet.appendRow([
      new Date(),
      '成功',
      '表單提交處理完成'
    ]);
    
  } catch (error) {
    // 記錄錯誤
    logSheet.appendRow([
      new Date(),
      '錯誤',
      error.message
    ]);
  }
}
