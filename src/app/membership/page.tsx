import { ComingSoonPage } from "@/components/site/coming-soon-page";

export default function MembershipPage() {
  return (
    <ComingSoonPage
      eyebrow="Divine Membership"
      title="會員中心"
      description="會員中心將整合登入、訂閱等級、閱讀權限、限定內容、收藏與活動通知。"
      items={[
        "Supabase Auth 登入與 profile",
        "Reader、Collector、Oracle 訂閱層級",
        "限定章節、番外與先行試讀",
        "會員資料驗證與 RLS 權限",
      ]}
    />
  );
}
