# 《神權崩壞》正式上線 Checklist

> 後端以 Firebase（Auth / Firestore / Storage）為主，資料層 `NEXT_PUBLIC_DATA_SOURCE` 預設 `mock`；
> 商業功能（分析、優惠碼、組合包、活動、媒體庫、合作邀約）為 Firestore 真實讀寫，未設定環境時自動 fallback。

## 1. 環境變數

- `NEXT_PUBLIC_FIREBASE_*`（apiKey / authDomain / projectId / storageBucket / messagingSenderId / appId）已設定。
- `FIREBASE_PROJECT_ID`、`FIREBASE_CLIENT_EMAIL`、`FIREBASE_PRIVATE_KEY`（Admin SDK）已設定，且 private key 換行正確。
- `ADMIN_SECONDARY_PIN_SALT` / `ADMIN_SECONDARY_PIN_HASH`（`npm run admin:hash-pin` 產生）已設定。
- `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY` 已設定（production reCAPTCHA）。
- `NEXT_PUBLIC_SITE_URL` 指向正式網域。
- `.env.local` 不進版控；`NEXT_PUBLIC_*` 僅放可公開值。

## 2. Firebase Auth

- Email 註冊 / 登入、Google、Apple 登入可用（Apple developer 設定完成）。
- 忘記密碼、Email verification、redirect URL 正確。
- 已用 `npm run admin:set-claim` 為管理者設定 `admin` custom claim。
- App Check enforcement 開啟後仍能登入與讀寫。

## 3. Firestore Rules（`firestore.rules` 已部署）

- `users` 僅本人/admin 可讀；本人只能改公開欄位、不能改 `role`。
- `chapters` 付費章節非 admin/未解鎖不可讀；`coupons` 前台不可讀（僅 server 驗證）。
- `analyticsEvents` 僅可建立、不可讀；`dailyMetrics` 僅 admin。
- `bundles` / `campaigns` 公開讀 active、admin 寫；`collaborationInquiries` 任何人建立、admin 讀。
- `couponRedemptions` 本人讀自己、admin 全部。
- 末端 catch-all 為 `allow read, write: if false`。

## 4. Storage Rules（`storage.rules` 已部署）

- `public/`、`ip-assets/`、角色/商品/活動圖公開讀、admin 寫（≤10MB 圖片）。
- `avatars/{uid}` 僅本人可寫（≤3MB）。
- `ebooks/`、`digital-products/` **不可公開讀**，需經 server signed URL / 受控 API。

## 5. Admin 權限

- 進入 `/admin/*` 需 Firebase 登入 + `admin` claim + `/admin-verify` 三次 PIN 二次驗證。
- 所有 admin API 經 `requireAdminRequest`（Bearer ID token + 二次驗證 session）。
- 非 admin 存取 `/admin` 顯示守衛畫面、API 回 401/403。

## 6. 付費章節權限

- 未授權只顯示鎖定頁（`/components/novel/chapter-reader.tsx` 的 `LockedChapter`）。
- 付費正文不在未授權 client payload（章節頁 server 端 `safeChapter` 清空 `content`）。
- `canReadChapter` 正確判斷 admin / VIP / 單章解鎖 / 整卷購買。

## 7. 商品購買流程

- 列表 / 詳情 / 加入購物車 / 優惠碼套用 / 結帳成功流程可操作。
- 優惠碼經 `/api/coupons/validate`（server）驗證有效期、次數、適用範圍。
- 組合包 `/shop/bundles` 可瀏覽、整組加入購物車。
- 接金流後：付款成功建立 `orders` 並解鎖權限；付款失敗不解鎖；退款撤銷權限。

## 8. 電子書 / 數位商品下載權限

- 下載必須經 `canDownloadProduct` 判斷購買紀錄。
- ebooks / digital-products 經 server signed URL，不公開直連。

## 9. SEO

- 各頁有 title / description / openGraph / twitter / canonical；商品與文章頁有 structured data。
- `sitemap.xml` 含新頁（rankings/characters、shop/bundles、collaboration、press-kit）。
- `robots.txt` 封鎖 `/admin`、`/admin-verify`、`/checkout`、`/account`、`/api`。
- OG image 可開啟；Google Search Console 已提交 sitemap。

## 10. RWD

- 首頁、小說閱讀、商品詳情、購物車、角色詳情、後台表格（水平捲動）手機版正常。
- 活動公告列 / 彈窗 / 倒數在手機版不爆版。

## 11. 404 / 錯誤頁

- 不存在的 slug 導向 `notFound()`；404 / 500 頁樣式正常。

## 12-14. 法務頁面

- `/privacy`、`/terms`、`/refund`、`/copyright` 完成審閱，聯絡信箱與工作室資訊替換為正式資料。

## 15. 備份

- Firestore 定期匯出備份（gcloud / 排程）。
- Storage bucket 版本化或定期備份；商品檔案保留 master copy。
- 部署平台環境變數定期匯出；金流訂單與 webhook log 保存法定期間。

## 內容上架

- 章節、電子書（含 `ebook` 進階欄位）、商品、角色圖、OG image 替換正式素材。
- 活動 / 優惠碼 / 組合包設定正確；未公開內容維持 draft / inactive。
