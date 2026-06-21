# 《神權崩壞》Supabase Database Schema

本文件是從 mock 架構切換到 Supabase 的資料庫契約。前台可先維持 `NEXT_PUBLIC_DATA_SOURCE=mock`，待表、RLS、Storage 與金流 webhook 完成後再切到 `supabase`。

通用欄位建議：所有核心表都包含 `id uuid primary key default gen_random_uuid()`、`created_at timestamptz default now()`、`updated_at timestamptz default now()`。需要公開瀏覽的表加 `status text check (status in ('draft','published','archived'))`。

## profiles

欄位：`id` uuid 必填，關聯 `auth.users.id`；`email` text 必填；`display_name` text；`role` text 必填，值為 `guest/user/paid_user/vip/admin`；`membership_tier` text；`avatar_url` text。

Index：`email unique`、`role`。  
RLS：使用者只能讀寫自己的 profile；admin 可讀寫全部。

## volumes

欄位：`title` text 必填；`slug` text 必填 unique；`description` text；`sort_order` int 必填；`status` text 必填。

Index：`slug unique`、`status, sort_order`。  
RLS：published 可公開讀取；admin 可 CRUD。

## chapters

欄位：`volume_id` uuid 必填，關聯 `volumes.id`；`title` text 必填；`slug` text 必填；`excerpt` text；`content` text 必填；`is_free` boolean 必填；`price` numeric 必填；`reading_time` text；`tags` text[]；`author_note` text；`published_at` timestamptz；`status` text 必填。

Index：`volume_id, slug unique`、`status, published_at desc`、`is_free`。  
RLS：免費且 published 可公開讀取；付費正文只允許已解鎖、VIP、admin 讀取。建議建立安全 view 分開公開摘要與完整正文。

## ebooks

欄位：`product_id` uuid 必填，關聯 `products.id`；`volume_id` uuid，關聯 `volumes.id`；`file_path` text 必填，指向 private storage path；`page_count` int；`word_count` text。

Index：`product_id unique`、`volume_id`。  
RLS：不可公開讀取 `file_path`；下載需透過 server 產生 signed URL。

## products

欄位：`title` text 必填；`slug` text 必填 unique；`subtitle` text；`description` text 必填；`price` numeric 必填；`original_price` numeric；`currency` text 必填；`category` text 必填；`type` text 必填；`cover_image` text；`gallery` text[]；`file_format` text[]；`download_type` text；`license_type` text；`is_digital` boolean；`is_featured` boolean；`metadata` jsonb；`status` text。

Index：`slug unique`、`category`、`type`、`is_featured`、`status`。  
RLS：published 商品公開讀取；admin CRUD。

## orders

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`order_number` text 必填 unique；`status` text 必填，值為 `pending/paid/failed/refunded`；`total_amount` numeric 必填；`currency` text 必填；`payment_provider` text；`provider_reference` text；`invoice_data` jsonb。

Index：`user_id, created_at desc`、`order_number unique`、`status`。  
RLS：使用者只看自己的訂單；admin 全部。

## order_items

欄位：`order_id` uuid 必填，關聯 `orders.id`；`product_id` uuid 必填，關聯 `products.id`；`quantity` int 必填；`unit_price` numeric 必填；`subtotal` numeric 必填。

Index：`order_id`、`product_id`。  
RLS：跟隨 order 權限。

## purchases

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`product_id` uuid，關聯 `products.id`；`volume_id` uuid，關聯 `volumes.id`；`chapter_id` uuid，關聯 `chapters.id`；`order_id` uuid，關聯 `orders.id`；`status` text 必填，值為 `active/refunded/revoked`。

Index：`user_id`、`product_id`、`volume_id`、`chapter_id`。  
RLS：使用者可讀自己的購買紀錄；只能由 server/webhook/admin 建立。

## chapter_unlocks

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`chapter_id` uuid 必填，關聯 `chapters.id`；`source` text 必填，值為 `single_chapter/volume_purchase/membership/admin_grant`；`expires_at` timestamptz。

Index：`user_id, chapter_id unique`、`chapter_id`。  
RLS：使用者可讀自己的解鎖；server/admin 建立。

## downloads

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`product_id` uuid 必填，關聯 `products.id`；`download_count` int 必填；`last_downloaded_at` timestamptz；`signed_url_expires_at` timestamptz。

Index：`user_id, product_id`、`last_downloaded_at desc`。  
RLS：使用者可讀自己的下載紀錄；新增紀錄需 server function，不能公開 storage URL。

## characters

欄位：`name` text 必填；`slug` text 必填 unique；`english_name` text；`title` text；`faction_id` uuid，關聯 `factions.id`；`role` text 必填；`race` text；`element` text[]；`color_palette` text[]；`profile` jsonb 必填，放 weapon/beast/appearance/personality/relationships；`image` text；`gallery` text[]；`status` text。

Index：`slug unique`、`faction_id`、`role`、`status`。  
RLS：published 公開讀取；admin CRUD。

## factions

欄位：`name` text 必填；`slug` text 必填 unique；`type` text 必填；`description` text；`emblem_color` text；`doctrine` text。

Index：`slug unique`、`type`。  
RLS：公開讀取；admin CRUD。

## lore_entries

欄位：`title` text 必填；`slug` text 必填 unique；`category` text 必填；`faction` text；`element` text；`summary` text；`content` text 必填；`tags` text[]；`status` text。

Index：`slug unique`、`category`、`status`、`tags gin`。  
RLS：published 公開讀取；admin CRUD。

## locations

欄位：`name` text 必填；`slug` text 必填 unique；`realm` text 必填；`faction` text；`palette` text[]；`function` text；`history` text；`atmosphere` text；`major_events` text[]；`image` text；`tags` text[]；`status` text。

Index：`slug unique`、`realm`、`faction`、`tags gin`。  
RLS：published 公開讀取；admin CRUD。

## artifacts

欄位：`name` text 必填；`slug` text 必填 unique；`type` text 必填；`holder` text；`element` text；`ability` text；`appearance` text；`palette` text[]；`meaning` text；`merch_ready` boolean；`tags` text[]；`status` text。

Index：`slug unique`、`type`、`holder`、`merch_ready`。  
RLS：published 公開讀取；admin CRUD。

## news_posts

欄位：`title` text 必填；`slug` text 必填 unique；`category` text 必填；`excerpt` text；`content` text 必填；`cover_image` text；`published_at` timestamptz；`is_pinned` boolean；`status` text。

Index：`slug unique`、`category`、`status, published_at desc`、`is_pinned`。  
RLS：published 公開讀取；admin CRUD。

## newsletter_subscribers

欄位：`email` text 必填 unique；`nickname` text；`topics` text[]；`status` text，值為 `active/unsubscribed`；`confirmed_at` timestamptz。

Index：`email unique`、`status`、`topics gin`。  
RLS：匿名可 insert 訂閱；只有 admin 可 list/update；使用 edge function 處理退訂 token。

## favorites

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`target_type` text 必填；`target_id` text 必填。

Index：`user_id, target_type, target_id unique`。  
RLS：使用者 CRUD 自己的收藏。

## bookshelf_items

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`chapter_id` uuid 必填，關聯 `chapters.id`；`volume_id` uuid，關聯 `volumes.id`；`note` text。

Index：`user_id, chapter_id unique`、`volume_id`。  
RLS：使用者 CRUD 自己的書架。

## reading_progress

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`chapter_id` uuid 必填，關聯 `chapters.id`；`progress` numeric 必填；`position` jsonb；`updated_at` timestamptz。

Index：`user_id, chapter_id unique`、`updated_at desc`。  
RLS：使用者 CRUD 自己的閱讀進度。

## badges

欄位：`code` text 必填 unique；`name` text 必填；`description` text；`color` text；`rule` jsonb。

Index：`code unique`。  
RLS：公開讀取；admin CRUD。

## user_badges

欄位：`user_id` uuid 必填，關聯 `profiles.id`；`badge_id` uuid 必填，關聯 `badges.id`；`earned_at` timestamptz。

Index：`user_id, badge_id unique`。  
RLS：使用者讀自己的徽章；server/admin 寫入。

## 重要實作策略

- 付費章節：公開 query 只回傳 `excerpt` 與 metadata；完整 `content` 由 server function 檢查 `chapter_unlocks`、`purchases`、VIP 或 admin 後回傳。
- 數位下載：商品檔案放 private bucket，永遠不要把真實 storage path 暴露到 client；下載 API 檢查 `purchases` 後建立 signed URL 並寫入 `downloads`。
- 金流：Stripe/ECPay webhook 驗證成功後更新 `orders.status=paid`，再建立 `purchases` 與 `chapter_unlocks`。
- Admin：以 `profiles.role='admin'` 和 `ADMIN_EMAILS` bootstrap 第一批管理者；所有管理寫入都走 server-side。
