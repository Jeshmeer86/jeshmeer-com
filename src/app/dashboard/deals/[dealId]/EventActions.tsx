"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventActions({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [approving, setApproving] = useState(false);

  async function submit(type: "NOTE" | "REVIEWED" | "DEPOSIT_APPROVED") {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      let body;
      if (type === "NOTE") {
        body = { message: note, type: "NOTE" };
      } else if (type === "REVIEWED") {
        body = { message: "Marked as reviewed", type: "REVIEWED" };
      } else if (type === "DEPOSIT_APPROVED") {
        setApproving(true);
        body = { message: "Deposit approved", type: "DEPOSIT_APPROVED" };
      }
      const res = await fetch(`/api/deals/${dealId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let apiError = "Failed to add event";
        try {
          const data = await res.json();
          apiError = data?.error || apiError;
        } catch {}
        throw new Error(apiError);
      }
      setSuccess("Event added");
      setNote("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
      setApproving(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="deal-note">
          Note
        </label>
        <textarea
          id="deal-note"
          placeholder="Add a note for this deal"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-24 rounded border bg-transparent px-3 py-2"
          disabled={loading}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={loading || !note.trim()}
          onClick={() => submit("NOTE")}
        >
          {loading ? "Saving..." : "Add note"}
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={loading}
          onClick={() => submit("REVIEWED")}
        >
          Mark reviewed
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={loading || approving}
          onClick={() => submit("DEPOSIT_APPROVED")}
        >
          {approving ? "Approving..." : "Mark deposit approved"}
        </button>
      </div>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      {success && <div className="text-green-500 text-xs">{success}</div>}
    </div>
  );
}
