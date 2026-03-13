import { ReactNode } from "react";

interface DealKpiCardProps {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function DealKpiCard({
  title,
  value,
  icon,
  className = "",
}: DealKpiCardProps) {
  return (
    <div
      className={[
        "flex flex-col items-start justify-between gap-2 rounded-xl bg-black/60 border border-zinc-800 px-6 py-5 min-w-[170px] min-h-[90px] shadow-lg",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wide">
        {icon ? <span className="text-lg">{icon}</span> : null}
        {title}
      </div>
      <div className="text-2xl font-bold text-white leading-tight whitespace-nowrap">
        {value}
      </div>
    </div>
  );
}
