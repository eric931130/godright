import {
  canDownloadProduct,
  canReadChapter,
  hasPurchasedProduct,
  hasUnlockedChapter,
  isAdmin,
  isVipUser,
} from "@/lib/permissions";

export const permissionTestScenarios = [
  { userId: "", chapterId: "ch-001", expected: true, label: "guest can read free chapter" },
  { userId: "", chapterId: "ch-009", expected: false, label: "guest cannot read paid chapter" },
  { userId: "mock-paid", chapterId: "ch-009", expected: true, label: "paid user can read unlocked chapter" },
  { userId: "mock-vip", chapterId: "ch-020", expected: true, label: "vip can read paid chapter" },
  { userId: "mock-admin", chapterId: "ch-020", expected: true, label: "admin can read paid chapter" },
];

export async function runPermissionSmokeTest() {
  const chapterResults = await Promise.all(
    permissionTestScenarios.map(async (scenario) => ({
      ...scenario,
      actual: await canReadChapter(scenario.userId, scenario.chapterId),
    })),
  );

  return {
    chapterResults,
    paidUserHasProduct: await hasPurchasedProduct("mock-paid", "prod-ebook-01"),
    paidUserHasUnlock: await hasUnlockedChapter("mock-paid", "ch-009"),
    vipCheck: await isVipUser("mock-vip"),
    adminCheck: await isAdmin("mock-admin"),
    paidUserCanDownload: await canDownloadProduct("mock-paid", "prod-ebook-01"),
  };
}
