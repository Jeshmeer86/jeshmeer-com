import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";
import { getOrgPlan, canExportEvidence } from "@/lib/plan";
import type { PageProps } from "next";

export default async function DealPage({ params }: PageProps) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return notFound();

  const deal = await prisma.deal.findFirst({
    where: { id: params.dealId, orgId: ctx.dbOrgId },
    include: {
      events: { orderBy: { createdAt: "asc" } },
      deposits: true,
      evidence: true,
      exports: true,
    },
  });

  if (!deal) return notFound();

  const plan = await getOrgPlan(ctx.dbOrgId);
  const exportAllowed = canExportEvidence(plan);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Deal {deal.dealNumber}</h1>
        <p className="text-sm opacity-80">Status: {deal.status}</p>
        <p className="text-sm opacity-80">Plan: {plan}</p>
      </div>

      <div className="border rounded p-4 space-y-2">
        <div className="font-semibold">Evidence export</div>
        {exportAllowed ? (
          <div className="text-sm opacity-80">
            Export is allowed on this plan. Next step is wiring the export
            action.
          </div>
        ) : (
          <div className="text-sm">
            Export is disabled on FREE. Upgrade to PRO or ELITE.
          </div>
        )}
      </div>

      <div className="border rounded">
        <div className="p-3 font-semibold border-b">Timeline</div>
        {deal.events.length === 0 ? (
          <div className="p-3 text-sm opacity-80">No events yet.</div>
        ) : (
          deal.events.map((e) => (
            <div key={e.id} className="p-3 text-sm border-b">
              <div className="font-semibold">{e.type}</div>
              <div className="opacity-80">{e.message ?? ""}</div>
              <div className="opacity-60">
                {new Date(e.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
