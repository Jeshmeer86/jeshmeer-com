import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { CTA } from "@/components/CTA";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Proof Pack | Sovereign Compliance Systems",
  description:
    "Screenshots from a demo build showing audit trails, evidence exports, deposit receipts, workflow controls, and a dealership deposit flow timeline.",
};

type Shot = {
  src: string;
  title: string;
  purpose: string;
  benefit: string;
};

const LAST_UPDATED = "01 March 2026";

const shots: Shot[] = [
  {
    src: "/proof-pack/proofpack-01-dashboard.png",
    title: "Reservation and Deposit Dashboard",
    purpose: "Visibility on reservations, deposits, approvals.",
    benefit: "Faster decisions and fewer disputes.",
  },
  {
    src: "/proof-pack/proofpack-02-redacted-audit-trail.png",
    title: "Redacted Audit Trail",
    purpose: "Every action logged with actor and timestamp.",
    benefit: "Audit ready evidence when disputes happen.",
  },
  {
    src: "/proof-pack/proofpack-03-deposit-receipt.png",
    title: "Deposit Receipt",
    purpose: "Auto generated receipt with traceable IDs.",
    benefit: "Clear proof for customer, finance, and governance.",
  },
  {
    src: "/proof-pack/proofpack-04-evidence-export-report.png",
    title: "Evidence Export Report",
    purpose: "One click export of report plus attachments.",
    benefit: "A complete evidence pack for review.",
  },
  {
    src: "/proof-pack/proofpack-05-workflow-map.png",
    title: "Workflow Map",
    purpose: "Visual flow with control points and evidence capture.",
    benefit: "Teams follow the same process every time.",
  },
  {
    src: "/proof-pack/proofpack-06-example-build-story.png",
    title: "Example Build Story",
    purpose: "Demo build timeline for a dealership deployment.",
    benefit: "Shows delivery speed and scope clearly.",
  },
  {
    src: "/proof-pack/proofpack-07-vehicle-reserve-page.png",
    title: "Vehicle Reserve Page",
    purpose: "Customer reserve flow with rules and secure payment.",
    benefit: "Converts browsers into confirmed buyers.",
  },
  {
    src: "/proof-pack/proofpack-08-identity-verification.png",
    title: "Identity Verification",
    purpose: "Verification checklist with redaction and access logging.",
    benefit: "Higher trust and lower fraud exposure.",
  },
  {
    src: "/proof-pack/proofpack-09-evidence-vault.png",
    title: "Audit Trail and Evidence Vault",
    purpose: "Document storage with permissions and traceability.",
    benefit: "Evidence is centralized and reviewable.",
  },
  {
    src: "/proof-pack/proofpack-10-fraud-controls.png",
    title: "Fraud Controls Layer",
    purpose: "Rules and alerts for high value deposits.",
    benefit: "Protects margin and blocks suspicious patterns.",
  },
];

export default function ProofPackPage() {
  return (
    <Container>
      {/* Hero */}
      <div className="py-10">
        <div className="glass borderGlow rounded-2xl p-8">
          <div className="kicker text-xs font-semibold text-[rgba(200,162,74,0.95)]">
            Proof Pack
          </div>

          <div className="mt-3 text-sm font-semibold text-gold">
            {site.taglineTop}. {site.taglineBottom}.
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            What Sovereign looks like in action
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-muted">
            Demo screenshots showing audit trails, evidence exports, deposit
            receipts, and controlled workflows with redactions applied.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge>Redacted demo</Badge>
            <Badge>Evidence export</Badge>
            <Badge>Workflow controls</Badge>
            <Badge>{site.pricingNote}</Badge>
          </div>

          <p className="mt-6 text-xs text-muted">
            Last updated: <span className="text-text">{LAST_UPDATED}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              Request a private consult
            </Button>
            <Button href="/governance-pack" variant="secondary">
              View Governance Pack
            </Button>
            <Button href="/trust-center" variant="secondary">
              View Trust Center
            </Button>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <Section
        title="Screenshots from a demo build"
        subtitle="A dealership reservation and deposit flow. Each screen shows how control, evidence, and auditability come together."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal>
          {shots.map((s, idx) => (
            <Card key={s.src} className="rounded-3xl overflow-hidden p-0">
              <div className="relative w-full aspect-[16/10] bg-black/30">
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  className="object-cover"
                  priority={idx < 2}
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-text">{s.title}</h3>

                <p className="mt-2 text-sm text-muted">
                  <span className="text-text font-semibold">Purpose:</span>{" "}
                  {s.purpose}
                </p>

                <p className="mt-1 text-sm text-muted">
                  <span className="text-text font-semibold">Benefit:</span>{" "}
                  {s.benefit}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Evidence bundle */}
      <Section
        title="Evidence Export Bundle"
        subtitle="One click export that produces a dispute ready pack with integrity checks."
      >
        <Card className="rounded-3xl p-6" data-reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted">
            {[
              "report.pdf (human readable summary)",
              "audit.json (full machine readable log)",
              "signed agreement (PDF)",
              "verification evidence (PDF)",
              "payment confirmation and receipt (PDF)",
              "hash manifest (integrity proof)",
            ].map((x) => (
              <li
                key={x}
                className="rounded-2xl border border-line bg-bg px-4 py-3"
              >
                <span className="text-gold">●</span>{" "}
                <span className="text-sm text-text">{x}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Build story */}
      <Section
        title="Example build story (demo)"
        subtitle="A 14-day deployment example showing speed, scope, and what gets delivered."
      >
        <Card className="rounded-3xl overflow-hidden p-0" data-reveal>
          <div className="relative w-full aspect-[16/10] bg-black/30">
            <Image
              src="/proof-pack/proofpack-06-example-build-story.png"
              alt="Example build story timeline"
              fill
              className="object-cover"
            />
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <Section
        title="Want this applied to your dealership?"
        subtitle="We build bespoke systems for high value operations with governance, audit trails, and evidence export built in."
      >
        <div className="mt-2 flex flex-col sm:flex-row gap-3" data-reveal>
          <Button href="/contact" variant="primary">
            Request a private consult
          </Button>
          <Button href="/contact" variant="secondary">
            Request a private demo link
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted">{site.pricingNote}.</p>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
