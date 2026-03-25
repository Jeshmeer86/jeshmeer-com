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
                    </div>
                  </div>

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
                </div>
              </div>
            </Container>
          </Section>

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
                </Card>
              </div>
            </Container>
          </Section>

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
              </div>
            </Container>
          </Section>

          {/* CONTACT SECTION */}
          <Section
            title="Contact"
            subtitle="Tell us what is manual, slow, repetitive, or messy in your business. We will show you where automation with AI can create control."
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
                  <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                    <div className="text-xs font-semibold text-muted">Note</div>
                    <div className="mt-2 text-xs text-muted">
                      Premium, direct, and automation-focused. No agency fluff.
                    </div>
                  </div>
                </Card>
              </div>
            </Container>
          </Section>

          {/* ...existing code... */}
        </main>
      </div>
    </>
  );
}
