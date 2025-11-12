# 實作案例 4：雲端硬碟整理助手

## 專案概述

本專案將開發一個自動化的雲端硬碟整理工具，能夠掃描指定資料夾中的檔案，根據檔案類型自動分類整理，並刪除過期的舊檔案。系統會產生詳細的整理報告，讓使用者清楚了解整理結果。

## 學習目標

完成本專案後，學習者將能夠：

1. 使用 DriveApp 服務掃描和操作雲端硬碟檔案
2. 實作檔案類型識別與分類邏輯
3. 處理日期比較與時間計算
4. 實作檔案移動與刪除功能
5. 產生結構化的報告資料
6. 整合 JavaScript 陣列操作與物件處理

## 專案需求

### 功能需求

1. **資料夾掃描**
   - 掃描指定的雲端硬碟資料夾
   - 列出所有檔案及其基本資訊
   - 支援遞迴掃描子資料夾（選擇性）

2. **檔案分類**
   - 根據檔案副檔名自動分類
   - 支援的分類：
     - 文件類（.doc, .docx, .pdf, .txt）
     - 試算表類（.xls, .xlsx, .csv）
     - 簡報類（.ppt, .pptx）
     - 圖片類（.jpg, .jpeg, .png, .gif）
     - 其他類型

3. **檔案整理**
   - 自動建立分類資料夾
   - 將檔案移動到對應的分類資料夾
   - 保留原始檔案名稱

4. **舊檔案清理**
   - 識別超過指定天數的檔案
   - 將舊檔案移至「待刪除」資料夾或直接刪除
   - 可設定保留天數（預設 90 天）

5. **整理報告**
   - 統計整理的檔案數量
   - 記錄各類型檔案數量
   - 列出已刪除或移動的檔案清單
   - 顯示整理前後的資料夾結構

### 非功能需求

1. **效能**
   - 能處理至少 100 個檔案
   - 執行時間控制在 GAS 限制內（6 分鐘）

2. **錯誤處理**
   - 處理檔案權限不足的情況
   - 處理檔案名稱衝突
   - 記錄錯誤並繼續執行

3. **使用者體驗**
   - 提供清晰的執行進度訊息
   - 產生易讀的報告格式

## 資料結構設計

### 檔案分類對應表

```javascript
var FILE_CATEGORIES = {
  '文件': ['doc', 'docx', 'pdf', 'txt', 'odt'],
  '試算表': ['xls', 'xlsx', 'csv', 'ods'],
  '簡報': ['ppt', 'pptx', 'odp'],
  '圖片': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
  '壓縮檔': ['zip', 'rar', '7z', 'tar', 'gz'],
  '其他': []
};
```

### 整理報告物件

```javascript
var report = {
  startTime: new Date(),
  endTime: null,
  sourceFolder: '來源資料夾名稱',
  totalFiles: 0,
  organizedFiles: 0,
  deletedFiles: 0,
  errorFiles: 0,
  categoryCounts: {
    '文件': 0,
    '試算表': 0,
    '簡報': 0,
    '圖片': 0,
    '壓縮檔': 0,
    '其他': 0
  },
  deletedFilesList: [],
  errorsList: []
};
```

## 系統架構

```
雲端硬碟整理助手
├── 主程式 (organizeMyDrive)
├── 檔案掃描模組 (scanFolder)
├── 檔案分類模組 (categorizeFile)
├── 檔案移動模組 (moveFileToCategory)
├── 舊檔案清理模組 (cleanOldFiles)
└── 報告產生模組 (generateReport)
```

## 使用方式

### 1. 設定來源資料夾

在程式碼中設定要整理的資料夾 ID：

```javascript
var SOURCE_FOLDER_ID = 'your-folder-id-here';
```

### 2. 設定保留天數

設定檔案保留天數（預設 90 天）：

```javascript
var DAYS_TO_KEEP = 90;
```

### 3. 執行整理

執行 `organizeMyDrive()` 函式開始整理。

### 4. 查看報告

整理完成後，報告會記錄在執行日誌中，也可以選擇將報告寄送到指定信箱。

## 預期成果

執行完成後，雲端硬碟資料夾結構將變為：

```
來源資料夾/
├── 文件/
│   ├── report.pdf
│   └── notes.txt
├── 試算表/
│   └── data.xlsx
├── 簡報/
│   └── presentation.pptx
├── 圖片/
│   ├── photo1.jpg
│   └── photo2.png
├── 壓縮檔/
│   └── archive.zip
├── 其他/
│   └── unknown.xyz
└── 待刪除/
    └── old_file.doc (超過 90 天)
```

## 技能整合

本專案整合以下技能：

- **JavaScript 基礎**
  - 變數與常數定義
  - 物件與陣列操作
  - 迴圈與條件判斷
  - 函式定義與呼叫
  - 日期處理

- **DriveApp 服務**
  - 取得資料夾與檔案
  - 建立資料夾
  - 移動檔案
  - 刪除檔案
  - 取得檔案屬性

- **錯誤處理**
  - try-catch 例外處理
  - 錯誤記錄與報告

- **資料處理**
  - 字串處理（副檔名提取）
  - 陣列遍歷與統計
  - 物件屬性操作

## 擴展功能建議

完成基本功能後，可以嘗試以下擴展：

1. **進階分類**
   - 依檔案大小分類
   - 依建立日期分類（年/月）
   - 自訂分類規則

2. **報告增強**
   - 將報告寫入 Google Sheets
   - 產生圖表視覺化
   - 寄送 HTML 格式報告郵件

3. **自動化執行**
   - 設定時間觸發器定期執行
   - 每週自動整理一次

4. **安全機制**
   - 整理前先備份
   - 提供還原功能
   - 確認對話框

5. **效能優化**
   - 批次處理檔案
   - 快取資料夾物件
   - 分段執行大量檔案

## 注意事項

1. **權限要求**
   - 需要 Google Drive 的完整存取權限
   - 確保對目標資料夾有編輯權限

2. **執行限制**
   - GAS 單次執行時間限制為 6 分鐘
   - 處理大量檔案時需要分批執行

3. **資料安全**
   - 建議先在測試資料夾中執行
   - 刪除檔案前請確認設定正確
   - 重要檔案請先備份

4. **檔案衝突**
   - 同名檔案會自動重新命名
   - 建議檢查整理後的結果

## 相關需求

本專案對應課程需求：
- 需求 2.1-2.4：實作案例學習
- 需求 5.1-5.4：DriveApp 服務與檔案操作

## 參考資源

- [DriveApp 官方文件](https://developers.google.com/apps-script/reference/drive/drive-app)
- [File 類別文件](https://developers.google.com/apps-script/reference/drive/file)
- [Folder 類別文件](https://developers.google.com/apps-script/reference/drive/folder)
- [JavaScript Date 物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date)
