import { HelpCircle } from "lucide-react";

import type { EbookProductExtra } from "@/data/shop";

export function EbookFAQ({ ebook }: { ebook: EbookProductExtra }) {
  if (!ebook.faq?.length) return null;

  return (
    <section className="py-16">
      <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-platinum">
        <HelpCircle className="size-5 text-divine-gold" aria-hidden="true" />
        常見問題
      </h2>
      <div className="mt-6 grid gap-3">
        {ebook.faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-divine-gold/20 bg-deep-space/45 p-4"
          >
            <summary className="cursor-pointer list-none font-medium text-platinum marker:hidden">
              <span className="text-divine-gold">Q. </span>
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
