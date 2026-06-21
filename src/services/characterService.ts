import { characters, type CharacterProfile } from "@/data/characters";
import { createMockCrudService } from "@/services/mock-crud";

export type CharacterServiceRecord = CharacterProfile & {
  status?: "draft" | "published" | "archived";
};

const characterRecords: CharacterServiceRecord[] = characters.map((character) => ({
  ...character,
  status: "published",
}));

export const characterService = createMockCrudService<CharacterServiceRecord>(
  characterRecords,
  "character",
);
