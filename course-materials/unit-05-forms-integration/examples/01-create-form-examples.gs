/**
 * FormApp 範例 1：建立表單
 * 
 * 本範例展示如何程式化建立 Google Form 表單
 */

/**
 * 範例 1.1：建立基本表單
 */
function example1_1_createBasicForm() {
  // 建立新表單
  var form = FormApp.create('基本表單範例');
  
  // 設定表單描述
  form.setDescription('這是一個簡單的表單範例');
  
  // 取得表單 URL
  var formUrl = form.getPublishedUrl();
  Logger.log('表單已建立：' + formUrl);
  Logger.log('表單編輯連結：' + form.getEditUrl());
  
  return form;
}

/**
 * 範例 1.2：開啟現有表單
 */
function example1_2_openExistingForm() {
  // 方法 1：透過 ID 開啟
  var formId = 'YOUR_FORM_ID'; // 請替換為實際的表單 ID
  try {
    var form = FormApp.openById(formId);
    Logger.log('成功開啟表單：' + form.getTitle());
  } catch (e) {
    Logger.log('無法開啟表單：' + e.message);
  }
  
  // 方法 2：透過 URL 開啟
  var formUrl = 'https://docs.google.com/forms/d/YOUR_FORM_ID/edit';
  try {
    var form2 = FormApp.openByUrl(formUrl);
    Logger.log('成功開啟表單：' + form2.getTitle());
  } catch (e) {
    Logger.log('無法開啟表單：' + e.message);
  }
}

/**
 * 範例 1.3：設定表單基本屬性
 */
function example1_3_setFormProperties() {
  var form = FormApp.create('表單屬性設定範例');
  
  // 設定表單標題與描述
  form.setTitle('學生資料登記表');
  form.setDescription('請填寫您的基本資料');
  
  // 設定是否收集 Email
  form.setCollectEmail(true);
  
  // 設定是否限制一次回應
  form.setLimitOneResponsePerUser(true);
  
  // 設定確認訊息
  form.setConfirmationMessage('感謝您的填寫！');
  
  // 設定是否允許編輯回應
  form.setAllowResponseEdits(true);
  
  // 設定是否顯示進度列
  form.setProgressBar(true);
  
  Logger.log('表單屬性已設定完成');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 1.4：取得表單資訊
 */
function example1_4_getFormInfo() {
  var form = FormApp.getActiveForm(); // 需在表單編輯器中執行
  
  Logger.log('表單標題：' + form.getTitle());
  Logger.log('表單描述：' + form.getDescription());
  Logger.log('表單 ID：' + form.getId());
  Logger.log('發布 URL：' + form.getPublishedUrl());
  Logger.log('編輯 URL：' + form.getEditUrl());
  Logger.log('是否收集 Email：' + form.collectsEmail());
  Logger.log('題目數量：' + form.getItems().length);
  Logger.log('回應數量：' + form.getResponses().length);
}
