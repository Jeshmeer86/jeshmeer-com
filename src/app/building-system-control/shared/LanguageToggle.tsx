import { useResidentReport } from "./ResidentReportContext";

export function LanguageToggle() {
  const { state, dispatch } = useResidentReport();
  const lang = state.language;
  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-3 py-1 rounded-full font-semibold ${lang === "en" ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-700"}`}
        onClick={() => dispatch({ type: "SET_LANGUAGE", language: "en" })}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded-full font-semibold ${lang === "ar" ? "bg-blue-600 text-white" : "bg-neutral-200 text-neutral-700"}`}
        onClick={() => dispatch({ type: "SET_LANGUAGE", language: "ar" })}
        aria-label="Switch to Arabic"
      >
        العربية
      </button>
    </div>
  );
}
