# JSON 資料處理

## 學習目標

- 理解 JSON 格式的結構
- 掌握 JSON.parse() 和 JSON.stringify() 的使用
- 學會存取和操作 JSON 資料
- 能夠處理巢狀的 JSON 結構
- 學會從 JSON 中提取所需資料

## 什麼是 JSON？

JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，具有以下特點：

- ✅ 易於人類閱讀和撰寫
- ✅ 易於機器解析和生成
- ✅ 獨立於程式語言（雖然源自 JavaScript）
- ✅ 廣泛用於 Web API 的資料傳輸

### JSON 的應用場景

1. **API 資料傳輸**：大多數 RESTful API 使用 JSON 格式
2. **設定檔**：許多應用程式使用 JSON 儲存設定
3. **資料儲存**：NoSQL 資料庫（如 MongoDB）使用 JSON 格式
4. **前後端通訊**：Web 應用程式的前後端資料交換

## JSON 基本語法

### 資料型別

JSON 支援以下資料型別：

| 型別 | 說明 | 範例 |
|------|------|------|
| 字串 | 必須使用雙引號 | `"Hello"` |
| 數字 | 整數或浮點數 | `42`, `3.14` |
| 布林值 | true 或 false | `true`, `false` |
| null | 空值 | `null` |
| 陣列 | 有序的值列表 | `[1, 2, 3]` |
| 物件 | 鍵值對的集合 | `{"name": "John"}` |

### 基本結構

#### 1. JSON 物件
```json
{
  "name": "王小明",
  "age": 25,
  "isStudent": true,
  "email": "wang@example.com"
}
```

#### 2. JSON 陣列
```json
[
  "蘋果",
  "香蕉",
  "橘子"
]
```

#### 3. 物件陣列
```json
[
  {
    "id": 1,
    "name": "王小明"
  },
  {
    "id": 2,
    "name": "李小華"
  }
]
```

#### 4. 巢狀結構
```json
{
  "user": {
    "name": "王小明",
    "contact": {
      "email": "wang@example.com",
      "phone": "0912345678"
    },
    "hobbies": ["閱讀", "旅遊", "攝影"]
  }
}
```

### JSON 語法規則

✅ **正確的 JSON：**
```json
{
  "name": "John",
  "age": 30,
  "city": "Taipei"
}
```

❌ **錯誤的 JSON：**
```json
{
  name: "John",        // ❌ 鍵必須用雙引號
  'age': 30,           // ❌ 不能使用單引號
  "city": 'Taipei',    // ❌ 值的字串必須用雙引號
  "hobbies": [1, 2, ], // ❌ 不能有尾隨逗號
}                      // ❌ 最後不能有逗號
```

## JSON.parse() - 解析 JSON

`JSON.parse()` 將 JSON 字串轉換為 JavaScript 物件。

### 基本用法

```javascript
var jsonString = '{"name":"王小明","age":25}';
var obj = JSON.parse(jsonString);

Logger.log(obj.name);  // 輸出：王小明
Logger.log(obj.age);   // 輸出：25
```

### 解析 API 回應

```javascript
function parseApiResponse() {
  var url = 'https://jsonplaceholder.typicode.com/users/1';
  var response = UrlFetchApp.fetch(url);
  
  // 取得 JSON 字串
  var jsonString = response.getContentText();
  Logger.log('JSON 字串：' + jsonString);
  
  // 解析為物件
  var user = JSON.parse(jsonString);
  Logger.log('姓名：' + user.name);
  Logger.log('Email：' + user.email);
}
```

### 解析陣列

```javascript
function parseJsonArray() {
  var jsonString = '[{"id":1,"name":"蘋果"},{"id":2,"name":"香蕉"}]';
  var fruits = JSON.parse(jsonString);
  
  for (var i = 0; i < fruits.length; i++) {
    Logger.log(fruits[i].id + '. ' + fruits[i].name);
  }
}
```

### 錯誤處理

```javascript
function parseWithErrorHandling() {
  var invalidJson = '{name: "John"}';  // 無效的 JSON
  
  try {
    var obj = JSON.parse(invalidJson);
    Logger.log(obj);
  } catch (error) {
    Logger.log('❌ JSON 解析失敗：' + error.message);
  }
}
```

## JSON.stringify() - 轉換為 JSON

`JSON.stringify()` 將 JavaScript 物件轉換為 JSON 字串。

### 基本用法

```javascript
var user = {
  name: '王小明',
  age: 25,
  email: 'wang@example.com'
};

var jsonString = JSON.stringify(user);
Logger.log(jsonString);
// 輸出：{"name":"王小明","age":25,"email":"wang@example.com"}
```

### 格式化輸出

```javascript
var user = {
  name: '王小明',
  age: 25
};

// 第三個參數指定縮排空格數
var jsonString = JSON.stringify(user, null, 2);
Logger.log(jsonString);
/* 輸出：
{
  "name": "王小明",
  "age": 25
}
*/
```

### 用於 API 請求

```javascript
function sendJsonData() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  
  var data = {
    title: '我的文章',
    body: '文章內容',
    userId: 1
  };
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)  // 轉換為 JSON 字串
  };
  
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
```

## 存取 JSON 資料

### 點記法（Dot Notation）

```javascript
var user = {
  name: '王小明',
  age: 25,
  address: {
    city: '台北',
    district: '信義區'
  }
};

Logger.log(user.name);              // 王小明
Logger.log(user.address.city);      // 台北
```

### 括號記法（Bracket Notation）

```javascript
var user = {
  'name': '王小明',
  'email-address': 'wang@example.com'  // 包含特殊字元
};

Logger.log(user['name']);            // 王小明
Logger.log(user['email-address']);   // wang@example.com

// 動態存取
var key = 'name';
Logger.log(user[key]);               // 王小明
```

### 存取陣列元素

```javascript
var users = [
  {id: 1, name: '王小明'},
  {id: 2, name: '李小華'}
];

Logger.log(users[0].name);  // 王小明
Logger.log(users[1].name);  // 李小華
```

## 處理巢狀 JSON

### 範例：天氣 API 回應

```javascript
var weatherData = {
  "name": "Taipei",
  "main": {
    "temp": 28.5,
    "humidity": 65
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "多雲"
    }
  ],
  "wind": {
    "speed": 3.5
  }
};

// 存取巢狀資料
Logger.log('城市：' + weatherData.name);
Logger.log('溫度：' + weatherData.main.temp + '°C');
Logger.log('濕度：' + weatherData.main.humidity + '%');
Logger.log('天氣：' + weatherData.weather[0].description);
Logger.log('風速：' + weatherData.wind.speed + ' m/s');
```

### 範例：使用者資料

```javascript
var userData = {
  "id": 1,
  "name": "王小明",
  "address": {
    "street": "信義路五段",
    "city": "台北市",
    "geo": {
      "lat": 25.033,
      "lng": 121.565
    }
  },
  "company": {
    "name": "科技公司",
    "catchPhrase": "創新科技"
  }
};

// 存取深層巢狀資料
Logger.log('姓名：' + userData.name);
Logger.log('城市：' + userData.address.city);
Logger.log('緯度：' + userData.address.geo.lat);
Logger.log('公司：' + userData.company.name);
```

## 遍歷 JSON 資料

### 遍歷物件屬性

```javascript
var user = {
  name: '王小明',
  age: 25,
  email: 'wang@example.com'
};

// 使用 for...in
for (var key in user) {
  Logger.log(key + ': ' + user[key]);
}

// 使用 Object.keys()
var keys = Object.keys(user);
for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  Logger.log(key + ': ' + user[key]);
}
```

### 遍歷陣列

```javascript
var users = [
  {id: 1, name: '王小明'},
  {id: 2, name: '李小華'},
  {id: 3, name: '張大明'}
];

// 使用 for 迴圈
for (var i = 0; i < users.length; i++) {
  Logger.log(users[i].id + '. ' + users[i].name);
}

// 使用 forEach
users.forEach(function(user) {
  Logger.log(user.id + '. ' + user.name);
});
```

## 資料提取與轉換

### 提取特定欄位

```javascript
function extractFields() {
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
  
  Logger.log(JSON.stringify(simplified, null, 2));
}
```

### 過濾資料

```javascript
function filterData() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  var response = UrlFetchApp.fetch(url);
  var posts = JSON.parse(response.getContentText());
  
  // 只取 userId 為 1 的文章
  var userPosts = posts.filter(function(post) {
    return post.userId === 1;
  });
  
  Logger.log('使用者 1 的文章數：' + userPosts.length);
}
```

### 資料轉換

```javascript
function transformData() {
  var apiData = [
    {id: 1, name: 'John', score: 85},
    {id: 2, name: 'Mary', score: 92},
    {id: 3, name: 'Bob', score: 78}
  ];
  
  // 轉換為試算表格式
  var sheetData = apiData.map(function(item) {
    return [item.id, item.name, item.score];
  });
  
  // 加入標題列
  sheetData.unshift(['ID', '姓名', '分數']);
  
  Logger.log(sheetData);
}
```

## 常見問題與解決方案

### 問題 1：undefined 屬性

```javascript
var data = {
  name: '王小明'
  // 沒有 age 屬性
};

// ❌ 直接存取會得到 undefined
Logger.log(data.age);  // undefined

// ✅ 使用條件判斷
if (data.age) {
  Logger.log('年齡：' + data.age);
} else {
  Logger.log('年齡：未提供');
}

// ✅ 使用預設值
var age = data.age || '未知';
Logger.log('年齡：' + age);
```

### 問題 2：null 值處理

```javascript
var data = {
  name: '王小明',
  phone: null
};

// ✅ 檢查 null
if (data.phone === null) {
  Logger.log('電話：未提供');
} else {
  Logger.log('電話：' + data.phone);
}
```

### 問題 3：深層巢狀的安全存取

```javascript
var data = {
  user: {
    // address 不存在
  }
};

// ❌ 會產生錯誤
// Logger.log(data.user.address.city);  // Cannot read property 'city' of undefined

// ✅ 逐層檢查
if (data.user && data.user.address && data.user.address.city) {
  Logger.log('城市：' + data.user.address.city);
} else {
  Logger.log('城市：未提供');
}
```

### 問題 4：陣列為空

```javascript
var data = {
  items: []
};

// ✅ 檢查陣列長度
if (data.items.length > 0) {
  Logger.log('第一項：' + data.items[0]);
} else {
  Logger.log('沒有項目');
}
```

## 實用函式

### 安全取值函式

```javascript
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

// 使用範例
var data = {
  user: {
    name: '王小明',
    address: {
      city: '台北'
    }
  }
};

Logger.log(safeGet(data, 'user.name', '未知'));           // 王小明
Logger.log(safeGet(data, 'user.address.city', '未知'));   // 台北
Logger.log(safeGet(data, 'user.phone', '未提供'));        // 未提供
```

### JSON 美化函式

```javascript
function prettyPrintJson(obj) {
  return JSON.stringify(obj, null, 2);
}

var data = {name: '王小明', age: 25};
Logger.log(prettyPrintJson(data));
```

### JSON 驗證函式

```javascript
function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

Logger.log(isValidJson('{"name":"John"}'));     // true
Logger.log(isValidJson('{name: "John"}'));      // false
```

## 實戰範例

### 範例 1：處理 API 回應並寫入試算表

```javascript
function writeApiDataToSheet() {
  // 取得資料
  var url = 'https://jsonplaceholder.typicode.com/users';
  var response = UrlFetchApp.fetch(url);
  var users = JSON.parse(response.getContentText());
  
  // 提取需要的欄位
  var data = users.map(function(user) {
    return [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.company.name
    ];
  });
  
  // 加入標題
  data.unshift(['ID', '姓名', 'Email', '電話', '公司']);
  
  // 寫入試算表
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  
  Logger.log('✅ 已寫入 ' + (data.length - 1) + ' 筆資料');
}
```

### 範例 2：合併多個 API 的資料

```javascript
function mergeApiData() {
  // 取得使用者資料
  var usersUrl = 'https://jsonplaceholder.typicode.com/users/1';
  var usersResponse = UrlFetchApp.fetch(usersUrl);
  var user = JSON.parse(usersResponse.getContentText());
  
  // 取得該使用者的文章
  var postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';
  var postsResponse = UrlFetchApp.fetch(postsUrl);
  var posts = JSON.parse(postsResponse.getContentText());
  
  // 合併資料
  var result = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    postsCount: posts.length,
    posts: posts.map(function(post) {
      return {
        id: post.id,
        title: post.title
      };
    })
  };
  
  Logger.log(prettyPrintJson(result));
}
```

### 範例 3：建立 JSON 設定檔

```javascript
function createConfigFile() {
  var config = {
    appName: '我的應用程式',
    version: '1.0.0',
    settings: {
      language: 'zh-TW',
      theme: 'light',
      notifications: true
    },
    apiEndpoints: {
      weather: 'https://api.openweathermap.org/data/2.5/weather',
      users: 'https://jsonplaceholder.typicode.com/users'
    }
  };
  
  // 儲存到 PropertiesService
  var props = PropertiesService.getScriptProperties();
  props.setProperty('APP_CONFIG', JSON.stringify(config));
  
  Logger.log('✅ 設定檔已儲存');
}

function readConfigFile() {
  var props = PropertiesService.getScriptProperties();
  var configString = props.getProperty('APP_CONFIG');
  
  if (configString) {
    var config = JSON.parse(configString);
    Logger.log('應用程式名稱：' + config.appName);
    Logger.log('版本：' + config.version);
    Logger.log('語言：' + config.settings.language);
  } else {
    Logger.log('❌ 找不到設定檔');
  }
}
```

## 練習題

### 練習 1：基本解析
解析以下 JSON 字串並顯示所有屬性：
```json
{"name":"張三","age":30,"city":"台北"}
```

### 練習 2：陣列處理
解析以下 JSON 並計算所有產品的總價：
```json
[
  {"name":"蘋果","price":50},
  {"name":"香蕉","price":30},
  {"name":"橘子","price":40}
]
```

### 練習 3：巢狀資料
從以下 JSON 中提取所有課程名稱：
```json
{
  "student": {
    "name": "李四",
    "courses": [
      {"id":1,"name":"數學"},
      {"id":2,"name":"英文"}
    ]
  }
}
```

### 練習 4：資料轉換
將 API 回應轉換為適合寫入試算表的二維陣列格式。

### 練習 5：錯誤處理
撰寫一個函式，安全地解析 JSON 字串，如果解析失敗則回傳預設值。

## 小結

本講義介紹了：

✅ JSON 的基本語法和結構
✅ JSON.parse() 和 JSON.stringify() 的使用
✅ 存取和遍歷 JSON 資料的方法
✅ 處理巢狀 JSON 結構
✅ 資料提取、過濾和轉換技巧
✅ 常見問題的解決方案
✅ 實用的 JSON 處理函式

掌握 JSON 處理是使用 API 的關鍵技能，幾乎所有現代 Web API 都使用 JSON 格式傳輸資料。

## 延伸閱讀

- [JSON 官方網站](https://www.json.org/json-zh.html)
- [MDN - JSON](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [JSON Formatter 線上工具](https://jsonformatter.org/)
