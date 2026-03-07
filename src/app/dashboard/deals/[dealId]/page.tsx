import EventActions from "./EventActions";
import DocumentsSection from "./DocumentsSection";
import StatusChanger from "./StatusChanger";
import DealTimeline from "./timeline";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDealStatus } from "@/lib/deal-status";
import { requireDashboardContext } from "@/lib/tenant";
import { getOrgPlan, canExportEvidence } from "@/lib/plan";
import { DEAL_DOCUMENT_TYPE_LABELS } from "@/lib/deal-documents";

function formatDateTime(value: Date | string) {
  return new Date(value).toLocaleString();
}

export default async function Page({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return notFound();

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, orgId: ctx.dbOrgId },
    include: {
      events: { orderBy: { createdAt: "asc" } },
      documents: {
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
      },
      deposits: true,
      evidence: true,
      exports: true,
    },
  });
  if (!deal) return notFound();

  const plan = await getOrgPlan(ctx.dbOrgId);
  const exportAllowed = canExportEvidence(plan);
  const initialDocuments = deal.documents.map((document) => ({
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
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }));
  const timelineEvents = [...deal.events]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((event) => ({
      id: event.id,
      type: event.type,
      actorId: event.actorId,
      message: event.message,
      payload: event.payload,
      createdAt: event.createdAt.toISOString(),
      actor: event.actor ? {
        name: event.actor.name,
        email: event.actor.email,
        id: event.actor.id,
      } : null,
    }));
  const noteCount = deal.events.filter((event) => event.type === "NOTE").length;

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="rounded border p-4">
        <h1 className="mb-3 text-2xl font-semibold">
          Deal: <span className="text-blue-300">{deal.dealNumber}</span>
        </h1>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <div className="opacity-70">Current status</div>
            <div className="mt-1">
              <span
                data-testid="deal-current-status"
                className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                {formatDealStatus(deal.status)}
              </span>
            </div>
          </div>
          <div>
            <div className="opacity-70">Created</div>
            <div>{formatDateTime(deal.createdAt)}</div>
          </div>
          <div>
            <div className="opacity-70">Updated</div>
            <div>{formatDateTime(deal.updatedAt)}</div>
          </div>
          <div>
            <div className="opacity-70">Organization</div>
            <div className="font-mono text-xs sm:text-sm">{deal.orgId}</div>
          </div>
          <div>
            <div className="opacity-70">Customer reference</div>
            <div>{deal.customerRef?.trim() || "Not set"}</div>
          </div>
          <div>
            <div className="opacity-70">Vehicle reference</div>
            <div>{deal.vehicleRef?.trim() || "Not set"}</div>
          </div>
          <div>
            <div className="opacity-70">Documents</div>
            <div>{deal.documents.length}</div>
          </div>
          <div>
            <div className="opacity-70">Notes</div>
            <div>{noteCount}</div>
          </div>
        </div>
      </div>

      <div className="rounded border p-4 space-y-3">
        <div>
          <h2 className="font-semibold">Status controls</h2>
          <p className="text-sm opacity-70">
            Change the deal status for the active organization.
          </p>
        </div>
        <StatusChanger dealId={deal.id} currentStatus={deal.status} />
      </div>

      <div className="rounded border p-4 space-y-3">
        <div>
          <h2 className="font-semibold">Notes</h2>
          <p className="text-sm opacity-70">
            Add internal notes or mark the deal as reviewed.<br />
            <span className="italic">Notes are shown newest first.</span>
          </p>
        </div>
        <EventActions dealId={deal.id} />
      </div>

      <DocumentsSection dealId={deal.id} initialDocuments={initialDocuments} />

      <div className="rounded border p-4 space-y-3">
        <div>
          <h2 className="font-semibold">Timeline</h2>
          <p className="text-sm opacity-70">
            Full deal activity for this organization.
          </p>
        </div>
        <DealTimeline events={timelineEvents} />
      </div>

      <div className="rounded border p-4 space-y-3">
        <div>
          <h2 className="font-semibold">Export actions</h2>
          <p className="text-sm opacity-70">
            Export this deal when the current plan allows it.
          </p>
        </div>
        {exportAllowed ? (
          <div className="flex flex-wrap gap-2 text-sm">
            <a
              className="rounded border px-3 py-2"
              href={`/api/deals/${deal.id}/export`}
              target="_blank"
              rel="noreferrer"
            >
              Export JSON
            </a>
            <a
              className="rounded border px-3 py-2"
              href={`/api/deals/${deal.id}/export?format=html`}
              target="_blank"
              rel="noreferrer"
            >
              Export HTML
            </a>
          </div>
        ) : (
          <p className="text-sm">Export is disabled on the FREE plan.</p>
        )}
      </div>
    </section>
  );
}
