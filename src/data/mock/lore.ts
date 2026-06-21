export type LoreEntry = {
  id: string;
  title: string;
  category: "勢力" | "界域" | "神器" | "封印" | "制度";
  summary: string;
  detail: string;
};

export const loreEntries: LoreEntry[] = [
  {
    id: "heaven-fantasy-temple",
    title: "天幻神殿",
    category: "勢力",
    summary: "掌管夢境、幻術與星界神諭的古老神殿。",
    detail: "天幻神殿曾是三殿中最接近天命源流的勢力，如今只剩夢印繼承者仍能讀懂上古神諭。",
  },
  {
    id: "golden-temple",
    title: "黃金神殿",
    category: "勢力",
    summary: "維護神權律法與天位神榜的裁決中心。",
    detail: "黃金神殿相信秩序高於眾生，其裁決令可直接改寫神榜上的姓名與位階。",
  },
  {
    id: "abyss-temple",
    title: "深淵魔殿",
    category: "勢力",
    summary: "被神界放逐的魔神聖域，掌握墮神血契。",
    detail: "深淵魔殿並非純粹惡意，它保存了神權崩壞前被抹除的另一半真史。",
  },
  {
    id: "seven-realms",
    title: "七界",
    category: "界域",
    summary: "神界、星界、魔界、凡界等七大界域共同構成命運之環。",
    detail: "七界之間以星門相連，當任一界域王座崩裂，其餘六界也會出現命運回潮。",
  },
  {
    id: "godrank",
    title: "天位神榜",
    category: "制度",
    summary: "記錄神、魔、皇、帝、尊與凡界古王的力量位階。",
    detail: "神榜由黃金神殿維護，但原始榜卷據說早已被無涯書聖藏入凡界。",
  },
  {
    id: "ancient-seal",
    title: "上古封印",
    category: "封印",
    summary: "天古三大上神留下，用來鎖住神權崩壞源頭的封印。",
    detail: "封印不是為了關住魔，而是為了阻止神再次奪走天命的自由意志。",
  },
  {
    id: "star-gates",
    title: "星界七門",
    category: "神器",
    summary: "七道通往界域深處的星門，由七大守護神看守。",
    detail: "第七門後方藏著被神榜刪除的歷史，也是天芸夢中反覆看見的神墓。",
  },
  {
    id: "ancient-kingdoms",
    title: "凡界四大古王國",
    category: "界域",
    summary: "凡界最古老的四支王族，守著神權崩壞前的人間盟約。",
    detail: "四大古王國並非神的臣民，他們曾與天古上神並肩立誓，守住最後天命。",
  },
];
