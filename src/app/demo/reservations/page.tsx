import Link from "next/link";
import { listReservations } from "@/lib/demo/store";

export default function ReservationsList() {
  const items = listReservations();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">
              Sovereign Demo Concept UI
            </div>
            <h1 className="mt-2 text-3xl font-semibold">Reservations</h1>
            <p className="mt-2 text-white/70">
              Deposit requests, approvals, audit timelines.
            </p>
          </div>

          <Link
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
            href="/demo/reservations/new"
          >
            New Reservation
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 text-xs text-white/60 border-b border-white/10">
            <div className="col-span-3">Reservation</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-3">Vehicle</div>
            <div className="col-span-1">Deposit</div>
            <div className="col-span-2">Approval</div>
          </div>

          {items.map((r) => (
            <Link
              key={r.id}
              href={`/demo/reservations/${r.id}`}
              className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5"
            >
              <div className="col-span-3 font-medium">{r.id}</div>
              <div className="col-span-3 text-white/80">{r.clientName}</div>
              <div className="col-span-3 text-white/80">{r.vehicle}</div>
              <div className="col-span-1 text-white/80">
                {r.deposit.requested ? "Yes" : "No"}
              </div>
              <div className="col-span-2 text-white/80">
                {r.approval.status}
              </div>
            </Link>
          ))}

          {items.length === 0 && (
            <div className="px-4 py-6 text-white/70">No reservations yet.</div>
          )}
        </div>
      </div>
    </main>
  );
}
