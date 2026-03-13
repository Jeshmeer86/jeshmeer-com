"use client";
// ...existing code...
import { createWorkshopJob } from "./server-actions";

import React from "react";

export default function NewWorkshopJobPage() {
  // Duplicate-submit protection
  const [saving, setSaving] = React.useState(false);

  return (
    <section className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">New Workshop Job</h1>
      <form
        action={async (formData) => {
          setSaving(true);
          try {
            await createWorkshopJob(formData);
          } finally {
            setSaving(false);
          }
        }}
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <button
          type="submit"
          className="btn btn-gold w-full mt-4"
          disabled={saving}
        >
          {saving ? "Saving..." : "Create Job"}
        </button>
      </form>
    </section>
  );
}
