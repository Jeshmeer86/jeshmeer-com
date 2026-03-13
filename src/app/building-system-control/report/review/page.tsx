import BuildingSystemControlLayout from "../../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../../shared/LanguageToggle";

export default function ReportReviewPage() {
  // TODO: Pull values from context/state
  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-8">
        <h2 className="text-2xl font-bold text-center">Review & Submit</h2>
        <div className="w-full max-w-xs flex flex-col gap-4">
          {/* TODO: Show summary of all entered values here */}
          <div className="bg-neutral-100 rounded-xl p-4 mb-4">
            <div className="mb-2 font-semibold">Category:</div>
            <div className="mb-2 font-semibold">Urgency:</div>
            <div className="mb-2 font-semibold">Location:</div>
            <div className="mb-2 font-semibold">Access:</div>
            <div className="mb-2 font-semibold">Description:</div>
            <div className="mb-2 font-semibold">Media:</div>
          </div>
          <button className="btn-primary w-full text-lg py-4 rounded-xl mt-2">
            Submit
          </button>
        </div>
      </div>
    </BuildingSystemControlLayout>
  );
}
