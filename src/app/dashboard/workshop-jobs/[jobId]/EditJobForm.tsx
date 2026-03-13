"use client";
import { useState } from "react";

export function EditJobForm({
  job,
  onSave,
  saving,
  error,
}: {
  job: {
    title: string;
    complaint: string | null;
    status: string;
    priority: string;
    source: string;
    customer: {
      fullName: string;
      phone: string;
      email: string;
    };
    vehicle: {
      make: string;
      model: string;
      year: number | null;
      plateNumber: string;
      vin: string;
      color: string;
    };
  };
  onSave: (data: any) => void;
  saving: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState({
    title: job.title,
    complaint: job.complaint || "",
    status: job.status,
    priority: job.priority,
    source: job.source,
    customerFullName: job.customer?.fullName || "",
    customerPhone: job.customer?.phone || "",
    customerEmail: job.customer?.email || "",
    vehicleMake: job.vehicle?.make || "",
    vehicleModel: job.vehicle?.model || "",
    vehicleYear: job.vehicle?.year?.toString() || "",
    vehiclePlateNumber: job.vehicle?.plateNumber || "",
    vehicleVin: job.vehicle?.vin || "",
    vehicleColor: job.vehicle?.color || "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form className="space-y-3 relative" onSubmit={handleSubmit}>
      <div className="flex justify-end gap-2 mb-2">
        <button type="submit" className="btn btn-gold" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() =>
            setForm({
              title: job.title,
              complaint: job.complaint || "",
              status: job.status,
              priority: job.priority,
              source: job.source,
              customerFullName: job.customer?.fullName || "",
              customerPhone: job.customer?.phone || "",
              customerEmail: job.customer?.email || "",
              vehicleMake: job.vehicle?.make || "",
              vehicleModel: job.vehicle?.model || "",
              vehicleYear: job.vehicle?.year?.toString() || "",
              vehiclePlateNumber: job.vehicle?.plateNumber || "",
              vehicleVin: job.vehicle?.vin || "",
              vehicleColor: job.vehicle?.color || "",
            })
          }
          disabled={saving}
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-sm w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Complaint</label>
          <input
            name="complaint"
            value={form.complaint}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input input-sm w-full"
          >
            <option value="NEW_ENQUIRY">New Enquiry</option>
            <option value="BOOKED_IN">Booked In</option>
            <option value="INSPECTION">Inspection</option>
            <option value="ESTIMATE_SENT">Estimate Sent</option>
            <option value="APPROVED">Approved</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="READY_FOR_COLLECTION">Ready for Collection</option>
            <option value="DELIVERED">Delivered</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="input input-sm w-full"
          >
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="input input-sm w-full"
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="CALL">Call</option>
            <option value="WEBSITE">Website</option>
            <option value="WALK_IN">Walk-in</option>
            <option value="GOOGLE">Google</option>
            <option value="INSTAGRAM">Instagram</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Full Name
          </label>
          <input
            name="customerFullName"
            value={form.customerFullName}
            onChange={handleChange}
            className="input input-sm w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Phone
          </label>
          <input
            name="customerPhone"
            value={form.customerPhone}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Email
          </label>
          <input
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Make</label>
          <input
            name="vehicleMake"
            value={form.vehicleMake}
            onChange={handleChange}
            className="input input-sm w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Vehicle Model
          </label>
          <input
            name="vehicleModel"
            value={form.vehicleModel}
            onChange={handleChange}
            className="input input-sm w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Year</label>
          <input
            name="vehicleYear"
            value={form.vehicleYear}
            onChange={handleChange}
            className="input input-sm w-full"
            type="number"
            min="1900"
            max="2100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plate Number</label>
          <input
            name="vehiclePlateNumber"
            value={form.vehiclePlateNumber}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">VIN</label>
          <input
            name="vehicleVin"
            value={form.vehicleVin}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            name="vehicleColor"
            value={form.vehicleColor}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn btn-gold btn-sm" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
