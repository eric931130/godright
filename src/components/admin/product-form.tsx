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
import { productCategories } from "@/data/shop";

const productSchema = z.object({
  title: z.string().min(2, "請輸入商品名稱"),
  slug: z.string().min(2, "請輸入 slug").regex(/^[a-z0-9-]+$/, "slug 只能使用小寫英文、數字與連字號"),
  category: z.string().min(1, "請選擇分類"),
  price: z.coerce.number().min(0, "價格不可小於 0"),
  originalPrice: z.coerce.number().min(0).optional(),
  subtitle: z.string().min(2, "請輸入簡介"),
  description: z.string().min(20, "詳細描述至少 20 個字"),
  coverImage: z.string().min(1, "請填入商品圖片 placeholder 或路徑"),
  fileFormat: z.string().min(1, "請填入檔案格式"),
  isDigital: z.enum(["true", "false"]),
  licenseType: z.string().min(2, "請填入授權說明"),
  status: z.enum(["draft", "published", "archived"]),
  relatedCharacters: z.string().optional(),
  relatedChapters: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;
type ProductFormInput = z.input<typeof productSchema>;

export function ProductForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: productCategories[0],
      isDigital: "true",
      status: "draft",
      coverImage: "/placeholder/product.jpg",
    },
  });

  function onSubmit(values: ProductFormValues) {
    setMessage(`已建立 mock 商品：${values.title}`);
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="商品名稱" registration={register("title")} error={errors.title} />
          <TextField label="Slug" registration={register("slug")} error={errors.slug} />
          <div className="space-y-2">
            <Label>分類</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("category")}>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <TextField label="商品圖片" registration={register("coverImage")} error={errors.coverImage} />
          <TextField label="價格" type="number" registration={register("price")} error={errors.price} />
          <TextField label="原價" type="number" registration={register("originalPrice")} error={errors.originalPrice} />
          <TextField label="檔案格式" registration={register("fileFormat")} error={errors.fileFormat} placeholder="PDF, EPUB, PNG" />
          <div className="space-y-2">
            <Label>是否數位商品</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("isDigital")}>
              <option value="true">是</option>
              <option value="false">否，未來實體預留</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>上架狀態</Label>
            <select className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm" {...register("status")}>
              <option value="draft">草稿</option>
              <option value="published">上架</option>
              <option value="archived">封存</option>
            </select>
          </div>
          <TextField label="授權說明" registration={register("licenseType")} error={errors.licenseType} />
        </div>
        <TextField label="簡介" registration={register("subtitle")} error={errors.subtitle} />
        <TextAreaField label="詳細描述" registration={register("description")} error={errors.description} />
        <TextField label="相關角色" registration={register("relatedCharacters")} error={errors.relatedCharacters} placeholder="tianhun, tianyun" />
        <TextField label="相關章節" registration={register("relatedChapters")} error={errors.relatedChapters} placeholder="ch-001, ch-008" />
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            儲存商品
          </Button>
          {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
