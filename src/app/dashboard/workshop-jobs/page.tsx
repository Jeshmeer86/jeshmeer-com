import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

const STATUS_LABELS: Record<string, string> = {
  NEW_ENQUIRY: "New Enquiry",
  BOOKED_IN: "Booked In",
  INSPECTION: "Inspection",
  ESTIMATE_SENT: "Estimate Sent",
  APPROVED: "Approved",
  IN_PROGRESS: "In Progress",
  READY_FOR_COLLECTION: "Ready for Collection",
  DELIVERED: "Delivered",
  ON_HOLD: "On Hold",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  NEW_ENQUIRY: "bg-zinc-800 text-zinc-200 border-zinc-700",
  BOOKED_IN: "bg-blue-900/80 text-blue-100 border-blue-700",
  INSPECTION: "bg-cyan-900/80 text-cyan-100 border-cyan-700",
  ESTIMATE_SENT: "bg-yellow-900/80 text-yellow-100 border-yellow-700",
  APPROVED: "bg-emerald-900/80 text-emerald-100 border-emerald-700",
  IN_PROGRESS: "bg-orange-900/80 text-orange-100 border-orange-700",
  READY_FOR_COLLECTION: "bg-purple-900/80 text-purple-100 border-purple-700",
  DELIVERED: "bg-zinc-900/90 text-gold border-gold/70",
  ON_HOLD: "bg-zinc-900/70 text-zinc-400 border-zinc-700",
  CANCELLED: "bg-zinc-900/70 text-zinc-500 border-zinc-700 line-through",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all " +
        (STATUS_COLORS[status] || "bg-zinc-800 text-zinc-200 border-zinc-700")
      }
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default async function WorkshopJobsPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return null;

  // Get filters from searchParams
  const status = searchParams?.status || "";
  const q = (searchParams?.q || "").trim();

  // Build where clause
  const where: any = { orgId: ctx.dbOrgId };
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { customer: { fullName: { contains: q, mode: "insensitive" } } },
      { vehicle: { make: { contains: q, mode: "insensitive" } } },
      { vehicle: { model: { contains: q, mode: "insensitive" } } },
      { vehicle: { plateNumber: { contains: q, mode: "insensitive" } } },
    ];
  }

  const jobs = await prisma.workshopJob.findMany({
    where,
    include: {
      customer: true,
      vehicle: true,
    },
    orderBy: { openedAt: "desc" },
    take: 100,
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 rounded-xl border border-zinc-800 bg-black/70 p-6 shadow-lg">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gold">
            Workshop Jobs
          </h1>
          <p className="text-base text-zinc-300 opacity-80 max-w-xl">
            Track and manage all workshop jobs for your organization.
          </p>
        </div>
        <Link href="/dashboard/workshop-jobs/new" className="btn btn-gold">
          New Job
        </Link>
      </div>
      <form
        className="flex flex-col md:flex-row gap-3 items-end mb-2"
        method="get"
      >
        <div>
          <label className="block text-xs font-medium mb-1">Status</label>
          <select
            name="status"
            defaultValue={status}
            className="input input-sm w-full min-w-[140px]"
          >
            <option value="">All</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Search</label>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Customer, make, model, plate..."
            className="input input-sm w-full min-w-[220px]"
          />
        </div>
        <button type="submit" className="btn btn-xs btn-outline">
          Filter
        </button>
      </form>
      <div className="overflow-x-auto">
        {jobs.length === 0 ? (
          <div className="p-8 text-center text-zinc-400">
            {q || status
              ? "No jobs found for your search/filter."
              : "No workshop jobs yet."}
          </div>
        ) : (
          <table className="min-w-full text-sm border border-zinc-700 rounded-lg">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-3 py-2 text-left">Customer</th>
                <th className="px-3 py-2 text-left">Vehicle</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Priority</th>
                <th className="px-3 py-2 text-left">Opened</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-3 py-2">{job.customer?.fullName}</td>
                  <td className="px-3 py-2">
                    {job.vehicle
                      ? `${job.vehicle.make} ${job.vehicle.model}`
                      : "-"}
                  </td>
                  <td className="px-3 py-2">{job.title}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-3 py-2">{job.priority}</td>
                  <td className="px-3 py-2">
                    {new Date(job.openedAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/dashboard/workshop-jobs/${job.id}`}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
