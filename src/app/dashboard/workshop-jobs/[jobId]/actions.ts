"use server";
import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";

export async function updateWorkshopJob(
  jobId: string,
  data: {
    title: string;
    complaint: string;
    status: string;
    priority: string;
    source: string;
  },
) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) throw new Error("Unauthorized");

  const job = await prisma.workshopJob.findUnique({
    where: { id: jobId, orgId: ctx.dbOrgId },
  });
  if (!job) throw new Error("Job not found");

  await prisma.workshopJob.update({
    where: { id: jobId },
    data: {
      title: data.title,
      complaint: data.complaint,
      status: data.status,
      priority: data.priority,
      source: data.source,
    },
  });
}
