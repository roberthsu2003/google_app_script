/**
 * JSON 資料處理範例
 * 
 * 本檔案包含 JSON 處理的各種範例：
 * - JSON.parse() 和 JSON.stringify()
 * - 存取和遍歷 JSON 資料
 * - 處理巢狀結構
 * - 資料提取和轉換
 * - 錯誤處理
 */

// ==================== JSON.parse() 範例 ====================

/**
 * 範例 1：基本的 JSON 解析
 */
function json01_basicParse() {
  var jsonString = '{"name":"王小明","age":25,"city":"台北"}';
  
  Logger.log('JSON 字串：');
  Logger.log(jsonString);
  Logger.log('');
  
  // 解析為物件
  var obj = JSON.parse(jsonString);
  
  Logger.log('解析後的物件：');
  Logger.log('姓名：' + obj.name);
  Logger.log('年齡：' + obj.age);
  Logger.log('城市：' + obj.city);
}

/**
 * 範例 2：解析陣列
 */
function json02_parseArray() {
  var jsonString = '[{"id":1,"name":"蘋果"},{"id":2,"name":"香蕉"},{"id":3,"name":"橘子"}]';
  
  var fruits = JSON.parse(jsonString);
  
  Logger.log('水果清單：');
  for (var i = 0; i < fruits.length; i++) {
    Logger.log(fruits[i].id + '. ' + fruits[i].name);
  }
}

/**
 * 範例 3：解析 API 回應
 */
function json03_parseApiResponse() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  var response = UrlFetchApp.fetch(url);
  
  // 取得 JSON 字串
  var jsonString = response.getContentText();
  Logger.log('原始 JSON：');
  Logger.log(jsonString.substring(0, 100) + '...');
  Logger.log('');
  
  // 解析為物件
  var user = JSON.parse(jsonString);
  
  Logger.log('使用者資訊：');
  Logger.log('ID：' + user.id);
  Logger.log('姓名：' + user.name);
  Logger.log('Email：' + user.email);
  Logger.log('電話：' + user.phone);
  Logger.log('網站：' + user.website);
}

/**
 * 範例 4：解析巢狀 JSON
 */
function json04_parseNested() {
  var jsonString = JSON.stringify({
    user: {
      name: '王小明',
      contact: {
        email: 'wang@example.com',
        phone: '0912345678'
      },
      address: {
        city: '台北市',
        district: '信義區'
      }
    }
  });
  
  var data = JSON.parse(jsonString);
  
  Logger.log('使用者：' + data.user.name);
  Logger.log('Email：' + data.user.contact.email);
  Logger.log('電話：' + data.user.contact.phone);
  Logger.log('城市：' + data.user.address.city);
  Logger.log('區域：' + data.user.address.district);
}

// ==================== JSON.stringify() 範例 ====================

/**
 * 範例 5：基本的 JSON 轉換
 */
function json05_basicStringify() {
  var user = {
    name: '王小明',
    age: 25,
    email: 'wang@example.com',
    isActive: true
  };
  
  var jsonString = JSON.stringify(user);
  
  Logger.log('物件：');
  Logger.log(user);
  Logger.log('');
  Logger.log('JSON 字串：');
  Logger.log(jsonString);
}

/**
 * 範例 6：格式化 JSON 輸出
 */
function json06_prettyPrint() {
  var data = {
    name: '王小明',
    age: 25,
    hobbies: ['閱讀', '旅遊', '攝影'],
    address: {
      city: '台北',
      district: '信義區'
    }
  };
  
  // 不格式化
  Logger.log('=== 不格式化 ===');
  Logger.log(JSON.stringify(data));
  Logger.log('');
  
  // 格式化（縮排 2 個空格）
  Logger.log('=== 格式化 ===');
  Logger.log(JSON.stringify(data, null, 2));
}

/**
 * 範例 7：轉換陣列為 JSON
 */
function json07_arrayToJson() {
  var students = [
    {id: 1, name: '王小明', score: 85},
    {id: 2, name: '李小華', score: 92},
    {id: 3, name: '張大明', score: 78}
  ];
  
  var jsonString = JSON.stringify(students, null, 2);
  Logger.log(jsonString);
}

/**
 * 範例 8：用於 API 請求
 */
function json08_forApiRequest() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var postData = {
    title: '學習 JSON',
    body: 'JSON 是一種輕量級的資料交換格式',
    userId: 1
  };
  
  Logger.log('要發送的資料：');
  Logger.log(JSON.stringify(postData, null, 2));
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(postData)
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());
  
  Logger.log('');
  Logger.log('伺服器回應：');
  Logger.log('新文章 ID：' + result.id);
}

// ==================== 存取 JSON 資料 ====================

/**
 * 範例 9：點記法存取
 */
function json09_dotNotation() {
  var data = {
    user: {
      name: '王小明',
      age: 25,
      address: {
        city: '台北',
        street: '信義路'
      }
    }
  };
  
  Logger.log('姓名：' + data.user.name);
  Logger.log('年齡：' + data.user.age);
  Logger.log('城市：' + data.user.address.city);
  Logger.log('街道：' + data.user.address.street);
}

/**
 * 範例 10：括號記法存取
 */
function json10_bracketNotation() {
  var data = {
    'user-name': '王小明',
    'email-address': 'wang@example.com',
    'phone-number': '0912345678'
  };
  
  // 包含特殊字元的屬性必須使用括號記法
  Logger.log('姓名：' + data['user-name']);
  Logger.log('Email：' + data['email-address']);
  Logger.log('電話：' + data['phone-number']);
  
  // 動態存取
  var key = 'user-name';
  Logger.log('動態存取：' + data[key]);
}

/**
 * 範例 11：存取陣列元素
 */
function json11_accessArray() {
  var data = {
    students: [
      {id: 1, name: '王小明', score: 85},
      {id: 2, name: '李小華', score: 92},
      {id: 3, name: '張大明', score: 78}
    ]
  };
  
  Logger.log('第一位學生：' + data.students[0].name);
  Logger.log('第二位學生：' + data.students[1].name);
  Logger.log('第三位學生：' + data.students[2].name);
  
  Logger.log('');
  Logger.log('所有學生：');
  for (var i = 0; i < data.students.length; i++) {
    Logger.log((i + 1) + '. ' + data.students[i].name + ' - ' + data.students[i].score + '分');
  }
}

// ==================== 遍歷 JSON 資料 ====================

/**
 * 範例 12：遍歷物件屬性
 */
function json12_iterateObject() {
  var user = {
    name: '王小明',
    age: 25,
    email: 'wang@example.com',
    city: '台北'
  };
  
  Logger.log('=== 使用 for...in ===');
  for (var key in user) {
    Logger.log(key + ': ' + user[key]);
  }
  
  Logger.log('');
  Logger.log('=== 使用 Object.keys() ===');
  var keys = Object.keys(user);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    Logger.log(key + ': ' + user[key]);
  }
}

/**
 * 範例 13：遍歷陣列
 */
function json13_iterateArray() {
  var fruits = [
    {id: 1, name: '蘋果', price: 50},
    {id: 2, name: '香蕉', price: 30},
    {id: 3, name: '橘子', price: 40}
  ];
  
  Logger.log('=== 使用 for 迴圈 ===');
  for (var i = 0; i < fruits.length; i++) {
    Logger.log(fruits[i].name + ': $' + fruits[i].price);
  }
  
  Logger.log('');
  Logger.log('=== 使用 forEach ===');
  fruits.forEach(function(fruit) {
    Logger.log(fruit.name + ': $' + fruit.price);
  });
}

/**
 * 範例 14：遍歷巢狀結構
 */
function json14_iterateNested() {
  var data = {
    departments: [
      {
        name: '業務部',
        employees: [
          {name: '王小明', position: '經理'},
          {name: '李小華', position: '專員'}
        ]
      },
      {
        name: '技術部',
        employees: [
          {name: '張大明', position: '工程師'},
          {name: '陳小美', position: '設計師'}
        ]
      }
    ]
  };
  
  for (var i = 0; i < data.departments.length; i++) {
    var dept = data.departments[i];
    Logger.log('=== ' + dept.name + ' ===');
    
    for (var j = 0; j < dept.employees.length; j++) {
      var emp = dept.employees[j];
      Logger.log('  ' + emp.name + ' - ' + emp.position);
    }
    Logger.log('');
  }
}

// ==================== 資料提取與轉換 ====================

/**
 * 範例 15：提取特定欄位
 */
function json15_extractFields() {
  var url = 'https://jsonplaceholder.typicode.com/users';
  var response = UrlFetchApp.fetch(url);
  var users = JSON.parse(response.getContentText());
  
  // 只提取姓名和 Email
  var simplified = users.map(function(user) {
    return {
      name: user.name,
      email: user.email
    };
  });
  
  Logger.log('簡化後的資料：');
  Logger.log(JSON.stringify(simplified, null, 2));
}

/**
 * 範例 16：過濾資料
 */
function json16_filterData() {
  var students = [
    {name: '王小明', score: 85},
    {name: '李小華', score: 92},
    {name: '張大明', score: 78},
    {name: '陳小美', score: 95}
  ];
  
  // 過濾出分數 >= 90 的學生
  var topStudents = students.filter(function(student) {
    return student.score >= 90;
  });
  
  Logger.log('優秀學生：');
  topStudents.forEach(function(student) {
    Logger.log(student.name + ': ' + student.score + '分');
  });
}

/**
 * 範例 17：資料轉換
 */
function json17_transformData() {
  var apiData = [
    {id: 1, firstName: 'John', lastName: 'Doe', age: 30},
    {id: 2, firstName: 'Jane', lastName: 'Smith', age: 25}
  ];
  
  // 轉換為不同格式
  var transformed = apiData.map(function(person) {
    return {
      userId: person.id,
      fullName: person.firstName + ' ' + person.lastName,
      isAdult: person.age >= 18
    };
  });
  
  Logger.log(JSON.stringify(transformed, null, 2));
}

/**
 * 範例 18：計算統計資料
 */
function json18_calculateStats() {
  var products = [
    {name: '產品A', price: 100, quantity: 5},
    {name: '產品B', price: 200, quantity: 3},
    {name: '產品C', price: 150, quantity: 4}
  ];
  
  // 計算總金額
  var total = products.reduce(function(sum, product) {
    return sum + (product.price * product.quantity);
  }, 0);
  
  Logger.log('產品清單：');
  products.forEach(function(product) {
    var subtotal = product.price * product.quantity;
    Logger.log(product.name + ': $' + product.price + ' x ' + product.quantity + ' = $' + subtotal);
  });
  Logger.log('');
  Logger.log('總金額：$' + total);
}

// ==================== 錯誤處理 ====================

/**
 * 範例 19：JSON 解析錯誤處理
 */
function json19_parseError() {
  var invalidJson = '{name: "John"}';  // 無效的 JSON（鍵沒有雙引號）
  
  try {
    var obj = JSON.parse(invalidJson);
    Logger.log(obj);
  } catch (error) {
    Logger.log('❌ JSON 解析失敗');
    Logger.log('錯誤訊息：' + error.message);
    Logger.log('');
    Logger.log('正確的 JSON 格式應該是：');
    Logger.log('{"name": "John"}');
  }
}

/**
 * 範例 20：安全的 JSON 解析
 */
function json20_safeParse(jsonString, defaultValue) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    Logger.log('⚠️ JSON 解析失敗，使用預設值');
    return defaultValue;
  }
}

function json20_useSafeParse() {
  var validJson = '{"name":"John"}';
  var invalidJson = '{name: "John"}';
  
  var result1 = json20_safeParse(validJson, {name: '未知'});
  Logger.log('有效 JSON：' + result1.name);
  
  var result2 = json20_safeParse(invalidJson, {name: '未知'});
  Logger.log('無效 JSON：' + result2.name);
}

/**
 * 範例 21：處理 undefined 屬性
 */
function json21_handleUndefined() {
  var data = {
    name: '王小明',
    email: 'wang@example.com'
    // 沒有 phone 屬性
  };
  
  Logger.log('姓名：' + data.name);
  Logger.log('Email：' + data.email);
  
  // ❌ 直接存取會得到 undefined
  Logger.log('電話（直接存取）：' + data.phone);
  
  // ✅ 使用條件判斷
  if (data.phone) {
    Logger.log('電話（條件判斷）：' + data.phone);
  } else {
    Logger.log('電話（條件判斷）：未提供');
  }
  
  // ✅ 使用預設值
  var phone = data.phone || '未提供';
  Logger.log('電話（預設值）：' + phone);
}

/**
 * 範例 22：處理 null 值
 */
function json22_handleNull() {
  var data = {
    name: '王小明',
    phone: null,
    email: 'wang@example.com'
  };
  
  Logger.log('姓名：' + data.name);
  
  if (data.phone === null) {
    Logger.log('電話：未提供（null）');
  } else {
    Logger.log('電話：' + data.phone);
  }
  
  Logger.log('Email：' + data.email);
}

// ==================== 實用函式 ====================

/**
 * 範例 23：安全取值函式
 */
function safeGet(obj, path, defaultValue) {
  var keys = path.split('.');
  var current = obj;
  
  for (var i = 0; i < keys.length; i++) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[keys[i]];
  }
  
  return current !== undefined ? current : defaultValue;
}

function json23_useSafeGet() {
  var data = {
    user: {
      name: '王小明',
      address: {
        city: '台北'
      }
    }
  };
  
  Logger.log('姓名：' + safeGet(data, 'user.name', '未知'));
  Logger.log('城市：' + safeGet(data, 'user.address.city', '未知'));
  Logger.log('電話：' + safeGet(data, 'user.phone', '未提供'));
  Logger.log('郵遞區號：' + safeGet(data, 'user.address.zipcode', '未提供'));
}

/**
 * 範例 24：JSON 驗證函式
 */
function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

function json24_validateJson() {
  var tests = [
    '{"name":"John"}',
    '{name: "John"}',
    '["apple","banana"]',
    '[1, 2, 3,]',
    'null',
    'undefined'
  ];
  
  Logger.log('=== JSON 驗證測試 ===');
  tests.forEach(function(test) {
    var isValid = isValidJson(test);
    var symbol = isValid ? '✅' : '❌';
    Logger.log(symbol + ' ' + test);
  });
}

/**
 * 範例 25：深度複製物件
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function json25_deepClone() {
  var original = {
    name: '王小明',
    scores: [85, 90, 88],
    address: {
      city: '台北'
    }
  };
  
  // 深度複製
  var copy = deepClone(original);
  
  // 修改複製的物件
  copy.name = '李小華';
  copy.scores.push(95);
  copy.address.city = '台中';
  
  Logger.log('原始物件：');
  Logger.log(JSON.stringify(original, null, 2));
  Logger.log('');
  Logger.log('複製物件：');
  Logger.log(JSON.stringify(copy, null, 2));
}

// ==================== 實戰範例 ====================

/**
 * 範例 26：處理天氣 API 回應
 */
function json26_processWeatherData() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ 請先設定 WEATHER_API_KEY');
    return;
  }
  
  var city = 'Taipei';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var data = JSON.parse(response.getContentText());
    
    // 提取需要的資訊
    var weather = {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      timestamp: new Date(data.dt * 1000)
    };
    
    Logger.log('=== 天氣資訊 ===');
    Logger.log('城市：' + weather.city);
    Logger.log('溫度：' + weather.temperature + '°C');
    Logger.log('體感溫度：' + weather.feelsLike + '°C');
    Logger.log('濕度：' + weather.humidity + '%');
    Logger.log('天氣：' + weather.description);
    Logger.log('風速：' + weather.windSpeed + ' m/s');
    Logger.log('時間：' + weather.timestamp.toLocaleString('zh-TW'));
    
  } catch (error) {
    Logger.log('❌ 錯誤：' + error.message);
  }
}

/**
 * 範例 27：合併多個 API 的資料
 */
function json27_mergeApiData() {
  // 取得使用者資料
  var userUrl = 'https://jsonplaceholder.typicode.com/users/1';
  var userResponse = UrlFetchApp.fetch(userUrl);
  var user = JSON.parse(userResponse.getContentText());
  
  // 取得該使用者的文章
  var postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';
  var postsResponse = UrlFetchApp.fetch(postsUrl);
  var posts = JSON.parse(postsResponse.getContentText());
  
  // 合併資料
  var result = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company.name
    },
    statistics: {
      totalPosts: posts.length,
      averageTitleLength: posts.reduce(function(sum, post) {
        return sum + post.title.length;
      }, 0) / posts.length
    },
    recentPosts: posts.slice(0, 3).map(function(post) {
      return {
        id: post.id,
        title: post.title
      };
    })
  };
  
  Logger.log('=== 使用者完整資訊 ===');
  Logger.log(JSON.stringify(result, null, 2));
}

/**
 * 範例 28：將 JSON 資料寫入試算表
 */
function json28_writeToSheet() {
  var url = 'https://jsonplaceholder.typicode.com/users';
  var response = UrlFetchApp.fetch(url);
  var users = JSON.parse(response.getContentText());
  
  // 轉換為二維陣列
  var data = users.map(function(user) {
    return [
      user.id,
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website,
      user.company.name,
      user.address.city
    ];
  });
  
  // 加入標題列
  data.unshift(['ID', '姓名', '使用者名稱', 'Email', '電話', '網站', '公司', '城市']);
  
  // 寫入試算表
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('使用者資料') || ss.insertSheet('使用者資料');
  sheet.clear();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  
  // 格式化標題列
  sheet.getRange(1, 1, 1, data[0].length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  
  Logger.log('✅ 已將 ' + (data.length - 1) + ' 筆使用者資料寫入試算表');
}

/**
 * 範例 29：從試算表讀取資料並轉換為 JSON
 */
function json29_sheetToJson() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 第一列是標題
  var headers = data[0];
  
  // 轉換為 JSON 陣列
  var jsonArray = [];
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    jsonArray.push(row);
  }
  
  Logger.log('試算表資料（JSON 格式）：');
  Logger.log(JSON.stringify(jsonArray, null, 2));
  
  return jsonArray;
}

/**
 * 範例 30：建立 JSON 設定檔
 */
function json30_createConfig() {
  var config = {
    app: {
      name: '我的應用程式',
      version: '1.0.0',
      author: '開發者'
    },
    settings: {
      language: 'zh-TW',
      theme: 'light',
      notifications: {
        email: true,
        push: false
      }
    },
    api: {
      endpoints: {
        weather: 'https://api.openweathermap.org/data/2.5/weather',
        users: 'https://jsonplaceholder.typicode.com/users'
      },
      timeout: 30000,
      retries: 3
    }
  };
  
  // 儲存到 PropertiesService
  var props = PropertiesService.getScriptProperties();
  props.setProperty('APP_CONFIG', JSON.stringify(config));
  
  Logger.log('✅ 設定檔已儲存');
  Logger.log('');
  Logger.log('設定內容：');
  Logger.log(JSON.stringify(config, null, 2));
}

function json30_readConfig() {
  var props = PropertiesService.getScriptProperties();
  var configString = props.getProperty('APP_CONFIG');
  
  if (configString) {
    var config = JSON.parse(configString);
    
    Logger.log('=== 應用程式設定 ===');
    Logger.log('名稱：' + config.app.name);
    Logger.log('版本：' + config.app.version);
    Logger.log('語言：' + config.settings.language);
    Logger.log('主題：' + config.settings.theme);
    Logger.log('Email 通知：' + (config.settings.notifications.email ? '開啟' : '關閉'));
    Logger.log('API 逾時：' + config.api.timeout + 'ms');
  } else {
    Logger.log('❌ 找不到設定檔');
  }
}
