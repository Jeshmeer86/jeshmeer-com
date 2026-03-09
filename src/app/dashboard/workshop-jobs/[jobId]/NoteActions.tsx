"use client";
import { useState } from "react";

export function NoteActions({
  jobId,
  onNoteAdded,
}: {
  jobId: string;
  onNoteAdded?: () => void;
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/workshop-jobs/${jobId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: note }),
      });
      if (!res.ok) {
        let apiError = "Failed to add note";
        try {
          const data = await res.json();
          apiError = data?.error || apiError;
        } catch {}
        throw new Error(apiError);
      }
      setSuccess("Note added");
      setNote("");
      onNoteAdded?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-2" onSubmit={submit}>
      <textarea
        className="input input-sm w-full"
        placeholder="Add a note for this job"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
      {success && <div className="text-green-500 text-xs">{success}</div>}
      <button
        type="submit"
        className="btn btn-xs btn-gold"
        disabled={loading || !note.trim()}
      >
        {loading ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
}
