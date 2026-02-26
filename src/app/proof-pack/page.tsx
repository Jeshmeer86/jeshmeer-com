import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

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
    purpose: "Every action logged with actor, timestamp, and hash.",
    benefit: "Audit ready evidence when disputes happen.",
  },
  {
    src: "/proof-pack/proofpack-03-deposit-receipt.png",
    title: "Deposit Receipt",
    purpose: "Auto generated receipt with traceable IDs.",
    benefit: "Clear proof for customer, finance, and compliance.",
  },
  {
    src: "/proof-pack/proofpack-04-evidence-export-report.png",
    title: "Evidence Export Report",
    purpose: "One click export of report plus attachments.",
    benefit: "A complete evidence pack for auditors or legal review.",
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
    purpose: "Customer reserve flow with policy rules and secure payment.",
    benefit: "Converts browsers into confirmed buyers.",
  },
  {
    src: "/proof-pack/proofpack-08-identity-verification.png",
    title: "Identity Verification",
    purpose: "KYC checklist with redaction and access logging.",
    benefit: "Higher trust and lower fraud risk.",
  },
  {
    src: "/proof-pack/proofpack-09-evidence-vault.png",
    title: "Audit Trail and Evidence Vault",
    purpose: "Document storage with hashes and permissions.",
    benefit: "Evidence is centralized and traceable.",
  },
  {
    src: "/proof-pack/proofpack-10-fraud-controls.png",
    title: "Fraud Controls Layer",
    purpose: "Rules and alerts for high value deposits.",
    benefit: "Protects margin and blocks suspicious patterns.",
  },
];

function SectionTitle(props: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      {props.eyebrow ? (
        <p className="text-sm tracking-widest uppercase text-emerald-300/80">
          {props.eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
        {props.title}
      </h2>

      {props.desc ? (
        <p className="mt-3 text-white/70 max-w-3xl">{props.desc}</p>
      ) : null}
    </div>
  );
}

export default function ProofPackPage() {
  return (
    <Container>
      <div className="py-10">
        <div className="glass borderGlow rounded-2xl p-8">
          <div className="kicker text-xs font-semibold text-[rgba(200,162,74,0.95)]">
            Proof Pack
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            What Sovereign Compliance Systems looks like in action
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Demo screenshots showing audit trails, evidence exports, deposit
            receipts, and a dealership workflow with redactions applied.
          </p>
        </div>
      </div>

      <Section
        title="Screenshots from a demo build"
        subtitle="A dealership reservation and deposit flow. Each screen shows how control, evidence, and auditability come together."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shots.map((s, idx) => (
            <div
              key={s.src}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
            >
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
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  <span className="text-white/90">Purpose:</span> {s.purpose}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  <span className="text-white/90">Benefit:</span> {s.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Evidence Export Bundle"
        subtitle="One click export that produces a complete dispute ready pack, with integrity checks."
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80">
            {[
              "report.pdf (human readable summary)",
              "audit.json (full machine readable log)",
              "signed agreement (PDF)",
              "identity verification evidence (PDF)",
              "payment confirmation and receipt (PDF)",
              "hash manifest (integrity proof)",
            ].map((x) => (
              <li
                key={x}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <span className="text-amber-300">●</span>{" "}
                <span className="text-sm">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        title="Example build story (demo)"
        subtitle="In 14 days we can deploy a dealer deposit flow that turns online interest into logged, confirmed reservations. Every step is recorded with timestamps, roles, hashes, and redactions."
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="relative w-full aspect-[16/10] bg-black/30">
            <Image
              src="/proof-pack/proofpack-06-example-build-story.png"
              alt="Example build story timeline"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Want to see this applied to your dealership?"
        subtitle="We build bespoke systems for high value operations with governance, audit trails, and evidence export built in."
      >
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black hover:bg-amber-200 transition"
          >
            Book a call
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Request a private demo link
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/55">
          Projects from 100,000 AED+.
        </p>
      </Section>
      <div className="py-10" />
    </Container>
  );
}
