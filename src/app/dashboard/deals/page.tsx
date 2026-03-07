import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDealStatus } from "@/lib/deal-status";
import {
  createDealWithEvent,
  isPrismaUniqueConstraintError,
} from "@/lib/deals";
import { requireDashboardContext } from "@/lib/tenant";

function formatCreatedDate(createdAt: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(createdAt);
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const ctx = await requireDashboardContext();

  if (!ctx.ok && ctx.reason === "SIGN_IN") {
    redirect("/sign-in");
  }

  if (!ctx.ok) {
    redirect("/dashboard");
  }

  async function createDeal(formData: FormData) {
    "use server";

    const nextCtx = await requireDashboardContext();

    if (!nextCtx.ok && nextCtx.reason === "SIGN_IN") {
      redirect("/sign-in");
    }

    if (!nextCtx.ok) {
      redirect("/dashboard");
    }

    const dealNumber = String(formData.get("dealNumber") ?? "").trim();

    if (!dealNumber) {
      redirect("/dashboard/deals?error=deal-number-required");
    }

    try {
      const deal = await createDealWithEvent({
        orgId: nextCtx.dbOrgId,
        dealNumber,
        actorId: nextCtx.dbUserId,
      });

      redirect(`/dashboard/deals/${deal.id}`);
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        redirect("/dashboard/deals?error=deal-number-exists");
      }

      redirect("/dashboard/deals?error=create-failed");
    }
  }

  const createError = new Map([
    ["deal-number-required", "Enter a deal number to create a deal."],
    [
      "deal-number-exists",
      "That deal number already exists for the active organization.",
    ],
    ["create-failed", "Unable to create deal right now."],
  ]);

  const deals = await prisma.deal.findMany({
    where: { orgId: ctx.dbOrgId },
    select: {
      id: true,
      dealNumber: true,
      customerRef: true,
      vehicleRef: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const resolvedSearchParams = (await searchParams) ?? {};
  const error = createError.get(resolvedSearchParams.error ?? "");

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 rounded border p-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Deals</h1>
          <p className="text-sm opacity-70">
            Latest deals for the active organization.
          </p>
        </div>

        <form
          action={createDeal}
          className="flex flex-col gap-2 md:min-w-[340px]"
        >
          <label className="text-sm font-medium" htmlFor="deal-number">
            Deal number
          </label>
          <div className="flex gap-2">
            <input
              id="deal-number"
              name="dealNumber"
              type="text"
              required
              className="min-w-0 flex-1 rounded border bg-transparent px-3 py-2"
              placeholder="e.g. SO-1001"
            />
            <button
              type="submit"
              className="rounded bg-blue-700 px-4 py-2 text-white"
            >
              Create deal
            </button>
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>
      </div>

      {deals.length === 0 ? (
        <div className="rounded border p-4 text-sm opacity-80">
          No deals yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-black/20">
              <tr>
                <th className="px-4 py-3 text-left font-medium">
                  Customer / deal
                </th>
                <th className="px-4 py-3 text-left font-medium">Vehicle</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
                <th className="px-4 py-3 text-left font-medium">Open</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const customerLabel =
                  deal.customerRef?.trim() || deal.dealNumber;
                const showDealNumber =
                  Boolean(deal.customerRef?.trim()) &&
                  deal.customerRef?.trim() !== deal.dealNumber;

                return (
                  <tr key={deal.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{customerLabel}</div>
                      {showDealNumber ? (
                        <div className="text-xs opacity-70">
                          {deal.dealNumber}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {deal.vehicleRef?.trim() || "-"}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {formatDealStatus(deal.status)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {formatCreatedDate(deal.createdAt)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={`/dashboard/deals/${deal.id}`}
                        className="underline"
                      >
                        View deal
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
