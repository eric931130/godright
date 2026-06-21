"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type FilterPanelProps = {
  query: string;
  onQuery: (value: string) => void;
  filters: Array<{
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
  }>;
};

export function FilterPanel({ query, onQuery, filters }: FilterPanelProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-divine-gold/18 bg-deep-space/45 p-4 md:grid-cols-4">
      <label className="relative md:col-span-2">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="搜尋名稱、描述或標籤"
          className="h-11 pl-9"
        />
      </label>
      {filters.map((filter) => (
        <select
          key={filter.label}
          value={filter.value}
          onChange={(event) => filter.onChange(event.target.value)}
          className="h-11 rounded-lg border border-input bg-deep-space/70 px-3 text-sm text-platinum"
          aria-label={filter.label}
        >
          {filter.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
