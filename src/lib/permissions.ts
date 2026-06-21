import { getDataProvider } from "@/lib/data";
import { getCurrentUser, type AuthRole } from "@/lib/auth";

const mockRolesByUserId: Record<string, AuthRole> = {
  "mock-admin": "admin",
  "mock-vip": "vip",
  "mock-paid": "paid_user",
  "mock-user": "user",
};

async function getRoleForUser(userId: string): Promise<AuthRole> {
  if (!userId) {
    return "guest";
  }

  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId) {
    return currentUser.role;
  }

  return mockRolesByUserId[userId] ?? "user";
}

export async function isAdmin(userId: string) {
  return (await getRoleForUser(userId)) === "admin";
}

export async function isVipUser(userId: string) {
  const role = await getRoleForUser(userId);
  return role === "vip" || role === "admin";
}

export async function hasUnlockedChapter(userId: string, chapterId: string) {
  try {
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const snapshot = await getAdminDb()
      .collection("chapterUnlocks")
      .doc(`${userId}_${chapterId}`)
      .get();
    const data = snapshot.data();
    const expiresAt = data?.expiresAt?.toMillis?.();

    if (snapshot.exists && (!expiresAt || expiresAt > Date.now())) {
      return true;
    }
  } catch {
    // Fall back to mock provider while Firebase Admin env is not configured.
  }

  const provider = getDataProvider();
  const unlocks = await provider.listChapterUnlocks(userId);
  return unlocks.some((unlock) => unlock.chapterId === chapterId);
}

export async function hasPurchasedVolume(userId: string, volumeId: string) {
  try {
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const snapshot = await getAdminDb()
      .collection("volumePurchases")
      .doc(`${userId}_${volumeId}`)
      .get();
    const data = snapshot.data();
    const expiresAt = data?.expiresAt?.toMillis?.();
    return snapshot.exists && (!expiresAt || expiresAt > Date.now());
  } catch {
    const provider = getDataProvider();
    const purchases = await provider.listPurchases(userId);
    return purchases.some(
      (purchase) =>
        purchase.status === "paid" &&
        purchase.targetType === "volume" &&
        purchase.targetId === volumeId,
    );
  }
}

export async function hasPurchasedProduct(userId: string, productId: string) {
  try {
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const snapshot = await getAdminDb()
      .collection("productPurchases")
      .doc(`${userId}_${productId}`)
      .get();
    const data = snapshot.data();
    const expiresAt = data?.expiresAt?.toMillis?.();
    if (snapshot.exists && (!expiresAt || expiresAt > Date.now())) {
      return true;
    }
  } catch {
    // Fall back to mock provider while Firebase Admin env is not configured.
  }

  const provider = getDataProvider();
  const purchases = await provider.listPurchases(userId);
  return purchases.some(
    (purchase) =>
      purchase.status === "paid" &&
      (purchase.targetId === productId ||
        (purchase.targetType === "volume" && purchase.targetId === productId)),
    );
}

export async function isVipActive(userId: string) {
  if (await isVipUser(userId)) return true;

  try {
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const snapshot = await getAdminDb().collection("vipGrants").doc(userId).get();
    const data = snapshot.data();
    const expiresAt = data?.expiresAt?.toMillis?.();
    return snapshot.exists && data?.active !== false && (!expiresAt || expiresAt > Date.now());
  } catch {
    return false;
  }
}

export async function canReadChapter(userId: string | null, chapterId: string) {
  const provider = getDataProvider();
  const chapter = await provider.getChapterById(chapterId);

  if (!chapter) {
    return false;
  }

  if (chapter.isFree) {
    return true;
  }

  if (!userId) {
    return false;
  }

  if ((await isAdmin(userId)) || (await isVipActive(userId))) {
    return true;
  }

  if (await hasUnlockedChapter(userId, chapterId)) {
    return true;
  }

  return hasPurchasedVolume(userId, chapter.volumeSlug);
}

export async function canDownloadProduct(userId: string, productId: string) {
  if (!userId) {
    return false;
  }

  if ((await isAdmin(userId)) || (await isVipUser(userId))) {
    return true;
  }

  return hasPurchasedProduct(userId, productId);
}

export async function createDownloadLog(userId: string, productId: string) {
  if (!(await canDownloadProduct(userId, productId))) {
    throw new Error("User cannot download this product.");
  }

  return getDataProvider().createDownloadLog(userId, productId);
}

export async function getUserDownloads(userId: string) {
  return getDataProvider().listDownloads(userId);
}
