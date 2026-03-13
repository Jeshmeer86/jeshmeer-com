import BuildingSystemControlLayout from "../shared/BuildingSystemControlLayout";
import { LanguageToggle } from "../shared/LanguageToggle";

export default function VerifyPage() {
  return (
    <BuildingSystemControlLayout>
      <LanguageToggle />
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Quick Access Verification
        </h2>
        <p className="mb-8 text-center max-w-md">
          Enter your unit or access code to verify your building system access.
        </p>
        <form className="w-full max-w-xs flex flex-col gap-4">
          <input
            type="text"
            placeholder="Unit/Access Code"
            className="input-lg"
            required
          />
          <button type="submit" className="btn-primary text-lg py-4 rounded-xl">
            Verify
          </button>
        </form>
      </div>
    </BuildingSystemControlLayout>
  );
}
