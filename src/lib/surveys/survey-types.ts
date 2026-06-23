// 問卷型別（純資料，client/server 共用）。

export type SurveyQuestionType = "single" | "multiple" | "text";

export type SurveyQuestion = {
  id: string;
  text: string;
  type: SurveyQuestionType;
  options?: string[];
};

export type Survey = {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  isActive: boolean;
  createdAt?: string;
};

/** 一份回應：questionId → 答案（單選/文字為 string，多選為 string[]）。 */
export type SurveyAnswers = Record<string, string | string[]>;

export type SurveyResultBreakdown = {
  question: SurveyQuestion;
  /** 選擇題：每個選項計數；文字題：回答文字列表。 */
  optionCounts?: { option: string; count: number }[];
  textAnswers?: string[];
};
