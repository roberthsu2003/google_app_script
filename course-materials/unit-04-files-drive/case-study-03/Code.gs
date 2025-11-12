/**
 * ============================================
 * 實作案例 3：Google Form 自動收集與統計
 * ============================================
 * 
 * 功能說明：
 * 1. 程式化建立問卷表單
 * 2. 自動收集表單回應
 * 3. 統計分析回應資料
 * 4. 產生視覺化圖表
 * 5. 設定表單提交觸發器
 * 
 * 作者：GAS JavaScript 課程
 * 版本：1.0
 */

// ============================================
// 全域設定
// ============================================

var CONFIG = {
  FORM_TITLE: '課程滿意度調查',
  FORM_DESCRIPTION: '感謝您參與本次課程，請填寫以下問卷協助我們改進課程品質。',
  SHEET_NAME_RESPONSES: '原始回應',
  SHEET_NAME_STATISTICS: '統計分析',
  CHART_POSITION_ROW: 2,
  CHART_POSITION_COL: 6
};

// ============================================
// 1. 建立表單
// ============================================

/**
 * 建立課程滿意度調查表單
 * 包含文字題、單選題、多選題、評分題
 */
function createSurveyForm() {
  try {
    // 建立新表單
    var form = FormApp.create(CONFIG.FORM_TITLE);
    form.setDescription(CONFIG.FORM_DESCRIPTION);
    form.setCollectEmail(false);
    form.setLimitOneResponsePerUser(false);
    
    // 1. 姓名（文字題，必填）
    var nameItem = form.addTextItem();
    nameItem.setTitle('姓名');
    nameItem.setHelpText('請輸入您的真實姓名');
    nameItem.setRequired(true);
    
    // 2. 課程整體滿意度（單選題，必填）
    var satisfactionItem = form.addMultipleChoiceItem();
    satisfactionItem.setTitle('課程整體滿意度');
    satisfactionItem.setHelpText('請選擇最符合您感受的選項');
    satisfactionItem.setChoiceValues([
      '非常滿意',
      '滿意',
      '普通',
      '不滿意',
      '非常不滿意'
    ]);
    satisfactionItem.setRequired(true);
    
    // 3. 最喜歡的課程單元（多選題）
    var unitsItem = form.addCheckboxItem();
    unitsItem.setTitle('最喜歡的課程單元（可複選）');
    unitsItem.setHelpText('請選擇您最喜歡的課程單元');
    unitsItem.setChoiceValues([
      'JavaScript 基礎',
      'Google Sheets 操作',
      '自動寄信功能',
      '檔案與雲端操作',
      'Web App 開發',
      'API 整合'
    ]);
    unitsItem.setRequired(false);
    
    // 4. 課程難度評分（評分題，1-5 分）
    var difficultyItem = form.addScaleItem();
    difficultyItem.setTitle('課程難度評分');
    difficultyItem.setHelpText('1 = 非常簡單，5 = 非常困難');
    difficultyItem.setBounds(1, 5);
    difficultyItem.setRequired(true);
    
    // 5. 建議與回饋（長文字題）
    var feedbackItem = form.addParagraphTextItem();
    feedbackItem.setTitle('建議與回饋');
    feedbackItem.setHelpText('請提供您的寶貴意見，幫助我們改進課程');
    feedbackItem.setRequired(false);
    
    // 建立回應目的地試算表
    var spreadsheet = SpreadsheetApp.create(CONFIG.FORM_TITLE + ' - 回應');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
    
    // 初始化統計分析工作表
    initializeStatisticsSheet(spreadsheet);
    
    Logger.log('表單建立成功！');
    Logger.log('表單網址：' + form.getPublishedUrl());
    Logger.log('試算表網址：' + spreadsheet.getUrl());
    
    return {
      formUrl: form.getPublishedUrl(),
      spreadsheetUrl: spreadsheet.getUrl(),
      formId: form.getId(),
      spreadsheetId: spreadsheet.getId()
    };
    
  } catch (error) {
    Logger.log('建立表單時發生錯誤：' + error.message);
    throw error;
  }
}

/**
 * 初始化統計分析工作表
 */
function initializeStatisticsSheet(spreadsheet) {
  var sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME_STATISTICS, 1);
  
  // 設定標題列
  var headers = [
    ['題目', '選項/統計項目', '數量', '百分比', '備註']
  ];
  sheet.getRange(1, 1, 1, 5).setValues(headers);
  
  // 格式化標題列
  var headerRange = sheet.getRange(1, 1, 1, 5);
  headerRange.setBackground('#4285F4');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // 設定欄寬
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 200);
  
  Logger.log('統計分析工作表初始化完成');
}

// ============================================
// 2. 表單提交觸發器
// ============================================

/**
 * 表單提交時自動執行的函式
 * 這個函式會被表單提交觸發器呼叫
 */
function onFormSubmit(e) {
  try {
    Logger.log('收到新的表單回應');
    
    // 取得試算表
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // 執行統計分析
    analyzeResponses(spreadsheet);
    
    // 產生圖表
    generateCharts(spreadsheet);
    
    Logger.log('表單回應處理完成');
    
  } catch (error) {
    Logger.log('處理表單回應時發生錯誤：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
  }
}

/**
 * 手動設定表單提交觸發器
 * 執行此函式來建立觸發器
 */
function setupFormSubmitTrigger() {
  try {
    // 刪除現有的觸發器（避免重複）
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'onFormSubmit') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    
    // 建立新的表單提交觸發器
    ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onFormSubmit()
      .create();
    
    Logger.log('表單提交觸發器設定成功！');
    
  } catch (error) {
    Logger.log('設定觸發器時發生錯誤：' + error.message);
    throw error;
  }
}

// ============================================
// 3. 資料收集與統計分析
// ============================================

/**
 * 分析表單回應並產生統計資料
 */
function analyzeResponses(spreadsheet) {
  try {
    // 取得原始回應工作表
    var responseSheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_RESPONSES);
    if (!responseSheet) {
      responseSheet = spreadsheet.getSheets()[0];
    }
    
    // 取得所有回應資料
    var dataRange = responseSheet.getDataRange();
    var data = dataRange.getValues();
    
    if (data.length <= 1) {
      Logger.log('尚無回應資料');
      return;
    }
    
    var headers = data[0];
    var responses = data.slice(1);
    
    Logger.log('共有 ' + responses.length + ' 筆回應');
    
    // 取得統計分析工作表
    var statsSheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_STATISTICS);
    if (!statsSheet) {
      statsSheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME_STATISTICS);
      initializeStatisticsSheet(spreadsheet);
    }
    
    // 清除舊的統計資料（保留標題列）
    if (statsSheet.getLastRow() > 1) {
      statsSheet.getRange(2, 1, statsSheet.getLastRow() - 1, 5).clear();
    }
    
    var statsData = [];
    var totalResponses = responses.length;
    
    // 分析每個題目
    for (var col = 1; col < headers.length; col++) {
      var questionTitle = headers[col];
      var columnData = responses.map(function(row) { return row[col]; });
      
      // 根據題目類型進行不同的統計
      if (questionTitle.indexOf('姓名') !== -1 || questionTitle.indexOf('建議') !== -1) {
        // 文字題：只統計回應數
        var answeredCount = columnData.filter(function(val) { 
          return val !== '' && val !== null; 
        }).length;
        statsData.push([
          questionTitle,
          '已回答',
          answeredCount,
          (answeredCount / totalResponses * 100).toFixed(1) + '%',
          '文字回應'
        ]);
        
      } else if (questionTitle.indexOf('難度') !== -1 || questionTitle.indexOf('評分') !== -1) {
        // 評分題：計算平均分
        var scores = columnData.filter(function(val) { 
          return val !== '' && val !== null; 
        });
        var sum = scores.reduce(function(acc, val) { 
          return acc + Number(val); 
        }, 0);
        var average = scores.length > 0 ? (sum / scores.length).toFixed(2) : 0;
        
        statsData.push([
          questionTitle,
          '平均分數',
          average,
          '',
          '總回應數：' + scores.length
        ]);
        
        // 統計各分數的分布
        var scoreDistribution = {};
        for (var i = 0; i < scores.length; i++) {
          var score = scores[i];
          scoreDistribution[score] = (scoreDistribution[score] || 0) + 1;
        }
        
        for (var score in scoreDistribution) {
          var count = scoreDistribution[score];
          statsData.push([
            '',
            score + ' 分',
            count,
            (count / scores.length * 100).toFixed(1) + '%',
            ''
          ]);
        }
        
      } else {
        // 選擇題：統計各選項次數
        var optionCounts = {};
        
        for (var i = 0; i < columnData.length; i++) {
          var answer = columnData[i];
          if (answer === '' || answer === null) continue;
          
          // 處理多選題（以逗號分隔）
          var options = String(answer).split(',').map(function(opt) {
            return opt.trim();
          });
          
          for (var j = 0; j < options.length; j++) {
            var option = options[j];
            if (option) {
              optionCounts[option] = (optionCounts[option] || 0) + 1;
            }
          }
        }
        
        // 將統計結果加入資料陣列
        var sortedOptions = Object.keys(optionCounts).sort(function(a, b) {
          return optionCounts[b] - optionCounts[a];
        });
        
        for (var k = 0; k < sortedOptions.length; k++) {
          var option = sortedOptions[k];
          var count = optionCounts[option];
          statsData.push([
            k === 0 ? questionTitle : '',
            option,
            count,
            (count / totalResponses * 100).toFixed(1) + '%',
            ''
          ]);
        }
      }
      
      // 加入空白列分隔不同題目
      statsData.push(['', '', '', '', '']);
    }
    
    // 寫入統計資料
    if (statsData.length > 0) {
      statsSheet.getRange(2, 1, statsData.length, 5).setValues(statsData);
      
      // 格式化數字欄位
      statsSheet.getRange(2, 3, statsData.length, 1).setHorizontalAlignment('center');
      statsSheet.getRange(2, 4, statsData.length, 1).setHorizontalAlignment('center');
    }
    
    Logger.log('統計分析完成');
    
  } catch (error) {
    Logger.log('分析回應時發生錯誤：' + error.message);
    throw error;
  }
}

// ============================================
// 4. 圖表產生
// ============================================

/**
 * 產生統計圖表
 */
function generateCharts(spreadsheet) {
  try {
    var responseSheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_RESPONSES);
    if (!responseSheet) {
      responseSheet = spreadsheet.getSheets()[0];
    }
    
    var statsSheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME_STATISTICS);
    if (!statsSheet) {
      Logger.log('找不到統計分析工作表');
      return;
    }
    
    // 刪除現有的圖表
    var charts = statsSheet.getCharts();
    for (var i = 0; i < charts.length; i++) {
      statsSheet.removeChart(charts[i]);
    }
    
    var data = responseSheet.getDataRange().getValues();
    if (data.length <= 1) {
      Logger.log('資料不足，無法產生圖表');
      return;
    }
    
    var headers = data[0];
    var chartRow = CONFIG.CHART_POSITION_ROW;
    var chartCol = CONFIG.CHART_POSITION_COL;
    
    // 為每個選擇題產生圖表
    for (var col = 1; col < headers.length; col++) {
      var questionTitle = headers[col];
      
      // 跳過文字題
      if (questionTitle.indexOf('姓名') !== -1 || questionTitle.indexOf('建議') !== -1) {
        continue;
      }
      
      // 收集該題的資料
      var responses = data.slice(1).map(function(row) { return row[col]; });
      var optionCounts = {};
      
      for (var i = 0; i < responses.length; i++) {
        var answer = responses[i];
        if (answer === '' || answer === null) continue;
        
        var options = String(answer).split(',').map(function(opt) {
          return opt.trim();
        });
        
        for (var j = 0; j < options.length; j++) {
          var option = options[j];
          if (option) {
            optionCounts[option] = (optionCounts[option] || 0) + 1;
          }
        }
      }
      
      // 準備圖表資料
      var chartData = [['選項', '次數']];
      for (var option in optionCounts) {
        chartData.push([option, optionCounts[option]]);
      }
      
      if (chartData.length <= 1) continue;
      
      // 建立圖表
      var chart;
      
      if (questionTitle.indexOf('滿意度') !== -1) {
        // 滿意度使用圓餅圖
        chart = statsSheet.newChart()
          .setChartType(Charts.ChartType.PIE)
          .addRange(statsSheet.getRange(chartRow, chartCol, chartData.length, 2))
          .setPosition(chartRow, chartCol, 0, 0)
          .setOption('title', questionTitle)
          .setOption('width', 400)
          .setOption('height', 300)
          .setOption('pieHole', 0.4)
          .build();
          
      } else if (questionTitle.indexOf('難度') !== -1 || questionTitle.indexOf('評分') !== -1) {
        // 評分題使用長條圖
        chart = statsSheet.newChart()
          .setChartType(Charts.ChartType.COLUMN)
          .addRange(statsSheet.getRange(chartRow, chartCol, chartData.length, 2))
          .setPosition(chartRow, chartCol, 0, 0)
          .setOption('title', questionTitle)
          .setOption('width', 400)
          .setOption('height', 300)
          .setOption('legend', {position: 'none'})
          .setOption('hAxis', {title: '分數'})
          .setOption('vAxis', {title: '人數'})
          .build();
          
      } else {
        // 其他選擇題使用長條圖
        chart = statsSheet.newChart()
          .setChartType(Charts.ChartType.BAR)
          .addRange(statsSheet.getRange(chartRow, chartCol, chartData.length, 2))
          .setPosition(chartRow, chartCol, 0, 0)
          .setOption('title', questionTitle)
          .setOption('width', 500)
          .setOption('height', 300)
          .setOption('legend', {position: 'none'})
          .build();
      }
      
      statsSheet.insertChart(chart);
      chartRow += 16; // 移動到下一個圖表位置
    }
    
    Logger.log('圖表產生完成');
    
  } catch (error) {
    Logger.log('產生圖表時發生錯誤：' + error.message);
    throw error;
  }
}

// ============================================
// 5. 手動執行函式
// ============================================

/**
 * 手動執行完整的統計分析與圖表產生
 * 可用於測試或重新產生統計結果
 */
function manualAnalysis() {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    Logger.log('開始手動分析...');
    analyzeResponses(spreadsheet);
    generateCharts(spreadsheet);
    Logger.log('手動分析完成！');
    
  } catch (error) {
    Logger.log('手動分析時發生錯誤：' + error.message);
    throw error;
  }
}

/**
 * 測試函式：產生模擬回應資料
 * 用於測試統計功能
 */
function generateTestResponses() {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var responseSheet = spreadsheet.getSheets()[0];
    
    // 模擬回應資料
    var testData = [
      [new Date(), '張小明', '滿意', 'JavaScript 基礎, Google Sheets 操作', 3, '課程內容豐富'],
      [new Date(), '李小華', '非常滿意', 'Web App 開發, API 整合', 4, '講師教學認真'],
      [new Date(), '王大同', '普通', 'JavaScript 基礎', 3, '希望有更多練習時間'],
      [new Date(), '陳小美', '滿意', 'Google Sheets 操作, 自動寄信功能', 2, '很實用的課程'],
      [new Date(), '林志明', '非常滿意', 'JavaScript 基礎, Web App 開發, API 整合', 4, '學到很多東西']
    ];
    
    var lastRow = responseSheet.getLastRow();
    responseSheet.getRange(lastRow + 1, 1, testData.length, testData[0].length).setValues(testData);
    
    Logger.log('已新增 ' + testData.length + ' 筆測試資料');
    
    // 執行分析
    manualAnalysis();
    
  } catch (error) {
    Logger.log('產生測試資料時發生錯誤：' + error.message);
    throw error;
  }
}
