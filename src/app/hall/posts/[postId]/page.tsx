import { notFound } from "next/navigation";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { hallCategoryLabels, hallComments, hallPosts } from "@/lib/hall/mock-data";

type HallPostPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function HallPostPage({ params }: HallPostPageProps) {
  const { postId } = await params;
  const post = hallPosts.find((item) => item.id === postId);

  if (!post) {
    notFound();
  }

  const comments = hallComments.filter((comment) => comment.postId === post.id);

  return (
    <main className="site-container py-10 sm:py-14">
      <GlassCard className={post.isOfficial ? "p-6 ring-1 ring-divine-gold/35" : "p-6"}>
        <Badge tone={post.isOfficial ? "gold" : post.category === "paid_help" ? "purple" : "blue"}>
          {hallCategoryLabels[post.category]}
        </Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-platinum">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {post.authorDisplayName} · {post.authorPublicUid} · {post.createdAt}
        </p>
        <p className="mt-6 text-base leading-8 text-muted-foreground">{post.content}</p>
      </GlassCard>

      <section className="mt-8 grid gap-4">
        <h2 className="text-2xl font-semibold text-platinum">留言</h2>
        {comments.map((comment) => (
          <GlassCard key={comment.id} className="p-5">
            <p className="text-sm text-divine-gold">{comment.authorDisplayName} · {comment.authorPublicUid}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{comment.content}</p>
          </GlassCard>
        ))}
        {!comments.length ? (
          <GlassCard className="p-5 text-sm text-muted-foreground">尚無留言。登入後可參與討論。</GlassCard>
        ) : null}
      </section>
    </main>
  );
}
