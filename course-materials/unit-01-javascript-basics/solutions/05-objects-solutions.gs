/**
 * 物件操作練習題 - 解答
 * 
 * 本檔案包含所有練習題的完整解答與說明
 */

// ============================================
// 練習 1：建立學生物件 - 解答
// ============================================

function exercise01() {
  var student = {
    name: '王小明',
    studentId: 'S001',
    grade: '高三',
    email: 'wang@school.edu'
  };
  
  return student;
}

function test01() {
  var result = exercise01();
  Logger.log('練習 1 結果: ' + JSON.stringify(result));
}

// ============================================
// 練習 2：存取與修改物件屬性 - 解答
// ============================================

function exercise02() {
  var product = {
    name: '筆記型電腦',
    price: 1000,
    stock: 50,
    description: '高效能筆電'
  };
  
  // 1. 修改價格
  product.price = 1200;
  
  // 2. 新增 discount 屬性
  product.discount = 0.1;
  
  // 3. 刪除 description 屬性
  delete product.description;
  
  return product;
}

function test02() {
  var result = exercise02();
  Logger.log('練習 2 結果: ' + JSON.stringify(result));
  // 預期輸出: {"name":"筆記型電腦","price":1200,"stock":50,"discount":0.1}
}

// ============================================
// 練習 3：物件方法 - 計算矩形面積 - 解答
// ============================================

function exercise03() {
  var rectangle = {
    width: 10,
    height: 5,
    
    getArea: function() {
      return this.width * this.height;
    },
    
    getPerimeter: function() {
      return 2 * (this.width + this.height);
    }
  };
  
  return rectangle;
}

function test03() {
  var rect = exercise03();
  Logger.log('面積: ' + rect.getArea());        // 50
  Logger.log('周長: ' + rect.getPerimeter());   // 30
}

// ============================================
// 練習 4：遍歷物件屬性 - 解答
// ============================================

function exercise04() {
  var person = {
    name: 'John',
    age: 25,
    city: 'Taipei',
    job: 'Engineer'
  };
  
  var result = [];
  
  // 使用 for...in 遍歷物件
  for (var key in person) {
    result.push(key + ': ' + person[key]);
  }
  
  return result;
}

function test04() {
  var result = exercise04();
  Logger.log('練習 4 結果: ' + result.join(', '));
  // 預期輸出: name: John, age: 25, city: Taipei, job: Engineer
}

// ============================================
// 練習 5：JSON 轉換 - 解答
// ============================================

function exercise05() {
  var person = {
    name: 'Alice',
    age: 25,
    city: 'Taipei'
  };
  
  // 1. 物件轉 JSON 字串
  var jsonString = JSON.stringify(person);
  Logger.log('JSON 字串: ' + jsonString);
  
  // 2. JSON 字串解析回物件
  var parsedPerson = JSON.parse(jsonString);
  
  // 3. 修改 age 屬性
  parsedPerson.age = 26;
  
  // 4. 回傳修改後的物件
  return parsedPerson;
}

function test05() {
  var result = exercise05();
  Logger.log('練習 5 結果: ' + JSON.stringify(result));
  // 預期輸出: {"name":"Alice","age":26,"city":"Taipei"}
}

// ============================================
// 練習 6：巢狀物件操作 - 解答
// ============================================

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
  
  // 1. 取得城市
  var city = student.address.city;
  
  // 2. 計算總分
  var totalScore = student.scores.chinese + 
                   student.scores.english + 
                   student.scores.math;
  
  // 3. 修改數學成績
  student.scores.math = 95;
  var newMathScore = student.scores.math;
  
  return {
    city: city,
    totalScore: totalScore,
    newMathScore: newMathScore
  };
}

function test06() {
  var result = exercise06();
  Logger.log('練習 6 結果: ' + JSON.stringify(result));
  // 預期輸出: {"city":"台北市","totalScore":263,"newMathScore":95}
}

// ============================================
// 練習 7：物件陣列 - 篩選與計算 - 解答
// ============================================

function exercise07() {
  var products = [
    { name: '滑鼠', price: 300 },
    { name: '鍵盤', price: 800 },
    { name: '螢幕', price: 5000 },
    { name: '耳機', price: 600 },
    { name: 'USB', price: 200 }
  ];
  
  // 1. 篩選價格大於 500 的產品
  var filteredProducts = products.filter(function(product) {
    return product.price > 500;
  });
  
  // 2. 計算平均價格
  var totalPrice = filteredProducts.reduce(function(sum, product) {
    return sum + product.price;
  }, 0);
  var averagePrice = totalPrice / filteredProducts.length;
  
  return {
    filteredProducts: filteredProducts,
    averagePrice: averagePrice
  };
}

function test07() {
  var result = exercise07();
  Logger.log('篩選後的產品: ' + JSON.stringify(result.filteredProducts));
  Logger.log('平均價格: ' + result.averagePrice);
  // 預期輸出: 平均價格: 2133.33...
}

// ============================================
// 練習 8：物件陣列排序 - 解答
// ============================================

function exercise08() {
  var students = [
    { name: '王小明', score: 85 },
    { name: '李小華', score: 92 },
    { name: '張小美', score: 78 },
    { name: '陳大明', score: 95 },
    { name: '林小芳', score: 88 }
  ];
  
  // 使用 slice() 複製陣列，避免修改原陣列
  // 使用 sort() 排序，由高到低
  var sorted = students.slice().sort(function(a, b) {
    return b.score - a.score;
  });
  
  return sorted;
}

function test08() {
  var result = exercise08();
  Logger.log('排序結果:');
  result.forEach(function(student, index) {
    Logger.log((index + 1) + '. ' + student.name + ': ' + student.score);
  });
  // 預期輸出:
  // 1. 陳大明: 95
  // 2. 李小華: 92
  // 3. 林小芳: 88
  // 4. 王小明: 85
  // 5. 張小美: 78
}

// ============================================
// 練習 9：合併物件 - 解答
// ============================================

function exercise09() {
  var obj1 = { name: '王小明', age: 18 };
  var obj2 = { grade: 'A', score: 92 };
  var obj3 = { email: 'wang@school.edu', phone: '0912345678' };
  
  // 使用 Object.assign() 合併物件
  var merged = Object.assign({}, obj1, obj2, obj3);
  
  return merged;
}

function test09() {
  var result = exercise09();
  Logger.log('練習 9 結果: ' + JSON.stringify(result));
  // 預期輸出: {"name":"王小明","age":18,"grade":"A","score":92,"email":"wang@school.edu","phone":"0912345678"}
}

// ============================================
// 練習 10：實務應用 - 學生成績統計 - 解答
// ============================================

function exercise10() {
  var students = [
    { name: '王小明', chinese: 85, english: 90, math: 88 },
    { name: '李小華', chinese: 78, english: 82, math: 85 },
    { name: '張小美', chinese: 92, english: 88, math: 90 },
    { name: '陳大明', chinese: 65, english: 70, math: 68 },
    { name: '林小芳', chinese: 55, english: 60, math: 58 }
  ];
  
  // 為每個學生計算平均、等級、及格狀態
  students.forEach(function(student) {
    // 1. 計算平均分數
    var total = student.chinese + student.english + student.math;
    student.average = parseFloat((total / 3).toFixed(2));
    
    // 2. 判定等級
    if (student.average >= 90) {
      student.grade = '優';
    } else if (student.average >= 80) {
      student.grade = '良';
    } else if (student.average >= 70) {
      student.grade = '可';
    } else {
      student.grade = '待加強';
    }
    
    // 3. 判定是否及格
    student.passed = student.average >= 60;
  });
  
  return students;
}

function test10() {
  var result = exercise10();
  Logger.log('學生成績統計:');
  result.forEach(function(student) {
    Logger.log(student.name + ': 平均 ' + student.average + 
               ', 等級 ' + student.grade + 
               ', 及格 ' + student.passed);
  });
  // 預期輸出:
  // 王小明: 平均 87.67, 等級 良, 及格 true
  // 李小華: 平均 81.67, 等級 良, 及格 true
  // 張小美: 平均 90, 等級 優, 及格 true
  // 陳大明: 平均 67.67, 等級 待加強, 及格 true
  // 林小芳: 平均 57.67, 等級 待加強, 及格 false
}

// ============================================
// 執行所有測試
// ============================================

function runAllTests() {
  Logger.log('=== 物件操作練習題解答測試 ===\n');
  
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

// ============================================
// 額外說明與學習重點
// ============================================

/**
 * 學習重點總結：
 * 
 * 1. 物件建立：使用物件字面量 { } 是最常用的方式
 * 
 * 2. 屬性存取：
 *    - 點記法：obj.property（屬性名稱固定時）
 *    - 括號記法：obj['property']（屬性名稱動態或有特殊字元時）
 * 
 * 3. 物件方法：
 *    - 方法中使用 this 存取物件本身的屬性
 *    - this 代表呼叫該方法的物件
 * 
 * 4. 物件遍歷：
 *    - for...in：遍歷所有可列舉的屬性
 *    - Object.keys()：取得所有屬性名稱的陣列
 * 
 * 5. JSON 處理：
 *    - JSON.stringify()：物件轉 JSON 字串
 *    - JSON.parse()：JSON 字串轉物件
 *    - 常用於資料儲存與 API 傳輸
 * 
 * 6. 巢狀物件：
 *    - 使用點記法或括號記法逐層存取
 *    - 注意檢查屬性是否存在，避免錯誤
 * 
 * 7. 物件陣列：
 *    - 使用 filter()、map()、reduce() 等方法處理
 *    - 使用 sort() 排序時注意回傳值（正數、負數、零）
 * 
 * 8. Object.assign()：
 *    - 用於複製或合併物件
 *    - 第一個參數是目標物件，後續參數是來源物件
 * 
 * 9. 實務應用：
 *    - 物件適合組織相關的資料
 *    - 物件陣列適合管理多筆結構化資料
 *    - 搭配陣列方法可以進行強大的資料處理
 */
