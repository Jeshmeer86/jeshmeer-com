import BuildingSystemControlLayout from "../../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { useState } from "react";

export default function ReportMediaPage() {
  const [media, setMedia] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!description) {
      setError("Please add a description.");
      return;
    }
    // TODO: Save to context/state and navigate
    window.location.href = "/building-system-control/report/review";
  }

  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <form
        onSubmit={handleNext}
        className="flex flex-col items-center justify-center min-h-screen p-6 gap-8"
      >
        <h2 className="text-2xl font-bold text-center">Media & Description</h2>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <label className="block">
            <span className="font-semibold mb-2 block">
              Add Photo/Video/Voice Note
            </span>
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              className="input-lg"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
            />
          </label>
          <textarea
            className="input-lg"
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
          {error && (
            <div className="text-red-600 text-center mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="btn-primary w-full text-lg py-4 rounded-xl mt-2"
          >
            Next
          </button>
        </div>
      </form>
    </BuildingSystemControlLayout>
  );
}
