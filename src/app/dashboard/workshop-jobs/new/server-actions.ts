"use server";
import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createWorkshopJob(formData: FormData) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return;

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const make = String(formData.get("make") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const year = Number(formData.get("year") ?? "");
  const plateNumber = String(formData.get("plateNumber") ?? "").trim();
  const complaint = String(formData.get("complaint") ?? "").trim();
  const source = String(formData.get("source") ?? "OTHER");
  const priority = String(formData.get("priority") ?? "NORMAL");

  if (!fullName || !make || !model) return;

  // Create or find customer
  let customer = await prisma.customer.findFirst({
    where: { orgId: ctx.dbOrgId, fullName, phone },
  });
  if (!customer) {
    customer = await prisma.customer.create({
      data: { orgId: ctx.dbOrgId, fullName, phone },
    });
  }

  // Create vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      orgId: ctx.dbOrgId,
      customerId: customer.id,
      make,
      model,
      year: isNaN(year) ? undefined : year,
      plateNumber,
    },
  });

  // Create job
  const job = await prisma.workshopJob.create({
    data: {
      orgId: ctx.dbOrgId,
      customerId: customer.id,
      vehicleId: vehicle.id,
      title: `${make} ${model} (${plateNumber || "No Plate"})`,
      complaint,
      source,
      priority,
      createdBy: ctx.dbUserId,
    },
  });

  // Create JOB_CREATED event
  await prisma.workshopJobEvent.create({
    data: {
      jobId: job.id,
      orgId: ctx.dbOrgId,
      eventType: "JOB_CREATED",
      message: `Job created for ${make} ${model} (${plateNumber || "No Plate"})`,
      actor: ctx.dbUserId ?? undefined,
    },
  });

  redirect(`/dashboard/workshop-jobs/${job.id}`);
}
