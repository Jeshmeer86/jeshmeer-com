import Link from "next/link";
import { Badge } from "./Badge";
import { Product } from "@/content/products";

export function ProductCard({ p }: { p: Product }) {
  const tier =
    p.priceTier === "Flagship"
      ? "Flagship"
      : p.priceTier === "Core"
      ? "Core"
      : "Add-on";

  const topBar =
    p.priceTier === "Flagship"
      ? "bg-[rgba(200,162,74,0.95)]"
      : p.priceTier === "Core"
      ? "bg-line"
      : "bg-line";

  return (
    <div className="glass borderGlow rounded-2xl p-6 transition hover:translate-y-[-1px]">
      <div className={"h-1 w-full rounded-full " + topBar} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
        <Badge>{tier}</Badge>
      </div>

      <p className="mt-3 text-sm text-muted">{p.oneLiner}</p>

      <div className="mt-5">
        <div className="text-xs font-semibold text-muted">Outcomes</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text">
          {p.outcomes.slice(0, 3).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href="/contact"
          className="text-sm font-semibold text-gold hover:opacity-90"
        >
          Request a private consult
        </Link>
        <Link
          href={`/products/${p.slug}`}
          className="text-sm text-muted hover:text-text"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
