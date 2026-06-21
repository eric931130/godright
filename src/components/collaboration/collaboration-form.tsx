"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { GlassCard } from "@/components/common/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { inquiryTypeLabels, type InquiryType } from "@/lib/collaboration/inquiry-types";
import { inquiryCreateSchema, type InquiryCreateInput } from "@/lib/validations/collaboration";

const inquiryTypes = Object.entries(inquiryTypeLabels) as [InquiryType, string][];

export function CollaborationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryCreateInput>({
    resolver: zodResolver(inquiryCreateSchema),
    defaultValues: { name: "", email: "", organization: "", inquiryType: "illustration", message: "" },
  });

  const onSubmit = async (values: InquiryCreateInput) => {
    setServerError("");
    try {
      const response = await fetch("/api/collaboration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setServerError(data.error ?? "送出失敗，請稍後再試。");
      }
    } catch {
      setServerError("送出失敗，請稍後再試。");
    }
  };

  if (submitted) {
    return (
      <GlassCard className="gold-border p-6 text-center">
        <h3 className="font-serif text-2xl font-semibold text-platinum">已收到你的合作邀約</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          我們會盡快透過你提供的 Email 與你聯繫。感謝你對《神權崩壞》IP 的興趣。
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-sm text-divine-gold hover:text-platinum">
          再送出一則
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>姓名 / 稱呼</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" {...register("name")} />
            {errors.name ? <p className="text-xs text-destructive">{errors.name.message}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" className="border-divine-gold/25 bg-deep-space/45" {...register("email")} />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label>單位 / 品牌（可留空）</Label>
            <Input className="border-divine-gold/25 bg-deep-space/45" {...register("organization")} />
          </div>
          <div className="grid gap-2">
            <Label>合作類型</Label>
            <select className="h-9 rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("inquiryType")}>
              {inquiryTypes.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>合作內容說明</Label>
          <Textarea className="min-h-32 border-divine-gold/25 bg-deep-space/45" placeholder="請描述合作方向、預期形式與時程。" {...register("message")} />
          {errors.message ? <p className="text-xs text-destructive">{errors.message.message}</p> : null}
        </div>
        <div>
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting}>
            <Send className="size-4" />
            送出合作邀約
          </Button>
        </div>
        {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}
      </form>
    </GlassCard>
  );
}
