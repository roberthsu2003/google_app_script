/**
 * DriveApp 檔案權限管理範例
 * 
 * 本檔案包含 DriveApp 服務的權限管理範例：
 * - 新增檢視者、評論者、編輯者
 * - 移除權限
 * - 取得分享資訊
 * - 設定分享連結
 * - 批次權限管理
 */

// ============================================
// 範例 1：新增權限
// ============================================

/**
 * 新增檢視者權限
 */
function example01_addViewer() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 新增檢視者
    file.addViewer(email);
    
    Logger.log('✅ 已新增檢視者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    Logger.log('權限：檢視者（可以查看和下載）');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 新增評論者權限
 */
function example02_addCommenter() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 新增評論者
    file.addCommenter(email);
    
    Logger.log('✅ 已新增評論者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    Logger.log('權限：評論者（可以查看和評論）');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 新增編輯者權限
 */
function example03_addEditor() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 新增編輯者
    file.addEditor(email);
    
    Logger.log('✅ 已新增編輯者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    Logger.log('權限：編輯者（可以查看、評論和編輯）');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 批次新增多個檢視者
 */
function example04_addMultipleViewers() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  // 使用者清單
  var emails = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ];
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 批次新增（比逐一新增更有效率）
    file.addViewers(emails);
    
    Logger.log('✅ 已批次新增檢視者');
    Logger.log('檔案：' + file.getName());
    Logger.log('新增人數：' + emails.length + ' 位');
    Logger.log('');
    Logger.log('使用者清單：');
    for (var i = 0; i < emails.length; i++) {
      Logger.log((i + 1) + '. ' + emails[i]);
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 批次新增多個編輯者
 */
function example05_addMultipleEditors() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  var emails = [
    'editor1@example.com',
    'editor2@example.com'
  ];
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 批次新增編輯者
    file.addEditors(emails);
    
    Logger.log('✅ 已批次新增編輯者');
    Logger.log('檔案：' + file.getName());
    Logger.log('新增人數：' + emails.length + ' 位');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 2：移除權限
// ============================================

/**
 * 移除檢視者權限
 */
function example06_removeViewer() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 移除檢視者
    file.removeViewer(email);
    
    Logger.log('✅ 已移除檢視者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 移除編輯者權限
 */
function example07_removeEditor() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 移除編輯者
    file.removeEditor(email);
    
    Logger.log('✅ 已移除編輯者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 移除評論者權限
 */
function example08_removeCommenter() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var email = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 移除評論者
    file.removeCommenter(email);
    
    Logger.log('✅ 已移除評論者');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + email);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 3：取得分享資訊
// ============================================

/**
 * 取得檔案的 URL
 */
function example09_getFileUrls() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 檔案連結 ===');
    Logger.log('檔案名稱：' + file.getName());
    Logger.log('');
    
    // 檔案 URL（開啟檔案）
    Logger.log('【檔案 URL】');
    Logger.log(file.getUrl());
    Logger.log('');
    
    // 下載 URL
    Logger.log('【下載 URL】');
    Logger.log(file.getDownloadUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 取得檔案的分享設定
 */
function example10_getSharingSettings() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 分享設定 ===');
    Logger.log('檔案：' + file.getName());
    Logger.log('');
    
    // 分享存取類型
    var access = file.getSharingAccess();
    Logger.log('存取類型：' + access);
    Logger.log(getSharingAccessDescription(access));
    Logger.log('');
    
    // 分享權限
    var permission = file.getSharingPermission();
    Logger.log('權限：' + permission);
    Logger.log(getSharingPermissionDescription(permission));
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 列出所有有權限的使用者
 */
function example11_listAllUsers() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 檔案權限清單 ===');
    Logger.log('檔案：' + file.getName());
    Logger.log('');
    
    // 擁有者
    var owner = file.getOwner();
    Logger.log('【擁有者】');
    Logger.log(owner.getName() + ' (' + owner.getEmail() + ')');
    Logger.log('');
    
    // 編輯者
    var editors = file.getEditors();
    Logger.log('【編輯者】(' + editors.length + ' 位)');
    if (editors.length === 0) {
      Logger.log('  無');
    } else {
      for (var i = 0; i < editors.length; i++) {
        Logger.log((i + 1) + '. ' + editors[i].getName() + ' (' + editors[i].getEmail() + ')');
      }
    }
    Logger.log('');
    
    // 檢視者
    var viewers = file.getViewers();
    Logger.log('【檢視者】(' + viewers.length + ' 位)');
    if (viewers.length === 0) {
      Logger.log('  無');
    } else {
      for (var i = 0; i < viewers.length; i++) {
        Logger.log((i + 1) + '. ' + viewers[i].getName() + ' (' + viewers[i].getEmail() + ')');
      }
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 4：設定分享連結
// ============================================

/**
 * 設定為「知道連結的使用者可以檢視」
 */
function example12_setLinkSharing() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 設定為「知道連結的使用者可以檢視」
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    Logger.log('✅ 已設定分享連結');
    Logger.log('檔案：' + file.getName());
    Logger.log('設定：任何人都可以透過連結檢視此檔案');
    Logger.log('');
    Logger.log('分享連結：');
    Logger.log(file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 設定為「知道連結的使用者可以編輯」
 */
function example13_setLinkEditing() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 設定為「知道連結的使用者可以編輯」
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    
    Logger.log('✅ 已設定分享連結');
    Logger.log('檔案：' + file.getName());
    Logger.log('設定：任何人都可以透過連結編輯此檔案');
    Logger.log('⚠️ 警告：任何人都可以修改此檔案！');
    Logger.log('');
    Logger.log('分享連結：');
    Logger.log(file.getUrl());
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 設定為私人
 */
function example14_setPrivate() {
  // ⚠️ 請替換成實際的檔案 ID
  var fileId = '請替換成實際的檔案ID';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    // 設定為私人
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
    
    Logger.log('✅ 已設定為私人');
    Logger.log('檔案：' + file.getName());
    Logger.log('設定：只有擁有者和明確授權的使用者可以存取');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 範例 5：批次權限管理
// ============================================

/**
 * 批次設定資料夾中所有檔案的權限
 */
function example15_batchSetPermissions() {
  // ⚠️ 請替換成實際的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  // 要新增的檢視者清單
  var viewers = [
    'user1@example.com',
    'user2@example.com'
  ];
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 批次設定權限 ===');
    Logger.log('資料夾：' + folder.getName());
    Logger.log('新增檢視者：' + viewers.length + ' 位');
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
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 產生檔案分享報告
 */
function example16_generateSharingReport() {
  // ⚠️ 請替換成實際的資料夾 ID
  var folderId = '請替換成實際的資料夾ID';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 檔案分享報告 ===');
    Logger.log('資料夾：' + folder.getName());
    Logger.log('產生時間：' + new Date());
    Logger.log('');
    
    var files = folder.getFiles();
    var count = 0;
    var totalViewers = 0;
    var totalEditors = 0;
    
    while (files.hasNext()) {
      count++;
      var file = files.next();
      
      var viewers = file.getViewers();
      var editors = file.getEditors();
      
      totalViewers += viewers.length;
      totalEditors += editors.length;
      
      Logger.log(count + '. ' + file.getName());
      Logger.log('   存取類型：' + file.getSharingAccess());
      Logger.log('   權限：' + file.getSharingPermission());
      Logger.log('   檢視者：' + viewers.length + ' 位');
      Logger.log('   編輯者：' + editors.length + ' 位');
      Logger.log('');
    }
    
    Logger.log('=== 統計摘要 ===');
    Logger.log('總檔案數：' + count);
    Logger.log('總檢視者數：' + totalViewers);
    Logger.log('總編輯者數：' + totalEditors);
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 建立檔案並自動分享給團隊
 */
function example17_createAndShare() {
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
  content += '\n';
  content += '團隊成員：\n';
  for (var i = 0; i < teamMembers.length; i++) {
    content += (i + 1) + '. ' + teamMembers[i] + '\n';
  }
  
  var file = DriveApp.createFile(fileName, content);
  
  Logger.log('✅ 檔案已建立');
  Logger.log('檔案名稱：' + file.getName());
  Logger.log('');
  
  // 自動分享給團隊成員
  file.addEditors(teamMembers);
  
  Logger.log('✅ 已分享給 ' + teamMembers.length + ' 位團隊成員');
  Logger.log('權限：編輯者');
  Logger.log('');
  Logger.log('檔案 URL：');
  Logger.log(file.getUrl());
}


/**
 * 移除特定使用者對資料夾中所有檔案的權限
 */
function example18_removeUserAccess() {
  // ⚠️ 請替換成實際的資料夾 ID 和 Email
  var folderId = '請替換成實際的資料夾ID';
  var userEmail = 'user@example.com';
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    
    Logger.log('=== 移除使用者權限 ===');
    Logger.log('資料夾：' + folder.getName());
    Logger.log('使用者：' + userEmail);
    Logger.log('');
    
    var files = folder.getFiles();
    var count = 0;
    
    while (files.hasNext()) {
      var file = files.next();
      var hasAccess = false;
      
      // 檢查並移除檢視者權限
      var viewers = file.getViewers();
      for (var i = 0; i < viewers.length; i++) {
        if (viewers[i].getEmail() === userEmail) {
          file.removeViewer(userEmail);
          hasAccess = true;
          break;
        }
      }
      
      // 檢查並移除編輯者權限
      var editors = file.getEditors();
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
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 檢查使用者是否有檔案權限
 */
function example19_checkUserAccess() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var userEmail = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 檢查使用者權限 ===');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + userEmail);
    Logger.log('');
    
    var hasAccess = false;
    var accessType = '';
    
    // 檢查是否為擁有者
    var owner = file.getOwner();
    if (owner.getEmail() === userEmail) {
      hasAccess = true;
      accessType = '擁有者';
    }
    
    // 檢查是否為編輯者
    if (!hasAccess) {
      var editors = file.getEditors();
      for (var i = 0; i < editors.length; i++) {
        if (editors[i].getEmail() === userEmail) {
          hasAccess = true;
          accessType = '編輯者';
          break;
        }
      }
    }
    
    // 檢查是否為檢視者
    if (!hasAccess) {
      var viewers = file.getViewers();
      for (var i = 0; i < viewers.length; i++) {
        if (viewers[i].getEmail() === userEmail) {
          hasAccess = true;
          accessType = '檢視者';
          break;
        }
      }
    }
    
    if (hasAccess) {
      Logger.log('✅ ' + userEmail + ' 有權限');
      Logger.log('權限類型：' + accessType);
    } else {
      Logger.log('❌ ' + userEmail + ' 沒有權限');
    }
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


/**
 * 變更使用者的權限類型
 */
function example20_changePermission() {
  // ⚠️ 請替換成實際的檔案 ID 和 Email
  var fileId = '請替換成實際的檔案ID';
  var userEmail = 'user@example.com';
  
  try {
    var file = DriveApp.getFileById(fileId);
    
    Logger.log('=== 變更使用者權限 ===');
    Logger.log('檔案：' + file.getName());
    Logger.log('使用者：' + userEmail);
    Logger.log('');
    
    // 從檢視者變更為編輯者
    file.removeViewer(userEmail);
    file.addEditor(userEmail);
    
    Logger.log('✅ 已將權限從檢視者變更為編輯者');
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}


// ============================================
// 輔助函式
// ============================================

/**
 * 取得日期字串（格式：YYYYMMDD）
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
 */
function padZero(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

/**
 * 取得存取類型說明
 */
function getSharingAccessDescription(access) {
  switch (access) {
    case DriveApp.Access.PRIVATE:
      return '  → 私人（只有擁有者和明確授權的使用者）';
    case DriveApp.Access.ANYONE_WITH_LINK:
      return '  → 知道連結的使用者';
    case DriveApp.Access.DOMAIN:
      return '  → 網域內的使用者';
    case DriveApp.Access.DOMAIN_WITH_LINK:
      return '  → 網域內知道連結的使用者';
    default:
      return '  → 未知';
  }
}

/**
 * 取得權限類型說明
 */
function getSharingPermissionDescription(permission) {
  switch (permission) {
    case DriveApp.Permission.VIEW:
      return '  → 檢視（可以查看和下載）';
    case DriveApp.Permission.EDIT:
      return '  → 編輯（可以查看、評論和編輯）';
    case DriveApp.Permission.COMMENT:
      return '  → 評論（可以查看和評論）';
    case DriveApp.Permission.OWNER:
      return '  → 擁有者';
    default:
      return '  → 未知';
  }
}


// ============================================
// 測試範例
// ============================================

/**
 * 執行示範範例
 */
function runDemoExamples() {
  Logger.log('========================================');
  Logger.log('開始執行示範範例');
  Logger.log('========================================\n');
  
  // 範例 17：建立檔案並自動分享
  Logger.log('\n--- 範例 17：建立檔案並自動分享 ---');
  example17_createAndShare();
  
  Logger.log('\n========================================');
  Logger.log('示範範例執行完成');
  Logger.log('========================================');
}
