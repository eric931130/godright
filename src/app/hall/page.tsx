import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Pin, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { hallCategoryLabels, hallPosts } from "@/lib/hall/mock-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "閱讀大廳｜神權崩壞",
  description: "神權崩壞讀者交流區，討論劇情、角色、世界觀、付費章節與周邊消息。",
  path: "/hall",
  keywords: ["閱讀大廳", "讀者交流", "劇情討論", "角色討論", "付費章節問題"],
});

export default function HallPage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <SectionTitle
        eyebrow="Reader Hall"
        title="七界閱讀大廳"
        description="神殿公告欄、讀者討論與付費章節問題回報。正式版會接 Firestore 即時貼文、留言、按讚與檢舉。"
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {Object.entries(hallCategoryLabels).map(([key, label]) => (
          <Badge key={key} tone={key === "official" ? "gold" : key === "paid_help" ? "purple" : "blue"}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="mt-8 grid gap-4">
        {hallPosts.map((post) => (
          <Link key={post.id} href={`/hall/posts/${post.id}`}>
            <GlassCard interactive className={post.isOfficial ? "p-5 ring-1 ring-divine-gold/35" : "p-5"}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {post.isPinned ? <Pin className="size-4 text-divine-gold" /> : null}
                    <Badge tone={post.isOfficial ? "gold" : post.category === "paid_help" ? "purple" : "blue"}>
                      {hallCategoryLabels[post.category]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.authorDisplayName} · {post.authorPublicUid}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-platinum">{post.title}</h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted-foreground">{post.content}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ThumbsUp className="size-4" />{post.likeCount}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="size-4" />{post.commentCount}</span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
