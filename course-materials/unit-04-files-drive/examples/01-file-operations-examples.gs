/**
 * DriveApp 檔案操作範例
 * 
 * 本檔案包含 DriveApp 服務的檔案操作範例：
 * - 取得檔案（使用 ID、名稱、類型）
 * - 建立檔案
 * - 取得檔案資訊
 */

// ============================================
// 範例 1：使用檔案 ID 取得檔案
// ============================================

/**
 * 使用檔案 ID 取得檔案
 * 
 * 檔案 URL 格式：https://drive.google.com/file/d/FILE_ID/view
 * 從 URL 中複製 FILE_ID 部分
 */
function example01_getFileById() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 檔案資訊 ===');
    Logger.log('檔案名稱：' + file.getName());
    Logger.log('檔案 ID：' + file.getId());
    Logger.log('檔案類型：' + file.getMimeType());
    Logger.log('檔案大小：' + file.getSize() + ' bytes');
    Logger.log('建立時間：' + file.getDateCreated());
    Logger.log('最後修改：' + file.getLastUpdated());
    Logger.log('檔案 URL：' + file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
    Logger.log('請確認檔案 ID 是否正確，以及你是否有權限存取該檔案');
  }
}


// ============================================
// 範例 2：使用檔案名稱搜尋檔案
// ============================================

/**
 * 使用檔案名稱搜尋檔案
 * 
 * 注意：可能會找到多個同名檔案
 */
function example02_getFilesByName() {
  var fileName = '測試檔案.txt';
  var files = DriveApp.getFilesByName(fileName);
  
  // 檢查是否找到檔案
  if (!files.hasNext()) {
    Logger.log('❌ 找不到檔案：' + fileName);
    return;
  }
  
  // 遍歷所有同名檔案
  Logger.log('=== 搜尋結果：' + fileName + ' ===\n');
  var count = 0;
  
  while (files.hasNext()) {
    count++;
    var file = files.next();
    
    Logger.log('檔案 ' + count + '：');
    Logger.log('  名稱：' + file.getName());
    Logger.log('  ID：' + file.getId());
    Logger.log('  URL：' + file.getUrl());
    Logger.log('  大小：' + formatFileSize(file.getSize()));
    Logger.log('');
  }
  
  Logger.log('✅ 總共找到 ' + count + ' 個檔案');
}


// ============================================
// 範例 3：取得特定類型的檔案
// ============================================

/**
 * 取得所有 PDF 檔案
 */
function example03_getPdfFiles() {
  var files = DriveApp.getFilesByType(MimeType.PDF);
  
  Logger.log('=== PDF 檔案清單 ===\n');
  var count = 0;
  
  while (files.hasNext() && count < 10) {  // 限制只顯示前 10 個
    count++;
    var file = files.next();
    
    Logger.log(count + '. ' + file.getName());
    Logger.log('   大小：' + formatFileSize(file.getSize()));
    Logger.log('   修改：' + file.getLastUpdated());
    Logger.log('');
  }
  
  Logger.log('✅ 顯示前 ' + count + ' 個 PDF 檔案');
}


/**
 * 取得所有 Google 試算表
 */
function example04_getSpreadsheets() {
  var files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
  
  Logger.log('=== Google 試算表清單 ===\n');
  var count = 0;
  
  while (files.hasNext() && count < 10) {  // 限制只顯示前 10 個
    count++;
    var file = files.next();
    
    Logger.log(count + '. ' + file.getName());
    Logger.log('   URL：' + file.getUrl());
    Logger.log('');
  }
  
  Logger.log('✅ 顯示前 ' + count + ' 個試算表');
}


// ============================================
// 範例 4：常用 MIME 類型
// ============================================

/**
 * 列出常用的 MIME 類型
 */
function example05_listMimeTypes() {
  Logger.log('=== 常用 MIME 類型 ===\n');
  
  Logger.log('【Google 文件類型】');
  Logger.log('Google 文件：' + MimeType.GOOGLE_DOCS);
  Logger.log('Google 試算表：' + MimeType.GOOGLE_SHEETS);
  Logger.log('Google 簡報：' + MimeType.GOOGLE_SLIDES);
  Logger.log('Google 表單：' + MimeType.GOOGLE_FORMS);
  Logger.log('');
  
  Logger.log('【Microsoft Office】');
  Logger.log('Word 文件：' + MimeType.MICROSOFT_WORD);
  Logger.log('Excel 試算表：' + MimeType.MICROSOFT_EXCEL);
  Logger.log('PowerPoint 簡報：' + MimeType.MICROSOFT_POWERPOINT);
  Logger.log('');
  
  Logger.log('【其他常用類型】');
  Logger.log('PDF：' + MimeType.PDF);
  Logger.log('純文字：' + MimeType.PLAIN_TEXT);
  Logger.log('JPEG 圖片：' + MimeType.JPEG);
  Logger.log('PNG 圖片：' + MimeType.PNG);
  Logger.log('ZIP 壓縮檔：' + MimeType.ZIP);
}


// ============================================
// 範例 5：建立文字檔案
// ============================================

/**
 * 建立簡單的文字檔案
 */
function example06_createTextFile() {
  var fileName = '測試檔案_' + new Date().getTime() + '.txt';
  var content = '這是一個測試檔案\n';
  content += '建立時間：' + new Date() + '\n';
  content += '建立者：Google Apps Script\n';
  
  // 建立檔案
  var file = DriveApp.createFile(fileName, content);
  
  Logger.log('✅ 檔案已建立');
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('檔案 ID：' + file.getId());
  Logger.log('檔案 URL：' + file.getUrl());
  Logger.log('');
  Logger.log('👉 請點擊上方 URL 查看檔案');
}


/**
 * 建立 CSV 檔案
 */
function example07_createCsvFile() {
  var fileName = '學生名單_' + new Date().getTime() + '.csv';
  
  // 準備 CSV 內容
  var data = [
    ['學號', '姓名', '班級'],
    ['001', '王小明', '一年一班'],
    ['002', '李小華', '一年一班'],
    ['003', '張小美', '一年二班']
  ];
  
  // 轉換為 CSV 格式
  var csvContent = data.map(function(row) {
    return row.join(',');
  }).join('\n');
  
  // 建立檔案
  var file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
  
  Logger.log('✅ CSV 檔案已建立');
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('檔案 URL：' + file.getUrl());
}


// ============================================
// 範例 6：取得檔案詳細資訊
// ============================================

/**
 * 取得檔案的詳細資訊
 */
function example08_getFileDetails() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 檔案詳細資訊 ===\n');
    
    // 基本資訊
    Logger.log('【基本資訊】');
    Logger.log('檔案名稱：' + file.getName());
    Logger.log('檔案 ID：' + file.getId());
    Logger.log('檔案類型：' + file.getMimeType());
    Logger.log('');
    
    // 大小與日期
    Logger.log('【大小與日期】');
    Logger.log('檔案大小：' + formatFileSize(file.getSize()));
    Logger.log('建立時間：' + file.getDateCreated());
    Logger.log('最後修改：' + file.getLastUpdated());
    Logger.log('');
    
    // 連結
    Logger.log('【連結】');
    Logger.log('檔案 URL：' + file.getUrl());
    Logger.log('下載 URL：' + file.getDownloadUrl());
    Logger.log('');
    
    // 擁有者與分享
    Logger.log('【擁有者與分享】');
    Logger.log('擁有者：' + file.getOwner().getName());
    Logger.log('擁有者 Email：' + file.getOwner().getEmail());
    Logger.log('分享狀態：' + file.getSharingAccess());
    Logger.log('分享權限：' + file.getSharingPermission());
    Logger.log('');
    
    // 所在資料夾
    Logger.log('【所在資料夾】');
    var parents = file.getParents();
    var folderCount = 0;
    while (parents.hasNext()) {
      folderCount++;
      var parent = parents.next();
      Logger.log('資料夾 ' + folderCount + '：' + parent.getName());
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 7：搜尋特定條件的檔案
// ============================================

/**
 * 搜尋最近修改的檔案
 */
function example09_getRecentFiles() {
  var files = DriveApp.getFiles();
  var recentFiles = [];
  
  // 取得最近 7 天修改的檔案
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  Logger.log('=== 最近 7 天修改的檔案 ===\n');
  var count = 0;
  
  while (files.hasNext() && count < 20) {  // 限制只檢查前 20 個
    var file = files.next();
    
    if (file.getLastUpdated() > sevenDaysAgo) {
      count++;
      Logger.log(count + '. ' + file.getName());
      Logger.log('   修改時間：' + file.getLastUpdated());
      Logger.log('   類型：' + file.getMimeType());
      Logger.log('');
    }
  }
  
  if (count === 0) {
    Logger.log('沒有找到最近修改的檔案');
  } else {
    Logger.log('✅ 找到 ' + count + ' 個最近修改的檔案');
  }
}


/**
 * 搜尋大檔案
 */
function example10_getLargeFiles() {
  var files = DriveApp.getFiles();
  var largeFiles = [];
  var minSize = 10 * 1024 * 1024;  // 10 MB
  
  Logger.log('=== 大於 10 MB 的檔案 ===\n');
  var count = 0;
  
  while (files.hasNext() && count < 10) {  // 限制只顯示前 10 個
    var file = files.next();
    
    if (file.getSize() > minSize) {
      count++;
      Logger.log(count + '. ' + file.getName());
      Logger.log('   大小：' + formatFileSize(file.getSize()));
      Logger.log('   類型：' + file.getMimeType());
      Logger.log('');
    }
  }
  
  if (count === 0) {
    Logger.log('沒有找到大於 10 MB 的檔案');
  } else {
    Logger.log('✅ 找到 ' + count + ' 個大檔案');
  }
}


// ============================================
// 輔助函式
// ============================================

/**
 * 格式化檔案大小
 * @param {number} bytes - 檔案大小（bytes）
 * @return {string} 格式化後的大小
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}


// ============================================
// 測試所有範例
// ============================================

/**
 * 執行所有範例（除了需要檔案 ID 的範例）
 */
function runAllExamples() {
  Logger.log('========================================');
  Logger.log('開始執行所有範例');
  Logger.log('========================================\n');
  
  // 範例 5：常用 MIME 類型
  Logger.log('\n--- 範例 5：常用 MIME 類型 ---');
  example05_listMimeTypes();
  
  // 範例 6：建立文字檔案
  Logger.log('\n--- 範例 6：建立文字檔案 ---');
  example06_createTextFile();
  
  Logger.log('\n========================================');
  Logger.log('所有範例執行完成');
  Logger.log('========================================');
}
