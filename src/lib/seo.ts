import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const defaultKeywords = [
  "神權崩壞",
  "誰是最後的天命之子",
  "天命之子",
  "七界宇宙",
  "東方神權幻想",
  "暗黑神殿",
  "角色圖鑑",
  "世界觀百科",
  "電子書商城",
  "原創小說 IP",
];

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article" | "book" | "profile";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  image = "/opengraph-image",
  publishedTime,
  modifiedTime,
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "zh_TW",
      url,
      siteName: siteConfig.shortName,
      title,
      description,
      images,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((item) => item.url),
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
