/**
 * FormApp 範例 2：新增題目
 * 
 * 本範例展示如何新增各種類型的表單題目
 */

/**
 * 範例 2.1：新增簡答題
 */
function example2_1_addTextItem() {
  var form = FormApp.create('簡答題範例');
  
  // 新增簡答題
  var textItem = form.addTextItem();
  textItem.setTitle('請輸入您的姓名');
  textItem.setHelpText('請填寫真實姓名');
  textItem.setRequired(true);
  
  Logger.log('簡答題已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.2：新增段落題
 */
function example2_2_addParagraphItem() {
  var form = FormApp.create('段落題範例');
  
  // 新增段落題
  var paragraphItem = form.addParagraphTextItem();
  paragraphItem.setTitle('請分享您的學習心得');
  paragraphItem.setHelpText('請至少填寫 50 字');
  paragraphItem.setRequired(true);
  
  Logger.log('段落題已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.3：新增單選題
 */
function example2_3_addMultipleChoiceItem() {
  var form = FormApp.create('單選題範例');
  
  // 新增單選題
  var item = form.addMultipleChoiceItem();
  item.setTitle('您對本課程的整體滿意度？');
  item.setChoices([
    item.createChoice('非常滿意'),
    item.createChoice('滿意'),
    item.createChoice('普通'),
    item.createChoice('不滿意'),
    item.createChoice('非常不滿意')
  ]);
  item.setRequired(true);
  
  Logger.log('單選題已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.4：新增核取方塊
 */
function example2_4_addCheckboxItem() {
  var form = FormApp.create('核取方塊範例');
  
  // 新增核取方塊
  var item = form.addCheckboxItem();
  item.setTitle('您希望加強哪些主題？（可複選）');
  item.setChoices([
    item.createChoice('JavaScript 基礎'),
    item.createChoice('Google Sheets 操作'),
    item.createChoice('自動化流程'),
    item.createChoice('Web App 開發'),
    item.createChoice('API 整合')
  ]);
  item.setRequired(false);
  
  Logger.log('核取方塊已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.5：新增下拉式選單
 */
function example2_5_addListItem() {
  var form = FormApp.create('下拉式選單範例');
  
  // 新增下拉式選單
  var item = form.addListItem();
  item.setTitle('您的職業類別');
  item.setChoices([
    item.createChoice('學生'),
    item.createChoice('教師'),
    item.createChoice('工程師'),
    item.createChoice('行政人員'),
    item.createChoice('其他')
  ]);
  item.setRequired(true);
  
  Logger.log('下拉式選單已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.6：新增線性刻度
 */
function example2_6_addScaleItem() {
  var form = FormApp.create('線性刻度範例');
  
  // 新增線性刻度
  var item = form.addScaleItem();
  item.setTitle('課程難度評分');
  item.setBounds(1, 5); // 設定範圍 1-5
  item.setLabels('太簡單', '太困難'); // 設定兩端標籤
  item.setRequired(true);
  
  Logger.log('線性刻度已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.7：新增日期與時間題
 */
function example2_7_addDateTimeItems() {
  var form = FormApp.create('日期時間題範例');
  
  // 新增日期題
  var dateItem = form.addDateItem();
  dateItem.setTitle('請選擇您方便的上課日期');
  dateItem.setRequired(true);
  
  // 新增時間題
  var timeItem = form.addTimeItem();
  timeItem.setTitle('請選擇您方便的上課時間');
  timeItem.setRequired(true);
  
  // 新增日期時間題
  var dateTimeItem = form.addDateTimeItem();
  dateTimeItem.setTitle('請選擇完整的日期與時間');
  dateTimeItem.setRequired(false);
  
  Logger.log('日期時間題已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.8：新增格狀題
 */
function example2_8_addGridItem() {
  var form = FormApp.create('格狀題範例');
  
  // 新增格狀題
  var item = form.addGridItem();
  item.setTitle('請評分各單元的教學品質');
  item.setRows([
    '單元 1：JavaScript 基礎',
    '單元 2：Google Sheets',
    '單元 3：自動寄信',
    '單元 4：檔案操作'
  ]);
  item.setColumns(['非常好', '好', '普通', '差', '非常差']);
  item.setRequired(true);
  
  Logger.log('格狀題已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.9：新增分頁與說明文字
 */
function example2_9_addSectionAndDescription() {
  var form = FormApp.create('分頁與說明範例');
  
  // 新增說明文字
  var description = form.addSectionHeaderItem();
  description.setTitle('基本資料');
  description.setHelpText('請填寫您的基本資料');
  
  // 新增題目
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setRequired(true);
  
  // 新增分頁
  var pageBreak = form.addPageBreakItem();
  pageBreak.setTitle('課程意見');
  
  // 新增第二頁的題目
  var feedbackItem = form.addParagraphTextItem();
  feedbackItem.setTitle('請分享您的意見');
  
  Logger.log('分頁與說明已新增');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 2.10：批次新增題目
 */
function example2_10_addMultipleItems() {
  var form = FormApp.create('批次新增題目範例');
  form.setDescription('學生資料登記表');
  
  // 定義題目資料
  var questions = [
    { type: 'text', title: '姓名', required: true },
    { type: 'text', title: 'Email', required: true },
    { type: 'text', title: '電話', required: false },
    { type: 'list', title: '年級', choices: ['一年級', '二年級', '三年級', '四年級'], required: true },
    { type: 'checkbox', title: '興趣', choices: ['運動', '音樂', '閱讀', '旅遊'], required: false }
  ];
  
  // 批次新增題目
  questions.forEach(function(q) {
    var item;
    
    if (q.type === 'text') {
      item = form.addTextItem();
      item.setTitle(q.title);
      item.setRequired(q.required);
    } else if (q.type === 'list') {
      item = form.addListItem();
      item.setTitle(q.title);
      var choices = q.choices.map(function(choice) {
        return item.createChoice(choice);
      });
      item.setChoices(choices);
      item.setRequired(q.required);
    } else if (q.type === 'checkbox') {
      item = form.addCheckboxItem();
      item.setTitle(q.title);
      var choices = q.choices.map(function(choice) {
        return item.createChoice(choice);
      });
      item.setChoices(choices);
      item.setRequired(q.required);
    }
  });
  
  Logger.log('批次新增完成，共 ' + questions.length + ' 個題目');
  Logger.log('表單連結：' + form.getPublishedUrl());
}
