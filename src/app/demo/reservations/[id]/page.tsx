import Link from "next/link";
import { getReservation } from "@/lib/demo/store";
import { ActionButtons } from "./ActionButtons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const r = await getReservation(id);

  if (!r) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl text-white/80">Not found.</div>
      </main>
    );
  }

  const money =
    r.deposit?.money?.amount != null && r.deposit?.money?.currency
      ? `${r.deposit.money.amount} ${r.deposit.money.currency}`
      : "N/A";

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">
              Sovereign Demo Concept UI
            </div>
            <h1 className="mt-2 text-3xl font-semibold">{id}</h1>
            <div className="mt-2 text-white/70">{r.clientName}</div>
            <div className="text-white/60 text-sm">{r.vehicle}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
              href="/demo/reservations"
            >
              Back
            </Link>

            <a
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
              href={`/api/demo/reservations/${id}/export`}
            >
              Export Evidence ZIP
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/60">Deposit</div>
            <div className="mt-2 text-lg font-medium">
              {r.deposit.requested ? "Requested" : "Not requested"}
            </div>
            <div className="mt-2 text-sm text-white/70">Amount: {money}</div>
            <div className="text-sm text-white/70">
              Receipt Ref: {r.deposit.receiptRef ?? "N/A"}
            </div>
            <div className="text-sm text-white/70">
              Received: {r.deposit.receivedAt ? "Yes" : "No"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/60">Approval</div>
            <div className="mt-2 text-lg font-medium">{r.approval.status}</div>
            <div className="mt-2 text-sm text-white/70">
              Decided By: {r.approval.decidedBy ?? "N/A"}
            </div>
            <div className="text-sm text-white/70">
              Decided At: {r.approval.decidedAt ?? "N/A"}
            </div>
            <div className="text-sm text-white/70">
              Note: {r.approval.note ?? "N/A"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/60">Attachments</div>
            <div className="mt-2 text-sm text-white/70">placeholder.txt</div>
            <div className="text-xs text-white/50 mt-2">
              Demo placeholder only. Real builds allow uploads, media, IDs,
              signed forms.
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-white/60">
                Audit Timeline (append only)
              </div>
              <div className="text-sm text-white/70 mt-1">
                Every action becomes a record.
              </div>
            </div>

            <ActionButtons id={id} />
          </div>

          <div className="mt-4 space-y-3">
            {r.audit
              .slice()
              .reverse()
              .map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="text-xs text-white/60">{e.ts}</div>
                  <div className="mt-1 text-sm">
                    <span className="text-white/80">{e.actor}</span>
                    <span className="text-white/50"> / </span>
                    <span className="text-white/80">{e.action}</span>
                  </div>
                  <div className="mt-1 text-sm text-white/70">{e.detail}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
