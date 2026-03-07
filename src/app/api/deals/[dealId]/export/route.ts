import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";

type ExportDeal = {
  dealNumber: string;
  status: string;
  createdAt: Date;
  orgId: string;
};

type ExportEvent = {
  type: string;
  actorId: string | null;
  message: string | null;
  payload: unknown;
  createdAt: Date;
};

function renderHtmlExport(deal: ExportDeal, events: ExportEvent[]) {
  return `<!DOCTYPE html>
<html><head><title>Deal Export - ${deal.dealNumber}</title>
<style>
body { font-family: sans-serif; background: #f8f8f8; color: #222; }
pre { background: #eee; padding: 8px; border-radius: 4px; }
table { border-collapse: collapse; width: 100%; margin-top: 1em; }
th, td { border: 1px solid #ccc; padding: 6px 10px; }
th { background: #f0f0f0; }
</style>
</head><body>
<h1>Deal Export: ${deal.dealNumber}</h1>
<ul>
  <li><b>Status:</b> ${deal.status}</li>
  <li><b>Created At:</b> ${new Date(deal.createdAt).toLocaleString()}</li>
  <li><b>Org ID:</b> ${deal.orgId}</li>
</ul>
<h2>Timeline Events</h2>
<table>
  <tr><th>Type</th><th>Actor ID</th><th>Message/Payload</th><th>Timestamp</th></tr>
  ${events
    .map(
      (e) => `<tr>
    <td>${e.type}</td>
    <td>${e.actorId || ""}</td>
    <td>${e.message || (e.payload ? `<pre>${JSON.stringify(e.payload, null, 2)}</pre>` : "")}</td>
    <td>${new Date(e.createdAt).toLocaleString()}</td>
  </tr>`,
    )
    .join("")}
</table>
</body></html>`;
}

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
  // Fetch deal, events, notes, and documents
  const deal = await prisma.deal.findFirst({
    where: { id: dealId, orgId: context.dbOrgId },
    include: {
      events: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 });
  }

  // Fetch deal documents metadata
  const documents = await prisma.dealDocument.findMany({
    where: { dealId, orgId: context.dbOrgId },
    select: {
      id: true,
      fileName: true,
      originalName: true,
      mimeType: true,
      fileSize: true,
      documentType: true,
      createdAt: true,
      updatedAt: true,
      uploadedBy: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Notes are events of type NOTE
  const notes = deal.events
    .filter((e) => e.type === "NOTE")
    .map((e) => ({
      id: e.id,
      message: e.message,
      actorId: e.actorId,
      createdAt: e.createdAt,
    }));

  // Timeline events (all events)
  const events = deal.events.map((e) => ({
    type: e.type,
    actorId: e.actorId,
    message: e.message,
    payload: e.payload,
    createdAt: e.createdAt,
  }));

  // Log EXPORT_JSON event
  await prisma.dealEvent.create({
    data: {
      dealId: deal.id,
      orgId: deal.orgId,
      type: "EXPORT_JSON",
      actorId: context.dbUserId ?? undefined,
      message: "Deal exported as JSON",
    },
  });

  const exportData = {
    deal: {
      dealNumber: deal.dealNumber,
      status: deal.status,
      createdAt: deal.createdAt,
      orgId: deal.orgId,
    },
    notes,
    documents,
    timeline: events,
  };
  const url = new URL(req.url);
  if (url.searchParams.get("format") === "html") {
    return new Response(renderHtmlExport(exportData.deal, events), {
      headers: { "Content-Type": "text/html" },
    });
  }
  return NextResponse.json(exportData);
}
