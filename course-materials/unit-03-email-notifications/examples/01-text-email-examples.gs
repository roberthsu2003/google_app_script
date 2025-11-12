/**
 * 單元 3：自動寄信與通知
 * 範例 1：文字郵件範例
 * 
 * 本檔案示範如何使用 MailApp 發送各種文字格式的郵件
 */

/**
 * 範例 1-1：發送最簡單的文字郵件
 * 
 * 這是最基本的郵件發送方式，只需要三個參數：
 * - 收件者 Email
 * - 郵件主旨
 * - 郵件內容
 */
function example01_sendSimpleEmail() {
  var recipient = 'student@example.com';
  var subject = '課程通知';
  var body = '您好，\n\n這是一封測試郵件。\n\n祝好';
  
  MailApp.sendEmail(recipient, subject, body);
  Logger.log('郵件已發送給：' + recipient);
}

/**
 * 範例 1-2：使用變數組合個人化郵件內容
 * 
 * 透過變數可以讓郵件內容更加個人化和動態
 */
function example02_sendPersonalizedEmail() {
  var studentName = '王小明';
  var courseName = 'Google Apps Script 應用開發';
  var date = '2024年12月15日';
  
  var recipient = 'student@example.com';
  var subject = '課程提醒：' + courseName;
  var body = studentName + ' 同學您好，\n\n' +
             '提醒您 ' + date + ' 有 ' + courseName + ' 課程。\n' +
             '請準時出席。\n\n' +
             '祝學習愉快！';
  
  MailApp.sendEmail(recipient, subject, body);
  Logger.log('已發送個人化郵件給：' + studentName);
}

/**
 * 範例 1-3：從試算表讀取資料並發送郵件
 * 
 * 實際應用中，收件者資料通常來自試算表
 * 此範例示範如何整合 SpreadsheetApp 與 MailApp
 */
function example03_sendEmailFromSheet() {
  // 取得試算表資料
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('學生名單');
  
  // 假設第一列是標題：姓名、Email、課程
  // 從第二列開始讀取資料
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
  
  // 逐一發送郵件
  for (var i = 0; i < data.length; i++) {
    var name = data[i][0];
    var email = data[i][1];
    var course = data[i][2];
    
    if (email) {  // 確保 Email 不是空的
      var subject = '課程通知：' + course;
      var body = name + ' 同學您好，\n\n' +
                 '您已成功註冊 ' + course + ' 課程。\n' +
                 '課程將於下週開始，請準時出席。\n\n' +
                 '祝學習愉快！';
      
      MailApp.sendEmail(email, subject, body);
      Logger.log('已發送郵件給：' + name + ' (' + email + ')');
    }
  }
  
  Logger.log('批次郵件發送完成');
}

/**
 * 範例 1-4：使用多行字串提升可讀性
 * 
 * 當郵件內容較長時，可以使用多行字串讓程式碼更易讀
 */
function example04_sendLongEmail() {
  var recipient = 'student@example.com';
  var subject = '課程重要公告';
  
  // 使用多行字串組合郵件內容
  var body = '各位同學好，\n\n' +
             '以下是本學期重要事項公告：\n\n' +
             '1. 期中考日期：2024年12月20日\n' +
             '2. 考試範圍：第1-5章\n' +
             '3. 考試時間：10:00-12:00\n' +
             '4. 考試地點：電腦教室 A\n\n' +
             '注意事項：\n' +
             '- 請攜帶學生證\n' +
             '- 禁止使用手機\n' +
             '- 遲到15分鐘不得入場\n\n' +
             '如有任何問題，請隨時與我聯繫。\n\n' +
             '祝考試順利！\n\n' +
             '教務處 敬上';
  
  MailApp.sendEmail(recipient, subject, body);
  Logger.log('公告郵件已發送');
}

/**
 * 範例 1-5：使用函式產生郵件內容
 * 
 * 將郵件內容產生邏輯封裝成函式，提高程式碼重用性
 */
function example05_sendEmailWithFunction() {
  var studentName = '李小華';
  var studentEmail = 'student@example.com';
  var score = 85;
  
  var subject = '成績通知';
  var body = generateScoreEmailBody(studentName, score);
  
  MailApp.sendEmail(studentEmail, subject, body);
  Logger.log('成績通知已發送給：' + studentName);
}

/**
 * 輔助函式：產生成績通知郵件內容
 */
function generateScoreEmailBody(name, score) {
  var grade = '';
  
  if (score >= 90) {
    grade = '優';
  } else if (score >= 80) {
    grade = '良';
  } else if (score >= 70) {
    grade = '可';
  } else if (score >= 60) {
    grade = '及格';
  } else {
    grade = '待加強';
  }
  
  var body = name + ' 同學您好，\n\n' +
             '您的期中考成績已公布：\n\n' +
             '分數：' + score + ' 分\n' +
             '等級：' + grade + '\n\n' +
             '如對成績有疑問，請於一週內提出申請。\n\n' +
             '祝學習進步！';
  
  return body;
}

/**
 * 範例 1-6：檢查剩餘郵件配額
 * 
 * 在發送大量郵件前，建議先檢查剩餘配額
 */
function example06_checkEmailQuota() {
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log('今日剩餘郵件配額：' + quota + ' 封');
  
  if (quota < 10) {
    Logger.log('警告：配額不足 10 封！');
  }
}

/**
 * 範例 1-7：批次發送郵件並檢查配額
 * 
 * 實際應用中，應該在批次發送前檢查配額是否足夠
 */
function example07_sendBatchEmailsWithQuotaCheck() {
  var recipients = [
    'student1@example.com',
    'student2@example.com',
    'student3@example.com'
  ];
  
  var quota = MailApp.getRemainingDailyQuota();
  
  if (quota < recipients.length) {
    Logger.log('配額不足！剩餘：' + quota + '，需要：' + recipients.length);
    return;
  }
  
  var subject = '課程通知';
  var body = '您好，\n\n這是一封批次發送的通知郵件。\n\n祝好';
  
  for (var i = 0; i < recipients.length; i++) {
    MailApp.sendEmail(recipients[i], subject, body);
    Logger.log('已發送郵件給：' + recipients[i]);
  }
  
  Logger.log('批次發送完成，共發送 ' + recipients.length + ' 封郵件');
}

/**
 * 範例 1-8：使用日期時間資訊
 * 
 * 在郵件中加入當前日期時間，讓通知更加即時
 */
function example08_sendEmailWithDateTime() {
  var recipient = 'student@example.com';
  var subject = '系統通知';
  
  var now = new Date();
  var dateStr = Utilities.formatDate(now, 'Asia/Taipei', 'yyyy年MM月dd日 HH:mm:ss');
  
  var body = '您好，\n\n' +
             '這是一封系統自動發送的通知郵件。\n\n' +
             '發送時間：' + dateStr + '\n\n' +
             '此郵件由系統自動發送，請勿直接回覆。';
  
  MailApp.sendEmail(recipient, subject, body);
  Logger.log('通知郵件已發送');
}

/**
 * 練習題：
 * 
 * 1. 修改 example03，在發送郵件後，在試算表中記錄發送時間
 * 2. 修改 example05，加入不及格時的特別提醒內容
 * 3. 建立一個函式，發送生日祝福郵件給當天生日的學生
 * 4. 建立一個函式，每週一發送本週課程表給所有學生
 * 5. 建立一個函式，當配額低於 50 封時，發送警告郵件給管理員
 */
