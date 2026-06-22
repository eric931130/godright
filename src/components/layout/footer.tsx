import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { NewsletterForm } from "@/components/common/newsletter-form";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-divine-gold/18 bg-deep-space/82">
      <div className="site-container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="font-serif text-xl font-semibold text-platinum">
              《神權崩壞》
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              神權崩壞七界宇宙官方入口，整合小說閱讀、電子書商城、角色圖鑑、
              世界觀百科、IP 周邊與會員訂閱，讓讀者從首頁走進星界與神殿。
            </p>
            <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-divine-gold" aria-hidden="true" />
                {siteConfig.contactEmail}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-divine-gold" aria-hidden="true" />
                {siteConfig.studioName}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-platinum">
              快速連結
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-divine-gold"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-platinum">
              訂閱消息
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              接收章節更新、電子書預購、角色票選、周邊開賣與會員限定番外通知。
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-divine-gold/16" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 {siteConfig.studioName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {siteConfig.footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-divine-gold"
              >
                {item.title}
              </Link>
            ))}
            <span>著作權聲明：本網站內容、角色與世界觀為原創 IP 設定。</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
