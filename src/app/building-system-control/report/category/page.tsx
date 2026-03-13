import BuildingSystemControlLayout from "../../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../../shared/LanguageToggle";
import { useState } from "react";

const categories = [
  { icon: "💡", label: "Power" },
  { icon: "🚰", label: "Water" },
  { icon: "🛗", label: "Elevator" },
  { icon: "🚪", label: "Access" },
  { icon: "🔥", label: "Fire Safety" },
  { icon: "❄️", label: "A/C" },
  { icon: "🔔", label: "Other" },
];
const urgencies = [
  { icon: "⚡", label: "Urgent" },
  { icon: "⏳", label: "Normal" },
];

export default function ReportCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategory || !selectedUrgency) {
      setError("Please select a category and urgency.");
      return;
    }
    // TODO: Save to context/state and navigate
    window.location.href = "/building-system-control/report/location";
  }

  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <form
        onSubmit={handleNext}
        className="flex flex-col items-center justify-center min-h-screen p-6 gap-8"
      >
        <h2 className="text-2xl font-bold text-center">Report a Problem</h2>
        <div className="w-full max-w-xs">
          <div className="mb-6">
            <div className="mb-2 font-semibold">Select Category</div>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.label}
                  className={`icon-card ${selectedCategory === cat.label ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(cat.label)}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="block mt-2">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2 font-semibold">Urgency</div>
            <div className="flex gap-4">
              {urgencies.map((urg) => (
                <button
                  type="button"
                  key={urg.label}
                  className={`icon-card ${selectedUrgency === urg.label ? "selected" : ""}`}
                  onClick={() => setSelectedUrgency(urg.label)}
                >
                  <span className="text-2xl">{urg.icon}</span>
                  <span className="block mt-2">{urg.label}</span>
                </button>
              ))}
            </div>
          </div>
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
