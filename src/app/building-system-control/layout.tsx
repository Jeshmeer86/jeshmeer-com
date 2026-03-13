import "./shared/ui.css";
import { ResidentReportProvider } from "./shared/ResidentReportContext";

export default function BuildingSystemControlLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResidentReportProvider>{children}</ResidentReportProvider>;
}
