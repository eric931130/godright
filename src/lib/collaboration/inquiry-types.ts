// IP 合作邀約型別。

export type InquiryType =
  | "illustration"
  | "sticker"
  | "video"
  | "ebook"
  | "merch"
  | "lecture"
  | "license"
  | "other";

export type InquiryStatus = "new" | "reviewing" | "replied" | "closed";

export type CollaborationInquiry = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  inquiryType: InquiryType;
  message: string;
  status: InquiryStatus;
  createdAt?: string;
};

export const inquiryTypeLabels: Record<InquiryType, string> = {
  illustration: "插畫合作",
  sticker: "貼圖合作",
  video: "短影音合作",
  ebook: "電子書合作",
  merch: "文創商品合作",
  lecture: "校園講座 / AI 創作課程",
  license: "授權合作",
  other: "其他",
};
