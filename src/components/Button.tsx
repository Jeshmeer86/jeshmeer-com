import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ href, children, variant = "primary" }: Props) {
  const cls =
    variant === "primary"
      ? "bg-gold text-bg hover:opacity-95"
      : "border border-line bg-bg/40 text-text hover:border-accent";

  return (
    <Link
      href={href}
      data-magnetic
      className={
        "btnSheen inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-soft transition focus:outline-none focus:ring-2 focus:ring-goldSoft " +
        cls
      }
    >
      {children}
    </Link>
  );
}
