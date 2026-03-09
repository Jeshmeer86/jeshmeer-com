import { requireDashboardContext } from "@/lib/tenant";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createWorkshopJob(formData: FormData) {
  "use server";
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

  redirect(`/dashboard/workshop-jobs/${job.id}`);
}

export default function NewWorkshopJobPage() {
  return (
    <section className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">New Workshop Job</h1>
      <form
        action={createWorkshopJob}
        className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Full Name
            </label>
            <input
              name="fullName"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Make
            </label>
            <input
              name="make"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Model
            </label>
            <input
              name="model"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              name="year"
              type="number"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Plate Number
            </label>
            <input name="plateNumber" className="input input-bordered w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Complaint</label>
          <textarea name="complaint" className="input input-bordered w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select name="source" className="input input-bordered w-full">
              <option value="WHATSAPP">WhatsApp</option>
              <option value="CALL">Call</option>
              <option value="WEBSITE">Website</option>
              <option value="WALK_IN">Walk-in</option>
              <option value="GOOGLE">Google</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select name="priority" className="input input-bordered w-full">
              <option value="LOW">Low</option>
              <option value="NORMAL" selected>
                Normal
              </option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-gold w-full mt-4">
          Create Job
        </button>
      </form>
    </section>
  );
}
