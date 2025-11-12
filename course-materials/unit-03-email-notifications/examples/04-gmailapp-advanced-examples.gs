/**
 * 單元 3：自動寄信與通知
 * 範例 4：GmailApp 進階功能範例
 * 
 * 本檔案示範 GmailApp 的進階功能
 * 包含讀取郵件、標籤管理、草稿管理、搜尋郵件等
 */

/**
 * 範例 4-1：讀取未讀郵件
 * 
 * 使用 GmailApp 搜尋並讀取未讀郵件
 */
function example01_readUnreadEmails() {
  // 搜尋未讀郵件
  var threads = GmailApp.search('is:unread');
  
  Logger.log('未讀郵件數量：' + threads.length);
  
  // 讀取前 5 封未讀郵件
  var limit = Math.min(threads.length, 5);
  
  for (var i = 0; i < limit; i++) {
    var messages = threads[i].getMessages();
    var firstMessage = messages[0];
    
    Logger.log('--- 郵件 ' + (i + 1) + ' ---');
    Logger.log('寄件者：' + firstMessage.getFrom());
    Logger.log('主旨：' + firstMessage.getSubject());
    Logger.log('日期：' + firstMessage.getDate());
    Logger.log('內容預覽：' + firstMessage.getPlainBody().substring(0, 100) + '...');
    Logger.log('');
  }
}

/**
 * 範例 4-2：搜尋特定寄件者的郵件
 * 
 * 使用搜尋語法找出特定寄件者的所有郵件
 */
function example02_searchEmailsBySender() {
  // 搜尋特定寄件者的郵件
  var senderEmail = 'teacher@example.com';
  var threads = GmailApp.search('from:' + senderEmail);
  
  Logger.log('找到 ' + threads.length + ' 封來自 ' + senderEmail + ' 的郵件');
  
  // 列出所有郵件主旨
  for (var i = 0; i < threads.length; i++) {
    var firstMessage = threads[i].getMessages()[0];
    Logger.log((i + 1) + '. ' + firstMessage.getSubject());
  }
}

/**
 * 範例 4-3：搜尋包含特定關鍵字的郵件
 * 
 * 使用多種搜尋條件組合
 */
function example03_searchEmailsByKeyword() {
  // 搜尋主旨包含「作業」且在特定日期之後的郵件
  var threads = GmailApp.search('subject:作業 after:2024/12/01');
  
  Logger.log('找到 ' + threads.length + ' 封作業相關郵件');
  
  for (var i = 0; i < threads.length; i++) {
    var firstMessage = threads[i].getMessages()[0];
    Logger.log('主旨：' + firstMessage.getSubject());
    Logger.log('日期：' + firstMessage.getDate());
    Logger.log('---');
  }
}

/**
 * 範例 4-4：搜尋有附件的郵件
 * 
 * 找出所有包含附件的郵件
 */
function example04_searchEmailsWithAttachments() {
  // 搜尋有附件的郵件
  var threads = GmailApp.search('has:attachment');
  
  Logger.log('找到 ' + threads.length + ' 封有附件的郵件');
  
  // 列出前 10 封郵件的附件資訊
  var limit = Math.min(threads.length, 10);
  
  for (var i = 0; i < limit; i++) {
    var messages = threads[i].getMessages();
    var firstMessage = messages[0];
    var attachments = firstMessage.getAttachments();
    
    Logger.log('郵件：' + firstMessage.getSubject());
    Logger.log('附件數量：' + attachments.length);
    
    for (var j = 0; j < attachments.length; j++) {
      Logger.log('  - ' + attachments[j].getName() + ' (' + attachments[j].getSize() + ' bytes)');
    }
    
    Logger.log('---');
  }
}

/**
 * 範例 4-5：建立標籤
 * 
 * 建立新的 Gmail 標籤
 */
function example05_createLabel() {
  var labelName = '課程通知';
  
  try {
    // 檢查標籤是否已存在
    var label = GmailApp.getUserLabelByName(labelName);
    
    if (label) {
      Logger.log('標籤已存在：' + labelName);
    } else {
      // 建立新標籤
      label = GmailApp.createLabel(labelName);
      Logger.log('已建立標籤：' + labelName);
    }
  } catch (error) {
    Logger.log('建立標籤失敗：' + error.message);
  }
}

/**
 * 範例 4-6：為郵件加上標籤
 * 
 * 搜尋特定郵件並加上標籤
 */
function example06_addLabelToEmails() {
  var labelName = '課程通知';
  var label = GmailApp.getUserLabelByName(labelName);
  
  if (!label) {
    label = GmailApp.createLabel(labelName);
    Logger.log('已建立標籤：' + labelName);
  }
  
  // 搜尋主旨包含「課程」的郵件
  var threads = GmailApp.search('subject:課程');
  
  Logger.log('找到 ' + threads.length + ' 封郵件');
  
  // 為所有郵件加上標籤
  for (var i = 0; i < threads.length; i++) {
    threads[i].addLabel(label);
  }
  
  Logger.log('已為 ' + threads.length + ' 封郵件加上標籤');
}

/**
 * 範例 4-7：移除標籤
 * 
 * 從郵件中移除特定標籤
 */
function example07_removeLabelFromEmails() {
  var labelName = '課程通知';
  var label = GmailApp.getUserLabelByName(labelName);
  
  if (!label) {
    Logger.log('標籤不存在：' + labelName);
    return;
  }
  
  // 取得有此標籤的所有郵件
  var threads = label.getThreads();
  
  Logger.log('找到 ' + threads.length + ' 封有此標籤的郵件');
  
  // 移除標籤
  for (var i = 0; i < threads.length; i++) {
    threads[i].removeLabel(label);
  }
  
  Logger.log('已移除標籤');
}

/**
 * 範例 4-8：建立草稿
 * 
 * 建立郵件草稿而不立即發送
 */
function example08_createDraft() {
  var recipient = 'student@example.com';
  var subject = '課程提醒';
  var body = '您好，\n\n這是一封草稿郵件，尚未發送。\n\n祝好';
  
  // 建立草稿
  GmailApp.createDraft(recipient, subject, body);
  
  Logger.log('草稿已建立');
}

/**
 * 範例 4-9：建立 HTML 格式草稿
 * 
 * 建立包含 HTML 內容的草稿
 */
function example09_createHtmlDraft() {
  var recipient = 'student@example.com';
  var subject = '成績通知';
  var plainBody = '您的成績已公布。';
  
  var htmlBody = '<h2>成績通知</h2>' +
                 '<p>王小明同學您好，</p>' +
                 '<p>您的期中考成績如下：</p>' +
                 '<ul>' +
                 '  <li>國文：85 分</li>' +
                 '  <li>英文：90 分</li>' +
                 '  <li>數學：88 分</li>' +
                 '</ul>' +
                 '<p><strong>平均：87.67 分</strong></p>';
  
  GmailApp.createDraft(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('HTML 草稿已建立');
}

/**
 * 範例 4-10：讀取草稿
 * 
 * 取得所有草稿並顯示資訊
 */
function example10_readDrafts() {
  var drafts = GmailApp.getDrafts();
  
  Logger.log('草稿數量：' + drafts.length);
  
  for (var i = 0; i < drafts.length; i++) {
    var message = drafts[i].getMessage();
    
    Logger.log('--- 草稿 ' + (i + 1) + ' ---');
    Logger.log('收件者：' + message.getTo());
    Logger.log('主旨：' + message.getSubject());
    Logger.log('內容預覽：' + message.getPlainBody().substring(0, 50) + '...');
    Logger.log('');
  }
}

/**
 * 範例 4-11：標記郵件為已讀
 * 
 * 將特定郵件標記為已讀
 */
function example11_markAsRead() {
  // 搜尋未讀的通知郵件
  var threads = GmailApp.search('is:unread subject:通知');
  
  Logger.log('找到 ' + threads.length + ' 封未讀通知');
  
  // 標記為已讀
  for (var i = 0; i < threads.length; i++) {
    threads[i].markRead();
  }
  
  Logger.log('已將 ' + threads.length + ' 封郵件標記為已讀');
}

/**
 * 範例 4-12：標記郵件為未讀
 * 
 * 將特定郵件標記為未讀（用於提醒）
 */
function example12_markAsUnread() {
  // 搜尋重要但已讀的郵件
  var threads = GmailApp.search('is:read subject:重要');
  
  Logger.log('找到 ' + threads.length + ' 封重要郵件');
  
  // 標記為未讀
  for (var i = 0; i < threads.length; i++) {
    threads[i].markUnread();
  }
  
  Logger.log('已將 ' + threads.length + ' 封郵件標記為未讀');
}

/**
 * 範例 4-13：加上星號
 * 
 * 為重要郵件加上星號標記
 */
function example13_addStar() {
  // 搜尋來自老師的郵件
  var threads = GmailApp.search('from:teacher@example.com');
  
  Logger.log('找到 ' + threads.length + ' 封郵件');
  
  // 加上星號
  for (var i = 0; i < threads.length; i++) {
    threads[i].addStar();
  }
  
  Logger.log('已為 ' + threads.length + ' 封郵件加上星號');
}

/**
 * 範例 4-14：移除星號
 * 
 * 移除郵件的星號標記
 */
function example14_removeStar() {
  // 搜尋有星號的郵件
  var threads = GmailApp.search('is:starred');
  
  Logger.log('找到 ' + threads.length + ' 封有星號的郵件');
  
  // 移除星號
  for (var i = 0; i < threads.length; i++) {
    threads[i].removeStar();
  }
  
  Logger.log('已移除星號');
}

/**
 * 範例 4-15：移動郵件到垃圾桶
 * 
 * 將特定郵件移到垃圾桶
 */
function example15_moveToTrash() {
  // 搜尋垃圾郵件
  var threads = GmailApp.search('subject:spam');
  
  Logger.log('找到 ' + threads.length + ' 封郵件');
  
  // 移到垃圾桶
  for (var i = 0; i < threads.length; i++) {
    threads[i].moveToTrash();
  }
  
  Logger.log('已將 ' + threads.length + ' 封郵件移到垃圾桶');
}

/**
 * 範例 4-16：回覆郵件
 * 
 * 自動回覆特定郵件
 */
function example16_replyToEmail() {
  // 搜尋需要回覆的郵件
  var threads = GmailApp.search('subject:詢問 is:unread');
  
  if (threads.length > 0) {
    var thread = threads[0];
    var replyBody = '您好，\n\n感謝您的來信。\n我們已收到您的詢問，將盡快回覆。\n\n祝好';
    
    // 回覆郵件
    thread.reply(replyBody);
    
    Logger.log('已回覆郵件：' + thread.getFirstMessageSubject());
  } else {
    Logger.log('沒有需要回覆的郵件');
  }
}

/**
 * 範例 4-17：轉寄郵件
 * 
 * 將郵件轉寄給其他人
 */
function example17_forwardEmail() {
  // 搜尋需要轉寄的郵件
  var threads = GmailApp.search('subject:重要通知');
  
  if (threads.length > 0) {
    var thread = threads[0];
    var forwardTo = 'manager@example.com';
    
    // 轉寄郵件
    thread.forward(forwardTo, {
      body: '轉寄給您參考。'
    });
    
    Logger.log('已轉寄郵件給：' + forwardTo);
  }
}

/**
 * 範例 4-18：取得郵件的所有回覆
 * 
 * 讀取郵件串中的所有訊息
 */
function example18_getAllMessages() {
  // 搜尋特定郵件串
  var threads = GmailApp.search('subject:專案討論');
  
  if (threads.length > 0) {
    var thread = threads[0];
    var messages = thread.getMessages();
    
    Logger.log('郵件串包含 ' + messages.length + ' 則訊息');
    
    for (var i = 0; i < messages.length; i++) {
      Logger.log('--- 訊息 ' + (i + 1) + ' ---');
      Logger.log('寄件者：' + messages[i].getFrom());
      Logger.log('日期：' + messages[i].getDate());
      Logger.log('內容：' + messages[i].getPlainBody().substring(0, 100) + '...');
      Logger.log('');
    }
  }
}

/**
 * 範例 4-19：搜尋進階語法組合
 * 
 * 使用多種搜尋條件的組合
 */
function example19_advancedSearch() {
  // 搜尋：來自特定寄件者、有附件、在特定日期範圍內、未讀
  var searchQuery = 'from:teacher@example.com has:attachment after:2024/12/01 before:2024/12/31 is:unread';
  var threads = GmailApp.search(searchQuery);
  
  Logger.log('搜尋條件：' + searchQuery);
  Logger.log('找到 ' + threads.length + ' 封郵件');
  
  for (var i = 0; i < threads.length; i++) {
    var firstMessage = threads[i].getMessages()[0];
    Logger.log((i + 1) + '. ' + firstMessage.getSubject() + ' (' + firstMessage.getDate() + ')');
  }
}

/**
 * 範例 4-20：自動整理郵件
 * 
 * 根據規則自動整理郵件（加標籤、標記已讀等）
 */
function example20_autoOrganizeEmails() {
  // 規則 1：課程通知加上標籤並標記為已讀
  var courseLabel = GmailApp.getUserLabelByName('課程通知') || GmailApp.createLabel('課程通知');
  var courseThreads = GmailApp.search('subject:課程 is:unread');
  
  for (var i = 0; i < courseThreads.length; i++) {
    courseThreads[i].addLabel(courseLabel);
    courseThreads[i].markRead();
  }
  
  Logger.log('已整理 ' + courseThreads.length + ' 封課程通知');
  
  // 規則 2：作業相關加上星號
  var homeworkThreads = GmailApp.search('subject:作業');
  
  for (var i = 0; i < homeworkThreads.length; i++) {
    homeworkThreads[i].addStar();
  }
  
  Logger.log('已為 ' + homeworkThreads.length + ' 封作業郵件加上星號');
  
  // 規則 3：廣告郵件移到垃圾桶
  var spamThreads = GmailApp.search('subject:廣告 OR subject:促銷');
  
  for (var i = 0; i < spamThreads.length; i++) {
    spamThreads[i].moveToTrash();
  }
  
  Logger.log('已移除 ' + spamThreads.length + ' 封廣告郵件');
}

/**
 * 常用搜尋語法參考：
 * 
 * - from:email@example.com     搜尋特定寄件者
 * - to:email@example.com       搜尋特定收件者
 * - subject:關鍵字              搜尋主旨包含關鍵字
 * - has:attachment             搜尋有附件的郵件
 * - is:unread                  搜尋未讀郵件
 * - is:read                    搜尋已讀郵件
 * - is:starred                 搜尋有星號的郵件
 * - after:2024/12/01           搜尋特定日期之後的郵件
 * - before:2024/12/31          搜尋特定日期之前的郵件
 * - label:標籤名稱              搜尋有特定標籤的郵件
 * - filename:pdf               搜尋包含 PDF 附件的郵件
 * - larger:5M                  搜尋大於 5MB 的郵件
 * - smaller:1M                 搜尋小於 1MB 的郵件
 * 
 * 可以使用 OR 和 AND 組合多個條件
 * 例如：subject:作業 OR subject:考試
 */

/**
 * 練習題：
 * 
 * 1. 建立一個函式，自動回覆所有未讀的詢問郵件
 * 2. 建立一個函式，將超過 30 天的已讀郵件自動封存
 * 3. 建立一個函式，統計每個標籤下的郵件數量
 * 4. 建立一個函式，找出所有大於 10MB 的郵件並列出
 * 5. 建立一個函式，自動將來自特定寄件者的郵件轉寄給主管
 */
