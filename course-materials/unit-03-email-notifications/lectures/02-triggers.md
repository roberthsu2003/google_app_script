# 時間觸發器（Triggers）

## 學習目標

- 理解觸發器的概念與類型
- 掌握時間驅動觸發器的設定方法
- 能夠建立、管理和刪除觸發器
- 了解觸發器的限制與配額
- 學會除錯觸發器執行問題

## 觸發器簡介

觸發器（Trigger）是 Google Apps Script 的自動化機制，讓你的腳本可以在特定時間或事件發生時自動執行，而不需要手動執行。

### 為什麼需要觸發器？

想像以下場景：
- 每天早上 8 點自動發送當日課程提醒
- 每週一產生上週的統計報表
- 每小時檢查試算表並發送通知
- 當表單提交時自動處理資料

這些都需要觸發器來實現自動化！

## 觸發器類型

Google Apps Script 提供兩種主要的觸發器類型：

### 1. 時間驅動觸發器（Time-driven Triggers）

根據時間自動執行腳本：
- **特定時間**：每天下午 3 點執行
- **定期執行**：每小時、每天、每週、每月執行
- **自訂間隔**：每 N 分鐘/小時執行一次

### 2. 事件驅動觸發器（Event-driven Triggers）

當特定事件發生時執行腳本：
- **試算表事件**：開啟、編輯、變更時
- **表單事件**：表單提交時
- **日曆事件**：日曆更新時
- **文件事件**：文件開啟時

本講義主要介紹**時間驅動觸發器**，事件驅動觸發器將在後續單元介紹。

## 建立時間觸發器的方法

### 方法 1：透過 GAS 編輯器介面（手動設定）

1. 開啟 Apps Script 編輯器
2. 點選左側的「觸發條件」（時鐘圖示）
3. 點選右下角「新增觸發條件」
4. 設定觸發條件：
   - 選擇要執行的函式
   - 選擇事件來源：「時間驅動」
   - 選擇時間型觸發條件類型
   - 設定執行時間
5. 點選「儲存」

### 方法 2：透過程式碼建立（程式化設定）

使用 `ScriptApp.newTrigger()` 方法：

```javascript
function createTimeTrigger() {
  ScriptApp.newTrigger('myFunction')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
```

## 時間觸發器的類型

### 1. 每分鐘執行

```javascript
function createMinuteTrigger() {
  ScriptApp.newTrigger('checkUpdates')
    .timeBased()
    .everyMinutes(5)  // 每 5 分鐘執行一次
    .create();
  
  Logger.log('已建立每 5 分鐘執行的觸發器');
}
```

**可用選項：**
- `everyMinutes(1)` - 每 1 分鐘
- `everyMinutes(5)` - 每 5 分鐘
- `everyMinutes(10)` - 每 10 分鐘
- `everyMinutes(15)` - 每 15 分鐘
- `everyMinutes(30)` - 每 30 分鐘

### 2. 每小時執行

```javascript
function createHourlyTrigger() {
  ScriptApp.newTrigger('sendHourlyReport')
    .timeBased()
    .everyHours(1)  // 每 1 小時執行一次
    .create();
  
  Logger.log('已建立每小時執行的觸發器');
}
```

**可用選項：**
- `everyHours(1)` - 每 1 小時
- `everyHours(2)` - 每 2 小時
- `everyHours(4)` - 每 4 小時
- `everyHours(6)` - 每 6 小時
- `everyHours(8)` - 每 8 小時
- `everyHours(12)` - 每 12 小時

### 3. 每天執行（特定時間）

```javascript
function createDailyTrigger() {
  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .everyDays(1)
    .atHour(8)  // 早上 8 點執行
    .create();
  
  Logger.log('已建立每天早上 8 點執行的觸發器');
}
```

**時間範圍：**
- `atHour(0)` 到 `atHour(23)` - 指定小時（0-23）
- 實際執行時間會在指定小時的前後 1 小時內隨機執行

### 4. 每週執行（特定星期幾）

```javascript
function createWeeklyTrigger() {
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)  // 每週一
    .atHour(9)  // 早上 9 點
    .create();
  
  Logger.log('已建立每週一早上 9 點執行的觸發器');
}
```

**星期選項：**
- `ScriptApp.WeekDay.MONDAY` - 星期一
- `ScriptApp.WeekDay.TUESDAY` - 星期二
- `ScriptApp.WeekDay.WEDNESDAY` - 星期三
- `ScriptApp.WeekDay.THURSDAY` - 星期四
- `ScriptApp.WeekDay.FRIDAY` - 星期五
- `ScriptApp.WeekDay.SATURDAY` - 星期六
- `ScriptApp.WeekDay.SUNDAY` - 星期日

### 5. 每月執行（特定日期）

```javascript
function createMonthlyTrigger() {
  ScriptApp.newTrigger('sendMonthlyReport')
    .timeBased()
    .onMonthDay(1)  // 每月 1 號
    .atHour(10)  // 早上 10 點
    .create();
  
  Logger.log('已建立每月 1 號早上 10 點執行的觸發器');
}
```

**日期範圍：**
- `onMonthDay(1)` 到 `onMonthDay(31)` - 指定日期
- 如果該月沒有指定日期（如 2 月 30 日），則不會執行

### 6. 特定日期時間執行（一次性）

```javascript
function createSpecificTimeTrigger() {
  var date = new Date('2024-12-25 09:00:00');
  
  ScriptApp.newTrigger('sendChristmasGreeting')
    .timeBased()
    .at(date)
    .create();
  
  Logger.log('已建立 2024-12-25 09:00 執行的觸發器');
}
```

## 完整範例

### 範例 1：每天早上發送課程提醒

```javascript
/**
 * 建立每天早上 8 點發送課程提醒的觸發器
 */
function setupDailyCourseReminder() {
  // 先刪除舊的觸發器（避免重複）
  deleteTriggers('sendDailyCourseReminder');
  
  // 建立新觸發器
  ScriptApp.newTrigger('sendDailyCourseReminder')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  Logger.log('每日課程提醒觸發器已設定');
}

/**
 * 發送每日課程提醒（由觸發器自動執行）
 */
function sendDailyCourseReminder() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('課程表');
  var today = new Date();
  var dayOfWeek = today.getDay(); // 0=週日, 1=週一, ..., 6=週六
  
  // 取得今日課程
  var data = sheet.getDataRange().getValues();
  var todayCourses = [];
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == dayOfWeek) {
      todayCourses.push(data[i][1] + ' - ' + data[i][2]);
    }
  }
  
  if (todayCourses.length > 0) {
    var subject = '今日課程提醒';
    var body = '您好，\n\n今日課程如下：\n\n' + 
               todayCourses.join('\n') + 
               '\n\n請準時出席！';
    
    // 發送給所有學生
    var recipients = getStudentEmails();
    for (var i = 0; i < recipients.length; i++) {
      MailApp.sendEmail(recipients[i], subject, body);
    }
    
    Logger.log('已發送今日課程提醒給 ' + recipients.length + ' 位學生');
  }
}
```

### 範例 2：每週一產生統計報表

```javascript
/**
 * 建立每週一早上 9 點產生統計報表的觸發器
 */
function setupWeeklyReport() {
  deleteTriggers('generateWeeklyReport');
  
  ScriptApp.newTrigger('generateWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  
  Logger.log('每週報表觸發器已設定');
}

/**
 * 產生並發送每週統計報表
 */
function generateWeeklyReport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('簽到記錄');
  var data = sheet.getDataRange().getValues();
  
  // 計算上週統計
  var lastWeek = getLastWeekDateRange();
  var stats = calculateWeeklyStats(data, lastWeek);
  
  // 產生報表內容
  var subject = '上週簽到統計報表';
  var body = '上週簽到統計：\n\n' +
             '總簽到次數：' + stats.total + '\n' +
             '準時次數：' + stats.onTime + '\n' +
             '遲到次數：' + stats.late + '\n' +
             '缺席次數：' + stats.absent + '\n\n' +
             '準時率：' + (stats.onTime / stats.total * 100).toFixed(2) + '%';
  
  // 發送給管理員
  MailApp.sendEmail('admin@example.com', subject, body);
  
  Logger.log('每週報表已發送');
}
```

### 範例 3：每小時檢查並發送通知

```javascript
/**
 * 建立每小時檢查待通知名單的觸發器
 */
function setupHourlyNotification() {
  deleteTriggers('checkAndSendNotifications');
  
  ScriptApp.newTrigger('checkAndSendNotifications')
    .timeBased()
    .everyHours(1)
    .create();
  
  Logger.log('每小時通知檢查觸發器已設定');
}

/**
 * 檢查並發送待通知郵件
 */
function checkAndSendNotifications() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('通知名單');
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
  
  var sentCount = 0;
  
  for (var i = 0; i < data.length; i++) {
    var status = data[i][3];  // 狀態欄位
    
    if (status === '待發送') {
      var name = data[i][0];
      var email = data[i][1];
      var message = data[i][2];
      
      try {
        MailApp.sendEmail(email, '通知', message);
        
        // 更新狀態為已發送
        sheet.getRange(i + 2, 4).setValue('已發送');
        sheet.getRange(i + 2, 5).setValue(new Date());
        
        sentCount++;
        Logger.log('已發送通知給：' + name);
        
      } catch (error) {
        Logger.log('發送失敗：' + name + ' - ' + error.message);
        sheet.getRange(i + 2, 4).setValue('發送失敗');
      }
    }
  }
  
  Logger.log('本次檢查完成，共發送 ' + sentCount + ' 封通知');
}
```

## 管理觸發器

### 查看所有觸發器

```javascript
function listAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  Logger.log('目前共有 ' + triggers.length + ' 個觸發器');
  
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    
    Logger.log('--- 觸發器 ' + (i + 1) + ' ---');
    Logger.log('函式名稱：' + trigger.getHandlerFunction());
    Logger.log('觸發器類型：' + trigger.getEventType());
    Logger.log('觸發器 ID：' + trigger.getUniqueId());
  }
}
```

### 刪除特定函式的所有觸發器

```javascript
function deleteTriggers(functionName) {
  var triggers = ScriptApp.getProjectTriggers();
  var deletedCount = 0;
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
      deletedCount++;
    }
  }
  
  Logger.log('已刪除 ' + deletedCount + ' 個 ' + functionName + ' 的觸發器');
}
```

### 刪除所有觸發器

```javascript
function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  Logger.log('已刪除所有觸發器（共 ' + triggers.length + ' 個）');
}
```

### 根據 ID 刪除觸發器

```javascript
function deleteTriggerById(triggerId) {
  var triggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getUniqueId() === triggerId) {
      ScriptApp.deleteTrigger(triggers[i]);
      Logger.log('已刪除觸發器：' + triggerId);
      return;
    }
  }
  
  Logger.log('找不到觸發器：' + triggerId);
}
```

## 觸發器限制與配額

### 執行時間限制

| 帳號類型 | 每次執行時間限制 |
|---------|----------------|
| 一般 Gmail 帳號 | 6 分鐘 |
| Google Workspace 帳號 | 6 分鐘 |

**注意：** 如果腳本執行超過時間限制，會被強制中斷。

### 觸發器數量限制

| 限制類型 | 數量 |
|---------|------|
| 每個腳本的觸發器數量 | 20 個 |
| 每個使用者的觸發器總數 | 無限制 |

### 執行頻率限制

- **最短間隔**：1 分鐘
- **每日執行次數**：無明確限制，但受總執行時間配額限制

### 總執行時間配額

| 帳號類型 | 每日總執行時間 |
|---------|---------------|
| 一般 Gmail 帳號 | 90 分鐘 |
| Google Workspace 帳號 | 6 小時 |

### 檢查配額使用情況

```javascript
function checkQuotaUsage() {
  // 注意：GAS 沒有直接的 API 可以查詢配額使用情況
  // 需要到 Google Cloud Console 查看
  
  Logger.log('請到以下網址查看配額使用情況：');
  Logger.log('https://console.cloud.google.com/');
}
```

## 觸發器除錯技巧

### 1. 使用 Logger.log() 記錄執行過程

```javascript
function myTriggerFunction() {
  Logger.log('觸發器開始執行：' + new Date());
  
  try {
    // 你的程式碼
    Logger.log('處理完成');
  } catch (error) {
    Logger.log('發生錯誤：' + error.message);
  }
  
  Logger.log('觸發器執行結束');
}
```

### 2. 查看執行記錄

1. 開啟 Apps Script 編輯器
2. 點選左側「執行作業」
3. 查看觸發器的執行歷史記錄

### 3. 錯誤通知設定

1. 點選左側「觸發條件」
2. 點選觸發器旁的「...」選單
3. 選擇「通知」
4. 設定錯誤通知頻率（立即、每天、每週）

### 4. 測試觸發器函式

在設定觸發器前，先手動執行函式測試：

```javascript
function testTriggerFunction() {
  // 手動執行觸發器函式進行測試
  sendDailyCourseReminder();
}
```

### 5. 使用 try-catch 處理錯誤

```javascript
function robustTriggerFunction() {
  try {
    // 主要邏輯
    var result = doSomething();
    Logger.log('執行成功：' + result);
    
  } catch (error) {
    // 錯誤處理
    Logger.log('執行失敗：' + error.message);
    
    // 發送錯誤通知給管理員
    MailApp.sendEmail(
      'admin@example.com',
      '觸發器執行失敗',
      '錯誤訊息：' + error.message + '\n\n' +
      '堆疊追蹤：' + error.stack
    );
  }
}
```

## 最佳實踐

### 1. 避免重複建立觸發器

```javascript
function setupTriggerSafely() {
  // 先刪除舊的觸發器
  deleteTriggers('myFunction');
  
  // 再建立新的觸發器
  ScriptApp.newTrigger('myFunction')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
```

### 2. 使用有意義的函式名稱

```javascript
// ❌ 不好的命名
function func1() { }

// ✅ 好的命名
function sendDailyAttendanceReport() { }
```

### 3. 加入執行記錄

```javascript
function triggerWithLogging() {
  var startTime = new Date();
  Logger.log('開始執行：' + startTime);
  
  try {
    // 執行主要邏輯
    var result = processData();
    
    var endTime = new Date();
    var duration = (endTime - startTime) / 1000;
    
    Logger.log('執行完成，耗時：' + duration + ' 秒');
    Logger.log('處理結果：' + result);
    
  } catch (error) {
    Logger.log('執行失敗：' + error.message);
  }
}
```

### 4. 處理配額限制

```javascript
function sendEmailsWithQuotaCheck() {
  var quota = MailApp.getRemainingDailyQuota();
  
  if (quota < 10) {
    Logger.log('配額不足，停止執行');
    return;
  }
  
  // 繼續執行
  sendEmails();
}
```

### 5. 分批處理大量資料

```javascript
function processBatchData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('資料');
  var data = sheet.getDataRange().getValues();
  
  // 每次只處理 100 筆
  var batchSize = 100;
  var startRow = PropertiesService.getScriptProperties().getProperty('lastProcessedRow') || 1;
  var endRow = Math.min(startRow + batchSize, data.length);
  
  for (var i = startRow; i < endRow; i++) {
    processRow(data[i]);
  }
  
  // 記錄處理進度
  PropertiesService.getScriptProperties().setProperty('lastProcessedRow', endRow);
  
  Logger.log('已處理到第 ' + endRow + ' 列');
}
```

## 常見問題

### Q1: 觸發器沒有執行怎麼辦？

**檢查清單：**
1. 確認觸發器已正確建立（查看「觸發條件」頁面）
2. 檢查函式名稱是否正確
3. 查看「執行作業」是否有錯誤記錄
4. 確認腳本有足夠的權限
5. 檢查是否超過配額限制

### Q2: 觸發器執行時間不準確？

時間驅動觸發器的執行時間會有 ±15 分鐘的誤差，這是正常的。如果需要精確時間，建議使用外部排程服務。

### Q3: 如何讓觸發器在特定時區執行？

```javascript
function setTimezone() {
  // GAS 使用腳本的時區設定
  // 可以在「專案設定」中修改時區
  
  var timezone = Session.getScriptTimeZone();
  Logger.log('目前時區：' + timezone);
}
```

### Q4: 觸發器可以傳遞參數嗎？

觸發器無法直接傳遞參數，但可以使用 PropertiesService 儲存參數：

```javascript
function setupTriggerWithParams() {
  // 儲存參數
  PropertiesService.getScriptProperties().setProperty('recipient', 'user@example.com');
  
  // 建立觸發器
  ScriptApp.newTrigger('sendEmailFromTrigger')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}

function sendEmailFromTrigger() {
  // 讀取參數
  var recipient = PropertiesService.getScriptProperties().getProperty('recipient');
  MailApp.sendEmail(recipient, '通知', '這是自動發送的郵件');
}
```

## 小結

本講義介紹了時間觸發器的核心概念：

✅ **觸發器類型**：時間驅動與事件驅動
✅ **建立方法**：手動設定與程式化建立
✅ **時間選項**：每分鐘、每小時、每天、每週、每月、特定時間
✅ **管理方法**：查看、刪除觸發器
✅ **限制與配額**：執行時間、數量、頻率限制
✅ **除錯技巧**：記錄、錯誤處理、測試方法
✅ **最佳實踐**：避免重複、記錄執行、處理配額

掌握觸發器後，你就能讓 GAS 腳本自動化執行，大幅提升工作效率！

下一步，我們將結合 MailApp 與觸發器，完成「自動寄送通知信」的實作案例。
