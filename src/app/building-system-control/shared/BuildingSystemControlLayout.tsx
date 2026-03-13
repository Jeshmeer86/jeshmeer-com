import React from "react";
import { LanguageToggle } from "./LanguageToggle";

export default function BuildingSystemControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* Top bar for language toggle and branding */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <span className="font-bold text-lg">Building System Control</span>
        <LanguageToggle />
      </div>
      <main>{children}</main>
    </div>
  );
}
