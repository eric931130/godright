import type { Metadata } from "next";

import { AdminVerifyForm } from "@/components/auth/admin-verify-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "開發者二次驗證｜神權崩壞",
  description: "神權崩壞開發者後台二次封印驗證。",
  path: "/admin-verify",
  keywords: ["開發者驗證", "後台權限", "Firebase Auth"],
});

export default function AdminVerifyPage() {
  return (
    <main className="site-container py-16">
      <AdminVerifyForm />
    </main>
  );
}
