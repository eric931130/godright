# Firebase Schema

本文件描述《神權崩壞》正式 Firebase 架構。前台仍可使用 mock data，正式資料可逐步切到 Firestore、Storage 與 server API。

## Auth 與權限

- Firebase Auth：Email、Google、Apple 登入。
- Admin 身分：Firebase Custom Claims 必須包含 `admin: true` 與 `role: "admin"`。
- 進入 `/admin` 還需要通過 `/admin-verify` 的三次 PIN 驗證，完成後 server 設定 httpOnly cookie。
- 所有 admin API 需同時驗證 ID Token、custom claim 與二次驗證 cookie。

## Collections

### users

用途：使用者 profile 與公開 UID。

欄位：

- `firebaseUid: string`，必填，文件 id。
- `publicUid: string`，必填，10 位數字公開識別碼。
- `email: string`，必填。
- `displayName: string`，必填。
- `avatarUrl?: string`。
- `role: "user" | "paid_user" | "vip" | "admin"`，必填。
- `createdAt: Timestamp`，必填。
- `updatedAt: Timestamp`，必填。
- `lastLoginAt?: Timestamp`。
- `featuredCharacterId?: string`。
- `bio?: string`。
- `readingStats.totalReadingMinutes: number`。
- `readingStats.totalReadChapters: number`。
- `readingStats.lastReadAt?: Timestamp`。
- `purchaseStats.totalPaidChapters: number`。
- `purchaseStats.totalSpent: number`。
- `isBanned: boolean`，必填。

Index：`publicUid` unique index collection、`email`、`role`。

Rules：使用者可讀寫自己的有限欄位；`role`、`purchaseStats`、`isBanned` 只能 admin 寫。

### publicUidCounters

用途：transaction 產生 10 位 Public UID。

欄位：

- `next: number`，目前下一個 UID。

Rules：client 不可讀寫，只允許 server/Admin SDK。

### publicUidIndex

用途：`publicUid -> firebaseUid` 查詢索引。

欄位：

- `firebaseUid: string`。
- `createdAt: Timestamp`。

Rules：admin 可讀；寫入由 server/Admin SDK。

### chapters

欄位：`id`、`slug`、`volumeSlug`、`title`、`excerpt`、`content`、`isFree`、`isPaid`、`price`、`publishedAt`、`readingTime`、`tags`、`status`。

Index：`volumeSlug + publishedAt`、`slug`、`isFree`。

Rules：免費章節可由 client 讀；付費章節完整正文建議只由 `/api/chapters/[chapterId]/read` 回傳。admin 可寫。

### volumes

欄位：`id`、`slug`、`title`、`description`、`sortOrder`、`price`、`isPublished`。

Rules：公開讀；admin 寫。

### chapterUnlocks

欄位：`userId`、`chapterId`、`source: "purchase" | "manual" | "vip"`、`createdAt`、`expiresAt?`、`adminUid?`。

Index：`userId + chapterId`。

Rules：使用者可讀自己的 unlock；只有 admin/server 可寫。

### volumePurchases / productPurchases

欄位：`userId`、`volumeId | productId`、`source`、`createdAt`、`expiresAt?`、`adminUid?`。

Rules：使用者可讀自己的購買；只有 admin/server 可寫。

### manualUnlockLogs

欄位：`adminUid`、`targetFirebaseUid`、`targetPublicUid`、`unlockType`、`targetId`、`reason`、`createdAt`、`expiresAt?`、`action`。

Rules：只有 admin 可讀寫。

### products / orders / orderItems

Products 欄位：`slug`、`title`、`subtitle`、`description`、`price`、`category`、`type`、`coverImage`、`fileFormat`、`downloadType`、`licenseType`、`isDigital`、`isPublished`。

Orders 欄位：`userId`、`email`、`status`、`total`、`currency`、`paymentProvider`、`createdAt`、`updatedAt`。

Order items 欄位：`orderId`、`userId`、`productId`、`title`、`quantity`、`unitPrice`。

Rules：商品公開讀/admin 寫；訂單只能本人與 admin 讀，寫入走 server。

### characters / factions

Characters 欄位：`slug`、`name`、`englishName`、`title`、`identity`、`realm`、`faction`、`role`、`element`、`abilities`、`colorPalette`、`intro`、`artifact`、`divineBeast`、`weapon`、`images`、`defaultImageMode`、`powerRank`、`relatedChapters`、`relatedProducts`、`tags`。

Rules：公開讀；admin 寫。

### loreEntries / locations / artifacts / newsPosts

用途：百科、場地、物件、最新消息。

共用欄位：`slug`、`title | name`、`category`、`summary`、`content`、`tags`、`relatedCharacters`、`relatedChapters`、`imageUrl`、`status`、`createdAt`、`updatedAt`。

Rules：公開讀；admin 寫。

### siteContent / mediaAssets

SiteContent 欄位：`key`、`title`、`description`、`imageUrl`、`mobileImageUrl`、`ctaText`、`ctaHref`、`isActive`、`updatedAt`、`updatedBy`。

MediaAsset 欄位：`fileName`、`filePath`、`url`、`contentType`、`size`、`width`、`height`、`alt`、`category`、`uploadedBy`、`createdAt`。

Rules：公開讀；admin 寫。Storage 檔案依 `storage.rules` 控制。

### hallPosts / hallComments / hallLikes / hallReports

Posts 欄位：`authorUid`、`authorPublicUid`、`authorDisplayName`、`title`、`content`、`category`、`tags`、`likeCount`、`commentCount`、`isPinned`、`isLocked`、`isHidden`、`isOfficial`。

Comments 欄位：`postId`、`authorUid`、`authorPublicUid`、`content`、`isHidden`。

Reports 欄位：`targetType`、`targetId`、`reporterUid`、`reason`、`status`。

Rules：guest 可讀未隱藏貼文；未停權 user 可發文留言；admin 可管理。

### readingProgress / favorites / bookshelfItems

欄位：`userId`、`targetType`、`targetId`、`chapterId`、`volumeId`、`progressPercent`、`lastPosition`、`readingMinutes`、`createdAt`、`updatedAt`。

Rules：使用者只能讀寫自己的資料；admin 可讀。

### badges / userBadges

Badges 公開讀/admin 寫。User badges 本人與 admin 可讀，只有 admin/server 寫。

### downloads

欄位：`userId`、`productId`、`downloadFormat`、`downloadCount`、`lastDownloadedAt`。

Rules：使用者可讀自己的紀錄；寫入由 server/admin。真實檔案 URL 不保存於 client 可讀資料。

### newsletterSubscribers

欄位：`email`、`nickname`、`topics`、`createdAt`、`source`。

Rules：任何人可新增；只有 admin 可讀寫。

### adminAuditLogs

欄位：`adminUid`、`action`、`targetType`、`targetId`、`before`、`after`、`reason`、`createdAt`。

Rules：只有 admin 可讀寫。

## Storage Paths

- `avatars/{uid}/{fileName}`：公開讀，本人上傳。
- `characters/{characterId}/portrait`、`chibi`、`banner`、`gallery/{imageId}`：公開讀，admin 寫。
- `homepage/**`、`products/**`、`lore/**`、`locations/**`、`artifacts/**`、`beasts/**`、`weapons/**`：公開圖片，admin 寫。
- `ebooks/**`、`digital-products/**`：不可公開讀，需 server 權限檢查後產 signed URL。

## 安全重點

- 不在 client 判斷 email 等於 admin。
- 不把 service role、private key、PIN 明文寫入 repo。
- 付費章節正文優先走 server API，不直接放在 client 公開可讀 collection。
- 手動解鎖、停權、刪文、上架等操作都要寫 `adminAuditLogs`。
