export type CharacterCategory =
  | "主角群"
  | "二代主角"
  | "天古三大上神"
  | "三殿九尊"
  | "天界四神"
  | "天界四皇"
  | "天界四帝"
  | "星界七大守護神"
  | "七界霸主"
  | "凡界四大古王國"
  | "四大古王國傳人"
  | "神獸"
  | "魔獸"
  | "神龍"
  | "武器持有者";

export type CharacterRelationship = {
  targetSlug: string;
  type: "師徒" | "敵對" | "血脈" | "神魔對立" | "勢力歸屬" | "命運牽引" | "上古封印";
  description: string;
};

export type CharacterProfile = {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  title: string;
  gender: string;
  faction: string;
  factionSlug: string;
  role: CharacterCategory;
  race: string;
  element: string[];
  colorPalette: string[];
  weapon: string;
  beast: string;
  powerRank: string;
  personality: string;
  appearance: string;
  quote: string;
  firstAppearance: string;
  summary: string;
  storyArc: string;
  relationships: CharacterRelationship[];
  relatedChapters: string[];
  relatedProducts: string[];
  image: string;
  gallery: string[];
  tags: string[];
};

export type Faction = {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  emblemColor: string;
  members: string[];
  doctrine: string;
};

export type RankingTier = {
  id: string;
  name: string;
  description: string;
  color: string;
  representativeSlugs: string[];
};

export const characterCategories: CharacterCategory[] = [
  "主角群",
  "二代主角",
  "天古三大上神",
  "三殿九尊",
  "天界四神",
  "天界四皇",
  "天界四帝",
  "星界七大守護神",
  "七界霸主",
  "凡界四大古王國",
  "四大古王國傳人",
  "神獸",
  "魔獸",
  "神龍",
  "武器持有者",
];

const baseGallery = ["/placeholder/character-a.jpg", "/placeholder/character-b.jpg"];

export const characters: CharacterProfile[] = [
  {
    id: "char-tianhun",
    slug: "tianhun",
    name: "天魂",
    englishName: "Tianhun",
    title: "神魔之子",
    gender: "男",
    faction: "未定天命",
    factionSlug: "unchosen-mandate",
    role: "主角群",
    race: "神魔混血",
    element: ["神聖", "深淵", "紫金黑炎"],
    colorPalette: ["#F4EBD0", "#D9B45F", "#6D4DFF", "#080814"],
    weapon: "神魔雙刃",
    beast: "金色神龍與紫黑魔翼",
    powerRank: "神榜禁名",
    personality: "冷靜、護短、反骨，對神權有本能的不信任。",
    appearance: "白髮、異色瞳，紫金黑系戰衣，背後有金色神龍虛影與紫黑魔翼。",
    quote: "若神權只剩枷鎖，我便斬斷天命。",
    firstAppearance: "第 2 章：深淵魔印甦醒",
    summary: "核心男主，被天位神榜視為不可記錄的異數。",
    storyArc: "從被追捕的禁名之子，逐步成為挑戰神權制度的關鍵存在。",
    relationships: [
      { targetSlug: "tianyun", type: "命運牽引", description: "夢印與魔印互相呼應。" },
      { targetSlug: "moyuan", type: "神魔對立", description: "深淵上尊試圖喚醒他的魔血。" },
      { targetSlug: "longhun", type: "血脈", description: "金色神龍虛影與龍魂力量同源。" },
    ],
    relatedChapters: ["ch-002", "ch-018"],
    relatedProducts: ["tianhun-character-setting", "god-demon-sticker-pack"],
    image: "/placeholder/tianhun.jpg",
    gallery: baseGallery,
    tags: ["白髮", "異色瞳", "神魔雙屬性", "武器持有者", "神龍"],
  },
  {
    id: "char-tianyun",
    slug: "tianyun",
    name: "天芸",
    englishName: "Tianyun",
    title: "夢幻之女",
    gender: "女",
    faction: "天幻神殿",
    factionSlug: "heaven-fantasy-temple",
    role: "主角群",
    race: "夢印神嗣",
    element: ["夢幻", "月光", "淡藍星輝"],
    colorPalette: ["#D9A7FF", "#A8D8FF", "#F4EBD0", "#6D4DFF"],
    weapon: "月夢法杖",
    beast: "鳳鳥與夢幻靈獸",
    powerRank: "星夢神嗣",
    personality: "溫柔、堅定、直覺敏銳，會在夢中看見真相的碎片。",
    appearance: "粉紫與淡藍夢幻系長髮，月光披紗，法杖頂端有夢印晶核。",
    quote: "夢不是逃離現實，是命運還未醒來的形狀。",
    firstAppearance: "第 3 章：夢幻之女入殿",
    summary: "核心女主，能讀取星界裂縫中的神諭殘響。",
    storyArc: "從神殿繼承者走向封印核心，成為最後天命的見證者。",
    relationships: [
      { targetSlug: "tianhun", type: "命運牽引", description: "她的夢能安定天魂的魔印。" },
      { targetSlug: "shenhuan", type: "師徒", description: "神喚曾指導她讀懂夢印。" },
      { targetSlug: "moyun", type: "敵對", description: "魔妘試圖侵入她的夢境。" },
    ],
    relatedChapters: ["ch-003", "ch-019"],
    relatedProducts: ["tianyun-character-setting", "god-demon-sticker-pack"],
    image: "/placeholder/tianyun.jpg",
    gallery: baseGallery,
    tags: ["粉紫", "月光", "夢幻", "法杖", "主角群"],
  },
  ...[
    ["shenhuan", "神喚", "Divine Summoner", "天幻神殿大上尊", "天幻神殿", "heaven-fantasy-temple", "幻召星環", "星召靈鹿"],
    ["shenxi", "神希", "Shenxi", "天幻神殿二上尊", "天幻神殿", "heaven-fantasy-temple", "希光神鈴", "白月靈鳥"],
    ["shentian", "神天", "Shentian", "天幻神殿三上尊", "天幻神殿", "heaven-fantasy-temple", "天穹幻劍", "蒼星麒麟"],
    ["shengyuan", "聖元", "Shengyuan", "黃金神殿大上尊", "黃金神殿", "golden-temple", "聖金權杖", "金甲神獅"],
    ["shengyuan-f", "聖媛", "Shengyuan Maiden", "黃金神殿二上尊", "黃金神殿", "golden-temple", "白金審判輪", "聖羽天馬"],
    ["shengyuan-s", "聖源", "Shengsource", "黃金神殿三上尊", "黃金神殿", "golden-temple", "源律神槍", "金紋玄龜"],
    ["moyuan", "魔淵", "Moyuan", "深淵魔殿大上尊", "深淵魔殿", "abyss-temple", "深淵王刃", "黑鱗魔龍"],
    ["momie", "魔滅", "Momie", "深淵魔殿二上尊", "深淵魔殿", "abyss-temple", "滅神重戟", "血翼魔獸"],
    ["moyun", "魔妘", "Moyun", "深淵魔殿三上尊", "深淵魔殿", "abyss-temple", "夢魘魔線", "紫瞳魅獸"],
    ["longchen", "龍辰", "Longchen", "晨星神龍", "星界龍族", "star-dragon-clan", "辰光龍槍", "本體神龍"],
    ["longhun", "龍魂", "Longhun", "龍魂守護者", "星界龍族", "star-dragon-clan", "魂龍玉", "金色神龍"],
    ["longyuan", "龍淵", "Longyuan", "深淵龍皇", "星界龍族", "star-dragon-clan", "淵龍古劍", "深淵龍影"],
    ["longtian", "龍天", "Longtian", "天穹龍帝", "星界龍族", "star-dragon-clan", "天龍帝印", "天穹神龍"],
  ].map(([slug, name, englishName, title, faction, factionSlug, weapon, beast]) => ({
    id: `char-${slug}`,
    slug,
    name,
    englishName,
    title,
    gender: name.includes("媛") || name.includes("妘") ? "女" : "男",
    faction,
    factionSlug,
    role: faction.includes("神殿") || faction.includes("魔殿") ? "三殿九尊" : "神龍",
    race: faction.includes("魔") ? "魔神" : faction.includes("龍") ? "神龍" : "神族",
    element: faction.includes("黃金") ? ["聖金", "律令"] : faction.includes("深淵") ? ["深淵", "魔焰"] : faction.includes("龍") ? ["龍魂", "星辰"] : ["幻夢", "星光"],
    colorPalette: faction.includes("黃金") ? ["#D9B45F", "#F4EBD0", "#10223F"] : faction.includes("深淵") ? ["#1A102E", "#6D4DFF", "#080814"] : ["#D9A7FF", "#A8D8FF", "#6D4DFF"],
    weapon,
    beast,
    powerRank: faction.includes("龍") ? "星界七大守護神" : "三殿九尊",
    personality: "沉穩而危險，信奉各自神殿或血脈的古老法則。",
    appearance: "身披所屬勢力神紋長袍，武器與守護獸會在力量覺醒時顯現。",
    quote: "神榜所記，不一定是真相。",
    firstAppearance: "第 4 章：九尊會審",
    summary: `${title}，是${faction}的重要戰力與劇情推動者。`,
    storyArc: "在神權崩壞後，被迫重新選擇效忠神殿、血脈或真正的天命。",
    relationships: [
      { targetSlug: "tianhun", type: faction.includes("深淵") ? "神魔對立" : "勢力歸屬", description: "因天魂的禁名而被牽入神榜異動。" },
      { targetSlug: "tianyun", type: faction.includes("天幻") ? "師徒" : "命運牽引", description: "與夢印神諭存在直接或間接關聯。" },
    ],
    relatedChapters: ["ch-004", "ch-009"],
    relatedProducts: ["three-temples-nine-venerables", "godrank-dataset"],
    image: `/placeholder/${slug}.jpg`,
    gallery: baseGallery,
    tags: [faction, title, "戰力角色"],
  } satisfies CharacterProfile)),
];

export const factions: Faction[] = [
  { id: "fac-1", slug: "heaven-fantasy-temple", name: "天幻神殿", type: "三大神殿", description: "掌管夢境、幻術與星界神諭。", emblemColor: "#D9A7FF", members: ["tianyun", "shenhuan", "shenxi", "shentian"], doctrine: "夢是天命尚未醒來的形狀。" },
  { id: "fac-2", slug: "golden-temple", name: "黃金神殿", type: "三大神殿", description: "維護神權律法與天位神榜。", emblemColor: "#D9B45F", members: ["shengyuan", "shengyuan-f", "shengyuan-s"], doctrine: "秩序高於眾生。" },
  { id: "fac-3", slug: "abyss-temple", name: "深淵魔殿", type: "三大神殿", description: "保存被神界抹除的魔神真史。", emblemColor: "#6D4DFF", members: ["moyuan", "momie", "moyun"], doctrine: "深淵讓人看見自己。" },
  { id: "fac-4", slug: "star-dragon-clan", name: "星界龍族", type: "神龍", description: "守護星門、龍魂與上古封印的龍族。", emblemColor: "#A8D8FF", members: ["longchen", "longhun", "longyuan", "longtian"], doctrine: "龍魂守門，星界不墜。" },
  { id: "fac-5", slug: "unchosen-mandate", name: "未定天命", type: "主角勢力", description: "不屬於任何神殿，代表天命仍可被改寫。", emblemColor: "#F4EBD0", members: ["tianhun"], doctrine: "天命不是神授，而是承擔。" },
];

export const rankingTiers: RankingTier[] = [
  { id: "tier-1", name: "至上三極", description: "天古三大上神，神權源頭與封印創造者。", color: "from-divine-gold/50 to-platinum/20", representativeSlugs: ["shentian", "shengyuan", "moyuan"] },
  { id: "tier-2", name: "天界四神", description: "天界核心神權戰力，能直接干涉界域法則。", color: "from-dream-violet/40 to-divine-gold/20", representativeSlugs: ["tianyun", "longchen"] },
  { id: "tier-3", name: "天界四皇＝星界七大守護神", description: "星界與天界平衡者，守護七門與王座盟約。", color: "from-moon-blue/40 to-astral-purple/30", representativeSlugs: ["longhun", "longtian"] },
  { id: "tier-4", name: "天界四帝", description: "神權制度最高執行者，掌握裁決與榜單異動。", color: "from-divine-gold/45 to-demon-blue/20", representativeSlugs: ["shengyuan", "shengyuan-f"] },
  { id: "tier-5", name: "七界霸主", description: "各界王座之主，神權崩壞後開始爭奪秩序定義權。", color: "from-astral-purple/35 to-abyss-purple/45", representativeSlugs: ["moyuan", "longyuan"] },
  { id: "tier-6", name: "凡界四大古王國國君", description: "凡界古盟守護者，持有對抗神權的古王印。", color: "from-demon-blue/35 to-divine-gold/25", representativeSlugs: ["tianhun"] },
  { id: "tier-7", name: "四大古王國傳人", description: "新世代凡界繼承者，將影響最後天命歸屬。", color: "from-moon-blue/30 to-platinum/15", representativeSlugs: ["tianhun", "tianyun"] },
];

export function getCharacter(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getFaction(slug: string) {
  return factions.find((faction) => faction.slug === slug);
}

export function getFactionMembers(slug: string) {
  return characters.filter((character) => character.factionSlug === slug);
}
