/**
 * 實作案例 5：自動產出成績單 PDF
 * 
 * 功能：
 * 1. 從試算表讀取學生成績資料
 * 2. 使用 Google Docs 範本產生個人成績單
 * 3. 將成績單匯出為 PDF
 * 4. 自動命名並儲存到指定資料夾
 * 5. 批次處理所有學生
 */

// ============================================
// 全域變數 - 請設定以下 ID
// ============================================

// 成績試算表 ID
var SPREADSHEET_ID = '';

// 成績單範本文件 ID
var TEMPLATE_DOC_ID = '';

// PDF 輸出資料夾 ID
var OUTPUT_FOLDER_ID = '';


// ============================================
// 步驟 1：建立範本文件
// ============================================

/**
 * 建立成績單範本文件
 * 執行此函式會建立一個範本文件
 */
function createTemplate() {
  var doc = DocumentApp.create('成績單範本');
  var body = doc.getBody();
  
  // 清除預設內容
  body.clear();
  
  // 設定標題
  var title = body.appendParagraph('學期成績單');
  title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  title.setFontSize(20);
  title.setBold(true);
  
  body.appendParagraph('');
  
  // 學生資訊
  body.appendParagraph('學號：{{學號}}');
  body.appendParagraph('姓名：{{姓名}}');
  body.appendParagraph('班級：{{班級}}');
  body.appendParagraph('');
  
  // 科目成績
  var subjectTitle = body.appendParagraph('科目成績');
  subjectTitle.setBold(true);
  subjectTitle.setFontSize(14);
  
  body.appendParagraph('國文：{{國文}} 分');
  body.appendParagraph('英文：{{英文}} 分');
  body.appendParagraph('數學：{{數學}} 分');
  body.appendParagraph('自然：{{自然}} 分');
  body.appendParagraph('社會：{{社會}} 分');
  body.appendParagraph('');
  
  // 統計資料
  var statsTitle = body.appendParagraph('統計資料');
  statsTitle.setBold(true);
  statsTitle.setFontSize(14);
  
  body.appendParagraph('平均分數：{{平均}} 分');
  body.appendParagraph('班級排名：第 {{排名}} 名');
  body.appendParagraph('等級評定：{{等級}}');
  body.appendParagraph('');
  
  // 評語
  var commentTitle = body.appendParagraph('導師評語');
  commentTitle.setBold(true);
  commentTitle.setFontSize(14);
  
  body.appendParagraph('{{評語}}');
  body.appendParagraph('');
  
  // 日期
  body.appendParagraph('發放日期：{{日期}}');
  
  Logger.log('✅ 範本文件已建立');
  Logger.log('文件 ID：' + doc.getId());
  Logger.log('文件 URL：' + doc.getUrl());
  Logger.log('');
  Logger.log('請將文件 ID 複製到程式碼中的 TEMPLATE_DOC_ID 變數');
}


// ============================================
// 步驟 2：建立成績試算表
// ============================================

/**
 * 建立成績試算表並填入測試資料
 */
function createGradeSheet() {
  var ss = SpreadsheetApp.create('學生成績資料');
  var sheet = ss.getSheets()[0];
  sheet.setName('成績');
  
  // 設定標題列
  var headers = ['學號', '姓名', '班級', '國文', '英文', '數學', '自然', '社會', '平均', '排名'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
  
  // 填入測試資料
  var testData = [
    ['001', '王小明', '一年一班', 85, 90, 88, 92, 87, 88.4, 5],
    ['002', '李小華', '一年一班', 92, 88, 95, 90, 93, 91.6, 2],
    ['003', '張小美', '一年二班', 78, 82, 80, 85, 79, 80.8, 15],
    ['004', '陳大明', '一年二班', 95, 93, 97, 94, 96, 95.0, 1],
    ['005', '林小芳', '一年一班', 88, 85, 90, 87, 89, 87.8, 8]
  ];
  
  sheet.getRange(2, 1, testData.length, testData[0].length).setValues(testData);
  
  // 自動調整欄寬
  for (var i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  Logger.log('✅ 成績試算表已建立');
  Logger.log('試算表 ID：' + ss.getId());
  Logger.log('試算表 URL：' + ss.getUrl());
  Logger.log('');
  Logger.log('請將試算表 ID 複製到程式碼中的 SPREADSHEET_ID 變數');
}


// ============================================
// 步驟 3：讀取成績資料
// ============================================

/**
 * 從試算表讀取學生成績資料
 * @return {Array} 學生資料陣列
 */
function getStudentData() {
  if (!SPREADSHEET_ID) {
    Logger.log('❌ 錯誤：請先設定 SPREADSHEET_ID');
    return [];
  }
  
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName('成績');
    
    if (!sheet) {
      Logger.log('❌ 錯誤：找不到「成績」工作表');
      return [];
    }
    
    // 取得所有資料
    var data = sheet.getDataRange().getValues();
    
    // 移除標題列
    var headers = data.shift();
    
    // 轉換為物件陣列
    var students = [];
    for (var i = 0; i < data.length; i++) {
      var student = {
        學號: data[i][0],
        姓名: data[i][1],
        班級: data[i][2],
        國文: data[i][3],
        英文: data[i][4],
        數學: data[i][5],
        自然: data[i][6],
        社會: data[i][7],
        平均: data[i][8],
        排名: data[i][9]
      };
      
      // 計算等級
      student.等級 = getGradeLevel(student.平均);
      
      // 產生評語
      student.評語 = generateComment(student);
      
      // 取得日期
      student.日期 = getDateString();
      
      students.push(student);
    }
    
    Logger.log('✅ 已讀取 ' + students.length + ' 位學生的資料');
    return students;
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
    return [];
  }
}


/**
 * 根據平均分數判定等級
 */
function getGradeLevel(average) {
  if (average >= 90) return '優等';
  if (average >= 80) return '甲等';
  if (average >= 70) return '乙等';
  if (average >= 60) return '丙等';
  return '待加強';
}


/**
 * 產生導師評語
 */
function generateComment(student) {
  var avg = student.平均;
  
  if (avg >= 90) {
    return '表現優異，持續保持！';
  } else if (avg >= 80) {
    return '成績良好，繼續努力！';
  } else if (avg >= 70) {
    return '表現不錯，還有進步空間。';
  } else if (avg >= 60) {
    return '需要更加努力，加油！';
  } else {
    return '需要加強學習，請多用功。';
  }
}


// ============================================
// 步驟 4：產生成績單
// ============================================

/**
 * 為單一學生產生成績單
 * @param {Object} student - 學生資料物件
 * @return {File} PDF 檔案物件
 */
function generateReportCard(student) {
  if (!TEMPLATE_DOC_ID) {
    Logger.log('❌ 錯誤：請先設定 TEMPLATE_DOC_ID');
    return null;
  }
  
  if (!OUTPUT_FOLDER_ID) {
    Logger.log('❌ 錯誤：請先設定 OUTPUT_FOLDER_ID');
    return null;
  }
  
  try {
    // 複製範本文件
    var templateDoc = DriveApp.getFileById(TEMPLATE_DOC_ID);
    var tempDoc = templateDoc.makeCopy('temp_' + student.學號);
    
    // 開啟複製的文件
    var doc = DocumentApp.openById(tempDoc.getId());
    var body = doc.getBody();
    
    // 替換所有標記
    for (var key in student) {
      var placeholder = '{{' + key + '}}';
      body.replaceText(placeholder, student[key].toString());
    }
    
    // 儲存變更
    doc.saveAndClose();
    
    // 等待文件儲存完成
    Utilities.sleep(1000);
    
    // 匯出為 PDF
    var pdfBlob = tempDoc.getAs('application/pdf');
    
    // 設定檔案名稱
    var fileName = '成績單_' + student.班級 + '_' + student.學號 + '_' + student.姓名 + '.pdf';
    pdfBlob.setName(fileName);
    
    // 儲存到輸出資料夾
    var outputFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID);
    var pdfFile = outputFolder.createFile(pdfBlob);
    
    // 刪除臨時文件
    DriveApp.getFileById(tempDoc.getId()).setTrashed(true);
    
    return pdfFile;
    
  } catch (error) {
    Logger.log('❌ 產生成績單失敗：' + error.message);
    return null;
  }
}


// ============================================
// 步驟 5：批次處理
// ============================================

/**
 * 批次產生所有學生的成績單
 */
function generateAllReportCards() {
  Logger.log('=== 開始批次產生成績單 ===\n');
  
  // 檢查設定
  if (!SPREADSHEET_ID || !TEMPLATE_DOC_ID || !OUTPUT_FOLDER_ID) {
    Logger.log('❌ 錯誤：請先設定所有必要的 ID');
    Logger.log('SPREADSHEET_ID: ' + (SPREADSHEET_ID ? '已設定' : '未設定'));
    Logger.log('TEMPLATE_DOC_ID: ' + (TEMPLATE_DOC_ID ? '已設定' : '未設定'));
    Logger.log('OUTPUT_FOLDER_ID: ' + (OUTPUT_FOLDER_ID ? '已設定' : '未設定'));
    return;
  }
  
  var startTime = new Date();
  
  // 讀取學生資料
  var students = getStudentData();
  
  if (students.length === 0) {
    Logger.log('沒有學生資料');
    return;
  }
  
  Logger.log('');
  Logger.log('=== 開始產生 PDF ===\n');
  
  var successCount = 0;
  var failCount = 0;
  
  // 逐一產生成績單
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    
    Logger.log((i + 1) + '. 處理：' + student.姓名 + ' (' + student.學號 + ')');
    
    var pdfFile = generateReportCard(student);
    
    if (pdfFile) {
      successCount++;
      Logger.log('   ✅ 成功：' + pdfFile.getName());
      Logger.log('   URL：' + pdfFile.getUrl());
    } else {
      failCount++;
      Logger.log('   ❌ 失敗');
    }
    
    Logger.log('');
  }
  
  var endTime = new Date();
  var duration = (endTime.getTime() - startTime.getTime()) / 1000;
  
  // 產生報告
  Logger.log('========================================');
  Logger.log('=== 批次處理完成 ===');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('總學生數：' + students.length);
  Logger.log('成功：' + successCount);
  Logger.log('失敗：' + failCount);
  Logger.log('執行時間：' + duration.toFixed(2) + ' 秒');
  Logger.log('');
  
  // 取得輸出資料夾 URL
  var outputFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID);
  Logger.log('輸出資料夾：');
  Logger.log(outputFolder.getUrl());
}


/**
 * 為單一學生產生成績單（測試用）
 */
function generateSingleReportCard() {
  var students = getStudentData();
  
  if (students.length === 0) {
    Logger.log('沒有學生資料');
    return;
  }
  
  // 產生第一位學生的成績單
  var student = students[0];
  
  Logger.log('=== 產生單一成績單 ===');
  Logger.log('學生：' + student.姓名 + ' (' + student.學號 + ')');
  Logger.log('');
  
  var pdfFile = generateReportCard(student);
  
  if (pdfFile) {
    Logger.log('✅ 成功產生成績單');
    Logger.log('檔案名稱：' + pdfFile.getName());
    Logger.log('檔案 URL：' + pdfFile.getUrl());
  } else {
    Logger.log('❌ 產生失敗');
  }
}


// ============================================
// 輔助函式
// ============================================

/**
 * 取得日期字串
 */
function getDateString() {
  var date = new Date();
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1, 2);
  var day = padZero(date.getDate(), 2);
  return year + ' 年 ' + month + ' 月 ' + day + ' 日';
}


/**
 * 補零函式
 */
function padZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}


/**
 * 建立輸出資料夾
 */
function createOutputFolder() {
  var folder = DriveApp.createFolder('成績單 PDF');
  
  Logger.log('✅ 輸出資料夾已建立');
  Logger.log('資料夾 ID：' + folder.getId());
  Logger.log('資料夾 URL：' + folder.getUrl());
  Logger.log('');
  Logger.log('請將資料夾 ID 複製到程式碼中的 OUTPUT_FOLDER_ID 變數');
}


/**
 * 初始化設定（一次性執行）
 */
function initialize() {
  Logger.log('=== 初始化設定 ===\n');
  
  Logger.log('步驟 1：建立成績試算表');
  createGradeSheet();
  
  Logger.log('\n步驟 2：建立範本文件');
  createTemplate();
  
  Logger.log('\n步驟 3：建立輸出資料夾');
  createOutputFolder();
  
  Logger.log('\n========================================');
  Logger.log('初始化完成！');
  Logger.log('========================================');
  Logger.log('');
  Logger.log('下一步：');
  Logger.log('1. 將上方顯示的 ID 複製到程式碼中');
  Logger.log('2. 執行 generateAllReportCards() 產生成績單');
}
