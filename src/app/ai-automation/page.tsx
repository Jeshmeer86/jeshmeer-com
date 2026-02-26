import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { site } from "@/content/site";
import Link from "next/link";

export default function AiAutomationPage() {
  return (
    <Container>
      <Section
        title="AI Automation"
        subtitle="AI and automation, engineered for control."
      >
        {/* Hero tagline (small line) */}
        <div className="text-xs text-muted mb-2">
          AI and automation, engineered for control.
        </div>
        {/* Main headline */}
        <h1 className="text-3xl font-bold mb-2">
          Governance, proof, and control.
        </h1>
        {/* Subheadline */}
        <div className="text-lg text-muted mb-4">
          We design and build compliance grade software for high value
          transactions, with audit ready traceability, automated workflows, and
          evidence you can rely on.
        </div>
        {/* Supporting line (small) */}
        <div className="text-xs text-muted mb-6">
          Built for reputable, branded businesses.
        </div>
        {/* Primary CTA buttons */}
        <div className="flex gap-3 mb-2">
          <Link
            href="/contact"
            className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold text-text hover:border-gold"
          >
            Request a private consult
          </Link>
          <Link
            href="/products"
            className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold text-text hover:border-gold"
          >
            View products
          </Link>
        </div>
        {/* Optional micro line under buttons (premium filter) */}
        <div className="text-xs text-muted mt-1">
          Projects from 100,000 AED+.
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Where AI is used</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>
                AI assisted triage for suspicious activity and exception queues
              </li>
              <li>Anomaly detection on behavior and transaction patterns</li>
              <li>
                Document extraction and summarization for forms, disclosures,
                and records
              </li>
              <li>
                Natural language policy to rule translation for controls and
                monitoring
              </li>
              <li>
                Searchable knowledge and evidence retrieval for audits and
                disputes
              </li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">
              Where automation is used
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Workflow routing, approvals, and escalation paths</li>
              <li>Notifications, reminders, and status updates</li>
              <li>Webhooks and integrations with existing systems</li>
              <li>Evidence pack generation and record retention enforcement</li>
              <li>Consistent steps that reduce human error and rework</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-panel p-6 shadow-soft">
          <div className="text-sm font-semibold">Result</div>
          <p className="mt-2 text-sm text-muted">
            Less work. More flow. More proof. Stronger controls. Clean
            governance. {site.pricingNote}.
          </p>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
