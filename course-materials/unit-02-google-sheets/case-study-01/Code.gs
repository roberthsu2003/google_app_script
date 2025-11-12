/**
 * 學生成績登錄系統
 * 
 * 功能說明：
 * 1. 透過對話框輸入學生成績
 * 2. 自動計算平均分數與等級
 * 3. 套用條件格式化（及格/不及格）
 * 4. 產生班級統計報表
 * 
 * 作者：GAS JavaScript 課程
 * 版本：1.0
 */

// ==================== 主要功能函式 ====================

/**
 * 初始化試算表
 * 建立標題列並套用格式
 */
function initializeSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 設定標題列
  var headers = ['學號', '姓名', '國文', '英文', '數學', '平均', '等級'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // 套用標題列格式
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#cccccc');
  headerRange.setHorizontalAlignment('center');
  
  // 設定欄寬
  sheet.setColumnWidth(1, 100); // 學號
  sheet.setColumnWidth(2, 100); // 姓名
  sheet.setColumnWidth(3, 80);  // 國文
  sheet.setColumnWidth(4, 80);  // 英文
  sheet.setColumnWidth(5, 80);  // 數學
  sheet.setColumnWidth(6, 80);  // 平均
  sheet.setColumnWidth(7, 100); // 等級
  
  Logger.log('試算表初始化完成');
}

/**
 * 顯示成績輸入對話框
 * 收集使用者輸入並處理
 */
function showInputDialog() {
  var ui = SpreadsheetApp.getUi();
  
  try {
    // 輸入學號
    var studentIdResponse = ui.prompt(
      '輸入學生資料 (1/5)',
      '請輸入學號：',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (studentIdResponse.getSelectedButton() !== ui.Button.OK) {
      return; // 使用者取消
    }
    var studentId = studentIdResponse.getResponseText().trim();
    
    // 輸入姓名
    var nameResponse = ui.prompt(
      '輸入學生資料 (2/5)',
      '請輸入姓名：',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (nameResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    var name = nameResponse.getResponseText().trim();
    
    // 輸入國文成績
    var chineseResponse = ui.prompt(
      '輸入學生資料 (3/5)',
      '請輸入國文成績（0-100）：',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (chineseResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    var chinese = chineseResponse.getResponseText().trim();
    
    // 輸入英文成績
    var englishResponse = ui.prompt(
      '輸入學生資料 (4/5)',
      '請輸入英文成績（0-100）：',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (englishResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    var english = englishResponse.getResponseText().trim();
    
    // 輸入數學成績
    var mathResponse = ui.prompt(
      '輸入學生資料 (5/5)',
      '請輸入數學成績（0-100）：',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (mathResponse.getSelectedButton() !== ui.Button.OK) {
      return;
    }
    var math = mathResponse.getResponseText().trim();
    
    // 組合學生資料
    var studentData = {
      studentId: studentId,
      name: name,
      chinese: chinese,
      english: english,
      math: math
    };
    
    // 驗證輸入資料
    var validation = validateInput(studentData);
    if (!validation.isValid) {
      ui.alert('輸入錯誤', validation.message, ui.ButtonSet.OK);
      return;
    }
    
    // 新增學生資料
    addStudent(studentData);
    
    ui.alert('成功', '學生成績已成功登錄！', ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert('錯誤', '發生錯誤：' + error.message, ui.ButtonSet.OK);
    Logger.log('錯誤：' + error.stack);
  }
}

/**
 * 驗證輸入資料
 * @param {Object} data - 學生資料物件
 * @return {Object} 驗證結果 {isValid: boolean, message: string}
 */
function validateInput(data) {
  // 檢查學號
  if (!data.studentId || data.studentId === '') {
    return {
      isValid: false,
      message: '學號不可為空'
    };
  }
  
  // 檢查姓名
  if (!data.name || data.name === '') {
    return {
      isValid: false,
      message: '姓名不可為空'
    };
  }
  
  // 檢查國文成績
  var chinese = parseFloat(data.chinese);
  if (isNaN(chinese) || chinese < 0 || chinese > 100) {
    return {
      isValid: false,
      message: '國文成績必須為 0-100 之間的數字'
    };
  }
  
  // 檢查英文成績
  var english = parseFloat(data.english);
  if (isNaN(english) || english < 0 || english > 100) {
    return {
      isValid: false,
      message: '英文成績必須為 0-100 之間的數字'
    };
  }
  
  // 檢查數學成績
  var math = parseFloat(data.math);
  if (isNaN(math) || math < 0 || math > 100) {
    return {
      isValid: false,
      message: '數學成績必須為 0-100 之間的數字'
    };
  }
  
  return {
    isValid: true,
    message: '驗證通過'
  };
}

/**
 * 計算平均分數
 * @param {number} chinese - 國文成績
 * @param {number} english - 英文成績
 * @param {number} math - 數學成績
 * @return {number} 平均分數（四捨五入到小數點後 2 位）
 */
function calculateAverage(chinese, english, math) {
  var sum = chinese + english + math;
  var average = sum / 3;
  
  // 四捨五入到小數點後 2 位
  return Math.round(average * 100) / 100;
}

/**
 * 判定成績等級
 * @param {number} average - 平均分數
 * @return {string} 等級（優/良/可/待加強）
 */
function determineGrade(average) {
  if (average >= 90) {
    return '優';
  } else if (average >= 80) {
    return '良';
  } else if (average >= 60) {
    return '可';
  } else {
    return '待加強';
  }
}

/**
 * 新增學生資料到試算表
 * @param {Object} studentData - 學生資料物件
 */
function addStudent(studentData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 轉換成績為數字
  var chinese = parseFloat(studentData.chinese);
  var english = parseFloat(studentData.english);
  var math = parseFloat(studentData.math);
  
  // 計算平均與等級
  var average = calculateAverage(chinese, english, math);
  var grade = determineGrade(average);
  
  // 取得下一個空白列
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;
  
  // 準備資料陣列
  var rowData = [
    studentData.studentId,
    studentData.name,
    chinese,
    english,
    math,
    average,
    grade
  ];
  
  // 寫入資料
  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
  
  // 套用格式
  applyFormatting(newRow);
  
  Logger.log('已新增學生：' + studentData.name + '（' + studentData.studentId + '）');
}

/**
 * 套用條件格式化
 * @param {number} row - 要格式化的列號
 */
function applyFormatting(row) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 成績欄位（國文、英文、數學）
  var scoreColumns = [3, 4, 5]; // C, D, E 欄
  
  for (var i = 0; i < scoreColumns.length; i++) {
    var col = scoreColumns[i];
    var cell = sheet.getRange(row, col);
    var score = cell.getValue();
    
    // 設定背景顏色
    if (score >= 60) {
      cell.setBackground('#d9ead3'); // 淡綠色（及格）
    } else {
      cell.setBackground('#f4cccc'); // 淡紅色（不及格）
    }
    
    // 置中對齊
    cell.setHorizontalAlignment('center');
  }
  
  // 平均分數欄位也置中
  sheet.getRange(row, 6).setHorizontalAlignment('center');
  sheet.getRange(row, 6).setNumberFormat('0.00');
  
  // 等級欄位置中
  sheet.getRange(row, 7).setHorizontalAlignment('center');
}

/**
 * 產生班級統計報表
 */
function generateStatistics() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  
  try {
    // 取得資料範圍（排除標題列）
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      ui.alert('提示', '目前沒有學生資料，無法產生統計報表', ui.ButtonSet.OK);
      return;
    }
    
    var dataRange = sheet.getRange(2, 1, lastRow - 1, 7);
    var data = dataRange.getValues();
    
    // 初始化統計變數
    var totalStudents = data.length;
    var chineseScores = [];
    var englishScores = [];
    var mathScores = [];
    var gradeCount = {
      '優': 0,
      '良': 0,
      '可': 0,
      '待加強': 0
    };
    
    // 收集資料
    for (var i = 0; i < data.length; i++) {
      chineseScores.push(data[i][2]);
      englishScores.push(data[i][3]);
      mathScores.push(data[i][4]);
      
      var grade = data[i][6];
      if (gradeCount[grade] !== undefined) {
        gradeCount[grade]++;
      }
    }
    
    // 計算統計數據
    var stats = {
      chinese: calculateStats(chineseScores),
      english: calculateStats(englishScores),
      math: calculateStats(mathScores)
    };
    
    // 計算及格率
    var passRate = {
      chinese: calculatePassRate(chineseScores),
      english: calculatePassRate(englishScores),
      math: calculatePassRate(mathScores)
    };
    
    // 建立統計報表訊息
    var message = '=== 班級統計報表 ===\n\n';
    message += '總人數：' + totalStudents + ' 人\n\n';
    
    message += '【國文】\n';
    message += '  平均：' + stats.chinese.average.toFixed(2) + ' 分\n';
    message += '  最高：' + stats.chinese.max + ' 分\n';
    message += '  最低：' + stats.chinese.min + ' 分\n';
    message += '  及格率：' + passRate.chinese.toFixed(1) + '%\n\n';
    
    message += '【英文】\n';
    message += '  平均：' + stats.english.average.toFixed(2) + ' 分\n';
    message += '  最高：' + stats.english.max + ' 分\n';
    message += '  最低：' + stats.english.min + ' 分\n';
    message += '  及格率：' + passRate.english.toFixed(1) + '%\n\n';
    
    message += '【數學】\n';
    message += '  平均：' + stats.math.average.toFixed(2) + ' 分\n';
    message += '  最高：' + stats.math.max + ' 分\n';
    message += '  最低：' + stats.math.min + ' 分\n';
    message += '  及格率：' + passRate.math.toFixed(1) + '%\n\n';
    
    message += '【等級分布】\n';
    message += '  優：' + gradeCount['優'] + ' 人 (' + (gradeCount['優'] / totalStudents * 100).toFixed(1) + '%)\n';
    message += '  良：' + gradeCount['良'] + ' 人 (' + (gradeCount['良'] / totalStudents * 100).toFixed(1) + '%)\n';
    message += '  可：' + gradeCount['可'] + ' 人 (' + (gradeCount['可'] / totalStudents * 100).toFixed(1) + '%)\n';
    message += '  待加強：' + gradeCount['待加強'] + ' 人 (' + (gradeCount['待加強'] / totalStudents * 100).toFixed(1) + '%)\n';
    
    // 顯示統計報表
    ui.alert('班級統計報表', message, ui.ButtonSet.OK);
    
    Logger.log('統計報表已產生');
    
  } catch (error) {
    ui.alert('錯誤', '產生統計報表時發生錯誤：' + error.message, ui.ButtonSet.OK);
    Logger.log('錯誤：' + error.stack);
  }
}

/**
 * 計算統計數據（平均、最高、最低）
 * @param {Array} scores - 成績陣列
 * @return {Object} 統計數據物件
 */
function calculateStats(scores) {
  var sum = 0;
  var max = scores[0];
  var min = scores[0];
  
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
    if (scores[i] > max) {
      max = scores[i];
    }
    if (scores[i] < min) {
      min = scores[i];
    }
  }
  
  var average = sum / scores.length;
  
  return {
    average: average,
    max: max,
    min: min
  };
}

/**
 * 計算及格率
 * @param {Array} scores - 成績陣列
 * @return {number} 及格率（百分比）
 */
function calculatePassRate(scores) {
  var passCount = 0;
  
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
      passCount++;
    }
  }
  
  return (passCount / scores.length) * 100;
}

// ==================== 選單功能 ====================

/**
 * 建立自訂選單
 * 當試算表開啟時自動執行
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('成績管理系統')
    .addItem('初始化試算表', 'initializeSheet')
    .addItem('新增學生成績', 'showInputDialog')
    .addSeparator()
    .addItem('產生統計報表', 'generateStatistics')
    .addToUi();
}

// ==================== 測試函式 ====================

/**
 * 測試函式：新增範例學生資料
 * 用於快速測試系統功能
 */
function testAddSampleData() {
  var sampleStudents = [
    {studentId: 'S20240001', name: '王小明', chinese: '85', english: '90', math: '88'},
    {studentId: 'S20240002', name: '李小華', chinese: '92', english: '87', math: '95'},
    {studentId: 'S20240003', name: '張小美', chinese: '78', english: '82', math: '75'},
    {studentId: 'S20240004', name: '陳小強', chinese: '65', english: '58', math: '70'},
    {studentId: 'S20240005', name: '林小芳', chinese: '55', english: '62', math: '48'}
  ];
  
  for (var i = 0; i < sampleStudents.length; i++) {
    addStudent(sampleStudents[i]);
  }
  
  Logger.log('已新增 ' + sampleStudents.length + ' 筆範例資料');
}
