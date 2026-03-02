import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/Card";

const steps = [
  {
    title: "Discovery and risk mapping",
    points: [
      "Goals, constraints, and transaction reality",
      "Threat model and fraud vectors",
      "Evidence and audit requirements",
    ],
  },
  {
    title: "Workflow and governance design",
    points: [
      "Approvals, exceptions, and escalation",
      "Segregation of duties and access control",
      "Record keeping and evidence structure",
    ],
  },
  {
    title: "Build and implementation",
    points: [
      "Portals, admin tools, and transaction flows",
      "Controls, logging, and traceability",
      "Integrations and automation hooks",
    ],
  },
  {
    title: "Assurance and launch",
    points: [
      "Security and logging review",
      "Documentation and trust pack",
      "Operational handover and training",
    ],
  },
];

export default function HowWeWorkPage() {
  return (
    <Container>
      <Section
        title="How we work"
        subtitle="High-end delivery with clear governance, strong controls, and AI driven automation."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <Card key={s.title}>
              <div className="text-sm font-semibold">{s.title}</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <div className="my-10 border-t border-line" />
      <CTA />
      <div className="py-10" />
    </Container>
  );
}
