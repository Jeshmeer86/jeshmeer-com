import { NextResponse, type NextRequest } from "next/server";
import { changeDealStatusWithEvent } from "@/lib/deals";
import { isDealStatus } from "@/lib/deal-status";
import { requireDashboardContext } from "@/lib/tenant";

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
  const body = (await req.json().catch(() => null)) as {
    status?: string;
  } | null;
  const status = body?.status;
  if (!status) {
    return NextResponse.json({ error: "Status required" }, { status: 400 });
  }

  if (!isDealStatus(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || req.headers.get("x-real-ip");

  const result = await changeDealStatusWithEvent({
    dealId,
    orgId: context.dbOrgId,
    nextStatus: status,
    actorId: context.dbUserId ?? undefined,
    ip,
    userAgent: req.headers.get("user-agent"),
  });

  if (!result) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    changed: result.eventCreated,
    previousStatus: result.previousStatus,
    currentStatus: result.currentStatus,
  });
}
