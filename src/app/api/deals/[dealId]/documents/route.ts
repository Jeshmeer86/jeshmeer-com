import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";
import {
  DEAL_DOCUMENT_TYPE_LABELS,
  isDealDocumentType,
} from "@/lib/deal-documents";
import {
  persistDealDocumentFile,
  removeDealDocumentFile,
  validateDealDocumentUpload,
} from "@/lib/deal-documents.server";
import { DEAL_EVENT_TYPES } from "@/lib/deal-events";

export const runtime = "nodejs";

async function requireAuthorizedDeal(dealId: string, orgId: string) {
  return prisma.deal.findFirst({
    where: { id: dealId, orgId },
    select: { id: true, orgId: true },
  });
}

export async function GET(
  _req: NextRequest,
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

  const deal = await requireAuthorizedDeal(dealId, context.dbOrgId);
  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  const documents = await prisma.dealDocument.findMany({
    where: { dealId, orgId: context.dbOrgId },
    include: {
      uploader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    documents: documents.map((document) => ({
      id: document.id,
      fileName: document.fileName,
      originalName: document.originalName,
      mimeType: document.mimeType,
      fileSize: document.fileSize,
      documentType: document.documentType,
      documentTypeLabel: DEAL_DOCUMENT_TYPE_LABELS[document.documentType],
      uploadedBy: document.uploadedBy,
      uploadedByDisplay:
        document.uploader?.name ||
        document.uploader?.email ||
        document.uploadedBy,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    })),
  });
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

  const deal = await requireAuthorizedDeal(dealId, context.dbOrgId);
  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  const documentType = formData?.get("documentType");

  const uploadError = validateDealDocumentUpload(file);
  if (uploadError) {
    return NextResponse.json({ error: uploadError }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!isDealDocumentType(documentType)) {
    return NextResponse.json(
      { error: "Valid document type is required" },
      { status: 400 },
    );
  }

  const savedFile = await persistDealDocumentFile({
    file,
    orgId: context.dbOrgId,
    dealId,
  });

  try {
    const document = await prisma.$transaction(async (tx) => {
      const createdDocument = await tx.dealDocument.create({
        data: {
          orgId: context.dbOrgId,
          dealId,
          fileName: savedFile.fileName,
          originalName: file.name,
          mimeType: file.type,
          fileSize: file.size,
          documentType,
          storagePath: savedFile.storagePath,
          uploadedBy: context.dbUserId,
        },
      });

      await tx.dealEvent.createMany({
        data: {
          dealId,
          orgId: context.dbOrgId,
          type: DEAL_EVENT_TYPES.DOCUMENT_UPLOADED,
          message: `Uploaded document: ${file.name}`,
          actorId: context.dbUserId,
          payload: {
            documentId: createdDocument.id,
            fileName: file.name,
            documentType,
          },
        },
      });

      return createdDocument;
    });

    return NextResponse.json(
      {
        document: {
          id: document.id,
          fileName: document.fileName,
          originalName: document.originalName,
          mimeType: document.mimeType,
          fileSize: document.fileSize,
          documentType: document.documentType,
          documentTypeLabel: DEAL_DOCUMENT_TYPE_LABELS[document.documentType],
          uploadedBy: document.uploadedBy,
          uploadedByDisplay: context.userId,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    await removeDealDocumentFile(savedFile.absolutePath);
    console.error("Failed to persist uploaded deal document", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 },
    );
  }
}
