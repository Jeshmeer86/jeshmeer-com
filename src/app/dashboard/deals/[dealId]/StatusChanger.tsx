"use client";
import React from "react";
import { useRouter } from "next/navigation";
import type { DealStatus } from "@prisma/client";
import { DEAL_STATUS_FLOW, DEAL_STATUS_LABELS } from "@/lib/deal-status";

export default function StatusChanger({
  dealId,
  currentStatus,
}: {
  dealId: string;
  currentStatus: DealStatus;
}) {
  const [status, setStatus] = React.useState<DealStatus>(currentStatus);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  async function changeStatus(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/deals/${dealId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        let apiError = "Failed to change status";
        try {
          const data = await res.json();
          apiError = data?.error || apiError;
        } catch {}
        throw new Error(apiError);
      }
      setSuccess(`Status updated to ${DEAL_STATUS_LABELS[status]}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={changeStatus}>
      <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm" htmlFor="deal-status-select">
        <span className="font-medium">Deal status</span>
        <select
          id="deal-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as DealStatus)}
          disabled={loading}
          className="rounded border bg-transparent px-3 py-2"
        >
          {DEAL_STATUS_FLOW.map((nextStatus) => (
            <option key={nextStatus} value={nextStatus}>
              {DEAL_STATUS_LABELS[nextStatus]}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={loading || status === currentStatus}
        className="rounded border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Update status"}
      </button>
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
      {success ? <span className="text-xs text-green-500">{success}</span> : null}
    </form>
  );
}
