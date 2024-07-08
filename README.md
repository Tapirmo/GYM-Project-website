#  GYM Project Website Side Project

# 作品說明
這是一個健身課程網的Side project，使用者可以選擇教練或學員的身份進行註冊並登入。學員可以瀏覽、搜尋、註冊及退出課程。教練可以瀏覽其他教練課程、上架、修改、刪除課程。使用Restful routing的方式製作。

## 功能
* 上方欄為Nav bar
* About gym - 網站介紹。
* Register - 註冊為學員或是教練。
* Login/Logout - 登入或登出。
* All course - 學員可以添加課程。教練可以看到其他教練所發佈的課程。
* Profile - 學員/教練，所註冊的身分別及註冊資料。
* Course - 學員可以看到自己已選課程，並退出課程。教練可以看到自己開設的課程，進行課程修改或刪除。
* Search course - 學員可以搜尋課程。
* Post course - 教練可以開設新課程。

## 畫面
![GYMProject1](https://i.ibb.co/GtzsLwf/GYMProject1.png)
![GYMProject2](https://i.ibb.co/GMrbTyb/GYMProject2.png)
![GYMProject3](https://i.ibb.co/gSFmzvV/GYMProject3.png)

## 安裝
Node.js 版本建議為: v20.12.0 以上
React.js 版本建議為: v18.3.1 以上

### 安裝套件
npm install
- bcrypt@5.1.1
- cors@2.8.5
- dotenv@16.4.5
- express@4.19.2
- joi@17.13.3
- jsonwebtoken@9.0.2
- mongoose@8.4.3
- passport@0.7.0
- passport-jwt@4.0.1
- passport-local@1.0.0

### 環境變數設定
請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案
Terminal cmd gymProject> node index.js

### 開啟專案
專案運行後，在瀏覽器輸入以下即可看到畫面
http://localhost:3000/

### 環境變數說明

```env
PASSPORT_SECRET= #自行定義的本地驗證secret
```

### 資料夾說明
- client - 前端資料放置處
  - modules - 模組放置處
  - public - 靜態資源放置處(Bootstrap, font-awesome)
  - src - 資源放置處
    - component - 網頁頁面component放置處
    - img - 圖片放置處
    - style - 網頁樣是放置處
    - service - 連接後端auth & course routes
- server - 後端資料放置處
  - config - 驗證方法放置處
  - model - 課程Schema及User Schema放置處
  - modules - 模組放置處
  - routes - 網頁路徑放置處

### 專案技術
- Node.js v20.12.0
- React.js v18.3.1 
- Bootstrap v5.3.3
- font-awesome v6.5.2

## 聯絡作者
您可以透過以下的方式與我聯繫
我的Gmail信箱: uuya153@gmail.com