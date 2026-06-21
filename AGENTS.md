<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from older training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 專案總規格

## 專案目標

《神權崩壞：誰是最後的天命之子》官方網站是原創小說 IP 宇宙官網，整合小說閱讀、電子書商城、角色圖鑑、世界觀百科、場地物件、IP 周邊、最新消息與會員中心。

## 技術棧

- Next.js App Router，使用 `src/app`。
- TypeScript strict mode。
- Tailwind CSS v4，theme token 定義於 `src/app/globals.css`。
- shadcn/ui，基礎元件放在 `src/components/ui`。
- Framer Motion，用於頁面轉場與輕量 reveal。
- Supabase client 預留 Auth、Database、Storage。
- Zod 與 React Hook Form 用於表單驗證。
- Next.js Metadata API 用於 SEO。

## 程式碼風格

- 預設使用 Server Components；互動、動畫、瀏覽器 API 才使用 `"use client"`。
- 全站 layout 類元件放在 `src/components/layout`。
- 共用設計系統元件放在 `src/components/common`。
- 卡片元件放在 `src/components/cards`。
- 首頁區塊放在 `src/components/home`。
- Mock data 放在 `src/data/mock`。
- 使用 `@/*` import alias。

## 命名規範

- React component 使用 PascalCase。
- 函式與變數使用 camelCase。
- 檔名使用 kebab-case，Next.js 約定檔案除外。
- URL route 使用小寫 kebab-case。
- Supabase table 預計使用 snake_case。

## 色彩系統

- 深空黑 `#080814`
- 神界金 `#D9B45F`
- 星界紫 `#6D4DFF`
- 深淵紫黑 `#1A102E`
- 天界白金 `#F4EBD0`
- 魔殿暗藍 `#10223F`
- 夢幻粉紫 `#D9A7FF`
- 月光淡藍 `#A8D8FF`

Tailwind token：`deep-space`、`divine-gold`、`astral-purple`、`abyss-purple`、`platinum`、`demon-blue`、`dream-violet`、`moon-blue`。

## UI 設計原則

- 方向：東方神權幻想、暗黑神殿、星界命運、神魔對立、高級動漫 IP 官網。
- 主要視覺：毛玻璃卡片、金色神紋邊框、星雲背景、神殿光暈、卷軸式閱讀。
- 必須支援手機、平板、桌機 RWD。
- 動畫只用輕量 opacity、transform、background-position，避免影響效能。
- 按鈕與互動元件優先使用 shadcn/ui、lucide-react 與本專案 common 元件。
- 圖片目前使用 placeholder 區塊，未來替換成角色立繪、商品圖與場景圖。

## 資料結構原則

資料層採 Supabase client 路線。現階段使用 `src/data/mock`，後續可轉 seed 或查詢回傳模型。

預計核心資料表：

- `profiles`
- `membership_tiers`
- `novels`
- `chapters`
- `characters`
- `factions`
- `codex_entries`
- `products`
- `orders`
- `subscriptions`
- `media_assets`

## 安全原則

- 不提交 `.env.local` 或任何真實 secret。
- `NEXT_PUBLIC_*` 只放允許進瀏覽器的值。
- Supabase service role key 只能用於 server-side 或管理腳本。
- 會員、訂單、訂閱、閱讀權限必須在 server-side 驗證。
- 表單輸入必須使用 Zod 驗證。
- 使用 Supabase RLS 管理資料列權限。

## 後續開發階段

1. 階段 1：高質感首頁與完整 UI 設計系統。
2. 階段 2：Supabase schema、Auth、會員 profile 與 RLS。
3. 階段 3：小說閱讀平台、章節資料模型、閱讀進度、付費章節。
4. 階段 4：角色圖鑑、世界觀百科、勢力關係與搜尋篩選。
5. 階段 5：電子書商城、商品展示、訂單與數位藏書架。
6. 階段 6：周邊商品展示、Storage 圖片資產、管理後台。
7. 階段 7：SEO、OG image、sitemap、robots、效能與可近用性優化。

## 禁止事項

- 禁止假裝完成未執行的檢查。
- 禁止硬編碼真實金鑰、token、付款憑證或私人資料。
- 禁止在 client 端使用 Supabase service role key。
- 禁止把所有首頁邏輯集中在 `page.tsx`。
- 禁止引入與專案風格不一致的通用 SaaS 或普通小說部落格視覺。
- 禁止犧牲手機版可讀性來堆疊裝飾效果。
