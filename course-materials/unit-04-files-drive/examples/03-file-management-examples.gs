/**
 * DriveApp 檔案管理範例
 * 
 * 本檔案包含 DriveApp 服務的檔案管理範例：
 * - 複製檔案
 * - 移動檔案
 * - 重新命名檔案
 * - 刪除檔案
 * - 批次操作
 */

// ============================================
// 範例 1：複製檔案
// ============================================

/**
 * 簡單複製檔案
 */
function example01_copyFile() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var originalFile = DriveApp.getFileById(fileId);
    
    // 複製檔案（自動命名為「原檔名 的副本」）
    var copiedFile = originalFile.makeCopy();
    
    Logger.log('✅ 檔案已複製');
    Logger.log('原始檔案：' + originalFile.getName());
    Logger.log('複製檔案：' + copiedFile.getName());
    Logger.log('複製檔案 URL：' + copiedFile.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 複製檔案並指定新名稱
 */
function example02_copyFileWithName() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var originalFile = DriveApp.getFileById(fileId);
    
    // 指定新檔名
    var newName = originalFile.getName() + ' - 備份_' + getDateString();
    var copiedFile = originalFile.makeCopy(newName);
    
    Logger.log('✅ 檔案已複製');
    Logger.log('原始檔案：' + originalFile.getName());
    Logger.log('新檔案：' + copiedFile.getName());
    Logger.log('新檔案 URL：' + copiedFile.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 複製檔案到指定資料夾
 */
function example03_copyFileToFolder() {
  // ⚠️ 請替換成實際的 ID
  var fileId = '請替換成實際的檔案ID';
  var targetFolderId = '請替換成實際的資料夾ID';
  
  try {
    var originalFile = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    
    // 複製到指定資料夾
    var newName = originalFile.getName() + ' - 副本';
    var copiedFile = originalFile.makeCopy(newName, targetFolder);
    
    Logger.log('✅ 檔案已複製到指定資料夾');
    Logger.log('原始檔案：' + originalFile.getName());
    Logger.log('目標資料夾：' + targetFolder.getName());
    Logger.log('新檔案 URL：' + copiedFile.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 2：移動檔案
// ============================================

/**
 * 移動檔案到另一個資料夾
 */
function example04_moveFile() {
  // ⚠️ 請替換成實際的 ID
  var fileId = '請替換成實際的檔案ID';
  var targetFolderId = '請替換成實際的資料夾ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    
    // 取得檔案目前所在的資料夾
    var parents = file.getParents();
    var oldFolderNames = [];
    
    while (parents.hasNext()) {
      var parent = parents.next();
      oldFolderNames.push(parent.getName());
    }
    
    // 移動檔案（移除舊位置，加入新位置）
    parents = file.getParents();
    while (parents.hasNext()) {
      var parent = parents.next();
      parent.removeFile(file);
    }
    targetFolder.addFile(file);
    
    Logger.log('✅ 檔案已移動');
    Logger.log('檔案：' + file.getName());
    Logger.log('原位置：' + oldFolderNames.join(', '));
    Logger.log('新位置：' + targetFolder.getName());
    Logger.log('檔案 URL：' + file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 移動多個檔案到同一個資料夾
 */
function example05_moveMultipleFiles() {
  // ⚠️ 請替換成實際的 ID
  var fileIds = [
    '請替換成實際的檔案ID1',
    '請替換成實際的檔案ID2',
    '請替換成實際的檔案ID3'
  ];
  var targetFolderId = '請替換成實際的資料夾ID';
  
  try {
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    
    Logger.log('=== 批次移動檔案 ===');
    Logger.log('目標資料夾：' + targetFolder.getName() + '\n');
    
    for (var i = 0; i < fileIds.length; i++) {
      try {
        var file = DriveApp.getFileById(fileIds[i]);
        
        // 移除舊位置
        var parents = file.getParents();
        while (parents.hasNext()) {
          parents.next().removeFile(file);
        }
        
        // 加入新位置
        targetFolder.addFile(file);
        
        Logger.log((i + 1) + '. ✅ ' + file.getName());
        
      } catch (error) {
        Logger.log((i + 1) + '. ❌ 移動失敗：' + error.message);
      }
    }
    
    Logger.log('');
    Logger.log('批次移動完成');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 3：重新命名檔案
// ============================================

/**
 * 重新命名單一檔案
 */
function example06_renameFile() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    var oldName = file.getName();
    var newName = '新檔案名稱_' + getDateString() + '.txt';
    
    // 重新命名
    file.setName(newName);
    
    Logger.log('✅ 檔案已重新命名');
    Logger.log('舊名稱：' + oldName);
    Logger.log('新名稱：' + file.getName());
    Logger.log('檔案 URL：' + file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 批次重新命名資料夾中的檔案
 */
function example07_batchRenameFiles() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 批次重新命名檔案 ===');
    Logger.log('資料夾：' + folder.getName() + '\n');
    
    // 取得所有檔案
    var files = folder.getFiles();
    var count = 1;
    
    while (files.hasNext()) {
      var file = files.next();
      var oldName = file.getName();
      
      // 取得副檔名
      var extension = '';
      var lastDot = oldName.lastIndexOf('.');
      if (lastDot > -1) {
        extension = oldName.substring(lastDot);
      }
      
      // 新檔名格式：檔案_001, 檔案_002, ...
      var newName = '檔案_' + padZero(count, 3) + extension;
      file.setName(newName);
      
      Logger.log(count + '. ' + oldName + ' → ' + newName);
      count++;
    }
    
    Logger.log('');
    Logger.log('✅ 總共重新命名 ' + (count - 1) + ' 個檔案');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 在檔名前加上日期
 */
function example08_addDateToFileName() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    var oldName = file.getName();
    var dateString = getDateString();
    var newName = dateString + '_' + oldName;
    
    file.setName(newName);
    
    Logger.log('✅ 檔案已重新命名');
    Logger.log('舊名稱：' + oldName);
    Logger.log('新名稱：' + newName);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 4：刪除檔案
// ============================================

/**
 * 將檔案移到垃圾桶
 */
function example09_trashFile() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    var fileName = file.getName();
    
    // 移到垃圾桶（可以還原）
    file.setTrashed(true);
    
    Logger.log('✅ 檔案已移到垃圾桶：' + fileName);
    Logger.log('💡 提示：可以從雲端硬碟的垃圾桶還原此檔案');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 從垃圾桶還原檔案
 */
function example10_restoreFile() {
  // ⚠️ 請替換成你的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 從垃圾桶還原
    file.setTrashed(false);
    
    Logger.log('✅ 檔案已從垃圾桶還原：' + file.getName());
    Logger.log('檔案 URL：' + file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 列出垃圾桶中的檔案
 */
function example11_listTrashedFiles() {
  var files = DriveApp.getTrashedFiles();
  
  Logger.log('=== 垃圾桶中的檔案 ===\n');
  var count = 0;
  
  while (files.hasNext() && count < 20) {  // 限制只顯示前 20 個
    count++;
    var file = files.next();
    
    Logger.log(count + '. ' + file.getName());
    Logger.log('   ID：' + file.getId());
    Logger.log('   大小：' + formatFileSize(file.getSize()));
    Logger.log('');
  }
  
  if (count === 0) {
    Logger.log('垃圾桶是空的');
  } else {
    Logger.log('✅ 顯示前 ' + count + ' 個檔案');
    Logger.log('💡 提示：使用 example10_restoreFile() 可以還原檔案');
  }
}


/**
 * 批次清空垃圾桶（謹慎使用！）
 */
function example12_emptyTrash() {
  // ⚠️ 警告：此操作會永久刪除垃圾桶中的所有檔案，無法還原！
  
  var files = DriveApp.getTrashedFiles();
  var count = 0;
  
  Logger.log('=== 清空垃圾桶 ===\n');
  Logger.log('⚠️ 警告：此操作無法還原！\n');
  
  // 取消下方註解以執行清空垃圾桶
  /*
  while (files.hasNext()) {
    count++;
    var file = files.next();
    Logger.log(count + '. 刪除：' + file.getName());
    file.setTrashed(false);  // 先從垃圾桶還原
    DriveApp.removeFile(file);  // 永久刪除
  }
  
  Logger.log('');
  Logger.log('✅ 已永久刪除 ' + count + ' 個檔案');
  */
  
  Logger.log('💡 提示：取消程式碼註解以執行清空垃圾桶');
}


// ============================================
// 範例 5：批次操作範例
// ============================================

/**
 * 整理特定類型的檔案到資料夾
 */
function example13_organizeFilesByType() {
  // 建立分類資料夾
  var mainFolderName = '檔案分類_' + getDateString();
  var mainFolder = DriveApp.createFolder(mainFolderName);
  
  Logger.log('=== 依類型整理檔案 ===');
  Logger.log('主資料夾：' + mainFolder.getName() + '\n');
  
  // 定義要整理的檔案類型
  var fileTypes = [
    { name: 'PDF 檔案', mimeType: MimeType.PDF },
    { name: 'Google 試算表', mimeType: MimeType.GOOGLE_SHEETS },
    { name: 'Google 文件', mimeType: MimeType.GOOGLE_DOCS }
  ];
  
  // 為每種類型建立資料夾並移動檔案
  for (var i = 0; i < fileTypes.length; i++) {
    var typeFolder = mainFolder.createFolder(fileTypes[i].name);
    var files = DriveApp.getFilesByType(fileTypes[i].mimeType);
    var count = 0;
    
    // 只移動前 5 個檔案作為示範
    while (files.hasNext() && count < 5) {
      var file = files.next();
      
      // 檢查檔案是否已在分類資料夾中
      var parents = file.getParents();
      var shouldMove = true;
      
      while (parents.hasNext()) {
        if (parents.next().getId() === mainFolder.getId()) {
          shouldMove = false;
          break;
        }
      }
      
      if (shouldMove) {
        typeFolder.addFile(file);
        count++;
      }
    }
    
    Logger.log('✅ ' + fileTypes[i].name + '：移動 ' + count + ' 個檔案');
  }
  
  Logger.log('');
  Logger.log('整理完成');
  Logger.log('主資料夾 URL：' + mainFolder.getUrl());
}


/**
 * 備份重要檔案
 */
function example14_backupImportantFiles() {
  // 建立備份資料夾
  var backupFolderName = '備份_' + getDateString();
  var backupFolder = DriveApp.createFolder(backupFolderName);
  
  Logger.log('=== 備份重要檔案 ===');
  Logger.log('備份資料夾：' + backupFolder.getName() + '\n');
  
  // 搜尋檔名包含「重要」的檔案
  var files = DriveApp.searchFiles('title contains "重要"');
  var count = 0;
  
  while (files.hasNext() && count < 10) {  // 限制只備份前 10 個
    count++;
    var file = files.next();
    
    // 複製到備份資料夾
    var backupName = file.getName() + ' - 備份';
    var backupFile = file.makeCopy(backupName, backupFolder);
    
    Logger.log(count + '. ✅ ' + file.getName());
  }
  
  Logger.log('');
  if (count === 0) {
    Logger.log('沒有找到包含「重要」的檔案');
  } else {
    Logger.log('✅ 已備份 ' + count + ' 個檔案');
    Logger.log('備份資料夾 URL：' + backupFolder.getUrl());
  }
}


/**
 * 清理舊檔案（移到垃圾桶）
 */
function example15_cleanupOldFiles() {
  // ⚠️ 請替換成你的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    // 設定時間閾值（30 天前）
    var thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    Logger.log('=== 清理舊檔案 ===');
    Logger.log('資料夾：' + folder.getName());
    Logger.log('清理條件：超過 30 天未修改\n');
    
    var files = folder.getFiles();
    var count = 0;
    
    while (files.hasNext()) {
      var file = files.next();
      
      if (file.getLastUpdated() < thirtyDaysAgo) {
        count++;
        Logger.log(count + '. ' + file.getName());
        Logger.log('   最後修改：' + formatDate(file.getLastUpdated()));
        
        // 取消下方註解以實際移到垃圾桶
        // file.setTrashed(true);
      }
    }
    
    Logger.log('');
    if (count === 0) {
      Logger.log('沒有找到超過 30 天未修改的檔案');
    } else {
      Logger.log('找到 ' + count + ' 個舊檔案');
      Logger.log('💡 提示：取消程式碼註解以實際移到垃圾桶');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 輔助函式
// ============================================

/**
 * 取得日期字串（格式：YYYYMMDD）
 * @return {string} 日期字串
 */
function getDateString() {
  var date = new Date();
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1, 2);
  var day = padZero(date.getDate(), 2);
  return year + month + day;
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


// ============================================
// 測試所有範例
// ============================================

/**
 * 執行所有範例（除了需要 ID 的範例）
 */
function runAllExamples() {
  Logger.log('========================================');
  Logger.log('開始執行所有範例');
  Logger.log('========================================\n');
  
  // 範例 11：列出垃圾桶中的檔案
  Logger.log('\n--- 範例 11：列出垃圾桶中的檔案 ---');
  example11_listTrashedFiles();
  
  // 範例 13：整理檔案
  Logger.log('\n--- 範例 13：整理檔案 ---');
  example13_organizeFilesByType();
  
  // 範例 14：備份重要檔案
  Logger.log('\n--- 範例 14：備份重要檔案 ---');
  example14_backupImportantFiles();
  
  Logger.log('\n========================================');
  Logger.log('所有範例執行完成');
  Logger.log('========================================');
}
