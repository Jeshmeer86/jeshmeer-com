"use server";
import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import { WorkshopJobStatus } from "@prisma/client";

export async function updateWorkshopJob(
  jobId: string,
  data: {
    title: string;
    complaint: string;
    status: string;
    priority: string;
    source: string;
    customerFullName: string;
    customerPhone: string;
    customerEmail: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehiclePlateNumber: string;
    vehicleVin: string;
    vehicleColor: string;
  },
) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) throw new Error("Unauthorized");

  // Fetch job with relations
  const job = await prisma.workshopJob.findUnique({
    where: { id: jobId, orgId: ctx.dbOrgId },
    include: {
      customer: true,
      vehicle: true,
    },
  });
  if (!job) throw new Error("Job not found");

  // Compare old vs new values and build per-field change events
  const changeEvents: {
    field: string;
    oldVal: any;
    newVal: any;
    message: string;
  }[] = [];
  function addChange(
    field: string,
    oldVal: any,
    newVal: any,
    label: string,
    showValues = true,
  ) {
    if ((oldVal ?? "") !== (newVal ?? "")) {
      let message = "";
      if (
        showValues &&
        oldVal &&
        newVal &&
        String(oldVal).trim() &&
        String(newVal).trim()
      ) {
        message = `${label} changed from "${oldVal}" to "${newVal}"`;
      } else if (showValues && (!oldVal || String(oldVal).trim() === "")) {
        message = `${label} set to "${newVal}"`;
      } else if (showValues && (!newVal || String(newVal).trim() === "")) {
        message = `${label} cleared`;
      } else {
        message = `${label} updated`;
      }
      changeEvents.push({ field, oldVal, newVal, message });
    }
  }

  addChange("title", job.title, data.title, "Title");
  addChange("complaint", job.complaint, data.complaint, "Complaint", false);
  addChange("priority", job.priority, data.priority, "Priority");
  addChange("source", job.source, data.source, "Source");
  addChange(
    "customerFullName",
    job.customer?.fullName,
    data.customerFullName,
    "Customer name",
  );
  addChange(
    "customerPhone",
    job.customer?.phone,
    data.customerPhone,
    "Customer phone",
  );
  addChange(
    "customerEmail",
    job.customer?.email,
    data.customerEmail,
    "Customer email",
  );
  addChange("vehicleMake", job.vehicle?.make, data.vehicleMake, "Vehicle make");
  addChange(
    "vehicleModel",
    job.vehicle?.model,
    data.vehicleModel,
    "Vehicle model",
  );
  addChange(
    "vehicleYear",
    job.vehicle?.year?.toString() || "",
    data.vehicleYear,
    "Vehicle year",
  );
  addChange(
    "vehiclePlateNumber",
    job.vehicle?.plateNumber,
    data.vehiclePlateNumber,
    "Vehicle plate",
  );
  addChange("vehicleVin", job.vehicle?.vin, data.vehicleVin, "Vehicle VIN");
  addChange(
    "vehicleColor",
    job.vehicle?.color,
    data.vehicleColor,
    "Vehicle color",
  );

  if (changeEvents.length === 0) return; // No meaningful changes

  // Update customer
  await prisma.customer.update({
    where: { id: job.customerId },
    data: {
      fullName: data.customerFullName,
      phone: data.customerPhone,
      email: data.customerEmail,
    },
  });

  // Update vehicle
  await prisma.vehicle.update({
    where: { id: job.vehicleId },
    data: {
      make: data.vehicleMake,
      model: data.vehicleModel,
      year: data.vehicleYear ? parseInt(data.vehicleYear) : null,
      plateNumber: data.vehiclePlateNumber,
      vin: data.vehicleVin,
      color: data.vehicleColor,
    },
  });

  // Update job
  const validStatuses = [
    "NEW_ENQUIRY",
    "BOOKED_IN",
    "INSPECTION",
    "ESTIMATE_SENT",
    "APPROVED",
    "IN_PROGRESS",
    "READY_FOR_COLLECTION",
    "DELIVERED",
    "ON_HOLD",
    "CANCELLED",
  ];
  const statusValue =
    data.status && validStatuses.includes(data.status.toUpperCase())
      ? (data.status.toUpperCase() as WorkshopJobStatus)
      : WorkshopJobStatus.NEW_ENQUIRY;
  await prisma.workshopJob.update({
    where: { id: jobId },
    data: {
      title: data.title,
      complaint: data.complaint,
      status: statusValue,
      priority: data.priority,
      source: data.source,
    },
  });

  // Log one event per changed field
  for (const event of changeEvents) {
    await prisma.workshopJobEvent.create({
      data: {
        orgId: ctx.dbOrgId,
        jobId: jobId,
        eventType: "OTHER",
        message: event.message,
        actor: ctx.dbUserId || null,
      },
    });
  }
}
