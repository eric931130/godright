import type { CharacterProfile } from "@/data/characters";

export type EnhancedCharacter = Omit<CharacterProfile, "weapon"> & {
  identity: string;
  realm: string;
  abilities: string[];
  intro: string;
  artifact: {
    name: string;
    description: string;
    imageUrl?: string;
  };
  divineBeast: {
    name: string;
    type: "神獸" | "魔獸" | "神龍" | "靈獸" | "無";
    description: string;
    imageUrl?: string;
  };
  weapon: {
    name: string;
    description: string;
    imageUrl?: string;
  };
  images: {
    portraitUrl: string;
    chibiUrl: string;
    bannerUrl?: string;
    galleryUrls?: string[];
  };
  defaultImageMode: "portrait" | "chibi";
};

export function enhanceCharacter(character: CharacterProfile): EnhancedCharacter {
  const beastType = character.beast.includes("魔")
    ? "魔獸"
    : character.beast.includes("龍")
      ? "神龍"
      : character.beast.includes("靈")
        ? "靈獸"
        : "神獸";

  return {
    ...character,
    identity: character.title,
    realm: character.faction.includes("深淵")
      ? "深淵界"
      : character.faction.includes("龍")
        ? "星界"
        : character.faction.includes("神殿")
          ? "天界"
          : "七界邊境",
    abilities: [...character.element, character.powerRank],
    intro: character.summary,
    artifact: {
      name: character.weapon,
      description: `${character.weapon} 是 ${character.name} 的核心神器，會隨劇情逐步揭露完整能力。`,
    },
    divineBeast: {
      name: character.beast,
      type: beastType,
      description: `${character.beast} 與 ${character.name} 的命格互相呼應，是戰力與象徵身份的一部分。`,
    },
    weapon: {
      name: character.weapon,
      description: `${character.weapon} 承載 ${character.element.join("、")} 屬性，可在神權崩壞時顯現真名。`,
    },
    images: {
      portraitUrl: character.image,
      chibiUrl: `/placeholder/${character.slug}-chibi.jpg`,
      galleryUrls: character.gallery,
    },
    defaultImageMode: "portrait",
  };
}
