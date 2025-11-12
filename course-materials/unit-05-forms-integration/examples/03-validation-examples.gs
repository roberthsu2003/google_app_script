/**
 * FormApp 範例 3：題目驗證
 * 
 * 本範例展示如何為表單題目設定驗證規則
 */

/**
 * 範例 3.1：Email 驗證
 */
function example3_1_emailValidation() {
  var form = FormApp.create('Email 驗證範例');
  
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  emailItem.setHelpText('請輸入有效的 Email 地址');
  emailItem.setRequired(true);
  
  // 設定 Email 驗證
  var validation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  emailItem.setValidation(validation);
  
  Logger.log('Email 驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.2：數字範圍驗證
 */
function example3_2_numberRangeValidation() {
  var form = FormApp.create('數字範圍驗證範例');
  
  var ageItem = form.addTextItem();
  ageItem.setTitle('年齡');
  ageItem.setHelpText('請輸入 18-100 之間的數字');
  ageItem.setRequired(true);
  
  // 設定數字範圍驗證
  var validation = FormApp.createTextValidation()
    .requireNumberBetween(18, 100)
    .setHelpText('年齡必須在 18-100 之間')
    .build();
  ageItem.setValidation(validation);
  
  Logger.log('數字範圍驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.3：文字長度驗證
 */
function example3_3_textLengthValidation() {
  var form = FormApp.create('文字長度驗證範例');
  
  // 最小長度驗證
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setHelpText('至少 2 個字');
  nameItem.setRequired(true);
  
  var minLengthValidation = FormApp.createTextValidation()
    .requireTextLengthGreaterThanOrEqualTo(2)
    .setHelpText('姓名至少需要 2 個字')
    .build();
  nameItem.setValidation(minLengthValidation);
  
  // 最大長度驗證
  var nicknameItem = form.addTextItem();
  nicknameItem.setTitle('暱稱');
  nicknameItem.setHelpText('最多 10 個字');
  
  var maxLengthValidation = FormApp.createTextValidation()
    .requireTextLengthLessThanOrEqualTo(10)
    .setHelpText('暱稱最多 10 個字')
    .build();
  nicknameItem.setValidation(maxLengthValidation);
  
  Logger.log('文字長度驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.4：正規表達式驗證
 */
function example3_4_regexValidation() {
  var form = FormApp.create('正規表達式驗證範例');
  
  // 手機號碼驗證（台灣格式：09XX-XXXXXX）
  var phoneItem = form.addTextItem();
  phoneItem.setTitle('手機號碼');
  phoneItem.setHelpText('格式：09XX-XXXXXX');
  phoneItem.setRequired(true);
  
  var phoneValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('09\\d{2}-\\d{6}')
    .setHelpText('請輸入正確的手機號碼格式（例如：0912-345678）')
    .build();
  phoneItem.setValidation(phoneValidation);
  
  // 學號驗證（格式：4 位數字）
  var studentIdItem = form.addTextItem();
  studentIdItem.setTitle('學號');
  studentIdItem.setHelpText('格式：4 位數字');
  studentIdItem.setRequired(true);
  
  var studentIdValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('\\d{4}')
    .setHelpText('學號必須是 4 位數字')
    .build();
  studentIdItem.setValidation(studentIdValidation);
  
  Logger.log('正規表達式驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.5：URL 驗證
 */
function example3_5_urlValidation() {
  var form = FormApp.create('URL 驗證範例');
  
  var websiteItem = form.addTextItem();
  websiteItem.setTitle('個人網站');
  websiteItem.setHelpText('請輸入完整的網址');
  
  var urlValidation = FormApp.createTextValidation()
    .requireTextIsUrl()
    .setHelpText('請輸入有效的網址（例如：https://example.com）')
    .build();
  websiteItem.setValidation(urlValidation);
  
  Logger.log('URL 驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.6：整數驗證
 */
function example3_6_integerValidation() {
  var form = FormApp.create('整數驗證範例');
  
  var quantityItem = form.addTextItem();
  quantityItem.setTitle('購買數量');
  quantityItem.setHelpText('請輸入整數');
  quantityItem.setRequired(true);
  
  var integerValidation = FormApp.createTextValidation()
    .requireWholeNumber()
    .setHelpText('請輸入整數')
    .build();
  quantityItem.setValidation(integerValidation);
  
  Logger.log('整數驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.7：包含文字驗證
 */
function example3_7_containsTextValidation() {
  var form = FormApp.create('包含文字驗證範例');
  
  var codeItem = form.addTextItem();
  codeItem.setTitle('優惠代碼');
  codeItem.setHelpText('代碼必須包含 "SALE"');
  
  var containsValidation = FormApp.createTextValidation()
    .requireTextContainsPattern('SALE')
    .setHelpText('優惠代碼必須包含 "SALE"')
    .build();
  codeItem.setValidation(containsValidation);
  
  Logger.log('包含文字驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.8：不包含文字驗證
 */
function example3_8_notContainsTextValidation() {
  var form = FormApp.create('不包含文字驗證範例');
  
  var usernameItem = form.addTextItem();
  usernameItem.setTitle('使用者名稱');
  usernameItem.setHelpText('不可包含特殊符號');
  
  var notContainsValidation = FormApp.createTextValidation()
    .requireTextDoesNotContainPattern('[^a-zA-Z0-9]')
    .setHelpText('使用者名稱只能包含英文字母和數字')
    .build();
  usernameItem.setValidation(notContainsValidation);
  
  Logger.log('不包含文字驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.9：核取方塊數量驗證
 */
function example3_9_checkboxValidation() {
  var form = FormApp.create('核取方塊驗證範例');
  
  var item = form.addCheckboxItem();
  item.setTitle('請選擇 2-3 個興趣');
  item.setChoices([
    item.createChoice('運動'),
    item.createChoice('音樂'),
    item.createChoice('閱讀'),
    item.createChoice('旅遊'),
    item.createChoice('烹飪')
  ]);
  
  // 設定選擇數量驗證
  var validation = FormApp.createCheckboxValidation()
    .requireSelectAtLeast(2)
    .requireSelectAtMost(3)
    .build();
  item.setValidation(validation);
  
  Logger.log('核取方塊驗證已設定');
  Logger.log('表單連結：' + form.getPublishedUrl());
}

/**
 * 範例 3.10：綜合驗證範例
 */
function example3_10_comprehensiveValidation() {
  var form = FormApp.create('綜合驗證範例');
  form.setDescription('請填寫以下資料，所有欄位都有驗證規則');
  
  // 姓名（至少 2 個字）
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setRequired(true);
  var nameValidation = FormApp.createTextValidation()
    .requireTextLengthGreaterThanOrEqualTo(2)
    .setHelpText('姓名至少需要 2 個字')
    .build();
  nameItem.setValidation(nameValidation);
  
  // Email
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  emailItem.setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('請輸入有效的 Email 地址')
    .build();
  emailItem.setValidation(emailValidation);
  
  // 年齡（18-100）
  var ageItem = form.addTextItem();
  ageItem.setTitle('年齡');
  ageItem.setRequired(true);
  var ageValidation = FormApp.createTextValidation()
    .requireNumberBetween(18, 100)
    .setHelpText('年齡必須在 18-100 之間')
    .build();
  ageItem.setValidation(ageValidation);
  
  // 手機號碼
  var phoneItem = form.addTextItem();
  phoneItem.setTitle('手機號碼');
  phoneItem.setHelpText('格式：09XX-XXXXXX');
  phoneItem.setRequired(true);
  var phoneValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('09\\d{2}-\\d{6}')
    .setHelpText('請輸入正確的手機號碼格式')
    .build();
  phoneItem.setValidation(phoneValidation);
  
  // 興趣（選擇 1-3 個）
  var interestItem = form.addCheckboxItem();
  interestItem.setTitle('興趣（請選擇 1-3 個）');
  interestItem.setChoices([
    interestItem.createChoice('運動'),
    interestItem.createChoice('音樂'),
    interestItem.createChoice('閱讀'),
    interestItem.createChoice('旅遊')
  ]);
  var interestValidation = FormApp.createCheckboxValidation()
    .requireSelectAtLeast(1)
    .requireSelectAtMost(3)
    .build();
  interestItem.setValidation(interestValidation);
  
  Logger.log('綜合驗證表單已建立');
  Logger.log('表單連結：' + form.getPublishedUrl());
}
