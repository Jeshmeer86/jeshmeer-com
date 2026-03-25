import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10 bg-bg/30 backdrop-blur">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold tracking-tight">
              {site.name}
            </div>
            <div className="mt-2 text-sm text-muted">
              Custom software development. AI automation. Workflow engineering.
            </div>
            <div className="mt-3 text-sm text-muted">{site.location}</div>
          </div>

          <div>
            <div className="text-sm font-semibold">Pages</div>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-text">
                Home
              </Link>
              <Link href="/ai-automation" className="hover:text-text">
                AI Automation
              </Link>
              <Link href="/products" className="hover:text-text">
                Product Suite
              </Link>
              <Link href="/how-we-work" className="hover:text-text">
                How we work
              </Link>
            </div>
            <div className="mt-6 text-sm font-semibold">Legal</div>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/privacy-policy" className="hover:text-text">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-text">
                Cookie Policy
              </Link>
              <Link href="/terms" className="hover:text-text">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 text-sm text-muted">
              Email: <span className="text-text">{site.contactEmail}</span>
            </div>
            <div className="mt-3 text-sm text-muted">
              Number: +97156 87 44 925
            </div>
            <div className="mt-2 text-sm text-muted">{site.pricingNote}</div>
            <div className="mt-4 text-xs text-muted">
              Premium, direct, and software-focused. No agency fluff.
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
