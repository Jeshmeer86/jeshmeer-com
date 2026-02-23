import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";

export default function CompanyPage() {
  return (
    <Container>
      <Section
        title="Company structure"
        subtitle="Two internal divisions within one company: Technology, and in-house Compliance and Risk."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Technology Division</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Bespoke software development and web applications</li>
              <li>Secure customer portals and hosted platforms</li>
              <li>End to end implementation (requirements, project management, documentation)</li>
              <li>Audit trails and internal governance workflows</li>
              <li>Where required: software code security reviews and technology audit services relating to software systems</li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Compliance and Risk Division (in-house)</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Risk and compliance workflow design</li>
              <li>Internal governance workflow logic</li>
              <li>Documentation and evidence structuring</li>
              <li>Audit readiness thinking built into delivery</li>
            </ul>
            <div className="mt-4 text-xs text-muted">
              In-house counsel supports governance and documentation within client engagements.
              No public legal representation is offered.
            </div>
          </div>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
