/**
 * 實作案例 6：簡易簽到系統
 * 
 * 功能：
 * 1. 建立簽到表單
 * 2. 自動判斷準時/遲到
 * 3. 發送確認郵件
 * 4. 產生每日統計報表
 */

// ==================== 設定區 ====================

// 準時時間設定（小時）
var ON_TIME_HOUR = 9;
var ON_TIME_MINUTE = 0;

// 管理員 Email（選填）
var ADMIN_EMAIL = 'admin@example.com';

// ==================== 初始設定 ====================

/**
 * 步驟 1：建立簽到表單與試算表
 */
function createAttendanceForm() {
  // 建立表單
  var form = FormApp.create('每日簽到表');
  form.setDescription('請於每日 09:00 前完成簽到');
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setConfirmationMessage('簽到成功！確認郵件已發送至您的信箱。');
  
  // 新增題目：姓名
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setHelpText('請填寫真實姓名');
  nameItem.setRequired(true);
  
  // 新增題目：Email
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  emailItem.setHelpText('請填寫常用 Email');
  emailItem.setRequired(true);
  
  // Email 驗證
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('請輸入有效的 Email 地址')
    .build();
  emailItem.setValidation(emailValidation);
  
  // 新增題目：備註
  var noteItem = form.addParagraphTextItem();
  noteItem.setTitle('備註');
  noteItem.setHelpText('如有遲到原因或其他說明，請填寫（選填）');
  noteItem.setRequired(false);
  
  // 建立試算表作為回應目的地
  var ss = SpreadsheetApp.create('簽到系統資料');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // 設定試算表格式
  var sheet = ss.getSheets()[0];
  sheet.setName('簽到記錄');
  
  // 新增標題列的額外欄位
  var lastCol = sheet.getLastColumn();
  sheet.getRange(1, lastCol + 1).setValue('狀態');
  sheet.getRange(1, lastCol + 2).setValue('簽到時間');
  
  // 格式化標題列
  sheet.getRange(1, 1, 1, lastCol + 2)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // 建立每日統計工作表
  var statsSheet = ss.insertSheet('每日統計');
  statsSheet.appendRow(['日期', '總人數', '準時人數', '遲到人數', '準時率']);
  statsSheet.getRange(1, 1, 1, 5)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  Logger.log('=== 簽到系統建立完成 ===');
  Logger.log('表單連結：' + form.getPublishedUrl());
  Logger.log('試算表連結：' + ss.getUrl());
  Logger.log('');
  Logger.log('下一步：');
  Logger.log('1. 開啟試算表');
  Logger.log('2. 在試算表的 Apps Script 編輯器中貼上程式碼');
  Logger.log('3. 執行 setupAttendanceTrigger() 設定觸發器');
  
  return {
    formUrl: form.getPublishedUrl(),
    spreadsheetUrl: ss.getUrl(),
    formId: form.getId(),
    spreadsheetId: ss.getId()
  };
}

/**
 * 步驟 2：設定表單提交觸發器
 */
function setupAttendanceTrigger() {
  // 刪除舊的觸發器（避免重複）
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onAttendanceSubmit') {
      ScriptApp.deleteTrigger(trigger);
      Logger.log('已刪除舊的觸發器');
    }
  });
  
  // 建立新的觸發器
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onAttendanceSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  Logger.log('簽到觸發器已建立成功！');
  Logger.log('當有人提交表單時，會自動執行 onAttendanceSubmit 函式');
}

// ==================== 核心功能 ====================

/**
 * 表單提交觸發器處理函式
 */
function onAttendanceSubmit(e) {
  try {
    Logger.log('=== 開始處理簽到 ===');
    
    // 取得試算表與列資訊
    var sheet = e.range.getSheet();
    var row = e.range.getRow();
    var namedValues = e.namedValues;
    
    // 取得簽到資料
    var timestamp = new Date(namedValues['時間戳記'][0]);
    var name = namedValues['姓名'][0];
    var email = namedValues['Email'][0];
    var note = namedValues['備註'] ? namedValues['備註'][0] : '';
    
    Logger.log('簽到者：' + name);
    Logger.log('Email：' + email);
    Logger.log('時間：' + timestamp);
    
    // 判斷簽到狀態
    var status = checkAttendanceStatus(timestamp);
    Logger.log('狀態：' + status);
    
    // 格式化簽到時間
    var timeStr = Utilities.formatDate(timestamp, 'GMT+8', 'HH:mm');
    
    // 寫入狀態與時間到試算表
    var lastCol = sheet.getLastColumn();
    sheet.getRange(row, lastCol - 1).setValue(status);
    sheet.getRange(row, lastCol).setValue(timeStr);
    
    // 設定背景顏色
    if (status === '準時') {
      sheet.getRange(row, 1, 1, lastCol).setBackground('#d4edda'); // 淺綠色
    } else {
      sheet.getRange(row, 1, 1, lastCol).setBackground('#f8d7da'); // 淺紅色
    }
    
    // 發送確認郵件
    sendAttendanceConfirmation(name, email, timestamp, status, note);
    
    Logger.log('簽到處理完成');
    Logger.log('===================');
    
  } catch (error) {
    Logger.log('錯誤：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
    
    // 發送錯誤通知給管理員（選擇性）
    if (ADMIN_EMAIL) {
      MailApp.sendEmail(
        ADMIN_EMAIL,
        '【錯誤】簽到系統執行錯誤',
        '錯誤訊息：' + error.message + '\n\n' +
        '錯誤堆疊：' + error.stack
      );
    }
  }
}

/**
 * 判斷簽到狀態（準時/遲到）
 */
function checkAttendanceStatus(timestamp) {
  var hour = timestamp.getHours();
  var minute = timestamp.getMinutes();
  
  // 判斷是否在準時時間之前
  if (hour < ON_TIME_HOUR) {
    return '準時';
  } else if (hour === ON_TIME_HOUR && minute <= ON_TIME_MINUTE) {
    return '準時';
  } else {
    return '遲到';
  }
}

/**
 * 發送簽到確認郵件
 */
function sendAttendanceConfirmation(name, email, timestamp, status, note) {
  var dateStr = Utilities.formatDate(timestamp, 'GMT+8', 'yyyy-MM-dd');
  var timeStr = Utilities.formatDate(timestamp, 'GMT+8', 'HH:mm:ss');
  
  var subject = '【簽到確認】' + status + ' - ' + dateStr;
  
  var body = name + ' 您好，\n\n' +
             '您的簽到已成功記錄：\n\n' +
             '日期：' + dateStr + '\n' +
             '簽到時間：' + timeStr + '\n' +
             '狀態：' + status + '\n';
  
  if (note) {
    body += '備註：' + note + '\n';
  }
  
  body += '\n';
  
  if (status === '準時') {
    body += '✓ 感謝您準時簽到！\n';
  } else {
    body += '⚠ 提醒您下次請準時簽到。\n';
  }
  
  body += '\n此為系統自動發送的郵件，請勿直接回覆。';
  
  try {
    MailApp.sendEmail(email, subject, body);
    Logger.log('確認郵件已發送至：' + email);
  } catch (error) {
    Logger.log('郵件發送失敗：' + error.message);
  }
}

// ==================== 統計功能 ====================

/**
 * 產生每日統計報表
 * 建議設定定時觸發器，每日自動執行
 */
function generateDailyStatistics() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var recordSheet = ss.getSheetByName('簽到記錄');
  var statsSheet = ss.getSheetByName('每日統計');
  
  if (!recordSheet || !statsSheet) {
    Logger.log('找不到必要的工作表');
    return;
  }
  
  // 取得今天的日期
  var today = new Date();
  var todayStr = Utilities.formatDate(today, 'GMT+8', 'yyyy-MM-dd');
  
  Logger.log('產生 ' + todayStr + ' 的統計報表');
  
  // 取得所有簽到記錄
  var data = recordSheet.getDataRange().getValues();
  
  // 統計今天的資料
  var totalCount = 0;
  var onTimeCount = 0;
  var lateCount = 0;
  
  for (var i = 1; i < data.length; i++) {
    var timestamp = data[i][0];
    
    if (timestamp instanceof Date) {
      var dateStr = Utilities.formatDate(timestamp, 'GMT+8', 'yyyy-MM-dd');
      
      if (dateStr === todayStr) {
        totalCount++;
        
        // 狀態欄位（倒數第二欄）
        var status = data[i][data[i].length - 2];
        
        if (status === '準時') {
          onTimeCount++;
        } else if (status === '遲到') {
          lateCount++;
        }
      }
    }
  }
  
  // 計算準時率
  var onTimeRate = totalCount > 0 ? 
    (onTimeCount / totalCount * 100).toFixed(1) + '%' : '0%';
  
  // 檢查今天是否已有統計記錄
  var statsData = statsSheet.getDataRange().getValues();
  var existingRow = -1;
  
  for (var i = 1; i < statsData.length; i++) {
    if (statsData[i][0] === todayStr) {
      existingRow = i + 1; // +1 因為陣列從 0 開始，但工作表從 1 開始
      break;
    }
  }
  
  // 寫入或更新統計資料
  var statsRow = [todayStr, totalCount, onTimeCount, lateCount, onTimeRate];
  
  if (existingRow > 0) {
    // 更新現有記錄
    statsSheet.getRange(existingRow, 1, 1, 5).setValues([statsRow]);
    Logger.log('已更新統計記錄');
  } else {
    // 新增記錄
    statsSheet.appendRow(statsRow);
    Logger.log('已新增統計記錄');
  }
  
  Logger.log('=== 統計結果 ===');
  Logger.log('日期：' + todayStr);
  Logger.log('總人數：' + totalCount);
  Logger.log('準時：' + onTimeCount + ' 人');
  Logger.log('遲到：' + lateCount + ' 人');
  Logger.log('準時率：' + onTimeRate);
  
  return {
    date: todayStr,
    total: totalCount,
    onTime: onTimeCount,
    late: lateCount,
    onTimeRate: onTimeRate
  };
}

/**
 * 設定每日統計定時觸發器
 * 每天晚上 23:00 自動執行
 */
function setupDailyStatisticsTrigger() {
  // 刪除舊的觸發器
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'generateDailyStatistics') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // 建立新的定時觸發器
  ScriptApp.newTrigger('generateDailyStatistics')
    .timeBased()
    .atHour(23) // 晚上 11 點
    .everyDays(1)
    .create();
  
  Logger.log('每日統計觸發器已建立（每天 23:00 執行）');
}

// ==================== 查詢功能 ====================

/**
 * 查詢特定日期的簽到記錄
 */
function queryAttendanceByDate(dateStr) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('簽到記錄');
  
  if (!sheet) {
    Logger.log('找不到簽到記錄工作表');
    return [];
  }
  
  var data = sheet.getDataRange().getValues();
  var results = [];
  
  for (var i = 1; i < data.length; i++) {
    var timestamp = data[i][0];
    
    if (timestamp instanceof Date) {
      var recordDate = Utilities.formatDate(timestamp, 'GMT+8', 'yyyy-MM-dd');
      
      if (recordDate === dateStr) {
        results.push({
          timestamp: timestamp,
          name: data[i][1],
          email: data[i][2],
          note: data[i][3],
          status: data[i][data[i].length - 2],
          time: data[i][data[i].length - 1]
        });
      }
    }
  }
  
  Logger.log('查詢 ' + dateStr + ' 的簽到記錄：' + results.length + ' 筆');
  return results;
}

/**
 * 查詢特定人員的簽到記錄
 */
function queryAttendanceByName(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('簽到記錄');
  
  if (!sheet) {
    Logger.log('找不到簽到記錄工作表');
    return [];
  }
  
  var data = sheet.getDataRange().getValues();
  var results = [];
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === name) {
      results.push({
        timestamp: data[i][0],
        name: data[i][1],
        email: data[i][2],
        note: data[i][3],
        status: data[i][data[i].length - 2],
        time: data[i][data[i].length - 1]
      });
    }
  }
  
  Logger.log('查詢 ' + name + ' 的簽到記錄：' + results.length + ' 筆');
  return results;
}

// ==================== 管理功能 ====================

/**
 * 列出所有觸發器
 */
function listAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('=== 觸發器列表 ===');
  Logger.log('總數：' + triggers.length);
  Logger.log('');
  
  triggers.forEach(function(trigger, index) {
    Logger.log((index + 1) + '. ' + trigger.getHandlerFunction());
    Logger.log('   事件類型：' + trigger.getEventType());
    Logger.log('   觸發器 ID：' + trigger.getUniqueId());
    Logger.log('');
  });
}

/**
 * 刪除所有觸發器
 */
function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  triggers.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  
  Logger.log('已刪除所有觸發器（共 ' + triggers.length + ' 個）');
}

/**
 * 測試簽到功能（不需要實際提交表單）
 */
function testAttendanceSystem() {
  Logger.log('=== 測試簽到系統 ===');
  
  // 測試準時簽到
  var onTimeTimestamp = new Date();
  onTimeTimestamp.setHours(8, 30, 0, 0);
  var onTimeStatus = checkAttendanceStatus(onTimeTimestamp);
  Logger.log('08:30 簽到 -> ' + onTimeStatus + ' (應為：準時)');
  
  // 測試遲到簽到
  var lateTimestamp = new Date();
  lateTimestamp.setHours(9, 30, 0, 0);
  var lateStatus = checkAttendanceStatus(lateTimestamp);
  Logger.log('09:30 簽到 -> ' + lateStatus + ' (應為：遲到)');
  
  // 測試邊界情況
  var boundaryTimestamp = new Date();
  boundaryTimestamp.setHours(9, 0, 0, 0);
  var boundaryStatus = checkAttendanceStatus(boundaryTimestamp);
  Logger.log('09:00 簽到 -> ' + boundaryStatus + ' (應為：準時)');
  
  Logger.log('測試完成！');
}
