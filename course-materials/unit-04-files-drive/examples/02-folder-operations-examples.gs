/**
 * DriveApp 資料夾操作範例
 * 
 * 本檔案包含 DriveApp 服務的資料夾操作範例：
 * - 取得資料夾（使用 ID、名稱）
 * - 建立資料夾
 * - 遍歷資料夾內容
 * - 建立巢狀資料夾結構
 */

// ============================================
// 範例 1：使用資料夾 ID 取得資料夾
// ============================================

/**
 * 使用資料夾 ID 取得資料夾
 * 
 * 資料夾 URL 格式：https://drive.google.com/drive/folders/FOLDER_ID
 * 從 URL 中複製 FOLDER_ID 部分
 */
function example01_getFolderById() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 資料夾資訊 ===');
    Logger.log('資料夾名稱：' + folder.getName());
    Logger.log('資料夾 ID：' + folder.getId());
    Logger.log('資料夾 URL：' + folder.getUrl());
    Logger.log('建立時間：' + folder.getDateCreated());
    Logger.log('最後修改：' + folder.getLastUpdated());
    Logger.log('');
    
    // 統計資料夾內容
    var fileCount = 0;
    var files = folder.getFiles();
    while (files.hasNext()) {
      fileCount++;
      files.next();
    }
    
    var folderCount = 0;
    var folders = folder.getFolders();
    while (folders.hasNext()) {
      folderCount++;
      folders.next();
    }
    
    Logger.log('檔案數量：' + fileCount);
    Logger.log('子資料夾數量：' + folderCount);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
    Logger.log('請確認資料夾 ID 是否正確，以及你是否有權限存取該資料夾');
  }
}


// ============================================
// 範例 2：使用資料夾名稱搜尋資料夾
// ============================================

/**
 * 使用資料夾名稱搜尋資料夾
 */
function example02_getFoldersByName() {
  var folderName = '課程資料';
  var folders = DriveApp.getFoldersByName(folderName);
  
  if (!folders.hasNext()) {
    Logger.log('❌ 找不到資料夾：' + folderName);
    return;
  }
  
  // 列出所有同名資料夾
  Logger.log('=== 搜尋結果：' + folderName + ' ===\n');
  var count = 0;
  
  while (folders.hasNext()) {
    count++;
    var folder = folders.next();
    
    Logger.log('資料夾 ' + count + '：');
    Logger.log('  名稱：' + folder.getName());
    Logger.log('  ID：' + folder.getId());
    Logger.log('  URL：' + folder.getUrl());
    Logger.log('');
  }
  
  Logger.log('✅ 總共找到 ' + count + ' 個資料夾');
}


// ============================================
// 範例 3：取得根資料夾
// ============================================

/**
 * 取得根資料夾（我的雲端硬碟）
 */
function example03_getRootFolder() {
  var rootFolder = DriveApp.getRootFolder();
  
  Logger.log('=== 根資料夾（我的雲端硬碟）===');
  Logger.log('資料夾名稱：' + rootFolder.getName());
  Logger.log('資料夾 URL：' + rootFolder.getUrl());
  Logger.log('');
  
  // 列出根資料夾中的所有資料夾
  var folders = rootFolder.getFolders();
  Logger.log('【根資料夾中的資料夾】');
  var count = 0;
  
  while (folders.hasNext() && count < 20) {  // 限制只顯示前 20 個
    count++;
    var folder = folders.next();
    Logger.log(count + '. ' + folder.getName());
  }
  
  if (count === 20) {
    Logger.log('... (還有更多資料夾)');
  }
  
  Logger.log('');
  Logger.log('✅ 顯示前 ' + count + ' 個資料夾');
}


// ============================================
// 範例 4：建立資料夾
// ============================================

/**
 * 在根目錄建立資料夾
 */
function example04_createFolder() {
  var folderName = '測試資料夾_' + new Date().getTime();
  
  // 在根目錄建立資料夾
  var folder = DriveApp.createFolder(folderName);
  
  Logger.log('✅ 資料夾已建立');
  Logger.log('資料夾名稱：' + folder.getName());
  Logger.log('資料夾 ID：' + folder.getId());
  Logger.log('資料夾 URL：' + folder.getUrl());
  Logger.log('');
  Logger.log('👉 請點擊上方 URL 查看資料夾');
}


/**
 * 在指定資料夾中建立子資料夾
 */
function example05_createSubFolder() {
  // 先建立主資料夾
  var mainFolderName = '專案資料夾_' + new Date().getTime();
  var mainFolder = DriveApp.createFolder(mainFolderName);
  
  Logger.log('✅ 主資料夾已建立：' + mainFolder.getName());
  Logger.log('');
  
  // 在主資料夾中建立子資料夾
  var subFolderNames = ['文件', '圖片', '程式碼'];
  
  for (var i = 0; i < subFolderNames.length; i++) {
    var subFolder = mainFolder.createFolder(subFolderNames[i]);
    Logger.log('  ✅ 子資料夾已建立：' + subFolder.getName());
  }
  
  Logger.log('');
  Logger.log('主資料夾 URL：' + mainFolder.getUrl());
}


// ============================================
// 範例 5：建立完整的資料夾結構
// ============================================

/**
 * 建立完整的專案資料夾結構
 */
function example06_createProjectStructure() {
  // 建立主資料夾
  var projectName = '課程專案_' + new Date().getTime();
  var projectFolder = DriveApp.createFolder(projectName);
  
  Logger.log('=== 建立專案資料夾結構 ===\n');
  Logger.log('📁 ' + projectName);
  
  // 定義資料夾結構
  var structure = {
    '文件': ['需求文件', '設計文件', '使用手冊'],
    '程式碼': ['前端', '後端', '測試'],
    '資源': ['圖片', '影片', '音訊'],
    '報告': []
  };
  
  // 建立資料夾結構
  for (var mainFolderName in structure) {
    var mainFolder = projectFolder.createFolder(mainFolderName);
    Logger.log('  📁 ' + mainFolderName);
    
    var subFolders = structure[mainFolderName];
    for (var i = 0; i < subFolders.length; i++) {
      var subFolder = mainFolder.createFolder(subFolders[i]);
      Logger.log('    📁 ' + subFolders[i]);
    }
  }
  
  Logger.log('');
  Logger.log('✅ 資料夾結構建立完成');
  Logger.log('專案資料夾 URL：' + projectFolder.getUrl());
}


// ============================================
// 範例 6：列出資料夾中的所有檔案
// ============================================

/**
 * 列出資料夾中的所有檔案
 */
function example07_listFilesInFolder() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 資料夾：' + folder.getName() + ' ===\n');
    
    // 取得所有檔案
    var files = folder.getFiles();
    var count = 0;
    
    while (files.hasNext()) {
      count++;
      var file = files.next();
      
      Logger.log(count + '. ' + file.getName());
      Logger.log('   類型：' + file.getMimeType());
      Logger.log('   大小：' + formatFileSize(file.getSize()));
      Logger.log('   修改：' + formatDate(file.getLastUpdated()));
      Logger.log('');
    }
    
    if (count === 0) {
      Logger.log('此資料夾中沒有檔案');
    } else {
      Logger.log('✅ 總共 ' + count + ' 個檔案');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 7：列出資料夾中的所有子資料夾
// ============================================

/**
 * 列出資料夾中的所有子資料夾
 */
function example08_listSubFolders() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 資料夾：' + folder.getName() + ' ===\n');
    
    // 取得所有子資料夾
    var folders = folder.getFolders();
    var count = 0;
    
    while (folders.hasNext()) {
      count++;
      var subFolder = folders.next();
      
      Logger.log(count + '. 📁 ' + subFolder.getName());
      Logger.log('   URL：' + subFolder.getUrl());
      Logger.log('');
    }
    
    if (count === 0) {
      Logger.log('此資料夾中沒有子資料夾');
    } else {
      Logger.log('✅ 總共 ' + count + ' 個子資料夾');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 8：遞迴列出資料夾結構
// ============================================

/**
 * 遞迴列出完整的資料夾結構
 */
function example09_listFolderStructure() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 資料夾結構 ===\n');
    listFolderRecursive(folder, 0);
    Logger.log('');
    Logger.log('✅ 資料夾結構列出完成');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 遞迴函式：列出資料夾內容
 * @param {Folder} folder - 資料夾物件
 * @param {number} level - 層級（用於縮排）
 */
function listFolderRecursive(folder, level) {
  var indent = '';
  for (var i = 0; i < level; i++) {
    indent += '  ';
  }
  
  Logger.log(indent + '📁 ' + folder.getName());
  
  // 列出檔案
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(indent + '  📄 ' + file.getName() + ' (' + formatFileSize(file.getSize()) + ')');
  }
  
  // 遞迴列出子資料夾
  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    listFolderRecursive(subFolder, level + 1);
  }
}


// ============================================
// 範例 9：在資料夾中建立檔案
// ============================================

/**
 * 在指定資料夾中建立檔案
 */
function example10_createFileInFolder() {
  // 先建立一個測試資料夾
  var folderName = '測試資料夾_' + new Date().getTime();
  var folder = DriveApp.createFolder(folderName);
  
  Logger.log('✅ 資料夾已建立：' + folder.getName());
  Logger.log('');
  
  // 在資料夾中建立多個檔案
  var fileNames = ['說明文件.txt', '資料清單.csv', '報告.txt'];
  
  for (var i = 0; i < fileNames.length; i++) {
    var content = '這是 ' + fileNames[i] + ' 的內容\n';
    content += '建立時間：' + new Date() + '\n';
    
    var file = folder.createFile(fileNames[i], content);
    Logger.log('  ✅ 檔案已建立：' + file.getName());
  }
  
  Logger.log('');
  Logger.log('資料夾 URL：' + folder.getUrl());
}


// ============================================
// 範例 10：搜尋資料夾中的特定檔案
// ============================================

/**
 * 搜尋資料夾中的特定類型檔案
 */
function example11_searchFilesInFolder() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 搜尋 PDF 檔案 ===');
    Logger.log('資料夾：' + folder.getName() + '\n');
    
    // 取得資料夾中的所有檔案
    var files = folder.getFilesByType(MimeType.PDF);
    var count = 0;
    
    while (files.hasNext()) {
      count++;
      var file = files.next();
      
      Logger.log(count + '. ' + file.getName());
      Logger.log('   大小：' + formatFileSize(file.getSize()));
      Logger.log('');
    }
    
    if (count === 0) {
      Logger.log('此資料夾中沒有 PDF 檔案');
    } else {
      Logger.log('✅ 找到 ' + count + ' 個 PDF 檔案');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 11：統計資料夾資訊
// ============================================

/**
 * 統計資料夾的詳細資訊
 */
function example12_getFolderStatistics() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 資料夾統計資訊 ===');
    Logger.log('資料夾名稱：' + folder.getName() + '\n');
    
    // 統計檔案
    var files = folder.getFiles();
    var fileCount = 0;
    var totalSize = 0;
    var fileTypes = {};
    
    while (files.hasNext()) {
      fileCount++;
      var file = files.next();
      totalSize += file.getSize();
      
      var mimeType = file.getMimeType();
      if (fileTypes[mimeType]) {
        fileTypes[mimeType]++;
      } else {
        fileTypes[mimeType] = 1;
      }
    }
    
    // 統計子資料夾
    var folders = folder.getFolders();
    var folderCount = 0;
    while (folders.hasNext()) {
      folderCount++;
      folders.next();
    }
    
    // 顯示統計結果
    Logger.log('【統計結果】');
    Logger.log('檔案數量：' + fileCount);
    Logger.log('子資料夾數量：' + folderCount);
    Logger.log('總大小：' + formatFileSize(totalSize));
    Logger.log('');
    
    Logger.log('【檔案類型分布】');
    for (var type in fileTypes) {
      Logger.log(type + '：' + fileTypes[type] + ' 個');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
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

/**
 * 格式化日期
 * @param {Date} date - 日期物件
 * @return {string} 格式化後的日期
 */
function formatDate(date) {
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1, 2);
  var day = padZero(date.getDate(), 2);
  var hours = padZero(date.getHours(), 2);
  var minutes = padZero(date.getMinutes(), 2);
  
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

/**
 * 補零函式
 * @param {number} num - 數字
 * @param {number} length - 長度
 * @return {string} 補零後的字串
 */
function padZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}


// ============================================
// 測試所有範例
// ============================================

/**
 * 執行所有範例（除了需要資料夾 ID 的範例）
 */
function runAllExamples() {
  Logger.log('========================================');
  Logger.log('開始執行所有範例');
  Logger.log('========================================\n');
  
  // 範例 3：取得根資料夾
  Logger.log('\n--- 範例 3：取得根資料夾 ---');
  example03_getRootFolder();
  
  // 範例 4：建立資料夾
  Logger.log('\n--- 範例 4：建立資料夾 ---');
  example04_createFolder();
  
  // 範例 5：建立子資料夾
  Logger.log('\n--- 範例 5：建立子資料夾 ---');
  example05_createSubFolder();
  
  // 範例 6：建立專案結構
  Logger.log('\n--- 範例 6：建立專案結構 ---');
  example06_createProjectStructure();
  
  // 範例 10：在資料夾中建立檔案
  Logger.log('\n--- 範例 10：在資料夾中建立檔案 ---');
  example10_createFileInFolder();
  
  Logger.log('\n========================================');
  Logger.log('所有範例執行完成');
  Logger.log('========================================');
}
