"use client";
import { useState } from "react";

const PHOTO_TYPES = [
  { value: "INTAKE", label: "Intake" },
  { value: "DAMAGE", label: "Damage" },
  { value: "REPAIR", label: "Repair" },
  { value: "COMPLETION", label: "Completion" },
  { value: "OTHER", label: "Other" },
];

export function PhotoSection({
  jobId,
  photos,
  onPhotoAdded,
}: {
  jobId: string;
  photos: any[];
  onPhotoAdded?: () => void;
}) {
  const [photoType, setPhotoType] = useState("INTAKE");
  const [fileName, setFileName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleAddPhoto(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/workshop-jobs/${jobId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          originalName,
          mimeType: "image/jpeg",
          fileSize: 0,
          photoType,
        }),
      });
      if (!res.ok) {
        let apiError = "Failed to add photo metadata";
        try {
          const data = await res.json();
          apiError = data?.error || apiError;
        } catch {}
        throw new Error(apiError);
      }
      setSuccess("Photo metadata added");
      setFileName("");
      setOriginalName("");
      onPhotoAdded?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-4 mb-4">
        {photos.length === 0 && (
          <li className="text-zinc-500">No photos yet.</li>
        )}
        {photos.map((photo) => (
          <li
            key={photo.id}
            className="w-32 h-32 bg-zinc-800 flex items-center justify-center rounded-lg border border-zinc-700"
          >
            <span className="text-xs text-zinc-400">
              {photo.originalName}
              <br />
              <span className="text-[10px]">{photo.photoType}</span>
            </span>
          </li>
        ))}
      </ul>
      <form
        className="flex flex-col gap-2 md:flex-row md:items-end"
        onSubmit={handleAddPhoto}
      >
        <input
          className="input input-sm"
          placeholder="File name (e.g. photo1.jpg)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
        <input
          className="input input-sm"
          placeholder="Original name (e.g. IMG_1234.jpg)"
          value={originalName}
          onChange={(e) => setOriginalName(e.target.value)}
          required
        />
        <select
          className="input input-sm"
          value={photoType}
          onChange={(e) => setPhotoType(e.target.value)}
        >
          {PHOTO_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-xs btn-gold" disabled={saving}>
          {saving ? "Saving..." : "Add Photo Metadata"}
        </button>
      </form>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      {success && <div className="text-green-500 text-xs">{success}</div>}
      <div className="text-xs text-zinc-400 mt-2">
        Photo upload is scaffolded: only metadata is saved, not the actual file.
      </div>
    </div>
  );
}
