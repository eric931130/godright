# 《神權崩壞》後台操作手冊

## 1. 登入後台

1. 以具 `admin` custom claim 的 Firebase 帳號於 `/login` 登入。
2. 若帳號尚無權限，請工程端執行 `npm run admin:set-claim`（設定 `ADMIN_FIREBASE_UID`）。

## 2. 通過二次驗證

1. 進入任一 `/admin/*` 會被導向 `/admin-verify`。
2. 輸入開發者 PIN（三次封印驗證）。PIN 由 `npm run admin:hash-pin` 產生並設定於環境變數。
3. 驗證成功後建立 session，方可操作後台。

## 3. 新增章節

- `/admin/chapters` → 新增章節，填標題、slug、卷、摘要、正文、是否付費、價格。
- 付費章節可填 `previewText`（精彩片段）、出場角色與世界觀關鍵字。

## 4. 排程發布

- 設定 `publishedAt` 為未來時間以規劃上架；正式排程發布需搭配資料層 / 排程作業（待金流與 Firestore 內容遷移後啟用）。

## 5. 新增商品

- `/admin/products` → 新增商品，填分類、價格、檔案格式、授權。
- 電子書另填 `ebook` 進階欄位（作者序、收錄章節、特典、FAQ、推薦組合）。

## 6. 優惠碼與組合包

- `/admin/coupons` 建立優惠碼（百分比 / 固定額、適用範圍、有效期、次數限制）。
- `/admin/bundles` 建立組合包（成員商品 slug、組合價；原價自動加總）。

## 7. 活動 / Banner

- `/admin/campaigns` 建立公告列 / 彈窗 / Hero banner / 倒數，設定顯示頁面（留空=全站）、優先順序與起訖時間。

## 8. 媒體素材

- `/admin/media` 批次上傳圖片（含分類與標籤），可搜尋、篩選、複製 URL。
- 將複製的 URL 貼入角色 / 商品 / 活動表單套用；未使用圖片可二次確認後刪除（使用中不可刪）。

## 9. 手動解鎖 / 處理付費異常

- `/admin/manual-unlock` 以 Public UID / Email 為使用者補開單章 / 整卷 / 商品 / VIP 權限，並寫入 audit log（`/admin/audit-log` 可查）。

## 10. 數據分析

- `/admin/analytics` 總覽流量、註冊、閱讀、轉換與營收。
- `/admin/analytics/characters | products | ebooks` 檢視角色人氣與商品 / 電子書轉換。

## 11. 合作邀約

- `/admin/collaboration-inquiries` 檢視前台 `/collaboration` 送出的洽詢，點 Email 直接回信。

## 12. 備份 / 還原

- 備份：定期匯出 Firestore（gcloud firestore export）與 Storage bucket；保存環境變數與金流 log。
- 還原：以對應匯出檔 `gcloud firestore import` 還原；Storage 由版本化或備份還原。建議先於測試專案演練。
