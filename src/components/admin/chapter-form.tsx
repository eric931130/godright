"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextAreaField, TextField } from "@/components/admin/form-fields";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { volumes } from "@/data/novel";

const chapterSchema = z.object({
  title: z.string().min(2, "請輸入章節標題"),
  slug: z.string().min(2, "請輸入 slug").regex(/^[a-z0-9-]+$/, "slug 只能使用小寫英文、數字與連字號"),
  volumeSlug: z.string().min(1, "請選擇所屬卷"),
  excerpt: z.string().min(10, "摘要至少 10 個字"),
  content: z.string().min(30, "正文至少 30 個字"),
  access: z.enum(["free", "paid"]),
  price: z.coerce.number().min(0, "價格不可小於 0"),
  tags: z.string().min(1, "請輸入至少一個標籤"),
  status: z.enum(["draft", "published", "scheduled"]),
  authorNote: z.string().optional(),
});

type ChapterFormValues = z.infer<typeof chapterSchema>;
type ChapterFormInput = z.input<typeof chapterSchema>;

export function ChapterForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChapterFormInput, unknown, ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      access: "free",
      status: "draft",
      price: 0,
      volumeSlug: volumes[0]?.slug ?? "",
    },
  });

  function onSubmit(values: ChapterFormValues) {
    setMessage(`已建立 mock 章節：${values.title}`);
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="標題" registration={register("title")} error={errors.title} />
          <TextField label="Slug" registration={register("slug")} error={errors.slug} />
          <div className="space-y-2">
            <Label>所屬卷</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("volumeSlug")}>
              {volumes.map((volume) => (
                <option key={volume.id} value={volume.slug}>
                  {volume.title}
                </option>
              ))}
            </select>
            {errors.volumeSlug ? <p className="text-xs text-destructive">{errors.volumeSlug.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>免費 / 付費</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("access")}>
              <option value="free">免費</option>
              <option value="paid">付費</option>
            </select>
          </div>
          <TextField label="價格" type="number" registration={register("price")} error={errors.price} />
          <div className="space-y-2">
            <Label>發布狀態</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("status")}>
              <option value="draft">草稿</option>
              <option value="published">已發布</option>
              <option value="scheduled">排程</option>
            </select>
          </div>
        </div>
        <TextAreaField label="摘要" registration={register("excerpt")} error={errors.excerpt} />
        <TextAreaField label="正文" registration={register("content")} error={errors.content} />
        <TextField label="標籤，用逗號分隔" registration={register("tags")} error={errors.tags} />
        <TextAreaField label="作者備註" registration={register("authorNote")} error={errors.authorNote} />
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            儲存章節
          </Button>
          {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
