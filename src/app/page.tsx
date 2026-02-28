"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/Button";
import { LiquidGlowSweep } from "@/components/LiquidGlowSweep";
import { ContactFormBlock } from "@/components/ContactFormBlock";
import { FeatureStrip } from "@/components/FeatureStrip";
import { Preloader } from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";

import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const hero = heroRef.current;
    const tl = gsap.timeline();

    tl.fromTo(
      hero.querySelectorAll("[data-word]"),
      { y: 22, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      hero.querySelectorAll("[data-hero]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" },
    );

    (gsap.utils.toArray("[data-reveal]") as HTMLElement[]).forEach((el) => {
      gsap.fromTo(
        el,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        },
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Preloader />
      <CookieConsent />

      <main>
        {/* HERO */}
        <div className="border-b border-line">
          <Container>
            <div ref={heroRef} className="py-16 md:py-20">
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                {/* Left */}
                <div>
                  <div
                    data-hero
                    className="kicker text-xs font-semibold text-gold"
                  >
                    {site.taglineTop}. {site.taglineBottom}.
                  </div>

                  <h1 className="mt-4 text-4xl font-bold">{site.headline}</h1>

                  <p data-hero className="mt-5 max-w-xl text-lg text-muted">
                    {site.subhead}
                  </p>

                  <div data-hero className="mt-7 flex flex-wrap gap-3">
                    <Button href="/contact" variant="primary">
                      Request a private consult
                    </Button>
                    <Button href="/products" variant="secondary">
                      View products
                    </Button>
                  </div>

                  <div data-hero className="mt-7 text-sm text-muted">
                    <span className="text-text font-semibold">
                      {site.pricingNote}
                    </span>
                  </div>
                </div>

                {/* Right */}
                <div data-hero>
                  <div className="glass borderGlow relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl p-7 md:p-8">
                    <div>
                      <div className="kicker mb-2 text-xs font-semibold tracking-widest text-gold">
                        CAR DEALERSHIP AND REAL ESTATE SPECIALIST
                      </div>

                      <h2 className="mb-2 text-2xl font-semibold text-white md:text-3xl">
                        Secure online reservations for luxury cars
                      </h2>

                      <div className="mb-4 text-base text-muted">
                        Digital sales systems with compliance built in.
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="mb-1 text-xs font-semibold text-gold">
                            Module
                          </div>
                          <div className="text-sm font-semibold text-white">
                            Reservation and deposits
                          </div>
                          <div className="mt-1 text-xs text-muted">
                            Hold rules, disclosures, receipts, confirmations.
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="mb-1 text-xs font-semibold text-gold">
                            Module
                          </div>
                          <div className="text-sm font-semibold text-white">
                            Fraud controls layer
                          </div>
                          <div className="mt-1 text-xs text-muted">
                            Risk scoring, velocity limits, identity resolution.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3">
                      {/* buttons removed */}
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="mt-10" data-hero>
                <FeatureStrip />
              </div>

              {/*<div className="mt-14 hrSoft" />*/}

              {/*<div className="mt-8" data-hero>
                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {/* optional feature summary cards */}
              {/*</div>

                  <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="text-xs text-muted">
                      Projects from 100,000 AED+. Reputable, branded businesses
                      only.
                    </div>
                    <Button href="/contact" variant="secondary">
                      Schedule a discovery session
                    </Button>
                  </div>
                </div>
              </div>*/}
            </div>
          </Container>
        </div>

        {/* Divider between HERO and BODY */}
        <div className="my-10">
          <LiquidGlowSweep id="b" />
        </div>

        {/* BODY */}
        <Container>
          <div className="py-14" />

          <div className="grid gap-4 md:grid-cols-2" data-reveal>
            {/* Core */}
            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                Compliance Workflow Hub{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Core
                </span>
              </h3>
              <div className="mb-2 text-base">
                Internal governance workflows that enforce approvals, separation
                of duties, and accountability by design.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>Reduced internal risk through controlled processes</li>
                <li>Audit readiness through structured records</li>
                <li>Less error through automation and guided steps</li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>

            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                Audit Trail and Evidence Vault{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Core
                </span>
              </h3>
              <div className="mb-2 text-base">
                Evidence grade audit trails with time stamped history,
                versioning, and exportable packs for disputes and audits.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>Clear proof for disputes and investigations</li>
                <li>Traceable decision making</li>
                <li>Better operational discipline</li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>

            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                Fraud Controls Layer{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Core
                </span>
              </h3>
              <div className="mb-2 text-base">
                Risk scoring, behaviour analysis, velocity thresholds, and case
                workflows to reduce fraud while protecting conversion.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>
                  Reduced fraudulent attempts and card testing style activity
                </li>
                <li>
                  Less manual review through automation and AI assisted triage
                </li>
                <li>
                  Better control of false positives through tuning and
                  monitoring
                </li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>

            {/* Add-ons */}
            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                AML and Financial Crime Controls Suite{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Add-on
                </span>
              </h3>
              <div className="mb-2 text-base">
                Software workflows for KYC style onboarding, risk based
                monitoring, alerts, and record keeping to support AML and
                financial crime controls.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>Cleaner onboarding and verification steps</li>
                <li>Consistent records and review trails</li>
                <li>
                  Lower exposure through structured monitoring and escalation
                </li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>

            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                Security Review and Technology Audit{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Add-on
                </span>
              </h3>
              <div className="mb-2 text-base">
                Security oriented review of your system controls, access, logs,
                and architecture with a documented outcome.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>
                  Reduced security risk through a clear review and action plan
                </li>
                <li>More confidence for leadership and stakeholders</li>
                <li>Better governance around access and change control</li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>

            <div className="glass borderGlow rounded-2xl px-6 pb-2 pt-6">
              <h3 className="mb-2 text-lg font-bold">
                Documentation and Trust Pack{" "}
                <span className="ml-2 text-xs font-semibold text-gold">
                  Add-on
                </span>
              </h3>
              <div className="mb-2 text-base">
                The governance and documentation layer that makes the system
                defensible and operationally consistent.
              </div>
              <ul className="mb-2 list-disc pl-6 text-sm">
                <li>Clear disclosures and acceptance flows</li>
                <li>Stronger internal governance and evidence</li>
                <li>More confidence when disputes happen</li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button href="/contact" variant="primary">
                  Request a private consult
                </Button>
                <Button href="/flagship" variant="secondary">
                  View details
                </Button>
              </div>
            </div>
          </div>

          {/* Security and Assurance */}
          <div className="mt-8" data-reveal>
            <h4 className="mb-2 text-base font-semibold">
              Security and Assurance
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass borderGlow rounded-2xl p-6">
                <div className="text-sm font-semibold">
                  Core assurance layer
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li>Role based access control and privilege boundaries</li>
                  <li>Audit logs and time stamped actions</li>
                  <li>Change control and version history</li>
                  <li>Evidence export packs for disputes and audits</li>
                  <li>Exception workflows with review notes</li>
                </ul>
              </div>

              <div className="glass borderGlow rounded-2xl p-6">
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
              </div>
            </div>
          </div>

          <LiquidGlowSweep id="c" />

          <div data-reveal>
            <Section
              title="UAE Online Compliance, Built In"
              subtitle="Trust Pack Included"
            >
              <ul className="mb-4 list-disc space-y-2 pl-6 text-base">
                <li>
                  Privacy policy framework aligned to UAE PDPL-style
                  transparency expectations
                </li>
                <li>
                  Cookie consent banner + preference controls (essential vs
                  optional)
                </li>
                <li>
                  Terms & Conditions designed for online journeys (forms,
                  bookings, deposits, portals)
                </li>
                <li>
                  Data capture minimization (only collect what is needed) and
                  retention notes
                </li>
                <li>
                  Audit trail options for key user actions (consent,
                  submissions, approvals)
                </li>
                <li>
                  Evidence pack documentation for internal governance and
                  accountability
                </li>
              </ul>

              <div className="mb-4 text-base text-muted">
                Your platform is built to be transparent, defensible, and
                aligned with UAE digital requirements.
                <br />
                We implement privacy controls, consent flows, and clear customer
                terms, then document it as an evidence pack for your records.
              </div>

              <Button href="/trust-center" variant="primary">
                View Trust Pack
              </Button>
            </Section>
          </div>

          <LiquidGlowSweep id="d" />

          <div data-reveal>
            <Section
              title="What we deliver"
              subtitle="Software and workflow engineering, built with governance, proof, and high-end motion design."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass borderGlow rounded-2xl p-6">
                  <div className="text-sm font-semibold">
                    Technology Division
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                    <li>Bespoke software development and web applications</li>
                    <li>Secure customer portals and hosted platforms</li>
                    <li>
                      End to end implementation (requirements, project
                      management, documentation)
                    </li>
                    <li>Audit trails and internal governance workflows</li>
                    <li>
                      Where required: software code security reviews and
                      technology audit services relating to software systems
                    </li>
                    <li>
                      Anti money laundering style workflows (KYC, monitoring,
                      case handling, record keeping)
                    </li>
                    <li>
                      Anti theft and secure operational systems (access control,
                      approvals, inventory controls)
                    </li>
                    <li>
                      Fraud prevention systems (risk scoring, behaviour
                      analysis, velocity controls)
                    </li>
                    <li>Dispute evidence packs and incident workflows</li>
                  </ul>
                </div>

                <div className="glass borderGlow rounded-2xl p-6">
                  <div className="text-sm font-semibold">
                    Compliance and Risk Division (in-house)
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                    <li>Risk and compliance workflow design</li>
                    <li>Internal governance and evidence structure</li>
                    <li>
                      Documentation and trust packs embedded into system flows
                    </li>
                    <li>Audit readiness structure and traceability</li>
                    <li>
                      Contracting workflow logic (acceptance, disclosures,
                      approvals)
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted">
                    In-house counsel supports governance and documentation
                    within client engagements.
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <CTA />

          {/* CONTACT */}
          <Section
            title="Contact"
            subtitle={`${site.pricingNote}. We work with reputable, branded businesses.`}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <ContactFormBlock />

              <div className="glass borderGlow rounded-2xl p-6">
                <div className="text-sm font-semibold">Direct</div>

                <div className="mt-3 text-sm text-muted">
                  Email: <span className="text-text">{site.contactEmail}</span>
                </div>

                <div className="mt-3 text-sm text-muted">
                  Number: +97156 87 44 925
                </div>

                <div className="mt-3 text-sm text-muted">
                  Focus: luxury automotive, luxury property, hospitals and
                  medical centers.
                </div>

                <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                  <div className="text-xs font-semibold text-muted">Note</div>
                  <div className="mt-2 text-xs text-muted">
                    In-house counsel supports governance and documentation
                    within client engagements.
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <div className="py-14" />
        </Container>
      </main>
    </>
  );
}
