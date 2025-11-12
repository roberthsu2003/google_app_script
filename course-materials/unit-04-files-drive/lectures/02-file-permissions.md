# 檔案權限管理

## 學習目標

- 理解 Google Drive 的權限類型
- 掌握設定檔案分享權限的方法
- 能夠取得與管理分享連結
- 學會批次設定權限

## Google Drive 權限類型

Google Drive 提供三種主要的權限類型：

### 1. 檢視者（Viewer）
- 可以查看檔案內容
- 可以下載檔案
- 無法編輯或修改檔案
- 適用於：分享報告、文件給他人閱讀

### 2. 評論者（Commenter）
- 擁有檢視者的所有權限
- 可以新增評論與建議
- 無法直接編輯檔案內容
- 適用於：需要他人提供意見回饋的文件

### 3. 編輯者（Editor）
- 擁有評論者的所有權限
- 可以編輯檔案內容
- 可以刪除檔案
- 可以變更檔案權限
- 適用於：協作編輯的文件

## 分享存取類型

### 1. 私人（Private）
- 只有擁有者可以存取
- 需要明確授權給特定使用者

### 2. 知道連結的使用者（Anyone with the link）
- 任何擁有連結的人都可以存取
- 不需要 Google 帳號
- 適用於公開分享

### 3. 網域內的使用者（Domain）
- 限制在同一個 Google Workspace 網域內
- 適用於組織內部分享

## 設定檔案權限

### 1. 新增檢視者

```javascript
/**
 * 新增檢視者權限
 */
function addViewerExample() {
  // 取得檔案
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 新增檢視者
  var email = 'user@example.com';
  file.addViewer(email);
  
  Logger.log('✅ 已新增檢視者：' + email);
  Logger.log('檔案：' + file.getName());
}
```

### 2. 新增評論者

```javascript
/**
 * 新增評論者權限
 */
function addCommenterExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 新增評論者
  var email = 'user@example.com';
  file.addCommenter(email);
  
  Logger.log('✅ 已新增評論者：' + email);
}
```

### 3. 新增編輯者

```javascript
/**
 * 新增編輯者權限
 */
function addEditorExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 新增編輯者
  var email = 'user@example.com';
  file.addEditor(email);
  
  Logger.log('✅ 已新增編輯者：' + email);
}
```

### 4. 批次新增多個使用者

```javascript
/**
 * 批次新增檢視者
 */
function addMultipleViewersExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 使用者清單
  var emails = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ];
  
  // 批次新增（更有效率）
  file.addViewers(emails);
  
  Logger.log('✅ 已新增 ' + emails.length + ' 位檢視者');
  Logger.log('檔案：' + file.getName());
}
```

## 移除權限

### 1. 移除檢視者

```javascript
/**
 * 移除檢視者權限
 */
function removeViewerExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  var email = 'user@example.com';
  file.removeViewer(email);
  
  Logger.log('✅ 已移除檢視者：' + email);
}
```

### 2. 移除編輯者

```javascript
/**
 * 移除編輯者權限
 */
function removeEditorExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  var email = 'user@example.com';
  file.removeEditor(email);
  
  Logger.log('✅ 已移除編輯者：' + email);
}
```

### 3. 移除評論者

```javascript
/**
 * 移除評論者權限
 */
function removeCommenterExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  var email = 'user@example.com';
  file.removeCommenter(email);
  
  Logger.log('✅ 已移除評論者：' + email);
}
```

## 取得分享資訊

### 1. 取得檔案 URL

```javascript
/**
 * 取得檔案的各種 URL
 */
function getFileUrlsExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  Logger.log('=== 檔案連結 ===');
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('');
  
  // 檔案 URL（開啟檔案）
  Logger.log('檔案 URL：');
  Logger.log(file.getUrl());
  Logger.log('');
  
  // 下載 URL
  Logger.log('下載 URL：');
  Logger.log(file.getDownloadUrl());
}
```

### 2. 取得分享設定

```javascript
/**
 * 取得檔案的分享設定
 */
function getSharingSettingsExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  Logger.log('=== 分享設定 ===');
  Logger.log('檔案：' + file.getName());
  Logger.log('');
  
  // 分享存取類型
  var access = file.getSharingAccess();
  Logger.log('存取類型：' + access);
  // 可能的值：PRIVATE, ANYONE_WITH_LINK, DOMAIN, DOMAIN_WITH_LINK
  
  // 分享權限
  var permission = file.getSharingPermission();
  Logger.log('權限：' + permission);
  // 可能的值：VIEW, EDIT, COMMENT, OWNER, ORGANIZER, FILE_ORGANIZER
}
```

### 3. 列出所有有權限的使用者

```javascript
/**
 * 列出檔案的所有檢視者
 */
function listViewersExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  Logger.log('=== 檔案權限清單 ===');
  Logger.log('檔案：' + file.getName());
  Logger.log('');
  
  // 列出檢視者
  var viewers = file.getViewers();
  Logger.log('【檢視者】(' + viewers.length + ' 位)');
  for (var i = 0; i < viewers.length; i++) {
    Logger.log((i + 1) + '. ' + viewers[i].getName() + ' (' + viewers[i].getEmail() + ')');
  }
  Logger.log('');
  
  // 列出編輯者
  var editors = file.getEditors();
  Logger.log('【編輯者】(' + editors.length + ' 位)');
  for (var i = 0; i < editors.length; i++) {
    Logger.log((i + 1) + '. ' + editors[i].getName() + ' (' + editors[i].getEmail() + ')');
  }
  Logger.log('');
  
  // 擁有者
  var owner = file.getOwner();
  Logger.log('【擁有者】');
  Logger.log(owner.getName() + ' (' + owner.getEmail() + ')');
}
```

## 設定分享連結

### 1. 設定為「知道連結的使用者可以檢視」

```javascript
/**
 * 設定為任何人都可以透過連結檢視
 */
function setLinkSharingExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 設定為「知道連結的使用者可以檢視」
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  Logger.log('✅ 已設定分享連結');
  Logger.log('檔案：' + file.getName());
  Logger.log('任何人都可以透過連結檢視此檔案');
  Logger.log('');
  Logger.log('分享連結：');
  Logger.log(file.getUrl());
}
```

### 2. 設定為「知道連結的使用者可以編輯」

```javascript
/**
 * 設定為任何人都可以透過連結編輯
 */
function setLinkEditingExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 設定為「知道連結的使用者可以編輯」
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  
  Logger.log('✅ 已設定分享連結');
  Logger.log('任何人都可以透過連結編輯此檔案');
  Logger.log('分享連結：' + file.getUrl());
}
```

### 3. 設定為私人

```javascript
/**
 * 設定為私人（只有擁有者可以存取）
 */
function setPrivateExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 設定為私人
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
  
  Logger.log('✅ 已設定為私人');
  Logger.log('只有擁有者和明確授權的使用者可以存取');
}
```

## 實用範例

### 範例 1：批次設定資料夾中所有檔案的權限

```javascript
/**
 * 批次設定資料夾中所有檔案的權限
 */
function batchSetPermissionsExample() {
  var folderId = '請替換成實際的資料夾ID';
  var folder = DriveApp.getFolderById(folderId);
  
  // 要新增的檢視者清單
  var viewers = [
    'user1@example.com',
    'user2@example.com'
  ];
  
  Logger.log('=== 批次設定權限 ===');
  Logger.log('資料夾：' + folder.getName());
  Logger.log('');
  
  // 取得資料夾中的所有檔案
  var files = folder.getFiles();
  var count = 0;
  
  while (files.hasNext()) {
    count++;
    var file = files.next();
    
    // 新增檢視者
    file.addViewers(viewers);
    
    Logger.log(count + '. ✅ ' + file.getName());
  }
  
  Logger.log('');
  Logger.log('✅ 已為 ' + count + ' 個檔案新增 ' + viewers.length + ' 位檢視者');
}
```

### 範例 2：產生分享報告

```javascript
/**
 * 產生檔案分享報告
 */
function generateSharingReportExample() {
  var folderId = '請替換成實際的資料夾ID';
  var folder = DriveApp.getFolderById(folderId);
  
  Logger.log('=== 檔案分享報告 ===');
  Logger.log('資料夾：' + folder.getName());
  Logger.log('產生時間：' + new Date());
  Logger.log('');
  
  var files = folder.getFiles();
  var count = 0;
  
  while (files.hasNext()) {
    count++;
    var file = files.next();
    
    Logger.log(count + '. ' + file.getName());
    Logger.log('   存取類型：' + file.getSharingAccess());
    Logger.log('   權限：' + file.getSharingPermission());
    
    var viewers = file.getViewers();
    var editors = file.getEditors();
    
    Logger.log('   檢視者：' + viewers.length + ' 位');
    Logger.log('   編輯者：' + editors.length + ' 位');
    Logger.log('');
  }
  
  Logger.log('✅ 總共檢查 ' + count + ' 個檔案');
}
```

### 範例 3：自動分享新建立的檔案

```javascript
/**
 * 建立檔案並自動分享給團隊成員
 */
function createAndShareFileExample() {
  // 團隊成員清單
  var teamMembers = [
    'member1@example.com',
    'member2@example.com',
    'member3@example.com'
  ];
  
  // 建立檔案
  var fileName = '團隊報告_' + getDateString() + '.txt';
  var content = '這是團隊共用的報告檔案\n';
  content += '建立時間：' + new Date() + '\n';
  
  var file = DriveApp.createFile(fileName, content);
  
  Logger.log('✅ 檔案已建立：' + file.getName());
  Logger.log('');
  
  // 自動分享給團隊成員
  file.addEditors(teamMembers);
  
  Logger.log('✅ 已分享給 ' + teamMembers.length + ' 位團隊成員');
  Logger.log('權限：編輯者');
  Logger.log('');
  Logger.log('檔案 URL：');
  Logger.log(file.getUrl());
}

function getDateString() {
  var date = new Date();
  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1, 2);
  var day = padZero(date.getDate(), 2);
  return year + month + day;
}

function padZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
```

### 範例 4：檢查並移除過期的權限

```javascript
/**
 * 移除特定使用者對資料夾中所有檔案的權限
 */
function removeUserAccessExample() {
  var folderId = '請替換成實際的資料夾ID';
  var folder = DriveApp.getFolderById(folderId);
  
  // 要移除權限的使用者
  var userEmail = 'user@example.com';
  
  Logger.log('=== 移除使用者權限 ===');
  Logger.log('資料夾：' + folder.getName());
  Logger.log('使用者：' + userEmail);
  Logger.log('');
  
  var files = folder.getFiles();
  var count = 0;
  
  while (files.hasNext()) {
    var file = files.next();
    
    // 檢查使用者是否有權限
    var viewers = file.getViewers();
    var editors = file.getEditors();
    
    var hasAccess = false;
    
    // 檢查是否為檢視者
    for (var i = 0; i < viewers.length; i++) {
      if (viewers[i].getEmail() === userEmail) {
        file.removeViewer(userEmail);
        hasAccess = true;
        break;
      }
    }
    
    // 檢查是否為編輯者
    for (var i = 0; i < editors.length; i++) {
      if (editors[i].getEmail() === userEmail) {
        file.removeEditor(userEmail);
        hasAccess = true;
        break;
      }
    }
    
    if (hasAccess) {
      count++;
      Logger.log(count + '. ✅ ' + file.getName());
    }
  }
  
  Logger.log('');
  if (count === 0) {
    Logger.log('該使用者沒有任何檔案的權限');
  } else {
    Logger.log('✅ 已移除 ' + count + ' 個檔案的權限');
  }
}
```

## 權限管理最佳實踐

### 1. 最小權限原則
- 只給予必要的權限
- 優先使用檢視者權限
- 需要編輯時才給予編輯者權限

### 2. 定期檢查權限
- 定期審查檔案的分享設定
- 移除不再需要的權限
- 避免過度分享

### 3. 使用群組管理
- 對於團隊協作，考慮使用 Google Groups
- 方便統一管理多人權限
- 新增或移除成員更方便

### 4. 注意敏感資料
- 敏感檔案避免使用「知道連結的使用者」
- 使用明確的使用者授權
- 定期檢查分享狀態

### 5. 記錄權限變更
- 重要檔案的權限變更應記錄
- 可以使用試算表記錄分享歷史
- 方便追蹤與稽核

## 常見問題

### Q1：如何知道檔案是否已分享給特定使用者？

```javascript
function checkUserAccessExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  var userEmail = 'user@example.com';
  
  var viewers = file.getViewers();
  var editors = file.getEditors();
  
  var hasAccess = false;
  var accessType = '';
  
  // 檢查檢視者
  for (var i = 0; i < viewers.length; i++) {
    if (viewers[i].getEmail() === userEmail) {
      hasAccess = true;
      accessType = '檢視者';
      break;
    }
  }
  
  // 檢查編輯者
  for (var i = 0; i < editors.length; i++) {
    if (editors[i].getEmail() === userEmail) {
      hasAccess = true;
      accessType = '編輯者';
      break;
    }
  }
  
  if (hasAccess) {
    Logger.log('✅ ' + userEmail + ' 有權限（' + accessType + '）');
  } else {
    Logger.log('❌ ' + userEmail + ' 沒有權限');
  }
}
```

### Q2：如何變更使用者的權限類型？

先移除舊權限，再新增新權限：

```javascript
function changePermissionExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  var userEmail = 'user@example.com';
  
  // 從檢視者變更為編輯者
  file.removeViewer(userEmail);
  file.addEditor(userEmail);
  
  Logger.log('✅ 已將 ' + userEmail + ' 的權限從檢視者變更為編輯者');
}
```

### Q3：如何取得可公開分享的連結？

```javascript
function getPublicLinkExample() {
  var fileId = '請替換成實際的檔案ID';
  var file = DriveApp.getFileById(fileId);
  
  // 設定為公開可檢視
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // 取得連結
  var url = file.getUrl();
  
  Logger.log('公開分享連結：');
  Logger.log(url);
}
```

## 練習題

1. 撰寫腳本，將指定檔案分享給 3 位使用者（檢視者權限）
2. 建立一個資料夾，並將其中所有檔案設定為「知道連結的使用者可以檢視」
3. 撰寫函式，列出某個檔案的所有有權限使用者（包含檢視者和編輯者）
4. 撰寫腳本，移除特定使用者對資料夾中所有檔案的權限
5. 建立一個檔案分享報告，列出資料夾中每個檔案的分享狀態

## 總結

檔案權限管理是 Google Drive 自動化的重要功能。掌握以下核心概念：

✅ 三種權限類型：檢視者、評論者、編輯者
✅ 設定與移除權限的方法
✅ 取得分享資訊與連結
✅ 批次管理權限
✅ 權限管理最佳實踐

下一步，我們將透過實作案例來應用這些知識，建立實用的檔案管理工具。
