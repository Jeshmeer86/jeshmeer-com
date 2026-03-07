export const dynamic = "force-dynamic";

// TEMP DEV BYPASS - LOCAL ONLY
const isDevBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "1";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-3 p-4 border-b">
        <div className="font-semibold">Sovereign Dashboard</div>
        <div className="flex items-center gap-3">
          {/* TEMP DEV BYPASS - LOCAL ONLY */}
          {isDevBypass ? (
            <span className="text-xs text-yellow-500 font-mono">
              DEV BYPASS: Playwright Test Org
            </span>
          ) : (
            <>
              <OrganizationSwitcher />
              <UserButton />
            </>
          )}
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
