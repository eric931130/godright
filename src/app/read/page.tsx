import { ComingSoonPage } from "@/components/site/coming-soon-page";

export default function ReadPage() {
  return (
    <ComingSoonPage
      eyebrow="Scroll Reading"
      title="小說閱讀"
      description="這裡將承載《神權崩壞》的卷軸式章節閱讀體驗，包含免費章節、會員試閱、付費章節與閱讀進度。"
      items={[
        "章節目錄、卷別與更新狀態",
        "閱讀進度、書籤與章節註記",
        "會員限定番外與試閱權限",
        "SEO-friendly chapter metadata",
      ]}
    />
  );
}
