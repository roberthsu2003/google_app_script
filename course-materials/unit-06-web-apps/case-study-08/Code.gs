/**
 * 實作案例 8：專案檔案上傳管理工具
 * 
 * 功能：
 * 1. 提供 Web 介面上傳檔案到 Google Drive
 * 2. 自動記錄上傳資訊到試算表
 * 3. 顯示已上傳檔案清單
 * 4. 提供檔案下載連結
 */

// ==================== 設定區 ====================

// 試算表 ID（請替換為您的試算表 ID）
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// 上傳記錄工作表名稱
var RECORD_SHEET_NAME = '上傳記錄';

// 上傳資料夾 ID（請替換為您的資料夾 ID，或留空使用根目錄）
var UPLOAD_FOLDER_ID = '';

// 允許的檔案類型（留空表示允許所有類型）
var ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

// 檔案大小限制（MB）
var MAX_FILE_SIZE_MB = 10;

// ==================== 初始化函式 ====================

/**
 * 初始化系統
 * 建立必要的工作表和資料夾
 */
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // 建立上傳記錄工作表
  var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
  if (!recordSheet) {
    recordSheet = ss.insertSheet(RECORD_SHEET_NAME);
    recordSheet.getRange('A1:G1').setValues([[
      '上傳時間', '檔案名稱', '檔案類型', '檔案大小(KB)', 
      '上傳者', '檔案 ID', '分享連結'
    ]]);
    
    // 設定表頭格式
    var headerRange = recordSheet.getRange('A1:G1');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    
    // 凍結表頭
    recordSheet.setFrozenRows(1);
  }
  
  // 建立上傳資料夾（如果未指定）
  if (!UPLOAD_FOLDER_ID) {
    var folder = DriveApp.createFolder('專案檔案上傳');
    Logger.log('已建立上傳資料夾，ID：' + folder.getId());
    Logger.log('請將此 ID 設定到 UPLOAD_FOLDER_ID 變數中');
  }
  
  Logger.log('系統初始化完成');
}

// ==================== Web App 介面 ====================

/**
 * 處理 GET 請求，顯示上傳介面
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('檔案上傳管理工具')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 取得上傳設定資訊
 */
function getUploadConfig() {
  return {
    maxFileSizeMB: MAX_FILE_SIZE_MB,
    allowedTypes: ALLOWED_FILE_TYPES,
    allowAllTypes: ALLOWED_FILE_TYPES.length === 0
  };
}

// ==================== 檔案上傳處理 ====================

/**
 * 處理檔案上傳
 * @param {Object} fileData - Base64 編碼的檔案資料
 * @param {string} fileName - 檔案名稱
 * @param {string} mimeType - 檔案類型
 */
function uploadFile(fileData, fileName, mimeType) {
  try {
    // 驗證檔案類型
    if (ALLOWED_FILE_TYPES.length > 0 && ALLOWED_FILE_TYPES.indexOf(mimeType) === -1) {
      return {
        success: false,
        message: '不支援的檔案類型：' + mimeType
      };
    }
    
    // 解碼 Base64 資料
    var blob = Utilities.newBlob(
      Utilities.base64Decode(fileData),
      mimeType,
      fileName
    );
    
    // 檢查檔案大小
    var fileSizeKB = blob.getBytes().length / 1024;
    var fileSizeMB = fileSizeKB / 1024;
    
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return {
        success: false,
        message: '檔案大小超過限制（' + MAX_FILE_SIZE_MB + ' MB）'
      };
    }
    
    // 上傳到 Drive
    var folder = UPLOAD_FOLDER_ID ? 
      DriveApp.getFolderById(UPLOAD_FOLDER_ID) : 
      DriveApp.getRootFolder();
    
    var file = folder.createFile(blob);
    
    // 設定分享權限（任何人可檢視）
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 記錄到試算表
    var fileInfo = {
      timestamp: new Date(),
      fileName: fileName,
      mimeType: mimeType,
      fileSizeKB: Math.round(fileSizeKB * 100) / 100,
      uploader: Session.getActiveUser().getEmail(),
      fileId: file.getId(),
      shareUrl: file.getUrl()
    };
    
    recordUpload(fileInfo);
    
    return {
      success: true,
      message: '檔案上傳成功',
      fileInfo: fileInfo
    };
    
  } catch (error) {
    Logger.log('上傳失敗：' + error.message);
    return {
      success: false,
      message: '上傳失敗：' + error.message
    };
  }
}

/**
 * 記錄上傳資訊到試算表
 */
function recordUpload(fileInfo) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
  
  if (!recordSheet) {
    throw new Error('找不到上傳記錄工作表');
  }
  
  recordSheet.appendRow([
    fileInfo.timestamp,
    fileInfo.fileName,
    fileInfo.mimeType,
    fileInfo.fileSizeKB,
    fileInfo.uploader,
    fileInfo.fileId,
    fileInfo.shareUrl
  ]);
  
  // 格式化新增的列
  var lastRow = recordSheet.getLastRow();
  
  // 設定日期格式
  recordSheet.getRange(lastRow, 1).setNumberFormat('yyyy-MM-dd HH:mm:ss');
  
  // 設定檔案大小格式
  recordSheet.getRange(lastRow, 4).setNumberFormat('#,##0.00');
  
  // 設定連結格式
  var urlCell = recordSheet.getRange(lastRow, 7);
  urlCell.setFormula('=HYPERLINK("' + fileInfo.shareUrl + '", "開啟檔案")');
}

// ==================== 檔案清單管理 ====================

/**
 * 取得檔案清單
 * @param {number} limit - 限制回傳筆數（預設 50）
 */
function getFileList(limit) {
  limit = limit || 50;
  
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
  
  if (!recordSheet) {
    return [];
  }
  
  var lastRow = recordSheet.getLastRow();
  
  if (lastRow <= 1) {
    return [];
  }
  
  // 計算要讀取的範圍
  var startRow = Math.max(2, lastRow - limit + 1);
  var numRows = lastRow - startRow + 1;
  
  var data = recordSheet.getRange(startRow, 1, numRows, 7).getValues();
  
  // 轉換為物件陣列（反轉順序，最新的在前）
  var fileList = [];
  for (var i = data.length - 1; i >= 0; i--) {
    fileList.push({
      timestamp: data[i][0],
      fileName: data[i][1],
      mimeType: data[i][2],
      fileSizeKB: data[i][3],
      uploader: data[i][4],
      fileId: data[i][5],
      shareUrl: data[i][6]
    });
  }
  
  return fileList;
}

/**
 * 搜尋檔案
 * @param {string} keyword - 搜尋關鍵字
 */
function searchFiles(keyword) {
  if (!keyword) {
    return getFileList(50);
  }
  
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
  
  if (!recordSheet) {
    return [];
  }
  
  var data = recordSheet.getDataRange().getValues();
  var results = [];
  
  // 從第二列開始搜尋（跳過表頭）
  for (var i = data.length - 1; i >= 1; i--) {
    var fileName = data[i][1].toString().toLowerCase();
    var uploader = data[i][4].toString().toLowerCase();
    var searchTerm = keyword.toLowerCase();
    
    if (fileName.indexOf(searchTerm) !== -1 || uploader.indexOf(searchTerm) !== -1) {
      results.push({
        timestamp: data[i][0],
        fileName: data[i][1],
        mimeType: data[i][2],
        fileSizeKB: data[i][3],
        uploader: data[i][4],
        fileId: data[i][5],
        shareUrl: data[i][6]
      });
    }
  }
  
  return results;
}

/**
 * 取得統計資訊
 */
function getStatistics() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
  
  if (!recordSheet) {
    return {
      totalFiles: 0,
      totalSizeKB: 0,
      uploaders: 0
    };
  }
  
  var lastRow = recordSheet.getLastRow();
  
  if (lastRow <= 1) {
    return {
      totalFiles: 0,
      totalSizeKB: 0,
      uploaders: 0
    };
  }
  
  var data = recordSheet.getRange(2, 1, lastRow - 1, 7).getValues();
  
  var totalSizeKB = 0;
  var uploaders = {};
  
  for (var i = 0; i < data.length; i++) {
    totalSizeKB += data[i][3];
    uploaders[data[i][4]] = true;
  }
  
  return {
    totalFiles: data.length,
    totalSizeKB: Math.round(totalSizeKB * 100) / 100,
    totalSizeMB: Math.round(totalSizeKB / 1024 * 100) / 100,
    uploaders: Object.keys(uploaders).length
  };
}

// ==================== 檔案管理 ====================

/**
 * 刪除檔案
 * @param {string} fileId - 檔案 ID
 */
function deleteFile(fileId) {
  try {
    var file = DriveApp.getFileById(fileId);
    file.setTrashed(true);
    
    // 更新試算表記錄（標記為已刪除）
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var recordSheet = ss.getSheetByName(RECORD_SHEET_NAME);
    
    if (recordSheet) {
      var data = recordSheet.getDataRange().getValues();
      
      for (var i = 1; i < data.length; i++) {
        if (data[i][5] === fileId) {
          recordSheet.getRange(i + 1, 2).setValue(data[i][1] + ' (已刪除)');
          recordSheet.getRange(i + 1, 1, 1, 7).setBackground('#ffcccc');
          break;
        }
      }
    }
    
    return {
      success: true,
      message: '檔案已刪除'
    };
    
  } catch (error) {
    return {
      success: false,
      message: '刪除失敗：' + error.message
    };
  }
}

/**
 * 取得檔案資訊
 * @param {string} fileId - 檔案 ID
 */
function getFileInfo(fileId) {
  try {
    var file = DriveApp.getFileById(fileId);
    
    return {
      success: true,
      info: {
        name: file.getName(),
        mimeType: file.getMimeType(),
        size: file.getSize(),
        url: file.getUrl(),
        downloadUrl: file.getDownloadUrl(),
        lastUpdated: file.getLastUpdated(),
        owner: file.getOwner().getEmail()
      }
    };
    
  } catch (error) {
    return {
      success: false,
      message: '取得檔案資訊失敗：' + error.message
    };
  }
}

// ==================== 工具函式 ====================

/**
 * 格式化檔案大小
 * @param {number} sizeKB - 檔案大小（KB）
 */
function formatFileSize(sizeKB) {
  if (sizeKB < 1024) {
    return sizeKB.toFixed(2) + ' KB';
  } else {
    return (sizeKB / 1024).toFixed(2) + ' MB';
  }
}

/**
 * 取得檔案類型圖示
 * @param {string} mimeType - MIME 類型
 */
function getFileIcon(mimeType) {
  var icons = {
    'application/pdf': '📄',
    'image/jpeg': '🖼️',
    'image/png': '🖼️',
    'image/gif': '🖼️',
    'application/msword': '📝',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
    'application/vnd.ms-excel': '📊',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
    'application/zip': '📦',
    'text/plain': '📃'
  };
  
  return icons[mimeType] || '📎';
}

/**
 * 測試函式
 */
function testSystem() {
  Logger.log('=== 系統測試 ===');
  
  // 測試取得檔案清單
  var fileList = getFileList(10);
  Logger.log('檔案清單筆數：' + fileList.length);
  
  // 測試統計資訊
  var stats = getStatistics();
  Logger.log('統計資訊：');
  Logger.log('  總檔案數：' + stats.totalFiles);
  Logger.log('  總大小：' + stats.totalSizeMB + ' MB');
  Logger.log('  上傳者數：' + stats.uploaders);
  
  Logger.log('=== 測試完成 ===');
}
