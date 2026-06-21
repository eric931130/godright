import "server-only";

import { FieldValue, Timestamp, type DocumentData } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import type { CollaborationInquiry, InquiryStatus, InquiryType } from "@/lib/collaboration/inquiry-types";

const INQUIRY_TYPES: InquiryType[] = ["illustration", "sticker", "video", "ebook", "merch", "lecture", "license", "other"];

function tsToIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

function mapInquiryDoc(id: string, data: DocumentData): CollaborationInquiry {
  return {
    id,
    name: data.name ?? "",
    email: data.email ?? "",
    organization: data.organization ?? undefined,
    inquiryType: INQUIRY_TYPES.includes(data.inquiryType) ? data.inquiryType : "other",
    message: data.message ?? "",
    status: (["new", "reviewing", "replied", "closed"].includes(data.status) ? data.status : "new") as InquiryStatus,
    createdAt: tsToIso(data.createdAt),
  };
}

export type CreateInquiryInput = {
  name: string;
  email: string;
  organization?: string;
  inquiryType: InquiryType;
  message: string;
};

/** 建立合作邀約。Firebase 未設定時回 persisted:false（表單仍回成功，但不持久化）。 */
export async function createInquiry(input: CreateInquiryInput): Promise<{ persisted: boolean }> {
  try {
    await getAdminDb().collection("collaborationInquiries").add({
      name: input.name,
      email: input.email,
      organization: input.organization ?? null,
      inquiryType: input.inquiryType,
      message: input.message,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    });
    return { persisted: true };
  } catch {
    return { persisted: false };
  }
}

export async function listInquiries(): Promise<CollaborationInquiry[]> {
  try {
    const snapshot = await getAdminDb()
      .collection("collaborationInquiries")
      .orderBy("createdAt", "desc")
      .limit(300)
      .get();
    return snapshot.docs.map((doc) => mapInquiryDoc(doc.id, doc.data()));
  } catch {
    return [];
  }
}
