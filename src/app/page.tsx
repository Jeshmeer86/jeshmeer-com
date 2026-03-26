"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { ContactFormBlock } from "@/components/ContactFormBlock";
import { Preloader } from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";
import { Card } from "@/components/Card";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const specializationItems = [
  "Lead capture and routing",
  "WhatsApp and customer communication workflows",
  "Internal approvals and task automation",
  "Dashboards, alerts, and operational tracking",
];

const painPoints = [
  {
    title: "Staff repeating the same tasks every day",
    solution:
      "Automation removes repetition and frees up time for higher value work.",
  },
  {
    title: "Leads not followed up properly",
    solution:
      "Automated lead flows help make sure every opportunity is tracked and actioned.",
  },
  {
    title: "Managers chasing updates manually",
    solution:
      "Dashboards and alerts keep teams informed without constant chasing.",
  },
  {
    title: "Work happening across WhatsApp, calls, notes, and memory",
    solution:
      "Structured systems bring actions into one controlled operational flow.",
  },
  {
    title: "No clean visibility on what is happening",
    solution:
      "Tracking and reporting create clearer control across the business.",
  },
  {
    title: "Slow handovers and approval bottlenecks",
    solution:
      "Automated approvals and handovers reduce delays and improve movement.",
  },
];

const buildItems = [
  "AI workflow automation",
  "WhatsApp automation systems",
  "Internal operational dashboards",
  "Approval and escalation systems",
  "CRM and lead flow automation",
  "Custom portals and web-based control systems",
];

const workflowSteps = [
  {
    title: "Lead captured",
    description: "Website, WhatsApp, or referral entry",
  },
  {
    title: "Auto routed",
    description: "Assigned to the right person instantly",
  },
  {
    title: "Approval triggered",
    description: "Manager review and action request",
  },
  {
    title: "Status visible",
    description: "Dashboard, alerts, and audit trail",
  },
];

const heroTags = [
  "Lead routing",
  "Approvals",
  "Alerts",
  "Dashboards",
  "Tracking",
];

const flagshipOutcomes = [
  "Reduce repetitive manual work across enquiries, approvals, and follow-ups",
  "Create clearer operational visibility with structured status tracking",
  "Improve control with routing, escalation, and evidence-friendly workflows",
];

const productModules = [
  {
    title: "WhatsApp Operations Desk",
    description:
      "Handle inbound customer communication, routing, follow-ups, and support workflows in a more controlled way.",
  },
  {
    title: "Approval and Escalation Engine",
    description:
      "Move requests through the right decision path with rules, alerts, and clearer accountability.",
  },
  {
    title: "Internal Operational Dashboards",
    description:
      "Give managers cleaner visibility over leads, tasks, approvals, bottlenecks, and team movement.",
  },
  {
    title: "Secure Customer Portal",
    description:
      "Provide a controlled digital layer for customer steps, document flow, and status visibility.",
  },
];

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
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.35",
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Preloader />
      <CookieConsent />

      <main>
        <Section hideHeader>
          <Container>
            <div ref={heroRef} className="pb-10 pt-14 md:pb-14 md:pt-20">
              <div className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,460px)] md:items-center">
                <div>
                  <div
                    data-hero
                    className="kicker mb-3 text-xs font-semibold tracking-widest text-gold"
                  >
                    AUTOMATION WITH ARTIFICIAL INTELLIGENCE
                  </div>

                  <h1 className="mb-4 max-w-[12ch] text-4xl font-bold leading-[0.98] text-white md:text-6xl">
                    <span className="inline-flex flex-wrap gap-x-2">
                      {"Automation with Artificial Intelligence for serious businesses."
                        .split(" ")
                        .map((word, index) => (
                          <span
                            key={`${word}-${index}`}
                            data-word
                            className="inline-block"
                          >
                            {word}
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

                  <div data-hero className="mb-7 flex flex-wrap gap-3">
                    <Button href="/contact" variant="primary">
                      Request a private consult
                    </Button>
                    <Button href="/ai-automation" variant="secondary">
                      See AI automation
                    </Button>
                  </div>

                  <div
                    data-hero
                    className="grid max-w-2xl items-stretch gap-3 sm:grid-cols-3"
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
                  </div>
                </div>

                <div
                  data-hero
                  className="relative mx-auto w-full max-w-[460px] md:ml-auto"
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
                          {workflowSteps.map((step) => (
                            <div
                              key={step.title}
                              className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3"
                            >
                              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gold" />
                              <div>
                                <div className="text-sm font-semibold text-white">
                                  {step.title}
                                </div>
                                <div className="mt-1 text-xs leading-5 text-muted">
                                  {step.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {heroTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                          >
                            {tag}
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
              </div>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="space-y-8 py-8 md:py-10" data-reveal>
              <div className="max-w-3xl">
                <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                  SPECIALIZATION
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  We specialize in automation with artificial intelligence
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  We build systems that take repetitive work, scattered
                  communication, approvals, follow-ups, and operational
                  bottlenecks and turn them into structured automated workflows.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {specializationItems.map((item) => (
                  <Card
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 p-6"
                  >
                    <div className="text-base font-semibold leading-7 text-white">
                      {item}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="space-y-8 py-8 md:py-10" data-reveal>
              <div className="max-w-3xl">
                <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                  SOVEREIGN
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  What automation can fix inside a business
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  Manual work costs time, causes inconsistency, slows staff, and
                  creates missed follow-ups.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {painPoints.map((item) => (
                  <Card
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-6"
                  >
                    <div className="mb-3 text-base font-semibold leading-7 text-white">
                      {item.title}
                    </div>
                    <div className="text-sm leading-6 text-muted">
                      {item.solution}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="space-y-8 py-8 md:py-10" data-reveal>
              <div className="max-w-3xl">
                <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                  WHAT WE BUILD
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  What we build
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  Automation systems engineered around real business operations.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {buildItems.map((item) => (
                  <Card
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 p-6"
                  >
                    <div className="text-base font-semibold leading-7 text-white">
                      {item}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="space-y-8 py-8 md:py-10" data-reveal>
              <div className="max-w-3xl">
                <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                  SOVEREIGN
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Product Suite
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  Flagship platform, core modules, and structured add-ons for
                  serious businesses that want speed, control, and cleaner
                  operations.
                </p>
              </div>

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
                <Card className="rounded-[28px] border border-gold/20 bg-black/20 p-6 md:p-8">
                  <div className="mb-5 h-[2px] w-full rounded-full bg-gold/80" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-white">
                      Sovereign Automation Platform
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-muted">
                      Flagship
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                    A premium automation layer for routing, approvals,
                    follow-ups, visibility, and controlled digital workflows
                    across serious business operations.
                  </p>

                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Outcomes
                    </div>
                    <ul className="mt-4 space-y-3">
                      {flagshipOutcomes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/contact" variant="primary">
                      Request a private consult
                    </Button>
                    <Button href="/ai-automation" variant="secondary">
                      View details
                    </Button>
                  </div>
                </Card>

                <Card className="rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gold">
                    Built for control
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    A cleaner way to run operational movement
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    The suite is designed to bring work out of scattered chats,
                    repeated manual effort, and unclear ownership into one more
                    structured operational layer.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[11px] uppercase tracking-wider text-muted">
                        Routing
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        Faster movement
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[11px] uppercase tracking-wider text-muted">
                        Visibility
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        Clearer control
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[11px] uppercase tracking-wider text-muted">
                        Follow-ups
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        Better consistency
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Core modules
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {productModules.map((item) => (
                    <Card
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-black/20 p-6"
                    >
                      <div className="text-lg font-semibold text-white">
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {item.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="py-10 text-center" data-reveal>
              <Card className="rounded-[28px] border border-white/10 bg-black/20 p-8 md:p-12">
                <div className="mx-auto max-w-4xl">
                  <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                    READY TO AUTOMATE
                  </div>
                  <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                    If your business is still running on manual effort,
                    scattered messages, and repeated follow-ups, it is time to
                    build proper automation.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">
                    We work with serious businesses that want speed, control,
                    and higher operational standards.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button href="/contact" variant="primary">
                      Request a private consult
                    </Button>
                    <Button href="/ai-automation" variant="secondary">
                      See AI automation
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        <Section hideHeader>
          <Container>
            <div className="space-y-8 py-8 md:py-10" data-reveal>
              <div className="max-w-3xl">
                <div className="kicker mb-3 text-xs font-semibold tracking-widest text-gold">
                  CONTACT
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Contact
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  Tell us what is manual, slow, repetitive, or messy in your
                  business. We will show you where automation with AI can create
                  control.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ContactFormBlock />

                <Card className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-sm font-semibold text-white">Direct</div>

                  <div className="mt-4 space-y-3 text-sm text-muted">
                    <div>
                      Email:{" "}
                      <span className="text-white">{site.contactEmail}</span>
                    </div>
                    <div>
                      Number:{" "}
                      <span className="text-white">+97156 87 44 925</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Note
                    </div>
                    <div className="mt-2 text-sm leading-6 text-muted">
                      Premium, direct, and automation-focused. No agency fluff.
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
