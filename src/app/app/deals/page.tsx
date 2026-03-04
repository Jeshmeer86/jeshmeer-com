import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireDealerContext } from "@/lib/tenant";
import { revalidatePath } from "next/cache";

function makeDealNumber() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `DL-${yyyy}${mm}${dd}-${rand}`;
}

export default async function DealsPage() {
  const { dbOrg, dbUser } = await requireDealerContext();

  const deals = await prisma.deal.findMany({
    where: { orgId: dbOrg.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  async function createDealAction() {
    "use server";
    const dealNumber = makeDealNumber();

    const deal = await prisma.deal.create({
      data: {
        orgId: dbOrg.id,
        dealNumber,
        status: "DRAFT",
        events: {
          create: {
            actorId: dbUser.id,
            type: "deal.created",
            message: "Deal created",
            payload: { dealNumber },
          },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        orgId: dbOrg.id,
        actorId: dbUser.id,
        action: "deal.create",
        target: "Deal",
        targetId: deal.id,
        payload: { dealNumber },
      },
    });

    revalidatePath("/app/deals");
  }

  return (
    <div className="px-6 pt-10 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="kicker text-xs font-semibold text-gold">DEALS</div>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Deal timeline workspace
            </h1>
            <p className="mt-2 text-sm text-muted">
              Every action becomes proof. Audit trail and export bundle are
              built-in.
            </p>
          </div>

          <form action={createDealAction}>
            <button className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">
              Create deal
            </button>
          </form>
        </div>

        <div className="mt-6 grid gap-3">
          {deals.length === 0 ? (
            <div className="glass borderGlow rounded-3xl p-8 text-sm text-muted">
              No deals yet. Create your first deal.
            </div>
          ) : (
            deals.map((d) => (
              <Link
                key={d.id}
                href={`/app/deals/${d.id}`}
                className="glass borderGlow rounded-3xl p-6 hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {d.dealNumber}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      Status:{" "}
                      <span className="text-white/90 font-semibold">
                        {d.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted">
                    {new Date(d.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <p className="mt-8 text-xs text-muted">
          Compliance note: Sovereign does not automate government apps or claim
          affiliation. It produces a government-ready handover pack for your
          official transfer step.
        </p>
      </div>
    </div>
  );
}
