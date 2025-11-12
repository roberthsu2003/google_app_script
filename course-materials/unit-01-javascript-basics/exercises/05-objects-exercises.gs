/**
 * 物件操作練習題
 * 
 * 請完成以下 10 個練習題，每題都有詳細說明
 * 完成後可以執行對應的測試函式來檢查答案
 */

// ============================================
// 練習 1：建立學生物件
// ============================================
/**
 * 建立一個學生物件，包含以下屬性：
 * - name: '你的名字'
 * - studentId: '學號'
 * - grade: '年級'
 * - email: 'Email'
 * 
 * 提示：使用物件字面量 { }
 */

function exercise01() {
  // 請在此處撰寫你的程式碼
  var student = {
    // 在此新增屬性
  };
  
  return student;
}

// 測試函式
function test01() {
  var result = exercise01();
  Logger.log('練習 1 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 2：存取與修改物件屬性
// ============================================
/**
 * 給定一個產品物件，請完成以下操作：
 * 1. 將價格改為 1200
 * 2. 新增一個屬性 'discount'，值為 0.1
 * 3. 刪除 'description' 屬性
 * 4. 回傳修改後的物件
 */

function exercise02() {
  var product = {
    name: '筆記型電腦',
    price: 1000,
    stock: 50,
    description: '高效能筆電'
  };
  
  // 請在此處撰寫你的程式碼
  
  return product;
}

// 測試函式
function test02() {
  var result = exercise02();
  Logger.log('練習 2 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 3：物件方法 - 計算矩形面積
// ============================================
/**
 * 建立一個矩形物件，包含：
 * - width: 寬度
 * - height: 高度
 * - getArea: 方法，回傳面積（寬 × 高）
 * - getPerimeter: 方法，回傳周長（2 × (寬 + 高)）
 */

function exercise03() {
  var rectangle = {
    width: 10,
    height: 5,
    
    // 請在此處新增方法
    getArea: function() {
      // 計算面積
    },
    
    getPerimeter: function() {
      // 計算周長
    }
  };
  
  return rectangle;
}

// 測試函式
function test03() {
  var rect = exercise03();
  Logger.log('面積: ' + rect.getArea());
  Logger.log('周長: ' + rect.getPerimeter());
}

// ============================================
// 練習 4：遍歷物件屬性
// ============================================
/**
 * 給定一個物件，請使用 for...in 迴圈遍歷所有屬性
 * 將每個屬性名稱和值組成字串，格式為 "key: value"
 * 將所有字串放入陣列並回傳
 * 
 * 範例輸入: { name: 'John', age: 25 }
 * 範例輸出: ['name: John', 'age: 25']
 */

function exercise04() {
  var person = {
    name: 'John',
    age: 25,
    city: 'Taipei',
    job: 'Engineer'
  };
  
  var result = [];
  
  // 請在此處撰寫你的程式碼
  
  return result;
}

// 測試函式
function test04() {
  var result = exercise04();
  Logger.log('練習 4 結果: ' + result.join(', '));
}

// ============================================
// 練習 5：JSON 轉換
// ============================================
/**
 * 完成以下任務：
 * 1. 將給定的物件轉為 JSON 字串
 * 2. 將 JSON 字串解析回物件
 * 3. 修改解析後物件的 age 屬性為 26
 * 4. 回傳修改後的物件
 */

function exercise05() {
  var person = {
    name: 'Alice',
    age: 25,
    city: 'Taipei'
  };
  
  // 請在此處撰寫你的程式碼
  
  return person;
}

// 測試函式
function test05() {
  var result = exercise05();
  Logger.log('練習 5 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 6：巢狀物件操作
// ============================================
/**
 * 給定一個包含巢狀物件的學生資料，請完成：
 * 1. 取得學生的城市
 * 2. 計算學生的總分（三科成績相加）
 * 3. 將學生的數學成績改為 95
 * 4. 回傳一個物件，包含 city、totalScore、newMathScore
 */

function exercise06() {
  var student = {
    name: '王小明',
    address: {
      city: '台北市',
      district: '大安區'
    },
    scores: {
      chinese: 85,
      english: 90,
      math: 88
    }
  };
  
  // 請在此處撰寫你的程式碼
  var city = '';
  var totalScore = 0;
  var newMathScore = 0;
  
  return {
    city: city,
    totalScore: totalScore,
    newMathScore: newMathScore
  };
}

// 測試函式
function test06() {
  var result = exercise06();
  Logger.log('練習 6 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 7：物件陣列 - 篩選與計算
// ============================================
/**
 * 給定一個產品陣列，請完成：
 * 1. 篩選出價格大於 500 的產品
 * 2. 計算這些產品的平均價格
 * 3. 回傳一個物件，包含 filteredProducts（陣列）和 averagePrice（數字）
 */

function exercise07() {
  var products = [
    { name: '滑鼠', price: 300 },
    { name: '鍵盤', price: 800 },
    { name: '螢幕', price: 5000 },
    { name: '耳機', price: 600 },
    { name: 'USB', price: 200 }
  ];
  
  // 請在此處撰寫你的程式碼
  var filteredProducts = [];
  var averagePrice = 0;
  
  return {
    filteredProducts: filteredProducts,
    averagePrice: averagePrice
  };
}

// 測試函式
function test07() {
  var result = exercise07();
  Logger.log('篩選後的產品: ' + JSON.stringify(result.filteredProducts));
  Logger.log('平均價格: ' + result.averagePrice);
}

// ============================================
// 練習 8：物件陣列排序
// ============================================
/**
 * 給定一個學生陣列，請依照分數由高到低排序
 * 回傳排序後的陣列
 * 
 * 提示：使用 sort() 方法
 */

function exercise08() {
  var students = [
    { name: '王小明', score: 85 },
    { name: '李小華', score: 92 },
    { name: '張小美', score: 78 },
    { name: '陳大明', score: 95 },
    { name: '林小芳', score: 88 }
  ];
  
  // 請在此處撰寫你的程式碼
  
  return students;
}

// 測試函式
function test08() {
  var result = exercise08();
  result.forEach(function(student, index) {
    Logger.log((index + 1) + '. ' + student.name + ': ' + student.score);
  });
}

// ============================================
// 練習 9：合併物件
// ============================================
/**
 * 給定三個物件，請使用 Object.assign() 將它們合併成一個物件
 * 回傳合併後的物件
 */

function exercise09() {
  var obj1 = { name: '王小明', age: 18 };
  var obj2 = { grade: 'A', score: 92 };
  var obj3 = { email: 'wang@school.edu', phone: '0912345678' };
  
  // 請在此處撰寫你的程式碼
  var merged = {};
  
  return merged;
}

// 測試函式
function test09() {
  var result = exercise09();
  Logger.log('練習 9 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 10：實務應用 - 學生成績統計
// ============================================
/**
 * 給定一個學生陣列，每個學生有三科成績
 * 請為每個學生計算：
 * 1. average: 平均分數（保留兩位小數）
 * 2. grade: 等級（90以上為優，80-89為良，70-79為可，70以下為待加強）
 * 3. passed: 是否及格（平均60分以上為true）
 * 
 * 回傳處理後的學生陣列
 */

function exercise10() {
  var students = [
    { name: '王小明', chinese: 85, english: 90, math: 88 },
    { name: '李小華', chinese: 78, english: 82, math: 85 },
    { name: '張小美', chinese: 92, english: 88, math: 90 },
    { name: '陳大明', chinese: 65, english: 70, math: 68 },
    { name: '林小芳', chinese: 55, english: 60, math: 58 }
  ];
  
  // 請在此處撰寫你的程式碼
  
  return students;
}

// 測試函式
function test10() {
  var result = exercise10();
  result.forEach(function(student) {
    Logger.log(student.name + ': 平均 ' + student.average + 
               ', 等級 ' + student.grade + 
               ', 及格 ' + student.passed);
  });
}

// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  Logger.log('=== 物件操作練習題測試 ===\n');
  
  Logger.log('--- 練習 1 ---');
  test01();
  
  Logger.log('\n--- 練習 2 ---');
  test02();
  
  Logger.log('\n--- 練習 3 ---');
  test03();
  
  Logger.log('\n--- 練習 4 ---');
  test04();
  
  Logger.log('\n--- 練習 5 ---');
  test05();
  
  Logger.log('\n--- 練習 6 ---');
  test06();
  
  Logger.log('\n--- 練習 7 ---');
  test07();
  
  Logger.log('\n--- 練習 8 ---');
  test08();
  
  Logger.log('\n--- 練習 9 ---');
  test09();
  
  Logger.log('\n--- 練習 10 ---');
  test10();
}
