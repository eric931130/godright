"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TicketPercent } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const discountTypes = [
  ["percent", "百分比折扣 (%)"],
  ["fixed", "固定金額折抵 (NT$)"],
] as const;

const appliesToOptions = [
  ["all", "全站"],
  ["products", "一般商品"],
  ["ebooks", "電子書"],
  ["chapters", "付費章節"],
  ["bundles", "組合包"],
] as const;

export function CouponForm() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [form, setForm] = useState({
    code: "",
    title: "",
    discountType: "percent",
    discountValue: "",
    appliesTo: "all",
    targetIds: "",
    startsAt: "",
    endsAt: "",
    usageLimit: "",
    perUserLimit: "",
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

    const targetIds = form.targetIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const payload = {
      code: form.code.trim(),
      title: form.title.trim(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      appliesTo: form.appliesTo,
      targetIds: targetIds.length ? targetIds : undefined,
      startsAt: form.startsAt || undefined,
      endsAt: form.endsAt || undefined,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
      perUserLimit: form.perUserLimit ? Number(form.perUserLimit) : undefined,
      isActive: form.isActive,
    };

    try {
      const token = await user.getIdToken(true);
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`已建立優惠碼 ${data.result.code}。`);
        setForm((current) => ({ ...current, code: "", title: "", discountValue: "" }));
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
            <Label>優惠碼代碼</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="GODRIGHT" value={form.code} onChange={(event) => update("code", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>標題</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="全站 9 折" value={form.title} onChange={(event) => update("title", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>折扣類型</Label>
            <select className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" value={form.discountType} onChange={(event) => update("discountType", event.target.value)}>
              {discountTypes.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>折扣值</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="number" min="1" placeholder="10 或 50" value={form.discountValue} onChange={(event) => update("discountValue", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>適用範圍</Label>
            <select className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" value={form.appliesTo} onChange={(event) => update("appliesTo", event.target.value)}>
              {appliesToOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>限定商品 ID，逗號分隔（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" placeholder="prod-ebook-01, prod-ebook-02" value={form.targetIds} onChange={(event) => update("targetIds", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>開始時間（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.startsAt} onChange={(event) => update("startsAt", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>結束時間（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="datetime-local" value={form.endsAt} onChange={(event) => update("endsAt", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>總使用次數上限（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="number" min="1" placeholder="不限" value={form.usageLimit} onChange={(event) => update("usageLimit", event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>每人使用次數上限（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" type="number" min="1" placeholder="不限" value={form.perUserLimit} onChange={(event) => update("perUserLimit", event.target.value)} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={form.isActive} onChange={(event) => update("isActive", event.target.checked)} />
          啟用此優惠碼
        </label>
        <div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={loading}>
            <TicketPercent className="size-4" />
            建立優惠碼
          </Button>
        </div>
        {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
      </form>
    </GlassCard>
  );
}
