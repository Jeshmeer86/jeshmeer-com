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
              Bespoke software. Governance by design. Evidence grade audit
              trails.
            </div>
            <div className="mt-3 text-sm text-muted">{site.location}</div>
          </div>

          <div>
            <div className="text-sm font-semibold">Pages</div>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/products" className="hover:text-text">
                Products
              </Link>
              <Link href="/ai-automation" className="hover:text-text">
                AI and Automation
              </Link>
              <Link
                href="/industries/luxury-automotive"
                className="hover:text-text"
              >
                Luxury Automotive
              </Link>
              <Link
                href="/industries/luxury-property"
                className="hover:text-text"
              >
                Luxury Property
              </Link>
              <Link
                href="/industries/hospitals-medical-centers"
                className="hover:text-text"
              >
                Hospitals and Medical Centers
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 text-sm text-muted">
              Email: <span className="text-text">{site.contactEmail}</span>
            </div>
            <div className="mt-2 text-sm text-muted">{site.pricingNote}</div>
            <div className="mt-4 text-xs text-muted">
              In-house counsel supports governance and documentation within
              client engagements.
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
