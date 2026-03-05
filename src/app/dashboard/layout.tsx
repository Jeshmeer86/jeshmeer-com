export const dynamic = "force-dynamic";
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
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
