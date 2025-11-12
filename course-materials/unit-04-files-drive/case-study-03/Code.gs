/**
 * 實作案例 3：Google Form 自動收集與統計
 * 
 * 功能：
 * 1. 建立課程滿意度調查表單
 * 2. 自動收集表單回應
 * 3. 統計分析回應資料
 * 4. 產生視覺化圖表
 * 5. 設定表單提交觸發器
 */

// ============================================
// 全域變數
// ============================================

// 請在這裡設定你的試算表 ID（執行 createFormAndSpreadsheet 後會自動產生）
var SPREADSHEET_ID = '';  // 執行後會自動填入

// 工作表名稱
var SHEET_RESPONSES = '表單回應';
var SHEET_STATISTICS = '統計分析';
var SHEET_OPTIONS = '選項統計';


// ============================================
// 步驟 1：建立表單與試算表
// ============================================

/**
 * 建立課程滿意度調查表單與試算表
 * 
 * 執行此函式會：
 * 1. 建立新的 Google Form 表單
 * 2. 新增各種類型的題目
 * 3. 建立對應的試算表
 * 4. 連結表單與試算表
 */
function createFormAndSpreadsheet() {
  // 建立表單
  var form = FormApp.create('課程滿意度調查');
  
  // 設定表單說明
  form.setDescription('感謝您參加本次課程！請花幾分鐘填寫此問卷，您的意見對我們非常重要。');
  
  // 設定收集 Email
  form.setCollectEmail(true);
  
  Logger.log('=== 建立表單 ===');
  Logger.log('表單名稱：' + form.getTitle());
  Logger.log('');
  
  // 新增題目 1：姓名（簡答題）
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setRequired(true);
  Logger.log('✅ 已新增題目：姓名');
  
  // 新增題目 2：課程內容滿意度（選擇題）
  var contentItem = form.addMultipleChoiceItem();
  contentItem.setTitle('課程內容滿意度');
  contentItem.setChoiceValues([
    '非常滿意',
    '滿意',
    '普通',
    '不滿意',
    '非常不滿意'
  ]);
  contentItem.setRequired(true);
  Logger.log('✅ 已新增題目：課程內容滿意度');
  
  // 新增題目 3：講師教學滿意度（選擇題）
  var teacherItem = form.addMultipleChoiceItem();
  teacherItem.setTitle('講師教學滿意度');
  teacherItem.setChoiceValues([
    '非常滿意',
    '滿意',
    '普通',
    '不滿意',
    '非常不滿意'
  ]);
  teacherItem.setRequired(true);
  Logger.log('✅ 已新增題目：講師教學滿意度');
  
  // 新增題目 4：課程難度（選擇題）
  var difficultyItem = form.addMultipleChoiceItem();
  difficultyItem.setTitle('課程難度');
  difficultyItem.setChoiceValues([
    '太簡單',
    '適中',
    '太困難'
  ]);
  difficultyItem.setRequired(true);
  Logger.log('✅ 已新增題目：課程難度');
  
  // 新增題目 5：整體評分（線性刻度）
  var ratingItem = form.addScaleItem();
  ratingItem.setTitle('整體評分');
  ratingItem.setBounds(1, 5);
  ratingItem.setLabels('非常不滿意', '非常滿意');
  ratingItem.setRequired(true);
  Logger.log('✅ 已新增題目：整體評分');
  
  // 新增題目 6：建議與回饋（段落文字）
  var feedbackItem = form.addParagraphTextItem();
  feedbackItem.setTitle('建議與回饋');
  feedbackItem.setHelpText('請提供您的寶貴意見，幫助我們改進課程');
  feedbackItem.setRequired(false);
  Logger.log('✅ 已新增題目：建議與回饋');
  
  Logger.log('');
  
  // 建立試算表
  var spreadsheet = SpreadsheetApp.create('課程滿意度調查 - 回應');
  var spreadsheetId = spreadsheet.getId();
  
  Logger.log('=== 建立試算表 ===');
  Logger.log('試算表名稱：' + spreadsheet.getName());
  Logger.log('試算表 ID：' + spreadsheetId);
  Logger.log('');
  
  // 設定表單回應目的地
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  
  // 重新命名第一個工作表
  var sheet = spreadsheet.getSheets()[0];
  sheet.setName(SHEET_RESPONSES);
  
  // 建立統計分析工作表
  var statsSheet = spreadsheet.insertSheet(SHEET_STATISTICS);
  Logger.log('✅ 已建立工作表：' + SHEET_STATISTICS);
  
  // 建立選項統計工作表
  var optionsSheet = spreadsheet.insertSheet(SHEET_OPTIONS);
  Logger.log('✅ 已建立工作表：' + SHEET_OPTIONS);
  
  Logger.log('');
  Logger.log('=== 完成 ===');
  Logger.log('表單 URL：');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('試算表 URL：');
  Logger.log(spreadsheet.getUrl());
  Logger.log('');
  Logger.log('📝 請將試算表 ID 複製到程式碼中的 SPREADSHEET_ID 變數');
  Logger.log('試算表 ID：' + spreadsheetId);
  Logger.log('');
  Logger.log('💡 下一步：');
  Logger.log('1. 填寫幾筆測試資料');
  Logger.log('2. 執行 analyzeResponses() 進行統計分析');
  Logger.log('3. 執行 createCharts() 產生圖表');
  Logger.log('4. 執行 setupTrigger() 設定自動觸發器');
}


// ============================================
// 步驟 2：讀取表單回應
// ============================================

/**
 * 讀取表單回應資料
 * 
 * @return {Array} 回應資料陣列
 */
function getFormResponses() {
  if (!SPREADSHEET_ID) {
    Logger.log('❌ 錯誤：請先設定 SPREADSHEET_ID');
    return [];
  }
  
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName(SHEET_RESPONSES);
    
    // 取得所有資料
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('⚠️ 警告：尚無表單回應資料');
      return [];
    }
    
    // 移除標題列
    var headers = data.shift();
    
    Logger.log('✅ 已讀取 ' + data.length + ' 筆回應');
    return data;
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
    return [];
  }
}


// ============================================
// 步驟 3：統計分析
// ============================================

/**
 * 分析表單回應並產生統計報表
 */
function analyzeResponses() {
  if (!SPREADSHEET_ID) {
    Logger.log('❌ 錯誤：請先設定 SPREADSHEET_ID');
    return;
  }
  
  Logger.log('=== 開始統計分析 ===\n');
  
  // 讀取回應資料
  var responses = getFormResponses();
  
  if (responses.length === 0) {
    Logger.log('沒有資料可以分析');
    return;
  }
  
  // 計算基本統計
  var totalResponses = responses.length;
  var ratings = [];
  
  // 統計各題目的選項
  var contentStats = {};
  var teacherStats = {};
  var difficultyStats = {};
  
  // 遍歷所有回應
  for (var i = 0; i < responses.length; i++) {
    var response = responses[i];
    
    // 假設欄位順序：時間戳記, Email, 姓名, 課程內容滿意度, 講師教學滿意度, 課程難度, 整體評分, 建議與回饋
    var contentAnswer = response[3];
    var teacherAnswer = response[4];
    var difficultyAnswer = response[5];
    var rating = response[6];
    
    // 統計課程內容滿意度
    if (contentAnswer) {
      contentStats[contentAnswer] = (contentStats[contentAnswer] || 0) + 1;
    }
    
    // 統計講師教學滿意度
    if (teacherAnswer) {
      teacherStats[teacherAnswer] = (teacherStats[teacherAnswer] || 0) + 1;
    }
    
    // 統計課程難度
    if (difficultyAnswer) {
      difficultyStats[difficultyAnswer] = (difficultyStats[difficultyAnswer] || 0) + 1;
    }
    
    // 收集評分
    if (rating) {
      ratings.push(Number(rating));
    }
  }
  
  // 計算評分統計
  var avgRating = ratings.length > 0 ? ratings.reduce(function(a, b) { return a + b; }) / ratings.length : 0;
  var maxRating = ratings.length > 0 ? Math.max.apply(null, ratings) : 0;
  var minRating = ratings.length > 0 ? Math.min.apply(null, ratings) : 0;
  
  Logger.log('【基本統計】');
  Logger.log('總回應數：' + totalResponses);
  Logger.log('平均評分：' + avgRating.toFixed(2));
  Logger.log('最高評分：' + maxRating);
  Logger.log('最低評分：' + minRating);
  Logger.log('');
  
  // 寫入統計分析工作表
  writeStatistics(totalResponses, avgRating, maxRating, minRating, contentStats, teacherStats, difficultyStats);
  
  // 寫入選項統計工作表
  writeOptionStatistics(totalResponses, contentStats, teacherStats, difficultyStats);
  
  Logger.log('✅ 統計分析完成');
}


/**
 * 寫入統計分析資料到工作表
 */
function writeStatistics(total, avg, max, min, contentStats, teacherStats, difficultyStats) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_STATISTICS);
  
  // 清除舊資料
  sheet.clear();
  
  // 準備資料
  var data = [
    ['統計項目', '數值'],
    ['總回應數', total],
    ['平均評分', avg.toFixed(2)],
    ['最高評分', max],
    ['最低評分', min],
    [''],
    ['課程內容滿意度統計', ''],
  ];
  
  // 新增課程內容滿意度統計
  for (var option in contentStats) {
    var count = contentStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push([option, count + ' (' + percentage + ')']);
  }
  
  data.push(['']);
  data.push(['講師教學滿意度統計', '']);
  
  // 新增講師教學滿意度統計
  for (var option in teacherStats) {
    var count = teacherStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push([option, count + ' (' + percentage + ')']);
  }
  
  data.push(['']);
  data.push(['課程難度統計', '']);
  
  // 新增課程難度統計
  for (var option in difficultyStats) {
    var count = difficultyStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push([option, count + ' (' + percentage + ')']);
  }
  
  // 寫入資料
  sheet.getRange(1, 1, data.length, 2).setValues(data);
  
  // 格式化
  sheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 200);
  
  Logger.log('✅ 已更新統計分析工作表');
}


/**
 * 寫入選項統計資料到工作表
 */
function writeOptionStatistics(total, contentStats, teacherStats, difficultyStats) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_OPTIONS);
  
  // 清除舊資料
  sheet.clear();
  
  // 準備資料
  var data = [
    ['題目', '選項', '次數', '百分比']
  ];
  
  // 課程內容滿意度
  for (var option in contentStats) {
    var count = contentStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push(['課程內容滿意度', option, count, percentage]);
  }
  
  // 講師教學滿意度
  for (var option in teacherStats) {
    var count = teacherStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push(['講師教學滿意度', option, count, percentage]);
  }
  
  // 課程難度
  for (var option in difficultyStats) {
    var count = difficultyStats[option];
    var percentage = ((count / total) * 100).toFixed(1) + '%';
    data.push(['課程難度', option, count, percentage]);
  }
  
  // 寫入資料
  sheet.getRange(1, 1, data.length, 4).setValues(data);
  
  // 格式化
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 80);
  sheet.setColumnWidth(4, 100);
  
  Logger.log('✅ 已更新選項統計工作表');
}


// ============================================
// 步驟 4：產生圖表
// ============================================

/**
 * 產生統計圖表
 */
function createCharts() {
  if (!SPREADSHEET_ID) {
    Logger.log('❌ 錯誤：請先設定 SPREADSHEET_ID');
    return;
  }
  
  Logger.log('=== 開始產生圖表 ===\n');
  
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var optionsSheet = spreadsheet.getSheetByName(SHEET_OPTIONS);
  
  // 移除舊圖表
  var charts = optionsSheet.getCharts();
  for (var i = 0; i < charts.length; i++) {
    optionsSheet.removeChart(charts[i]);
  }
  
  // 取得資料範圍
  var dataRange = optionsSheet.getDataRange();
  var data = dataRange.getValues();
  
  if (data.length <= 1) {
    Logger.log('⚠️ 警告：沒有資料可以產生圖表');
    Logger.log('請先執行 analyzeResponses() 進行統計分析');
    return;
  }
  
  // 產生課程內容滿意度圓餅圖
  createPieChart(optionsSheet, '課程內容滿意度', 1, 1);
  Logger.log('✅ 已產生課程內容滿意度圓餅圖');
  
  // 產生講師教學滿意度圓餅圖
  createPieChart(optionsSheet, '講師教學滿意度', 1, 8);
  Logger.log('✅ 已產生講師教學滿意度圓餅圖');
  
  // 產生課程難度長條圖
  createBarChart(optionsSheet, '課程難度', 1, 15);
  Logger.log('✅ 已產生課程難度長條圖');
  
  Logger.log('');
  Logger.log('✅ 圖表產生完成');
}


/**
 * 建立圓餅圖
 */
function createPieChart(sheet, title, anchorRow, anchorCol) {
  var data = sheet.getDataRange().getValues();
  var chartData = [['選項', '次數']];
  
  // 篩選特定題目的資料
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === title) {
      chartData.push([data[i][1], data[i][2]]);
    }
  }
  
  if (chartData.length <= 1) {
    return;
  }
  
  // 建立圖表
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(sheet.getRange(1, 1, chartData.length, 2))
    .setPosition(anchorRow, anchorCol, 0, 0)
    .setOption('title', title)
    .setOption('width', 400)
    .setOption('height', 300)
    .setOption('pieHole', 0.4)  // 甜甜圈圖
    .build();
  
  sheet.insertChart(chart);
}


/**
 * 建立長條圖
 */
function createBarChart(sheet, title, anchorRow, anchorCol) {
  var data = sheet.getDataRange().getValues();
  var chartData = [['選項', '次數']];
  
  // 篩選特定題目的資料
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === title) {
      chartData.push([data[i][1], data[i][2]]);
    }
  }
  
  if (chartData.length <= 1) {
    return;
  }
  
  // 建立圖表
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(sheet.getRange(1, 1, chartData.length, 2))
    .setPosition(anchorRow, anchorCol, 0, 0)
    .setOption('title', title)
    .setOption('width', 400)
    .setOption('height', 300)
    .setOption('legend', { position: 'none' })
    .build();
  
  sheet.insertChart(chart);
}


// ============================================
// 步驟 5：設定觸發器
// ============================================

/**
 * 設定表單提交觸發器
 */
function setupTrigger() {
  // 先刪除舊的觸發器
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // 建立新的觸發器
  if (SPREADSHEET_ID) {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(spreadsheet)
      .onFormSubmit()
      .create();
    
    Logger.log('✅ 已設定表單提交觸發器');
    Logger.log('當有新的表單回應時，會自動執行統計分析');
  } else {
    Logger.log('❌ 錯誤：請先設定 SPREADSHEET_ID');
  }
}


/**
 * 表單提交觸發器函式
 * 
 * 當有新的表單回應時自動執行
 */
function onFormSubmit(e) {
  Logger.log('=== 表單提交觸發器 ===');
  Logger.log('收到新的表單回應');
  
  // 等待 2 秒讓資料寫入完成
  Utilities.sleep(2000);
  
  // 執行統計分析
  analyzeResponses();
  
  // 更新圖表
  createCharts();
  
  Logger.log('✅ 自動統計完成');
}


// ============================================
// 輔助函式
// ============================================

/**
 * 測試：產生測試資料
 */
function generateTestData() {
  Logger.log('此功能需要手動填寫表單來產生測試資料');
  Logger.log('請執行 createFormAndSpreadsheet() 取得表單連結');
  Logger.log('然後填寫幾筆測試資料');
}


/**
 * 完整執行流程（測試用）
 */
function runFullProcess() {
  Logger.log('=== 完整執行流程 ===\n');
  
  // 步驟 1：分析回應
  analyzeResponses();
  
  Logger.log('');
  
  // 步驟 2：產生圖表
  createCharts();
  
  Logger.log('');
  Logger.log('=== 執行完成 ===');
}
