import { OrganizationSwitcher } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { requireDashboardContext } from "@/lib/tenant";

export default async function DashboardHome() {
  const ctx = await requireDashboardContext();

  if (!ctx.ok && ctx.reason === "SIGN_IN") redirect("/sign-in");

  if (!ctx.ok && ctx.reason === "NO_ORG") {
    return (
      <div className="max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Select your Organization</h1>
        <p className="text-sm opacity-80">
          This app is multi-tenant. You must set an active Organization to enter
          the dealership workspace.
        </p>
        <OrganizationSwitcher />
      </div>
    );
  }

  // If authenticated and has org, redirect to deals
  redirect("/dashboard/deals");
}
