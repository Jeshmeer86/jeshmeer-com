"use client";
import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/content/site";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/ai-automation", label: "AI and Automation" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/security-assurance", label: "Security and Assurance" },
  { href: "/company", label: "Company structure" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/25 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-magnetic>
            <img
              src="/brand/mark.svg"
              alt="Sovereign"
              className="h-10 w-10 rounded-2xl border border-line bg-bg/30 shadow-soft md:hidden"
            />
            <img
              src="/brand/logo-full.svg"
              alt="Sovereign Compliance Systems"
              className="hidden h-10 md:block"
            />
            <div className="leading-tight md:hidden">
              <div className="text-sm font-semibold tracking-tight">
                {site.name}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {nav.slice(0, 2).map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-sm text-muted hover:text-platinum"
                data-magnetic
              >
                {i.label}
              </Link>
            ))}

            <div className="relative">
              <div className="group inline-flex items-center">
                <span className="text-sm font-semibold text-gold hover:opacity-90 cursor-pointer">
                  Industries
                </span>
                <div className="pointer-events-none ml-2 text-xs text-muted">
                  ▾
                </div>

                <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 translate-y-1 rounded-2xl border border-line bg-panel/60 p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href="/industries/luxury-automotive"
                    className="block rounded-xl px-3 py-2 text-sm text-text hover:bg-bg/40"
                    data-magnetic
                  >
                    Luxury Automotive (Primary)
                  </Link>
                  <Link
                    href="/industries/luxury-property"
                    className="block rounded-xl px-3 py-2 text-sm text-text hover:bg-bg/40"
                    data-magnetic
                  >
                    Luxury Property
                  </Link>
                  <Link
                    href="/industries/hospitals-medical-centers"
                    className="block rounded-xl px-3 py-2 text-sm text-text hover:bg-bg/40"
                    data-magnetic
                  >
                    Hospitals and Medical Centers
                  </Link>
                </div>
              </div>
            </div>

            {nav.slice(2).map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={
                  i.href === "/contact"
                    ? "rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold text-text hover:border-gold"
                    : "text-sm text-muted hover:text-platinum"
                }
                data-magnetic
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            data-magnetic
            className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm text-text hover:border-gold md:hidden"
          >
            Contact
          </Link>
        </div>
      </Container>
    </header>
  );
}
