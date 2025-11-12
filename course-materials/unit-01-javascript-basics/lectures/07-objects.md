# 物件操作

## 學習目標

- 理解物件的概念與用途
- 掌握物件的建立與屬性存取方式
- 學會定義物件方法
- 了解物件遍歷的方法
- 掌握 JSON 格式的處理
- 理解 GAS 對物件相關語法的支援情況

---

## 什麼是物件？

物件（Object）是 JavaScript 中用來組織相關資料的資料結構。物件由「屬性」（properties）組成，每個屬性都有一個名稱（key）和對應的值（value）。

### 為什麼需要物件？

假設我們要儲存一個學生的資訊：

```javascript
// ❌ 使用多個變數（不易管理）
var studentName = '王小明';
var studentAge = 18;
var studentGrade = 'A';

// ✅ 使用物件（資料組織清楚）
var student = {
  name: '王小明',
  age: 18,
  grade: 'A'
};
```

---

## 建立物件

### 方法 1：物件字面量（最常用）

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18,
  grade: 'A',
  subjects: ['國文', '英文', '數學']
};
```

### 方法 2：使用 new Object()

✅ **GAS 完全支援**

```javascript
var student = new Object();
student.name = '王小明';
student.age = 18;
student.grade = 'A';
```

---

## 屬性存取

### 點記法（Dot Notation）

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18
};

// 讀取屬性
Logger.log(student.name);  // 王小明
Logger.log(student.age);   // 18

// 修改屬性
student.age = 19;
Logger.log(student.age);   // 19
```

### 括號記法（Bracket Notation）

✅ **GAS 完全支援**

當屬性名稱包含特殊字元或是動態決定時使用：

```javascript
var student = {
  name: '王小明',
  'favorite subject': '數學'  // 屬性名稱有空格
};

// 讀取屬性
Logger.log(student['name']);              // 王小明
Logger.log(student['favorite subject']); // 數學

// 動態存取
var propertyName = 'name';
Logger.log(student[propertyName]);        // 王小明
```

---

## 新增、修改、刪除屬性

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18
};

// 新增屬性
student.grade = 'A';
student['email'] = 'example@school.edu';

// 修改屬性
student.age = 19;

// 刪除屬性
delete student.email;

Logger.log(student);
// { name: '王小明', age: 19, grade: 'A' }
```

---

## 物件方法

物件的屬性值可以是函式，這樣的屬性稱為「方法」（method）。

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  scores: [85, 90, 88],
  
  // 定義方法
  getAverage: function() {
    var sum = 0;
    for (var i = 0; i < this.scores.length; i++) {
      sum += this.scores[i];
    }
    return sum / this.scores.length;
  },
  
  introduce: function() {
    return '我是 ' + this.name + '，平均分數是 ' + this.getAverage();
  }
};

Logger.log(student.getAverage());  // 87.666...
Logger.log(student.introduce());   // 我是 王小明，平均分數是 87.666...
```

### this 關鍵字

在物件方法中，`this` 代表該物件本身，用來存取物件的其他屬性或方法。

---

## 物件遍歷

### 方法 1：for...in 迴圈

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18,
  grade: 'A'
};

for (var key in student) {
  Logger.log(key + ': ' + student[key]);
}
// 輸出：
// name: 王小明
// age: 18
// grade: A
```

### 方法 2：Object.keys()

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18,
  grade: 'A'
};

var keys = Object.keys(student);
Logger.log(keys);  // ['name', 'age', 'grade']

// 搭配 forEach 遍歷
keys.forEach(function(key) {
  Logger.log(key + ': ' + student[key]);
});
```

### 方法 3：Object.values()

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var values = Object.values(student);
Logger.log(values);  // ['王小明', 18, 'A']
```

### 方法 4：Object.entries()

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var entries = Object.entries(student);
Logger.log(entries);
// [['name', '王小明'], ['age', 18], ['grade', 'A']]
```

---

## JSON 格式

JSON（JavaScript Object Notation）是一種輕量級的資料交換格式，常用於 API 資料傳輸。

### JSON.stringify() - 物件轉 JSON 字串

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18,
  grade: 'A'
};

var jsonString = JSON.stringify(student);
Logger.log(jsonString);
// {"name":"王小明","age":18,"grade":"A"}

// 格式化輸出（美化）
var prettyJson = JSON.stringify(student, null, 2);
Logger.log(prettyJson);
// {
//   "name": "王小明",
//   "age": 18,
//   "grade": "A"
// }
```

### JSON.parse() - JSON 字串轉物件

✅ **GAS 完全支援**

```javascript
var jsonString = '{"name":"王小明","age":18,"grade":"A"}';
var student = JSON.parse(jsonString);

Logger.log(student.name);  // 王小明
Logger.log(student.age);   // 18
```

### JSON 的應用場景

1. **儲存資料到試算表**
```javascript
var data = {
  name: '王小明',
  scores: [85, 90, 88]
};

// 將物件轉為 JSON 字串儲存
var sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange('A1').setValue(JSON.stringify(data));

// 讀取並還原物件
var jsonString = sheet.getRange('A1').getValue();
var restoredData = JSON.parse(jsonString);
Logger.log(restoredData.name);  // 王小明
```

2. **API 資料處理**
```javascript
// 從 API 取得的 JSON 資料
var response = UrlFetchApp.fetch('https://api.example.com/data');
var data = JSON.parse(response.getContentText());
Logger.log(data);
```

---

## 巢狀物件

物件的屬性值可以是另一個物件或陣列。

✅ **GAS 完全支援**

```javascript
var student = {
  name: '王小明',
  age: 18,
  address: {
    city: '台北市',
    district: '大安區',
    street: '信義路四段1號'
  },
  scores: {
    chinese: 85,
    english: 90,
    math: 88
  }
};

// 存取巢狀屬性
Logger.log(student.address.city);      // 台北市
Logger.log(student.scores.english);    // 90

// 修改巢狀屬性
student.address.city = '新北市';
student.scores.math = 92;
```

---

## 物件陣列

實務上常將多個物件放在陣列中管理。

✅ **GAS 完全支援**

```javascript
var students = [
  { name: '王小明', age: 18, grade: 'A' },
  { name: '李小華', age: 17, grade: 'B' },
  { name: '張小美', age: 18, grade: 'A' }
];

// 遍歷物件陣列
students.forEach(function(student) {
  Logger.log(student.name + ' - ' + student.grade);
});

// 篩選特定條件的物件
var gradeA = students.filter(function(student) {
  return student.grade === 'A';
});
Logger.log(gradeA.length);  // 2
```

---

## 進階語法（需 V8 Runtime）

### 物件解構賦值（Destructuring）

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var student = {
  name: '王小明',
  age: 18,
  grade: 'A'
};

// 解構賦值
var { name, age } = student;
Logger.log(name);  // 王小明
Logger.log(age);   // 18

// 傳統替代方案（GAS 完全支援）
var name = student.name;
var age = student.age;
```

### 展開運算子（Spread Operator）

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var student1 = { name: '王小明', age: 18 };
var student2 = { ...student1, grade: 'A' };

// 傳統替代方案（GAS 完全支援）
var student2 = Object.assign({}, student1, { grade: 'A' });
```

### 屬性簡寫

⚠️ **需要 V8 runtime**

```javascript
// 需啟用 V8 runtime
var name = '王小明';
var age = 18;
var student = { name, age };  // 等同於 { name: name, age: age }

// 傳統寫法（GAS 完全支援）
var student = { name: name, age: age };
```

---

## 常用物件方法總整理

| 方法 | 說明 | GAS 支援 |
|-----|------|---------|
| `Object.keys(obj)` | 取得所有屬性名稱陣列 | ✅ 完全支援 |
| `Object.values(obj)` | 取得所有屬性值陣列 | ⚠️ 需 V8 |
| `Object.entries(obj)` | 取得 [key, value] 配對陣列 | ⚠️ 需 V8 |
| `Object.assign(target, source)` | 複製物件屬性 | ✅ 完全支援 |
| `JSON.stringify(obj)` | 物件轉 JSON 字串 | ✅ 完全支援 |
| `JSON.parse(str)` | JSON 字串轉物件 | ✅ 完全支援 |

---

## 實務應用範例

### 範例 1：學生成績管理

```javascript
function manageStudentScores() {
  var students = [
    { name: '王小明', chinese: 85, english: 90, math: 88 },
    { name: '李小華', chinese: 78, english: 82, math: 85 },
    { name: '張小美', chinese: 92, english: 88, math: 90 }
  ];
  
  // 計算每位學生的平均分數
  students.forEach(function(student) {
    var total = student.chinese + student.english + student.math;
    student.average = total / 3;
    student.grade = student.average >= 90 ? '優' : 
                    student.average >= 80 ? '良' : 
                    student.average >= 70 ? '可' : '待加強';
  });
  
  // 輸出結果
  students.forEach(function(student) {
    Logger.log(student.name + ': 平均 ' + student.average.toFixed(2) + ' (' + student.grade + ')');
  });
}
```

### 範例 2：從試算表讀取資料轉為物件

```javascript
function readSheetToObjects() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // 第一列是標題
  var headers = data[0];
  var students = [];
  
  // 從第二列開始是資料
  for (var i = 1; i < data.length; i++) {
    var student = {};
    for (var j = 0; j < headers.length; j++) {
      student[headers[j]] = data[i][j];
    }
    students.push(student);
  }
  
  Logger.log(students);
  return students;
}
```

---

## 小結

- 物件是組織相關資料的最佳方式
- 使用點記法或括號記法存取屬性
- 物件方法中的 `this` 代表物件本身
- 使用 `for...in` 或 `Object.keys()` 遍歷物件
- JSON 是物件與字串之間的轉換格式
- 物件解構、展開運算子等進階語法需要 V8 runtime

---

## 練習建議

完成本單元後，請練習：
1. 建立包含多個屬性的物件
2. 定義物件方法並使用 `this`
3. 遍歷物件的所有屬性
4. 將物件轉為 JSON 並還原
5. 處理巢狀物件與物件陣列
