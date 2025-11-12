/**
 * 單元 3：自動寄信與通知
 * 範例 5：時間觸發器範例
 * 
 * 本檔案示範如何建立、管理和使用時間觸發器
 */

/**
 * 範例 5-1：建立每天執行的觸發器
 * 
 * 建立一個每天早上 8 點執行的觸發器
 */
function example01_createDailyTrigger() {
  // 先刪除舊的觸發器（避免重複）
  deleteTriggersByFunction('sendDailyReminder');
  
  // 建立新的觸發器
  ScriptApp.newTrigger('sendDailyReminder')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  Logger.log('每日提醒觸發器已建立（每天早上 8 點執行）');
}

/**
 * 每日提醒函式（由觸發器自動執行）
 */
function sendDailyReminder() {
  Logger.log('每日提醒執行於：' + new Date());
  
  var subject = '每日提醒';
  var body = '您好，\n\n這是每日自動提醒郵件。\n\n祝有美好的一天！';
  
  MailApp.sendEmail('user@example.com', subject, body);
  Logger.log('每日提醒郵件已發送');
}

/**
 * 範例 5-2：建立每週執行的觸發器
 * 
 * 建立一個每週一早上 9 點執行的觸發器
 */
function example02_createWeeklyTrigger() {
  deleteTriggersByFunction('sendWeeklyReport');
  
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  
  Logger.log('每週報表觸發器已建立（每週一早上 9 點執行）');
}

/**
 * 每週報表函式
 */
function sendWeeklyReport() {
  Logger.log('每週報表執行於：' + new Date());
  
  var subject = '每週統計報表';
  var body = '您好，\n\n這是上週的統計報表。\n\n祝好';
  
  MailApp.sendEmail('manager@example.com', subject, body);
  Logger.log('每週報表已發送');
}

/**
 * 範例 5-3：建立每月執行的觸發器
 * 
 * 建立一個每月 1 號早上 10 點執行的觸發器
 */
function example03_createMonthlyTrigger() {
  deleteTriggersByFunction('sendMonthlyReport');
  
  ScriptApp.newTrigger('sendMonthlyReport')
    .timeBased()
    .onMonthDay(1)
    .atHour(10)
    .create();
  
  Logger.log('每月報表觸發器已建立（每月 1 號早上 10 點執行）');
}

/**
 * 每月報表函式
 */
function sendMonthlyReport() {
  Logger.log('每月報表執行於：' + new Date());
  
  var subject = '每月統計報表';
  var body = '您好，\n\n這是上個月的統計報表。\n\n祝好';
  
  MailApp.sendEmail('director@example.com', subject, body);
  Logger.log('每月報表已發送');
}

/**
 * 範例 5-4：建立每小時執行的觸發器
 * 
 * 建立一個每小時執行的觸發器
 */
function example04_createHourlyTrigger() {
  deleteTriggersByFunction('checkUpdates');
  
  ScriptApp.newTrigger('checkUpdates')
    .timeBased()
    .everyHours(1)
    .create();
  
  Logger.log('每小時檢查觸發器已建立');
}

/**
 * 每小時檢查函式
 */
function checkUpdates() {
  Logger.log('檢查更新執行於：' + new Date());
  
  // 檢查是否有新的資料需要處理
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('待處理');
  
  if (sheet) {
    var lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      Logger.log('發現 ' + (lastRow - 1) + ' 筆待處理資料');
      // 處理資料...
    } else {
      Logger.log('沒有待處理資料');
    }
  }
}

/**
 * 範例 5-5：建立每 N 分鐘執行的觸發器
 * 
 * 建立一個每 5 分鐘執行的觸發器
 */
function example05_createMinuteTrigger() {
  deleteTriggersByFunction('quickCheck');
  
  ScriptApp.newTrigger('quickCheck')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  Logger.log('每 5 分鐘檢查觸發器已建立');
}

/**
 * 快速檢查函式
 */
function quickCheck() {
  Logger.log('快速檢查執行於：' + new Date());
  // 執行快速檢查邏輯
}

/**
 * 範例 5-6：建立特定時間執行的觸發器（一次性）
 * 
 * 建立一個在特定日期時間執行的觸發器
 */
function example06_createSpecificTimeTrigger() {
  // 設定執行時間（例如：2024 年 12 月 25 日早上 9 點）
  var date = new Date('2024-12-25 09:00:00');
  
  ScriptApp.newTrigger('sendChristmasGreeting')
    .timeBased()
    .at(date)
    .create();
  
  Logger.log('聖誕節問候觸發器已建立（' + date + '）');
}

/**
 * 聖誕節問候函式
 */
function sendChristmasGreeting() {
  Logger.log('聖誕節問候執行於：' + new Date());
  
  var subject = '聖誕快樂！';
  var body = '祝您聖誕快樂，新年快樂！';
  
  MailApp.sendEmail('everyone@example.com', subject, body);
  Logger.log('聖誕節問候已發送');
}

/**
 * 範例 5-7：查看所有觸發器
 * 
 * 列出專案中的所有觸發器
 */
function example07_listAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('=== 觸發器清單 ===');
  Logger.log('目前共有 ' + triggers.length + ' 個觸發器\n');
  
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    
    Logger.log('觸發器 ' + (i + 1) + '：');
    Logger.log('  函式名稱：' + trigger.getHandlerFunction());
    Logger.log('  觸發器 ID：' + trigger.getUniqueId());
    Logger.log('  事件類型：' + trigger.getEventType());
    Logger.log('');
  }
}

/**
 * 範例 5-8：刪除特定函式的所有觸發器
 * 
 * 刪除指定函式名稱的所有觸發器
 */
function example08_deleteSpecificTriggers() {
  var functionName = 'sendDailyReminder';
  var deletedCount = deleteTriggersByFunction(functionName);
  
  Logger.log('已刪除 ' + deletedCount + ' 個 ' + functionName + ' 的觸發器');
}

/**
 * 輔助函式：刪除特定函式的所有觸發器
 */
function deleteTriggersByFunction(functionName) {
  var triggers = ScriptApp.getProjectTriggers();
  var deletedCount = 0;
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
      deletedCount++;
    }
  }
  
  return deletedCount;
}

/**
 * 範例 5-9：刪除所有觸發器
 * 
 * 刪除專案中的所有觸發器
 */
function example09_deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  var count = triggers.length;
  
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  Logger.log('已刪除所有觸發器（共 ' + count + ' 個）');
}

/**
 * 範例 5-10：帶錯誤處理的觸發器函式
 * 
 * 示範如何在觸發器函式中加入完整的錯誤處理
 */
function example10_triggerWithErrorHandling() {
  var startTime = new Date();
  Logger.log('=== 開始執行 ===');
  Logger.log('執行時間：' + startTime);
  
  try {
    // 主要邏輯
    var result = processData();
    
    var endTime = new Date();
    var duration = (endTime - startTime) / 1000;
    
    Logger.log('執行成功');
    Logger.log('處理結果：' + result);
    Logger.log('執行時間：' + duration + ' 秒');
    
  } catch (error) {
    Logger.log('執行失敗：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
    
    // 發送錯誤通知給管理員
    try {
      MailApp.sendEmail(
        'admin@example.com',
        '觸發器執行失敗通知',
        '觸發器執行時發生錯誤：\n\n' +
        '錯誤訊息：' + error.message + '\n\n' +
        '錯誤堆疊：\n' + error.stack
      );
    } catch (mailError) {
      Logger.log('無法發送錯誤通知：' + mailError.message);
    }
  }
  
  Logger.log('=== 執行結束 ===\n');
}

/**
 * 模擬資料處理函式
 */
function processData() {
  // 模擬處理邏輯
  return '處理完成';
}

/**
 * 範例 5-11：檢查配額後再執行
 * 
 * 在執行前檢查郵件配額是否足夠
 */
function example11_checkQuotaBeforeRun() {
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log('剩餘郵件配額：' + quota + ' 封');
  
  if (quota < 10) {
    Logger.log('配額不足，停止執行');
    
    // 通知管理員配額不足
    if (quota > 0) {
      MailApp.sendEmail(
        'admin@example.com',
        '郵件配額不足警告',
        '目前剩餘配額：' + quota + ' 封\n請注意配額使用情況。'
      );
    }
    
    return;
  }
  
  // 配額足夠，繼續執行
  Logger.log('配額充足，開始執行');
  sendBatchEmails();
}

/**
 * 批次發送郵件
 */
function sendBatchEmails() {
  // 批次發送邏輯
  Logger.log('批次發送郵件中...');
}

/**
 * 範例 5-12：使用 PropertiesService 儲存觸發器參數
 * 
 * 示範如何為觸發器函式傳遞參數
 */
function example12_setupTriggerWithParams() {
  // 儲存參數
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty('recipient', 'user@example.com');
  properties.setProperty('subject', '自動通知');
  properties.setProperty('message', '這是自動發送的通知郵件');
  
  // 建立觸發器
  deleteTriggersByFunction('sendEmailWithParams');
  
  ScriptApp.newTrigger('sendEmailWithParams')
    .timeBased()
    .everyDays(1)
    .atHour(10)
    .create();
  
  Logger.log('帶參數的觸發器已建立');
}

/**
 * 使用儲存的參數發送郵件
 */
function sendEmailWithParams() {
  var properties = PropertiesService.getScriptProperties();
  
  var recipient = properties.getProperty('recipient');
  var subject = properties.getProperty('subject');
  var message = properties.getProperty('message');
  
  if (recipient && subject && message) {
    MailApp.sendEmail(recipient, subject, message);
    Logger.log('郵件已發送給：' + recipient);
  } else {
    Logger.log('參數不完整，無法發送郵件');
  }
}

/**
 * 範例 5-13：分批處理大量資料
 * 
 * 示範如何在觸發器中分批處理大量資料
 */
function example13_processBatchData() {
  var properties = PropertiesService.getScriptProperties();
  var lastProcessedRow = parseInt(properties.getProperty('lastProcessedRow') || '1');
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('資料');
  var totalRows = sheet.getLastRow();
  
  // 每次處理 100 筆
  var batchSize = 100;
  var startRow = lastProcessedRow + 1;
  var endRow = Math.min(startRow + batchSize - 1, totalRows);
  
  if (startRow > totalRows) {
    Logger.log('所有資料已處理完成');
    properties.setProperty('lastProcessedRow', '1'); // 重置
    return;
  }
  
  Logger.log('處理第 ' + startRow + ' 到 ' + endRow + ' 列');
  
  var data = sheet.getRange(startRow, 1, endRow - startRow + 1, sheet.getLastColumn()).getValues();
  
  for (var i = 0; i < data.length; i++) {
    // 處理每一列資料
    processRow(data[i]);
  }
  
  // 更新處理進度
  properties.setProperty('lastProcessedRow', endRow.toString());
  
  Logger.log('已處理到第 ' + endRow + ' 列（共 ' + totalRows + ' 列）');
}

/**
 * 處理單列資料
 */
function processRow(row) {
  // 處理邏輯
  Logger.log('處理資料：' + row[0]);
}

/**
 * 範例 5-14：設定多個不同時間的觸發器
 * 
 * 建立多個在不同時間執行的觸發器
 */
function example14_setupMultipleTriggers() {
  // 清除舊的觸發器
  deleteTriggersByFunction('morningTask');
  deleteTriggersByFunction('afternoonTask');
  deleteTriggersByFunction('eveningTask');
  
  // 早上 8 點
  ScriptApp.newTrigger('morningTask')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  // 下午 2 點
  ScriptApp.newTrigger('afternoonTask')
    .timeBased()
    .everyDays(1)
    .atHour(14)
    .create();
  
  // 晚上 8 點
  ScriptApp.newTrigger('eveningTask')
    .timeBased()
    .everyDays(1)
    .atHour(20)
    .create();
  
  Logger.log('已建立 3 個不同時間的觸發器');
}

function morningTask() {
  Logger.log('早上任務執行於：' + new Date());
}

function afternoonTask() {
  Logger.log('下午任務執行於：' + new Date());
}

function eveningTask() {
  Logger.log('晚上任務執行於：' + new Date());
}

/**
 * 範例 5-15：觸發器執行記錄
 * 
 * 將觸發器執行記錄寫入試算表
 */
function example15_logTriggerExecution() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('執行記錄');
  
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('執行記錄');
    sheet.appendRow(['執行時間', '函式名稱', '狀態', '訊息']);
  }
  
  var functionName = 'example15_logTriggerExecution';
  var status = '成功';
  var message = '觸發器正常執行';
  
  try {
    // 執行主要邏輯
    doSomething();
    
  } catch (error) {
    status = '失敗';
    message = error.message;
  }
  
  // 記錄執行結果
  sheet.appendRow([
    new Date(),
    functionName,
    status,
    message
  ]);
  
  Logger.log('執行記錄已寫入試算表');
}

function doSomething() {
  // 模擬執行邏輯
  Logger.log('執行某些操作...');
}

/**
 * 練習題：
 * 
 * 1. 建立一個每天下午 5 點發送「下班提醒」的觸發器
 * 2. 建立一個每週五下午 3 點產生「本週總結報表」的觸發器
 * 3. 建立一個每 30 分鐘檢查「待審核項目」的觸發器
 * 4. 建立一個函式，可以一次建立多個觸發器（早、中、晚各一個）
 * 5. 建立一個函式，列出所有觸發器並顯示下次執行時間
 */
