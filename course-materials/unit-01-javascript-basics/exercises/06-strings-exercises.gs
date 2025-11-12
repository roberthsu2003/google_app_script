/**
 * 字串處理練習題
 * 
 * 請完成以下 8 個練習題，每題都有詳細說明
 * 完成後可以執行對應的測試函式來檢查答案
 */

// ============================================
// 練習 1：字串連接與格式化
// ============================================
/**
 * 給定姓名、年齡、城市三個變數
 * 請將它們組合成一個完整的自我介紹句子
 * 格式：「我是 [姓名]，今年 [年齡] 歲，住在 [城市]。」
 * 
 * 提示：使用 + 運算子連接字串
 */

function exercise01() {
  var name = '王小明';
  var age = 18;
  var city = '台北市';
  
  // 請在此處撰寫你的程式碼
  var introduction = '';
  
  return introduction;
}

// 測試函式
function test01() {
  var result = exercise01();
  Logger.log('練習 1 結果: ' + result);
}

// ============================================
// 練習 2：字串長度與字元存取
// ============================================
/**
 * 給定一個字串，請完成以下任務：
 * 1. 取得字串長度
 * 2. 取得第一個字元
 * 3. 取得最後一個字元
 * 4. 取得中間的字元（如果長度是奇數）
 * 
 * 回傳一個物件，包含以上四個資訊
 */

function exercise02() {
  var str = 'JavaScript';
  
  // 請在此處撰寫你的程式碼
  var length = 0;
  var firstChar = '';
  var lastChar = '';
  var middleChar = '';
  
  return {
    length: length,
    firstChar: firstChar,
    lastChar: lastChar,
    middleChar: middleChar
  };
}

// 測試函式
function test02() {
  var result = exercise02();
  Logger.log('練習 2 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 3：字串搜尋
// ============================================
/**
 * 給定一個句子和一個單字
 * 請檢查句子中是否包含該單字
 * 如果包含，回傳該單字第一次出現的位置
 * 如果不包含，回傳 -1
 * 
 * 提示：使用 indexOf()
 */

function exercise03() {
  var sentence = 'Google Apps Script is powerful';
  var word = 'Script';
  
  // 請在此處撰寫你的程式碼
  var position = 0;
  
  return position;
}

// 測試函式
function test03() {
  var result = exercise03();
  Logger.log('練習 3 結果: ' + result);
}

// ============================================
// 練習 4：擷取子字串
// ============================================
/**
 * 給定一個 Email 地址
 * 請分別擷取出：
 * 1. 使用者名稱（@ 之前的部分）
 * 2. 網域名稱（@ 之後的部分）
 * 
 * 提示：使用 indexOf() 和 substring()
 */

function exercise04() {
  var email = 'student@school.edu';
  
  // 請在此處撰寫你的程式碼
  var username = '';
  var domain = '';
  
  return {
    username: username,
    domain: domain
  };
}

// 測試函式
function test04() {
  var result = exercise04();
  Logger.log('練習 4 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 5：字串分割與組合
// ============================================
/**
 * 給定一個 CSV 格式的字串（用逗號分隔）
 * 請完成以下任務：
 * 1. 將字串分割成陣列
 * 2. 移除每個元素的前後空白
 * 3. 將陣列重新組合成字串，用 " | " 分隔
 * 
 * 範例輸入: "apple, banana, orange"
 * 範例輸出: "apple | banana | orange"
 */

function exercise05() {
  var csv = 'apple, banana, orange, grape, mango';
  
  // 請在此處撰寫你的程式碼
  var result = '';
  
  return result;
}

// 測試函式
function test05() {
  var result = exercise05();
  Logger.log('練習 5 結果: ' + result);
}

// ============================================
// 練習 6：字串取代
// ============================================
/**
 * 給定一個句子，請完成以下任務：
 * 1. 將所有的 "apple" 取代為 "orange"
 * 2. 將結果轉為大寫
 * 
 * 提示：使用 replace() 和 toUpperCase()
 * 注意：要取代所有的 "apple"，需要使用正規表達式 /apple/g
 */

function exercise06() {
  var sentence = 'I like apple. Apple is my favorite. Apple pie is delicious.';
  
  // 請在此處撰寫你的程式碼
  var result = '';
  
  return result;
}

// 測試函式
function test06() {
  var result = exercise06();
  Logger.log('練習 6 結果: ' + result);
}

// ============================================
// 練習 7：格式化姓名
// ============================================
/**
 * 給定一個姓名陣列，每個姓名的格式可能不一致
 * 請將所有姓名格式化為：首字母大寫，其餘小寫
 * 
 * 範例輸入: ["JOHN", "mary", "PeTer"]
 * 範例輸出: ["John", "Mary", "Peter"]
 * 
 * 提示：
 * 1. 使用 map() 處理陣列
 * 2. 使用 toLowerCase() 和 toUpperCase()
 * 3. 使用 charAt() 和 slice()
 */

function exercise07() {
  var names = ['JOHN', 'mary', 'PeTer', 'ALICE', 'bob'];
  
  // 請在此處撰寫你的程式碼
  var formattedNames = [];
  
  return formattedNames;
}

// 測試函式
function test07() {
  var result = exercise07();
  Logger.log('練習 7 結果: ' + result.join(', '));
}

// ============================================
// 練習 8：實務應用 - 驗證與格式化電話號碼
// ============================================
/**
 * 給定一個電話號碼字串，請完成以下任務：
 * 1. 移除所有空格和破折號
 * 2. 檢查是否為 10 位數字
 * 3. 如果是，格式化為 "0912-345-678" 的格式
 * 4. 如果不是，回傳 "無效的電話號碼"
 * 
 * 測試資料：
 * - "0912 345 678" -> "0912-345-678"
 * - "0912-345-678" -> "0912-345-678"
 * - "09123456789" -> "無效的電話號碼"（11位）
 * - "091234567" -> "無效的電話號碼"（9位）
 */

function exercise08() {
  var phones = [
    '0912 345 678',
    '0912-345-678',
    '09123456789',
    '091234567',
    '0987654321'
  ];
  
  function formatPhone(phone) {
    // 請在此處撰寫你的程式碼
    
    return '';
  }
  
  // 處理所有電話號碼
  var results = phones.map(function(phone) {
    return formatPhone(phone);
  });
  
  return results;
}

// 測試函式
function test08() {
  var result = exercise08();
  result.forEach(function(phone, index) {
    Logger.log('電話 ' + (index + 1) + ': ' + phone);
  });
}

// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  Logger.log('=== 字串處理練習題測試 ===\n');
  
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
}
