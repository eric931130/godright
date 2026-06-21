import { ComingSoonPage } from "@/components/site/coming-soon-page";

export default function CodexPage() {
  return (
    <ComingSoonPage
      eyebrow="World Atlas"
      title="世界觀百科"
      description="世界觀百科將收納三殿九尊、天界四神、星界七大守護神、七界霸主、古王國與上古封印條目。"
      items={[
        "百科詞條、陣營與時間線",
        "神殿、古王國與界域地圖資料",
        "章節引用與劇透等級控制",
        "世界觀 SEO 內容頁",
      ]}
    />
  );
}
