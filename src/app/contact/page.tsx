"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { ContactFormBlock } from "@/components/ContactFormBlock";
import { site } from "@/content/site";

export default function ContactPage() {
  return (
    <main>
      <Section
        title="Contact"
        subtitle={`${site.pricingNote}. We work with reputable, branded businesses.`}
      >
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <ContactFormBlock />
            <Card>
              <div className="text-sm font-semibold">Direct</div>
              <div className="mt-3 text-sm text-muted">
                Email: <span className="text-text">{site.contactEmail}</span>
              </div>
              <div className="mt-3 text-sm text-muted">
                Number: +97156 87 44 925
              </div>
              <div className="mt-3 text-sm text-muted">
                Focus: luxury automotive, luxury property, hospitals and medical centers.
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                <div className="text-xs font-semibold text-muted">Note</div>
                <div className="mt-2 text-xs text-muted">
                  In-house counsel supports governance and documentation within client engagements.
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
