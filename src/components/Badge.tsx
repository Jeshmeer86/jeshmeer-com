import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-bg/40 px-3 py-1 text-xs text-muted backdrop-blur">
      {children}
    </span>
  );
}
