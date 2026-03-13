import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { WorkshopJobStatus } from "@prisma/client";
import { requireDashboardContext } from "@/lib/tenant";

export async function POST(req: NextRequest, ctx: any) {
  const { jobId } = ctx.params;
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
  const job = await prisma.workshopJob.findFirst({
    where: { id: jobId, orgId: context.dbOrgId },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  const body = (await req.json().catch(() => null)) as {
    status?: string;
  } | null;
  const status = body?.status;
  if (!status) {
    return NextResponse.json({ error: "Status required" }, { status: 400 });
  }
  const validStatuses = [
    "NEW_ENQUIRY",
    "AWAITING_INSPECTION",
    "ESTIMATE_SENT",
    "CUSTOMER_APPROVED",
    "IN_PROGRESS",
    "READY_FOR_COLLECTION",
    "DELIVERED",
  ];
  const statusValue =
    status && validStatuses.includes(status.toUpperCase())
      ? (status.toUpperCase() as WorkshopJobStatus)
      : WorkshopJobStatus.NEW_ENQUIRY;
  await prisma.workshopJob.update({
    where: { id: jobId },
    data: { status: statusValue },
  });
  await prisma.workshopJobEvent.create({
    data: {
      jobId,
      orgId: context.dbOrgId,
      eventType: "STATUS_CHANGED",
      message: `Status changed to ${status}`,
      actor: context.dbUserId ?? undefined,
    },
  });
  return NextResponse.json({ ok: true });
}
