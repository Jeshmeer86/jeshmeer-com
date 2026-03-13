"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/deals", label: "Deals" },
  { href: "/dashboard/workshop-jobs", label: "Workshop Jobs" },
  { href: "/dashboard/rentals", label: "Rentals" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 py-4 pr-6 min-w-[180px]">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            "px-3 py-2 rounded text-sm font-medium transition " +
            (pathname?.startsWith(item.href)
              ? "bg-gold/10 text-gold font-bold underline underline-offset-4"
              : "text-zinc-300 hover:bg-zinc-800/40")
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
