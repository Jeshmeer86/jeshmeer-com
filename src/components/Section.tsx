import { ReactNode } from "react";

type SectionProps = {
  title?: string;
  subtitle?: string;
  kicker?: string;
  hideHeader?: boolean;
  children: ReactNode;
};

export function Section({
  title,
  subtitle,
  kicker = "Sovereign",
  hideHeader = false,
  children,
}: SectionProps) {
  return (
    <section className="py-14">
      {!hideHeader ? (
        <div className="mb-8">
          {kicker ? (
            <div className="kicker text-[10px] font-semibold text-muted">
              {kicker}
            </div>
          ) : null}

          {title ? (
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm text-muted">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      {children}
      <div className="mt-12 hrSoft" />
    </section>
  );
}
