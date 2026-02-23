import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";

export default function IndustryPage() {
  return (
    <Container>
<div className="py-10">
  <div className="relative glass borderGlow rounded-2xl overflow-hidden p-8">
    <img src="/sections/medical.jpg" alt="Hospitals and Medical Centers" className="absolute inset-0 h-full w-full object-cover opacity-85" />
    <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/40 to-transparent" />
    <div className="sparkleGlow" />
    <div className="relative">
      <div className="kicker text-xs font-semibold text-gold">Industry</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Hospitals and Medical Centers</h1>
    </div>
  </div>
</div>

      <Section title="Hospitals and Medical Centers" subtitle="Medical workflows require safety, traceability, and clean governance. We build portals and controlled workflows that reduce staff load and improve patient flow.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Use cases</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Patient portals for appointments, forms, consent, and status</li>
              <li>Prepayment and deposit workflows for bookings where required</li>
              <li>Controlled approvals for sensitive operational workflows</li>
              <li>Audit trails for key actions, disclosures, and access</li>
              <li>Incident and exception workflows with evidence handling</li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">AI and Automation everywhere</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>AI assisted intake summarisation and routing to the right team</li>
              <li>Automation for reminders, follow ups, and document requests</li>
              <li>Workflow prompts to reduce manual rework and errors</li>
            </ul>
          </div>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
