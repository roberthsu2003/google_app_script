/**
 * 錯誤處理練習題
 * 
 * 請完成以下 5 個錯誤處理實作範例
 * 每個練習都包含詳細的需求說明
 * 
 * 提示：
 * - 使用 try-catch-finally 處理錯誤
 * - 提供清楚的錯誤訊息
 * - 使用 Logger.log() 記錄除錯資訊
 * - 驗證輸入資料的有效性
 */


// ============================================
// 練習 1: 安全的數學運算
// ============================================

/**
 * 需求：
 * 建立一個安全的計算機函式，能夠處理各種錯誤情況
 * 
 * 功能要求：
 * 1. 支援四則運算：加(+)、減(-)、乘(*)、除(/)
 * 2. 驗證輸入的數字是否有效
 * 3. 處理除以零的錯誤
 * 4. 處理不支援的運算子
 * 5. 回傳計算結果或錯誤訊息
 * 
 * 測試案例：
 * calculate(10, 5, '+')  → 15
 * calculate(10, 5, '-')  → 5
 * calculate(10, 5, '*')  → 50
 * calculate(10, 5, '/')  → 2
 * calculate(10, 0, '/')  → 錯誤：除數不能為零
 * calculate(10, 'a', '+') → 錯誤：參數必須是數字
 * calculate(10, 5, '%')  → 錯誤：不支援的運算子
 */

function calculate(num1, num2, operator) {
  // 請在此實作
  
}

// 測試函式
function testCalculate() {
  Logger.log('=== 練習 1: 安全的數學運算 ===');
  
  // 請取消註解以下測試
  // Logger.log('10 + 5 = ' + calculate(10, 5, '+'));
  // Logger.log('10 - 5 = ' + calculate(10, 5, '-'));
  // Logger.log('10 * 5 = ' + calculate(10, 5, '*'));
  // Logger.log('10 / 5 = ' + calculate(10, 5, '/'));
  // Logger.log('10 / 0 = ' + calculate(10, 0, '/'));
  // Logger.log('10 + "a" = ' + calculate(10, 'a', '+'));
  // Logger.log('10 % 5 = ' + calculate(10, 5, '%'));
}


// ============================================
// 練習 2: 學生成績處理系統
// ============================================

/**
 * 需求：
 * 建立一個學生成績處理函式，包含完整的錯誤處理
 * 
 * 功能要求：
 * 1. 接收學生姓名和成績陣列
 * 2. 驗證姓名不能為空
 * 3. 驗證成績陣列不能為空
 * 4. 驗證每個成績必須在 0-100 之間
 * 5. 計算平均分數
 * 6. 判定等級：90以上優秀、80-89良好、70-79普通、60-69及格、60以下不及格
 * 7. 回傳包含姓名、平均、等級的物件，或錯誤訊息
 * 
 * 測試案例：
 * processStudentGrade('王小明', [85, 90, 88])  → {name: '王小明', average: 87.67, grade: '良好'}
 * processStudentGrade('', [85, 90])           → 錯誤：姓名不能為空
 * processStudentGrade('李小華', [])           → 錯誤：成績陣列不能為空
 * processStudentGrade('陳大同', [85, 105, 90]) → 錯誤：成績必須在 0-100 之間
 */

function processStudentGrade(name, scores) {
  // 請在此實作
  
}

// 測試函式
function testProcessStudentGrade() {
  Logger.log('=== 練習 2: 學生成績處理系統 ===');
  
  // 請取消註解以下測試
  // var result1 = processStudentGrade('王小明', [85, 90, 88]);
  // Logger.log('測試 1: ' + JSON.stringify(result1));
  
  // var result2 = processStudentGrade('', [85, 90]);
  // Logger.log('測試 2: ' + JSON.stringify(result2));
  
  // var result3 = processStudentGrade('李小華', []);
  // Logger.log('測試 3: ' + JSON.stringify(result3));
  
  // var result4 = processStudentGrade('陳大同', [85, 105, 90]);
  // Logger.log('測試 4: ' + JSON.stringify(result4));
  
  // var result5 = processStudentGrade('張小美', [92, 88, 95, 90]);
  // Logger.log('測試 5: ' + JSON.stringify(result5));
}


// ============================================
// 練習 3: 資料格式轉換器
// ============================================

/**
 * 需求：
 * 建立一個 JSON 字串解析函式，能夠安全地處理各種格式錯誤
 * 
 * 功能要求：
 * 1. 接收 JSON 字串並解析為物件
 * 2. 處理 JSON 格式錯誤
 * 3. 驗證解析後的物件包含必要欄位（name 和 age）
 * 4. 驗證 age 必須是正整數
 * 5. 回傳解析後的物件或錯誤訊息
 * 
 * 測試案例：
 * parseUserData('{"name":"王小明","age":20}')  → {success: true, data: {name: '王小明', age: 20}}
 * parseUserData('{"name":"李小華"}')          → 錯誤：缺少必要欄位 age
 * parseUserData('invalid json')              → 錯誤：JSON 格式不正確
 * parseUserData('{"name":"陳大同","age":-5}') → 錯誤：年齡必須是正整數
 */

function parseUserData(jsonString) {
  // 請在此實作
  
}

// 測試函式
function testParseUserData() {
  Logger.log('=== 練習 3: 資料格式轉換器 ===');
  
  // 請取消註解以下測試
  // var test1 = parseUserData('{"name":"王小明","age":20}');
  // Logger.log('測試 1: ' + JSON.stringify(test1));
  
  // var test2 = parseUserData('{"name":"李小華"}');
  // Logger.log('測試 2: ' + JSON.stringify(test2));
  
  // var test3 = parseUserData('invalid json');
  // Logger.log('測試 3: ' + JSON.stringify(test3));
  
  // var test4 = parseUserData('{"name":"陳大同","age":-5}');
  // Logger.log('測試 4: ' + JSON.stringify(test4));
  
  // var test5 = parseUserData('{"name":"張小美","age":25}');
  // Logger.log('測試 5: ' + JSON.stringify(test5));
}


// ============================================
// 練習 4: 陣列資料處理器
// ============================================

/**
 * 需求：
 * 建立一個陣列處理函式，能夠安全地處理各種異常情況
 * 
 * 功能要求：
 * 1. 接收一個數字陣列
 * 2. 驗證輸入是否為陣列
 * 3. 驗證陣列不能為空
 * 4. 過濾掉非數字的元素
 * 5. 計算有效數字的總和、平均值、最大值、最小值
 * 6. 如果沒有有效數字，拋出錯誤
 * 7. 回傳統計結果物件
 * 
 * 測試案例：
 * analyzeNumbers([10, 20, 30, 40])        → {sum: 100, avg: 25, max: 40, min: 10, count: 4}
 * analyzeNumbers([10, 'a', 20, null, 30]) → {sum: 60, avg: 20, max: 30, min: 10, count: 3}
 * analyzeNumbers([])                      → 錯誤：陣列不能為空
 * analyzeNumbers('not array')             → 錯誤：輸入必須是陣列
 * analyzeNumbers(['a', 'b', 'c'])         → 錯誤：陣列中沒有有效的數字
 */

function analyzeNumbers(arr) {
  // 請在此實作
  
}

// 測試函式
function testAnalyzeNumbers() {
  Logger.log('=== 練習 4: 陣列資料處理器 ===');
  
  // 請取消註解以下測試
  // var test1 = analyzeNumbers([10, 20, 30, 40]);
  // Logger.log('測試 1: ' + JSON.stringify(test1));
  
  // var test2 = analyzeNumbers([10, 'a', 20, null, 30]);
  // Logger.log('測試 2: ' + JSON.stringify(test2));
  
  // var test3 = analyzeNumbers([]);
  // Logger.log('測試 3: ' + JSON.stringify(test3));
  
  // var test4 = analyzeNumbers('not array');
  // Logger.log('測試 4: ' + JSON.stringify(test4));
  
  // var test5 = analyzeNumbers(['a', 'b', 'c']);
  // Logger.log('測試 5: ' + JSON.stringify(test5));
}


// ============================================
// 練習 5: 試算表資料讀取器（進階）
// ============================================

/**
 * 需求：
 * 建立一個安全的試算表資料讀取函式
 * 
 * 功能要求：
 * 1. 接收工作表名稱和範圍（選擇性）
 * 2. 嘗試取得指定的工作表
 * 3. 處理工作表不存在的錯誤
 * 4. 處理權限不足的錯誤
 * 5. 如果沒有指定範圍，讀取所有資料
 * 6. 如果指定範圍，驗證範圍格式是否正確
 * 7. 回傳資料或錯誤訊息
 * 
 * 注意：此練習需要在實際的 Google Sheets 中執行
 * 
 * 測試案例：
 * readSheetData('工作表1')           → 成功讀取所有資料
 * readSheetData('工作表1', 'A1:B10') → 成功讀取指定範圍
 * readSheetData('不存在的工作表')     → 錯誤：找不到工作表
 * readSheetData('工作表1', 'XYZ')    → 錯誤：範圍格式不正確
 */

function readSheetData(sheetName, range) {
  // 請在此實作
  // 提示：使用 SpreadsheetApp.getActiveSpreadsheet()
  
}

// 測試函式
function testReadSheetData() {
  Logger.log('=== 練習 5: 試算表資料讀取器 ===');
  
  // 請取消註解以下測試（需要在實際的試算表中執行）
  // var test1 = readSheetData('工作表1');
  // Logger.log('測試 1: ' + JSON.stringify(test1));
  
  // var test2 = readSheetData('不存在的工作表');
  // Logger.log('測試 2: ' + JSON.stringify(test2));
  
  Logger.log('此練習需要在實際的 Google Sheets 中執行');
  Logger.log('請建立一個試算表，並在其中建立名為「工作表1」的工作表');
}


// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  testCalculate();
  Logger.log('\n');
  
  testProcessStudentGrade();
  Logger.log('\n');
  
  testParseUserData();
  Logger.log('\n');
  
  testAnalyzeNumbers();
  Logger.log('\n');
  
  testReadSheetData();
}


// ============================================
// 額外挑戰：錯誤日誌系統
// ============================================

/**
 * 挑戰題：建立一個錯誤日誌系統
 * 
 * 需求：
 * 1. 建立一個全域的錯誤日誌陣列
 * 2. 建立 logError() 函式記錄錯誤
 * 3. 記錄錯誤時間、錯誤訊息、錯誤類型
 * 4. 建立 getErrorLog() 函式取得所有錯誤記錄
 * 5. 建立 clearErrorLog() 函式清除錯誤記錄
 * 6. 在上述練習中整合此錯誤日誌系統
 */

// 全域錯誤日誌
var errorLog = [];

function logError(error, context) {
  // 請在此實作
  
}

function getErrorLog() {
  // 請在此實作
  
}

function clearErrorLog() {
  // 請在此實作
  
}

function testErrorLogSystem() {
  Logger.log('=== 挑戰題: 錯誤日誌系統 ===');
  
  // 請在此實作測試
  
}
