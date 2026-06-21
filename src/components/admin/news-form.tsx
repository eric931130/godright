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

const newsSchema = z.object({
  title: z.string().min(2, "請輸入標題"),
  category: z.enum(["公告", "更新", "商品", "活動"]),
  excerpt: z.string().min(10, "摘要至少 10 個字"),
  content: z.string().min(20, "內容至少 20 個字"),
  coverImage: z.string().min(1, "請填入封面圖 placeholder 或路徑"),
  publishedAt: z.string().min(1, "請選擇發布日期"),
  isPinned: z.enum(["true", "false"]),
  status: z.enum(["draft", "published", "archived"]),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export function NewsForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      category: "公告",
      coverImage: "/placeholder/news.jpg",
      publishedAt: "2026-06-20",
      isPinned: "false",
      status: "draft",
    },
  });

  function onSubmit(values: NewsFormValues) {
    setMessage(`已建立 mock 消息：${values.title}`);
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="標題" registration={register("title")} error={errors.title} />
          <div className="space-y-2">
            <Label>分類</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("category")}>
              <option value="公告">公告</option>
              <option value="更新">更新</option>
              <option value="商品">商品</option>
              <option value="活動">活動</option>
            </select>
          </div>
          <TextField label="封面圖" registration={register("coverImage")} error={errors.coverImage} />
          <TextField label="發布日期" type="date" registration={register("publishedAt")} error={errors.publishedAt} />
          <div className="space-y-2">
            <Label>置頂</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("isPinned")}>
              <option value="false">否</option>
              <option value="true">是</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>狀態</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("status")}>
              <option value="draft">草稿</option>
              <option value="published">發布</option>
              <option value="archived">封存</option>
            </select>
          </div>
        </div>
        <TextAreaField label="摘要" registration={register("excerpt")} error={errors.excerpt} />
        <TextAreaField label="內容" registration={register("content")} error={errors.content} />
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            儲存消息
          </Button>
          {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
