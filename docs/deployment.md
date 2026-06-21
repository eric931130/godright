# 《神權崩壞》部署文件

## 本地啟動

```bash
npm install
npm run dev
```

正式檢查：

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## 環境變數

請以 `.env.example` 為基準建立 `.env.local`。不要提交 `.env.local`。

必要變數：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DATA_SOURCE`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `PAYMENT_PROVIDER`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY`

Firebase Web config 屬於 public config，但仍應在 Firebase Console 限制授權網域、App Check 與 Storage rules。

## Supabase 設定

1. 依 [database-schema.md](./database-schema.md) 建立資料表。
2. 啟用 RLS。
3. 建立 private buckets：`ip-assets`、`ebooks`、`merch`。
4. 將 service role key 僅放 server-side 環境變數。
5. 將 `NEXT_PUBLIC_DATA_SOURCE` 保持 `mock`，確認 Supabase provider 實作完成後再切到 `supabase`。

## Firebase 設定

目前已安裝：

- `firebase` Web SDK
- Firebase CLI `15.22.0`

專案檔案：

- `.firebaserc`
- `firebase.json`
- `storage.rules`
- `apphosting.yaml`
- `src/lib/firebase/client.ts`

登入與部署：

```bash
npm run firebase:login
firebase init
npm run firebase:deploy
```

Next.js SSR 建議使用 Firebase App Hosting。Firebase 官方文件也建議新的 Next.js 專案優先使用 App Hosting；傳統 Hosting web frameworks 實驗對新 Next.js 使用者已不再建議。若使用 Hosting framework-aware deploy，需確認 CLI 與專案已支援目前 Next.js 版本。

## Vercel 部署方式

1. 匯入 Git repository。
2. Framework 選 `Next.js`。
3. Build command：`npm run build`。
4. Output 使用 Vercel 預設。
5. 在 Vercel Project Settings 設定所有環境變數。
6. Production domain 設為正式網域後，更新 `NEXT_PUBLIC_SITE_URL`。

## 網域設定

- Production：設定正式網域，例如 `https://godright.example.com`。
- Firebase：將正式網域加入 Authorized domains、App Check allowed domains。
- Firebase Storage：部署前確認 `storage.rules`，付費檔案應放 `ebooks/` 或 private 路徑，避免 client 直接讀取。
- Supabase：Auth redirect URLs 加入正式網域與本地開發網域。
- SEO：確認 `sitemap.xml`、`robots.txt`、canonical URL 都使用正式網域。

## 上線前 Checklist

- `npm run lint` 通過。
- `npm run typecheck` 通過。
- `npm run build` 通過。
- 付費章節正文不可在未授權 client payload 中出現。
- 數位下載走 server 權限檢查與 signed URL。
- Admin guard 改接正式 role。
- Storage bucket 使用 private rules。
- 金流 webhook 已驗證簽章。
- 法務頁已由權責人審閱。

## 常見錯誤排查

- Firebase Analytics 在 SSR 報錯：只在 browser 呼叫 `getFirebaseAnalytics()`，並使用 `isSupported()`。
- App Check 沒有 token：確認 `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY`、網域與 Firebase Console 設定。
- Next build 找不到 env：確認部署平台 Production environment 已設定所有 `NEXT_PUBLIC_*`。
- Supabase 權限錯誤：檢查 RLS policy 與使用者 JWT role。
- 下載 403：確認使用者有 `purchases` 紀錄，且 server 產生 signed URL，而不是直接公開 storage URL。
- Firebase deploy 要求登入：先執行 `firebase login`，或 CI 使用 service account/token。
