import BuildingSystemControlLayout from "./shared/BuildingSystemControlLayout";
import { useResidentReport } from "./shared/ResidentReportContext";

export default function BuildingSystemControlMain() {
  const { dispatch } = useResidentReport();
  function startReport() {
    dispatch({ type: "RESET" });
    dispatch({ type: "SET_STARTED", startedAt: new Date().toISOString() });
  }
  return (
    <BuildingSystemControlLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Building System Control
        </h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Welcome! Residents can quickly verify access or report a problem with
          their building systems.
        </p>
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <a
            href="/building-system-control/verify"
            className="btn-primary text-lg py-6 rounded-xl flex flex-col items-center gap-2"
            onClick={startReport}
          >
            <span role="img" aria-label="shield" className="text-4xl">
              🛡️
            </span>
            Quick Access Verification
          </a>
          <a
            href="/building-system-control/report/category"
            className="btn-primary text-lg py-6 rounded-xl flex flex-col items-center gap-2"
            onClick={startReport}
          >
            <span role="img" aria-label="alert" className="text-4xl">
              🚨
            </span>
            Report a Problem
          </a>
        </div>
      </div>
    </BuildingSystemControlLayout>
  );
}
