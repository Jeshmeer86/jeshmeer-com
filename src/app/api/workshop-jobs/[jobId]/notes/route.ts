import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
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
    body?: string;
  } | null;
  const noteBody = body?.body?.trim();
  if (!noteBody) {
    return NextResponse.json({ error: "Note required" }, { status: 400 });
  }
  const note = await prisma.workshopJobNote.create({
    data: {
      jobId,
      orgId: context.dbOrgId,
      body: noteBody,
      createdBy: context.dbUserId ?? undefined,
    },
  });
  await prisma.workshopJobEvent.create({
    data: {
      jobId,
      orgId: context.dbOrgId,
      eventType: "NOTE_ADDED",
      message: noteBody,
      actor: context.dbUserId ?? undefined,
    },
  });
  return NextResponse.json({ note }, { status: 201 });
}
