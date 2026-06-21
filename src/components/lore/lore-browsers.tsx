"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/common/badge";
import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { FilterPanel } from "@/components/lore/filter-panel";
import {
  artifacts,
  locations,
  loreCategories,
  loreEntries,
} from "@/data/lore";

const all = "全部";

export function LoreBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(all);
  const [faction, setFaction] = useState(all);
  const [element, setElement] = useState(all);

  const factions = Array.from(new Set(loreEntries.map((entry) => entry.faction)));
  const elements = Array.from(new Set(loreEntries.map((entry) => entry.element)));
  const filtered = useMemo(
    () =>
      loreEntries.filter((entry) => {
        const text = `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase();
        return (
          text.includes(query.toLowerCase()) &&
          (category === all || entry.category === category) &&
          (faction === all || entry.faction === faction) &&
          (element === all || entry.element === element)
        );
      }),
    [category, element, faction, query],
  );

  return (
    <>
      <FilterPanel
        query={query}
        onQuery={setQuery}
        filters={[
          { label: "分類", value: category, options: [all, ...loreCategories], onChange: setCategory },
          { label: "勢力", value: faction, options: [all, ...factions], onChange: setFaction },
          { label: "屬性", value: element, options: [all, ...elements], onChange: setElement },
        ]}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.length ? filtered.map((entry) => (
          <Link key={entry.id} href={`/lore/${entry.slug}`}>
            <GlassCard interactive className="h-full p-5">
              <Badge>{entry.category}</Badge>
              <h2 className="mt-3 font-serif text-xl text-platinum">{entry.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.summary}</p>
            </GlassCard>
          </Link>
        )) : <EmptyState title="查無百科條目" />}
      </div>
    </>
  );
}

export function LocationBrowser() {
  const [query, setQuery] = useState("");
  const [realm, setRealm] = useState(all);
  const [faction, setFaction] = useState(all);
  const realms = Array.from(new Set(locations.map((item) => item.realm)));
  const factions = Array.from(new Set(locations.map((item) => item.faction)));
  const filtered = locations.filter((item) => {
    const text = `${item.name} ${item.function} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (realm === all || item.realm === realm) && (faction === all || item.faction === faction);
  });

  return (
    <>
      <FilterPanel
        query={query}
        onQuery={setQuery}
        filters={[
          { label: "界域", value: realm, options: [all, ...realms], onChange: setRealm },
          { label: "勢力", value: faction, options: [all, ...factions], onChange: setFaction },
        ]}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((location) => (
          <Link key={location.id} href={`/locations/${location.slug}`}>
            <GlassCard interactive className="h-full overflow-hidden p-0">
              <div className="image-placeholder aspect-[4/3]" />
              <div className="p-5">
                <Badge>{location.realm}</Badge>
                <h2 className="mt-3 font-serif text-xl text-platinum">{location.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{location.function}</p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </>
  );
}

export function ArtifactBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(all);
  const [element, setElement] = useState(all);
  const types = Array.from(new Set(artifacts.map((item) => item.type)));
  const elements = Array.from(new Set(artifacts.map((item) => item.element)));
  const filtered = artifacts.filter((item) => {
    const text = `${item.name} ${item.ability} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (type === all || item.type === type) && (element === all || item.element === element);
  });

  return (
    <>
      <FilterPanel
        query={query}
        onQuery={setQuery}
        filters={[
          { label: "類型", value: type, options: [all, ...types], onChange: setType },
          { label: "屬性", value: element, options: [all, ...elements], onChange: setElement },
        ]}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((artifact) => (
          <Link key={artifact.id} href={`/artifacts/${artifact.slug}`}>
            <GlassCard interactive className="h-full p-5">
              <Badge tone={artifact.merchReady ? "gold" : "purple"}>{artifact.type}</Badge>
              <h2 className="mt-3 font-serif text-xl text-platinum">{artifact.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{artifact.ability}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </>
  );
}
