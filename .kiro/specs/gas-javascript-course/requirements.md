# 需求文件

## 簡介

本課程旨在設計一門 54 小時的 Google Apps Script（GAS）+ JavaScript 應用型課程，讓學生能夠同時學習 JavaScript 語法並實作真實的自動化與雲端整合應用。課程強調「學語法 + 做產品」並重的教學理念，結合 Google 生態系統，使學生能夠輕鬆實作並在課程結束後具備製作自動化工具或小型 Web App 的能力。

## 術語表

- **GAS (Google Apps Script)**: Google 提供的雲端腳本平台，基於 JavaScript，用於自動化 Google Workspace 服務
- **課程系統 (Course System)**: 本需求文件所描述的完整課程規劃與教材系統
- **學習單元 (Learning Module)**: 課程中的獨立教學單元，包含理論講解與實作練習
- **實作案例 (Practical Case)**: 具體的專案範例，用於展示和練習所學技能
- **教學內容 (Teaching Content)**: 包含講義、範例程式碼、練習題等教材
- **學習者 (Learner)**: 參與本課程的學生
- **教學者 (Instructor)**: 教授本課程的講師

## 需求

### 需求 1

**使用者故事:** 身為課程設計者，我希望建立清晰的課程結構，以便學習者能夠循序漸進地掌握 JavaScript 與 GAS 技能

#### 驗收標準

1. THE 課程系統 SHALL 包含 8 個主要學習單元，涵蓋從基礎到進階的完整學習路徑
2. THE 課程系統 SHALL 為每個學習單元分配合理的時數，總計達到 54 小時
3. WHEN 學習者完成前一單元時，THE 課程系統 SHALL 確保後續單元能夠建立在已學知識之上
4. THE 課程系統 SHALL 在每個單元中整合理論講解與實作練習的比例

### 需求 2

**使用者故事:** 身為學習者，我希望透過實際案例學習，以便能夠理解如何將 JavaScript 語法應用於真實場景

#### 驗收標準

1. THE 課程系統 SHALL 提供至少 10 個完整的實作案例
2. WHEN 學習者進行實作時，THE 課程系統 SHALL 提供每個案例的詳細步驟說明
3. THE 課程系統 SHALL 確保每個實作案例對應到特定的技能學習目標
4. THE 課程系統 SHALL 為每個實作案例提供完整的範例程式碼與註解說明

### 需求 3

**使用者故事:** 身為學習者，我希望學習 Google Sheets 的操作與自動化，以便能夠處理資料管理任務

#### 驗收標準

1. THE 課程系統 SHALL 包含 Google Sheets 基本操作的教學內容，涵蓋讀取、寫入、格式化等功能
2. THE 課程系統 SHALL 提供至少 2 個以 Sheets 為核心的實作案例
3. WHEN 學習者完成 Sheets 單元時，THE 課程系統 SHALL 確保學習者能夠獨立建立資料處理腳本
4. THE 課程系統 SHALL 教授 SpreadsheetApp 服務的常用方法與最佳實踐

### 需求 4

**使用者故事:** 身為學習者，我希望學習自動化通知功能，以便能夠建立自動寄信與提醒系統

#### 驗收標準

1. THE 課程系統 SHALL 包含 MailApp 服務的完整教學內容
2. THE 課程系統 SHALL 教授時間觸發器（Trigger）的設定與應用
3. THE 課程系統 SHALL 提供自動寄送通知信的實作案例
4. WHEN 學習者完成此單元時，THE 課程系統 SHALL 確保學習者能夠設定定時自動執行的腳本

### 需求 5

**使用者故事:** 身為學習者，我希望學習檔案與雲端硬碟操作，以便能夠自動化檔案管理任務

#### 驗收標準

1. THE 課程系統 SHALL 包含 DriveApp 服務的教學內容，涵蓋檔案與資料夾操作
2. THE 課程系統 SHALL 提供雲端硬碟整理助手的實作案例
3. THE 課程系統 SHALL 教授檔案權限管理與分享設定
4. THE 課程系統 SHALL 包含自動產出 PDF 文件的實作教學

### 需求 6

**使用者故事:** 身為學習者，我希望學習 Google Form 整合，以便能夠自動化表單資料收集與處理

#### 驗收標準

1. THE 課程系統 SHALL 包含 FormApp 服務的教學內容
2. THE 課程系統 SHALL 教授表單回應的自動處理與統計分析
3. THE 課程系統 SHALL 提供 Form 與 Sheets 整合的實作案例
4. WHEN 學習者完成此單元時，THE 課程系統 SHALL 確保學習者能夠建立表單觸發的自動化流程

### 需求 7

**使用者故事:** 身為學習者，我希望學習建立 Web App，以便能夠開發具有使用者介面的應用程式

#### 驗收標準

1. THE 課程系統 SHALL 包含 HTML Service 的完整教學內容
2. THE 課程系統 SHALL 教授前端 HTML/CSS/JavaScript 與後端 GAS 的互動方式
3. THE 課程系統 SHALL 提供至少 2 個 Web App 實作案例（簡易簽到系統、檔案上傳管理工具）
4. THE 課程系統 SHALL 教授 Web App 的部署與權限設定

### 需求 8

**使用者故事:** 身為學習者，我希望學習外部 API 整合，以便能夠擴展應用程式的功能

#### 驗收標準

1. THE 課程系統 SHALL 包含 UrlFetchApp 服務的教學內容
2. THE 課程系統 SHALL 教授 JSON 資料格式的解析與處理
3. THE 課程系統 SHALL 提供外部 API 整合的實作案例（天氣查詢 Web App）
4. THE 課程系統 SHALL 教授 API 認證與錯誤處理的最佳實踐

### 需求 9

**使用者故事:** 身為學習者，我希望透過綜合專案整合所學技能，以便能夠獨立開發完整的應用系統

#### 驗收標準

1. THE 課程系統 SHALL 包含至少 1 個綜合實作專案，整合多項已學技能
2. THE 課程系統 SHALL 提供綜合專案的完整開發流程指導
3. WHEN 學習者完成綜合專案時，THE 課程系統 SHALL 確保學習者具備獨立開發能力
4. THE 課程系統 SHALL 包含專案展示與評估的指引

### 需求 10

**使用者故事:** 身為教學者，我希望獲得完整的教學資源，以便能夠有效地教授本課程

#### 驗收標準

1. THE 課程系統 SHALL 為每個學習單元提供詳細的教學大綱
2. THE 課程系統 SHALL 提供每個實作案例的完整程式碼與逐步說明
3. THE 課程系統 SHALL 包含練習題與解答供教學者參考
4. THE 課程系統 SHALL 提供課程時數分配建議與教學節奏指引

### 需求 11

**使用者故事:** 身為課程設計者，我希望確保課程內容符合應用導向的教學目標，以便學習者能夠產出實用的作品

#### 驗收標準

1. THE 課程系統 SHALL 確保每個單元都包含至少 1 個可實際應用的產出
2. THE 課程系統 SHALL 在課程結束時讓學習者完成至少 3 個可展示的完整專案
3. THE 課程系統 SHALL 強調實作時數佔總課程時數的 60% 以上
4. THE 課程系統 SHALL 提供學習者作品集建立的指引

### 需求 12

**使用者故事:** 身為程式初學者，我希望從零開始學習 JavaScript 基礎語法，以便能夠理解並撰寫 GAS 程式碼

#### 驗收標準

1. THE 課程系統 SHALL 包含 JavaScript 變數宣告（var、let、const）的詳細說明，並明確標註 GAS 完全支援 var，部分支援 let 與 const（需啟用 V8 runtime）
2. THE 課程系統 SHALL 教授所有基本資料型別（String、Number、Boolean、Null、Undefined）及其特性，並說明這些型別在 GAS 中完全支援
3. THE 課程系統 SHALL 包含算術、比較、邏輯運算子的完整教學與練習，並標註 GAS 完全支援
4. THE 課程系統 SHALL 提供至少 10 個變數與運算子的練習題
5. WHEN 學習者完成基礎語法單元時，THE 課程系統 SHALL 確保學習者能夠正確宣告變數並進行基本運算
6. THE 課程系統 SHALL 在教材中明確說明 GAS 使用的 JavaScript 版本限制與 V8 runtime 的啟用方式

### 需求 13

**使用者故事:** 身為程式初學者，我希望學習流程控制，以便能夠撰寫具有邏輯判斷的程式

#### 驗收標準

1. THE 課程系統 SHALL 包含 if-else 條件判斷的完整教學，包含單層與多層判斷，並標註 GAS 完全支援
2. THE 課程系統 SHALL 教授 switch-case 語法與適用場景，並標註 GAS 完全支援
3. THE 課程系統 SHALL 包含 for 迴圈、while 迴圈、do-while 迴圈的詳細說明，並標註 GAS 完全支援
4. THE 課程系統 SHALL 教授 break 與 continue 的使用方式，並標註 GAS 完全支援
5. THE 課程系統 SHALL 提供至少 15 個流程控制的練習題，涵蓋各種情境
6. WHEN 學習者完成流程控制單元時，THE 課程系統 SHALL 確保學習者能夠撰寫包含條件判斷與迴圈的程式
7. THE 課程系統 SHALL 說明 for...of 迴圈僅在啟用 V8 runtime 後才支援，並提供替代方案

### 需求 14

**使用者故事:** 身為程式初學者，我希望學習函式的概念與應用，以便能夠組織程式碼並重複使用

#### 驗收標準

1. THE 課程系統 SHALL 包含函式定義、參數傳遞、回傳值的完整說明，並標註 GAS 完全支援傳統函式語法
2. THE 課程系統 SHALL 教授函式命名規範與最佳實踐
3. THE 課程系統 SHALL 包含箭頭函式（Arrow Function）的語法與使用時機，並明確標註此功能僅在啟用 V8 runtime 後才支援
4. THE 課程系統 SHALL 教授函式作用域（Scope）的概念，並標註 GAS 完全支援
5. THE 課程系統 SHALL 提供至少 10 個函式練習題，從簡單到複雜，優先使用 GAS 完全支援的語法
6. WHEN 學習者完成函式單元時，THE 課程系統 SHALL 確保學習者能夠自行定義並呼叫函式

### 需求 15

**使用者故事:** 身為程式初學者，我希望學習陣列操作，以便能夠處理多筆資料

#### 驗收標準

1. THE 課程系統 SHALL 包含陣列的建立、存取、修改的基本操作教學，並標註 GAS 完全支援
2. THE 課程系統 SHALL 教授常用陣列方法（push、pop、shift、unshift、splice、slice），並標註 GAS 完全支援
3. THE 課程系統 SHALL 包含陣列遍歷方法（forEach、map、filter、reduce）的詳細說明，並標註這些方法在 GAS 中完全支援
4. THE 課程系統 SHALL 明確說明 GAS 不支援的陣列方法（如 flat、flatMap、includes 等需 V8 runtime）
5. THE 課程系統 SHALL 教授多維陣列的概念與應用，並標註 GAS 完全支援
6. THE 課程系統 SHALL 提供至少 12 個陣列操作的練習題，使用 GAS 支援的語法
7. WHEN 學習者完成陣列單元時，THE 課程系統 SHALL 確保學習者能夠使用陣列處理批量資料

### 需求 16

**使用者故事:** 身為程式初學者，我希望學習物件的概念與操作，以便能夠組織複雜的資料結構

#### 驗收標準

1. THE 課程系統 SHALL 包含物件的建立、屬性存取、方法定義的完整教學，並標註 GAS 完全支援
2. THE 課程系統 SHALL 教授物件的新增、修改、刪除屬性的操作，並標註 GAS 完全支援
3. THE 課程系統 SHALL 包含物件遍歷（for...in、Object.keys()）的說明，並標註 GAS 完全支援
4. THE 課程系統 SHALL 教授 JSON 格式與物件的轉換（JSON.stringify、JSON.parse），並標註 GAS 完全支援
5. THE 課程系統 SHALL 說明物件解構賦值（Destructuring）與展開運算子（Spread Operator）僅在啟用 V8 runtime 後才支援
6. THE 課程系統 SHALL 提供至少 10 個物件操作的練習題，優先使用 GAS 完全支援的語法
7. WHEN 學習者完成物件單元時，THE 課程系統 SHALL 確保學習者能夠使用物件組織相關資料

### 需求 17

**使用者故事:** 身為程式初學者，我希望學習字串處理，以便能夠操作文字資料

#### 驗收標準

1. THE 課程系統 SHALL 包含字串的建立與連接教學，並標註 GAS 完全支援傳統字串操作
2. THE 課程系統 SHALL 教授模板字串（Template Literals）語法，並明確標註此功能僅在啟用 V8 runtime 後才支援
3. THE 課程系統 SHALL 教授常用字串方法（length、indexOf、substring、slice、split、replace），並標註 GAS 完全支援
4. THE 課程系統 SHALL 包含字串與數字的轉換方法，並標註 GAS 完全支援
5. THE 課程系統 SHALL 提供至少 8 個字串處理的練習題，優先使用 GAS 完全支援的語法
6. WHEN 學習者完成字串單元時，THE 課程系統 SHALL 確保學習者能夠進行基本的文字處理

### 需求 18

**使用者故事:** 身為程式初學者，我希望學習錯誤處理，以便能夠撰寫更穩健的程式

#### 驗收標準

1. THE 課程系統 SHALL 包含 try-catch-finally 語法的完整說明，並標註 GAS 完全支援
2. THE 課程系統 SHALL 教授常見錯誤類型與除錯方法
3. THE 課程系統 SHALL 包含 Logger.log() 與 console.log() 的使用教學，並說明 console.log() 僅在啟用 V8 runtime 後才支援
4. THE 課程系統 SHALL 提供至少 5 個錯誤處理的實作範例
5. WHEN 學習者完成錯誤處理單元時，THE 課程系統 SHALL 確保學習者能夠捕捉並處理程式執行時的錯誤


### 需求 19

**使用者故事:** 身為教學者，我希望教材中清楚標示 GAS 的 JavaScript 語法支援情況，以便學習者了解哪些語法可以直接使用

#### 驗收標準

1. THE 課程系統 SHALL 在每個 JavaScript 語法教學單元中明確標註 GAS 的支援狀態（完全支援、需啟用 V8 runtime、不支援）
2. THE 課程系統 SHALL 提供 GAS V8 runtime 啟用教學，包含啟用步驟與注意事項
3. THE 課程系統 SHALL 為需要 V8 runtime 的語法提供傳統語法的替代方案
4. THE 課程系統 SHALL 建立 GAS JavaScript 語法支援對照表，列出常用語法的支援情況
5. THE 課程系統 SHALL 在範例程式碼中優先使用 GAS 完全支援的語法，確保學習者不會遇到執行錯誤
6. WHEN 教學者教授現代 JavaScript 語法時，THE 課程系統 SHALL 提供清楚的說明，告知學習者該語法在 GAS 中的可用性
