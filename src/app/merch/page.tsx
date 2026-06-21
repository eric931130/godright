import { ComingSoonPage } from "@/components/site/coming-soon-page";

export default function MerchPage() {
  return (
    <ComingSoonPage
      eyebrow="Merch"
      title="IP 周邊"
      description="此區將展示角色卡、海報、貼圖、徽章、典藏套組與會員限定周邊。"
      items={[
        "角色卡組與七界星圖海報",
        "天魂、天芸貼圖包",
        "限量典藏商品與會員限定品",
        "商品圖片與庫存資料預留",
      ]}
    />
  );
}
