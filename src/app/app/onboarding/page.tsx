"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Onboarding() {
  return (
    <div className="min-h-screen px-6 pt-16">
      <div className="glass borderGlow mx-auto max-w-2xl rounded-3xl p-8">
        <div className="kicker text-xs font-semibold text-gold">ONBOARDING</div>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          Select or create your dealership
        </h1>
        <p className="mt-3 text-sm text-muted">
          Create an organization for the dealership. This becomes your tenant
          boundary in Sovereign.
        </p>

        <div className="mt-6">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>

        <p className="mt-6 text-xs text-muted">
          Disclosure: Sovereign is not affiliated with RTA, MOI, or any UAE
          government entity. It operates alongside official transfer processes.
        </p>
      </div>
    </div>
  );
}
