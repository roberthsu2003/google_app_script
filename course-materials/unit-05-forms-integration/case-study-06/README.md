# 實作案例 6：簡易簽到系統

## 專案概述

建立一個簡易的簽到系統，讓學生或員工可以透過 Google Form 進行簽到。系統會自動記錄簽到時間、判斷是否遲到、發送確認郵件，並產生每日統計報表。

## 學習目標

- 整合 FormApp 與表單觸發器
- 實作即時資料處理
- 學習時間判斷邏輯
- 掌握自動化郵件通知
- 練習資料統計與報表產生

## 功能需求

### 核心功能

1. **簽到表單**
   - 姓名輸入
   - Email 輸入
   - 備註欄位（選填）
   - 自動記錄提交時間

2. **自動判斷狀態**
   - 準時：09:00 之前
   - 遲到：09:00 之後
   - 自動標註狀態

3. **確認郵件**
   - 發送簽到確認郵件
   - 包含簽到時間與狀態

4. **每日統計**
   - 統計當日簽到人數
   - 統計準時與遲到人數
   - 產生統計報表

## 資料結構設計

### 試算表結構

**工作表 1：簽到記錄**

| 欄位 | 說明 | 範例 |
|------|------|------|
| 時間戳記 | 表單提交時間 | 2024-01-15 08:45:30 |
| 姓名 | 簽到者姓名 | 王小明 |
| Email | 簽到者 Email | wang@example.com |
| 備註 | 備註說明 | 今天有點塞車 |
| 狀態 | 準時/遲到 | 準時 |
| 簽到時間 | 格式化的時間 | 08:45 |

**工作表 2：每日統計**

| 欄位 | 說明 | 範例 |
|------|------|------|
| 日期 | 統計日期 | 2024-01-15 |
| 總人數 | 簽到總人數 | 25 |
| 準時人數 | 準時簽到人數 | 20 |
| 遲到人數 | 遲到人數 | 5 |
| 準時率 | 準時百分比 | 80% |

## 技術實作

### 1. 建立簽到表單

```javascript
function createAttendanceForm() {
  // 建立表單
  var form = FormApp.create('每日簽到表');
  form.setDescription('請於每日 09:00 前完成簽到');
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  
  // 姓名
  var nameItem = form.addTextItem();
  nameItem.setTitle('姓名');
  nameItem.setRequired(true);
  
  // Email
  var emailItem = form.addTextItem();
  emailItem.setTitle('Email');
  emailItem.setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  emailItem.setValidation(emailValidation);
  
  // 備註
  var noteItem = form.addParagraphTextItem();
  noteItem.setTitle('備註');
  noteItem.setHelpText('如有遲到原因或其他說明，請填寫');
  noteItem.setRequired(false);
  
  // 設定回應目的地
  var ss = SpreadsheetApp.create('簽到系統資料');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  Logger.log('簽到表單已建立');
  Logger.log('表單連結：' + form.getPublishedUrl());
  Logger.log('試算表連結：' + ss.getUrl());
  
  return { form: form, spreadsheet: ss };
}
```

### 2. 設定表單觸發器

```javascript
function setupAttendanceTrigger() {
  // 刪除舊的觸發器
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onAttendanceSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // 建立新的觸發器
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onAttendanceSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  Logger.log('簽到觸發器已建立');
}
```

### 3. 處理簽到提交

```javascript
function onAttendanceSubmit(e) {
  try {
    var sheet = e.range.getSheet();
    var row = e.range.getRow();
    var namedValues = e.namedValues;
    
    // 取得簽到資料
    var timestamp = new Date(namedValues['時間戳記'][0]);
    var name = namedValues['姓名'][0];
    var email = namedValues['Email'][0];
    var note = namedValues['備註'] ? namedValues['備註'][0] : '';
    
    // 判斷狀態（09:00 為準時界線）
    var status = checkAttendanceStatus(timestamp);
    
    // 格式化簽到時間
    var timeStr = Utilities.formatDate(timestamp, 'GMT+8', 'HH:mm');
    
    // 寫入狀態與時間
    var lastCol = sheet.getLastColumn();
    sheet.getRange(row, lastCol + 1).setValue(status);
    sheet.getRange(row, lastCol + 2).setValue(timeStr);
    
    // 設定背景顏色
    if (status === '準時') {
      sheet.getRange(row, 1, 1, lastCol + 2).setBackground('#d4edda');
    } else {
      sheet.getRange(row, 1, 1, lastCol + 2).setBackground('#f8d7da');
    }
    
    // 發送確認郵件
    sendAttendanceConfirmation(name, email, timestamp, status);
    
    Logger.log('簽到處理完成：' + name + ' - ' + status);
    
  } catch (error) {
    Logger.log('錯誤：' + error.message);
  }
}
```

### 4. 判斷簽到狀態

```javascript
function checkAttendanceStatus(timestamp) {
  var hour = timestamp.getHours();
  var minute = timestamp.getMinutes();
  
  // 09:00 之前為準時
  if (hour < 9) {
    return '準時';
  } else if (hour === 9 && minute === 0) {
    return '準時';
  } else {
    return '遲到';
  }
}
```

### 5. 發送確認郵件

```javascript
function sendAttendanceConfirmation(name, email, timestamp, status) {
  var timeStr = Utilities.formatDate(timestamp, 'GMT+8', 'yyyy-MM-dd HH:mm:ss');
  
  var subject = '【簽到確認】' + status;
  var body = name + ' 您好，\n\n' +
             '您的簽到已記錄：\n\n' +
             '簽到時間：' + timeStr + '\n' +
             '狀態：' + status + '\n\n';
  
  if (status === '準時') {
    body += '感謝您準時簽到！';
  } else {
    body += '提醒您下次請準時簽到。';
  }
  
  body += '\n\n此為系統自動發送的郵件。';
  
  MailApp.sendEmail(email, subject, body);
}
```

### 6. 產生每日統計

```javascript
function generateDailyStatistics() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var recordSheet = ss.getSheets()[0]; // 簽到記錄工作表
  
  // 取得或建立統計工作表
  var statsSheet = ss.getSheetByName('每日統計');
  if (!statsSheet) {
    statsSheet = ss.insertSheet('每日統計');
    statsSheet.appendRow(['日期', '總人數', '準時人數', '遲到人數', '準時率']);
  }
  
  // 取得今天的日期
  var today = new Date();
  var todayStr = Utilities.formatDate(today, 'GMT+8', 'yyyy-MM-dd');
  
  // 取得所有簽到記錄
  var data = recordSheet.getDataRange().getValues();
  
  // 統計今天的資料
  var totalCount = 0;
  var onTimeCount = 0;
  var lateCount = 0;
  
  for (var i = 1; i < data.length; i++) {
    var timestamp = data[i][0];
    if (timestamp instanceof Date) {
      var dateStr = Utilities.formatDate(timestamp, 'GMT+8', 'yyyy-MM-dd');
      if (dateStr === todayStr) {
        totalCount++;
        var status = data[i][4]; // 狀態欄位
        if (status === '準時') {
          onTimeCount++;
        } else if (status === '遲到') {
          lateCount++;
        }
      }
    }
  }
  
  // 計算準時率
  var onTimeRate = totalCount > 0 ? (onTimeCount / totalCount * 100).toFixed(1) + '%' : '0%';
  
  // 寫入統計資料
  statsSheet.appendRow([
    todayStr,
    totalCount,
    onTimeCount,
    lateCount,
    onTimeRate
  ]);
  
  Logger.log('每日統計已產生');
  Logger.log('總人數：' + totalCount);
  Logger.log('準時：' + onTimeCount + '，遲到：' + lateCount);
  Logger.log('準時率：' + onTimeRate);
}
```

## 使用說明

### 初始設定

1. 執行 `createAttendanceForm()` 建立簽到表單與試算表
2. 開啟產生的試算表
3. 在試算表的 Apps Script 編輯器中貼上程式碼
4. 執行 `setupAttendanceTrigger()` 設定觸發器
5. 授權必要的權限

### 日常使用

1. 分享表單連結給需要簽到的人員
2. 人員填寫表單完成簽到
3. 系統自動判斷狀態並發送確認郵件
4. 每日執行 `generateDailyStatistics()` 產生統計報表

### 進階功能（選擇性）

1. 設定定時觸發器，每日自動產生統計
2. 新增遲到次數統計
3. 產生月報表
4. 新增請假功能

## 測試方法

### 測試準時簽到

1. 在 09:00 之前提交表單
2. 檢查試算表中的狀態是否為「準時」
3. 檢查背景顏色是否為綠色
4. 檢查是否收到確認郵件

### 測試遲到簽到

1. 在 09:00 之後提交表單
2. 檢查試算表中的狀態是否為「遲到」
3. 檢查背景顏色是否為紅色
4. 檢查是否收到確認郵件

### 測試統計功能

1. 建立多筆測試資料（包含準時與遲到）
2. 執行 `generateDailyStatistics()`
3. 檢查統計工作表中的數據是否正確

## 常見問題

### Q1: 如何修改準時時間？
A: 修改 `checkAttendanceStatus()` 函式中的時間判斷邏輯。

### Q2: 如何防止重複簽到？
A: 表單已設定 `setLimitOneResponsePerUser(true)`，每人每天只能提交一次。

### Q3: 如何匯出簽到記錄？
A: 直接從試算表匯出為 Excel 或 CSV 檔案。

### Q4: 可以新增照片簽到嗎？
A: 可以，在表單中新增檔案上傳題目即可。

## 延伸練習

1. 新增請假功能（請假者不計入遲到）
2. 實作連續準時獎勵機制
3. 新增簽退功能
4. 產生個人簽到記錄查詢功能
5. 新增管理員通知（當遲到人數超過閾值時）

## 相關資源

- FormApp 官方文件
- 表單觸發器說明
- 日期時間處理教學
