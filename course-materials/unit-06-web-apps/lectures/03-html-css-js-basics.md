# HTML/CSS/JavaScript 基礎

## 學習目標

- 掌握基本 HTML 標籤
- 學習 CSS 樣式設定
- 理解 JavaScript DOM 操作
- 能夠使用 Bootstrap 框架

## HTML 基本標籤

### 常用標籤

```html
<!-- 標題 -->
<h1>主標題</h1>
<h2>次標題</h2>

<!-- 段落 -->
<p>這是一個段落</p>

<!-- 連結 -->
<a href="https://example.com">連結文字</a>

<!-- 圖片 -->
<img src="image.jpg" alt="圖片說明">

<!-- 列表 -->
<ul>
  <li>項目 1</li>
  <li>項目 2</li>
</ul>

<!-- 表格 -->
<table>
  <tr>
    <th>標題</th>
    <th>內容</th>
  </tr>
  <tr>
    <td>資料 1</td>
    <td>資料 2</td>
  </tr>
</table>

<!-- 表單 -->
<form>
  <input type="text" placeholder="輸入文字">
  <button type="submit">提交</button>
</form>

<!-- 容器 -->
<div>區塊容器</div>
<span>行內容器</span>
```

## CSS 基本樣式

### 選擇器

```css
/* 標籤選擇器 */
h1 {
  color: blue;
}

/* Class 選擇器 */
.my-class {
  font-size: 16px;
}

/* ID 選擇器 */
#my-id {
  background: yellow;
}
```

### 常用屬性

```css
/* 文字 */
color: #333;
font-size: 16px;
font-weight: bold;
text-align: center;

/* 背景 */
background-color: #f5f5f5;
background: linear-gradient(to right, #667eea, #764ba2);

/* 間距 */
margin: 10px;
padding: 20px;

/* 邊框 */
border: 1px solid #ddd;
border-radius: 4px;

/* 尺寸 */
width: 100%;
height: 200px;
max-width: 800px;

/* 顯示 */
display: block;
display: flex;
display: none;
```

## JavaScript DOM 操作

### 取得元素

```javascript
// 透過 ID
var element = document.getElementById('myId');

// 透過 Class
var elements = document.getElementsByClassName('myClass');

// 透過標籤
var divs = document.getElementsByTagName('div');

// 透過選擇器
var element = document.querySelector('.myClass');
var elements = document.querySelectorAll('.myClass');
```

### 修改內容

```javascript
// 修改文字
element.textContent = '新文字';
element.innerHTML = '<strong>HTML 內容</strong>';

// 修改屬性
element.setAttribute('class', 'newClass');
element.style.color = 'red';

// 修改樣式
element.style.display = 'none';
element.style.backgroundColor = '#f5f5f5';
```

### 事件處理

```javascript
// 點擊事件
element.addEventListener('click', function() {
  alert('被點擊了！');
});

// 表單提交
form.addEventListener('submit', function(e) {
  e.preventDefault(); // 防止頁面重新載入
  // 處理表單
});

// 輸入事件
input.addEventListener('input', function(e) {
  console.log(e.target.value);
});
```

## 使用 Bootstrap

### 引入 Bootstrap

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
```

### 常用元件

```html
<!-- 按鈕 -->
<button class="btn btn-primary">主要按鈕</button>
<button class="btn btn-success">成功按鈕</button>

<!-- 表單 -->
<div class="mb-3">
  <label class="form-label">標籤</label>
  <input type="text" class="form-control">
</div>

<!-- 卡片 -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">標題</h5>
    <p class="card-text">內容</p>
  </div>
</div>

<!-- 容器 -->
<div class="container">
  <div class="row">
    <div class="col-md-6">左側</div>
    <div class="col-md-6">右側</div>
  </div>
</div>
```

## 完整範例

請參考 examples 資料夾中的範例檔案。

## GAS 支援說明

✅ **完全支援**：HTML/CSS/JavaScript 的基本功能在 GAS Web App 中都完全支援。

## 下一步

結合所學知識，開發實作案例 7 和 8。
