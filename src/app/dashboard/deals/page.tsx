import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createDealWithEvent,
  isPrismaUniqueConstraintError,
} from "@/lib/deals";
import { requireDashboardContext } from "@/lib/tenant";
import DealsPageClient from "./DealsPageClient";

export default async function DealsPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok && ctx.reason === "SIGN_IN") redirect("/sign-in");
  if (!ctx.ok) redirect("/dashboard");

  async function createDeal(formData: FormData) {
    "use server";
    const nextCtx = await requireDashboardContext();
    if (!nextCtx.ok && nextCtx.reason === "SIGN_IN") redirect("/sign-in");
    if (!nextCtx.ok) redirect("/dashboard");
    const dealNumber = String(formData.get("dealNumber") ?? "").trim();
    if (!dealNumber) redirect("/dashboard/deals?error=deal-number-required");
    try {
      const deal = await createDealWithEvent({
        orgId: nextCtx.dbOrgId,
        dealNumber,
        actorId: nextCtx.dbUserId,
      });
      redirect(`/dashboard/deals/${deal.id}`);
    } catch (error) {
      if (isPrismaUniqueConstraintError(error))
        redirect("/dashboard/deals?error=deal-number-exists");
      redirect("/dashboard/deals?error=create-failed");
    }
  }

  const createError = new Map([
    ["deal-number-required", "Enter a deal number to create a deal."],
    [
      "deal-number-exists",
      "That deal number already exists for the active organization.",
    ],
    ["create-failed", "Unable to create deal right now."],
  ]);

  const deals = await prisma.deal.findMany({
    where: { orgId: ctx.dbOrgId },
    select: {
      id: true,
      dealNumber: true,
      customerRef: true,
      vehicleRef: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // KPI calculations
  const totalDeals = deals.length;
  const reserved = deals.filter((d) => d.status === "RESERVED").length;
  const depositReceived = deals.filter(
    (d) => d.status === "DEPOSIT_RECEIVED",
  ).length;
  const missingDocs = deals.filter(
    (d) => !d.vehicleRef || d.vehicleRef.trim() === "",
  ).length;
  const completed = deals.filter((d) => d.status === "COMPLETED").length;

  const resolvedSearchParams = (await searchParams) ?? {};
  const error = createError.get(resolvedSearchParams.error ?? "");

  return (
    <DealsPageClient
      deals={deals}
      totalDeals={totalDeals}
      reserved={reserved}
      depositReceived={depositReceived}
      missingDocs={missingDocs}
      completed={completed}
      createDeal={createDeal}
      error={error}
    />
  );
}
