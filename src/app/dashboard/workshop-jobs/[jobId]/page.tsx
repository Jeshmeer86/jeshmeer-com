import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EditJobForm } from "./EditJobForm";
import { updateWorkshopJob } from "./actions";
import { NoteActions } from "./NoteActions";
import { StatusChanger } from "./StatusChanger";
import { PhotoSection } from "./PhotoSection";

export default async function WorkshopJobDetailPage({
  params,
}: {
  params: { jobId: string };
}) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok) return null;

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
  if (!job) return <div className="p-8">Job not found.</div>;

  let error: string | null = null;
  let saving = false;

  async function handleEditJob(formData: any) {
    saving = true;
    try {
      await updateWorkshopJob(job.id, formData);
      // Optionally, you can refresh the page or re-fetch data here
    } catch (e: any) {
      error = e.message || "Failed to update job";
    } finally {
      saving = false;
    }
  }

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 rounded-xl border border-zinc-800 bg-black/70 p-6 shadow-lg">
        <div className="flex-1 space-y-4">
          <EditJobForm
            job={{
              title: job.title,
              complaint: job.complaint,
              status: job.status,
              priority: job.priority,
              source: job.source,
            }}
            onSave={handleEditJob}
            saving={saving}
            error={error}
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
            <ul className="list-disc pl-4 mb-2">
              {job.notes.length === 0 && (
                <li className="text-zinc-500">No notes yet.</li>
              )}
              {job.notes.map((note) => (
                <li key={note.id}>{note.body}</li>
              ))}
            </ul>
            <NoteActions jobId={job.id} />
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="font-semibold mb-2">Timeline</h2>
        <ul className="list-disc pl-4">
          {job.events.length === 0 && (
            <li className="text-zinc-500">No events yet.</li>
          )}
          {job.events.map((event) => (
            <li key={event.id}>
              {event.eventType}: {event.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="font-semibold mb-2">Photos</h2>
        <PhotoSection jobId={job.id} photos={job.photos} />
      </div>
    </section>
  );
}
