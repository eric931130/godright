"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Boxes } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

export function BundleForm() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    productIds: "",
    bundlePrice: "",
    coverImage: "",
    startsAt: "",
    endsAt: "",
    isActive: true,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      setMessage("請先登入開發者帳號。");
      return;
    }

    setLoading(true);
    setMessage("");

    const productIds = form.productIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      productIds,
      bundlePrice: Number(form.bundlePrice),
      coverImage: form.coverImage.trim() || undefined,
      startsAt: form.startsAt || undefined,
      endsAt: form.endsAt || undefined,
      isActive: form.isActive,
    };

    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/bundles", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`已建立組合包 ${data.result.slug}。`);
        setForm((current) => ({ ...current, title: "", slug: "", description: "", productIds: "", bundlePrice: "" }));
        router.refresh();
      } else {
        setMessage(data.error ?? "建立失敗。");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={(event) => void onSubmit(event)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>組合包標題</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="第一卷收藏入門組" value={form.title} onChange={(event) => update("title", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>slug</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="first-volume-collector-set" value={form.slug} onChange={(event) => update("slug", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>組合價（NT$）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="number" min="1" placeholder="299" value={form.bundlePrice} onChange={(event) => update("bundlePrice", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>封面圖路徑（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="/placeholder/bundle.jpg" value={form.coverImage} onChange={(event) => update("coverImage", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>開始時間（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.startsAt} onChange={(event) => update("startsAt", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>結束時間（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.endsAt} onChange={(event) => update("endsAt", event.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>成員商品 slug / id，逗號分隔</Label>
          <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="volume-one-godrank-fracture, tianhun-character-setting" value={form.productIds} onChange={(event) => update("productIds", event.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>說明</Label>
          <Textarea className="min-h-24 border-divine-gold/25 bg-deep-space/45" placeholder="組合包的賣點與內容說明。" value={form.description} onChange={(event) => update("description", event.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={form.isActive} onChange={(event) => update("isActive", event.target.checked)} />
          上架此組合包
        </label>
        <div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading}>
            <Boxes className="size-4" />
            建立組合包
          </Button>
        </div>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
