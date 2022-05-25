# 短網址產生器

## 介紹
使用者可以在將網址縮短,使網址變得簡潔乾淨
### 功能

基本功能：

- 使用者可以將網址縮短
- 使用者可以直接複製新產生的短網址
- 使用者可以透過新產生的短網址連到原本的網址目的地
- 相同的網址只會產生同一組短網址


## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4.MongoDB 路由設定(終端機)
   ```bash
   export MONGODB_URI="<根據自己的MONGODB_URI及帳號密碼做設定>"
   ```

5. 安裝及設置完畢後，繼續輸入：

   ```bash
   npm run start
   ```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

7. 暫停使用

   ```bash
   ctrl + c
   ```
## 開發工具

- Node.js 14.16.0
- Express 4.18.1
- Express-Handlebars 3.1.0
- Bootstrap 4.6.1
- body-parser 1.20.0

- MongoDB
- mongoose 6.3.4
