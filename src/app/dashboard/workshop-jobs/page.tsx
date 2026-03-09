import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function WorkshopJobsPage() {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return null;

  const jobs = await prisma.workshopJob.findMany({
    where: { orgId: ctx.dbOrgId },
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
      <div className="overflow-x-auto">
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
                <td className="px-3 py-2">{job.status}</td>
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
      </div>
    </section>
  );
}
