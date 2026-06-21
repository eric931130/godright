export type PowerRank = {
  id: string;
  tier: string;
  name: string;
  scope: string;
  description: string;
  color: string;
};

export const powerRanks: PowerRank[] = [
  {
    id: "rank-01",
    tier: "一",
    name: "凡界覺醒者",
    scope: "凡界",
    description: "初次感應靈脈與命星，能看見神榜投下的影子。",
    color: "from-moon-blue/30 to-demon-blue/30",
  },
  {
    id: "rank-02",
    tier: "二",
    name: "古王血脈",
    scope: "凡界古國",
    description: "繼承四大古王國盟約，可短暫抵抗低階神諭。",
    color: "from-divine-gold/24 to-demon-blue/30",
  },
  {
    id: "rank-03",
    tier: "三",
    name: "神使",
    scope: "天界",
    description: "受神殿授印，能使用神殿律令與界域通行權。",
    color: "from-divine-gold/30 to-platinum/12",
  },
  {
    id: "rank-04",
    tier: "四",
    name: "星界守護神",
    scope: "星界",
    description: "守護星門與界域平衡，可讀取星軌中的命運殘響。",
    color: "from-moon-blue/28 to-astral-purple/34",
  },
  {
    id: "rank-05",
    tier: "五",
    name: "天界四神",
    scope: "天界",
    description: "天界核心戰力，分掌火、雷、風、月四大神權。",
    color: "from-divine-gold/34 to-dream-violet/24",
  },
  {
    id: "rank-06",
    tier: "六",
    name: "三殿九尊",
    scope: "三大神殿",
    description: "三大神殿各自鎮守的尊位，能改寫界域法則。",
    color: "from-astral-purple/34 to-abyss-purple/44",
  },
  {
    id: "rank-07",
    tier: "七",
    name: "天界四帝",
    scope: "天界王座",
    description: "掌握神權制度最高權柄，可對天位神榜下達裁決。",
    color: "from-divine-gold/42 to-astral-purple/30",
  },
  {
    id: "rank-08",
    tier: "禁",
    name: "神榜禁名",
    scope: "天命異數",
    description: "不被神榜完整記錄的存在，通常意味著神權將被重寫。",
    color: "from-dream-violet/38 to-divine-gold/30",
  },
];
