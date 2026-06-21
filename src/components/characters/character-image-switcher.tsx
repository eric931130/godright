"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type ImageMode = "portrait" | "chibi";

type CharacterImageSwitcherProps = {
  name: string;
  portraitUrl: string;
  chibiUrl: string;
  defaultMode?: ImageMode;
};

function canRenderImage(url: string) {
  return Boolean(url) && !url.startsWith("/placeholder/");
}

export function CharacterImageSwitcher({
  name,
  portraitUrl,
  chibiUrl,
  defaultMode = "portrait",
}: CharacterImageSwitcherProps) {
  const [mode, setMode] = useState<ImageMode>(defaultMode);
  const activeUrl = mode === "portrait" ? portraitUrl : chibiUrl;
  const label = mode === "portrait" ? "立繪" : "Q 版";

  return (
    <div className="overflow-hidden rounded-xl border border-divine-gold/25 bg-deep-space/45">
      <div className="flex items-center justify-between gap-2 border-b border-divine-gold/15 p-3">
        <p className="text-sm text-platinum">{name} {label}</p>
        <div className="grid grid-cols-2 rounded-lg border border-divine-gold/20 bg-deep-space/70 p-1">
          {(["portrait", "chibi"] as const).map((item) => (
            <Button
              key={item}
              aria-pressed={mode === item}
              className={
                mode === item
                  ? "h-8 rounded-md bg-divine-gold px-3 text-xs text-deep-space hover:bg-platinum"
                  : "h-8 rounded-md bg-transparent px-3 text-xs text-muted-foreground hover:bg-platinum/10 hover:text-platinum"
              }
              type="button"
              onClick={() => setMode(item)}
            >
              {item === "portrait" ? "立繪" : "Q 版"}
            </Button>
          ))}
        </div>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {canRenderImage(activeUrl) ? (
              <Image
                fill
                alt={`${name} ${label}`}
                className="object-cover"
                sizes="(min-width: 1024px) 384px, 100vw"
                src={activeUrl}
              />
            ) : (
              <div className="image-placeholder relative h-full w-full">
                <div className="seal-ring animate-orbit absolute inset-8 opacity-70" />
                <div className="absolute inset-x-6 bottom-6 rounded-lg border border-divine-gold/20 bg-deep-space/75 p-3 text-center">
                  <p className="text-sm text-platinum">{name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}圖片預留</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
