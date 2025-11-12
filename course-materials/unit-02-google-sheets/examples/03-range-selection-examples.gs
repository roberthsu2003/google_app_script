/**
 * 範圍選取進階範例
 * 示範各種實用的範圍選取技巧
 */

/**
 * 範例 1: 選取整列和整欄
 * ✅ GAS 完全支援
 */
function example01_selectRowsColumns() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 選取整列和整欄 ===\n');
  
  // 選取第 3 列
  var row3 = sheet.getRange('3:3');
  Logger.log('第 3 列: ' + row3.getA1Notation());
  Logger.log('欄數: ' + row3.getNumColumns());
  
  // 選取第 1 到 5 列
  var rows1to5 = sheet.getRange('1:5');
  Logger.log('\n第 1 到 5 列: ' + rows1to5.getA1Notation());
  Logger.log('列數: ' + rows1to5.getNumRows());
  
  // 選取 B 欄
  var columnB = sheet.getRange('B:B');
  Logger.log('\nB 欄: ' + columnB.getA1Notation());
  Logger.log('列數: ' + columnB.getNumRows());
  
  // 選取 A 到 C 欄
  var columnsAtoC = sheet.getRange('A:C');
  Logger.log('\nA 到 C 欄: ' + columnsAtoC.getA1Notation());
  Logger.log('欄數: ' + columnsAtoC.getNumColumns());
}

/**
 * 範例 2: 動態選取範圍（根據資料大小）
 * ✅ GAS 完全支援
 */
function example02_dynamicRangeSelection() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 動態選取範圍 ===\n');
  
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  Logger.log('資料大小: ' + lastRow + ' 列 x ' + lastColumn + ' 欄\n');
  
  // 情境 1: 選取所有資料（包含標題）
  if (lastRow > 0 && lastColumn > 0) {
    var allData = sheet.getRange(1, 1, lastRow, lastColumn);
    Logger.log('所有資料: ' + allData.getA1Notation());
  }
  
  // 情境 2: 只選取資料列（排除標題）
  if (lastRow > 1 && lastColumn > 0) {
    var dataOnly = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    Logger.log('資料列: ' + dataOnly.getA1Notation());
  }
  
  // 情境 3: 選取特定欄的所有資料
  if (lastRow > 0) {
    var columnA = sheet.getRange(1, 1, lastRow, 1);
    Logger.log('A 欄: ' + columnA.getA1Notation());
    
    var columnB = sheet.getRange(1, 2, lastRow, 1);
    Logger.log('B 欄: ' + columnB.getA1Notation());
  }
  
  // 情境 4: 選取特定列的所有資料
  if (lastColumn > 0) {
    var row1 = sheet.getRange(1, 1, 1, lastColumn);
    Logger.log('第 1 列: ' + row1.getA1Notation());
  }
}

/**
 * 範例 3: 選取不連續的範圍
 * ✅ GAS 完全支援
 */
function example03_multipleRanges() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 選取多個範圍 ===\n');
  
  // 選取多個不連續的範圍
  var ranges = sheet.getRangeList(['A1:A5', 'C1:C5', 'E1:E5']).getRanges();
  
  Logger.log('選取了 ' + ranges.length + ' 個範圍:');
  for (var i = 0; i < ranges.length; i++) {
    Logger.log((i + 1) + '. ' + ranges[i].getA1Notation());
  }
  
  // 對所有範圍執行相同操作
  Logger.log('\n設定背景顏色為黃色...');
  for (var i = 0; i < ranges.length; i++) {
    ranges[i].setBackground('yellow');
  }
  Logger.log('✅ 完成');
}

/**
 * 範例 4: 根據內容尋找範圍
 * ✅ GAS 完全支援
 */
function example04_findRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 根據內容尋找範圍 ===\n');
  
  // 在整個工作表中尋找
  var searchText = '學號';
  var textFinder = sheet.createTextFinder(searchText);
  var foundRanges = textFinder.findAll();
  
  Logger.log('搜尋文字: ' + searchText);
  Logger.log('找到 ' + foundRanges.length + ' 個結果:');
  
  for (var i = 0; i < foundRanges.length; i++) {
    var range = foundRanges[i];
    Logger.log((i + 1) + '. ' + range.getA1Notation() + ' = "' + range.getValue() + '"');
  }
}

/**
 * 範例 5: 選取相鄰範圍
 * ✅ GAS 完全支援
 */
function example05_adjacentRanges() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRange = sheet.getRange('B2');
  
  Logger.log('=== 選取相鄰範圍 ===\n');
  Logger.log('起始範圍: ' + startRange.getA1Notation() + '\n');
  
  // 向右擴展
  var rightRange = startRange.offset(0, 0, 1, 3); // 向右 3 欄
  Logger.log('向右擴展: ' + rightRange.getA1Notation());
  
  // 向下擴展
  var downRange = startRange.offset(0, 0, 5, 1); // 向下 5 列
  Logger.log('向下擴展: ' + downRange.getA1Notation());
  
  // 向右下擴展
  var rightDownRange = startRange.offset(0, 0, 5, 3); // 向右 3 欄，向下 5 列
  Logger.log('向右下擴展: ' + rightDownRange.getA1Notation());
  
  // 偏移到其他位置
  var offsetRange = startRange.offset(2, 3); // 向下 2 列，向右 3 欄
  Logger.log('偏移範圍: ' + offsetRange.getA1Notation());
}

/**
 * 範例 6: 選取資料區域（自動偵測邊界）
 * ✅ GAS 完全支援
 */
function example06_dataRegion() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startCell = sheet.getRange('A1');
  
  Logger.log('=== 選取資料區域 ===\n');
  Logger.log('起始儲存格: ' + startCell.getA1Notation() + '\n');
  
  // 取得包含資料的連續區域
  var dataRegion = startCell.getDataRegion();
  Logger.log('資料區域: ' + dataRegion.getA1Notation());
  Logger.log('列數: ' + dataRegion.getNumRows());
  Logger.log('欄數: ' + dataRegion.getNumColumns());
  
  // 取得特定方向的資料區域
  var downRegion = startCell.getDataRegion(SpreadsheetApp.Dimension.ROWS);
  Logger.log('\n向下資料區域: ' + downRegion.getA1Notation());
  
  var rightRegion = startCell.getDataRegion(SpreadsheetApp.Dimension.COLUMNS);
  Logger.log('向右資料區域: ' + rightRegion.getA1Notation());
}

/**
 * 範例 7: 選取已命名的範圍
 * ✅ GAS 完全支援
 */
function example07_namedRanges() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 已命名範圍 ===\n');
  
  // 建立命名範圍
  var range = sheet.getRange('A1:C10');
  spreadsheet.setNamedRange('學生資料', range);
  Logger.log('✅ 建立命名範圍: 學生資料 = ' + range.getA1Notation());
  
  // 取得命名範圍
  var namedRange = spreadsheet.getRangeByName('學生資料');
  if (namedRange) {
    Logger.log('\n取得命名範圍:');
    Logger.log('名稱: 學生資料');
    Logger.log('範圍: ' + namedRange.getA1Notation());
  }
  
  // 列出所有命名範圍
  var namedRanges = spreadsheet.getNamedRanges();
  Logger.log('\n所有命名範圍:');
  for (var i = 0; i < namedRanges.length; i++) {
    var nr = namedRanges[i];
    Logger.log((i + 1) + '. ' + nr.getName() + ' = ' + nr.getRange().getA1Notation());
  }
}

/**
 * 範例 8: 合併和分割儲存格範圍
 * ✅ GAS 完全支援
 */
function example08_mergeUnmerge() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 合併和分割儲存格 ===\n');
  
  // 合併範圍
  var range = sheet.getRange('A1:C1');
  range.merge();
  Logger.log('✅ 合併範圍: ' + range.getA1Notation());
  
  // 檢查是否為合併儲存格
  var isMerged = range.isPartOfMerge();
  Logger.log('是否為合併儲存格: ' + (isMerged ? '是' : '否'));
  
  // 取得合併儲存格
  var mergedRanges = sheet.getRange('A1:E5').getMergedRanges();
  Logger.log('\n找到 ' + mergedRanges.length + ' 個合併儲存格:');
  for (var i = 0; i < mergedRanges.length; i++) {
    Logger.log((i + 1) + '. ' + mergedRanges[i].getA1Notation());
  }
  
  // 分割合併儲存格
  // range.breakApart();
  // Logger.log('✅ 已分割合併儲存格');
}

/**
 * 範例 9: 範圍的數學運算
 * ✅ GAS 完全支援
 */
function example09_rangeCalculations() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範圍數學運算 ===\n');
  
  // 假設 A1:A10 有數字資料
  var range = sheet.getRange('A1:A10');
  var values = range.getValues();
  
  // 計算總和
  var sum = 0;
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i][0] === 'number') {
      sum += values[i][0];
    }
  }
  Logger.log('總和: ' + sum);
  
  // 計算平均
  var count = 0;
  var total = 0;
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i][0] === 'number') {
      total += values[i][0];
      count++;
    }
  }
  var average = count > 0 ? total / count : 0;
  Logger.log('平均: ' + average.toFixed(2));
  
  // 找最大值和最小值
  var numbers = [];
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i][0] === 'number') {
      numbers.push(values[i][0]);
    }
  }
  
  if (numbers.length > 0) {
    var max = Math.max.apply(null, numbers);
    var min = Math.min.apply(null, numbers);
    Logger.log('最大值: ' + max);
    Logger.log('最小值: ' + min);
  }
}

/**
 * 範例 10: 範圍的條件篩選
 * ✅ GAS 完全支援
 */
function example10_filterRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範圍條件篩選 ===\n');
  
  // 假設資料格式：A 欄是姓名，B 欄是分數
  var dataRange = sheet.getRange('A2:B11'); // 排除標題列
  var values = dataRange.getValues();
  
  // 篩選分數大於 60 的資料
  var threshold = 60;
  var passedStudents = [];
  
  for (var i = 0; i < values.length; i++) {
    var name = values[i][0];
    var score = values[i][1];
    
    if (typeof score === 'number' && score > threshold) {
      passedStudents.push({
        name: name,
        score: score,
        row: i + 2 // 加 2 因為從第 2 列開始
      });
    }
  }
  
  Logger.log('分數大於 ' + threshold + ' 的學生:');
  Logger.log('共 ' + passedStudents.length + ' 人\n');
  
  for (var i = 0; i < passedStudents.length; i++) {
    var student = passedStudents[i];
    Logger.log((i + 1) + '. ' + student.name + ': ' + student.score + ' 分（第 ' + student.row + ' 列）');
  }
}

/**
 * 範例 11: 範圍的批次操作
 * ✅ GAS 完全支援
 */
function example11_batchOperations() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 範圍批次操作 ===\n');
  
  // 選取多個範圍
  var ranges = [
    sheet.getRange('A1:A5'),
    sheet.getRange('C1:C5'),
    sheet.getRange('E1:E5')
  ];
  
  Logger.log('選取 ' + ranges.length + ' 個範圍\n');
  
  // 批次設定背景顏色
  Logger.log('設定背景顏色...');
  var colors = ['#FFE5E5', '#E5FFE5', '#E5E5FF'];
  for (var i = 0; i < ranges.length; i++) {
    ranges[i].setBackground(colors[i]);
    Logger.log((i + 1) + '. ' + ranges[i].getA1Notation() + ' -> ' + colors[i]);
  }
  
  // 批次設定字體樣式
  Logger.log('\n設定字體樣式...');
  for (var i = 0; i < ranges.length; i++) {
    ranges[i].setFontWeight('bold');
    ranges[i].setHorizontalAlignment('center');
  }
  Logger.log('✅ 完成');
}

/**
 * 範例 12: 複製範圍到其他位置
 * ✅ GAS 完全支援
 */
function example12_copyRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 複製範圍 ===\n');
  
  // 來源範圍
  var sourceRange = sheet.getRange('A1:C5');
  Logger.log('來源範圍: ' + sourceRange.getA1Notation());
  
  // 目標範圍
  var targetRange = sheet.getRange('E1:G5');
  Logger.log('目標範圍: ' + targetRange.getA1Notation());
  
  // 複製值
  sourceRange.copyTo(targetRange, SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  Logger.log('✅ 已複製值');
  
  // 或複製格式
  // sourceRange.copyTo(targetRange, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  
  // 或複製所有內容（值 + 格式）
  // sourceRange.copyTo(targetRange);
}

/**
 * 範例 13: 範圍的進階選取技巧
 * ✅ GAS 完全支援
 */
function example13_advancedSelection() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  Logger.log('=== 進階選取技巧 ===\n');
  
  // 技巧 1: 選取最後一列的資料
  var lastRow = sheet.getLastRow();
  if (lastRow > 0) {
    var lastRowRange = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn());
    Logger.log('最後一列: ' + lastRowRange.getA1Notation());
  }
  
  // 技巧 2: 選取第一個空白列
  var firstEmptyRow = sheet.getLastRow() + 1;
  var firstEmptyRange = sheet.getRange(firstEmptyRow, 1, 1, sheet.getLastColumn());
  Logger.log('第一個空白列: ' + firstEmptyRange.getA1Notation());
  
  // 技巧 3: 選取特定欄的非空白儲存格
  var columnA = sheet.getRange('A:A');
  var values = columnA.getValues();
  var nonEmptyCount = 0;
  
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] !== '' && values[i][0] !== null) {
      nonEmptyCount++;
    }
  }
  Logger.log('A 欄非空白儲存格數: ' + nonEmptyCount);
  
  // 技巧 4: 選取包含特定文字的範圍
  var searchRange = sheet.getDataRange();
  var searchValues = searchRange.getValues();
  var keyword = '學號';
  var foundCells = [];
  
  for (var i = 0; i < searchValues.length; i++) {
    for (var j = 0; j < searchValues[i].length; j++) {
      if (searchValues[i][j].toString().indexOf(keyword) !== -1) {
        foundCells.push({
          row: i + 1,
          col: j + 1,
          value: searchValues[i][j]
        });
      }
    }
  }
  
  Logger.log('\n包含 "' + keyword + '" 的儲存格:');
  for (var i = 0; i < Math.min(foundCells.length, 5); i++) {
    var cell = foundCells[i];
    Logger.log((i + 1) + '. 第 ' + cell.row + ' 列第 ' + cell.col + ' 欄: ' + cell.value);
  }
}

/**
 * 實用函式：將欄號轉換為字母
 */
function columnToLetter(column) {
  var temp;
  var letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/**
 * 實用函式：將字母轉換為欄號
 */
function letterToColumn(letter) {
  var column = 0;
  var length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}
