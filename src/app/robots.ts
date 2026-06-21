import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin-verify", "/checkout", "/account/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
    host: siteConfig.url,
  };
}
