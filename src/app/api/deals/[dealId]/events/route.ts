import { NextResponse, type NextRequest } from "next/server";
import type { DealEventType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ dealId: string }> },
) {
  const { dealId } = await ctx.params;
  const context = await requireDashboardContext();

  if (!context.ok) {
    return NextResponse.json(
      {
        error:
          context.reason === "SIGN_IN"
            ? "Unauthorized"
            : "Organization required",
      },
      { status: context.reason === "SIGN_IN" ? 401 : 400 },
    );
  }

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, orgId: context.dbOrgId },
  });

  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  const events = await prisma.dealEvent.findMany({
    where: { dealId, orgId: context.dbOrgId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ events });
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ dealId: string }> },
) {
  const { dealId } = await ctx.params;
  const context = await requireDashboardContext();

  if (!context.ok) {
    return NextResponse.json(
      {
        error:
          context.reason === "SIGN_IN"
            ? "Unauthorized"
            : "Organization required",
      },
      { status: context.reason === "SIGN_IN" ? 401 : 400 },
    );
  }

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, orgId: context.dbOrgId },
  });

  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    message?: string;
    type?: DealEventType;
  } | null;

  let type: DealEventType = "NOTE";

  if (body?.type && typeof body.type === "string") {
    if (
      [
        "NOTE",
        "REVIEWED",
        "DEPOSIT_APPROVED",
        "DEAL_CREATED",
        "DOCUMENT_UPLOADED",
        "EXPORT_JSON",
        "EXPORT_HTML",
        "STATUS_CHANGED",
      ].includes(body.type)
    ) {
      type = body.type as DealEventType;
    }
  }

  const message =
    body?.message?.trim() ||
    (type === "DEPOSIT_APPROVED" ? "Deposit approved" : "");

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const event = await prisma.dealEvent.create({
    data: {
      dealId,
      orgId: deal.orgId, // Use the orgId from the fetched deal as the source of truth
      type,
      message,
      actorId: context.dbUserId ?? undefined,
    },
  });

  return NextResponse.json({ event }, { status: 201 });
}
