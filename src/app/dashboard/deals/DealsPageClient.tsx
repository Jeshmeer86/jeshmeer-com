"use client";
import React, { useState } from "react";
import Link from "next/link";
import { formatDealStatus } from "@/lib/deal-status";
import { DealKpiCard } from "@/components/DealKpiCard";
import { StatusChip } from "@/components/StatusChip";
import { DealsFilterBar } from "@/components/DealsFilterBar";

function formatCreatedDate(createdAt: Date | string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(createdAt));
}

type Deal = {
  id: string;
  dealNumber: string;
  customerRef?: string | null;
  vehicleRef?: string | null;
  status: string;
  createdAt: string | Date;
};

type Props = {
  deals: Deal[];
  totalDeals: number;
  reserved: number;
  depositReceived: number;
  missingDocs: number;
  completed: number;
  createDeal: (formData: FormData) => void;
  error?: string;
};

export default function DealsPageClient({
  deals,
  totalDeals,
  reserved,
  depositReceived,
  missingDocs,
  completed,
  createDeal,
  error,
}: Props) {
  // Inject premium demo deals for screenshot/demo mode
  const demoDeals: Deal[] = [
    {
      id: "1",
      dealNumber: "SO-1001",
      customerRef: "James Carter",
      vehicleRef: "Range Rover Autobiography 2024",
      status: "DEPOSIT_RECEIVED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: "2",
      dealNumber: "SO-1002",
      customerRef: "Sophia Laurent",
      vehicleRef: "Mercedes-Benz G63 AMG Night Edition",
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    },
    {
      id: "3",
      dealNumber: "SO-1003",
      customerRef: "Luca Romano",
      vehicleRef: "Ferrari Purosangue V12",
      status: "CANCELLED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    },
  ];
  // Use demo deals for UI presentation
  let displayDeals = demoDeals;
  const [filter, setFilter] = useState<string>("all");
  let filteredDeals = displayDeals;
  if (filter === "RESERVED")
    filteredDeals = displayDeals.filter((d) => d.status === "RESERVED");
  else if (filter === "DEPOSIT_RECEIVED")
    filteredDeals = displayDeals.filter((d) => d.status === "DEPOSIT_RECEIVED");
  else if (filter === "MISSING_DOCS")
    filteredDeals = displayDeals.filter(
      (d) => !d.vehicleRef || d.vehicleRef.trim() === "",
    );
  else if (filter === "COMPLETED")
    filteredDeals = displayDeals.filter((d) => d.status === "COMPLETED");

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black/70 p-6 md:flex-row md:items-end md:justify-between shadow-lg">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gold">
            Deal Control Center
          </h1>
          <p className="text-base text-zinc-300 opacity-80 max-w-xl">
            Manage reservations, deposits, documents, approvals, and evidence
            exports for your most discerning clients.
          </p>
        </div>
        <form
          action={createDeal}
          className="flex flex-col gap-2 md:min-w-[340px] w-full md:w-auto"
        >
          <label
            className="text-sm font-medium text-zinc-300"
            htmlFor="deal-number"
          >
            Deal number
          </label>
          <div className="flex gap-2">
            <input
              id="deal-number"
              name="dealNumber"
              type="text"
              required
              className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 focus:border-gold focus:ring-2 focus:ring-gold/30"
              placeholder="e.g. SO-1001"
            />
            <button
              type="submit"
              className="rounded-lg bg-gold px-5 py-2 text-black font-semibold shadow hover:opacity-90 transition-all"
              style={{ height: 40 }}
            >
              Create deal
            </button>
          </div>
          {error ? <p className="text-sm text-red-400 mt-1">{error}</p> : null}
        </form>
      </div>

      {/* KPI Cards */}
      <div className="flex flex-wrap gap-4">
        <DealKpiCard title="Total deals" value={totalDeals} />
        <DealKpiCard title="Reserved" value={reserved} />
        <DealKpiCard title="Deposit received" value={depositReceived} />
        <DealKpiCard title="Missing documents" value={missingDocs} />
        <DealKpiCard title="Completed" value={completed} />
      </div>

      {/* Filter Bar (interactive) */}
      <div className="flex justify-between items-center">
        <DealsFilterBar value={filter} onChange={setFilter} />
      </div>

      {/* Deals Table or Empty State */}
      {filteredDeals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl border border-zinc-800 bg-black/60 shadow-inner text-center">
          <h2 className="text-2xl font-bold text-gold mb-2">No deals yet</h2>
          <p className="text-zinc-300 mb-6">
            Start by creating your first deal. All reservations, deposits, and
            documents will appear here for your organization.
          </p>
          <form
            action={createDeal}
            className="flex flex-col gap-2 w-full max-w-xs mx-auto"
          >
            <input
              id="deal-number-empty"
              name="dealNumber"
              type="text"
              required
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 focus:border-gold focus:ring-2 focus:ring-gold/30"
              placeholder="e.g. SO-1001"
            />
            <button
              type="submit"
              className="rounded-lg bg-gold px-5 py-2 text-black font-semibold shadow hover:opacity-90 transition-all"
              style={{ height: 40 }}
            >
              Create deal
            </button>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-black/60 shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="border-b border-zinc-800 bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-zinc-300">
                  Customer / Deal
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-300">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-300">
                  Created
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-300">
                  Open
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => {
                const customerLabel =
                  deal.customerRef?.trim() || deal.dealNumber;
                const showDealNumber =
                  Boolean(deal.customerRef?.trim()) &&
                  deal.customerRef?.trim() !== deal.dealNumber;
                return (
                  <tr
                    key={deal.id}
                    className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-900/40 transition"
                  >
                    <td className="px-4 py-3 align-top min-w-[160px]">
                      <div className="font-medium text-white">
                        {customerLabel}
                      </div>
                      {showDealNumber ? (
                        <div className="text-xs text-zinc-400">
                          {deal.dealNumber}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top min-w-[140px]">
                      {deal.vehicleRef?.trim() ? (
                        <span className="text-white">
                          {deal.vehicleRef.trim()}
                        </span>
                      ) : (
                        <span className="text-zinc-500 italic">
                          No vehicle assigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top min-w-[120px]">
                      <StatusChip status={deal.status}>
                        {formatDealStatus(deal.status)}
                      </StatusChip>
                    </td>
                    <td className="px-4 py-3 align-top min-w-[120px]">
                      <span className="text-zinc-300">
                        {formatCreatedDate(deal.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top min-w-[100px]">
                      <Link
                        href={`/dashboard/deals/${deal.id}`}
                        className="inline-block rounded-lg bg-zinc-800 px-4 py-2 text-gold font-semibold shadow hover:bg-gold hover:text-black transition"
                        style={{ minWidth: 80, textAlign: "center" }}
                      >
                        Open deal
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
