/**
 * 物件操作範例程式碼
 * 
 * 本檔案包含物件的各種操作範例，包括：
 * - 建立物件
 * - 屬性存取與修改
 * - 物件方法
 * - 物件遍歷
 * - JSON 處理
 * - 巢狀物件與物件陣列
 */

// ============================================
// 範例 1：建立物件的不同方式
// ============================================

function example01_createObjects() {
  Logger.log('=== 範例 1：建立物件 ===');
  
  // 方法 1：物件字面量（最常用）✅
  var student1 = {
    name: '王小明',
    age: 18,
    grade: 'A'
  };
  Logger.log('學生 1: ' + JSON.stringify(student1));
  
  // 方法 2：使用 new Object() ✅
  var student2 = new Object();
  student2.name = '李小華';
  student2.age = 17;
  student2.grade = 'B';
  Logger.log('學生 2: ' + JSON.stringify(student2));
  
  // 方法 3：空物件後新增屬性 ✅
  var student3 = {};
  student3.name = '張小美';
  student3.age = 18;
  student3.grade = 'A';
  Logger.log('學生 3: ' + JSON.stringify(student3));
}

// ============================================
// 範例 2：屬性存取與修改
// ============================================

function example02_accessProperties() {
  Logger.log('=== 範例 2：屬性存取與修改 ===');
  
  var student = {
    name: '王小明',
    age: 18,
    grade: 'A',
    'favorite subject': '數學'  // 屬性名稱有空格
  };
  
  // 點記法存取 ✅
  Logger.log('姓名: ' + student.name);
  Logger.log('年齡: ' + student.age);
  
  // 括號記法存取 ✅
  Logger.log('成績: ' + student['grade']);
  Logger.log('最愛科目: ' + student['favorite subject']);
  
  // 動態存取 ✅
  var propertyName = 'name';
  Logger.log('動態存取: ' + student[propertyName]);
  
  // 修改屬性 ✅
  student.age = 19;
  student['grade'] = 'A+';
  Logger.log('修改後: ' + JSON.stringify(student));
  
  // 新增屬性 ✅
  student.email = 'example@school.edu';
  student['phone'] = '0912345678';
  Logger.log('新增後: ' + JSON.stringify(student));
  
  // 刪除屬性 ✅
  delete student.phone;
  Logger.log('刪除後: ' + JSON.stringify(student));
}

// ============================================
// 範例 3：物件方法與 this
// ============================================

function example03_objectMethods() {
  Logger.log('=== 範例 3：物件方法 ===');
  
  var student = {
    name: '王小明',
    scores: [85, 90, 88, 92, 87],
    
    // 計算平均分數 ✅
    getAverage: function() {
      var sum = 0;
      for (var i = 0; i < this.scores.length; i++) {
        sum += this.scores[i];
      }
      return sum / this.scores.length;
    },
    
    // 取得等級 ✅
    getGrade: function() {
      var avg = this.getAverage();
      if (avg >= 90) return '優';
      if (avg >= 80) return '良';
      if (avg >= 70) return '可';
      return '待加強';
    },
    
    // 自我介紹 ✅
    introduce: function() {
      return '我是 ' + this.name + 
             '，平均分數 ' + this.getAverage().toFixed(2) + 
             '，等級 ' + this.getGrade();
    }
  };
  
  Logger.log('平均分數: ' + student.getAverage());
  Logger.log('等級: ' + student.getGrade());
  Logger.log(student.introduce());
}

// ============================================
// 範例 4：物件遍歷
// ============================================

function example04_iterateObjects() {
  Logger.log('=== 範例 4：物件遍歷 ===');
  
  var student = {
    name: '王小明',
    age: 18,
    grade: 'A',
    email: 'example@school.edu'
  };
  
  // 方法 1：for...in 迴圈 ✅
  Logger.log('方法 1: for...in');
  for (var key in student) {
    Logger.log(key + ': ' + student[key]);
  }
  
  // 方法 2：Object.keys() ✅
  Logger.log('\n方法 2: Object.keys()');
  var keys = Object.keys(student);
  Logger.log('所有屬性名稱: ' + keys.join(', '));
  
  keys.forEach(function(key) {
    Logger.log(key + ': ' + student[key]);
  });
  
  // 方法 3：使用傳統 for 迴圈 ✅
  Logger.log('\n方法 3: 傳統 for 迴圈');
  var keys = Object.keys(student);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    Logger.log(key + ': ' + student[key]);
  }
}

// ============================================
// 範例 5：JSON 處理
// ============================================

function example05_jsonProcessing() {
  Logger.log('=== 範例 5：JSON 處理 ===');
  
  var student = {
    name: '王小明',
    age: 18,
    scores: [85, 90, 88],
    address: {
      city: '台北市',
      district: '大安區'
    }
  };
  
  // 物件轉 JSON 字串 ✅
  var jsonString = JSON.stringify(student);
  Logger.log('JSON 字串: ' + jsonString);
  
  // 格式化輸出 ✅
  var prettyJson = JSON.stringify(student, null, 2);
  Logger.log('格式化 JSON:\n' + prettyJson);
  
  // JSON 字串轉物件 ✅
  var jsonStr = '{"name":"李小華","age":17,"grade":"B"}';
  var parsedStudent = JSON.parse(jsonStr);
  Logger.log('解析後的物件: ' + parsedStudent.name + ', ' + parsedStudent.age);
  
  // 深拷貝物件（使用 JSON） ✅
  var copy = JSON.parse(JSON.stringify(student));
  copy.name = '張小美';
  Logger.log('原物件: ' + student.name);
  Logger.log('複製物件: ' + copy.name);
}

// ============================================
// 範例 6：巢狀物件
// ============================================

function example06_nestedObjects() {
  Logger.log('=== 範例 6：巢狀物件 ===');
  
  var student = {
    name: '王小明',
    age: 18,
    address: {
      city: '台北市',
      district: '大安區',
      street: '信義路四段1號',
      zipCode: '106'
    },
    scores: {
      chinese: 85,
      english: 90,
      math: 88,
      science: 92
    },
    contact: {
      email: 'example@school.edu',
      phone: '0912345678'
    }
  };
  
  // 存取巢狀屬性 ✅
  Logger.log('城市: ' + student.address.city);
  Logger.log('區域: ' + student.address.district);
  Logger.log('英文成績: ' + student.scores.english);
  Logger.log('Email: ' + student.contact.email);
  
  // 修改巢狀屬性 ✅
  student.address.city = '新北市';
  student.scores.math = 95;
  Logger.log('修改後城市: ' + student.address.city);
  Logger.log('修改後數學: ' + student.scores.math);
  
  // 計算總分 ✅
  var total = student.scores.chinese + 
              student.scores.english + 
              student.scores.math + 
              student.scores.science;
  Logger.log('總分: ' + total);
  Logger.log('平均: ' + (total / 4).toFixed(2));
}

// ============================================
// 範例 7：物件陣列
// ============================================

function example07_arrayOfObjects() {
  Logger.log('=== 範例 7：物件陣列 ===');
  
  var students = [
    { name: '王小明', age: 18, grade: 'A', score: 92 },
    { name: '李小華', age: 17, grade: 'B', score: 85 },
    { name: '張小美', age: 18, grade: 'A', score: 95 },
    { name: '陳大明', age: 17, grade: 'C', score: 72 },
    { name: '林小芳', age: 18, grade: 'B', score: 88 }
  ];
  
  // 遍歷物件陣列 ✅
  Logger.log('所有學生:');
  students.forEach(function(student, index) {
    Logger.log((index + 1) + '. ' + student.name + ' - ' + student.grade);
  });
  
  // 篩選特定條件 ✅
  var gradeA = students.filter(function(student) {
    return student.grade === 'A';
  });
  Logger.log('\n成績 A 的學生數: ' + gradeA.length);
  
  // 計算平均分數 ✅
  var totalScore = students.reduce(function(sum, student) {
    return sum + student.score;
  }, 0);
  var average = totalScore / students.length;
  Logger.log('全班平均: ' + average.toFixed(2));
  
  // 找出最高分 ✅
  var highest = students.reduce(function(max, student) {
    return student.score > max.score ? student : max;
  });
  Logger.log('最高分: ' + highest.name + ' (' + highest.score + ')');
  
  // 排序（由高到低） ✅
  var sorted = students.slice().sort(function(a, b) {
    return b.score - a.score;
  });
  Logger.log('\n成績排名:');
  sorted.forEach(function(student, index) {
    Logger.log((index + 1) + '. ' + student.name + ': ' + student.score);
  });
}

// ============================================
// 範例 8：Object.assign() 複製物件
// ============================================

function example08_objectAssign() {
  Logger.log('=== 範例 8：Object.assign() ===');
  
  var student = {
    name: '王小明',
    age: 18
  };
  
  // 淺拷貝 ✅
  var copy1 = Object.assign({}, student);
  copy1.name = '李小華';
  Logger.log('原物件: ' + student.name);
  Logger.log('複製物件: ' + copy1.name);
  
  // 合併物件 ✅
  var basicInfo = { name: '張小美', age: 17 };
  var scoreInfo = { chinese: 85, english: 90 };
  var contactInfo = { email: 'example@school.edu' };
  
  var fullInfo = Object.assign({}, basicInfo, scoreInfo, contactInfo);
  Logger.log('合併後: ' + JSON.stringify(fullInfo));
  
  // 新增屬性到現有物件 ✅
  Object.assign(student, { grade: 'A', email: 'test@school.edu' });
  Logger.log('新增後: ' + JSON.stringify(student));
}

// ============================================
// 範例 9：實務應用 - 學生成績管理
// ============================================

function example09_studentManagement() {
  Logger.log('=== 範例 9：學生成績管理 ===');
  
  var students = [
    { name: '王小明', chinese: 85, english: 90, math: 88 },
    { name: '李小華', chinese: 78, english: 82, math: 85 },
    { name: '張小美', chinese: 92, english: 88, math: 90 },
    { name: '陳大明', chinese: 65, english: 70, math: 68 }
  ];
  
  // 計算每位學生的平均與等級 ✅
  students.forEach(function(student) {
    var total = student.chinese + student.english + student.math;
    student.average = total / 3;
    
    if (student.average >= 90) {
      student.grade = '優';
    } else if (student.average >= 80) {
      student.grade = '良';
    } else if (student.average >= 70) {
      student.grade = '可';
    } else {
      student.grade = '待加強';
    }
  });
  
  // 輸出結果 ✅
  Logger.log('學生成績報表:');
  students.forEach(function(student) {
    Logger.log(student.name + ': 平均 ' + 
               student.average.toFixed(2) + ' (' + 
               student.grade + ')');
  });
  
  // 統計各等級人數 ✅
  var gradeCount = {};
  students.forEach(function(student) {
    if (!gradeCount[student.grade]) {
      gradeCount[student.grade] = 0;
    }
    gradeCount[student.grade]++;
  });
  
  Logger.log('\n等級統計:');
  for (var grade in gradeCount) {
    Logger.log(grade + ': ' + gradeCount[grade] + ' 人');
  }
}

// ============================================
// 範例 10：實務應用 - 從試算表讀取轉物件
// ============================================

function example10_sheetToObjects() {
  Logger.log('=== 範例 10：試算表轉物件 ===');
  
  // 模擬試算表資料 ✅
  var sheetData = [
    ['姓名', '年齡', '成績', 'Email'],
    ['王小明', 18, 'A', 'wang@school.edu'],
    ['李小華', 17, 'B', 'li@school.edu'],
    ['張小美', 18, 'A', 'zhang@school.edu']
  ];
  
  // 第一列是標題 ✅
  var headers = sheetData[0];
  var students = [];
  
  // 從第二列開始轉換為物件 ✅
  for (var i = 1; i < sheetData.length; i++) {
    var student = {};
    for (var j = 0; j < headers.length; j++) {
      student[headers[j]] = sheetData[i][j];
    }
    students.push(student);
  }
  
  // 輸出結果 ✅
  Logger.log('轉換後的物件陣列:');
  students.forEach(function(student) {
    Logger.log(JSON.stringify(student));
  });
  
  // 存取資料 ✅
  Logger.log('\n第一位學生: ' + students[0]['姓名']);
  Logger.log('第二位學生 Email: ' + students[1]['Email']);
}

// ============================================
// 執行所有範例
// ============================================

function runAllExamples() {
  example01_createObjects();
  Logger.log('\n');
  example02_accessProperties();
  Logger.log('\n');
  example03_objectMethods();
  Logger.log('\n');
  example04_iterateObjects();
  Logger.log('\n');
  example05_jsonProcessing();
  Logger.log('\n');
  example06_nestedObjects();
  Logger.log('\n');
  example07_arrayOfObjects();
  Logger.log('\n');
  example08_objectAssign();
  Logger.log('\n');
  example09_studentManagement();
  Logger.log('\n');
  example10_sheetToObjects();
}
