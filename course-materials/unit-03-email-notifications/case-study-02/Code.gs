/**
 * 實作案例 2：自動寄送通知信系統
 * 
 * 功能說明：
 * 1. 從試算表讀取待通知名單
 * 2. 根據通知類型產生客製化郵件內容
 * 3. 批次發送郵件並記錄狀態
 * 4. 使用時間觸發器實現自動化執行
 * 5. 完整的錯誤處理與重試機制
 */

// ==================== 基礎函式 ====================

/**
 * 取得試算表物件
 */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * 取得通知名單工作表
 */
function getNotificationSheet() {
  return getSpreadsheet().getSheetByName('通知名單');
}

/**
 * 取得發送記錄工作表
 */
function getLogSheet() {
  return getSpreadsheet().getSheetByName('發送記錄');
}

// ==================== 資料讀取函式 ====================

/**
 * 讀取所有通知名單
 * @return {Array} 通知名單陣列
 */
function getNotificationList() {
  var sheet = getNotificationSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log('通知名單為空');
    return [];
  }
  
  // 讀取資料（從第 2 列開始，排除標題列）
  var data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  // 轉換為物件陣列
  var notifications = [];
  
  for (var i = 0; i < data.length; i++) {
    notifications.push({
      row: i + 2,  // 實際列號
      name: data[i][0],
      email: data[i][1],
      type: data[i][2],
      status: data[i][3],
      sentTime: data[i][4],
      note: data[i][5],
      retryCount: data[i][6] || 0
    });
  }
  
  return notifications;
}

/**
 * 過濾出待發送的通知
 * @param {Array} notifications 所有通知
 * @return {Array} 待發送的通知
 */
function getPendingNotifications(notifications) {
  var pending = [];
  
  for (var i = 0; i < notifications.length; i++) {
    if (notifications[i].status === '待發送') {
      pending.push(notifications[i]);
    }
  }
  
  return pending;
}

// ==================== 郵件內容產生函式 ====================

/**
 * 產生課程提醒郵件內容
 */
function generateCourseReminderEmail(name, note) {
  var subject = '課程提醒';
  var body = name + ' 同學您好，\n\n' +
             '提醒您：' + note + '\n\n' +
             '請準時出席。\n\n' +
             '祝學習愉快！';
  
  return {
    subject: subject,
    body: body
  };
}

/**
 * 產生作業提醒郵件內容
 */
function generateHomeworkReminderEmail(name, note) {
  var subject = '作業提醒';
  var body = name + ' 同學您好，\n\n' +
             '提醒您：' + note + '\n\n' +
             '請記得準時繳交作業。\n\n' +
             '祝學習順利！';
  
  return {
    subject: subject,
    body: body
  };
}

/**
 * 產生活動通知郵件內容
 */
function generateEventNotificationEmail(name, note) {
  var subject = '活動通知';
  var body = name + ' 同學您好，\n\n' +
             '活動資訊：' + note + '\n\n' +
             '歡迎參加！\n\n' +
             '祝好';
  
  return {
    subject: subject,
    body: body
  };
}

/**
 * 產生成績通知郵件內容
 */
function generateGradeNotificationEmail(name, note) {
  var subject = '成績通知';
  var body = name + ' 同學您好，\n\n' +
             '成績資訊：' + note + '\n\n' +
             '如有疑問請與老師聯繫。\n\n' +
             '祝學習進步！';
  
  return {
    subject: subject,
    body: body
  };
}

/**
 * 根據通知類型產生郵件內容
 * @param {Object} notification 通知物件
 * @return {Object} 郵件內容 {subject, body}
 */
function generateEmailContent(notification) {
  var name = notification.name;
  var type = notification.type;
  var note = notification.note;
  
  switch (type) {
    case '課程提醒':
      return generateCourseReminderEmail(name, note);
    
    case '作業提醒':
      return generateHomeworkReminderEmail(name, note);
    
    case '活動通知':
      return generateEventNotificationEmail(name, note);
    
    case '成績通知':
      return generateGradeNotificationEmail(name, note);
    
    default:
      // 預設範本
      return {
        subject: '通知',
        body: name + ' 您好，\n\n' + note + '\n\n祝好'
      };
  }
}

// ==================== 郵件發送函式 ====================

/**
 * 驗證 Email 格式
 * @param {String} email Email 地址
 * @return {Boolean} 是否有效
 */
function isValidEmail(email) {
  if (!email || email.trim() === '') {
    return false;
  }
  
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * 發送單封通知郵件
 * @param {Object} notification 通知物件
 * @return {Object} 發送結果 {success, message}
 */
function sendNotificationEmail(notification) {
  // 驗證 Email
  if (!isValidEmail(notification.email)) {
    return {
      success: false,
      message: 'Email 格式不正確'
    };
  }
  
  try {
    // 產生郵件內容
    var email = generateEmailContent(notification);
    
    // 發送郵件
    MailApp.sendEmail(
      notification.email,
      email.subject,
      email.body
    );
    
    Logger.log('已發送郵件給：' + notification.name + ' (' + notification.email + ')');
    
    return {
      success: true,
      message: '發送成功'
    };
    
  } catch (error) {
    Logger.log('發送失敗：' + error.message);
    
    return {
      success: false,
      message: error.message
    };
  }
}

// ==================== 狀態更新函式 ====================

/**
 * 更新通知狀態
 * @param {Number} row 列號
 * @param {String} status 狀態
 * @param {String} message 訊息（選填）
 */
function updateNotificationStatus(row, status, message) {
  var sheet = getNotificationSheet();
  
  // 更新狀態（D 欄）
  sheet.getRange(row, 4).setValue(status);
  
  // 更新寄送時間（E 欄）
  if (status === '已發送') {
    sheet.getRange(row, 5).setValue(new Date());
  }
  
  // 更新備註（F 欄）- 如果有錯誤訊息
  if (message && status === '發送失敗') {
    var currentNote = sheet.getRange(row, 6).getValue();
    var newNote = currentNote + ' [錯誤: ' + message + ']';
    sheet.getRange(row, 6).setValue(newNote);
  }
  
  // 更新重試次數（G 欄）
  if (status === '發送失敗') {
    var retryCount = sheet.getRange(row, 7).getValue() || 0;
    sheet.getRange(row, 7).setValue(retryCount + 1);
  }
}

/**
 * 記錄執行結果
 * @param {Number} total 總發送數
 * @param {Number} success 成功數
 * @param {Number} failed 失敗數
 * @param {String} status 執行狀態
 * @param {String} errorMessage 錯誤訊息（選填）
 */
function logExecution(total, success, failed, status, errorMessage) {
  var sheet = getLogSheet();
  
  sheet.appendRow([
    new Date(),
    total,
    success,
    failed,
    status,
    errorMessage || ''
  ]);
  
  Logger.log('執行記錄已寫入');
}

// ==================== 配額管理函式 ====================

/**
 * 檢查郵件配額
 * @param {Number} required 需要的配額數量
 * @return {Boolean} 配額是否足夠
 */
function checkEmailQuota(required) {
  var remaining = MailApp.getRemainingDailyQuota();
  
  Logger.log('剩餘配額：' + remaining + ' 封');
  Logger.log('需要配額：' + required + ' 封');
  
  if (remaining < required) {
    Logger.log('配額不足！');
    
    // 發送警告給管理員
    if (remaining > 0) {
      try {
        MailApp.sendEmail(
          'admin@example.com',  // 請改為實際的管理員信箱
          '郵件配額不足警告',
          '目前剩餘配額：' + remaining + ' 封\n' +
          '需要配額：' + required + ' 封\n\n' +
          '請注意配額使用情況。'
        );
      } catch (error) {
        Logger.log('無法發送警告郵件：' + error.message);
      }
    }
    
    return false;
  }
  
  return true;
}

// ==================== 主要執行函式 ====================

/**
 * 主要執行函式：檢查並發送通知郵件
 * 
 * 此函式會被時間觸發器自動執行
 */
function sendPendingNotifications() {
  var startTime = new Date();
  Logger.log('=== 開始執行自動通知系統 ===');
  Logger.log('執行時間：' + startTime);
  
  try {
    // 1. 讀取待發送名單
    var allNotifications = getNotificationList();
    var pendingNotifications = getPendingNotifications(allNotifications);
    
    Logger.log('待發送通知數：' + pendingNotifications.length);
    
    if (pendingNotifications.length === 0) {
      Logger.log('沒有待發送的通知');
      logExecution(0, 0, 0, '成功', '沒有待發送通知');
      return;
    }
    
    // 2. 檢查配額
    if (!checkEmailQuota(pendingNotifications.length)) {
      logExecution(0, 0, 0, '失敗', '郵件配額不足');
      return;
    }
    
    // 3. 逐一發送郵件
    var successCount = 0;
    var failedCount = 0;
    
    for (var i = 0; i < pendingNotifications.length; i++) {
      var notification = pendingNotifications[i];
      
      Logger.log('處理第 ' + (i + 1) + ' 筆：' + notification.name);
      
      // 發送郵件
      var result = sendNotificationEmail(notification);
      
      // 更新狀態
      if (result.success) {
        updateNotificationStatus(notification.row, '已發送');
        successCount++;
      } else {
        updateNotificationStatus(notification.row, '發送失敗', result.message);
        failedCount++;
      }
      
      // 避免觸發速率限制，每發送一封就暫停 0.5 秒
      Utilities.sleep(500);
    }
    
    // 4. 記錄執行結果
    var endTime = new Date();
    var duration = (endTime - startTime) / 1000;
    
    Logger.log('執行完成');
    Logger.log('總發送數：' + pendingNotifications.length);
    Logger.log('成功數：' + successCount);
    Logger.log('失敗數：' + failedCount);
    Logger.log('執行時間：' + duration + ' 秒');
    
    logExecution(
      pendingNotifications.length,
      successCount,
      failedCount,
      '成功',
      ''
    );
    
  } catch (error) {
    Logger.log('執行失敗：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
    
    // 記錄錯誤
    logExecution(0, 0, 0, '失敗', error.message);
    
    // 通知管理員
    try {
      MailApp.sendEmail(
        'admin@example.com',  // 請改為實際的管理員信箱
        '自動通知系統執行失敗',
        '系統執行時發生錯誤：\n\n' +
        '錯誤訊息：' + error.message + '\n\n' +
        '錯誤堆疊：\n' + error.stack
      );
    } catch (mailError) {
      Logger.log('無法發送錯誤通知：' + mailError.message);
    }
  }
  
  Logger.log('=== 執行結束 ===\n');
}

// ==================== 重試機制 ====================

/**
 * 重試失敗的通知（重試次數小於 3 次）
 */
function retryFailedNotifications() {
  Logger.log('=== 開始重試失敗的通知 ===');
  
  var allNotifications = getNotificationList();
  var failedNotifications = [];
  
  // 找出需要重試的通知
  for (var i = 0; i < allNotifications.length; i++) {
    var notification = allNotifications[i];
    
    if (notification.status === '發送失敗' && notification.retryCount < 3) {
      failedNotifications.push(notification);
    }
  }
  
  Logger.log('需要重試的通知數：' + failedNotifications.length);
  
  if (failedNotifications.length === 0) {
    Logger.log('沒有需要重試的通知');
    return;
  }
  
  // 檢查配額
  if (!checkEmailQuota(failedNotifications.length)) {
    Logger.log('配額不足，無法重試');
    return;
  }
  
  // 重新發送
  var successCount = 0;
  var failedCount = 0;
  
  for (var i = 0; i < failedNotifications.length; i++) {
    var notification = failedNotifications[i];
    
    Logger.log('重試第 ' + (i + 1) + ' 筆：' + notification.name);
    
    var result = sendNotificationEmail(notification);
    
    if (result.success) {
      updateNotificationStatus(notification.row, '已發送');
      successCount++;
      Logger.log('重試成功：' + notification.name);
    } else {
      updateNotificationStatus(notification.row, '發送失敗', result.message);
      failedCount++;
      Logger.log('重試失敗：' + notification.name);
    }
    
    Utilities.sleep(500);
  }
  
  Logger.log('重試完成 - 成功：' + successCount + '，失敗：' + failedCount);
  Logger.log('=== 重試結束 ===\n');
}

// ==================== 觸發器管理函式 ====================

/**
 * 設定每日自動執行觸發器
 * 
 * 執行此函式以建立每天早上 8 點自動執行的觸發器
 */
function setupDailyTrigger() {
  // 先刪除舊的觸發器
  deleteTriggers('sendPendingNotifications');
  
  // 建立新的觸發器（每天早上 8 點執行）
  ScriptApp.newTrigger('sendPendingNotifications')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  Logger.log('每日自動執行觸發器已設定（每天早上 8 點）');
}

/**
 * 刪除特定函式的所有觸發器
 */
function deleteTriggers(functionName) {
  var triggers = ScriptApp.getProjectTriggers();
  var deletedCount = 0;
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
      deletedCount++;
    }
  }
  
  Logger.log('已刪除 ' + deletedCount + ' 個 ' + functionName + ' 的觸發器');
}

/**
 * 查看所有觸發器
 */
function listTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('=== 觸發器清單 ===');
  Logger.log('目前共有 ' + triggers.length + ' 個觸發器\n');
  
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    
    Logger.log('觸發器 ' + (i + 1) + '：');
    Logger.log('  函式名稱：' + trigger.getHandlerFunction());
    Logger.log('  觸發器 ID：' + trigger.getUniqueId());
    Logger.log('');
  }
}

// ==================== 測試函式 ====================

/**
 * 測試讀取通知名單
 */
function testReadNotifications() {
  Logger.log('=== 測試讀取通知名單 ===');
  
  var allNotifications = getNotificationList();
  Logger.log('總通知數：' + allNotifications.length);
  
  var pendingNotifications = getPendingNotifications(allNotifications);
  Logger.log('待發送數：' + pendingNotifications.length);
  
  // 顯示第一筆待發送通知
  if (pendingNotifications.length > 0) {
    var first = pendingNotifications[0];
    Logger.log('\n第一筆待發送通知：');
    Logger.log('姓名：' + first.name);
    Logger.log('Email：' + first.email);
    Logger.log('類型：' + first.type);
    Logger.log('備註：' + first.note);
  }
}

/**
 * 測試郵件內容產生
 */
function testGenerateEmail() {
  Logger.log('=== 測試郵件內容產生 ===');
  
  var testNotification = {
    name: '王小明',
    type: '課程提醒',
    note: '下週一有 JavaScript 課程'
  };
  
  var email = generateEmailContent(testNotification);
  
  Logger.log('主旨：' + email.subject);
  Logger.log('內容：\n' + email.body);
}

/**
 * 測試發送單封郵件
 * 
 * 注意：請將 Email 改為你自己的信箱
 */
function testSendEmail() {
  Logger.log('=== 測試發送郵件 ===');
  
  var testNotification = {
    name: '測試用戶',
    email: 'your-email@example.com',  // 請改為你的信箱
    type: '課程提醒',
    note: '這是一封測試郵件'
  };
  
  var result = sendNotificationEmail(testNotification);
  
  Logger.log('發送結果：' + (result.success ? '成功' : '失敗'));
  Logger.log('訊息：' + result.message);
}

/**
 * 測試配額檢查
 */
function testCheckQuota() {
  Logger.log('=== 測試配額檢查 ===');
  
  var remaining = MailApp.getRemainingDailyQuota();
  Logger.log('剩餘配額：' + remaining + ' 封');
  
  var result = checkEmailQuota(10);
  Logger.log('配額是否足夠（需要 10 封）：' + (result ? '是' : '否'));
}
