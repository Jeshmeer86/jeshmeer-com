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
import { Preloader } from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";
import { Card } from "@/components/Card";
import { ProductSuiteSection } from "@/components/ProductSuiteSection";
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

      <div className="px-4 sm:px-6 lg:px-8">
        <main>
          {/* HERO */}
          <Section hideHeader>
            <Container>
              <div ref={heroRef} className="pt-16 pb-0 md:pt-20 md:pb-0">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                  {/* Left */}
                  <div>
                    <div
                      data-hero
                      className="kicker mb-3 text-xs font-semibold tracking-widest text-gold"
                    >
                      DEALERSHIP OPERATIONS PLATFORM
                    </div>

                    <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                      <span className="inline-flex flex-wrap gap-x-2">
                        {site.headline.split(" ").map((w, i) => (
                          <span key={i} data-word className="inline-block">
                            {w}
                          </span>
                        ))}
                      </span>
                    </h1>

                    <p data-hero className="mb-6 max-w-xl text-lg text-muted">
                      Government platforms handle the legal ownership transfer.
                      Sovereign runs the dealership deal layer: reservations,
                      deposits, approvals, finance checkpoints, document
                      capture, staff accountability, audit trails, and an
                      evidence vault.
                    </p>

                    <p data-hero className="mb-7 max-w-xl text-base text-muted">
                      Built for used car deals (cash or finance). When something
                      is questioned, your team generates a complete proof pack
                      in a single click: timeline, receipts, approvals, uploaded
                      documents, and the export bundle.
                    </p>

                    <p data-hero className="mb-7 max-w-xl text-xs text-muted">
                      Disclosure: Sovereign Compliance Systems is not affiliated
                      with RTA, MOI, or any UAE government entity. We operate
                      alongside official transfer processes.
                    </p>

                    <div data-hero className="mb-7 flex flex-wrap gap-3">
                      <Button href="/contact" variant="primary">
                        Request a private consult
                      </Button>
                      <Button href="/products" variant="secondary">
                        View products
                      </Button>
                    </div>

                    <div
                      data-hero
                      className="grid max-w-xl gap-3 sm:grid-cols-3"
                    >
                      <Card className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs font-semibold text-gold">
                          Flow
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          One deal timeline
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          Less chasing, less rework.
                        </div>
                      </Card>

                      <Card className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs font-semibold text-gold">
                          Proof
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          Audit trails + vault
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          Every action recorded.
                        </div>
                      </Card>

                      <Card className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="text-xs font-semibold text-gold">
                          Export
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          One click proof pack
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          Disputes handled fast.
                        </div>
                      </Card>
                    </div>

                    <div data-hero className="mt-7 text-sm text-muted">
                      <span className="text-text font-semibold">
                        {site.pricingNote}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div data-hero>
                    <Card className="relative min-h-[380px] overflow-hidden">
                      {/* subtle glow layer */}
                      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(900px_circle_at_20%_0%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(700px_circle_at_90%_90%,rgba(255,215,0,0.10),transparent_52%)]" />

                      <div className="relative">
                        <div className="kicker mb-2 text-xs font-semibold tracking-widest text-gold">
                          DEAL TIMELINE PREVIEW
                        </div>

                        <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
                          Every action becomes proof
                        </h2>

                        <p className="mb-5 text-base text-muted">
                          Deposits, approvals, documents, and customer
                          confirmations are captured automatically, then
                          exported as a complete proof pack when needed.
                        </p>

                        {/* timeline */}
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="text-sm font-semibold text-white">
                              Deal timeline
                            </div>
                            <div className="text-xs text-muted">
                              Status:{" "}
                              <span className="text-text font-semibold">
                                Reserved
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-3">
                            <li className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    Reservation link sent
                                  </div>
                                  <div className="text-xs text-muted">
                                    Tracked delivery + customer open event
                                  </div>
                                </div>
                              </div>
                              <div className="text-[11px] text-muted">auto</div>
                            </li>

                            <li className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    Deposit received
                                  </div>
                                  <div className="text-xs text-muted">
                                    Receipt generated + payment reference saved
                                  </div>
                                </div>
                              </div>
                              <div className="text-[11px] text-muted">
                                receipt
                              </div>
                            </li>

                            <li className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    Manager approval recorded
                                  </div>
                                  <div className="text-xs text-muted">
                                    Reason note + before/after change log
                                  </div>
                                </div>
                              </div>
                              <div className="text-[11px] text-muted">
                                control
                              </div>
                            </li>

                            <li className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    Delivery checklist signed
                                  </div>
                                  <div className="text-xs text-muted">
                                    Evidence stored with timestamp and identity
                                  </div>
                                </div>
                              </div>
                              <div className="text-[11px] text-muted">
                                signature
                              </div>
                            </li>
                          </ul>
                        </div>

                        {/* footer chips */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-muted">
                            Audit trail
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-muted">
                            Evidence vault
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-muted">
                            Export proof pack
                          </span>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <Button href="/proof-pack" variant="secondary">
                            View proof pack preview
                          </Button>
                          <Button href="/contact" variant="primary">
                            Request a private consult
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* GOV VS SOVEREIGN CLARITY */}
          <Section
            kicker="CLARITY"
            title="Where government transfer ends, Sovereign begins"
            subtitle="Official platforms transfer ownership. Sovereign runs the deal workflow that gets you there with control and proof."
          >
            <Container>
              <div className="grid gap-4 md:grid-cols-2" data-reveal>
                <Card className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <div className="kicker text-xs font-semibold tracking-widest text-gold">
                    OFFICIAL TRANSFER PLATFORMS
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    What government services do
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                    <li>Change registered vehicle ownership</li>
                    <li>
                      Collect official fees and issue registration outputs
                    </li>
                    <li>
                      Require prerequisites (insurance, inspection, clearance)
                    </li>
                    <li>
                      Confirm parties and complete the legal transfer step
                    </li>
                  </ul>

                  <p className="mt-4 text-xs text-muted">
                    This is the final legal step. It is not the dealership deal
                    operating system.
                  </p>
                </Card>

                <Card className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <div className="kicker text-xs font-semibold tracking-widest text-gold">
                    SOVEREIGN DEAL LAYER
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    What dealerships still need
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                    <li>Deposit holds with receipts and approval controls</li>
                    <li>
                      Finance workflow checkpoints (bank docs, status,
                      handovers)
                    </li>
                    <li>Document capture with access logging and redaction</li>
                    <li>Staff accountability: who did what, when, and why</li>
                    <li>Audit timeline + evidence vault</li>
                    <li>One exportable proof pack per deal</li>
                  </ul>

                  <p className="mt-4 text-xs text-muted">
                    This is the dispute-proof, operations layer that makes the
                    transfer step clean and fast.
                  </p>
                </Card>
              </div>

              <div className="mt-4" data-reveal>
                <Card className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <div className="kicker text-xs font-semibold tracking-widest text-gold">
                    GOVERNMENT READY HANDOVER PACK
                  </div>
                  <p className="mt-2 text-sm text-muted max-w-3xl">
                    When the deal is ready for transfer, Sovereign produces a
                    structured handover pack so your team completes the official
                    step with less back-and-forth.
                  </p>

                  <ul className="mt-4 grid gap-2 md:grid-cols-2 text-sm text-muted">
                    {[
                      "Buyer and seller document set (structured)",
                      "Deposit receipts and payment references",
                      "Approvals and decision trail",
                      "Insurance and inspection checklist status",
                      "Finance status checkpoints (if applicable)",
                      "Export bundle with integrity manifest",
                    ].map((x) => (
                      <li
                        key={x}
                        className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3"
                      >
                        <span className="text-gold">●</span>{" "}
                        <span className="text-text">{x}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs text-muted">
                    Disclosure: Sovereign Compliance Systems is not affiliated
                    with RTA, MOI, or any UAE government entity. We operate
                    alongside official transfer processes.
                  </p>
                </Card>
              </div>
            </Container>
          </Section>

          <div className="my-10 border-t border-line" />

          <LiquidGlowSweep id="ps" />
          <ProductSuiteSection />

          <LiquidGlowSweep id="b" />
          <Section
            title="Core Features"
            subtitle="Governance, audit, fraud, and compliance controls"
          >
            <Container>
              <div className="grid gap-6 md:grid-cols-2" data-reveal>
                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    Compliance Workflow Hub{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Core
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    Internal governance workflows that enforce approvals,
                    separation of duties, and accountability by design.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
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
                </Card>

                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    Audit Trail and Evidence Vault{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Core
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    Evidence grade audit trails with time stamped history,
                    versioning, and exportable packs for disputes and audits.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
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
                </Card>

                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    Fraud Controls Layer{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Core
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    Risk scoring, behaviour analysis, velocity thresholds, and
                    case workflows to reduce fraud while protecting conversion.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
                    <li>
                      Reduced fraudulent attempts and card testing style
                      activity
                    </li>
                    <li>
                      Less manual review through automation and AI assisted
                      triage
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
                </Card>

                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    AML and Financial Crime Controls Suite{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Add-on
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    Software workflows for KYC style onboarding, risk based
                    monitoring, alerts, and record keeping to support AML and
                    financial crime controls.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
                    <li>Cleaner onboarding and verification steps</li>
                    <li>Consistent records and review trails</li>
                    <li>
                      Lower exposure through structured monitoring and
                      escalation
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
                </Card>

                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    Security Review and Technology Audit{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Add-on
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    Security oriented review of your system controls, access,
                    logs, and architecture with a documented outcome.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
                    <li>
                      Reduced security risk through a clear review and action
                      plan
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
                </Card>

                <Card>
                  <h3 className="mb-4 text-lg font-bold">
                    Documentation and Trust Pack{" "}
                    <span className="ml-2 text-xs font-semibold text-gold">
                      Add-on
                    </span>
                  </h3>
                  <div className="mb-4 text-base">
                    The governance and documentation layer that makes the system
                    defensible and operationally consistent.
                  </div>
                  <ul className="mb-4 list-disc pl-6 text-sm">
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
                </Card>
              </div>
            </Container>
          </Section>

          <div className="my-10 border-t border-line" />

          <Section
            title="Security and Assurance"
            subtitle="Core and optional review services"
          >
            <Container>
              <div className="grid gap-6 md:grid-cols-2" data-reveal>
                <Card>
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
                      Technology audit services relating to software systems
                      where required
                    </li>
                  </ul>
                </Card>
              </div>
            </Container>
          </Section>

          <div className="my-10 border-t border-line" />

          <LiquidGlowSweep id="c" />
          <Section
            title="UAE Online Compliance, Built In"
            subtitle="Trust Pack Included"
          >
            <Container>
              <Card>
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
                  We implement privacy controls, consent flows, and clear
                  customer terms, then document it as an evidence pack for your
                  records.
                </div>
                <Button href="/trust-center" variant="primary">
                  View Trust Pack
                </Button>
              </Card>
            </Container>
          </Section>

          <div className="my-10 border-t border-line" />

          <LiquidGlowSweep id="d" />
          <Section
            title="What we deliver"
            subtitle="Software and workflow engineering, built with governance, proof, and high-end motion design."
          >
            <Container>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
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
                </Card>
                <Card>
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
                </Card>
              </div>
            </Container>
          </Section>

          <div className="my-10 border-t border-line" />

          <CTA />
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
                    Email:{" "}
                    <span className="text-text">{site.contactEmail}</span>
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
                </Card>
              </div>
            </Container>
          </Section>

          <div className="py-14" />
        </main>
      </div>
    </>
  );
}
