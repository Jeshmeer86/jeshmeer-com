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
    <form className="space-y-3" onSubmit={handleSubmit}>
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
        <textarea
          name="complaint"
          value={form.complaint}
          onChange={handleChange}
          className="input input-sm w-full"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
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
        <div className="flex-1">
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
        <div className="flex-1">
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
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn btn-gold btn-sm" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
