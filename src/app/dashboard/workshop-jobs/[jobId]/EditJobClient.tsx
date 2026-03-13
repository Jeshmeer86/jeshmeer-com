"use client";
import { useState, useTransition } from "react";
import { EditJobForm } from "./EditJobForm";
import { updateWorkshopJob } from "./actions";

export function EditJobClient({ job, jobId }: { job: any; jobId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [saving, startTransition] = useTransition();

  function handleSave(formData: any) {
    setError(null);
    startTransition(async () => {
      try {
        await updateWorkshopJob(jobId, formData);
        // Optionally, you can refresh the page or show a success message
      } catch (e: any) {
        setError(e.message || "Failed to update job");
      }
    });
  }

  return (
    <EditJobForm job={job} onSave={handleSave} saving={saving} error={error} />
  );
}
