"use client";
import React from "react";

const STATUS_OPTIONS = [
  { value: "NEW_ENQUIRY", label: "New Enquiry" },
  { value: "BOOKED_IN", label: "Booked In" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "ESTIMATE_SENT", label: "Estimate Sent" },
  { value: "APPROVED", label: "Approved" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "READY_FOR_COLLECTION", label: "Ready for Collection" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function StatusChanger({
  jobId,
  currentStatus,
  onStatusChanged,
}: {
  jobId: string;
  currentStatus: string;
  onStatusChanged?: () => void;
}) {
  const [status, setStatus] = React.useState(currentStatus);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  async function changeStatus(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/workshop-jobs/${jobId}/status`, {
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
      setSuccess("Status updated");
      onStatusChanged?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={changeStatus}
    >
      <label
        className="flex min-w-0 flex-1 flex-col gap-1 text-sm"
        htmlFor="job-status-select"
      >
        <span className="font-medium">Job status</span>
        <select
          id="job-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
          className="input input-sm"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn-xs btn-gold" disabled={loading}>
        {loading ? "Saving..." : "Update Status"}
      </button>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      {success && <div className="text-green-500 text-xs">{success}</div>}
    </form>
  );
}
