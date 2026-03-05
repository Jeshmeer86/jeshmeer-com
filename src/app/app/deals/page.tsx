import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireDealerContext } from "@/lib/tenant";

export default async function DealsPage() {
  const { dbOrg } = await requireDealerContext();

  const deals = await prisma.deal.findMany({
    where: { orgId: dbOrg.id },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      dealNumber: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="px-6 pt-10 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="glass borderGlow rounded-3xl p-8">
          <div className="kicker text-xs font-semibold text-gold">DEALS</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Dealer deals
          </h1>
          <p className="mt-2 text-sm text-muted">
            Org:{" "}
            <span className="text-white/90 font-semibold">{dbOrg.name}</span>
          </p>
        </div>

        <div className="mt-6 glass borderGlow rounded-3xl p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="kicker text-xs font-semibold text-gold">LIST</div>
              <h2 className="mt-2 text-lg font-semibold text-white">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-muted">
                Select a deal to view the timeline and evidence trail.
              </p>
            </div>

            <Link
              href="/app/deals/new"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              New deal
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {deals.length === 0 ? (
              <p className="text-sm text-muted">No deals yet.</p>
            ) : (
              deals.map((d) => (
                <Link
                  key={d.id}
                  href={`/app/deals/${d.id}`}
                  className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {d.dealNumber || `Deal ${d.id.slice(0, 8)}`}
                      </div>
                      <div className="mt-1 text-xs text-muted">
                        Created: {d.createdAt.toLocaleString()}
                      </div>
                    </div>

                    <div className="text-xs text-muted">
                      Status:{" "}
                      <span className="text-white/90 font-semibold">
                        {d.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <p className="mt-6 text-xs text-muted">
            Next: org scoping RBAC, deals timeline, evidence vault, proof pack
            export, partner distribution.
          </p>
        </div>
      </div>
    </div>
  );
}
