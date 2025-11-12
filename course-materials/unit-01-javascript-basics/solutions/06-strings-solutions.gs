/**
 * 字串處理練習題 - 解答
 * 
 * 本檔案包含所有練習題的完整解答與說明
 */

// ============================================
// 練習 1：字串連接與格式化 - 解答
// ============================================

function exercise01() {
  var name = '王小明';
  var age = 18;
  var city = '台北市';
  
  // 使用 + 運算子連接字串
  var introduction = '我是 ' + name + '，今年 ' + age + ' 歲，住在 ' + city + '。';
  
  return introduction;
}

function test01() {
  var result = exercise01();
  Logger.log('練習 1 結果: ' + result);
  // 預期輸出: 我是 王小明，今年 18 歲，住在 台北市。
}

// ============================================
// 練習 2：字串長度與字元存取 - 解答
// ============================================

function exercise02() {
  var str = 'JavaScript';
  
  // 1. 取得字串長度
  var length = str.length;
  
  // 2. 取得第一個字元
  var firstChar = str.charAt(0);
  // 或使用: var firstChar = str[0];
  
  // 3. 取得最後一個字元
  var lastChar = str.charAt(str.length - 1);
  // 或使用: var lastChar = str[str.length - 1];
  
  // 4. 取得中間的字元
  var middleIndex = Math.floor(str.length / 2);
  var middleChar = str.charAt(middleIndex);
  
  return {
    length: length,
    firstChar: firstChar,
    lastChar: lastChar,
    middleChar: middleChar
  };
}

function test02() {
  var result = exercise02();
  Logger.log('練習 2 結果: ' + JSON.stringify(result));
  // 預期輸出: {"length":10,"firstChar":"J","lastChar":"t","middleChar":"S"}
}

// ============================================
// 練習 3：字串搜尋 - 解答
// ============================================

function exercise03() {
  var sentence = 'Google Apps Script is powerful';
  var word = 'Script';
  
  // 使用 indexOf() 搜尋
  var position = sentence.indexOf(word);
  
  return position;
}

function test03() {
  var result = exercise03();
  Logger.log('練習 3 結果: ' + result);
  // 預期輸出: 12
}

// ============================================
// 練習 4：擷取子字串 - 解答
// ============================================

function exercise04() {
  var email = 'student@school.edu';
  
  // 找到 @ 的位置
  var atIndex = email.indexOf('@');
  
  // 1. 擷取使用者名稱（@ 之前）
  var username = email.substring(0, atIndex);
  
  // 2. 擷取網域名稱（@ 之後）
  var domain = email.substring(atIndex + 1);
  
  return {
    username: username,
    domain: domain
  };
}

function test04() {
  var result = exercise04();
  Logger.log('練習 4 結果: ' + JSON.stringify(result));
  // 預期輸出: {"username":"student","domain":"school.edu"}
}

// ============================================
// 練習 5：字串分割與組合 - 解答
// ============================================

function exercise05() {
  var csv = 'apple, banana, orange, grape, mango';
  
  // 1. 分割字串
  var items = csv.split(',');
  
  // 2. 移除每個元素的前後空白
  var trimmedItems = items.map(function(item) {
    return item.trim();
  });
  
  // 3. 重新組合，用 " | " 分隔
  var result = trimmedItems.join(' | ');
  
  return result;
}

function test05() {
  var result = exercise05();
  Logger.log('練習 5 結果: ' + result);
  // 預期輸出: apple | banana | orange | grape | mango
}

// ============================================
// 練習 6：字串取代 - 解答
// ============================================

function exercise06() {
  var sentence = 'I like apple. Apple is my favorite. Apple pie is delicious.';
  
  // 1. 取代所有的 "apple"（不區分大小寫）
  // 使用正規表達式 /apple/gi（g = 全部，i = 不區分大小寫）
  var replaced = sentence.replace(/apple/gi, 'orange');
  
  // 2. 轉為大寫
  var result = replaced.toUpperCase();
  
  return result;
}

function test06() {
  var result = exercise06();
  Logger.log('練習 6 結果: ' + result);
  // 預期輸出: I LIKE ORANGE. ORANGE IS MY FAVORITE. ORANGE PIE IS DELICIOUS.
}

// ============================================
// 練習 7：格式化姓名 - 解答
// ============================================

function exercise07() {
  var names = ['JOHN', 'mary', 'PeTer', 'ALICE', 'bob'];
  
  // 使用 map() 處理每個姓名
  var formattedNames = names.map(function(name) {
    // 轉為小寫
    name = name.toLowerCase();
    
    // 首字母大寫
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    return name;
  });
  
  return formattedNames;
}

function test07() {
  var result = exercise07();
  Logger.log('練習 7 結果: ' + result.join(', '));
  // 預期輸出: John, Mary, Peter, Alice, Bob
}

// ============================================
// 練習 8：實務應用 - 驗證與格式化電話號碼 - 解答
// ============================================

function exercise08() {
  var phones = [
    '0912 345 678',
    '0912-345-678',
    '09123456789',
    '091234567',
    '0987654321'
  ];
  
  function formatPhone(phone) {
    // 1. 移除所有空格和破折號
    var cleaned = phone.replace(/ /g, '').replace(/-/g, '');
    
    // 2. 檢查是否為 10 位數字
    if (cleaned.length !== 10) {
      return '無效的電話號碼';
    }
    
    // 檢查是否全為數字
    if (!/^\d+$/.test(cleaned)) {
      return '無效的電話號碼';
    }
    
    // 3. 格式化為 "0912-345-678"
    var formatted = cleaned.substring(0, 4) + '-' + 
                    cleaned.substring(4, 7) + '-' + 
                    cleaned.substring(7, 10);
    
    return formatted;
  }
  
  // 處理所有電話號碼
  var results = phones.map(function(phone) {
    return formatPhone(phone);
  });
  
  return results;
}

function test08() {
  var result = exercise08();
  Logger.log('練習 8 結果:');
  result.forEach(function(phone, index) {
    Logger.log('電話 ' + (index + 1) + ': ' + phone);
  });
  // 預期輸出:
  // 電話 1: 0912-345-678
  // 電話 2: 0912-345-678
  // 電話 3: 無效的電話號碼
  // 電話 4: 無效的電話號碼
  // 電話 5: 0987-654-321
}

// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  Logger.log('=== 字串處理練習題解答測試 ===\n');
  
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

// ============================================
// 額外說明與學習重點
// ============================================

/**
 * 學習重點總結：
 * 
 * 1. 字串連接：
 *    - 使用 + 運算子連接字串和其他型別
 *    - 使用 += 累加字串
 *    - 模板字串（需 V8 runtime）：`${variable}`
 * 
 * 2. 字串長度與存取：
 *    - length 屬性取得字串長度
 *    - charAt(index) 或 [index] 存取特定位置的字元
 *    - 索引從 0 開始
 * 
 * 3. 字串搜尋：
 *    - indexOf(str)：找第一次出現的位置
 *    - lastIndexOf(str)：找最後一次出現的位置
 *    - 找不到回傳 -1
 * 
 * 4. 字串擷取：
 *    - substring(start, end)：擷取子字串
 *    - slice(start, end)：擷取子字串（支援負數索引）
 *    - 結束位置不包含在結果中
 * 
 * 5. 字串分割與組合：
 *    - split(separator)：分割字串為陣列
 *    - join(separator)：組合陣列為字串
 *    - 常用於處理 CSV 或其他分隔格式
 * 
 * 6. 字串取代：
 *    - replace(old, new)：取代第一個符合的
 *    - replace(/pattern/g, new)：使用正規表達式取代全部
 *    - 原字串不會改變，回傳新字串
 * 
 * 7. 大小寫轉換：
 *    - toUpperCase()：轉大寫
 *    - toLowerCase()：轉小寫
 *    - 常用於不區分大小寫的比較
 * 
 * 8. 移除空白：
 *    - trim()：移除前後空白
 *    - replace(/ /g, '')：移除所有空白
 *    - 常用於處理使用者輸入
 * 
 * 9. 字串與數字轉換：
 *    - Number(str)、parseInt(str)、parseFloat(str)：字串轉數字
 *    - String(num)、num.toString()、num + ''：數字轉字串
 * 
 * 10. 實務技巧：
 *     - 字串是不可變的，方法會回傳新字串
 *     - 使用 map() 處理字串陣列
 *     - 結合多個方法完成複雜的字串處理
 *     - 驗證資料時要考慮各種邊界情況
 */

// ============================================
// 額外練習範例
// ============================================

/**
 * 額外範例 1：反轉字串
 */
function extraExample01_reverseString() {
  var str = 'Hello World';
  var reversed = str.split('').reverse().join('');
  Logger.log('原字串: ' + str);
  Logger.log('反轉後: ' + reversed);
}

/**
 * 額外範例 2：檢查回文
 */
function extraExample02_isPalindrome() {
  function isPalindrome(str) {
    // 轉小寫並移除空格
    str = str.toLowerCase().replace(/ /g, '');
    var reversed = str.split('').reverse().join('');
    return str === reversed;
  }
  
  Logger.log('racecar 是回文: ' + isPalindrome('racecar'));
  Logger.log('hello 是回文: ' + isPalindrome('hello'));
  Logger.log('A man a plan a canal Panama 是回文: ' + 
             isPalindrome('A man a plan a canal Panama'));
}

/**
 * 額外範例 3：計算單字數量
 */
function extraExample03_countWords() {
  var sentence = 'Google Apps Script is a powerful tool';
  var words = sentence.split(' ');
  Logger.log('單字數量: ' + words.length);
  Logger.log('字元數量: ' + sentence.length);
  Logger.log('不含空格的字元數: ' + sentence.replace(/ /g, '').length);
}

/**
 * 額外範例 4：URL 參數解析
 */
function extraExample04_parseURL() {
  var url = 'https://example.com/page?name=John&age=25&city=Taipei';
  
  // 取得參數部分
  var queryString = url.split('?')[1];
  
  // 分割參數
  var params = queryString.split('&');
  
  // 解析為物件
  var result = {};
  params.forEach(function(param) {
    var pair = param.split('=');
    result[pair[0]] = pair[1];
  });
  
  Logger.log('URL 參數: ' + JSON.stringify(result));
}

/**
 * 額外範例 5：產生隨機密碼
 */
function extraExample05_generatePassword() {
  function generatePassword(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    
    return password;
  }
  
  Logger.log('隨機密碼 (8位): ' + generatePassword(8));
  Logger.log('隨機密碼 (12位): ' + generatePassword(12));
}
