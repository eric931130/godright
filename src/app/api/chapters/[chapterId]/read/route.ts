import { NextRequest, NextResponse } from "next/server";

import { chapters } from "@/data/novel";
import { getBearerToken, verifyFirebaseIdToken } from "@/lib/firebase/admin";
import { canReadChapter } from "@/lib/permissions";

type ChapterReadRouteProps = {
  params: Promise<{ chapterId: string }>;
};

export async function GET(request: NextRequest, { params }: ChapterReadRouteProps) {
  const { chapterId } = await params;
  const chapter = chapters.find((item) => item.id === chapterId);

  if (!chapter) {
    return NextResponse.json({ error: "找不到章節。" }, { status: 404 });
  }

  let userId: string | null = null;
  const token = getBearerToken(request.headers);

  if (token) {
    try {
      userId = (await verifyFirebaseIdToken(token)).uid;
    } catch {
      userId = null;
    }
  }

  if (!(await canReadChapter(userId, chapterId))) {
    return NextResponse.json(
      {
        locked: true,
        chapter: {
          id: chapter.id,
          title: chapter.title,
          excerpt: chapter.excerpt,
          price: chapter.price,
          volumeSlug: chapter.volumeSlug,
        },
      },
      { status: 403 },
    );
  }

  return NextResponse.json({ locked: false, chapter });
}
