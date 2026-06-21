"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/common/badge";
import { GlassCard } from "@/components/common/glass-card";
import { timelineEvents } from "@/data/lore";
import { cn } from "@/lib/utils";

export function TimelineView() {
  const [openId, setOpenId] = useState(timelineEvents[0]?.id);

  return (
    <div className="relative mt-10">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-divine-gold/25 sm:block" />
      <div className="grid gap-5">
        {timelineEvents.map((event) => {
          const open = openId === event.id;
          return (
            <GlassCard key={event.id} className="relative p-5 sm:ml-10">
              <span className="absolute -left-[2.95rem] top-6 hidden size-4 rounded-full border border-divine-gold bg-deep-space sm:block" />
              <button
                type="button"
                onClick={() => setOpenId(open ? "" : event.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <Badge>{event.era}</Badge>
                  <h2 className="mt-3 font-serif text-2xl text-platinum">{event.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>
                </div>
                <ChevronDown className={cn("mt-2 size-5 shrink-0 transition", open && "rotate-180")} />
              </button>
              {open ? (
                <div className="mt-5 border-t border-divine-gold/16 pt-5 text-sm leading-7 text-muted-foreground">
                  <p>{event.details}</p>
                  <p className="mt-3">相關角色：{event.relatedCharacters.join("、")}</p>
                  <p>相關地點：{event.relatedLocations.join("、")}</p>
                </div>
              ) : null}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
