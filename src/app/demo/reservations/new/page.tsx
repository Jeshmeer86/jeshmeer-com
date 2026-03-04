"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReservation() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/demo/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (!res || !res.ok) {
      setStatus("error");
      return;
    }

    const json = await res.json();
    router.push(`/demo/reservations/${json.reservation.id}`);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs text-white/60">Sovereign Demo Concept UI</div>
        <h1 className="mt-2 text-3xl font-semibold">New Reservation</h1>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4"
        >
          <div className="grid gap-2">
            <label className="text-xs text-white/60">Client Name</label>
            <input
              name="clientName"
              required
              className="rounded-xl bg-black/30 border border-white/10 px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs text-white/60">Vehicle</label>
            <input
              name="vehicle"
              required
              className="rounded-xl bg-black/30 border border-white/10 px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs text-white/60">Created By</label>
            <input
              name="createdBy"
              defaultValue="Advisor"
              className="rounded-xl bg-black/30 border border-white/10 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label className="text-xs text-white/60">
                Deposit Amount (optional)
              </label>
              <input
                name="depositAmount"
                inputMode="numeric"
                className="rounded-xl bg-black/30 border border-white/10 px-3 py-2"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs text-white/60">Deposit Currency</label>
              <select
                name="depositCurrency"
                defaultValue="AED"
                className="rounded-xl bg-black/30 border border-white/10 px-3 py-2"
              >
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <button
            disabled={status === "sending"}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-60"
          >
            Create
          </button>

          {status === "error" && (
            <div className="text-sm text-red-300">
              Could not create reservation.
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
