"use client";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  type: string;
  message: string | null;
  createdAt: string;
};

export default function DealTimeline({ dealId }: { dealId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = React.useCallback(async () => {
    const res = await fetch(`/api/deals/${dealId}/events`);
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events || []);
    }
  }, [dealId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/deals/${dealId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setMessage("");
        await fetchEvents();
      } else {
        const data = await res.json();
        setError(data.error || "Unknown error");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddNote} className="flex gap-2">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Add note"
          className="border rounded px-3 py-2 w-64"
          disabled={loading}
        />
        <button className="border rounded px-3 py-2" disabled={loading || !message.trim()}>
          {loading ? "Adding..." : "Add note"}
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="border rounded">
        <div className="p-3 text-sm font-semibold border-b">Timeline</div>
        {events.length === 0 ? (
          <div className="p-3 text-sm opacity-80">No events yet.</div>
        ) : (
          events.map(ev => (
            <div key={ev.id} className="p-3 text-sm border-b">
              <div className="font-semibold">{ev.type}</div>
              <div>{ev.message}</div>
              <div className="text-xs opacity-60">{new Date(ev.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}