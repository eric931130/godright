"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Crown, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { DivineButton } from "@/components/common/divine-button";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-divine-gold/20 bg-deep-space/78 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-divine-gold/40 bg-divine-gold/12 text-divine-gold">
            <Crown className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-base font-semibold text-platinum">
              神權崩壞
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              七界宇宙官方網站
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="主導覽">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: cn(
                  "text-muted-foreground hover:bg-divine-gold/10 hover:text-platinum",
                  isActive(item.href) && "bg-divine-gold/10 text-divine-gold",
                ),
              })}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <DivineButton href="/novel" variant="outline" className="h-9">
            <BookOpen className="size-4" aria-hidden="true" />
            立即閱讀
          </DivineButton>
          <DivineButton href="/account" className="h-9">
            <Sparkles className="size-4" aria-hidden="true" />
            訂閱更新
          </DivineButton>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-divine-gold/25 bg-deep-space/55 text-platinum xl:hidden"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "xl:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="關閉導覽背景"
          className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <nav
          className={cn(
            "fixed right-3 top-20 z-50 max-h-[calc(100vh-6rem)] w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-divine-gold/25 bg-popover/96 p-3 shadow-2xl transition duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
          aria-label="手機導覽"
        >
          <div className="grid gap-1">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm text-muted-foreground transition hover:bg-divine-gold/10 hover:text-platinum",
                  isActive(item.href) && "bg-divine-gold/10 text-divine-gold",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
