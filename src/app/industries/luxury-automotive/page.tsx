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
            src="/sections/auto.jpg"
            alt="Luxury Automotive Solutions"
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
              Luxury Automotive Solutions
            </h1>
          </div>
        </div>
      </div>

      <Section
        title="Luxury Automotive Solutions"
        subtitle="High value vehicle transactions need proof, control, and speed. We build AI and automation driven workflows that protect brand reputation and reduce dispute exposure."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Use cases</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Online reservation and deposit workflows per vehicle</li>
              <li>VIN pages and Vehicle Passport experiences that convert</li>
              <li>Request more media workflows with time stamped logging</li>
              <li>
                Admin approvals and exception handling for high risk cases
              </li>
              <li>Evidence packs for disputes and chargebacks</li>
            </ul>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">
              AI and Automation everywhere
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>AI assisted buyer support and question summarisation</li>
              <li>Anomaly detection on attempts and behaviour patterns</li>
              <li>
                Automation for notifications, status updates, and internal
                routing
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
