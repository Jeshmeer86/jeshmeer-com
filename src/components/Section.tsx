import { ReactNode } from "react";

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-14">
      <div className="mb-8">
        <div className="kicker text-[10px] font-semibold text-muted">Sovereign</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
      {children}
      <div className="mt-12 hrSoft" />
    </section>
  );
}
