/**
 * Web App 範例 1：基本 Web App
 * 
 * 本範例展示如何建立基本的 Web App
 */

/**
 * 範例 1.1：最簡單的 Web App
 */
function doGet() {
  var html = '<h1>Hello, World!</h1><p>這是我的第一個 Web App</p>';
  return HtmlService.createHtmlOutput(html);
}

/**
 * 範例 1.2：從 HTML 檔案建立
 * 需要先建立 index.html 檔案
 */
function doGet_fromFile() {
  return HtmlService.createHtmlOutputFromFile('index');
}

/**
 * 範例 1.3：設定標題
 */
function doGet_withTitle() {
  var html = '<h1>歡迎</h1><p>這個頁面有自訂標題</p>';
  return HtmlService.createHtmlOutput(html)
    .setTitle('我的 Web App');
}

/**
 * 範例 1.4：處理 URL 參數
 */
function doGet_withParams(e) {
  var name = e.parameter.name || '訪客';
  var age = e.parameter.age || '未知';
  
  var html = '<h1>歡迎，' + name + '！</h1>' +
             '<p>年齡：' + age + '</p>';
  
  return HtmlService.createHtmlOutput(html);
}
// 訪問：https://script.google.com/...?name=John&age=25

/**
 * 範例 1.5：使用範本
 * 需要先建立 template.html 檔案
 */
function doGet_withTemplate() {
  var template = HtmlService.createTemplateFromFile('template');
  
  // 設定範本變數
  template.userName = 'John';
  template.userAge = 25;
  template.currentDate = new Date();
  
  return template.evaluate();
}

/**
 * 範例 1.6：動態產生內容
 */
function doGet_dynamic() {
  var items = ['蘋果', '香蕉', '橘子'];
  
  var html = '<h1>水果清單</h1><ul>';
  items.forEach(function(item) {
    html += '<li>' + item + '</li>';
  });
  html += '</ul>';
  
  return HtmlService.createHtmlOutput(html);
}

/**
 * 範例 1.7：include 函式
 * 用於引入其他 HTML 檔案
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * 範例 1.8：處理 POST 請求
 */
function doPost(e) {
  var name = e.parameter.name;
  var email = e.parameter.email;
  
  Logger.log('收到 POST 資料：');
  Logger.log('姓名：' + name);
  Logger.log('Email：' + email);
  
  var html = '<h1>資料已接收</h1>' +
             '<p>姓名：' + name + '</p>' +
             '<p>Email：' + email + '</p>';
  
  return HtmlService.createHtmlOutput(html);
}

/**
 * 範例 1.9：設定 X-Frame-Options
 */
function doGet_allowFrame() {
  var html = '<h1>這個頁面可以嵌入 iframe</h1>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 範例 1.10：完整的問候頁面
 */
function doGet_greeting(e) {
  var template = HtmlService.createTemplateFromFile('greeting');
  
  // 取得參數
  var name = e.parameter.name || '訪客';
  
  // 設定範本變數
  template.userName = name;
  template.currentTime = Utilities.formatDate(
    new Date(),
    'GMT+8',
    'yyyy-MM-dd HH:mm:ss'
  );
  template.greeting = getGreeting();
  
  return template.evaluate()
    .setTitle('問候頁面');
}

/**
 * 輔助函式：根據時間產生問候語
 */
function getGreeting() {
  var hour = new Date().getHours();
  
  if (hour < 12) {
    return '早安';
  } else if (hour < 18) {
    return '午安';
  } else {
    return '晚安';
  }
}
