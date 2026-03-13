import { DealKpiCard } from "@/components/DealKpiCard";
import EventActions from "./EventActions";
import DocumentsSection from "./DocumentsSection";
import StatusChanger from "./StatusChanger";
import DealTimeline from "./timeline";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDealStatus } from "@/lib/deal-status";
// Demo detail data for screenshot flagship (Mercedes G63)

const demoDeals = {
  "2": {
    dealNumber: "SO-1002",
    customerRef: "Sophia Laurent",
    vehicleRef: "Mercedes-Benz G63 AMG Night Edition",
    status: "COMPLETED" as import("@prisma/client").DealStatus,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    deposits: [{ amount: 1000000, currency: "AED" }],
    documents: [
      {
        id: "doc1",
        fileName: "passport-sophia.pdf",
        originalName: "Sophia_Laurent_Passport.pdf",
        mimeType: "application/pdf",
        fileSize: 204800,
        documentType:
          "ID_DOCUMENT" as import("@/lib/deal-documents").DealDocumentTypeValue,
        documentTypeLabel: "ID Document",
        uploadedBy: "Sophia Laurent",
        uploadedByDisplay: "Sophia Laurent",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
      },
      {
        id: "doc2",
        fileName: "g63-reservation.pdf",
        originalName: "G63_Reservation_Form.pdf",
        mimeType: "application/pdf",
        fileSize: 102400,
        documentType:
          "RESERVATION_FORM" as import("@/lib/deal-documents").DealDocumentTypeValue,
        documentTypeLabel: "Reservation Form",
        uploadedBy: "Sales Admin",
        uploadedByDisplay: "Sales Admin",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      },
    ],
    events: [
      {
        id: "e1",
        type: "DEAL_CREATED",
        actorId: "admin",
        message: "Deal created for Mercedes G63",
        payload: {},
        createdAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 10,
        ).toISOString(),
        actor: { name: "Sales Admin" },
      },
      {
        id: "e2",
        type: "DOCUMENT_UPLOADED",
        actorId: "sophia",
        message: "ID Document uploaded",
        payload: {},
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        actor: { name: "Sophia Laurent" },
      },
      {
        id: "e3",
        type: "DOCUMENT_UPLOADED",
        actorId: "admin",
        message: "Reservation form uploaded",
        payload: {},
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        actor: { name: "Sales Admin" },
      },
      {
        id: "e4",
        type: "STATUS_CHANGED",
        actorId: "admin",
        message: "Status changed to COMPLETED",
        payload: { previousStatus: "DEPOSIT_RECEIVED", newStatus: "COMPLETED" },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        actor: { name: "Sales Admin" },
      },
      {
        id: "e5",
        type: "NOTE",
        actorId: "admin",
        message: "Client requested expedited delivery.",
        payload: {},
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        actor: { name: "Sales Admin" },
      },
    ],
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;
  // Only show demo for flagship deal
  const deal = demoDeals[dealId as keyof typeof demoDeals];
  if (!deal) return notFound();

  const customerName = deal.customerRef;
  const vehicleRef = deal.vehicleRef;
  const depositTotal =
    deal.deposits?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
  const depositCurrency = deal.deposits?.[0]?.currency || "AED";
  const assignedOwner = "Not assigned";
  const initialDocuments = deal.documents;
  const timelineEvents = deal.events;

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 space-y-8 bg-gradient-to-br from-zinc-950 to-zinc-900 min-h-screen text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="text-lg font-bold tracking-tight text-gold-400 uppercase mb-1">
            {customerName}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-white">
              Deal #{deal.dealNumber}
            </span>
            <span
              className="inline-flex rounded-full border border-gold-400 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 shadow"
              data-testid="deal-current-status"
            >
              {formatDealStatus(deal.status)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusChanger dealId={dealId} currentStatus={deal.status} />
          <button
            className="rounded bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm font-semibold hover:bg-zinc-700 transition"
            onClick={() => {
              document.getElementById("deal-note-input")?.focus();
            }}
          >
            Add Note
          </button>
          <a
            className="rounded bg-gold-400 text-black px-4 py-2 text-sm font-semibold border border-gold-400 hover:bg-gold-300 transition"
            href={`/api/deals/${dealId}/export`}
            target="_blank"
            rel="noreferrer"
          >
            Export Evidence
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DealKpiCard title="Customer" value={customerName} />
        <DealKpiCard title="Vehicle" value={vehicleRef} />
        <DealKpiCard
          title="Deposit/Payment"
          value={`${depositTotal.toLocaleString()} ${depositCurrency}`}
        />
        <DealKpiCard title="Owner/Staff" value={assignedOwner} />
      </div>

      {/* Timeline & Documents & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 rounded-xl bg-zinc-950/80 border border-zinc-800 shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-2 text-gold-300">Timeline</h2>
          <DealTimeline events={timelineEvents} />
        </div>
        {/* Documents */}
        <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-2 text-gold-300">
            Documents
          </h2>
          <DocumentsSection
            dealId={dealId}
            initialDocuments={initialDocuments}
          />
        </div>
      </div>

      {/* Notes/Activity */}
      <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-2 text-gold-300">
          Notes & Activity
        </h2>
        <EventActions dealId={dealId} />
      </div>
    </section>
  );
}
