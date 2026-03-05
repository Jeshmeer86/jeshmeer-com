"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Deal = {
  id: string;
  dealNumber: string;
  status: string;
  createdAt: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealNumber, setDealNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchDeals() {
    const res = await fetch("/api/deals");
    if (res.ok) {
      const data = await res.json();
      setDeals(data.deals || []);
    }
  }

  useEffect(() => {
    fetchDeals();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealNumber }),
      });
      if (res.ok) {
        setDealNumber("");
        await fetchDeals();
      } else {
        const data = await res.json();
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Deals</h1>
      </div>

      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          name="dealNumber"
          placeholder="Deal number"
          className="border rounded px-3 py-2 w-64"
          value={dealNumber}
          onChange={(e) => setDealNumber(e.target.value)}
          disabled={loading}
        />
        <button
          className="border rounded px-3 py-2"
          disabled={loading || !dealNumber.trim()}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <div className="border rounded">
        <div className="grid grid-cols-4 gap-2 p-3 text-sm font-semibold border-b">
          <div>Deal</div>
          <div>Status</div>
          <div>Created</div>
          <div>Open</div>
        </div>

        {deals.length === 0 ? (
          <div className="p-3 text-sm opacity-80">No deals yet.</div>
        ) : (
          deals.map((d) => (
            <div
              key={d.id}
              className="grid grid-cols-4 gap-2 p-3 text-sm border-b"
            >
              <div>
                <Link className="underline" href={`/dashboard/deals/${d.id}`}>
                  {d.dealNumber}
                </Link>
              </div>
              <div>{d.status}</div>
              <div>{new Date(d.createdAt).toLocaleString()}</div>
              <div>
                <Link className="underline" href={`/dashboard/deals/${d.id}`}>
                  Open
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
