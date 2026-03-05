import { prisma } from "@/lib/prisma";

export async function getOrgPlan(orgId: string) {
  const sub = await prisma.orgSubscription.findUnique({ where: { orgId } });
  return sub?.plan ?? "FREE";
}

export function canExportEvidence(plan: "FREE" | "PRO" | "ELITE") {
  if (plan === "FREE") return false;
  return true;
}

export function maxDealsPerMonth(plan: "FREE" | "PRO" | "ELITE") {
  if (plan === "FREE") return 10;
  if (plan === "PRO") return 300;
  return 5000;
}
