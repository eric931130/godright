import { randomUUID } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { requireAdminRequest } from "@/lib/auth/api-auth";
import { getAdminDb, getAdminStorage } from "@/lib/firebase/admin";

const allowedContentTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedCategories = new Set([
  "homepage",
  "character",
  "product",
  "ebook",
  "lore",
  "location",
  "artifact",
  "campaign",
  "general",
]);
const maxImageSize = 5 * 1024 * 1024;

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120) || "image";
}

function publicDownloadUrl(bucketName: string, filePath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminRequest(request);
  if (!admin.ok) return admin.response;

  const formData = await request.formData();
  const file = formData.get("file");
  const categoryInput = String(formData.get("category") ?? "general");
  const category = allowedCategories.has(categoryInput) ? categoryInput : "general";
  const alt = String(formData.get("alt") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing image file." }, { status: 400 });
  }

  if (!allowedContentTypes.has(file.type)) {
    return NextResponse.json({ error: "Only jpg, jpeg, png and webp images are allowed." }, { status: 400 });
  }

  if (file.size > maxImageSize) {
    return NextResponse.json({ error: "Image size must be 5MB or smaller." }, { status: 400 });
  }

  const assetRef = getAdminDb().collection("mediaAssets").doc();
  const bucket = getAdminStorage().bucket();
  const token = randomUUID();
  const safeName = sanitizeFileName(file.name);
  const filePath = `ip-assets/${category}/${assetRef.id}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await bucket.file(filePath).save(buffer, {
    contentType: file.type,
    metadata: {
      cacheControl: "public, max-age=31536000, immutable",
      metadata: {
        firebaseStorageDownloadTokens: token,
        uploadedBy: admin.admin.uid,
      },
    },
  });

  const url = publicDownloadUrl(bucket.name, filePath, token);

  await assetRef.set({
    id: assetRef.id,
    fileName: safeName,
    filePath,
    url,
    contentType: file.type,
    size: file.size,
    alt,
    category,
    tags,
    usedBy: [],
    uploadedBy: admin.admin.uid,
    createdAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({
    ok: true,
    asset: {
      id: assetRef.id,
      fileName: safeName,
      filePath,
      url,
      category,
      alt,
    },
  });
}
