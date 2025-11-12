/**
 * 格式化與進階操作範例
 * 示範格式設定、排序篩選、公式操作、範圍保護
 */

// ==================== 格式設定範例 ====================

/**
 * 範例 1: 數字格式設定
 * ✅ GAS 完全支援
 */
function example01_numberFormat() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 數字格式設定範例 ===\n');
  
  // 準備測試資料
  sheet.getRange('A1').setValue('格式類型');
  sheet.getRange('B1').setValue('原始值');
  sheet.getRange('C1').setValue('格式化結果');
  
  // 整數格式
  sheet.getRange('A2').setValue('整數');
  sheet.getRange('B2').setValue(1234.5678);
  sheet.getRange('C2').setValue(1234.5678);
  sheet.getRange('C2').setNumberFormat('0');
  Logger.log('整數格式: 1234.5678 → 1235');
  
  // 兩位小數
  sheet.getRange('A3').setValue('兩位小數');
  sheet.getRange('B3').setValue(1234.5);
  sheet.getRange('C3').setValue(1234.5);
  sheet.getRange('C3').setNumberFormat('0.00');
  Logger.log('兩位小數: 1234.5 → 1234.50');
  
  // 千分位
  sheet.getRange('A4').setValue('千分位');
  sheet.getRange('B4').setValue(1234567);
  sheet.getRange('C4').setValue(1234567);
  sheet.getRange('C4').setNumberFormat('#,##0');
  Logger.log('千分位: 1234567 → 1,234,567');
  
  // 貨幣格式
  sheet.getRange('A5').setValue('貨幣');
  sheet.getRange('B5').setValue(1234.5);
  sheet.getRange('C5').setValue(1234.5);
  sheet.getRange('C5').setNumberFormat('$#,##0.00');
  Logger.log('貨幣: 1234.5 → $1,234.50');
  
  // 百分比
  sheet.getRange('A6').setValue('百分比');
  sheet.getRange('B6').setValue(0.8567);
  sheet.getRange('C6').setValue(0.8567);
  sheet.getRange('C6').setNumberFormat('0.00%');
  Logger.log('百分比: 0.8567 → 85.67%');
  
  Logger.log('\n✅ 數字格式設定完成');
}

/**
 * 範例 2: 日期時間格式
 * ✅ GAS 完全支援
 */
function example02_dateTimeFormat() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var now = new Date();
  
  Logger.log('=== 日期時間格式範例 ===\n');
  
  // 標題
  sheet.getRange('E1').setValue('格式類型');
  sheet.getRange('F1').setValue('格式化結果');
  
  // 日期格式 1
  sheet.getRange('E2').setValue('yyyy-MM-dd');
  sheet.getRange('F2').setValue(now);
  sheet.getRange('F2').setNumberFormat('yyyy-MM-dd');
  Logger.log('日期格式 1: yyyy-MM-dd');
  
  // 日期格式 2
  sheet.getRange('E3').setValue('yyyy年MM月dd日');
  sheet.getRange('F3').setValue(now);
  sheet.getRange('F3').setNumberFormat('yyyy年MM月dd日');
  Logger.log('日期格式 2: yyyy年MM月dd日');
  
  // 時間格式
  sheet.getRange('E4').setValue('HH:mm:ss');
  sheet.getRange('F4').setValue(now);
  sheet.getRange('F4').setNumberFormat('HH:mm:ss');
  Logger.log('時間格式: HH:mm:ss');
  
  // 日期時間格式
  sheet.getRange('E5').setValue('yyyy-MM-dd HH:mm');
  sheet.getRange('F5').setValue(now);
  sheet.getRange('F5').setNumberFormat('yyyy-MM-dd HH:mm');
  Logger.log('日期時間: yyyy-MM-dd HH:mm');
  
  Logger.log('\n✅ 日期時間格式設定完成');
}

/**
 * 範例 3: 字體與背景顏色
 * ✅ GAS 完全支援
 */
function example03_colors() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 顏色設定範例 ===\n');
  
  // 基本顏色
  sheet.getRange('A8').setValue('紅色文字');
  sheet.getRange('A8').setFontColor('red');
  
  sheet.getRange('A9').setValue('藍色文字');
  sheet.getRange('A9').setFontColor('blue');
  
  sheet.getRange('A10').setValue('綠色文字');
  sheet.getRange('A10').setFontColor('green');
  
  // HEX 色碼
  sheet.getRange('B8').setValue('自訂顏色 1');
  sheet.getRange('B8').setFontColor('#FF6B6B');
  
  sheet.getRange('B9').setValue('自訂顏色 2');
  sheet.getRange('B9').setFontColor('#4ECDC4');
  
  sheet.getRange('B10').setValue('自訂顏色 3');
  sheet.getRange('B10').setFontColor('#95E1D3');
  
  // 背景顏色
  sheet.getRange('C8').setValue('黃色背景');
  sheet.getRange('C8').setBackground('yellow');
  
  sheet.getRange('C9').setValue('淺藍背景');
  sheet.getRange('C9').setBackground('#E3F2FD');
  
  sheet.getRange('C10').setValue('淺綠背景');
  sheet.getRange('C10').setBackground('#E8F5E9');
  
  Logger.log('✅ 顏色設定完成');
}

/**
 * 範例 4: 其他格式設定
 * ✅ GAS 完全支援
 */
function example04_otherFormats() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 其他格式設定範例 ===\n');
  
  var range = sheet.getRange('D8:D12');
  
  // 設定內容
  range.setValues([
    ['粗體文字'],
    ['斜體文字'],
    ['大字體'],
    ['置中對齊'],
    ['自動換行']
  ]);
  
  // 粗體
  sheet.getRange('D8').setFontWeight('bold');
  Logger.log('設定粗體');
  
  // 斜體
  sheet.getRange('D9').setFontStyle('italic');
  Logger.log('設定斜體');
  
  // 字體大小
  sheet.getRange('D10').setFontSize(16);
  Logger.log('設定字體大小: 16');
  
  // 對齊
  sheet.getRange('D11').setHorizontalAlignment('center');
  sheet.getRange('D11').setVerticalAlignment('middle');
  Logger.log('設定置中對齊');
  
  // 自動換行
  sheet.getRange('D12').setValue('這是一段很長的文字，需要自動換行顯示');
  sheet.getRange('D12').setWrap(true);
  Logger.log('設定自動換行');
  
  // 邊框
  range.setBorder(true, true, true, true, false, false);
  Logger.log('設定邊框');
  
  Logger.log('\n✅ 其他格式設定完成');
}

/**
 * 範例 5: 條件格式化
 * ✅ GAS 完全支援
 */
function example05_conditionalFormatting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 條件格式化範例 ===\n');
  
  // 建立測試資料
  sheet.getRange('F8').setValue('姓名');
  sheet.getRange('G8').setValue('分數');
  
  var testData = [
    ['王小明', 95],
    ['李小華', 78],
    ['張小美', 55],
    ['陳小強', 88],
    ['林小芳', 62]
  ];
  
  sheet.getRange(9, 6, testData.length, 2).setValues(testData);
  
  // 根據分數設定顏色
  for (var i = 0; i < testData.length; i++) {
    var score = testData[i][1];
    var row = i + 9;
    var scoreCell = sheet.getRange(row, 7);
    
    if (score >= 90) {
      // 優秀：深綠背景
      scoreCell.setBackground('#C8E6C9');
      scoreCell.setFontColor('#1B5E20');
      scoreCell.setFontWeight('bold');
    } else if (score >= 60) {
      // 及格：黃色背景
      scoreCell.setBackground('#FFF9C4');
      scoreCell.setFontColor('#F57F17');
    } else {
      // 不及格：紅色背景
      scoreCell.setBackground('#FFCDD2');
      scoreCell.setFontColor('#B71C1C');
    }
  }
  
  Logger.log('✅ 條件格式化完成');
  Logger.log('優秀（>=90）: 綠色');
  Logger.log('及格（60-89）: 黃色');
  Logger.log('不及格（<60）: 紅色');
}

// ==================== 排序與篩選範例 ====================

/**
 * 範例 6: 資料排序
 * ✅ GAS 完全支援
 */
function example06_sorting() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 資料排序範例 ===\n');
  
  // 建立測試資料
  var sortSheet = getOrCreateSheet('排序範例');
  sortSheet.clear();
  
  var data = [
    ['學號', '姓名', '分數'],
    ['A003', '張小美', 78],
    ['A001', '王小明', 95],
    ['A004', '陳小強', 88],
    ['A002', '李小華', 62]
  ];
  
  sortSheet.getRange(1, 1, data.length, 3).setValues(data);
  
  // 格式化標題
  sortSheet.getRange('A1:C1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  Logger.log('原始資料已建立');
  
  // 等待 1 秒
  Utilities.sleep(1000);
  
  // 依分數遞減排序
  var dataRange = sortSheet.getRange(2, 1, data.length - 1, 3);
  dataRange.sort({column: 3, ascending: false});
  
  Logger.log('✅ 已依分數遞減排序');
}

/**
 * 範例 7: 多欄位排序
 * ✅ GAS 完全支援
 */
function example07_multiColumnSort() {
  var sheet = getOrCreateSheet('多欄位排序');
  sheet.clear();
  
  Logger.log('=== 多欄位排序範例 ===\n');
  
  // 建立測試資料
  var data = [
    ['班級', '姓名', '分數'],
    ['A', '王小明', 85],
    ['B', '李小華', 92],
    ['A', '張小美', 92],
    ['B', '陳小強', 85],
    ['A', '林小芳', 78]
  ];
  
  sheet.getRange(1, 1, data.length, 3).setValues(data);
  sheet.getRange('A1:C1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 先依班級排序，再依分數遞減排序
  var dataRange = sheet.getRange(2, 1, data.length - 1, 3);
  dataRange.sort([
    {column: 1, ascending: true},   // 班級遞增
    {column: 3, ascending: false}   // 分數遞減
  ]);
  
  Logger.log('✅ 多欄位排序完成');
  Logger.log('排序規則: 1. 班級遞增 2. 分數遞減');
}

/**
 * 範例 8: 資料篩選
 * ✅ GAS 完全支援
 */
function example08_filtering() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 資料篩選範例 ===\n');
  
  // 建立測試資料
  var filterSheet = getOrCreateSheet('篩選範例');
  filterSheet.clear();
  
  var data = [
    ['學號', '姓名', '分數'],
    ['A001', '王小明', 95],
    ['A002', '李小華', 55],
    ['A003', '張小美', 78],
    ['A004', '陳小強', 88],
    ['A005', '林小芳', 45],
    ['A006', '黃小明', 92]
  ];
  
  filterSheet.getRange(1, 1, data.length, 3).setValues(data);
  
  // 篩選及格學生（分數 >= 60）
  var headers = data[0];
  var rows = data.slice(1);
  
  var passedStudents = rows.filter(function(row) {
    return row[2] >= 60;
  });
  
  Logger.log('總學生數: ' + rows.length);
  Logger.log('及格學生: ' + passedStudents.length);
  Logger.log('不及格學生: ' + (rows.length - passedStudents.length));
  
  // 將篩選結果寫入新工作表
  var resultSheet = getOrCreateSheet('及格名單');
  resultSheet.clear();
  
  var resultData = [headers].concat(passedStudents);
  resultSheet.getRange(1, 1, resultData.length, 3).setValues(resultData);
  resultSheet.getRange('A1:C1').setBackground('#4CAF50').setFontColor('white').setFontWeight('bold');
  
  Logger.log('\n✅ 篩選結果已寫入「及格名單」工作表');
}

/**
 * 範例 9: 複雜篩選條件
 * ✅ GAS 完全支援
 */
function example09_advancedFilter() {
  var sheet = getOrCreateSheet('進階篩選');
  sheet.clear();
  
  Logger.log('=== 進階篩選範例 ===\n');
  
  // 建立測試資料
  var data = [
    ['班級', '姓名', '分數'],
    ['A', '王小明', 95],
    ['B', '李小華', 78],
    ['A', '張小美', 55],
    ['B', '陳小強', 88],
    ['A', '林小芳', 92],
    ['B', '黃小明', 65]
  ];
  
  sheet.getRange(1, 1, data.length, 3).setValues(data);
  
  var headers = data[0];
  var rows = data.slice(1);
  
  // 篩選條件：A 班且分數 >= 80
  var filtered = rows.filter(function(row) {
    return row[0] === 'A' && row[2] >= 80;
  });
  
  Logger.log('篩選條件: A 班且分數 >= 80');
  Logger.log('符合條件: ' + filtered.length + ' 人');
  
  // 顯示結果
  for (var i = 0; i < filtered.length; i++) {
    Logger.log('  ' + filtered[i][1] + ': ' + filtered[i][2] + ' 分');
  }
  
  Logger.log('\n✅ 進階篩選完成');
}

// ==================== 公式操作範例 ====================

/**
 * 範例 10: 基本公式設定
 * ✅ GAS 完全支援
 */
function example10_basicFormulas() {
  var sheet = getOrCreateSheet('公式範例');
  sheet.clear();
  
  Logger.log('=== 基本公式範例 ===\n');
  
  // 建立測試資料
  var data = [
    ['姓名', '國文', '英文', '總分', '平均', '等級'],
    ['王小明', 85, 90, '', '', ''],
    ['李小華', 78, 82, '', '', ''],
    ['張小美', 92, 88, '', '', '']
  ];
  
  sheet.getRange(1, 1, data.length, 6).setValues(data);
  sheet.getRange('A1:F1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 設定公式
  for (var i = 2; i <= 4; i++) {
    // 總分 = 國文 + 英文
    sheet.getRange(i, 4).setFormula('=B' + i + '+C' + i);
    
    // 平均 = 總分 / 2
    sheet.getRange(i, 5).setFormula('=D' + i + '/2');
    
    // 等級 = IF(平均>=90,"優秀",IF(平均>=60,"及格","不及格"))
    sheet.getRange(i, 6).setFormula('=IF(E' + i + '>=90,"優秀",IF(E' + i + '>=60,"及格","不及格"))');
  }
  
  Logger.log('✅ 公式設定完成');
  Logger.log('D 欄: 總分公式');
  Logger.log('E 欄: 平均公式');
  Logger.log('F 欄: 等級公式');
}

/**
 * 範例 11: 批次設定公式
 * ✅ GAS 完全支援
 */
function example11_batchFormulas() {
  var sheet = getOrCreateSheet('批次公式');
  sheet.clear();
  
  Logger.log('=== 批次公式範例 ===\n');
  
  // 建立測試資料
  var data = [
    ['商品', '單價', '數量', '小計'],
    ['商品A', 100, 5, ''],
    ['商品B', 200, 3, ''],
    ['商品C', 150, 4, ''],
    ['商品D', 300, 2, '']
  ];
  
  sheet.getRange(1, 1, data.length, 4).setValues(data);
  sheet.getRange('A1:D1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 批次設定小計公式
  var formulas = [];
  for (var i = 2; i <= 5; i++) {
    formulas.push(['=B' + i + '*C' + i]);
  }
  
  sheet.getRange(2, 4, formulas.length, 1).setFormulas(formulas);
  
  // 設定總計
  sheet.getRange('A6').setValue('總計');
  sheet.getRange('A6').setFontWeight('bold');
  sheet.getRange('D6').setFormula('=SUM(D2:D5)');
  sheet.getRange('D6').setFontWeight('bold');
  
  Logger.log('✅ 批次公式設定完成');
  Logger.log('D2:D5: 小計公式（單價 × 數量）');
  Logger.log('D6: 總計公式（SUM）');
}

/**
 * 範例 12: 常用公式集合
 * ✅ GAS 完全支援
 */
function example12_commonFormulas() {
  var sheet = getOrCreateSheet('常用公式');
  sheet.clear();
  
  Logger.log('=== 常用公式集合 ===\n');
  
  // 建立測試資料
  sheet.getRange('A1:B1').setValues([['公式類型', '結果']]);
  sheet.getRange('A1:B1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 數學運算
  sheet.getRange('A2').setValue('SUM (加總)');
  sheet.getRange('B2').setFormula('=SUM(10,20,30)');
  
  sheet.getRange('A3').setValue('AVERAGE (平均)');
  sheet.getRange('B3').setFormula('=AVERAGE(10,20,30)');
  
  sheet.getRange('A4').setValue('MAX (最大值)');
  sheet.getRange('B4').setFormula('=MAX(10,20,30)');
  
  sheet.getRange('A5').setValue('MIN (最小值)');
  sheet.getRange('B5').setFormula('=MIN(10,20,30)');
  
  sheet.getRange('A6').setValue('ROUND (四捨五入)');
  sheet.getRange('B6').setFormula('=ROUND(3.14159,2)');
  
  // 文字處理
  sheet.getRange('A7').setValue('UPPER (轉大寫)');
  sheet.getRange('B7').setFormula('=UPPER("hello")');
  
  sheet.getRange('A8').setValue('LOWER (轉小寫)');
  sheet.getRange('B8').setFormula('=LOWER("HELLO")');
  
  sheet.getRange('A9').setValue('LEN (字串長度)');
  sheet.getRange('B9').setFormula('=LEN("Hello World")');
  
  sheet.getRange('A10').setValue('CONCATENATE (連接)');
  sheet.getRange('B10').setFormula('=CONCATENATE("Hello"," ","World")');
  
  // 日期函式
  sheet.getRange('A11').setValue('TODAY (今天)');
  sheet.getRange('B11').setFormula('=TODAY()');
  
  sheet.getRange('A12').setValue('NOW (現在)');
  sheet.getRange('B12').setFormula('=NOW()');
  
  // 條件判斷
  sheet.getRange('A13').setValue('IF (條件)');
  sheet.getRange('B13').setFormula('=IF(10>5,"大於","小於")');
  
  sheet.getRange('A14').setValue('COUNTIF (條件計數)');
  sheet.getRange('B14').setFormula('=COUNTIF(B2:B6,">20")');
  
  Logger.log('✅ 常用公式範例建立完成');
}

// ==================== 範圍保護範例 ====================

/**
 * 範例 13: 基本範圍保護
 * ✅ GAS 完全支援
 */
function example13_basicProtection() {
  var sheet = getOrCreateSheet('範圍保護');
  sheet.clear();
  
  Logger.log('=== 基本範圍保護範例 ===\n');
  
  // 建立測試資料
  var data = [
    ['姓名', '分數', '等級'],
    ['王小明', 85, 'B'],
    ['李小華', 92, 'A'],
    ['張小美', 78, 'C']
  ];
  
  sheet.getRange(1, 1, data.length, 3).setValues(data);
  sheet.getRange('A1:C1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 保護標題列
  var headerRange = sheet.getRange('1:1');
  var protection = headerRange.protect();
  protection.setDescription('標題列保護');
  protection.setWarningOnly(true); // 警告模式
  
  Logger.log('✅ 已保護標題列（警告模式）');
  Logger.log('使用者編輯時會看到警告訊息');
}

/**
 * 範例 14: 保護特定範圍
 * ✅ GAS 完全支援
 */
function example14_protectRange() {
  var sheet = getOrCreateSheet('範圍保護');
  
  Logger.log('=== 保護特定範圍 ===\n');
  
  // 保護 C 欄（等級欄）
  var gradeRange = sheet.getRange('C:C');
  var protection = gradeRange.protect();
  protection.setDescription('等級欄保護（由公式自動計算）');
  protection.setWarningOnly(true);
  
  Logger.log('✅ 已保護 C 欄（等級欄）');
}

/**
 * 範例 15: 保護工作表並設定例外範圍
 * ✅ GAS 完全支援
 */
function example15_protectSheetWithExceptions() {
  var sheet = getOrCreateSheet('工作表保護');
  sheet.clear();
  
  Logger.log('=== 保護工作表並設定例外 ===\n');
  
  // 建立測試資料
  var data = [
    ['項目', '可編輯', '唯讀'],
    ['資料1', '', '固定值1'],
    ['資料2', '', '固定值2'],
    ['資料3', '', '固定值3']
  ];
  
  sheet.getRange(1, 1, data.length, 3).setValues(data);
  sheet.getRange('A1:C1').setBackground('#4A90E2').setFontColor('white').setFontWeight('bold');
  
  // 保護整個工作表
  var protection = sheet.protect();
  protection.setDescription('工作表保護');
  
  // 設定 B 欄為可編輯範圍
  var unprotectedRange = sheet.getRange('B2:B4');
  protection.setUnprotectedRanges([unprotectedRange]);
  
  // 標示可編輯範圍
  unprotectedRange.setBackground('#E8F5E9'); // 淺綠色
  
  Logger.log('✅ 已保護工作表');
  Logger.log('可編輯範圍: B2:B4（淺綠色標示）');
}

/**
 * 範例 16: 檢查保護狀態
 * ✅ GAS 完全支援
 */
function example16_checkProtection() {
  var sheet = getOrCreateSheet('範圍保護');
  
  Logger.log('=== 檢查保護狀態 ===\n');
  
  // 檢查工作表保護
  var sheetProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  Logger.log('工作表保護數量: ' + sheetProtections.length);
  
  if (sheetProtections.length > 0) {
    Logger.log('工作表已保護');
    Logger.log('說明: ' + sheetProtections[0].getDescription());
  }
  
  // 檢查範圍保護
  var rangeProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  Logger.log('\n範圍保護數量: ' + rangeProtections.length);
  
  for (var i = 0; i < rangeProtections.length; i++) {
    var protection = rangeProtections[i];
    var range = protection.getRange();
    Logger.log('\n保護 ' + (i + 1) + ':');
    Logger.log('  範圍: ' + range.getA1Notation());
    Logger.log('  說明: ' + protection.getDescription());
    Logger.log('  警告模式: ' + protection.isWarningOnly());
  }
}

/**
 * 範例 17: 移除所有保護
 * ✅ GAS 完全支援
 */
function example17_removeAllProtections() {
  var sheet = getOrCreateSheet('範圍保護');
  
  Logger.log('=== 移除所有保護 ===\n');
  
  // 移除範圍保護
  var rangeProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  Logger.log('移除 ' + rangeProtections.length + ' 個範圍保護');
  
  for (var i = 0; i < rangeProtections.length; i++) {
    rangeProtections[i].remove();
  }
  
  // 移除工作表保護
  var sheetProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  Logger.log('移除 ' + sheetProtections.length + ' 個工作表保護');
  
  for (var i = 0; i < sheetProtections.length; i++) {
    sheetProtections[i].remove();
  }
  
  Logger.log('\n✅ 已移除所有保護');
}

// ==================== 綜合應用範例 ====================

/**
 * 範例 18: 完整成績表格式化
 * ✅ GAS 完全支援
 */
function example18_completeGradeSheet() {
  var sheet = getOrCreateSheet('完整成績表');
  sheet.clear();
  
  Logger.log('=== 完整成績表範例 ===\n');
  
  // 建立資料
  var data = [
    ['學號', '姓名', '國文', '英文', '數學', '總分', '平均', '等級'],
    ['A001', '王小明', 85, 90, 88, '', '', ''],
    ['A002', '李小華', 78, 82, 75, '', '', ''],
    ['A003', '張小美', 92, 88, 95, '', '', ''],
    ['A004', '陳小強', 65, 70, 68, '', '', ''],
    ['A005', '林小芳', 88, 85, 90, '', '', '']
  ];
  
  sheet.getRange(1, 1, data.length, 8).setValues(data);
  
  // 1. 格式化標題列
  var headerRange = sheet.getRange('A1:H1');
  headerRange.setBackground('#4A90E2');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // 2. 設定公式
  for (var i = 2; i <= 6; i++) {
    // 總分
    sheet.getRange(i, 6).setFormula('=C' + i + '+D' + i + '+E' + i);
    // 平均
    sheet.getRange(i, 7).setFormula('=F' + i + '/3');
    // 等級
    sheet.getRange(i, 8).setFormula('=IF(G' + i + '>=90,"優秀",IF(G' + i + '>=60,"及格","不及格"))');
  }
  
  // 3. 設定數字格式
  sheet.getRange('G2:G6').setNumberFormat('0.00');
  
  // 4. 條件格式化
  for (var i = 2; i <= 6; i++) {
    var avg = sheet.getRange(i, 7).getValue();
    var row = sheet.getRange(i, 1, 1, 8);
    
    if (avg >= 90) {
      row.setBackground('#C8E6C9'); // 綠色
    } else if (avg >= 60) {
      row.setBackground('#FFF9C4'); // 黃色
    } else {
      row.setBackground('#FFCDD2'); // 紅色
    }
  }
  
  // 5. 設定邊框
  sheet.getRange('A1:H6').setBorder(true, true, true, true, true, true);
  
  // 6. 建立統計區
  var statsRow = 8;
  sheet.getRange(statsRow, 1).setValue('統計資料');
  sheet.getRange(statsRow, 1).setFontWeight('bold').setBackground('#E3F2FD');
  
  sheet.getRange(statsRow + 1, 1).setValue('最高平均');
  sheet.getRange(statsRow + 1, 2).setFormula('=MAX(G2:G6)');
  
  sheet.getRange(statsRow + 2, 1).setValue('最低平均');
  sheet.getRange(statsRow + 2, 2).setFormula('=MIN(G2:G6)');
  
  sheet.getRange(statsRow + 3, 1).setValue('班級平均');
  sheet.getRange(statsRow + 3, 2).setFormula('=AVERAGE(G2:G6)');
  
  sheet.getRange(statsRow + 4, 1).setValue('及格人數');
  sheet.getRange(statsRow + 4, 2).setFormula('=COUNTIF(G2:G6,">=60")');
  
  sheet.getRange(statsRow + 1, 2, 4, 1).setNumberFormat('0.00');
  
  // 7. 保護標題列和公式欄
  var headerProtection = headerRange.protect();
  headerProtection.setDescription('標題列保護');
  headerProtection.setWarningOnly(true);
  
  var formulaRange = sheet.getRange('F2:H6');
  var formulaProtection = formulaRange.protect();
  formulaProtection.setDescription('公式欄保護');
  formulaProtection.setWarningOnly(true);
  
  Logger.log('✅ 完整成績表建立完成');
  Logger.log('包含: 格式化、公式、條件格式、統計、保護');
}

// ==================== 輔助函式 ====================

/**
 * 取得或建立工作表
 */
function getOrCreateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log('✅ 建立新工作表: ' + sheetName);
  }
  
  return sheet;
}

/**
 * 執行所有範例
 */
function runAllExamples() {
  Logger.log('========================================');
  Logger.log('開始執行所有格式化與進階操作範例');
  Logger.log('========================================\n');
  
  example01_numberFormat();
  Logger.log('\n----------------------------------------\n');
  
  example02_dateTimeFormat();
  Logger.log('\n----------------------------------------\n');
  
  example03_colors();
  Logger.log('\n----------------------------------------\n');
  
  example04_otherFormats();
  Logger.log('\n----------------------------------------\n');
  
  example05_conditionalFormatting();
  Logger.log('\n----------------------------------------\n');
  
  example06_sorting();
  Logger.log('\n----------------------------------------\n');
  
  example07_multiColumnSort();
  Logger.log('\n----------------------------------------\n');
  
  example08_filtering();
  Logger.log('\n----------------------------------------\n');
  
  example09_advancedFilter();
  Logger.log('\n----------------------------------------\n');
  
  example10_basicFormulas();
  Logger.log('\n----------------------------------------\n');
  
  example11_batchFormulas();
  Logger.log('\n----------------------------------------\n');
  
  example12_commonFormulas();
  Logger.log('\n----------------------------------------\n');
  
  example13_basicProtection();
  Logger.log('\n----------------------------------------\n');
  
  example14_protectRange();
  Logger.log('\n----------------------------------------\n');
  
  example15_protectSheetWithExceptions();
  Logger.log('\n----------------------------------------\n');
  
  example16_checkProtection();
  Logger.log('\n----------------------------------------\n');
  
  example18_completeGradeSheet();
  
  Logger.log('\n========================================');
  Logger.log('所有範例執行完成！');
  Logger.log('========================================');
}
