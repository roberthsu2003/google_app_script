/**
 * 實作案例 7：每日報表寄送機器人
 * 
 * 功能：
 * 1. 提供 Web 介面設定報表參數
 * 2. 從試算表提取資料並產生 HTML 報表
 * 3. 定時自動寄送報表給指定收件者
 * 4. 支援手動觸發寄送
 */

// ==================== 設定區 ====================

// 試算表 ID（請替換為您的試算表 ID）
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// 報表設定工作表名稱
var CONFIG_SHEET_NAME = '報表設定';

// 資料來源工作表名稱
var DATA_SHEET_NAME = '銷售資料';

// ==================== 初始化函式 ====================

/**
 * 初始化系統
 * 建立必要的工作表和設定
 */
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // 建立報表設定工作表
  var configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (!configSheet) {
    configSheet = ss.insertSheet(CONFIG_SHEET_NAME);
    configSheet.getRange('A1:B1').setValues([['設定項目', '設定值']]);
    configSheet.getRange('A2:B5').setValues([
      ['收件者', 'user@example.com'],
      ['報表類型', '每日銷售統計'],
      ['寄送時間', '09:00'],
      ['啟用狀態', '是']
    ]);
  }
  
  // 建立資料來源工作表（範例資料）
  var dataSheet = ss.getSheetByName(DATA_SHEET_NAME);
  if (!dataSheet) {
    dataSheet = ss.insertSheet(DATA_SHEET_NAME);
    dataSheet.getRange('A1:E1').setValues([['日期', '產品', '數量', '單價', '金額']]);
    
    // 新增範例資料
    var today = new Date();
    var sampleData = [];
    for (var i = 0; i < 10; i++) {
      var date = new Date(today);
      date.setDate(date.getDate() - i);
      sampleData.push([
        Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
        '產品' + (i % 3 + 1),
        Math.floor(Math.random() * 50) + 10,
        Math.floor(Math.random() * 500) + 100,
        '=C' + (i + 2) + '*D' + (i + 2)
      ]);
    }
    dataSheet.getRange(2, 1, sampleData.length, 5).setValues(sampleData);
  }
  
  Logger.log('系統初始化完成');
}

// ==================== Web App 介面 ====================

/**
 * 處理 GET 請求，顯示設定介面
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('報表寄送機器人')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 取得目前設定
 */
function getConfig() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  
  if (!configSheet) {
    return {
      recipient: '',
      reportType: '每日銷售統計',
      sendTime: '09:00',
      enabled: true
    };
  }
  
  var data = configSheet.getRange('A2:B5').getValues();
  
  return {
    recipient: data[0][1],
    reportType: data[1][1],
    sendTime: data[2][1],
    enabled: data[3][1] === '是'
  };
}

/**
 * 儲存設定
 */
function saveConfig(config) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
    
    if (!configSheet) {
      throw new Error('找不到設定工作表');
    }
    
    configSheet.getRange('B2:B5').setValues([
      [config.recipient],
      [config.reportType],
      [config.sendTime],
      [config.enabled ? '是' : '否']
    ]);
    
    return { success: true, message: '設定已儲存' };
  } catch (error) {
    return { success: false, message: '儲存失敗：' + error.message };
  }
}

// ==================== 資料提取 ====================

/**
 * 從試算表提取今日資料
 */
function getTodayData() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var dataSheet = ss.getSheetByName(DATA_SHEET_NAME);
  
  if (!dataSheet) {
    return [];
  }
  
  var data = dataSheet.getDataRange().getValues();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  var todayData = [];
  for (var i = 1; i < data.length; i++) {
    var rowDate = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (rowDate === today) {
      todayData.push(data[i]);
    }
  }
  
  return todayData;
}

/**
 * 計算統計資料
 */
function calculateStatistics(data) {
  if (data.length === 0) {
    return {
      totalQuantity: 0,
      totalAmount: 0,
      productCount: 0
    };
  }
  
  var totalQuantity = 0;
  var totalAmount = 0;
  var products = {};
  
  for (var i = 0; i < data.length; i++) {
    totalQuantity += data[i][2];
    totalAmount += data[i][4];
    products[data[i][1]] = true;
  }
  
  return {
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
    productCount: Object.keys(products).length
  };
}

// ==================== 報表產生 ====================

/**
 * 產生 HTML 報表
 */
function generateReport() {
  var data = getTodayData();
  var stats = calculateStatistics(data);
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy年MM月dd日');
  
  var html = '<html><head><style>';
  html += 'body { font-family: Arial, "Microsoft JhengHei", sans-serif; margin: 20px; }';
  html += 'h2 { color: #2c3e50; }';
  html += 'table { border-collapse: collapse; width: 100%; margin: 20px 0; }';
  html += 'th { background-color: #3498db; color: white; padding: 12px; text-align: left; }';
  html += 'td { border: 1px solid #ddd; padding: 10px; }';
  html += 'tr:nth-child(even) { background-color: #f2f2f2; }';
  html += '.summary { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0; }';
  html += '.summary-item { margin: 10px 0; font-size: 16px; }';
  html += '</style></head><body>';
  
  html += '<h2>📊 每日銷售報表 - ' + today + '</h2>';
  
  // 統計摘要
  html += '<div class="summary">';
  html += '<h3>統計摘要</h3>';
  html += '<div class="summary-item">📦 總銷售數量：<strong>' + stats.totalQuantity + '</strong> 件</div>';
  html += '<div class="summary-item">💰 總銷售金額：<strong>NT$ ' + stats.totalAmount.toLocaleString() + '</strong></div>';
  html += '<div class="summary-item">🏷️ 銷售產品數：<strong>' + stats.productCount + '</strong> 種</div>';
  html += '</div>';
  
  // 詳細資料表格
  html += '<h3>詳細資料</h3>';
  
  if (data.length === 0) {
    html += '<p>今日尚無銷售資料</p>';
  } else {
    html += '<table>';
    html += '<tr><th>日期</th><th>產品</th><th>數量</th><th>單價</th><th>金額</th></tr>';
    
    for (var i = 0; i < data.length; i++) {
      html += '<tr>';
      html += '<td>' + Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd') + '</td>';
      html += '<td>' + data[i][1] + '</td>';
      html += '<td>' + data[i][2] + '</td>';
      html += '<td>NT$ ' + data[i][3].toLocaleString() + '</td>';
      html += '<td>NT$ ' + data[i][4].toLocaleString() + '</td>';
      html += '</tr>';
    }
    
    html += '</table>';
  }
  
  html += '<hr><p style="color: #7f8c8d; font-size: 12px;">此報表由系統自動產生</p>';
  html += '</body></html>';
  
  return html;
}

// ==================== 郵件寄送 ====================

/**
 * 寄送報表郵件
 */
function sendReport() {
  try {
    var config = getConfig();
    
    if (!config.enabled) {
      Logger.log('報表寄送功能已停用');
      return { success: false, message: '報表寄送功能已停用' };
    }
    
    if (!config.recipient) {
      throw new Error('未設定收件者');
    }
    
    var reportHtml = generateReport();
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var subject = '每日銷售報表 - ' + today;
    
    MailApp.sendEmail({
      to: config.recipient,
      subject: subject,
      htmlBody: reportHtml
    });
    
    // 記錄寄送時間
    logSendTime();
    
    Logger.log('報表已寄送至：' + config.recipient);
    return { success: true, message: '報表已成功寄送' };
    
  } catch (error) {
    Logger.log('寄送失敗：' + error.message);
    return { success: false, message: '寄送失敗：' + error.message };
  }
}

/**
 * 記錄寄送時間
 */
function logSendTime() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var logSheet = ss.getSheetByName('寄送記錄');
  
  if (!logSheet) {
    logSheet = ss.insertSheet('寄送記錄');
    logSheet.getRange('A1:C1').setValues([['寄送時間', '收件者', '狀態']]);
  }
  
  var config = getConfig();
  var timestamp = new Date();
  
  logSheet.appendRow([
    timestamp,
    config.recipient,
    '成功'
  ]);
}

// ==================== 觸發器管理 ====================

/**
 * 設定定時觸發器
 */
function setupTrigger() {
  // 先刪除現有觸發器
  deleteTriggers();
  
  var config = getConfig();
  
  if (!config.enabled) {
    Logger.log('報表寄送功能已停用，不建立觸發器');
    return;
  }
  
  // 解析時間設定（格式：HH:mm）
  var timeParts = config.sendTime.split(':');
  var hour = parseInt(timeParts[0]);
  
  // 建立每日觸發器
  ScriptApp.newTrigger('sendReport')
    .timeBased()
    .everyDays(1)
    .atHour(hour)
    .create();
  
  Logger.log('已建立定時觸發器：每日 ' + config.sendTime + ' 寄送報表');
}

/**
 * 刪除所有觸發器
 */
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'sendReport') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  Logger.log('已刪除現有觸發器');
}

/**
 * 測試報表產生
 */
function testReport() {
  var html = generateReport();
  Logger.log(html);
  return html;
}
