/**
 * 第一個 Google Apps Script 程式：Hello World
 * 
 * 這是最簡單的 GAS 程式，用來測試環境是否正常運作
 * 執行後會在「執行記錄」中顯示訊息
 */

function helloWorld() {
  // 使用 Logger.log() 輸出訊息到執行記錄
  Logger.log('Hello, Google Apps Script!');
}

/**
 * 進階範例：顯示當前時間
 * 
 * 這個函式會顯示程式執行的時間
 */
function showCurrentTime() {
  var now = new Date();
  Logger.log('現在時間：' + now);
}

/**
 * 進階範例：簡單的計算
 * 
 * 示範如何進行基本運算並輸出結果
 */
function simpleCalculation() {
  var a = 10;
  var b = 20;
  var sum = a + b;
  
  Logger.log('a = ' + a);
  Logger.log('b = ' + b);
  Logger.log('a + b = ' + sum);
}

/**
 * 進階範例：與 Google Sheets 互動
 * 
 * 這個函式會在試算表的 A1 儲存格寫入 "Hello World"
 * 注意：需要從 Google Sheets 中開啟 GAS 編輯器才能執行
 */
function writeToSheet() {
  // 取得目前作用中的試算表
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 在 A1 儲存格寫入文字
  sheet.getRange('A1').setValue('Hello World');
  
  Logger.log('已在 A1 儲存格寫入 "Hello World"');
}

/**
 * 進階範例：發送測試郵件
 * 
 * 這個函式會發送一封測試郵件給自己
 * 第一次執行時需要授權郵件權限
 */
function sendTestEmail() {
  // 取得目前使用者的 Email
  var email = Session.getActiveUser().getEmail();
  
  // 發送郵件
  MailApp.sendEmail({
    to: email,
    subject: 'GAS 測試郵件',
    body: '這是一封來自 Google Apps Script 的測試郵件！'
  });
  
  Logger.log('測試郵件已發送到：' + email);
}

/**
 * 使用說明：
 * 
 * 1. 基本測試：
 *    - 執行 helloWorld() 函式
 *    - 查看下方「執行記錄」是否顯示訊息
 * 
 * 2. 進階測試：
 *    - 執行 showCurrentTime() 查看時間
 *    - 執行 simpleCalculation() 查看計算結果
 * 
 * 3. Google 服務整合：
 *    - 從 Google Sheets 開啟 GAS 編輯器
 *    - 執行 writeToSheet() 測試寫入功能
 *    - 執行 sendTestEmail() 測試郵件功能（需授權）
 * 
 * 4. 如何執行函式：
 *    - 在編輯器上方選擇要執行的函式名稱
 *    - 點選「執行」按鈕（▶）
 *    - 查看下方「執行記錄」的輸出
 */
