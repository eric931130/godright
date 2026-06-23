import "server-only";

import { FieldValue, type DocumentData } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import type {
  Survey,
  SurveyAnswers,
  SurveyQuestion,
  SurveyResultBreakdown,
} from "@/lib/surveys/survey-types";

function tsToIso(value: unknown): string | undefined {
  return value && typeof (value as { toDate?: () => Date }).toDate === "function"
    ? (value as { toDate: () => Date }).toDate().toISOString()
    : undefined;
}

function mapSurvey(id: string, data: DocumentData): Survey {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? undefined,
    questions: Array.isArray(data.questions) ? (data.questions as SurveyQuestion[]) : [],
    isActive: data.isActive !== false,
    createdAt: tsToIso(data.createdAt),
  };
}

export async function listSurveys(): Promise<Survey[]> {
  try {
    const snapshot = await getAdminDb().collection("surveys").orderBy("createdAt", "desc").limit(200).get();
    return snapshot.docs.map((doc) => mapSurvey(doc.id, doc.data()));
  } catch {
    return [];
  }
}

export async function listActiveSurveys(): Promise<Survey[]> {
  return (await listSurveys()).filter((survey) => survey.isActive);
}

export async function getSurveyById(id: string): Promise<Survey | null> {
  try {
    const doc = await getAdminDb().collection("surveys").doc(id).get();
    return doc.exists ? mapSurvey(doc.id, doc.data() as DocumentData) : null;
  } catch {
    return null;
  }
}

export type CreateSurveyInput = {
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  isActive: boolean;
};

export async function createSurvey(input: CreateSurveyInput, adminUid: string): Promise<{ id: string }> {
  const ref = await getAdminDb().collection("surveys").add({
    title: input.title,
    description: input.description ?? null,
    questions: input.questions,
    isActive: input.isActive,
    createdBy: adminUid,
    createdAt: FieldValue.serverTimestamp(),
  });
  return { id: ref.id };
}

export async function submitSurveyResponse(input: {
  surveyId: string;
  answers: SurveyAnswers;
  userId?: string | null;
}): Promise<void> {
  await getAdminDb().collection("surveyResponses").add({
    surveyId: input.surveyId,
    answers: input.answers,
    userId: input.userId ?? null,
    createdAt: FieldValue.serverTimestamp(),
  });
}

export type SurveyResults = {
  survey: Survey | null;
  total: number;
  breakdown: SurveyResultBreakdown[];
};

export async function getSurveyResults(surveyId: string): Promise<SurveyResults> {
  const survey = await getSurveyById(surveyId);
  if (!survey) return { survey: null, total: 0, breakdown: [] };

  let responses: SurveyAnswers[] = [];
  try {
    const snapshot = await getAdminDb()
      .collection("surveyResponses")
      .where("surveyId", "==", surveyId)
      .limit(5000)
      .get();
    responses = snapshot.docs.map((doc) => (doc.data().answers ?? {}) as SurveyAnswers);
  } catch {
    responses = [];
  }

  const breakdown: SurveyResultBreakdown[] = survey.questions.map((question) => {
    if (question.type === "text") {
      const textAnswers = responses
        .map((answer) => answer[question.id])
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0);
      return { question, textAnswers };
    }
    const counts = new Map<string, number>();
    for (const option of question.options ?? []) counts.set(option, 0);
    for (const answer of responses) {
      const value = answer[question.id];
      const picked = Array.isArray(value) ? value : value ? [value] : [];
      for (const choice of picked) counts.set(choice, (counts.get(choice) ?? 0) + 1);
    }
    return {
      question,
      optionCounts: [...counts.entries()].map(([option, count]) => ({ option, count })),
    };
  });

  return { survey, total: responses.length, breakdown };
}
