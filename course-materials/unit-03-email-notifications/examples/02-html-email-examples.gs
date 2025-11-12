/**
 * 單元 3：自動寄信與通知
 * 範例 2：HTML 格式郵件範例
 * 
 * 本檔案示範如何使用 MailApp 發送 HTML 格式的郵件
 * HTML 郵件可以包含豐富的排版、顏色、圖片和連結
 */

/**
 * 範例 2-1：基本 HTML 郵件
 * 
 * 使用 htmlBody 選項發送 HTML 格式的郵件
 * 同時提供 plainBody 作為純文字版本（給不支援 HTML 的郵件客戶端）
 */
function example01_sendBasicHtmlEmail() {
  var recipient = 'student@example.com';
  var subject = '成績通知';
  var plainBody = '您的成績已公布，請查看郵件內容。';
  
  var htmlBody = '<h2>成績通知</h2>' +
                 '<p>王小明同學您好，</p>' +
                 '<p>您的期中考成績如下：</p>' +
                 '<ul>' +
                 '  <li>國文：85 分</li>' +
                 '  <li>英文：90 分</li>' +
                 '  <li>數學：88 分</li>' +
                 '</ul>' +
                 '<p><strong>平均：87.67 分</strong></p>' +
                 '<p>祝學習進步！</p>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('HTML 郵件已發送');
}

/**
 * 範例 2-2：使用 CSS 樣式的 HTML 郵件
 * 
 * 透過內嵌 CSS 樣式，讓郵件更加美觀專業
 */
function example02_sendStyledHtmlEmail() {
  var recipient = 'student@example.com';
  var subject = '活動邀請';
  var plainBody = '誠摯邀請您參加校內活動。';
  
  var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">' +
                 '  <div style="background-color: #4285f4; color: white; padding: 20px; text-align: center;">' +
                 '    <h1 style="margin: 0;">校內活動邀請</h1>' +
                 '  </div>' +
                 '  <div style="padding: 20px; background-color: #f5f5f5;">' +
                 '    <p>親愛的同學您好，</p>' +
                 '    <p>我們誠摯邀請您參加以下活動：</p>' +
                 '    <div style="background-color: white; padding: 15px; border-left: 4px solid #4285f4;">' +
                 '      <h3 style="margin-top: 0;">程式設計工作坊</h3>' +
                 '      <p><strong>時間：</strong>2024年12月20日 14:00-17:00</p>' +
                 '      <p><strong>地點：</strong>電腦教室 A</p>' +
                 '    </div>' +
                 '    <p style="margin-top: 20px;">' +
                 '      <a href="https://example.com/register" style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">立即報名</a>' +
                 '    </p>' +
                 '  </div>' +
                 '  <div style="background-color: #e0e0e0; padding: 10px; text-align: center; font-size: 12px;">' +
                 '    <p>此郵件由系統自動發送，請勿直接回覆</p>' +
                 '  </div>' +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody,
    name: '教務處'
  });
  
  Logger.log('樣式化 HTML 郵件已發送');
}

/**
 * 範例 2-3：使用表格呈現資料
 * 
 * HTML 表格非常適合用來呈現結構化的資料
 */
function example03_sendEmailWithTable() {
  var recipient = 'teacher@example.com';
  var subject = '班級成績統計';
  var plainBody = '班級成績統計報表請見郵件內容。';
  
  var htmlBody = '<div style="font-family: Arial, sans-serif;">' +
                 '  <h2>班級成績統計報表</h2>' +
                 '  <p>以下是本次期中考的成績統計：</p>' +
                 '  <table style="border-collapse: collapse; width: 100%; max-width: 500px;">' +
                 '    <thead>' +
                 '      <tr style="background-color: #4285f4; color: white;">' +
                 '        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">科目</th>' +
                 '        <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">平均分數</th>' +
                 '        <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">及格率</th>' +
                 '      </tr>' +
                 '    </thead>' +
                 '    <tbody>' +
                 '      <tr>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px;">國文</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">78.5</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">85%</td>' +
                 '      </tr>' +
                 '      <tr style="background-color: #f9f9f9;">' +
                 '        <td style="border: 1px solid #ddd; padding: 12px;">英文</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">82.3</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">90%</td>' +
                 '      </tr>' +
                 '      <tr>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px;">數學</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">75.8</td>' +
                 '        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">80%</td>' +
                 '      </tr>' +
                 '    </tbody>' +
                 '  </table>' +
                 '  <p style="margin-top: 20px;">詳細資料請參閱附件。</p>' +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('表格郵件已發送');
}

/**
 * 範例 2-4：從試算表資料產生 HTML 表格
 * 
 * 實際應用中，表格資料通常來自試算表
 * 此範例示範如何動態產生 HTML 表格
 */
function example04_sendEmailWithDynamicTable() {
  var recipient = 'teacher@example.com';
  var subject = '學生成績表';
  var plainBody = '學生成績表請見郵件內容。';
  
  // 從試算表讀取資料
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('成績');
  var data = sheet.getDataRange().getValues();
  
  // 建立 HTML 表格
  var tableHtml = '<table style="border-collapse: collapse; width: 100%;">';
  
  // 表頭
  tableHtml += '<thead><tr style="background-color: #4285f4; color: white;">';
  for (var j = 0; j < data[0].length; j++) {
    tableHtml += '<th style="border: 1px solid #ddd; padding: 10px;">' + data[0][j] + '</th>';
  }
  tableHtml += '</tr></thead>';
  
  // 表格內容
  tableHtml += '<tbody>';
  for (var i = 1; i < data.length; i++) {
    var rowStyle = (i % 2 === 0) ? 'background-color: #f9f9f9;' : '';
    tableHtml += '<tr style="' + rowStyle + '">';
    
    for (var j = 0; j < data[i].length; j++) {
      tableHtml += '<td style="border: 1px solid #ddd; padding: 10px;">' + data[i][j] + '</td>';
    }
    
    tableHtml += '</tr>';
  }
  tableHtml += '</tbody></table>';
  
  var htmlBody = '<div style="font-family: Arial, sans-serif;">' +
                 '  <h2>學生成績表</h2>' +
                 '  <p>以下是本次考試的成績：</p>' +
                 tableHtml +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('動態表格郵件已發送');
}

/**
 * 範例 2-5：使用顏色標示重要資訊
 * 
 * 透過顏色可以突顯重要資訊，提升郵件的可讀性
 */
function example05_sendEmailWithColorHighlight() {
  var recipient = 'student@example.com';
  var subject = '成績通知 - 需要注意';
  var plainBody = '您有科目未達及格標準，請查看郵件內容。';
  
  var htmlBody = '<div style="font-family: Arial, sans-serif;">' +
                 '  <h2>成績通知</h2>' +
                 '  <p>王小明同學您好，</p>' +
                 '  <p>您的期中考成績如下：</p>' +
                 '  <ul style="list-style: none; padding: 0;">' +
                 '    <li style="padding: 8px; margin: 5px 0; background-color: #d4edda; border-left: 4px solid #28a745;">國文：85 分 ✓ 及格</li>' +
                 '    <li style="padding: 8px; margin: 5px 0; background-color: #d4edda; border-left: 4px solid #28a745;">英文：90 分 ✓ 及格</li>' +
                 '    <li style="padding: 8px; margin: 5px 0; background-color: #f8d7da; border-left: 4px solid #dc3545;">數學：55 分 ✗ 不及格</li>' +
                 '  </ul>' +
                 '  <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">' +
                 '    <strong>⚠️ 注意事項：</strong>' +
                 '    <p>您的數學成績未達及格標準，建議：</p>' +
                 '    <ul>' +
                 '      <li>參加補救教學課程</li>' +
                 '      <li>與老師約時間進行個別輔導</li>' +
                 '      <li>加強課後練習</li>' +
                 '    </ul>' +
                 '  </div>' +
                 '</div>';
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('顏色標示郵件已發送');
}

/**
 * 範例 2-6：使用函式產生 HTML 郵件內容
 * 
 * 將 HTML 產生邏輯封裝成函式，提高程式碼重用性
 */
function example06_sendEmailWithHtmlFunction() {
  var studentName = '李小華';
  var studentEmail = 'student@example.com';
  var scores = {
    chinese: 88,
    english: 92,
    math: 85
  };
  
  var subject = '成績通知';
  var plainBody = '您的成績已公布。';
  var htmlBody = generateScoreHtmlEmail(studentName, scores);
  
  MailApp.sendEmail(studentEmail, subject, plainBody, {
    htmlBody: htmlBody
  });
  
  Logger.log('HTML 成績通知已發送給：' + studentName);
}

/**
 * 輔助函式：產生成績通知 HTML 郵件內容
 */
function generateScoreHtmlEmail(name, scores) {
  var average = (scores.chinese + scores.english + scores.math) / 3;
  average = Math.round(average * 100) / 100;
  
  var grade = '';
  var gradeColor = '';
  
  if (average >= 90) {
    grade = '優';
    gradeColor = '#28a745';
  } else if (average >= 80) {
    grade = '良';
    gradeColor = '#17a2b8';
  } else if (average >= 70) {
    grade = '可';
    gradeColor = '#ffc107';
  } else if (average >= 60) {
    grade = '及格';
    gradeColor = '#fd7e14';
  } else {
    grade = '待加強';
    gradeColor = '#dc3545';
  }
  
  var html = '<div style="font-family: Arial, sans-serif; max-width: 600px;">' +
             '  <div style="background-color: #4285f4; color: white; padding: 20px; text-align: center;">' +
             '    <h1 style="margin: 0;">成績通知</h1>' +
             '  </div>' +
             '  <div style="padding: 20px;">' +
             '    <p>' + name + ' 同學您好，</p>' +
             '    <p>您的期中考成績如下：</p>' +
             '    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">' +
             '      <tr>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd;">國文</td>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;"><strong>' + scores.chinese + ' 分</strong></td>' +
             '      </tr>' +
             '      <tr>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd;">英文</td>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;"><strong>' + scores.english + ' 分</strong></td>' +
             '      </tr>' +
             '      <tr>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd;">數學</td>' +
             '        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;"><strong>' + scores.math + ' 分</strong></td>' +
             '      </tr>' +
             '      <tr style="background-color: #f5f5f5;">' +
             '        <td style="padding: 10px;"><strong>平均</strong></td>' +
             '        <td style="padding: 10px; text-align: right;"><strong>' + average + ' 分</strong></td>' +
             '      </tr>' +
             '    </table>' +
             '    <div style="text-align: center; padding: 20px; background-color: ' + gradeColor + '; color: white; border-radius: 5px;">' +
             '      <h2 style="margin: 0;">等級：' + grade + '</h2>' +
             '    </div>' +
             '    <p style="margin-top: 20px;">如對成績有疑問，請於一週內提出申請。</p>' +
             '    <p>祝學習進步！</p>' +
             '  </div>' +
             '</div>';
  
  return html;
}

/**
 * 範例 2-7：郵件範本函式
 * 
 * 建立可重用的郵件範本，方便在不同場景使用
 */
function createEmailTemplate(title, content, footerText) {
  var html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
             '  <div style="background-color: #4285f4; color: white; padding: 20px; text-align: center;">' +
             '    <h1 style="margin: 0;">' + title + '</h1>' +
             '  </div>' +
             '  <div style="padding: 20px; background-color: #ffffff;">' +
             content +
             '  </div>' +
             '  <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">' +
             '    <p style="margin: 0;">' + footerText + '</p>' +
             '  </div>' +
             '</div>';
  
  return html;
}

/**
 * 範例 2-8：使用郵件範本發送通知
 */
function example08_sendEmailWithTemplate() {
  var recipient = 'student@example.com';
  var subject = '課程通知';
  var plainBody = '課程通知請見郵件內容。';
  
  var content = '<p>各位同學好，</p>' +
                '<p>提醒您下週課程安排如下：</p>' +
                '<ul>' +
                '  <li>週一：JavaScript 基礎</li>' +
                '  <li>週三：Google Sheets 操作</li>' +
                '  <li>週五：實作練習</li>' +
                '</ul>' +
                '<p>請準時出席。</p>';
  
  var htmlBody = createEmailTemplate(
    '課程通知',
    content,
    '此郵件由系統自動發送 | 如有問題請聯繫 support@example.com'
  );
  
  MailApp.sendEmail(recipient, subject, plainBody, {
    htmlBody: htmlBody,
    name: '教務處'
  });
  
  Logger.log('範本郵件已發送');
}

/**
 * 練習題：
 * 
 * 1. 建立一個函式，發送包含圓餅圖（使用 CSS）的統計報表郵件
 * 2. 建立一個函式，發送包含進度條的學習進度通知郵件
 * 3. 建立一個通用的警告郵件範本（紅色主題）
 * 4. 建立一個通用的成功郵件範本（綠色主題）
 * 5. 修改 example04，讓不及格的成績以紅色背景顯示
 */
