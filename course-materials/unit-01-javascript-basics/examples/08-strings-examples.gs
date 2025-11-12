/**
 * 字串處理範例程式碼
 * 
 * 本檔案包含字串的各種操作範例，包括：
 * - 字串建立與連接
 * - 常用字串方法
 * - 字串搜尋與擷取
 * - 字串轉換
 * - 實務應用
 */

// ============================================
// 範例 1：字串建立與連接
// ============================================

function example01_stringCreation() {
  Logger.log('=== 範例 1：字串建立與連接 ===');
  
  // 不同的引號 ✅
  var str1 = 'Hello';
  var str2 = "World";
  var str3 = 'It\'s a beautiful day';
  var str4 = "He said \"Hello\"";
  
  Logger.log(str1);
  Logger.log(str2);
  Logger.log(str3);
  Logger.log(str4);
  
  // 使用 + 連接 ✅
  var greeting = str1 + ', ' + str2 + '!';
  Logger.log(greeting);
  
  // 連接多個字串 ✅
  var firstName = '王';
  var lastName = '小明';
  var fullName = firstName + lastName;
  Logger.log('全名: ' + fullName);
  
  // 字串與數字連接 ✅
  var age = 18;
  var message = '我今年 ' + age + ' 歲';
  Logger.log(message);
  
  // 使用 += 運算子 ✅
  var text = 'Hello';
  text += ', ';
  text += 'World';
  text += '!';
  Logger.log(text);
}

// ============================================
// 範例 2：字串長度與字元存取
// ============================================

function example02_lengthAndAccess() {
  Logger.log('=== 範例 2：字串長度與字元存取 ===');
  
  var str = 'Hello World';
  
  // 取得長度 ✅
  Logger.log('字串長度: ' + str.length);
  
  // 使用 charAt() ✅
  Logger.log('第 0 個字元: ' + str.charAt(0));
  Logger.log('第 6 個字元: ' + str.charAt(6));
  Logger.log('最後一個字元: ' + str.charAt(str.length - 1));
  
  // 使用括號記法 ✅
  Logger.log('第 0 個字元: ' + str[0]);
  Logger.log('第 6 個字元: ' + str[6]);
  
  // 中文字串 ✅
  var chinese = '你好世界';
  Logger.log('中文字串長度: ' + chinese.length);
  Logger.log('第一個字: ' + chinese.charAt(0));
  
  // 空字串 ✅
  var empty = '';
  Logger.log('空字串長度: ' + empty.length);
}

// ============================================
// 範例 3：字串搜尋
// ============================================

function example03_stringSearch() {
  Logger.log('=== 範例 3：字串搜尋 ===');
  
  var str = 'Hello World, Hello JavaScript';
  
  // indexOf() - 找第一次出現的位置 ✅
  Logger.log('World 的位置: ' + str.indexOf('World'));
  Logger.log('Hello 的位置: ' + str.indexOf('Hello'));
  Logger.log('o 的位置: ' + str.indexOf('o'));
  Logger.log('xyz 的位置: ' + str.indexOf('xyz'));  // -1 表示找不到
  
  // 從指定位置開始搜尋 ✅
  Logger.log('從位置 10 開始找 Hello: ' + str.indexOf('Hello', 10));
  
  // lastIndexOf() - 找最後一次出現的位置 ✅
  Logger.log('最後一個 o 的位置: ' + str.lastIndexOf('o'));
  Logger.log('最後一個 Hello 的位置: ' + str.lastIndexOf('Hello'));
  
  // 檢查字串是否包含某子字串 ✅
  var contains = str.indexOf('JavaScript') !== -1;
  Logger.log('是否包含 JavaScript: ' + contains);
}

// ============================================
// 範例 4：字串擷取
// ============================================

function example04_stringExtraction() {
  Logger.log('=== 範例 4：字串擷取 ===');
  
  var str = 'Hello World JavaScript';
  
  // substring() ✅
  Logger.log('substring(0, 5): ' + str.substring(0, 5));
  Logger.log('substring(6, 11): ' + str.substring(6, 11));
  Logger.log('substring(12): ' + str.substring(12));
  
  // slice() - 支援負數索引 ✅
  Logger.log('slice(0, 5): ' + str.slice(0, 5));
  Logger.log('slice(6, 11): ' + str.slice(6, 11));
  Logger.log('slice(-10): ' + str.slice(-10));  // 從倒數第 10 個開始
  Logger.log('slice(-10, -1): ' + str.slice(-10, -1));
  
  // 實用範例：取得檔案副檔名 ✅
  var filename = 'document.pdf';
  var dotIndex = filename.lastIndexOf('.');
  var extension = filename.substring(dotIndex + 1);
  Logger.log('副檔名: ' + extension);
  
  // 實用範例：取得 Email 的使用者名稱和網域 ✅
  var email = 'example@school.edu';
  var atIndex = email.indexOf('@');
  var username = email.substring(0, atIndex);
  var domain = email.substring(atIndex + 1);
  Logger.log('使用者名稱: ' + username);
  Logger.log('網域: ' + domain);
}

// ============================================
// 範例 5：字串分割與組合
// ============================================

function example05_splitAndJoin() {
  Logger.log('=== 範例 5：字串分割與組合 ===');
  
  // split() - 分割字串 ✅
  var csv = 'apple,banana,orange,grape';
  var fruits = csv.split(',');
  Logger.log('水果陣列: ' + fruits);
  Logger.log('第一個水果: ' + fruits[0]);
  
  // 分割句子為單字 ✅
  var sentence = 'Hello World JavaScript';
  var words = sentence.split(' ');
  Logger.log('單字陣列: ' + words);
  Logger.log('單字數量: ' + words.length);
  
  // 分割每個字元 ✅
  var word = 'Hello';
  var chars = word.split('');
  Logger.log('字元陣列: ' + chars);
  
  // join() - 組合陣列為字串 ✅
  var items = ['apple', 'banana', 'orange'];
  var result1 = items.join(',');
  var result2 = items.join(' - ');
  var result3 = items.join('');
  Logger.log('用逗號連接: ' + result1);
  Logger.log('用 - 連接: ' + result2);
  Logger.log('直接連接: ' + result3);
  
  // 實用範例：反轉字串 ✅
  var original = 'Hello';
  var reversed = original.split('').reverse().join('');
  Logger.log('原字串: ' + original);
  Logger.log('反轉後: ' + reversed);
}

// ============================================
// 範例 6：字串取代
// ============================================

function example06_stringReplace() {
  Logger.log('=== 範例 6：字串取代 ===');
  
  var str = 'Hello World';
  
  // 基本取代（只取代第一個） ✅
  var newStr = str.replace('World', 'JavaScript');
  Logger.log('取代後: ' + newStr);
  Logger.log('原字串: ' + str);  // 原字串不變
  
  // 取代多個相同的字串 ✅
  var text = 'apple apple orange apple';
  var result1 = text.replace('apple', 'banana');  // 只取代第一個
  Logger.log('只取代第一個: ' + result1);
  
  // 使用正規表達式取代全部 ✅
  var result2 = text.replace(/apple/g, 'banana');
  Logger.log('取代全部: ' + result2);
  
  // 實用範例：移除所有空格 ✅
  var withSpaces = 'H e l l o   W o r l d';
  var noSpaces = withSpaces.replace(/ /g, '');
  Logger.log('移除空格: ' + noSpaces);
  
  // 實用範例：取代換行符號 ✅
  var multiLine = 'First\nSecond\nThird';
  var singleLine = multiLine.replace(/\n/g, ' ');
  Logger.log('取代換行: ' + singleLine);
}

// ============================================
// 範例 7：大小寫轉換
// ============================================

function example07_caseConversion() {
  Logger.log('=== 範例 7：大小寫轉換 ===');
  
  var str = 'Hello World';
  
  // 轉大寫 ✅
  Logger.log('大寫: ' + str.toUpperCase());
  
  // 轉小寫 ✅
  Logger.log('小寫: ' + str.toLowerCase());
  
  // 原字串不變 ✅
  Logger.log('原字串: ' + str);
  
  // 實用範例：不區分大小寫的比較 ✅
  var input1 = 'Hello';
  var input2 = 'hello';
  var isEqual = input1.toLowerCase() === input2.toLowerCase();
  Logger.log('不區分大小寫比較: ' + isEqual);
  
  // 實用範例：首字母大寫 ✅
  var name = 'john';
  var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  Logger.log('首字母大寫: ' + capitalized);
  
  // 實用範例：每個單字首字母大寫 ✅
  var sentence = 'hello world javascript';
  var words = sentence.split(' ');
  var capitalizedWords = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  var result = capitalizedWords.join(' ');
  Logger.log('每個單字首字母大寫: ' + result);
}

// ============================================
// 範例 8：移除空白
// ============================================

function example08_trim() {
  Logger.log('=== 範例 8：移除空白 ===');
  
  // trim() - 移除前後空白 ✅
  var str = '  Hello World  ';
  Logger.log('原字串: "' + str + '"');
  Logger.log('trim 後: "' + str.trim() + '"');
  
  // 實用範例：處理使用者輸入 ✅
  var userInput = '  example@email.com  ';
  var email = userInput.trim().toLowerCase();
  Logger.log('處理後的 Email: ' + email);
  
  // 移除所有空白（包括中間） ✅
  var withSpaces = '  H e l l o  ';
  var noSpaces = withSpaces.replace(/ /g, '');
  Logger.log('移除所有空白: "' + noSpaces + '"');
  
  // 實用範例：標準化空白 ✅
  var messy = '  Hello    World   JavaScript  ';
  var clean = messy.trim().replace(/\s+/g, ' ');
  Logger.log('標準化空白: "' + clean + '"');
}

// ============================================
// 範例 9：字串與數字轉換
// ============================================

function example09_typeConversion() {
  Logger.log('=== 範例 9：字串與數字轉換 ===');
  
  // 字串轉數字 ✅
  var str1 = '123';
  var num1 = Number(str1);
  Logger.log('Number(): ' + num1 + ' (型別: ' + typeof num1 + ')');
  
  var str2 = '123.45';
  var num2 = parseInt(str2);
  var num3 = parseFloat(str2);
  Logger.log('parseInt(): ' + num2);
  Logger.log('parseFloat(): ' + num3);
  
  var str3 = '123';
  var num4 = +str3;  // 使用 + 運算子
  Logger.log('+ 運算子: ' + num4);
  
  // 數字轉字串 ✅
  var num = 123;
  var str4 = String(num);
  var str5 = num.toString();
  var str6 = num + '';
  Logger.log('String(): ' + str4 + ' (型別: ' + typeof str4 + ')');
  Logger.log('toString(): ' + str5 + ' (型別: ' + typeof str5 + ')');
  Logger.log('+ 空字串: ' + str6 + ' (型別: ' + typeof str6 + ')');
  
  // 處理無效輸入 ✅
  var invalid = 'abc';
  var result = Number(invalid);
  Logger.log('無效輸入: ' + result);  // NaN
  Logger.log('是否為 NaN: ' + isNaN(result));
}

// ============================================
// 範例 10：實務應用 - Email 驗證
// ============================================

function example10_emailValidation() {
  Logger.log('=== 範例 10：Email 驗證 ===');
  
  function validateEmail(email) {
    // 移除前後空白 ✅
    email = email.trim();
    
    // 檢查是否為空 ✅
    if (email.length === 0) {
      return { valid: false, message: 'Email 不能為空' };
    }
    
    // 檢查是否包含 @ ✅
    var atIndex = email.indexOf('@');
    if (atIndex === -1) {
      return { valid: false, message: '缺少 @ 符號' };
    }
    
    // 檢查 @ 的位置 ✅
    if (atIndex === 0) {
      return { valid: false, message: '@ 不能在開頭' };
    }
    if (atIndex === email.length - 1) {
      return { valid: false, message: '@ 不能在結尾' };
    }
    
    // 檢查是否包含 . ✅
    var dotIndex = email.lastIndexOf('.');
    if (dotIndex === -1) {
      return { valid: false, message: '缺少 . 符號' };
    }
    
    // 檢查 . 在 @ 之後 ✅
    if (dotIndex < atIndex) {
      return { valid: false, message: '. 必須在 @ 之後' };
    }
    
    // 檢查 . 不在最後 ✅
    if (dotIndex === email.length - 1) {
      return { valid: false, message: '. 不能在結尾' };
    }
    
    return { valid: true, message: 'Email 格式正確' };
  }
  
  // 測試各種 Email ✅
  var emails = [
    'example@email.com',
    'invalid-email',
    '@email.com',
    'example@',
    'example.email.com',
    'example@email',
    '  test@email.com  '
  ];
  
  emails.forEach(function(email) {
    var result = validateEmail(email);
    Logger.log(email + ' -> ' + result.message);
  });
}

// ============================================
// 範例 11：實務應用 - 格式化姓名
// ============================================

function example11_formatName() {
  Logger.log('=== 範例 11：格式化姓名 ===');
  
  function formatName(name) {
    // 移除前後空白 ✅
    name = name.trim();
    
    // 轉為小寫 ✅
    name = name.toLowerCase();
    
    // 首字母大寫 ✅
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    return name;
  }
  
  // 測試 ✅
  var names = ['  JOHN  ', 'mary', 'PETER', '  alice  '];
  names.forEach(function(name) {
    Logger.log('"' + name + '" -> "' + formatName(name) + '"');
  });
}

// ============================================
// 範例 12：實務應用 - 產生縮寫
// ============================================

function example12_createAbbreviation() {
  Logger.log('=== 範例 12：產生縮寫 ===');
  
  function createAbbreviation(text) {
    var words = text.split(' ');
    var abbreviation = '';
    
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        abbreviation += words[i].charAt(0).toUpperCase();
      }
    }
    
    return abbreviation;
  }
  
  // 測試 ✅
  Logger.log('Google Apps Script -> ' + createAbbreviation('Google Apps Script'));
  Logger.log('United States -> ' + createAbbreviation('United States'));
  Logger.log('World Health Organization -> ' + createAbbreviation('World Health Organization'));
}

// ============================================
// 範例 13：實務應用 - 隱藏敏感資訊
// ============================================

function example13_maskSensitiveInfo() {
  Logger.log('=== 範例 13：隱藏敏感資訊 ===');
  
  // 隱藏 Email ✅
  function maskEmail(email) {
    var atIndex = email.indexOf('@');
    if (atIndex === -1) return email;
    
    var username = email.substring(0, atIndex);
    var domain = email.substring(atIndex);
    
    var visibleChars = Math.min(2, username.length);
    var masked = username.substring(0, visibleChars) + '***' + domain;
    return masked;
  }
  
  // 隱藏電話號碼 ✅
  function maskPhone(phone) {
    if (phone.length < 4) return phone;
    var visible = phone.slice(-4);
    var masked = '****' + visible;
    return masked;
  }
  
  // 隱藏身分證字號 ✅
  function maskID(id) {
    if (id.length < 6) return id;
    var start = id.substring(0, 3);
    var end = id.slice(-3);
    var masked = start + '****' + end;
    return masked;
  }
  
  // 測試 ✅
  Logger.log('Email: ' + maskEmail('example@email.com'));
  Logger.log('電話: ' + maskPhone('0912345678'));
  Logger.log('身分證: ' + maskID('A123456789'));
}

// ============================================
// 執行所有範例
// ============================================

function runAllExamples() {
  example01_stringCreation();
  Logger.log('\n');
  example02_lengthAndAccess();
  Logger.log('\n');
  example03_stringSearch();
  Logger.log('\n');
  example04_stringExtraction();
  Logger.log('\n');
  example05_splitAndJoin();
  Logger.log('\n');
  example06_stringReplace();
  Logger.log('\n');
  example07_caseConversion();
  Logger.log('\n');
  example08_trim();
  Logger.log('\n');
  example09_typeConversion();
  Logger.log('\n');
  example10_emailValidation();
  Logger.log('\n');
  example11_formatName();
  Logger.log('\n');
  example12_createAbbreviation();
  Logger.log('\n');
  example13_maskSensitiveInfo();
}
