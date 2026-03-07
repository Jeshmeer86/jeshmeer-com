import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";
import { DEAL_DOCUMENT_TYPE_LABELS } from "@/lib/deal-documents";
import { formatDealStatus } from "@/lib/deal-status";
import { NextPage } from "next";
import { notFound } from "next/navigation";

function formatDateTime(value: Date | string) {
  return new Date(value).toLocaleString();
}

export const dynamic = "force-dynamic";

const BRAND_HEADER = `<header style=\"padding:1rem 0;text-align:center;border-bottom:2px solid #222;margin-bottom:2rem;\"><h1 style=\"margin:0;font-size:2rem;letter-spacing:0.1em;color:#1a237e;\">Sovereign Deal Export</h1><div style=\"font-size:1rem;color:#555;\">Confidential - For authorized use only</div></header>`;

export default async function Page({ params }: { params: { dealId: string } }) {
  const { dealId } = params;
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return notFound();

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, orgId: ctx.dbOrgId },
    include: {
      events: { orderBy: { createdAt: "asc" } },
      documents: {
        include: {
          uploader: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!deal) return notFound();

  // Log EXPORT_HTML event
  await prisma.dealEvent.create({
    data: {
      dealId: deal.id,
      orgId: ctx.dbOrgId,
      type: "EXPORT_HTML",
      actorId: ctx.userId,
      message: "Deal HTML export viewed/generated.",
    },
  });

  // Notes (from events)
  const notes = deal.events.filter((e) => e.type === "NOTE");
  // Timeline events
  const timeline = deal.events;
  // Documents metadata
  const documents = deal.documents;

  return (
    <html>
      <head>
        <title>Deal Export - {deal.dealNumber}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>{`
          body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #fff; color: #222; }
          h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; margin-top: 2em; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 2em; }
          th, td { border: 1px solid #ccc; padding: 0.5em; text-align: left; }
          th { background: #f5f5f5; }
          .meta { margin-bottom: 2em; }
          .brand { margin-bottom: 2em; }
          @media print { body { background: #fff; color: #000; } .no-print { display: none; } }
        `}</style>
      </head>
      <body>
        <div
          className="brand"
          dangerouslySetInnerHTML={{ __html: BRAND_HEADER }}
        />
        <section className="meta">
          <h2>Deal Summary</h2>
          <table>
            <tbody>
              <tr>
                <th>Deal Number</th>
                <td>{deal.dealNumber}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{formatDealStatus(deal.status)}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{formatDateTime(deal.createdAt)}</td>
              </tr>
              <tr>
                <th>Updated</th>
                <td>{formatDateTime(deal.updatedAt)}</td>
              </tr>
              <tr>
                <th>Organization</th>
                <td>{deal.orgId}</td>
              </tr>
              <tr>
                <th>Customer Ref</th>
                <td>{deal.customerRef || "-"}</td>
              </tr>
              <tr>
                <th>Vehicle Ref</th>
                <td>{deal.vehicleRef || "-"}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2>Notes</h2>
          {notes.length === 0 ? (
            <div>No notes.</div>
          ) : (
            <ul>
              {notes.map((note) => (
                <li key={note.id} style={{ marginBottom: "1em" }}>
                  <div>
                    <b>{formatDateTime(note.createdAt)}</b> by{" "}
                    {note.actor?.name || note.actor?.email || "Unknown"}
                  </div>
                  <div>{note.message}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2>Documents Metadata</h2>
          {documents.length === 0 ? (
            <div>No documents.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Uploaded</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.originalName}</td>
                    <td>
                      {DEAL_DOCUMENT_TYPE_LABELS[doc.documentType] ||
                        doc.documentType}
                    </td>
                    <td>
                      {doc.uploader?.name ||
                        doc.uploader?.email ||
                        doc.uploadedBy}
                    </td>
                    <td>{formatDateTime(doc.createdAt)}</td>
                    <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <section>
          <h2>Timeline Events</h2>
          {timeline.length === 0 ? (
            <div>No events.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Actor</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((event) => (
                  <tr key={event.id}>
                    <td>{formatDateTime(event.createdAt)}</td>
                    <td>{event.type}</td>
                    <td>
                      {event.actor?.name ||
                        event.actor?.email ||
                        event.actorId ||
                        "-"}
                    </td>
                    <td>{event.message || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <div
          className="no-print"
          style={{ marginTop: "2em", textAlign: "center" }}
        >
          <button
            onClick={() => window.print()}
            style={{
              padding: "0.7em 2em",
              fontSize: "1.1em",
              borderRadius: "4px",
              border: "1px solid #222",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Print
          </button>
        </div>
      </body>
    </html>
  );
}
