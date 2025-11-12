# DriveApp 服務基礎

## 學習目標

- 理解 DriveApp 服務的架構與功能
- 掌握檔案的取得、建立與管理方法
- 掌握資料夾的操作與管理
- 能夠撰寫基本的雲端硬碟自動化腳本

## DriveApp 服務簡介

DriveApp 是 Google Apps Script 提供的服務，用於操作 Google Drive（雲端硬碟）中的檔案與資料夾。透過 DriveApp，我們可以：

- 搜尋、取得檔案與資料夾
- 建立新檔案與資料夾
- 複製、移動、刪除檔案
- 重新命名檔案與資料夾
- 管理檔案權限與分享設定
- 取得檔案資訊（大小、類型、修改時間等）

### DriveApp 服務架構

```
DriveApp
├── 檔案操作 (File)
│   ├── 取得檔案
│   ├── 建立檔案
│   ├── 複製檔案
│   ├── 移動檔案
│   └── 刪除檔案
└── 資料夾操作 (Folder)
    ├── 取得資料夾
    ├── 建立資料夾
    ├── 遍歷資料夾
    └── 管理資料夾內容
```

## 取得檔案

### 1. 使用檔案 ID 取得檔案

每個 Google Drive 檔案都有唯一的 ID，可以從檔案的 URL 中取得。

```javascript
/**
 * 使用檔案 ID 取得檔案
 * 檔案 URL 格式：https://drive.google.com/file/d/FILE_ID/view
 */
function getFileByIdExample() {
  // 替換成實際的檔案 ID
  var fileId = '1ABC...XYZ';
  
  try {
    var file = DriveApp.getFileById(fileId);
    Logger.log('檔案名稱：' + file.getName());
    Logger.log('檔案類型：' + file.getMimeType());
    Logger.log('檔案大小：' + file.getSize() + ' bytes');
    Logger.log('建立時間：' + file.getDateCreated());
    Logger.log('最後修改：' + file.getLastUpdated());
  } catch (error) {
    Logger.log('找不到檔案：' + error.message);
  }
}
```

**優點：** 速度快，直接定位
**缺點：** 需要事先知道檔案 ID

### 2. 使用檔案名稱搜尋檔案

```javascript
/**
 * 使用檔案名稱搜尋檔案
 * 注意：可能會找到多個同名檔案
 */
function getFilesByNameExample() {
  var fileName = '學生名單.xlsx';
  var files = DriveApp.getFilesByName(fileName);
  
  // 檢查是否找到檔案
  if (!files.hasNext()) {
    Logger.log('找不到檔案：' + fileName);
    return;
  }
  
  // 遍歷所有同名檔案
  var count = 0;
  while (files.hasNext()) {
    count++;
    var file = files.next();
    Logger.log('檔案 ' + count + '：');
    Logger.log('  名稱：' + file.getName());
    Logger.log('  ID：' + file.getId());
    Logger.log('  URL：' + file.getUrl());
  }
}
```

**優點：** 不需要知道檔案 ID
**缺點：** 速度較慢，可能找到多個同名檔案

### 3. 取得特定類型的檔案

```javascript
/**
 * 取得特定類型的檔案
 */
function getFilesByTypeExample() {
  // 取得所有 PDF 檔案
  var files = DriveApp.getFilesByType(MimeType.PDF);
  
  Logger.log('=== PDF 檔案清單 ===');
  var count = 0;
  while (files.hasNext()) {
    count++;
    var file = files.next();
    Logger.log(count + '. ' + file.getName());
  }
  Logger.log('總共找到 ' + count + ' 個 PDF 檔案');
}
```

### 4. 常用的 MIME 類型

```javascript
// Google 文件類型
MimeType.GOOGLE_DOCS        // Google 文件
MimeType.GOOGLE_SHEETS      // Google 試算表
MimeType.GOOGLE_SLIDES      // Google 簡報
MimeType.GOOGLE_FORMS       // Google 表單

// 一般檔案類型
MimeType.PDF                // PDF 檔案
MimeType.MICROSOFT_EXCEL    // Excel 檔案
MimeType.MICROSOFT_WORD     // Word 檔案
MimeType.JPEG               // JPEG 圖片
MimeType.PNG                // PNG 圖片
```

## 取得資料夾

### 1. 使用資料夾 ID 取得資料夾

```javascript
/**
 * 使用資料夾 ID 取得資料夾
 * 資料夾 URL 格式：https://drive.google.com/drive/folders/FOLDER_ID
 */
function getFolderByIdExample() {
  // 替換成實際的資料夾 ID
  var folderId = '1ABC...XYZ';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    Logger.log('資料夾名稱：' + folder.getName());
    Logger.log('資料夾 URL：' + folder.getUrl());
    
    // 取得資料夾中的檔案數量
    var files = folder.getFiles();
    var fileCount = 0;
    while (files.hasNext()) {
      fileCount++;
      files.next();
    }
    Logger.log('檔案數量：' + fileCount);
    
  } catch (error) {
    Logger.log('找不到資料夾：' + error.message);
  }
}
```

### 2. 使用資料夾名稱搜尋資料夾

```javascript
/**
 * 使用資料夾名稱搜尋資料夾
 */
function getFoldersByNameExample() {
  var folderName = '課程資料';
  var folders = DriveApp.getFoldersByName(folderName);
  
  if (!folders.hasNext()) {
    Logger.log('找不到資料夾：' + folderName);
    return;
  }
  
  // 列出所有同名資料夾
  var count = 0;
  while (folders.hasNext()) {
    count++;
    var folder = folders.next();
    Logger.log('資料夾 ' + count + '：');
    Logger.log('  名稱：' + folder.getName());
    Logger.log('  ID：' + folder.getId());
    Logger.log('  URL：' + folder.getUrl());
  }
}
```

### 3. 取得根資料夾（我的雲端硬碟）

```javascript
/**
 * 取得根資料夾
 */
function getRootFolderExample() {
  var rootFolder = DriveApp.getRootFolder();
  Logger.log('根資料夾名稱：' + rootFolder.getName());
  
  // 列出根資料夾中的所有資料夾
  var folders = rootFolder.getFolders();
  Logger.log('\n=== 根資料夾中的資料夾 ===');
  while (folders.hasNext()) {
    var folder = folders.next();
    Logger.log('- ' + folder.getName());
  }
}
```

## 建立檔案與資料夾

### 1. 建立文字檔案

```javascript
/**
 * 建立文字檔案
 */
function createTextFileExample() {
  var fileName = '測試檔案.txt';
  var content = '這是一個測試檔案\n建立時間：' + new Date();
  
  // 建立檔案
  var file = DriveApp.createFile(fileName, content);
  
  Logger.log('檔案已建立');
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('檔案 ID：' + file.getId());
  Logger.log('檔案 URL：' + file.getUrl());
}
```

### 2. 在指定資料夾中建立檔案

```javascript
/**
 * 在指定資料夾中建立檔案
 */
function createFileInFolderExample() {
  // 取得目標資料夾
  var folderId = '1ABC...XYZ';  // 替換成實際的資料夾 ID
  var folder = DriveApp.getFolderById(folderId);
  
  // 在資料夾中建立檔案
  var fileName = '報告.txt';
  var content = '這是報告內容';
  var file = folder.createFile(fileName, content);
  
  Logger.log('檔案已建立在資料夾：' + folder.getName());
  Logger.log('檔案 URL：' + file.getUrl());
}
```

### 3. 建立資料夾

```javascript
/**
 * 建立資料夾
 */
function createFolderExample() {
  var folderName = '2024 課程資料';
  
  // 在根目錄建立資料夾
  var folder = DriveApp.createFolder(folderName);
  
  Logger.log('資料夾已建立');
  Logger.log('資料夾名稱：' + folder.getName());
  Logger.log('資料夾 ID：' + folder.getId());
  Logger.log('資料夾 URL：' + folder.getUrl());
}
```

### 4. 建立巢狀資料夾結構

```javascript
/**
 * 建立巢狀資料夾結構
 */
function createNestedFoldersExample() {
  // 建立主資料夾
  var mainFolder = DriveApp.createFolder('課程專案');
  Logger.log('主資料夾已建立：' + mainFolder.getName());
  
  // 在主資料夾中建立子資料夾
  var subFolders = ['文件', '圖片', '程式碼', '報告'];
  
  for (var i = 0; i < subFolders.length; i++) {
    var subFolder = mainFolder.createFolder(subFolders[i]);
    Logger.log('  子資料夾已建立：' + subFolder.getName());
  }
  
  Logger.log('\n資料夾結構建立完成');
  Logger.log('主資料夾 URL：' + mainFolder.getUrl());
}
```

## 檔案管理操作

### 1. 複製檔案

```javascript
/**
 * 複製檔案
 */
function copyFileExample() {
  // 取得原始檔案
  var fileId = '1ABC...XYZ';  // 替換成實際的檔案 ID
  var originalFile = DriveApp.getFileById(fileId);
  
  // 複製檔案（方法 1：簡單複製）
  var copiedFile = originalFile.makeCopy();
  Logger.log('檔案已複製');
  Logger.log('新檔案名稱：' + copiedFile.getName());
  
  // 複製檔案（方法 2：指定新名稱）
  var newName = originalFile.getName() + ' - 副本';
  var copiedFile2 = originalFile.makeCopy(newName);
  Logger.log('檔案已複製為：' + copiedFile2.getName());
  
  // 複製檔案（方法 3：複製到指定資料夾）
  var targetFolderId = '1DEF...UVW';  // 替換成目標資料夾 ID
  var targetFolder = DriveApp.getFolderById(targetFolderId);
  var copiedFile3 = originalFile.makeCopy(newName, targetFolder);
  Logger.log('檔案已複製到：' + targetFolder.getName());
}
```

### 2. 移動檔案

```javascript
/**
 * 移動檔案到另一個資料夾
 */
function moveFileExample() {
  // 取得檔案
  var fileId = '1ABC...XYZ';  // 替換成實際的檔案 ID
  var file = DriveApp.getFileById(fileId);
  
  // 取得目標資料夾
  var targetFolderId = '1DEF...UVW';  // 替換成目標資料夾 ID
  var targetFolder = DriveApp.getFolderById(targetFolderId);
  
  // 取得檔案目前所在的資料夾
  var parents = file.getParents();
  
  // 移動檔案（移除舊位置，加入新位置）
  while (parents.hasNext()) {
    var parent = parents.next();
    parent.removeFile(file);
  }
  targetFolder.addFile(file);
  
  Logger.log('檔案已移動');
  Logger.log('檔案：' + file.getName());
  Logger.log('新位置：' + targetFolder.getName());
}
```

### 3. 重新命名檔案

```javascript
/**
 * 重新命名檔案
 */
function renameFileExample() {
  // 取得檔案
  var fileId = '1ABC...XYZ';  // 替換成實際的檔案 ID
  var file = DriveApp.getFileById(fileId);
  
  var oldName = file.getName();
  var newName = '新檔案名稱.txt';
  
  // 重新命名
  file.setName(newName);
  
  Logger.log('檔案已重新命名');
  Logger.log('舊名稱：' + oldName);
  Logger.log('新名稱：' + file.getName());
}
```

### 4. 刪除檔案

```javascript
/**
 * 刪除檔案（移到垃圾桶）
 */
function deleteFileExample() {
  // 取得檔案
  var fileId = '1ABC...XYZ';  // 替換成實際的檔案 ID
  var file = DriveApp.getFileById(fileId);
  
  var fileName = file.getName();
  
  // 刪除檔案（移到垃圾桶，可以還原）
  file.setTrashed(true);
  
  Logger.log('檔案已移到垃圾桶：' + fileName);
}
```

### 5. 永久刪除檔案

```javascript
/**
 * 永久刪除檔案
 * ⚠️ 警告：此操作無法還原！
 */
function permanentlyDeleteFileExample() {
  // 取得垃圾桶中的檔案
  var files = DriveApp.getTrashedFiles();
  
  Logger.log('=== 垃圾桶中的檔案 ===');
  while (files.hasNext()) {
    var file = files.next();
    Logger.log('- ' + file.getName());
    
    // ⚠️ 取消註解以永久刪除
    // file.setTrashed(false);  // 先從垃圾桶還原
    // DriveApp.removeFile(file);  // 永久刪除
  }
}
```

## 遍歷資料夾內容

### 1. 列出資料夾中的所有檔案

```javascript
/**
 * 列出資料夾中的所有檔案
 */
function listFilesInFolderExample() {
  // 取得資料夾
  var folderId = '1ABC...XYZ';  // 替換成實際的資料夾 ID
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
    Logger.log('   修改：' + file.getLastUpdated());
    Logger.log('');
  }
  
  Logger.log('總共 ' + count + ' 個檔案');
}

/**
 * 格式化檔案大小
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}
```

### 2. 遞迴列出所有子資料夾與檔案

```javascript
/**
 * 遞迴列出資料夾結構
 */
function listFolderStructureExample() {
  var folderId = '1ABC...XYZ';  // 替換成實際的資料夾 ID
  var folder = DriveApp.getFolderById(folderId);
  
  Logger.log('=== 資料夾結構 ===\n');
  listFolderRecursive(folder, 0);
}

/**
 * 遞迴函式：列出資料夾內容
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
    Logger.log(indent + '  📄 ' + file.getName());
  }
  
  // 遞迴列出子資料夾
  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    listFolderRecursive(subFolder, level + 1);
  }
}
```

## 實用範例

### 範例 1：搜尋並整理特定類型的檔案

```javascript
/**
 * 搜尋所有 PDF 檔案並移到指定資料夾
 */
function organizePdfFilesExample() {
  // 建立或取得目標資料夾
  var targetFolderName = 'PDF 檔案';
  var folders = DriveApp.getFoldersByName(targetFolderName);
  var targetFolder;
  
  if (folders.hasNext()) {
    targetFolder = folders.next();
  } else {
    targetFolder = DriveApp.createFolder(targetFolderName);
  }
  
  // 搜尋所有 PDF 檔案
  var files = DriveApp.getFilesByType(MimeType.PDF);
  var count = 0;
  
  while (files.hasNext()) {
    var file = files.next();
    
    // 檢查檔案是否已在目標資料夾中
    var parents = file.getParents();
    var isInTargetFolder = false;
    
    while (parents.hasNext()) {
      if (parents.next().getId() === targetFolder.getId()) {
        isInTargetFolder = true;
        break;
      }
    }
    
    // 如果不在目標資料夾，則移動過去
    if (!isInTargetFolder) {
      targetFolder.addFile(file);
      count++;
      Logger.log('已移動：' + file.getName());
    }
  }
  
  Logger.log('\n總共移動 ' + count + ' 個 PDF 檔案');
  Logger.log('目標資料夾：' + targetFolder.getUrl());
}
```

### 範例 2：批次重新命名檔案

```javascript
/**
 * 批次重新命名資料夾中的檔案
 */
function batchRenameFilesExample() {
  // 取得資料夾
  var folderId = '1ABC...XYZ';  // 替換成實際的資料夾 ID
  var folder = DriveApp.getFolderById(folderId);
  
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
    
    Logger.log(oldName + ' → ' + newName);
    count++;
  }
  
  Logger.log('\n總共重新命名 ' + (count - 1) + ' 個檔案');
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
```

## 注意事項與最佳實踐

### 1. 權限問題
- 腳本只能操作使用者有權限存取的檔案
- 如果檔案不存在或無權限，會拋出錯誤
- 建議使用 try-catch 處理錯誤

### 2. 效能優化
- 使用檔案 ID 比使用檔案名稱搜尋快很多
- 避免在迴圈中重複搜尋相同的檔案或資料夾
- 處理大量檔案時注意執行時間限制（6 分鐘）

### 3. 檔案操作安全
- 刪除檔案前先確認是否為正確的檔案
- 重要操作前先備份
- 使用 setTrashed(true) 而非永久刪除，保留還原機會

### 4. 命名規範
- 避免使用特殊字元（如 / \ : * ? " < > |）
- 使用有意義的檔案名稱
- 批次操作時使用統一的命名格式

## 練習題

1. 撰寫腳本，列出你的雲端硬碟根目錄中所有資料夾的名稱
2. 建立一個資料夾結構：「專案/文件」、「專案/圖片」、「專案/程式碼」
3. 搜尋所有 Google 試算表檔案，並列出檔案名稱與 URL
4. 撰寫函式，將指定資料夾中的所有檔案複製到另一個資料夾
5. 撰寫腳本，找出所有檔名包含「測試」的檔案，並移到「測試檔案」資料夾

## 總結

DriveApp 服務提供了完整的雲端硬碟操作功能，讓我們可以自動化檔案管理任務。掌握以下核心概念：

✅ 使用 ID 或名稱取得檔案與資料夾
✅ 建立、複製、移動、刪除檔案
✅ 建立與管理資料夾結構
✅ 遍歷資料夾內容
✅ 處理錯誤與權限問題

下一步，我們將學習檔案權限管理，讓你能夠控制檔案的分享與存取權限。
