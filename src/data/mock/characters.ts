export type Character = {
  id: string;
  name: string;
  title: string;
  faction: string;
  rank: string;
  element: string;
  quote: string;
  description: string;
  imageAlt: string;
};

export const characters: Character[] = [
  {
    id: "tianhun",
    name: "天魂",
    title: "神魔之子",
    faction: "深淵魔殿 / 未定天命",
    rank: "神榜禁名",
    element: "神火與魔印",
    quote: "若神權只剩枷鎖，我便斬斷天命。",
    description: "體內同時流著神界聖血與深淵魔血，被三殿九尊視為終局異數。",
    imageAlt: "天魂角色立繪預留位置",
  },
  {
    id: "tianyun",
    name: "天芸",
    title: "夢幻之女",
    faction: "天幻神殿",
    rank: "星夢神嗣",
    element: "夢印與星軌",
    quote: "夢不是逃離現實，是命運還未醒來的形狀。",
    description: "能聽見星界裂縫中的神諭殘響，是天幻神殿最後的夢印繼承者。",
    imageAlt: "天芸角色立繪預留位置",
  },
  {
    id: "jinyao",
    name: "金曜帝君",
    title: "黃金神殿裁決者",
    faction: "黃金神殿",
    rank: "天界四帝",
    element: "聖金律令",
    quote: "律法不為眾生而改，眾生須向律法低頭。",
    description: "掌管天位神榜的裁決之帝，堅信神權崩壞源於凡界僭越。",
    imageAlt: "金曜帝君角色立繪預留位置",
  },
  {
    id: "xuanming",
    name: "玄冥尊者",
    title: "深淵第七尊",
    faction: "深淵魔殿",
    rank: "三殿九尊",
    element: "幽冥潮汐",
    quote: "深淵從不吞噬人心，它只是讓人看見自己。",
    description: "深淵魔殿的古老尊者，曾親手封存神魔之子的第一道魔印。",
    imageAlt: "玄冥尊者角色立繪預留位置",
  },
  {
    id: "liuli",
    name: "琉璃星君",
    title: "星界守門人",
    faction: "星界七大守護神",
    rank: "星界守護神",
    element: "月光與界門",
    quote: "每一顆星都是一扇門，只是代價不同。",
    description: "守護星界七門的月光神祇，知曉上古封印真正的鑰匙。",
    imageAlt: "琉璃星君角色立繪預留位置",
  },
  {
    id: "canglan",
    name: "蒼瀾古王",
    title: "凡界北境王",
    faction: "凡界四大古王國",
    rank: "古王血脈",
    element: "霜海龍息",
    quote: "凡人沒有神座，但有不跪的脊骨。",
    description: "凡界古王國的北境君主，暗中保護天命之子的凡界線索。",
    imageAlt: "蒼瀾古王角色立繪預留位置",
  },
  {
    id: "yanji",
    name: "焰姬",
    title: "赤炎神使",
    faction: "天界四神",
    rank: "天界四神",
    element: "赤炎神羽",
    quote: "火焰會燒盡謊言，也會留下灰燼裡的真名。",
    description: "天界四神之一，奉命追捕天魂，卻逐漸懷疑神諭的真相。",
    imageAlt: "焰姬角色立繪預留位置",
  },
  {
    id: "wuya",
    name: "無涯書聖",
    title: "神榜撰錄者",
    faction: "天位神榜",
    rank: "榜外聖者",
    element: "命書與墨星",
    quote: "我只記錄天命，但不代表我相信天命。",
    description: "負責撰錄天位神榜的神秘聖者，藏有神權崩壞前的原始榜卷。",
    imageAlt: "無涯書聖角色立繪預留位置",
  },
];
