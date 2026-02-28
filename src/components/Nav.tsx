"use client";

import Link from "next/link";
import { Button } from "./Button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Container } from "./Container";
import { site } from "@/content/site";

const nav = [
  // { href: "/products", label: "Products" }, // Hidden as requested
  { href: "/ai-automation", label: "AI and Automation" },
  { href: "/proof-pack", label: "Proof Pack" },
  { href: "/governance-pack", label: "Governance Pack" },
  // { href: "/industries", label: "Industries" }, // Hidden by default
  { href: "/how-we-work", label: "How we work" },
  // { href: "/security-assurance", label: "Security and Assurance" }, // Hidden as requested
  { href: "/company", label: "Company structure" },
  { href: "/contact", label: "Contact" },
];

// Show industries tab only if showIndustries is true
export function Nav({
  showIndustries = false,
}: { showIndustries?: boolean } = {}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Compose nav items, conditionally including Industries
  const navItems = showIndustries
    ? [
        ...nav.slice(0, 4),
        { href: "/industries", label: "Industries" },
        ...nav.slice(4),
      ]
    : nav;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/25 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-magnetic>
            <Image
              src="/brand/mark.svg"
              alt="Sovereign"
              width={40}
              height={40}
              className="h-10 w-10 rounded-2xl border border-line bg-bg/30 shadow-soft md:hidden"
              priority
            />
            <Image
              src="/brand/logo-full.svg"
              alt="Sovereign Compliance Systems"
              width={160}
              height={40}
              className="hidden h-10 md:block"
              priority
            />
            <div className="leading-tight md:hidden">
              <div className="text-sm font-semibold tracking-tight">
                {site.name}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((i) =>
              i.href === "/contact" ? (
                <Button key={i.href} href={i.href} variant="secondary">
                  {i.label}
                </Button>
              ) : (
                <Link
                  key={i.href}
                  href={i.href}
                  className="text-sm text-muted hover:text-platinum"
                  data-magnetic
                >
                  {i.label}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex items-center px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Open menu"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile nav menu */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-bg/95 flex flex-col p-6 gap-4 animate-fade-in">
            <button
              className="self-end mb-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <svg
                className="h-6 w-6 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {navItems.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-lg font-semibold text-text py-2 px-2 rounded hover:bg-panel/40"
                onClick={() => setMobileNavOpen(false)}
              >
                {i.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
