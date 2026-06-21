# 《神權崩壞》正式上線 Checklist

## 功能檢查

- 首頁所有 CTA 可進入正確頁面。
- 小說總覽、卷頁、章節頁可正常瀏覽。
- 付費章節未授權時只顯示鎖定畫面。
- 商城列表、商品詳情、購物車、結帳成功流程可操作。
- 角色、勢力、百科、地圖、場地、物件頁可查詢。
- 後台 CMS 頁面可進入，非 admin 無權限。

## 付款檢查

- 測試金流模式可建立訂單。
- webhook 驗證簽章。
- 付款成功會建立 `orders`、`order_items`、`purchases`。
- 單章、整卷與商品權限正確解鎖。
- 退款會撤銷對應權限。

## 會員檢查

- Email 註冊登入可用。
- Google 登入可用。
- Apple 登入可用，並完成 Apple developer 設定。
- 忘記密碼、Email verification、redirect URL 正確。
- App Check enforcement 開啟後仍能登入與讀寫。

## SEO 檢查

- 首頁、小說、章節、商品、角色、百科、場地、物件、消息頁都有 metadata。
- `sitemap.xml` 可讀。
- `robots.txt` 可讀且封鎖 `/admin`、`/checkout`、`/account`。
- OG image 可開啟。
- canonical URL 使用正式網域。
- Google Search Console 已提交 sitemap。

## RWD 檢查

- 首頁手機版不爆版。
- 小說閱讀頁手機版字級、行距、上下章按鈕可用。
- 商品詳情頁 CTA 不重疊。
- 購物車列表可讀且可操作。
- 角色詳情頁色票、卡片、關係區塊正常換行。
- 世界觀百科搜尋與篩選可操作。
- 後台 dashboard 表格在手機版可水平捲動。

## 安全檢查

- `.env.local` 不提交。
- Supabase service role key 不出現在 client bundle。
- Firebase App Check 已設定 production site key。
- Firebase Storage rules 不允許未授權下載付費檔案。
- 付費章節正文不在未授權 client payload。
- API route/server action 都有錯誤處理與 Zod 驗證。
- 後台寫入操作需要 admin role。
- CSP、Referrer-Policy、X-Content-Type-Options 已設定。

## 法務頁面檢查

- `/terms` 服務條款完成審閱。
- `/privacy` 隱私權政策完成審閱。
- `/refund` 數位商品退款規則完成審閱。
- `/copyright` 著作權與 IP 授權聲明完成審閱。
- 聯絡信箱與公司/工作室資訊已替換為正式資料。

## 備份策略

- Supabase database 定期備份。
- Storage bucket 版本化或定期備份。
- 商品檔案保留原始 master copy。
- 部署平台環境變數定期匯出保存。
- 金流訂單與 webhook log 至少保存法定期間。

## 內容上架檢查

- 章節標題、slug、摘要、正文、價格正確。
- 電子書檔案可下載且格式正確。
- 商品授權文字完整。
- 角色圖、商品圖、OG image 替換正式素材。
- 最新消息與訂閱內容已校稿。
- 未公開內容維持 draft 或 restricted。
