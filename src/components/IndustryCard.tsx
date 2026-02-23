import Link from "next/link";

export function IndustryCard({
  name,
  slug,
  lead,
  primary,
}: {
  name: string;
  slug: string;
  lead: string;
  primary?: boolean;
}) {
  return (
    <div className={"glass borderGlow rounded-2xl p-6 transition hover:translate-y-[-1px]"}>
      <div className={"h-1 w-full rounded-full " + (primary ? "bg-gold" : "bg-line")} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        {primary ? (
          <span className="text-xs font-semibold text-gold">Primary</span>
        ) : (
          <span className="text-xs text-muted">Industry</span>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">{lead}</p>
      <div className="mt-6">
        <Link
          href={`/industries/${slug}`}
          className="text-sm font-semibold text-gold hover:opacity-90"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
