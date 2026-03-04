"use client";

export function PrintButton() {
  return (
    <button
      className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
      onClick={() => window.print()}
      type="button"
    >
      Print to PDF
    </button>
  );
}
