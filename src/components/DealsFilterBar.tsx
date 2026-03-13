import React from "react";

interface DealsFilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Reserved", value: "RESERVED" },
  { label: "Deposit Received", value: "DEPOSIT_RECEIVED" },
  { label: "Missing Docs", value: "MISSING_DOCS" },
  { label: "Completed", value: "COMPLETED" },
];

export function DealsFilterBar({ value, onChange }: DealsFilterBarProps) {
  return (
    <div className="flex gap-2 py-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={
            "rounded-full px-5 py-1.5 text-xs font-semibold border transition-all " +
            (value === filter.value
              ? "bg-gold text-black border-gold shadow"
              : "bg-zinc-900/70 text-zinc-300 border-zinc-700 hover:bg-zinc-800/90")
          }
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
