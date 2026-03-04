"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ActionButtons({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function post(action: string) {
    await fetch(`/api/demo/reservations/${id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor: "Manager", action, note: "Demo decision" }),
    });

    startTransition(() => {
      router.refresh();
    });
  }

  const btn =
    "px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-60";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        disabled={isPending}
        className={btn}
        onClick={() => post("mark_deposit_received")}
      >
        Mark Deposit Received
      </button>
      <button
        disabled={isPending}
        className={btn}
        onClick={() => post("approve")}
      >
        Approve
      </button>
      <button
        disabled={isPending}
        className={btn}
        onClick={() => post("override")}
      >
        Override
      </button>
      <button
        disabled={isPending}
        className={btn}
        onClick={() => post("reject")}
      >
        Reject
      </button>
    </div>
  );
}
