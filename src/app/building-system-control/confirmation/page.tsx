import BuildingSystemControlLayout from "../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../shared/LanguageToggle";

export default function ConfirmationPage() {
  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-8">
        <h2 className="text-2xl font-bold text-center">Submission Complete</h2>
        <div className="w-full max-w-xs flex flex-col gap-4 bg-neutral-100 rounded-xl p-6">
          <div className="mb-2 font-semibold">
            Reference Number: <span className="font-mono">#123456</span>
          </div>
          <div className="mb-2 font-semibold">
            Submitted: <span>2026-03-13 12:00</span>
          </div>
          <div className="mb-2 font-semibold">
            Status: <span className="text-blue-600">Received</span>
          </div>
          <div className="mb-2 font-semibold">Next Step:</div>
          <div className="text-neutral-700">
            Our team will review your report and contact you if needed. Thank
            you!
          </div>
        </div>
        <a
          href="/building-system-control"
          className="btn-primary w-full text-lg py-4 rounded-xl mt-2 text-center"
        >
          Back to Main
        </a>
      </div>
    </BuildingSystemControlLayout>
  );
}
