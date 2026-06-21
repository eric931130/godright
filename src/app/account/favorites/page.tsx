"use client";

import Link from "next/link";

import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { SectionTitle } from "@/components/common/section-title";
import { useFavorites } from "@/lib/account/storage";

export default function FavoritesPage() {
  const favorites = useFavorites();

  return (
    <div className="site-container py-10 sm:py-14">
      <SectionTitle eyebrow="Favorites" title="我的收藏" description="可收藏章節、角色、商品、世界觀條目、場地與物件；第一版使用 localStorage。" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {favorites.favorites.length ? favorites.favorites.map((item) => (
          <GlassCard key={`${item.type}-${item.id}`} className="p-5">
            <p className="text-xs text-divine-gold">{item.type}</p>
            <h2 className="mt-2 font-serif text-xl text-platinum">{item.title}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString("zh-TW")}</p>
            <div className="mt-5 flex gap-3">
              <Link href={item.href} className="text-sm text-divine-gold">查看</Link>
              <button onClick={() => favorites.removeFavorite(item.id, item.type)} className="text-sm text-muted-foreground">移除</button>
            </div>
          </GlassCard>
        )) : <EmptyState title="尚未收藏任何內容" description="未來角色、商品與百科頁可接收藏按鈕。" />}
      </div>
    </div>
  );
}
