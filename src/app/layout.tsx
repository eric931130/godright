import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { RouteAnalytics } from "@/components/analytics/track-event";
import { FirebaseClientBootstrap } from "@/components/firebase/firebase-client-bootstrap";
import { SiteShell } from "@/components/site/site-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  manifest: "/manifest.json",
  authors: [{ name: "Godright IP Studio" }],
  creator: "Godright IP Studio",
  publisher: "Godright IP Studio",
  keywords: [
    "神權崩壞",
    "天命之子",
    "七界宇宙",
    "東方神權幻想",
    "原創小說",
    "角色圖鑑",
    "世界觀百科",
    "電子書商城",
    "文創 IP",
  ],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="dark">
      <body>
        <FirebaseClientBootstrap />
        <RouteAnalytics />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
