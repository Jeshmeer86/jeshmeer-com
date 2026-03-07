import { NextResponse, type NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { readDealDocumentFile } from "@/lib/deal-documents.server";
import { requireDashboardContext } from "@/lib/tenant";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ dealId: string; documentId: string }> },
) {
  const { dealId, documentId } = await ctx.params;
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
    select: { id: true },
  });
  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  const document = await prisma.dealDocument.findFirst({
    where: {
      id: documentId,
      dealId,
      orgId: context.dbOrgId,
    },
  });
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  try {
    const { buffer } = await readDealDocumentFile(document.storagePath);
    const disposition =
      req.nextUrl.searchParams.get("download") === "1"
        ? "attachment"
        : "inline";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": document.mimeType,
        "Content-Length": String(buffer.byteLength),
        "Cache-Control": "private, no-store",
        "Content-Disposition": `${disposition}; filename*=UTF-8''${encodeURIComponent(document.originalName)}`,
      },
    });
  } catch (error) {
    console.error("Failed to read deal document", error);
    return NextResponse.json(
      { error: "Document file not found" },
      { status: 404 },
    );
  }
}
