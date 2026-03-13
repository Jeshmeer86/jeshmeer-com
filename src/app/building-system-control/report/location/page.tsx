import BuildingSystemControlLayout from "../../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { useState } from "react";

export default function ReportLocationPage() {
  const [location, setLocation] = useState("");
  const [access, setAccess] = useState("");
  const [error, setError] = useState("");

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!location || !access) {
      setError("Please enter location and access details.");
      return;
    }
    // TODO: Save to context/state and navigate
    window.location.href = "/building-system-control/report/media";
  }

  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <form
        onSubmit={handleNext}
        className="flex flex-col items-center justify-center min-h-screen p-6 gap-8"
      >
        <h2 className="text-2xl font-bold text-center">Location & Access</h2>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <input
            type="text"
            className="input-lg"
            placeholder="Location (e.g. Lobby, Parking)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-lg"
            placeholder="Access details (e.g. Door code, Card)"
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            required
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
