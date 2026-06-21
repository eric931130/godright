# 《神權崩壞》資安 Checklist

1. **不暴露 service account / 私鑰。** `FIREBASE_PRIVATE_KEY`、Supabase service role key 僅用於 server / 管理腳本，絕不進 client bundle，`.env.local` 不進版控。

2. **Admin PIN 不寫死於前端。** 二次驗證 PIN 以 `SHA256(salt:pin)` 雜湊儲存（`ADMIN_SECONDARY_PIN_HASH`），驗證在 `/api/admin/verify-pin`（server）。前端不含明碼。

3. **付費全文不到 client。** 付費章節頁 server 端 `safeChapter` 清空 `content`，只送 `excerpt`/`previewText`；正文需經 `/api/chapters/[id]/read` 權限檢查後回傳。

4. **Storage 不公開數位商品檔案。** `ebooks/`、`digital-products/` 規則 `read: if false`；下載走 server signed URL / 受控 API。

5. **Admin API 驗證 ID token。** 所有 `/api/admin/*` 經 `requireAdminRequest`：Bearer Firebase ID token + `admin` claim + 二次驗證 session 比對 uid。

6. **Firestore rules 不讓使用者改 role。** `users` 更新限 `publicProfileFieldsOnly()`（不含 `role`/`isBanned`）；建立時強制 `role:"user"`、`isBanned:false`。

7. **手動解鎖寫 audit log。** `/api/admin/manual-unlock` 經 `grantManualUnlock` 寫 `manualUnlockLogs` / `adminAuditLogs`。

8. **重要刪除二次確認。** 後台媒體刪除採二次確認，且使用中（`usedBy` 非空）的圖片不可刪。

9. **banned user 不可發文。** `hallPosts` / `hallComments` 規則含 `isNotBanned()` 檢查。

10. **所有表單 Zod 驗證。** 公開與後台表單（合作邀約、優惠碼、組合包、活動、章節、角色、商品）皆以 zod schema 於 server 端 `safeParse`。

## 其他

- 優惠碼驗證僅在 server；`coupons` 前台不可讀。
- 分析事件 `analyticsEvents` 僅可建立、不可被前台讀取全站資料。
- CSP、Referrer-Policy、X-Content-Type-Options 已於 `next.config.ts` 設定。
- App Check（reCAPTCHA v3）enforcement 開啟。
- 公開建立型 API（newsletter、collaboration、analytics）建議加上速率限制 / App Check 防濫用。
