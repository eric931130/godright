"use client";

import { useMemo, useState } from "react";

import { CharacterProfileCard } from "@/components/characters/character-profile-card";
import { EmptyState } from "@/components/common/empty-state";
import { Input } from "@/components/ui/input";
import { characterCategories, characters, factions } from "@/data/characters";

const all = "全部";

export function CharacterBrowser() {
  const [query, setQuery] = useState("");
  const [faction, setFaction] = useState(all);
  const [rank, setRank] = useState(all);
  const [element, setElement] = useState(all);
  const [role, setRole] = useState(all);

  const ranks = Array.from(new Set(characters.map((character) => character.powerRank)));
  const elements = Array.from(new Set(characters.flatMap((character) => character.element)));

  const filtered = useMemo(
    () =>
      characters.filter((character) => {
        const keyword = `${character.name} ${character.englishName} ${character.title}`.toLowerCase();
        return (
          keyword.includes(query.toLowerCase()) &&
          (faction === all || character.faction === faction) &&
          (rank === all || character.powerRank === rank) &&
          (element === all || character.element.includes(element)) &&
          (role === all || character.role === role)
        );
      }),
    [element, faction, query, rank, role],
  );

  return (
    <>
      <div className="mt-8 grid gap-3 rounded-lg border border-divine-gold/18 bg-deep-space/45 p-4 md:grid-cols-5">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋角色名稱" className="h-11 md:col-span-2" />
        <Select value={faction} onChange={setFaction} options={[all, ...factions.map((item) => item.name)]} />
        <Select value={rank} onChange={setRank} options={[all, ...ranks]} />
        <Select value={role} onChange={setRole} options={[all, ...characterCategories]} />
        <Select value={element} onChange={setElement} options={[all, ...elements]} className="md:col-span-5" />
      </div>
      <div className="mt-8">
        {filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((character) => (
              <CharacterProfileCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <EmptyState title="查無角色" description="請調整搜尋字或篩選條件。" />
        )}
      </div>
    </>
  );
}

function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`h-11 rounded-lg border border-input bg-deep-space/70 px-3 text-sm text-platinum ${className ?? ""}`}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
