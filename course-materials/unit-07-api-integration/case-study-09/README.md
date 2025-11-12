# 實作案例 9：天氣查詢 Web App

## 專案簡介

建立一個天氣查詢 Web 應用程式，使用者可以輸入城市名稱查詢當前天氣資訊。本專案整合 OpenWeatherMap API，展示如何在 Google Apps Script 中呼叫外部 API、處理 JSON 資料、實作錯誤處理和快取機制。

## 學習目標

- 整合第三方天氣 API
- 建立使用者友善的 Web 介面
- 處理 API 回應的 JSON 資料
- 實作完整的錯誤處理機制
- 使用快取機制減少 API 呼叫
- 提升使用者體驗

## 功能需求

### 核心功能

1. **城市天氣查詢**
   - 使用者輸入城市名稱
   - 顯示當前溫度、體感溫度
   - 顯示天氣描述（晴天、多雲等）
   - 顯示濕度、風速等資訊

2. **錯誤處理**
   - 處理城市不存在的情況
   - 處理 API 呼叫失敗
   - 顯示使用者友善的錯誤訊息
   - 網路錯誤提示

3. **快取機制**
   - 快取查詢結果（避免重複呼叫 API）
   - 快取時間：10 分鐘
   - 顯示資料來源（API 或快取）

4. **使用者介面**
   - 簡潔美觀的查詢介面
   - 即時顯示查詢結果
   - 載入狀態提示
   - 響應式設計

### 進階功能（選擇性）

1. **多城市比較**
   - 同時查詢多個城市
   - 並排顯示比較結果

2. **歷史記錄**
   - 記錄查詢過的城市
   - 快速重新查詢

3. **天氣圖示**
   - 根據天氣狀況顯示對應圖示
   - 使用 OpenWeatherMap 提供的圖示

## 技術架構

### 前端（HTML/CSS/JavaScript）

- **HTML**：表單、結果顯示區域
- **CSS**：Bootstrap 5 樣式框架
- **JavaScript**：
  - 表單提交處理
  - google.script.run 呼叫後端
  - 動態更新 UI

### 後端（Google Apps Script）

- **API 整合**：
  - UrlFetchApp 呼叫 OpenWeatherMap API
  - JSON 資料解析
  - 錯誤處理

- **快取管理**：
  - CacheService 儲存查詢結果
  - 快取鍵值設計

- **資料處理**：
  - 提取需要的天氣資訊
  - 格式化回傳資料

## 資料結構

### API 請求

```
GET https://api.openweathermap.org/data/2.5/weather
參數：
  - q: 城市名稱（例如：Taipei）
  - appid: API Key
  - units: metric（使用攝氏溫度）
  - lang: zh_tw（中文描述）
```

### API 回應（簡化）

```json
{
  "name": "Taipei",
  "main": {
    "temp": 28.5,
    "feels_like": 30.2,
    "humidity": 65
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "多雲",
      "icon": "02d"
    }
  ],
  "wind": {
    "speed": 3.5
  }
}
```

### 回傳給前端的資料

```javascript
{
  success: true,
  data: {
    city: "Taipei",
    temperature: 28.5,
    feelsLike: 30.2,
    humidity: 65,
    description: "多雲",
    icon: "02d",
    windSpeed: 3.5
  },
  fromCache: false,
  timestamp: "2024-01-15 14:30:00"
}
```

## 開發步驟

### 步驟 1：註冊 OpenWeatherMap API

1. 前往 [OpenWeatherMap](https://openweathermap.org/api)
2. 註冊免費帳號
3. 取得 API Key
4. 在 GAS 中設定 API Key（使用 PropertiesService）

### 步驟 2：建立後端 API 呼叫函式

1. 建立 `getWeather(city)` 函式
2. 使用 UrlFetchApp 呼叫 API
3. 解析 JSON 回應
4. 提取需要的資訊
5. 實作錯誤處理

### 步驟 3：實作快取機制

1. 檢查快取中是否有資料
2. 如果有，直接回傳快取資料
3. 如果沒有，呼叫 API 並儲存到快取

### 步驟 4：建立 Web 介面

1. 建立 HTML 檔案
2. 設計表單（城市輸入框、查詢按鈕）
3. 設計結果顯示區域
4. 加入 Bootstrap 樣式

### 步驟 5：實作前後端互動

1. 表單提交事件處理
2. 使用 google.script.run 呼叫後端
3. 顯示載入狀態
4. 更新 UI 顯示結果
5. 處理錯誤訊息

### 步驟 6：測試與優化

1. 測試正常查詢
2. 測試錯誤情況（城市不存在）
3. 測試快取功能
4. 優化使用者體驗

## 使用說明

### 設定 API Key

```javascript
function setupApiKey() {
  var apiKey = 'your_openweathermap_api_key_here';
  PropertiesService.getScriptProperties().setProperty('WEATHER_API_KEY', apiKey);
  Logger.log('✅ API Key 已設定');
}
```

### 部署 Web App

1. 點選「部署」→「新增部署作業」
2. 選擇「網頁應用程式」
3. 執行身分：我
4. 存取權：任何人
5. 點選「部署」
6. 複製 Web App URL

### 使用 Web App

1. 開啟 Web App URL
2. 輸入城市名稱（英文，例如：Taipei、Tokyo、London）
3. 點選「查詢天氣」按鈕
4. 查看天氣資訊

## 常見問題

### Q1：API Key 無效

**問題**：顯示「API Key 無效」錯誤

**解決方案**：
1. 確認已正確設定 API Key
2. 檢查 API Key 是否已啟用（新註冊的 Key 可能需要幾小時才能啟用）
3. 確認 API Key 沒有多餘的空格

### Q2：找不到城市

**問題**：輸入城市名稱後顯示「找不到城市」

**解決方案**：
1. 使用英文城市名稱
2. 檢查拼字是否正確
3. 嘗試使用完整城市名稱（例如：New York 而非 NY）

### Q3：快取沒有作用

**問題**：每次查詢都呼叫 API

**解決方案**：
1. 檢查快取鍵值是否正確
2. 確認快取時間設定
3. 查看 Logger 確認快取狀態

### Q4：顯示亂碼

**問題**：天氣描述顯示亂碼

**解決方案**：
1. 確認 API 請求中有加入 `lang=zh_tw` 參數
2. 檢查 HTML 檔案的編碼設定

## 擴展建議

### 功能擴展

1. **5 天天氣預報**
   - 使用 `/forecast` API 端點
   - 顯示未來 5 天的天氣

2. **地理位置自動偵測**
   - 使用瀏覽器的 Geolocation API
   - 自動查詢使用者所在地天氣

3. **多語言支援**
   - 支援中文、英文介面切換
   - 使用不同語言的天氣描述

4. **資料視覺化**
   - 使用 Chart.js 繪製溫度趨勢圖
   - 顯示風向圖

5. **通知功能**
   - 設定溫度警報
   - 自動發送郵件通知

### 技術優化

1. **效能優化**
   - 實作請求去抖動（debounce）
   - 預載常用城市資料

2. **錯誤處理增強**
   - 更詳細的錯誤分類
   - 錯誤日誌記錄

3. **UI/UX 改進**
   - 加入動畫效果
   - 深色模式支援
   - 更豐富的天氣圖示

## 學習重點

完成本專案後，你將學會：

✅ 如何整合第三方 API
✅ 處理 API 認證（API Key）
✅ 解析和處理 JSON 資料
✅ 實作完整的錯誤處理
✅ 使用快取機制優化效能
✅ 建立互動式 Web 應用程式
✅ 前後端資料傳遞
✅ 提升使用者體驗的技巧

## 相關資源

- [OpenWeatherMap API 文件](https://openweathermap.org/api)
- [Bootstrap 5 文件](https://getbootstrap.com/docs/5.0/)
- [Google Apps Script HTML Service](https://developers.google.com/apps-script/guides/html)
- [CacheService 文件](https://developers.google.com/apps-script/reference/cache/cache-service)

## 授權

本專案僅供教學使用。OpenWeatherMap API 的使用需遵守其服務條款。
