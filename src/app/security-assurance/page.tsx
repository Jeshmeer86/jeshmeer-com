import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/Card";

export default function SecurityAssurancePage() {
  return (
    <Container>
      <Section
        title="Security and Assurance"
        subtitle="Controls, access, logs, and evidence by design."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">Core assurance layer</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Role based access control and privilege boundaries</li>
              <li>Audit logs and time stamped actions</li>
              <li>Change control and version history</li>
              <li>Evidence export packs for disputes and audits</li>
              <li>Exception workflows with review notes</li>
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-semibold">
              Optional review services
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Architecture and access review</li>
              <li>Logging and monitoring review</li>
              <li>Secure coding review where required</li>
              <li>
                Technology audit services relating to software systems where
                required
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <div className="my-10 border-t border-line" />
      <CTA />
      <div className="py-10" />
    </Container>
  );
}
