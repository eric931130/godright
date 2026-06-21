export type LoreCategory =
  | "創世神話"
  | "天古三大上神"
  | "三殿九尊"
  | "天界制度"
  | "天位神榜"
  | "七界秩序"
  | "星界守護體系"
  | "四大古王國"
  | "神魔雙屬性"
  | "上古封印"
  | "神權崩壞事件"
  | "天命之子"
  | "禁忌力量"
  | "神獸與魔獸";

export type LoreEntry = {
  id: string;
  slug: string;
  title: string;
  category: LoreCategory;
  faction: string;
  element: string;
  tags: string[];
  summary: string;
  content: string[];
  relatedCharacters: string[];
  relatedLocations: string[];
  relatedArtifacts: string[];
};

export type TimelineEvent = {
  id: string;
  title: string;
  era: string;
  description: string;
  details: string;
  relatedCharacters: string[];
  relatedLocations: string[];
};

export type Realm = {
  id: string;
  slug: string;
  name: string;
  description: string;
  dominantFaction: string;
  representativeCharacters: string[];
  importantLocations: string[];
  dangerLevel: string;
  divineInfluence: number;
  color: string;
};

export type LocationEntry = {
  id: string;
  slug: string;
  name: string;
  realm: string;
  faction: string;
  palette: string[];
  function: string;
  history: string;
  chapters: string[];
  relatedCharacters: string[];
  atmosphere: string;
  majorEvents: string[];
  image: string;
  tags: string[];
};

export type ArtifactEntry = {
  id: string;
  slug: string;
  name: string;
  type: string;
  holder: string;
  element: string;
  ability: string;
  appearance: string;
  palette: string[];
  chapters: string[];
  meaning: string;
  merchReady: boolean;
  tags: string[];
};

export const loreCategories: LoreCategory[] = [
  "創世神話",
  "天古三大上神",
  "三殿九尊",
  "天界制度",
  "天位神榜",
  "七界秩序",
  "星界守護體系",
  "四大古王國",
  "神魔雙屬性",
  "上古封印",
  "神權崩壞事件",
  "天命之子",
  "禁忌力量",
  "神獸與魔獸",
];

const loreCategorySlugs = [
  "creation-myth",
  "ancient-three-gods",
  "three-temples-nine-venerables",
  "heaven-system",
  "godrank-system",
  "seven-realms-order",
  "star-guardian-system",
  "four-ancient-kingdoms",
  "god-demon-duality",
  "ancient-seal",
  "divine-collapse",
  "child-of-mandate",
  "forbidden-power",
  "divine-beasts-and-demons",
] as const;

export const loreEntries: LoreEntry[] = loreCategories.map((category, index) => ({
  id: `lore-${index + 1}`,
  slug: loreCategorySlugs[index],
  title: category,
  category,
  faction: index % 3 === 0 ? "天幻神殿" : index % 3 === 1 ? "黃金神殿" : "深淵魔殿",
  element: index % 4 === 0 ? "星命" : index % 4 === 1 ? "聖金" : index % 4 === 2 ? "深淵" : "封印",
  tags: [category, "七界宇宙", index % 2 === 0 ? "核心設定" : "禁忌資料"],
  summary: `${category} 是《神權崩壞》世界觀中的關鍵資料，用來解釋七界秩序與天命之子的命運。`,
  content: [
    `${category} 的起源可追溯至神權尚未分裂的年代，當時三大上神仍共同維持七界秩序。`,
    "隨著天位神榜制度形成，這項設定逐漸被神殿改寫，成為統治、信仰與禁忌力量的交會點。",
    "在主線劇情中，它不只是背景知識，也會直接影響角色選擇、勢力衝突與付費章節中的封印真相。",
  ],
  relatedCharacters: index % 2 === 0 ? ["tianhun", "tianyun"] : ["shenhuan", "moyuan"],
  relatedLocations: index % 2 === 0 ? ["heaven-fantasy-temple", "seal-land"] : ["golden-temple", "abyss-temple"],
  relatedArtifacts: index % 2 === 0 ? ["god-demon-blades", "moon-dream-staff"] : ["godrank-scroll", "abyss-core"],
}));

export const timelineEvents: TimelineEvent[] = [
  ["上古創世", "太初紀元", "七界尚未分離，星命之海孕育第一道神權。"],
  ["三大上神創造世界", "太初紀元後期", "天古三大上神分立神界、星界與凡界根基。"],
  ["三大上神收徒", "上神紀元", "上神收下九名弟子，三殿九尊的雛形出現。"],
  ["三殿九尊形成", "上神紀元中期", "天幻、黃金、深淵三殿正式建立尊位制度。"],
  ["三大勢力內鬥", "裂隙紀元", "三殿開始爭奪天命解釋權，神權第一次出現裂痕。"],
  ["三殿九尊反抗師尊", "裂隙紀元末", "九尊聯手質疑上神封印真相，引發上古內戰。"],
  ["三大上神發動化生封印", "封印紀元", "上神以自身神性化作封印，鎖住神權崩壞源頭。"],
  ["天界建立", "天界紀元", "天界制度形成，黃金神殿取得律法主導權。"],
  ["天位神榜制度形成", "天界紀元中期", "天位神榜開始記錄位階、功績與禁名。"],
  ["七界秩序逐漸穩定", "秩序紀元", "七界霸主接受神榜制度，星界七門成為界域樞紐。"],
  ["神權崩壞徵兆出現", "現世紀元", "神榜出現不可讀文字，封印之地浮現裂縫。"],
  ["天命之子誕生", "現世紀元", "禁名之子降生，神魔雙屬性開始互相吞噬。"],
  ["二代主角天魂與天芸登場", "現世紀元當代", "天魂與天芸在神榜裂痕中相遇，最後天命重新浮現。"],
].map(([title, era, description], index) => ({
  id: `timeline-${index + 1}`,
  title,
  era,
  description,
  details: `${title} 是神權編年史中的轉折點，牽動三殿九尊、上古封印與七界秩序的後續變化。`,
  relatedCharacters: index > 10 ? ["tianhun", "tianyun"] : ["shenhuan", "shengyuan", "moyuan"],
  relatedLocations: index % 2 === 0 ? ["seal-land", "godrank-hall"] : ["heaven-temple", "ancient-battlefield"],
}));

export const realms: Realm[] = [
  ["heaven-realm", "天界", "神權律法與天位神榜的最高行政界域。", "黃金神殿", ["shengyuan", "shengyuan-f"], ["heaven-temple", "godrank-hall"], "高", 95, "#D9B45F"],
  ["star-realm", "星界", "七門與星命羅盤所在之地，守護界域平衡。", "星界守護體系", ["longchen", "longhun"], ["star-palace"], "中高", 82, "#A8D8FF"],
  ["god-realm", "神界", "古老神性與創世神話留存的領域。", "天古三大上神", ["shenhuan", "shentian"], ["heaven-fantasy-temple"], "高", 88, "#F4EBD0"],
  ["demon-realm", "魔界", "魔獸、魔翼與禁忌力量聚集的界域。", "深淵魔殿", ["moyuan", "momie"], ["abyss-temple"], "極高", 74, "#6D4DFF"],
  ["mortal-realm", "凡界", "四大古王國與天命血脈沉睡之地。", "四大古王國", ["tianhun", "tianyun"], ["ancient-kingdoms"], "中", 52, "#10223F"],
  ["abyss-realm", "深淵界", "被化生封印壓制的深層魔性界域。", "深淵魔殿", ["moyun", "longyuan"], ["god-demon-border"], "極高", 66, "#1A102E"],
  ["ancient-kingdom-domain", "古王國領域", "凡界王印、古盟與封印鑰的保管地。", "凡界古王國", ["tianhun"], ["ancient-kingdoms", "ancient-battlefield"], "中高", 61, "#D9A7FF"],
].map(([slug, name, description, dominantFaction, representativeCharacters, importantLocations, dangerLevel, divineInfluence, color]) => ({
  id: `realm-${slug}`,
  slug: slug as string,
  name: name as string,
  description: description as string,
  dominantFaction: dominantFaction as string,
  representativeCharacters: representativeCharacters as string[],
  importantLocations: importantLocations as string[],
  dangerLevel: dangerLevel as string,
  divineInfluence: divineInfluence as number,
  color: color as string,
}));

export const locations: LocationEntry[] = [
  ["heaven-fantasy-temple", "天幻神殿", "神界", "天幻神殿", ["#D9A7FF", "#A8D8FF"], "夢境、幻術與星界神諭", "曾由天幻上神親手建立。"],
  ["golden-temple", "黃金神殿", "天界", "黃金神殿", ["#D9B45F", "#F4EBD0"], "律法、裁決與神榜管理", "掌握天界制度的核心神殿。"],
  ["abyss-temple", "深淵魔殿", "深淵界", "深淵魔殿", ["#1A102E", "#6D4DFF"], "魔神血契與禁忌研究", "保存被神界抹除的另一半真史。"],
  ["heaven-temple", "天界神殿", "天界", "天界制度", ["#F4EBD0", "#D9B45F"], "天界議政與神諭發布", "天界建立後的最高議事場。"],
  ["star-palace", "星界宮殿", "星界", "星界守護體系", ["#A8D8FF", "#6D4DFF"], "星門觀測與星命推演", "七大守護神輪值看守星門。"],
  ["ancient-kingdoms", "凡界古王國", "凡界", "四大古王國", ["#10223F", "#D9B45F"], "保管王印與古盟", "凡界對抗神權的古老根據地。"],
  ["three-thrones", "三大上尊王座", "神界", "三殿九尊", ["#D9B45F", "#6D4DFF"], "三殿上尊會議", "九尊曾在此反抗師尊。"],
  ["temple-square", "神殿廣場", "天界", "天界制度", ["#F4EBD0", "#10223F"], "公開審判與神榜宣告", "神權崩壞徵兆首次被群眾看見。"],
  ["seal-land", "封印之地", "凡界", "上古封印", ["#D9A7FF", "#080814"], "鎮壓化生封印", "封印裂痕連接天魂與天芸的命運。"],
  ["ancient-battlefield", "上古戰場", "古王國領域", "四大古王國", ["#1A102E", "#D9B45F"], "記錄上古內戰", "三大勢力內鬥的最後戰場。"],
  ["godrank-hall", "天位神榜殿", "天界", "黃金神殿", ["#D9B45F", "#080814"], "存放天位神榜", "禁名第一次浮現之處。"],
  ["god-demon-border", "神魔交界之域", "深淵界", "神魔雙屬性", ["#6D4DFF", "#F4EBD0"], "神魔力量互相吞噬", "天魂力量覺醒的重要場地。"],
].map(([slug, name, realm, faction, palette, func, history]) => ({
  id: `location-${slug}`,
  slug: slug as string,
  name: name as string,
  realm: realm as string,
  faction: faction as string,
  palette: palette as string[],
  function: func as string,
  history: history as string,
  chapters: ["ch-001", "ch-008"],
  relatedCharacters: faction === "天幻神殿" ? ["tianyun", "shenhuan"] : faction === "深淵魔殿" ? ["moyuan", "tianhun"] : ["tianhun", "tianyun"],
  atmosphere: `${name} 充滿 ${realm} 的神性壓迫與星塵光霧，適合呈現高級暗黑神殿美術。`,
  majorEvents: ["神榜裂痕", "封印異動", "天命徵兆"],
  image: `/placeholder/${slug}.jpg`,
  tags: [realm as string, faction as string, "重要場地"],
}));

export const artifacts: ArtifactEntry[] = [
  ["god-demon-blades", "神魔雙刃", "武器", "天魂", "神魔雙屬性", "切開神諭與魔印的雙重枷鎖", "一金一紫黑的雙刃，刃身有神龍與魔翼紋路。", ["#D9B45F", "#6D4DFF"], true],
  ["moon-dream-staff", "月夢法杖", "法器", "天芸", "夢幻與月光", "讀取夢印與星界神諭", "粉紫淡藍晶核懸浮於月輪杖首。", ["#D9A7FF", "#A8D8FF"], true],
  ["godrank-scroll", "天位神榜", "制度神器", "黃金神殿", "聖金律令", "記錄位階、功績、禁名與裁決", "金色長卷懸浮於神榜殿中央。", ["#D9B45F", "#F4EBD0"], true],
  ["rebirth-seal-scroll", "化生封印卷軸", "封印卷軸", "天古三大上神", "上古封印", "以神性化作封印鎮壓崩壞源頭", "卷軸像半透明神紗，文字會自行重排。", ["#F4EBD0", "#D9A7FF"], false],
  ["ancient-god-seal", "上古神印", "神印", "三大上神", "創世神性", "開啟或關閉上古封印的印記", "白金色方印，四角有星軌裂痕。", ["#F4EBD0", "#A8D8FF"], true],
  ["abyss-core", "深淵魔核", "魔核", "魔淵", "深淵魔焰", "放大魔性並讀取被抹除的真史", "黑紫晶核，中心像有眼瞳燃燒。", ["#1A102E", "#6D4DFF"], true],
  ["star-fate-compass", "星命羅盤", "觀測器", "星界守護神", "星命", "推演七界星門與命運偏移", "淡藍羅盤浮著七重星環。", ["#A8D8FF", "#6D4DFF"], true],
  ["golden-source-stone", "黃金聖源石", "聖石", "聖元", "聖金", "維持黃金神殿律令能源", "白金礦脈中誕生的心臟形聖石。", ["#D9B45F", "#F4EBD0"], true],
  ["heaven-fantasy-veil", "天幻神紗", "神紗", "神喚", "幻夢", "遮蔽真名與夢境軌跡", "薄如月霧的粉紫神紗。", ["#D9A7FF", "#A8D8FF"], true],
  ["dragon-contract-seal", "神龍契約印", "契約印", "龍魂", "神龍", "締結神龍與持有者的血脈契約", "金色龍紋在皮膚上盤旋成印。", ["#D9B45F", "#A8D8FF"], true],
  ["demon-wing-mark", "魔翼覺醒印", "覺醒印", "天魂", "深淵", "喚醒紫黑魔翼並抵抗神榜抹名", "背脊浮現的紫黑翼形印記。", ["#6D4DFF", "#080814"], true],
  ["seven-realms-key", "七界封印鑰", "封印鑰", "未知", "七界秩序", "可同時觸碰七界封印節點", "七色晶片組成的鑰形神器。", ["#D9B45F", "#A8D8FF", "#D9A7FF"], true],
].map(([slug, name, type, holder, element, ability, appearance, palette, merchReady]) => ({
  id: `artifact-${slug}`,
  slug: slug as string,
  name: name as string,
  type: type as string,
  holder: holder as string,
  element: element as string,
  ability: ability as string,
  appearance: appearance as string,
  palette: palette as string[],
  chapters: ["ch-002", "ch-007"],
  meaning: `${name} 不只是道具，也代表 ${holder} 在神權崩壞中的選擇與代價。`,
  merchReady: merchReady as boolean,
  tags: [type as string, element as string, merchReady ? "可商品化" : "劇情核心"],
}));

export function getLoreEntry(slug: string) {
  return loreEntries.find((entry) => entry.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function getArtifact(slug: string) {
  return artifacts.find((artifact) => artifact.slug === slug);
}
