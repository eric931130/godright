"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Crown, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

import { DivineButton } from "@/components/common/divine-button";
import { useAuthModal } from "@/components/auth/auth-modal-provider";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-divine-gold/20 bg-deep-space/78 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between gap-3">
        <Link
          className="flex min-w-0 items-center gap-3"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-divine-gold/40 bg-divine-gold/12 text-divine-gold">
            <Crown aria-hidden="true" className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-base font-semibold text-platinum">
              {siteConfig.shortName}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              官方文創網站
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="主要導覽">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: cn(
                  "text-muted-foreground hover:bg-divine-gold/10 hover:text-platinum",
                  isActive(item.href) && "bg-divine-gold/10 text-divine-gold",
                ),
              })}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <DivineButton className="h-9" href="/novel" variant="outline">
            <BookOpen aria-hidden="true" className="size-4" />
            開始閱讀
          </DivineButton>
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-divine-gold px-4 text-sm font-medium text-deep-space transition hover:bg-platinum"
          >
            <LogIn aria-hidden="true" className="size-4" />
            登入會員
          </button>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "關閉選單" : "開啟選單"}
          className="flex size-10 items-center justify-center rounded-lg border border-divine-gold/25 bg-deep-space/55 text-platinum xl:hidden"
          type="button"
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
          aria-label="關閉背景選單"
          className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm"
          type="button"
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="手機導覽"
          className={cn(
            "fixed right-3 top-20 z-50 max-h-[calc(100vh-6rem)] w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-divine-gold/25 bg-popover/96 p-3 shadow-2xl transition duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="grid gap-1">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm text-muted-foreground transition hover:bg-divine-gold/10 hover:text-platinum",
                  isActive(item.href) && "bg-divine-gold/10 text-divine-gold",
                )}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-divine-gold/15 pt-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openAuthModal("login");
              }}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-divine-gold px-4 text-sm font-medium text-deep-space transition hover:bg-platinum"
            >
              <LogIn aria-hidden="true" className="size-4" />
              登入會員
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
