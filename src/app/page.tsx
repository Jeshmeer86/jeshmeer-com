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
              <div ref={heroRef} className="pt-14 pb-4 md:pt-20 md:pb-8">
                <div className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,460px)] md:items-center">
                  {/* Left */}
                  <div>
                    <div
                      data-hero
                      className="kicker mb-3 text-xs font-semibold tracking-widest text-gold"
                    >
                      AUTOMATION WITH ARTIFICIAL INTELLIGENCE
                    </div>

                    <h1 className="mb-4 max-w-[12ch] text-4xl font-bold leading-[0.98] md:text-6xl">
                      <span className="inline-flex flex-wrap gap-x-2">
                        {"Automation with Artificial Intelligence for serious businesses."
                          .split(" ")
                          .map((w, i) => (
                            <span key={i} data-word className="inline-block">
                              {w}
                            </span>
                          ))}
                      </span>
                    </h1>

                    <p
                      data-hero
                      className="mb-6 max-w-xl text-lg leading-8 text-muted"
                    >
                      We design and build AI-powered automation systems that
                      reduce manual work, speed up operations, improve control,
                      and turn messy workflows into structured digital systems.
                    </p>
                        {"Automation with Artificial Intelligence for serious businesses."
                          .split(" ")
                          .map((w, i) => (
                            <span key={i} data-word className="inline-block">
                              {w}
                            </span>
                          ))}
                      </span>
                    </h1>

                    <p
                      data-hero
                      className="mb-6 max-w-xl text-lg leading-8 text-muted"
                    >
                      We design and build AI-powered automation systems that
                      reduce manual work, speed up operations, improve control,
                      and turn messy workflows into structured digital systems.
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
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
                      className="grid max-w-2xl gap-3 sm:grid-cols-3 items-stretch"
                    >
                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          AI Automation
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Automate repetitive operational work
                        </div>
                      </Card>

                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Workflow Systems
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Turn manual business processes into controlled digital
                          flows
                        </div>
                      </Card>

                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Integrations &amp; Control
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Connect tools, approvals, alerts, data, and reporting
                        </div>
                      </Card>
                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          AI Automation
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Automate repetitive operational work
                        </div>
                      </Card>

                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Workflow Systems
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Turn manual business processes into controlled digital
                          flows
                        </div>
                      </Card>

                      <Card className="flex min-h-[138px] flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Integrations &amp; Control
                        </div>
                        <div className="mt-3 text-base font-semibold leading-6 text-white">
                          Connect tools, approvals, alerts, data, and reporting
>>>>>>> 97a75d4 (Reposition homepage around AI automation)

                                          {/* Right */}
                                          <div
                                            data-hero
                                            className="relative mx-auto w-full max-w-[460px]"
                                          >
                                            <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)] blur-2xl" />

                                            <Card className="relative overflow-hidden rounded-[30px] border border-gold/20 bg-black/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl">
                                              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,transparent_76%,rgba(212,175,55,0.06))]" />

                                              <div className="relative">
                                                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                                                  AUTOMATION PREVIEW
                                                </div>

                                                <h2 className="mt-3 max-w-[14ch] text-3xl font-semibold leading-tight text-white">
                                                  From manual chaos to controlled workflow
                                                </h2>

                                                <p className="mt-3 text-sm leading-6 text-muted">
                                                  Leads, approvals, follow-ups, and internal tasks move
                                                  through one structured system instead of living inside
                                                  scattered chats, notes, and memory.
                                                </p>

                                                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                                                  <div className="mb-3 flex items-center justify-between">
                                                    <div className="text-sm font-semibold text-white">
                                                      Workflow sequence
                                                    </div>
                                                    <div className="rounded-full border border-gold/20 bg-gold/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                                                      live
                                                    </div>
                                                  </div>

                                                  <div className="space-y-3">
                                                    {[
                                                      [
                                                        "Lead captured",
                                                        "Website, WhatsApp, or referral entry",
                                                      ],
                                                      [
                                                        "Auto routed",
                                                        "Assigned to the right person instantly",
                                                      ],
                                                      [
                                                        "Approval triggered",
                                                        "Manager review and action request",
                                                      ],
                                                      [
                                                        "Status visible",
                                                        "Dashboard, alerts, and audit trail",
                                                      ],
                                                    ].map(([title, desc]) => (
                                                      <div
                                                        key={title}
                                                        className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3"
                                                      >
                                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gold" />
                                                        <div>
                                                          <div className="text-sm font-semibold text-white">
                                                            {title}
                                                          </div>
                                                          <div className="mt-1 text-xs leading-5 text-muted">
                                                            {desc}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                  {[
                                                    "Lead routing",
                                                    "Approvals",
                                                    "Alerts",
                                                    "Dashboards",
                                                    "Tracking",
                                                  ].map((item) => (
                                                    <span
                                                      key={item}
                                                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                                                    >
                                                      {item}
                                                    </span>
                                                  ))}
                                                </div>

                                                <div className="mt-5 grid grid-cols-2 gap-3">
                                                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                                    <div className="text-[11px] uppercase tracking-wider text-muted">
                                                      Manual chasing
                                                    </div>
                                                    <div className="mt-2 text-lg font-semibold text-white">
                                                      Reduced
                                                    </div>
                                                  </div>
                                                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                                    <div className="text-[11px] uppercase tracking-wider text-muted">
                                                      Operational visibility
                                                    </div>
                                                    <div className="mt-2 text-lg font-semibold text-white">
                                                      Increased
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="mt-6 flex flex-wrap gap-3">
                                                  <Button href="/ai-automation" variant="secondary">
                                                    View AI automation
                                                  </Button>
                                                  <Button href="/contact" variant="primary">
                                                    Request consult
                                                  </Button>
                                                </div>
                                              </div>
                                            </Card>
                                          </div>
                          </Button>
                          <Button href="/contact" variant="primary">
                            Request a private consult
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
<<<<<<< HEAD
=======

                  {/* Right */}
                  <div
                    data-hero
                    className="relative mx-auto w-full max-w-[460px]"
                  >
                    <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)] blur-2xl" />

                    <Card className="relative overflow-hidden rounded-[30px] border border-gold/20 bg-black/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,transparent_76%,rgba(212,175,55,0.06))]" />

                      <div className="relative">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                          AUTOMATION PREVIEW
                        </div>

                        <h2 className="mt-3 max-w-[14ch] text-3xl font-semibold leading-tight text-white">
                          From manual chaos to controlled workflow
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-muted">
                          Leads, approvals, follow-ups, and internal tasks move
                          through one structured system instead of living inside
                          scattered chats, notes, and memory.
                        </p>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="text-sm font-semibold text-white">
                              Workflow sequence
                            </div>
                            <div className="rounded-full border border-gold/20 bg-gold/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                              live
                            </div>
                          </div>

                          <div className="space-y-3">
                            {[
                              [
                                "Lead captured",
                                "Website, WhatsApp, or referral entry",
                              ],
                              [
                                "Auto routed",
                                "Assigned to the right person instantly",
                              ],
                              [
                                "Approval triggered",
                                "Manager review and action request",
                              ],
                              [
                                "Status visible",
                                "Dashboard, alerts, and audit trail",
                              ],
                            ].map(([title, desc]) => (
                              <div
                                key={title}
                                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3"
                              >
                                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gold" />
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    {title}
                                  </div>
                                  <div className="mt-1 text-xs leading-5 text-muted">
                                    {desc}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {[
                            "Lead routing",
                            "Approvals",
                            "Alerts",
                            "Dashboards",
                            "Tracking",
                          ].map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-[11px] uppercase tracking-wider text-muted">
                              Manual chasing
                            </div>
                            <div className="mt-2 text-lg font-semibold text-white">
                              Reduced
                            </div>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-[11px] uppercase tracking-wider text-muted">
                              Operational visibility
                            </div>
                            <div className="mt-2 text-lg font-semibold text-white">
                              Increased
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button href="/ai-automation" variant="secondary">
                            View AI automation
                          </Button>
                          <Button href="/contact" variant="primary">
                            Request consult
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
                </div>
              </div>
            </Container>
          </Section>

<<<<<<< HEAD
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
=======
          {/* SPECIALIZATION SECTION */}
          <Section
            kicker="SPECIALIZATION"
            title="We specialize in automation with artificial intelligence"
            subtitle="We build systems that take repetitive work, scattered communication, approvals, follow-ups, and operational bottlenecks and turn them into structured automated workflows."
          >
            <Container>
              <div
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
                data-reveal
              >
                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-base font-semibold leading-7">
                    Lead capture and routing
                  </div>
                </Card>
                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-base font-semibold leading-7">
                    WhatsApp and customer communication workflows
                  </div>
                </Card>
                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-base font-semibold leading-7">
                    Internal approvals and task automation
                  </div>
                </Card>
                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-base font-semibold leading-7">
                    Dashboards, alerts, and operational tracking
                  </div>
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
                </Card>
              </div>
            </Container>
          </Section>

<<<<<<< HEAD
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
=======
          {/* WHAT AUTOMATION CAN FIX SECTION */}
          <Section
            title="What automation can fix inside a business"
            subtitle="Manual work costs time, causes inconsistency, slows staff, and creates missed follow-ups."
          >
            <Container>
              <div className="grid gap-6 md:grid-cols-3" data-reveal>
                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="font-semibold mb-2">
                    Staff repeating the same tasks every day
                  </div>
                  <div className="text-xs text-muted">
                    Automation removes repetition and frees up time for higher
                    value work.
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Leads not followed up properly
                  </div>
                  <div className="text-xs text-muted">
                    Automated lead flows ensure every opportunity is tracked and
                    actioned.
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Managers chasing updates manually
                  </div>
                  <div className="text-xs text-muted">
                    Dashboards and alerts keep everyone informed without
                    chasing.
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Work happening across WhatsApp, calls, notes, and memory
                  </div>
                  <div className="text-xs text-muted">
                    Centralized workflows bring all actions into one controlled
                    system.
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    No clean visibility on what is happening
                  </div>
                  <div className="text-xs text-muted">
                    Real-time tracking and reporting provide clarity and
                    control.
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Slow handovers and approval bottlenecks
                  </div>
                  <div className="text-xs text-muted">
                    Automated approvals and handovers speed up operations and
                    reduce delays.
                  </div>
                </Card>
              </div>
            </Container>
          </Section>

          {/* WHAT WE BUILD SECTION */}
          <Section
            title="What we build"
            subtitle="Automation systems engineered around real business operations."
          >
            <Container>
              <div className="grid gap-6 md:grid-cols-3" data-reveal>
                <Card>
                  <div className="font-semibold mb-2">
                    AI workflow automation
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    WhatsApp automation systems
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Internal operational dashboards
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Approval and escalation systems
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    CRM and lead flow automation
                  </div>
                </Card>
                <Card>
                  <div className="font-semibold mb-2">
                    Custom portals and web-based control systems
                  </div>
                </Card>
              </div>
            </Container>
          </Section>

          {/* Product Suite Section (ONCE) */}
          <LiquidGlowSweep id="ps" />
          <ProductSuiteSection />
          {/* CTA SECTION (ONCE, STRONG) */}
          <Section
            kicker="READY TO AUTOMATE"
            title="If your business is still running on manual effort, scattered messages, and repeated follow-ups, it is time to build proper automation."
            subtitle="We work with serious businesses that want speed, control, and higher operational standards."
          >
            <Container>
              <div className="flex flex-col items-center gap-6" data-reveal>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="primary">
                    Request a private consult
                  </Button>
                  <Button href="/ai-automation" variant="secondary">
                    See AI automation
                  </Button>
                </div>
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
              </div>
            </Container>
          </Section>

<<<<<<< HEAD
          <div className="my-10 border-t border-line" />

          <CTA />
          <Section
            title="Contact"
            subtitle={`${site.pricingNote}. We work with reputable, branded businesses.`}
=======
          {/* CONTACT SECTION */}
          <Section
            title="Contact"
            subtitle="Tell us what is manual, slow, repetitive, or messy in your business. We will show you where automation with AI can create control."
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
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
<<<<<<< HEAD
                  <div className="mt-3 text-sm text-muted">
                    Focus: luxury automotive, luxury property, hospitals and
                    medical centers.
                  </div>
                  <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                    <div className="text-xs font-semibold text-muted">Note</div>
                    <div className="mt-2 text-xs text-muted">
                      In-house counsel supports governance and documentation
                      within client engagements.
=======
                  <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                    <div className="text-xs font-semibold text-muted">Note</div>
                    <div className="mt-2 text-xs text-muted">
                      Premium, direct, and automation-focused. No agency fluff.
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
                    </div>
                  </div>
                </Card>
              </div>
            </Container>
          </Section>

<<<<<<< HEAD
          <div className="py-14" />
=======
          {/* ...existing code... */}
>>>>>>> 97a75d4 (Reposition homepage around AI automation)
        </main>
      </div>
    </>
  );
}
