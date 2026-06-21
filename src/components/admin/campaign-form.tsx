"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Megaphone } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const campaignTypes = [
  ["announcement_bar", "頂部公告列"],
  ["popup", "彈窗"],
  ["hero_banner", "首頁 / 頁面橫幅"],
  ["countdown", "倒數計時"],
  ["shop_banner", "商城橫幅"],
] as const;

export function CampaignForm() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    type: "announcement_bar",
    description: "",
    ctaText: "",
    ctaHref: "",
    imageUrl: "",
    targetPages: "",
    priority: "0",
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

    const targetPages = form.targetPages
      .split(",")
      .map((page) => page.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      type: form.type,
      description: form.description.trim() || undefined,
      ctaText: form.ctaText.trim() || undefined,
      ctaHref: form.ctaHref.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
      targetPages: targetPages.length ? targetPages : undefined,
      priority: Number(form.priority || 0),
      startsAt: form.startsAt || undefined,
      endsAt: form.endsAt || undefined,
      isActive: form.isActive,
    };

    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("已建立活動。");
        setForm((current) => ({ ...current, title: "", description: "", ctaText: "", ctaHref: "" }));
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
            <Label>標題</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="七界開站慶..." value={form.title} onChange={(event) => update("title", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>類型</Label>
            <select className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" value={form.type} onChange={(event) => update("type", event.target.value)}>
              {campaignTypes.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>CTA 文字（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="前往商城" value={form.ctaText} onChange={(event) => update("ctaText", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>CTA 連結（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="/shop" value={form.ctaHref} onChange={(event) => update("ctaHref", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>顯示頁面，逗號分隔（留空=全站，「/」僅首頁）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="/, /shop" value={form.targetPages} onChange={(event) => update("targetPages", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>優先順序（數字大者優先）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="number" value={form.priority} onChange={(event) => update("priority", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>開始時間（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.startsAt} onChange={(event) => update("startsAt", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>結束時間（倒數計時必填）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.endsAt} onChange={(event) => update("endsAt", event.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>說明（彈窗 / 橫幅內文，可留空）</Label>
          <Textarea className="min-h-20 border-divine-gold/25 bg-deep-space/45" value={form.description} onChange={(event) => update("description", event.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={form.isActive} onChange={(event) => update("isActive", event.target.checked)} />
          啟用此活動
        </label>
        <div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading}>
            <Megaphone className="size-4" />
            建立活動
          </Button>
        </div>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
