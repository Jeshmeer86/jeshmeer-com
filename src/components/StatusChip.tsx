import { ReactNode } from "react";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-zinc-800 text-zinc-200 border-zinc-700",
  RESERVED: "bg-blue-900/80 text-blue-100 border-blue-700",
  DEPOSIT_RECEIVED: "bg-emerald-900/80 text-emerald-100 border-emerald-700",
  IN_FINANCE: "bg-purple-900/80 text-purple-100 border-purple-700",
  COMPLETED: "bg-zinc-900/90 text-gold border-gold/70",
  CANCELLED: "bg-zinc-900/70 text-zinc-500 border-zinc-700 line-through",
};

export function StatusChip({
  status,
  children,
}: {
  status: string;
  children: ReactNode;
}) {
  const style =
    STATUS_STYLES[status] || "bg-zinc-800 text-zinc-200 border-zinc-700";
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all " +
        style
      }
    >
      {children}
    </span>
  );
}
