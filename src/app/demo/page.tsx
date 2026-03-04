import Link from "next/link";

export default function DemoHome() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
          <div className="text-xs text-white/60">Sovereign Demo Concept UI</div>
          <h1 className="mt-2 text-3xl font-semibold">
            Reservation + Deposit Control Layer
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            Demo workflow showing deposit requests, approvals, an append only
            audit timeline, and a one click evidence export pack.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
              href="/demo/reservations"
            >
              Open Reservations
            </Link>
            <Link
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
              href="/demo/admin/approvals"
            >
              Open Approvals Queue
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/50">
            Neutral demo branding. No client logos. Public concept only.
          </div>
        </div>
      </div>
    </main>
  );
}
