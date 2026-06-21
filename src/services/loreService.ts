import {
  artifacts,
  locations,
  loreEntries,
  type ArtifactEntry,
  type LocationEntry,
  type LoreEntry,
} from "@/data/lore";
import { createMockCrudService } from "@/services/mock-crud";

export type AdminContentRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
  relatedCharacters: string[];
  relatedChapters: string[];
  image: string;
  status: "draft" | "published" | "archived";
};

function fromLore(entry: LoreEntry): AdminContentRecord {
  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.title,
    category: entry.category,
    summary: entry.summary,
    content: entry.content.join("\n\n"),
    tags: entry.tags,
    relatedCharacters: entry.relatedCharacters,
    relatedChapters: [],
    image: "/placeholder/lore.jpg",
    status: "published",
  };
}

function fromLocation(entry: LocationEntry): AdminContentRecord {
  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.name,
    category: entry.realm,
    summary: entry.function,
    content: `${entry.history}\n\n${entry.atmosphere}`,
    tags: entry.tags,
    relatedCharacters: entry.relatedCharacters,
    relatedChapters: entry.chapters,
    image: entry.image,
    status: "published",
  };
}

function fromArtifact(entry: ArtifactEntry): AdminContentRecord {
  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.name,
    category: entry.type,
    summary: entry.ability,
    content: `${entry.appearance}\n\n${entry.meaning}`,
    tags: entry.tags,
    relatedCharacters: entry.holder ? [entry.holder] : [],
    relatedChapters: entry.chapters,
    image: "/placeholder/artifact.jpg",
    status: "published",
  };
}

export const loreService = createMockCrudService<AdminContentRecord>(
  loreEntries.map(fromLore),
  "lore",
);

export const locationService = createMockCrudService<AdminContentRecord>(
  locations.map(fromLocation),
  "location",
);

export const artifactService = createMockCrudService<AdminContentRecord>(
  artifacts.map(fromArtifact),
  "artifact",
);
