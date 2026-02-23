import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { site } from "@/content/site";

export default function AiAutomationPage() {
  return (
    <Container>
      <Section
        title="AI everywhere. Automation everywhere."
        subtitle="AI is not a side feature. It is the first layer of the system. Automation is how we remove manual work and keep operations flowing."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Where AI is used</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>AI assisted triage for suspicious activity and exception queues</li>
              <li>Anomaly detection on behaviour and transaction patterns</li>
              <li>Document extraction and summarisation for forms, disclosures, and records</li>
              <li>Natural language policy to rule translation for controls and monitoring</li>
              <li>Searchable knowledge and evidence retrieval for audits and disputes</li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Where automation is used</div>
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
            Less work. More flow. More proof. Stronger controls. Clean governance.
            {" "}
            {site.pricingNote}.
          </p>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
