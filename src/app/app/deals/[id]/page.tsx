import { prisma } from "@/lib/prisma";
import { requireDealerContext } from "@/lib/tenant";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function DealPage({ params }: Props) {
  const { id } = await params;
  const { dbOrg } = await requireDealerContext();

  const deal = await prisma.deal.findFirst({
    where: { id, orgId: dbOrg.id },
    include: { events: { orderBy: { createdAt: "desc" }, take: 100 } },
  });

  if (!deal) return notFound();

  return (
    <div className="px-6 pt-10 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="glass borderGlow rounded-3xl p-8">
          <div className="kicker text-xs font-semibold text-gold">DEAL</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            {deal.dealNumber}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Status:{" "}
            <span className="text-white/90 font-semibold">{deal.status}</span>
          </p>
        </div>

        <div className="mt-6 glass borderGlow rounded-3xl p-8">
          <div className="kicker text-xs font-semibold text-gold">TIMELINE</div>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Audit-ready event trail
          </h2>

          <div className="mt-5 space-y-3">
            {deal.events.length === 0 ? (
              <p className="text-sm text-muted">No events yet.</p>
            ) : (
              deal.events.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-white">
                      {e.type}
                    </div>
                    <div className="text-xs text-muted">
                      {e.createdAt.toLocaleString()}
                    </div>
                  </div>

                  {e.message ? (
                    <div className="mt-2 text-sm text-muted">{e.message}</div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <p className="mt-6 text-xs text-muted">
            Next: evidence uploads, deposit receipts, approvals, export bundle.
          </p>
        </div>
      </div>
    </div>
  );
}
