import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { WorkshopPhotoType } from "@prisma/client";
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
    fileName?: string;
    originalName?: string;
    mimeType?: string;
    fileSize?: number;
    photoType?: string;
  } | null;
  if (!body?.fileName || !body?.originalName || !body?.photoType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const validPhotoTypes = ["INTAKE", "DAMAGE", "REPAIR", "COMPLETION", "OTHER"];
  const photoType =
    body.photoType && validPhotoTypes.includes(body.photoType.toUpperCase())
      ? (body.photoType.toUpperCase() as WorkshopPhotoType)
      : WorkshopPhotoType.OTHER;
  const photo = await prisma.workshopJobPhoto.create({
    data: {
      jobId,
      orgId: context.dbOrgId,
      fileName: body.fileName,
      originalName: body.originalName,
      mimeType: body.mimeType || "image/jpeg",
      fileSize: body.fileSize || 0,
      photoType,
      uploadedBy: context.dbUserId ?? undefined,
    },
  });
  await prisma.workshopJobEvent.create({
    data: {
      jobId,
      orgId: context.dbOrgId,
      eventType: "PHOTO_ADDED",
      message: `Photo metadata added: ${body.originalName}`,
      actor: context.dbUserId ?? undefined,
    },
  });
  return NextResponse.json({ photo }, { status: 201 });
}
