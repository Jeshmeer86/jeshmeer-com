"use client";
import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_consent";

type Consent = "accepted" | "rejected" | "custom" | null;

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as Consent;
    // Defer setConsent to avoid cascading renders
    setTimeout(() => setConsent(stored), 0);
    if (!stored) {
      // Defer setOpen to avoid cascading renders
      setTimeout(() => setOpen(true), 0);
    }
  }, []);

  function handleConsent(value: Consent) {
    setConsent(value);
    setOpen(false);
    localStorage.setItem(COOKIE_KEY, value || "");
    // Here you can trigger analytics or cookie logic
  }

  if (!open || consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="m-4 max-w-xl w-full rounded-2xl p-5 shadow-xl bg-white text-gray-900 border border-gray-200">
        <div className="font-semibold mb-2">Cookie Consent</div>
        <div className="text-sm text-gray-700 mb-4">
          We use cookies to enhance your experience. You can accept all, reject
          non-essential, or manage your preferences.
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            onClick={() => handleConsent("accepted")}
          >
            Accept all
          </button>
          <button
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-500"
            onClick={() => handleConsent("rejected")}
          >
            Reject non-essential
          </button>
          <button
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-500"
            onClick={() => handleConsent("custom")}
          >
            Manage preferences
          </button>
        </div>
      </div>
    </div>
  );
}
