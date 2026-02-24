import { Container } from "@/components/Container";
import Image from "next/image";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";

export default function IndustryPage() {
  return (
    <Container>
      <div className="py-10">
        <div className="relative glass borderGlow rounded-2xl overflow-hidden p-8">
          <Image
            src="/sections/property.jpg"
            alt="Luxury Property Solutions"
            width={1200}
            height={600}
            className="absolute inset-0 h-full w-full object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/40 to-transparent" />
          <div className="sparkleGlow" />
          <div className="relative">
            <div className="kicker text-xs font-semibold text-gold">
              Industry
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Luxury Property Solutions
            </h1>
          </div>
        </div>
      </div>

      <Section
        title="Luxury Property Solutions"
        subtitle="Property transactions need controlled holds, verified parties, and traceable approvals. We build portals and workflows that reduce friction while keeping governance tight."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Use cases</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Unit reservation and holding deposit systems</li>
              <li>Buyer and tenant portals with status and document flows</li>
              <li>
                Identity and verification orchestration for serious parties
              </li>
              <li>
                Approval workflows for pricing exceptions and contract steps
              </li>
              <li>
                Record keeping and evidence export for audits and disputes
              </li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">
              AI and Automation everywhere
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>
                AI assisted document extraction and summarisation (IDs, forms,
                disclosures)
              </li>
              <li>
                Automation for appointment booking, reminders, and pipeline
                routing
              </li>
              <li>Risk flags for mismatched details and unusual behaviour</li>
            </ul>
          </div>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
