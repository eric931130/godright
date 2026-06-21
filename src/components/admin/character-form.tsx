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
import { characterCategories, factions } from "@/data/characters";

const characterSchema = z.object({
  name: z.string().min(1, "請輸入角色名稱"),
  englishName: z.string().min(1, "請輸入英文名"),
  slug: z.string().min(2, "請輸入 slug").regex(/^[a-z0-9-]+$/, "slug 只能使用小寫英文、數字與連字號"),
  title: z.string().min(1, "請輸入稱號"),
  gender: z.string().min(1, "請輸入性別"),
  identity: z.string().min(1, "請輸入角色身分"),
  realm: z.string().min(1, "請輸入界域"),
  factionSlug: z.string().min(1, "請選擇勢力"),
  role: z.string().min(1, "請選擇角色分類"),
  element: z.string().min(1, "請輸入屬性"),
  abilities: z.string().min(1, "請輸入能力"),
  colorPalette: z.string().min(1, "請輸入色票"),
  artifactName: z.string().optional(),
  artifactDescription: z.string().optional(),
  weaponName: z.string().min(1, "請輸入武器"),
  weaponDescription: z.string().optional(),
  beastName: z.string().optional(),
  beastType: z.enum(["神獸", "魔獸", "神龍", "靈獸", "無"]),
  beastDescription: z.string().optional(),
  powerRank: z.string().min(1, "請輸入戰力位階"),
  appearance: z.string().min(10, "外貌至少 10 字"),
  personality: z.string().min(10, "性格至少 10 字"),
  summary: z.string().min(10, "摘要至少 10 字"),
  firstAppearance: z.string().min(1, "請輸入初登場章節"),
  quote: z.string().min(1, "請輸入角色台詞"),
  relationships: z.string().optional(),
  portraitUrl: z.string().min(1, "請輸入立繪圖 URL 或 placeholder"),
  chibiUrl: z.string().min(1, "請輸入 Q 版圖 URL 或 placeholder"),
  bannerUrl: z.string().optional(),
  galleryUrls: z.string().optional(),
});

type CharacterFormValues = z.infer<typeof characterSchema>;

export function CharacterForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      factionSlug: factions[0]?.slug ?? "",
      role: characterCategories[0],
      beastType: "無",
      portraitUrl: "/placeholder/character-portrait.jpg",
      chibiUrl: "/placeholder/character-chibi.jpg",
    },
  });

  function onSubmit(values: CharacterFormValues) {
    setMessage(`已暫存角色 mock：${values.name}`);
  }

  return (
    <GlassCard className="p-5">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="角色名稱" registration={register("name")} error={errors.name} />
          <TextField label="英文名" registration={register("englishName")} error={errors.englishName} />
          <TextField label="Slug" registration={register("slug")} error={errors.slug} />
          <TextField label="稱號" registration={register("title")} error={errors.title} />
          <TextField label="性別" registration={register("gender")} error={errors.gender} />
          <TextField label="角色身分" registration={register("identity")} error={errors.identity} />
          <TextField label="界域" registration={register("realm")} error={errors.realm} />
          <div className="space-y-2">
            <Label>勢力</Label>
            <select
              className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              {...register("factionSlug")}
            >
              {factions.map((faction) => (
                <option key={faction.id} value={faction.slug}>
                  {faction.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>角色分類</Label>
            <select
              className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              {...register("role")}
            >
              {characterCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <TextField label="屬性" registration={register("element")} error={errors.element} placeholder="神聖, 深淵" />
          <TextField label="能力" registration={register("abilities")} error={errors.abilities} placeholder="神魔覺醒, 星命讀取" />
          <TextField label="主色調" registration={register("colorPalette")} error={errors.colorPalette} placeholder="#D9B45F, #6D4DFF" />
          <TextField label="戰力位階" registration={register("powerRank")} error={errors.powerRank} />
          <TextField label="初登場章節" registration={register("firstAppearance")} error={errors.firstAppearance} />
          <TextField label="神器名稱" registration={register("artifactName")} error={errors.artifactName} />
          <TextField label="武器名稱" registration={register("weaponName")} error={errors.weaponName} />
          <TextField label="神獸 / 魔獸 / 神龍" registration={register("beastName")} error={errors.beastName} />
          <div className="space-y-2">
            <Label>守護獸類型</Label>
            <select
              className="h-9 w-full rounded-lg border border-divine-gold/25 bg-deep-space/70 px-3 text-sm"
              {...register("beastType")}
            >
              {["神獸", "魔獸", "神龍", "靈獸", "無"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <TextField label="立繪圖 URL" registration={register("portraitUrl")} error={errors.portraitUrl} />
          <TextField label="Q 版圖 URL" registration={register("chibiUrl")} error={errors.chibiUrl} />
          <TextField label="Banner 圖 URL" registration={register("bannerUrl")} error={errors.bannerUrl} />
          <TextField label="畫廊 URL" registration={register("galleryUrls")} error={errors.galleryUrls} placeholder="以逗號分隔" />
        </div>
        <TextAreaField label="外貌描述" registration={register("appearance")} error={errors.appearance} />
        <TextAreaField label="性格描述" registration={register("personality")} error={errors.personality} />
        <TextAreaField label="劇情摘要" registration={register("summary")} error={errors.summary} />
        <TextAreaField label="神器描述" registration={register("artifactDescription")} error={errors.artifactDescription} />
        <TextAreaField label="武器描述" registration={register("weaponDescription")} error={errors.weaponDescription} />
        <TextAreaField label="守護獸描述" registration={register("beastDescription")} error={errors.beastDescription} />
        <TextField label="角色台詞" registration={register("quote")} error={errors.quote} />
        <TextField label="相關角色" registration={register("relationships")} error={errors.relationships} placeholder="tianyun:命運牽引" />
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-divine-gold text-deep-space hover:bg-platinum" disabled={isSubmitting} type="submit">
            <Save className="size-4" />
            儲存角色
          </Button>
          {message ? <p className="text-sm text-moon-blue">{message}</p> : null}
        </div>
      </form>
    </GlassCard>
  );
}
