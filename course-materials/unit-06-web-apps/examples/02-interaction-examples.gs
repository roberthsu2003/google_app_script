/**
 * Web App 範例 2：前後端互動
 * 
 * 本範例展示如何使用 google.script.run 進行前後端溝通
 */

/**
 * 範例 2.1：簡單的資料取得
 */
function getMessage() {
  return 'Hello from server!';
}

/**
 * 範例 2.2：傳遞參數
 */
function greetUser(name) {
  return 'Hello, ' + name + '!';
}

/**
 * 範例 2.3：數學運算
 */
function addNumbers(a, b) {
  return a + b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

/**
 * 範例 2.4：處理物件
 */
function processUser(user) {
  Logger.log('收到使用者資料：');
  Logger.log('姓名：' + user.name);
  Logger.log('Email：' + user.email);
  Logger.log('年齡：' + user.age);
  
  return {
    success: true,
    message: '使用者 ' + user.name + ' 已處理',
    timestamp: new Date()
  };
}

/**
 * 範例 2.5：處理陣列
 */
function calculateSum(numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

function getAverage(numbers) {
  var sum = calculateSum(numbers);
  return sum / numbers.length;
}

/**
 * 範例 2.6：回傳複雜物件
 */
function getStudentInfo(studentId) {
  // 模擬資料庫查詢
  var students = {
    '001': {
      id: '001',
      name: '王小明',
      email: 'wang@example.com',
      scores: {
        math: 85,
        english: 90,
        science: 88
      }
    },
    '002': {
      id: '002',
      name: '李小華',
      email: 'lee@example.com',
      scores: {
        math: 92,
        english: 87,
        science: 95
      }
    }
  };
  
  return students[studentId] || null;
}

/**
 * 範例 2.7：錯誤處理
 */
function divideNumbers(a, b) {
  if (b === 0) {
    throw new Error('除數不能為零');
  }
  return a / b;
}

/**
 * 範例 2.8：從試算表讀取資料
 */
function getSheetData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    return {
      success: true,
      data: data,
      rowCount: data.length
    };
  } catch (error) {
    throw new Error('讀取試算表失敗：' + error.message);
  }
}

/**
 * 範例 2.9：寫入試算表
 */
function saveToSheet(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message
    ]);
    
    return {
      success: true,
      message: '資料已儲存'
    };
  } catch (error) {
    throw new Error('儲存失敗：' + error.message);
  }
}

/**
 * 範例 2.10：發送郵件
 */
function sendEmail(recipient, subject, body) {
  try {
    MailApp.sendEmail(recipient, subject, body);
    return {
      success: true,
      message: '郵件已發送至 ' + recipient
    };
  } catch (error) {
    throw new Error('郵件發送失敗：' + error.message);
  }
}

/**
 * 範例 2.11：模擬耗時操作
 */
function longRunningTask() {
  // 模擬耗時操作（實際應用中可能是資料處理、API 呼叫等）
  Utilities.sleep(3000); // 等待 3 秒
  return '任務完成！';
}

/**
 * 範例 2.12：驗證資料
 */
function validateEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email)) {
    throw new Error('Email 格式不正確');
  }
  
  return {
    valid: true,
    email: email
  };
}

/**
 * 範例 2.13：搜尋功能
 */
function searchStudents(keyword) {
  var students = [
    { id: '001', name: '王小明', class: 'A' },
    { id: '002', name: '李小華', class: 'B' },
    { id: '003', name: '張小美', class: 'A' },
    { id: '004', name: '陳大明', class: 'C' }
  ];
  
  var results = students.filter(function(student) {
    return student.name.indexOf(keyword) !== -1 ||
           student.id.indexOf(keyword) !== -1;
  });
  
  return {
    keyword: keyword,
    count: results.length,
    results: results
  };
}

/**
 * 範例 2.14：分頁查詢
 */
function getStudentsPage(page, pageSize) {
  var allStudents = [];
  
  // 產生測試資料
  for (var i = 1; i <= 50; i++) {
    allStudents.push({
      id: String(i).padStart(3, '0'),
      name: '學生 ' + i,
      score: Math.floor(Math.random() * 40) + 60
    });
  }
  
  var start = (page - 1) * pageSize;
  var end = start + pageSize;
  var pageData = allStudents.slice(start, end);
  
  return {
    page: page,
    pageSize: pageSize,
    total: allStudents.length,
    totalPages: Math.ceil(allStudents.length / pageSize),
    data: pageData
  };
}

/**
 * 範例 2.15：檔案上傳處理
 */
function uploadFile(fileData, fileName) {
  try {
    // 解碼 base64 資料
    var blob = Utilities.newBlob(
      Utilities.base64Decode(fileData),
      'application/octet-stream',
      fileName
    );
    
    // 儲存到 Google Drive
    var folder = DriveApp.getRootFolder();
    var file = folder.createFile(blob);
    
    return {
      success: true,
      fileId: file.getId(),
      fileName: file.getName(),
      fileUrl: file.getUrl()
    };
  } catch (error) {
    throw new Error('檔案上傳失敗：' + error.message);
  }
}
