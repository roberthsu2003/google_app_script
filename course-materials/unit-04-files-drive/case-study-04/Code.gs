/**
 * 雲端硬碟整理助手
 * 
 * 功能：
 * 1. 掃描指定資料夾中的所有檔案
 * 2. 根據檔案類型自動分類
 * 3. 移動檔案到對應的分類資料夾
 * 4. 刪除超過指定天數的舊檔案
 * 5. 產生整理報告
 * 
 * 作者：GAS JavaScript 課程
 * 版本：1.0
 */

// ==================== 設定區 ====================

// 要整理的資料夾 ID（請替換為您的資料夾 ID）
var SOURCE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';

// 檔案保留天數（超過此天數的檔案將被移至待刪除資料夾）
var DAYS_TO_KEEP = 90;

// 是否直接刪除舊檔案（false 表示移至「待刪除」資料夾）
var DELETE_OLD_FILES_DIRECTLY = false;

// 檔案分類對應表
var FILE_CATEGORIES = {
  '文件': ['doc', 'docx', 'pdf', 'txt', 'odt', 'rtf'],
  '試算表': ['xls', 'xlsx', 'csv', 'ods'],
  '簡報': ['ppt', 'pptx', 'odp'],
  '圖片': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
  '壓縮檔': ['zip', 'rar', '7z', 'tar', 'gz'],
  '其他': []
};

// ==================== 主程式 ====================

/**
 * 主函式：執行雲端硬碟整理
 */
function organizeMyDrive() {
  Logger.log('=== 開始執行雲端硬碟整理 ===');
  
  try {
    // 1. 取得來源資料夾
    var sourceFolder = DriveApp.getFolderById(SOURCE_FOLDER_ID);
    Logger.log('來源資料夾：' + sourceFolder.getName());
    
    // 2. 初始化報告物件
    var report = initializeReport(sourceFolder.getName());
    
    // 3. 建立分類資料夾
    var categoryFolders = createCategoryFolders(sourceFolder);
    Logger.log('已建立分類資料夾');
    
    // 4. 掃描並整理檔案
    organizeFiles(sourceFolder, categoryFolders, report);
    
    // 5. 清理舊檔案
    cleanOldFiles(sourceFolder, categoryFolders, report);
    
    // 6. 產生並顯示報告
    report.endTime = new Date();
    displayReport(report);
    
    Logger.log('=== 整理完成 ===');
    
  } catch (error) {
    Logger.log('執行錯誤：' + error.message);
    Logger.log('錯誤堆疊：' + error.stack);
  }
}

// ==================== 初始化與設定 ====================

/**
 * 初始化報告物件
 * @param {string} folderName - 資料夾名稱
 * @return {Object} 報告物件
 */
function initializeReport(folderName) {
  var report = {
    startTime: new Date(),
    endTime: null,
    sourceFolder: folderName,
    totalFiles: 0,
    organizedFiles: 0,
    deletedFiles: 0,
    errorFiles: 0,
    categoryCounts: {},
    deletedFilesList: [],
    errorsList: []
  };
  
  // 初始化各分類計數
  for (var category in FILE_CATEGORIES) {
    report.categoryCounts[category] = 0;
  }
  
  return report;
}

/**
 * 建立分類資料夾
 * @param {Folder} parentFolder - 父資料夾
 * @return {Object} 分類資料夾物件
 */
function createCategoryFolders(parentFolder) {
  var categoryFolders = {};
  
  for (var category in FILE_CATEGORIES) {
    try {
      // 檢查資料夾是否已存在
      var folders = parentFolder.getFoldersByName(category);
      
      if (folders.hasNext()) {
        // 資料夾已存在，使用現有資料夾
        categoryFolders[category] = folders.next();
        Logger.log('使用現有資料夾：' + category);
      } else {
        // 建立新資料夾
        categoryFolders[category] = parentFolder.createFolder(category);
        Logger.log('建立新資料夾：' + category);
      }
    } catch (error) {
      Logger.log('建立資料夾失敗：' + category + ' - ' + error.message);
    }
  }
  
  // 建立「待刪除」資料夾
  var deleteFolderName = '待刪除';
  var deleteFolders = parentFolder.getFoldersByName(deleteFolderName);
  
  if (deleteFolders.hasNext()) {
    categoryFolders['待刪除'] = deleteFolders.next();
  } else {
    categoryFolders['待刪除'] = parentFolder.createFolder(deleteFolderName);
  }
  
  return categoryFolders;
}

// ==================== 檔案掃描與整理 ====================

/**
 * 掃描並整理檔案
 * @param {Folder} sourceFolder - 來源資料夾
 * @param {Object} categoryFolders - 分類資料夾物件
 * @param {Object} report - 報告物件
 */
function organizeFiles(sourceFolder, categoryFolders, report) {
  Logger.log('開始掃描檔案...');
  
  var files = sourceFolder.getFiles();
  
  while (files.hasNext()) {
    var file = files.next();
    report.totalFiles++;
    
    try {
      // 取得檔案分類
      var category = categorizeFile(file);
      
      // 檢查檔案是否在分類資料夾中（避免重複移動）
      var fileParents = file.getParents();
      var isInCategoryFolder = false;
      
      while (fileParents.hasNext()) {
        var parent = fileParents.next();
        if (parent.getId() === categoryFolders[category].getId()) {
          isInCategoryFolder = true;
          break;
        }
      }
      
      // 如果檔案不在分類資料夾中，則移動
      if (!isInCategoryFolder) {
        moveFileToCategory(file, categoryFolders[category], sourceFolder);
        report.organizedFiles++;
        report.categoryCounts[category]++;
        Logger.log('已整理：' + file.getName() + ' -> ' + category);
      }
      
    } catch (error) {
      report.errorFiles++;
      report.errorsList.push({
        fileName: file.getName(),
        error: error.message
      });
      Logger.log('處理檔案失敗：' + file.getName() + ' - ' + error.message);
    }
  }
  
  Logger.log('檔案掃描完成，共處理 ' + report.totalFiles + ' 個檔案');
}

/**
 * 判斷檔案分類
 * @param {File} file - 檔案物件
 * @return {string} 分類名稱
 */
function categorizeFile(file) {
  var fileName = file.getName();
  var extension = getFileExtension(fileName);
  
  // 遍歷分類對應表
  for (var category in FILE_CATEGORIES) {
    var extensions = FILE_CATEGORIES[category];
    
    // 檢查副檔名是否在此分類中
    for (var i = 0; i < extensions.length; i++) {
      if (extension === extensions[i]) {
        return category;
      }
    }
  }
  
  // 找不到對應分類，歸類為「其他」
  return '其他';
}

/**
 * 取得檔案副檔名
 * @param {string} fileName - 檔案名稱
 * @return {string} 副檔名（小寫，不含點）
 */
function getFileExtension(fileName) {
  var lastDotIndex = fileName.lastIndexOf('.');
  
  if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
    return ''; // 沒有副檔名
  }
  
  return fileName.substring(lastDotIndex + 1).toLowerCase();
}

/**
 * 移動檔案到分類資料夾
 * @param {File} file - 檔案物件
 * @param {Folder} targetFolder - 目標資料夾
 * @param {Folder} sourceFolder - 來源資料夾
 */
function moveFileToCategory(file, targetFolder, sourceFolder) {
  try {
    // 將檔案加入目標資料夾
    file.moveTo(targetFolder);
    
  } catch (error) {
    Logger.log('移動檔案失敗：' + file.getName() + ' - ' + error.message);
    throw error;
  }
}

// ==================== 舊檔案清理 ====================

/**
 * 清理舊檔案
 * @param {Folder} sourceFolder - 來源資料夾
 * @param {Object} categoryFolders - 分類資料夾物件
 * @param {Object} report - 報告物件
 */
function cleanOldFiles(sourceFolder, categoryFolders, report) {
  Logger.log('開始清理舊檔案...');
  
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP);
  
  Logger.log('刪除日期界線：' + cutoffDate.toLocaleDateString());
  
  // 掃描所有分類資料夾
  for (var category in categoryFolders) {
    // 跳過「待刪除」資料夾
    if (category === '待刪除') {
      continue;
    }
    
    var folder = categoryFolders[category];
    var files = folder.getFiles();
    
    while (files.hasNext()) {
      var file = files.next();
      
      try {
        var lastUpdated = file.getLastUpdated();
        
        // 檢查檔案是否過期
        if (lastUpdated < cutoffDate) {
          var fileName = file.getName();
          var fileDate = lastUpdated.toLocaleDateString();
          
          if (DELETE_OLD_FILES_DIRECTLY) {
            // 直接刪除檔案
            file.setTrashed(true);
            Logger.log('已刪除：' + fileName + ' (最後更新：' + fileDate + ')');
          } else {
            // 移至「待刪除」資料夾
            file.moveTo(categoryFolders['待刪除']);
            Logger.log('已移至待刪除：' + fileName + ' (最後更新：' + fileDate + ')');
          }
          
          report.deletedFiles++;
          report.deletedFilesList.push({
            fileName: fileName,
            lastUpdated: fileDate,
            category: category
          });
        }
        
      } catch (error) {
        Logger.log('清理檔案失敗：' + file.getName() + ' - ' + error.message);
      }
    }
  }
  
  Logger.log('舊檔案清理完成，共處理 ' + report.deletedFiles + ' 個檔案');
}

// ==================== 報告產生 ====================

/**
 * 顯示整理報告
 * @param {Object} report - 報告物件
 */
function displayReport(report) {
  Logger.log('\n========================================');
  Logger.log('       雲端硬碟整理報告');
  Logger.log('========================================\n');
  
  Logger.log('來源資料夾：' + report.sourceFolder);
  Logger.log('開始時間：' + report.startTime.toLocaleString());
  Logger.log('結束時間：' + report.endTime.toLocaleString());
  
  var duration = (report.endTime - report.startTime) / 1000;
  Logger.log('執行時間：' + duration.toFixed(2) + ' 秒\n');
  
  Logger.log('--- 整理統計 ---');
  Logger.log('總檔案數：' + report.totalFiles);
  Logger.log('已整理檔案：' + report.organizedFiles);
  Logger.log('已刪除/移動檔案：' + report.deletedFiles);
  Logger.log('錯誤檔案：' + report.errorFiles + '\n');
  
  Logger.log('--- 分類統計 ---');
  for (var category in report.categoryCounts) {
    var count = report.categoryCounts[category];
    if (count > 0) {
      Logger.log(category + '：' + count + ' 個檔案');
    }
  }
  
  // 顯示已刪除檔案清單
  if (report.deletedFilesList.length > 0) {
    Logger.log('\n--- 已刪除/移動的檔案 ---');
    for (var i = 0; i < report.deletedFilesList.length; i++) {
      var item = report.deletedFilesList[i];
      Logger.log((i + 1) + '. ' + item.fileName + ' (最後更新：' + item.lastUpdated + ')');
    }
  }
  
  // 顯示錯誤清單
  if (report.errorsList.length > 0) {
    Logger.log('\n--- 錯誤清單 ---');
    for (var i = 0; i < report.errorsList.length; i++) {
      var error = report.errorsList[i];
      Logger.log((i + 1) + '. ' + error.fileName + ' - ' + error.error);
    }
  }
  
  Logger.log('\n========================================');
  Logger.log('整理完成！');
  Logger.log('========================================\n');
}

/**
 * 將報告寄送到指定信箱（選擇性功能）
 * @param {Object} report - 報告物件
 * @param {string} email - 收件者信箱
 */
function sendReportByEmail(report, email) {
  var subject = '雲端硬碟整理報告 - ' + report.sourceFolder;
  var body = generateReportText(report);
  
  try {
    MailApp.sendEmail(email, subject, body);
    Logger.log('報告已寄送至：' + email);
  } catch (error) {
    Logger.log('寄送報告失敗：' + error.message);
  }
}

/**
 * 產生報告文字內容
 * @param {Object} report - 報告物件
 * @return {string} 報告文字
 */
function generateReportText(report) {
  var text = '';
  
  text += '========================================\n';
  text += '       雲端硬碟整理報告\n';
  text += '========================================\n\n';
  
  text += '來源資料夾：' + report.sourceFolder + '\n';
  text += '開始時間：' + report.startTime.toLocaleString() + '\n';
  text += '結束時間：' + report.endTime.toLocaleString() + '\n';
  
  var duration = (report.endTime - report.startTime) / 1000;
  text += '執行時間：' + duration.toFixed(2) + ' 秒\n\n';
  
  text += '--- 整理統計 ---\n';
  text += '總檔案數：' + report.totalFiles + '\n';
  text += '已整理檔案：' + report.organizedFiles + '\n';
  text += '已刪除/移動檔案：' + report.deletedFiles + '\n';
  text += '錯誤檔案：' + report.errorFiles + '\n\n';
  
  text += '--- 分類統計 ---\n';
  for (var category in report.categoryCounts) {
    var count = report.categoryCounts[category];
    if (count > 0) {
      text += category + '：' + count + ' 個檔案\n';
    }
  }
  
  if (report.deletedFilesList.length > 0) {
    text += '\n--- 已刪除/移動的檔案 ---\n';
    for (var i = 0; i < report.deletedFilesList.length; i++) {
      var item = report.deletedFilesList[i];
      text += (i + 1) + '. ' + item.fileName + ' (最後更新：' + item.lastUpdated + ')\n';
    }
  }
  
  if (report.errorsList.length > 0) {
    text += '\n--- 錯誤清單 ---\n';
    for (var i = 0; i < report.errorsList.length; i++) {
      var error = report.errorsList[i];
      text += (i + 1) + '. ' + error.fileName + ' - ' + error.error + '\n';
    }
  }
  
  text += '\n========================================\n';
  text += '整理完成！\n';
  text += '========================================\n';
  
  return text;
}

// ==================== 輔助函式 ====================

/**
 * 測試函式：顯示資料夾 ID
 * 用於取得要整理的資料夾 ID
 */
function showFolderId() {
  var folder = DriveApp.getRootFolder(); // 或使用其他方式取得資料夾
  Logger.log('資料夾 ID：' + folder.getId());
  Logger.log('資料夾名稱：' + folder.getName());
}

/**
 * 測試函式：列出資料夾中的所有檔案
 */
function listFilesInFolder() {
  try {
    var folder = DriveApp.getFolderById(SOURCE_FOLDER_ID);
    var files = folder.getFiles();
    
    Logger.log('資料夾：' + folder.getName());
    Logger.log('檔案清單：');
    
    var count = 0;
    while (files.hasNext()) {
      var file = files.next();
      count++;
      Logger.log(count + '. ' + file.getName() + ' (類型：' + categorizeFile(file) + ')');
    }
    
    Logger.log('總共 ' + count + ' 個檔案');
    
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}
