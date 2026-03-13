import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EditJobClient } from "./EditJobClient";
import { StatusChanger } from "./StatusChanger";
import { PhotoSection } from "./PhotoSection";
import { NotesSection } from "./NotesSection";
import { notFound } from "next/navigation";

interface WorkshopJobDetailPageProps {
  params: { jobId: string };
}

export default async function WorkshopJobDetailPage({
  params,
}: WorkshopJobDetailPageProps) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) notFound();
  const job = await prisma.workshopJob.findUnique({
    where: { id: params.jobId, orgId: ctx.dbOrgId },
    include: {
      customer: true,
      vehicle: true,
      notes: true,
      events: true,
      photos: true,
    },
  });
  if (!job) notFound();

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 rounded-xl border border-zinc-800 bg-black/70 p-6 shadow-lg">
        <div className="flex-1 space-y-4">
          <EditJobClient
            job={{
              title: job.title,
              complaint: job.complaint,
              status: job.status,
              priority: job.priority,
              source: job.source,
              customer: {
                fullName: job.customer?.fullName || "",
                phone: job.customer?.phone || "",
                email: job.customer?.email || "",
              },
              vehicle: {
                make: job.vehicle?.make || "",
                model: job.vehicle?.model || "",
                year: job.vehicle?.year ?? null,
                plateNumber: job.vehicle?.plateNumber || "",
                vin: job.vehicle?.vin || "",
                color: job.vehicle?.color || "",
              },
            }}
            jobId={job.id}
          />
          <StatusChanger jobId={job.id} currentStatus={job.status} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-zinc-300 text-xs mb-1">
            Opened: {new Date(job.openedAt).toLocaleDateString()}
          </div>
          <Link
            href="/dashboard/workshop-jobs"
            className="btn btn-xs btn-outline"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <h2 className="font-semibold mb-2">Customer Info</h2>
            <div>Name: {job.customer?.fullName}</div>
            <div>Phone: {job.customer?.phone}</div>
            <div>Email: {job.customer?.email}</div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <h2 className="font-semibold mb-2">Vehicle Info</h2>
            <div>Make: {job.vehicle?.make}</div>
            <div>Model: {job.vehicle?.model}</div>
            <div>Year: {job.vehicle?.year}</div>
            <div>Plate: {job.vehicle?.plateNumber}</div>
            <div>VIN: {job.vehicle?.vin}</div>
            <div>Color: {job.vehicle?.color}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <h2 className="font-semibold mb-2">Complaint</h2>
            <div>
              {job.complaint || (
                <span className="text-zinc-500">No complaint provided.</span>
              )}
            </div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <h2 className="font-semibold mb-2">Notes</h2>
            <NotesSection jobId={job.id} notes={job.notes} />
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="font-semibold mb-2">Timeline</h2>
        <ul className="list-disc pl-4">
          {job.events
            .filter((event) =>
              [
                "JOB_CREATED",
                "STATUS_CHANGED",
                "NOTE_ADDED",
                "PHOTO_ADDED",
                "OTHER",
              ].includes(event.eventType),
            )
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((event) => (
              <li key={event.id}>
                <span className="font-semibold">
                  {event.eventType.replace("_", " ")}
                </span>
                {": "}
                {event.message}{" "}
                <span className="text-xs text-zinc-400">
                  (
                  {new Date(event.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  )
                </span>
              </li>
            ))}
          {job.events.filter((event) =>
            [
              "JOB_CREATED",
              "STATUS_CHANGED",
              "NOTE_ADDED",
              "PHOTO_ADDED",
              "OTHER",
            ].includes(event.eventType),
          ).length === 0 && <li className="text-zinc-500">No events yet.</li>}
        </ul>
      </div>
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="font-semibold mb-2">Photos</h2>
        <PhotoSection jobId={job.id} photos={job.photos} />
      </div>
    </section>
  );
}
