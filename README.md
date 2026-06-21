# 神權崩壞官方網站

《神權崩壞：誰是最後的天命之子》官方網站是一個原創小說 IP 宇宙官網，規劃整合小說閱讀、電子書商城、角色圖鑑、世界觀百科、場地物件、IP 周邊、最新消息與會員中心。

## 技術棧

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Supabase client 預留 Auth、Database、Storage
- Zod
- React Hook Form
- Next.js Metadata SEO

## 快速開始

```bash
npm install
npm run dev
```

開發伺服器預設位於 `http://localhost:3000`。

## 檢查指令

```bash
npm run lint
npm run typecheck
npm run build
```

## 專案結構

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    cards/
    common/
    home/
    layout/
    site/
    ui/
  config/
    site.ts
  data/
    mock/
  lib/
    supabase/
    validations/
```

## 階段 1 完成範圍

- 全站 Header、Desktop navigation、Mobile hamburger menu、Footer
- 星空背景、神殿光暈、封印陣、頁面轉場、回到頂部按鈕
- 高質感首頁 Hero 與 9 個內容區塊
- 共用 UI 元件與卡片元件
- 繁體中文 mock data
- 訂閱表單前端驗證
- RWD 手機、平板、桌機版面基礎

## Mock Data

目前資料都在 `src/data/mock`：

- `characters.ts`：8 位角色
- `chapters.ts`：8 個章節
- `products.ts`：6 個商品
- `lore.ts`：8 個世界觀條目
- `news.ts`：5 則最新消息
- `ranks.ts`：8 個戰力位階

## 下一階段建議

1. 建立 Supabase schema 與 RLS。
2. 將 mock data 轉成 seed 或 CMS 管理資料。
3. 實作小說閱讀器與章節動態路由。
4. 實作角色圖鑑與世界觀百科搜尋篩選。
5. 接上會員中心、電子書購買與數位藏書架。
