"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { ProductCard } from "@/components/ProductCard";
import { IndustryCard } from "@/components/IndustryCard";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { LiquidGlowSweep } from "@/components/LiquidGlowSweep";
import { SparkleField } from "@/components/SparkleField";

gsap.registerPlugin(ScrollTrigger);

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v7c0 5-3.5 9-8 9s-8-4-8-9V6l8-4z"
        stroke="rgba(200,162,74,0.95)"
        strokeWidth="1.8"
      />
      <path
        d="M8.8 12.2l2.3 2.3 4.5-5"
        stroke="rgba(215,222,230,0.95)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 11V8a5 5 0 0110 0v3"
        stroke="rgba(200,162,74,0.95)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12v10H6V11z"
        stroke="rgba(215,222,230,0.95)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconTrail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7h10M7 12h10M7 17h6"
        stroke="rgba(215,222,230,0.95)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 4h16v16H4V4z"
        stroke="rgba(200,162,74,0.95)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconPrivacy() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v7c0 5-3.5 9-8 9s-8-4-8-9V6l8-4z"
        stroke="rgba(200,162,74,0.95)"
        strokeWidth="1.8"
      />
      <path
        d="M9.5 12a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
        stroke="rgba(215,222,230,0.95)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FeatureStrip() {
  const items = [
    {
      icon: <IconShield />,
      title: "Streamlined deposits",
      desc: "Less admin work. Clear acceptance. Strong proof.",
    },
    {
      icon: <IconLock />,
      title: "Sales protection",
      desc: "Fraud resistance and controlled approvals.",
    },
    {
      icon: <IconTrail />,
      title: "Audit trails",
      desc: "Time stamped actions. Evidence packs in seconds.",
    },
    {
      icon: <IconPrivacy />,
      title: "Privacy assurance",
      desc: "Access controls and traceable governance.",
    },
  ];

  return (
    <div className="glass borderGlow rounded-2xl">
      <div className="grid gap-0 border-b border-line md:grid-cols-4">
        {items.map((x) => (
          <div key={x.title} className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-line bg-bg/30 p-2">
                {x.icon}
              </div>
              <div className="text-sm font-semibold">{x.title}</div>
            </div>
            <div className="mt-2 text-xs text-muted">{x.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 p-5 md:p-6">
        <div className="text-sm text-muted">
          {site.pricingNote}. Reputable, branded businesses only.
        </div>
        <Button href="/contact" variant="secondary">
          Schedule a discovery session
        </Button>
      </div>
    </div>
  );
}

function CarStage() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    const onLeave = () => {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative glass borderGlow rounded-2xl p-6 transition-transform duration-300"
      style={{ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" }}
    >
      <HeroBackdrop />
      <div className="sparkleGlow" />
      <SparkleField density={48} />

      <div className="relative">
        {/* Hero tagline (small line) */}
        <div className="text-xs text-muted mb-2">
          AI and automation, engineered for control.
        </div>
        {/* Main headline */}
        <h1 className="text-3xl font-bold mb-2">
          Governance, proof, and control.
        </h1>
        {/* Subheadline */}
        <div className="text-lg text-muted mb-4">
          We design and build compliance grade software for high value
          transactions, with audit ready traceability, automated workflows, and
          evidence you can rely on.
        </div>
        {/* Supporting line (small) */}
        <div className="text-xs text-muted mb-6">
          Built for reputable, branded businesses.
        </div>
        {/* Primary CTA buttons */}
        <div className="flex gap-3 mb-2">
          <a
            href="/contact"
            className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold text-text hover:border-gold"
          >
            Request a private consult
          </a>
          <a
            href="/products"
            className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold text-text hover:border-gold"
          >
            View products
          </a>
        </div>
        {/* Optional micro line under buttons (premium filter) */}
        <div className="text-xs text-muted mt-1">
          Projects from 100,000 AED+.
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line bg-bg/30 p-4">
            <div className="text-xs font-semibold text-muted">Module</div>
            <div className="mt-2 text-sm font-semibold">
              Reservation and deposits
            </div>
            <div className="mt-1 text-xs text-muted">
              Hold rules, disclosures, receipts, confirmations.
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-bg/30 p-4">
            <div className="text-xs font-semibold text-muted">Module</div>
            <div className="mt-2 text-sm font-semibold">
              Fraud controls layer
            </div>
            <div className="mt-1 text-xs text-muted">
              Risk scoring, velocity limits, identity resolution.
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            href="/products/sovereign-vault-ai-platform"
            variant="primary"
          >
            View flagship platform
          </Button>
          <Button href="/contact" variant="secondary">
            Book a consultation
          </Button>
        </div>

        {/* Removed preview text and transparent blocks as requested */}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

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

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
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
      <div className="border-b border-line">
        <Container>
          <div ref={heroRef} className="py-16 md:py-20">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div
                  data-hero
                  className="kicker text-xs font-semibold text-gold"
                >
                  {site.taglineTop}. {site.taglineBottom}.
                </div>

                <h1
                  data-hero
                  className="mt-4 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl"
                >
                  <span className="text-white" aria-label={site.name}>
                    {site.name.split(" ").map((w, i) => (
                      <span
                        key={w + i}
                        data-word
                        className="inline-block will-change-transform"
                        style={{ marginRight: "0.28em" }}
                      >
                        {w}
                      </span>
                    ))}
                  </span>
                </h1>

                <p data-hero className="mt-5 max-w-xl text-lg text-muted">
                  {site.headline}
                </p>

                <p data-hero className="mt-4 max-w-xl text-sm text-muted">
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
                  <span className="mx-2 text-muted">|</span>
                  Primary industry:{" "}
                  <span className="text-text">{site.primaryIndustry}</span>
                </div>
              </div>

              <div data-hero>
                <CarStage />
              </div>
            </div>

            <div className="mt-10" data-hero>
              <FeatureStrip />
            </div>

            <div className="mt-14 hrSoft" />
          </div>
        </Container>
      </div>

      <Container>
        <LiquidGlowSweep id="a" />
        <div data-reveal>
          <Section
            title="Industries we serve"
            subtitle="Luxury automotive is the primary focus. We also build equivalent governance grade systems for luxury property and medical environments."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <IndustryCard
                name={industries[0].name}
                slug={industries[0].slug}
                lead={industries[0].lead}
                primary
              />
              <IndustryCard
                name={industries[1].name}
                slug={industries[1].slug}
                lead={industries[1].lead}
              />
              <IndustryCard
                name={industries[2].name}
                slug={industries[2].slug}
                lead={industries[2].lead}
              />
            </div>
          </Section>
        </div>

        <LiquidGlowSweep id="b" />
        <div data-reveal>
          <Section
            title="Products"
            subtitle="Flagship first. Then core modules. Then add-ons."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </Section>
        </div>

        <LiquidGlowSweep id="c" />
        <div data-reveal>
          <Section
            title="What we deliver"
            subtitle="Software and workflow engineering, built with governance, proof, and high-end motion design."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass borderGlow rounded-2xl p-6">
                <div className="text-sm font-semibold">Technology Division</div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li>Bespoke software development and web applications</li>
                  <li>Secure customer portals and hosted platforms</li>
                  <li>
                    End to end implementation (requirements, project management,
                    documentation)
                  </li>
                  <li>Audit trails and internal governance workflows</li>
                  <li>
                    Where required: software code security reviews and
                    technology audit services relating to software systems
                  </li>
                  <li>
                    Anti money laundering style workflows (KYC, monitoring, case
                    handling, record keeping)
                  </li>
                  <li>
                    Anti theft and secure operational systems (access control,
                    approvals, inventory controls)
                  </li>
                  <li>
                    Fraud prevention systems (risk scoring, behaviour analysis,
                    velocity controls)
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
                  In-house counsel supports governance and documentation within
                  client engagements.
                </div>
              </div>
            </div>
          </Section>
        </div>

        <CTA />
        <div className="py-14" />
      </Container>
    </>
  );
}
