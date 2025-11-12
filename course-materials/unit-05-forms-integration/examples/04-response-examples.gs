/**
 * FormApp 範例 4：讀取表單回應
 * 
 * 本範例展示如何讀取並處理表單回應資料
 */

/**
 * 範例 4.1：取得所有回應
 */
function example4_1_getAllResponses() {
  var form = FormApp.getActiveForm(); // 需在表單編輯器中執行
  var responses = form.getResponses();
  
  Logger.log('總回應數：' + responses.length);
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 顯示每個回應的基本資訊
  responses.forEach(function(response, index) {
    Logger.log('--- 回應 ' + (index + 1) + ' ---');
    Logger.log('回應時間：' + response.getTimestamp());
    Logger.log('回應 ID：' + response.getId());
    
    // 如果有收集 Email
    var email = response.getRespondentEmail();
    if (email) {
      Logger.log('回應者 Email：' + email);
    }
  });
}

/**
 * 範例 4.2：取得題目回應
 */
function example4_2_getItemResponses() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 取得第一個回應
  var response = responses[0];
  var itemResponses = response.getItemResponses();
  
  Logger.log('回應時間：' + response.getTimestamp());
  Logger.log('題目數量：' + itemResponses.length);
  Logger.log('');
  
  // 顯示每個題目的回應
  itemResponses.forEach(function(itemResponse) {
    var item = itemResponse.getItem();
    var question = item.getTitle();
    var answer = itemResponse.getResponse();
    
    Logger.log('問題：' + question);
    Logger.log('回答：' + answer);
    Logger.log('---');
  });
}

/**
 * 範例 4.3：統計單選題回應
 */
function example4_3_analyzeMultipleChoice() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 找到單選題
  var items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  if (items.length === 0) {
    Logger.log('表單中沒有單選題');
    return;
  }
  
  var targetItem = items[0]; // 取第一個單選題
  Logger.log('分析題目：' + targetItem.getTitle());
  Logger.log('');
  
  // 統計各選項的回應數
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
  
  // 顯示統計結果
  Logger.log('回應統計：');
  for (var answer in answerCount) {
    var percentage = (answerCount[answer] / responses.length * 100).toFixed(1);
    Logger.log(answer + ': ' + answerCount[answer] + ' 人 (' + percentage + '%)');
  }
}

/**
 * 範例 4.4：統計核取方塊回應
 */
function example4_4_analyzeCheckbox() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 找到核取方塊題
  var items = form.getItems(FormApp.ItemType.CHECKBOX);
  if (items.length === 0) {
    Logger.log('表單中沒有核取方塊題');
    return;
  }
  
  var targetItem = items[0];
  Logger.log('分析題目：' + targetItem.getTitle());
  Logger.log('');
  
  // 統計各選項被選擇的次數
  var optionCount = {};
  
  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    itemResponses.forEach(function(itemResponse) {
      if (itemResponse.getItem().getId() === targetItem.getId()) {
        var answers = itemResponse.getResponse(); // 核取方塊回傳陣列
        if (Array.isArray(answers)) {
          answers.forEach(function(answer) {
            optionCount[answer] = (optionCount[answer] || 0) + 1;
          });
        }
      }
    });
  });
  
  // 顯示統計結果
  Logger.log('選項統計：');
  for (var option in optionCount) {
    var percentage = (optionCount[option] / responses.length * 100).toFixed(1);
    Logger.log(option + ': ' + optionCount[option] + ' 次 (' + percentage + '%)');
  }
}

/**
 * 範例 4.5：計算線性刻度平均分
 */
function example4_5_analyzeScale() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 找到線性刻度題
  var items = form.getItems(FormApp.ItemType.SCALE);
  if (items.length === 0) {
    Logger.log('表單中沒有線性刻度題');
    return;
  }
  
  var targetItem = items[0];
  Logger.log('分析題目：' + targetItem.getTitle());
  Logger.log('');
  
  // 收集所有分數
  var scores = [];
  
  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    itemResponses.forEach(function(itemResponse) {
      if (itemResponse.getItem().getId() === targetItem.getId()) {
        var score = parseInt(itemResponse.getResponse());
        scores.push(score);
      }
    });
  });
  
  if (scores.length === 0) {
    Logger.log('沒有回應資料');
    return;
  }
  
  // 計算統計數據
  var sum = scores.reduce(function(a, b) { return a + b; }, 0);
  var average = sum / scores.length;
  var max = Math.max.apply(null, scores);
  var min = Math.min.apply(null, scores);
  
  Logger.log('回應數：' + scores.length);
  Logger.log('平均分：' + average.toFixed(2));
  Logger.log('最高分：' + max);
  Logger.log('最低分：' + min);
}

/**
 * 範例 4.6：將回應匯出到試算表
 */
function example4_6_exportToSheet() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 建立新試算表
  var ss = SpreadsheetApp.create(form.getTitle() + ' - 回應匯出');
  var sheet = ss.getActiveSheet();
  
  // 取得所有題目
  var items = form.getItems();
  
  // 建立標題列
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
      response.getRespondentEmail() || ''
    ];
    
    var itemResponses = response.getItemResponses();
    
    // 為每個題目找到對應的回應
    items.forEach(function(item) {
      var answer = '';
      itemResponses.forEach(function(itemResponse) {
        if (itemResponse.getItem().getId() === item.getId()) {
          var responseValue = itemResponse.getResponse();
          // 如果是陣列（核取方塊），轉換為字串
          if (Array.isArray(responseValue)) {
            answer = responseValue.join(', ');
          } else {
            answer = responseValue;
          }
        }
      });
      row.push(answer);
    });
    
    data.push(row);
  });
  
  // 寫入資料
  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
  }
  
  // 格式化標題列
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // 自動調整欄寬
  for (var i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  Logger.log('回應已匯出到試算表');
  Logger.log('試算表連結：' + ss.getUrl());
}

/**
 * 範例 4.7：篩選特定條件的回應
 */
function example4_7_filterResponses() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 篩選條件：找出滿意度為「非常滿意」的回應
  var targetQuestion = '您對本課程的整體滿意度？';
  var targetAnswer = '非常滿意';
  
  var filteredResponses = [];
  
  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    itemResponses.forEach(function(itemResponse) {
      var question = itemResponse.getItem().getTitle();
      var answer = itemResponse.getResponse();
      
      if (question === targetQuestion && answer === targetAnswer) {
        filteredResponses.push(response);
      }
    });
  });
  
  Logger.log('符合條件的回應數：' + filteredResponses.length);
  Logger.log('');
  
  // 顯示符合條件的回應
  filteredResponses.forEach(function(response, index) {
    Logger.log('--- 回應 ' + (index + 1) + ' ---');
    Logger.log('時間：' + response.getTimestamp());
    Logger.log('Email：' + response.getRespondentEmail());
  });
}

/**
 * 範例 4.8：取得最新的回應
 */
function example4_8_getLatestResponse() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 取得最新的回應（最後一個）
  var latestResponse = responses[responses.length - 1];
  
  Logger.log('最新回應：');
  Logger.log('時間：' + latestResponse.getTimestamp());
  Logger.log('Email：' + latestResponse.getRespondentEmail());
  Logger.log('');
  
  // 顯示回應內容
  var itemResponses = latestResponse.getItemResponses();
  itemResponses.forEach(function(itemResponse) {
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    Logger.log(question + ': ' + answer);
  });
}

/**
 * 範例 4.9：刪除特定回應
 */
function example4_9_deleteResponse() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  // 刪除第一個回應（僅作為範例）
  var responseToDelete = responses[0];
  var responseId = responseToDelete.getId();
  
  Logger.log('準備刪除回應 ID：' + responseId);
  Logger.log('回應時間：' + responseToDelete.getTimestamp());
  
  // 刪除回應
  form.deleteResponse(responseId);
  
  Logger.log('回應已刪除');
  Logger.log('剩餘回應數：' + form.getResponses().length);
}

/**
 * 範例 4.10：產生回應摘要報告
 */
function example4_10_generateSummaryReport() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  
  if (responses.length === 0) {
    Logger.log('目前沒有任何回應');
    return;
  }
  
  Logger.log('=== 表單回應摘要報告 ===');
  Logger.log('表單名稱：' + form.getTitle());
  Logger.log('總回應數：' + responses.length);
  Logger.log('');
  
  // 取得時間範圍
  var timestamps = responses.map(function(r) { return r.getTimestamp(); });
  var firstResponse = new Date(Math.min.apply(null, timestamps));
  var lastResponse = new Date(Math.max.apply(null, timestamps));
  
  Logger.log('首次回應：' + firstResponse);
  Logger.log('最新回應：' + lastResponse);
  Logger.log('');
  
  // 統計各題目類型
  var items = form.getItems();
  var itemTypeCount = {};
  
  items.forEach(function(item) {
    var type = item.getType().toString();
    itemTypeCount[type] = (itemTypeCount[type] || 0) + 1;
  });
  
  Logger.log('題目統計：');
  for (var type in itemTypeCount) {
    Logger.log(type + ': ' + itemTypeCount[type] + ' 題');
  }
  
  Logger.log('');
  Logger.log('報告產生時間：' + new Date());
}
