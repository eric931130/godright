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

const contentSchema = z.object({
  name: z.string().min(1, "請輸入名稱"),
  slug: z.string().min(2, "請輸入 slug").regex(/^[a-z0-9-]+$/, "slug 只能使用小寫英文、數字與連字號"),
  category: z.string().min(1, "請輸入分類"),
  summary: z.string().min(10, "摘要至少 10 個字"),
  content: z.string().min(20, "詳細內容至少 20 個字"),
  tags: z.string().min(1, "請輸入標籤"),
  relatedCharacters: z.string().optional(),
  relatedChapters: z.string().optional(),
  image: z.string().min(1, "請填入圖片 placeholder 或路徑"),
  status: z.enum(["draft", "published", "archived"]),
});

type ContentFormValues = z.infer<typeof contentSchema>;

type ContentFormProps = {
  label: string;
  defaultCategory?: string;
};

export function ContentForm({ label, defaultCategory = "世界觀" }: ContentFormProps) {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      category: defaultCategory,
      image: "/placeholder/codex.jpg",
      status: "draft",
    },
  });

  function onSubmit(values: ContentFormValues) {
    setMessage(`已建立 mock ${label}：${values.name}`);
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="名稱" registration={register("name")} error={errors.name} />
          <TextField label="Slug" registration={register("slug")} error={errors.slug} />
          <TextField label="分類" registration={register("category")} error={errors.category} />
          <TextField label="圖片" registration={register("image")} error={errors.image} />
          <div className="space-y-2">
            <Label>發布狀態</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("status")}>
              <option value="draft">草稿</option>
              <option value="published">發布</option>
              <option value="archived">封存</option>
            </select>
          </div>
          <TextField label="標籤" registration={register("tags")} error={errors.tags} />
        </div>
        <TextAreaField label="摘要" registration={register("summary")} error={errors.summary} />
        <TextAreaField label="詳細內容" registration={register("content")} error={errors.content} />
        <TextField label="相關角色" registration={register("relatedCharacters")} error={errors.relatedCharacters} />
        <TextField label="相關章節" registration={register("relatedChapters")} error={errors.relatedChapters} />
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            儲存{label}
          </Button>
          {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
