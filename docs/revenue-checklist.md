# 《神權崩壞》營收轉換 Checklist

1. **商品頁完整。** 一般商品有規格 / 授權 / 推薦；電子書（`type:"ebook"` + `ebook` 欄位）顯示書封、作者序、收錄/試讀章節、特典、FAQ、推薦組合。

2. **付費章節鎖定頁具轉換內容。** 顯示精彩片段（`previewText`）、出場角色、世界觀、預估時間、單章 / 整卷 / VIP 解鎖、願望清單與付費異常回報，不洩漏正文。

3. **優惠碼可用。** `/api/coupons/validate` 正確檢查有效期、總次數、每人次數與適用範圍；購物車即時反映折扣。

4. **組合包可購買。** `/shop/bundles` 列表與詳情正常；「整組加入購物車」加入成員商品。

5. **訂單正確建立。** （接金流後）付款成功建立 `orders` / `orderItems` / 購買紀錄；目前為 mock checkout。

6. **付款成功解鎖內容。** 章節 / 整卷 / 商品下載權限於付款回呼後正確開通。

7. **付款失敗不解鎖。** 失敗 / 待付款狀態不得開通任何權限。

8. **下載權限正確。** `canDownloadProduct` 依購買紀錄判斷；ebooks 經 signed URL。

9. **付費異常可補救。** 後台手動解鎖（`/admin/manual-unlock`）可補開權限並寫 audit log；鎖定頁提供異常回報入口。

10. **購買紀錄顯示於會員中心。** `/account/purchases`、`/account/orders`、`/account/downloads` 正確呈現。

## 轉換追蹤（分析）

- 商品瀏覽 / 加入購物車 / 結帳開始 / 購買成功事件已埋點，後台 `/admin/analytics`、`/admin/analytics/products`、`/admin/analytics/ebooks` 可檢視漏斗。
- 角色人氣榜 `/admin/analytics/characters` 作為主推角色 / 周邊 / 貼圖決策參考。
- 待補：金流串接、`dailyMetrics` 排程彙總、電子書試讀點擊與付費解鎖率事件。
