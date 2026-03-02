import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance Pack | Sovereign Compliance Systems",
  description:
    "Our Governance Pack explains how we operate with governance-by-design, documentation discipline, and audit-grade accountability across our platforms.",
};

const LAST_UPDATED = "25 February 2026";

export default function GovernancePackPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Governance Pack
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            This page explains how we design systems with governance,
            accountability, and evidence-ready workflows built into the
            foundation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#overview"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Overview
            </a>
            <a
              href="#what-you-get"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              What you get
            </a>
            <a
              href="#disclosure"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Disclosure
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Contact
            </a>
          </div>

          <p className="mt-6 text-sm text-white/60">
            Last updated: <span className="text-white/80">{LAST_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left column */}
          <div className="md:col-span-2 space-y-10">
            <section
              id="overview"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Overview</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Sovereign Compliance Systems is built for high-trust
                environments. That means we do not treat documentation,
                approvals, and record integrity as an afterthought.
              </p>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Governance-by-design across workflows, records, and user
                    actions.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Evidence-ready operation with structured logs and version
                    discipline.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Clear boundaries and disclosures for compliance and
                    documentation support.
                  </span>
                </li>
              </ul>
            </section>

            <section
              id="what-you-get"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                What you get in the Governance Pack
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Documentation and Trust Pack",
                    body: "Policy-ready structure that matches the real workflow, not generic templates.",
                  },
                  {
                    title: "Governance Workflow Design",
                    body: "Approval steps, role-based responsibility, and structured decision trails.",
                  },
                  {
                    title: "Audit Trail Thinking",
                    body: "We design for traceability: who did what, when, and why it matters.",
                  },
                  {
                    title: "Evidence Discipline",
                    body: "Records, attachments, and exports structured for disputes and internal review.",
                  },
                  {
                    title: "Data Handling Summary",
                    body: "Clear handling principles for customer data, consent, and retention expectations.",
                  },
                  {
                    title: "Client-Facing Disclosure",
                    body: "Professional positioning that signals trust, structure, and accountability.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-white/60">
                Note: Scope depends on the system you deploy. The Governance
                Pack is the structure and discipline layer that supports
                long-term trust.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">
                How governance shows up in our builds
              </h2>

              <div className="mt-5 space-y-5 text-white/80">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Policy version discipline
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Policies are treated like versions, not vague pages. Users
                    can be shown what applies, and when updates were made.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Consent and clarity
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    If cookies or tracking are used, we aim for clear disclosure
                    and consent-first design that respects user choice.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Evidence and accountability
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    For high-value workflows, we design actions to be reviewable
                    and defensible. This supports operational integrity and
                    reduces ambiguity.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Recommended website pages
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Add or link these pages from your footer:
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-white/80 md:grid-cols-2">
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                  <li>Terms and Conditions</li>
                  <li>Legal Notice</li>
                  <li>Security Statement</li>
                  <li>Data Handling Summary</li>
                </ul>
              </div>
            </section>

            <section
              id="disclosure"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                Company structure and disclosure
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Sovereign Compliance Systems operates as one company with two
                internal divisions.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Technology Division
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Bespoke software development, secure customer portals,
                    hosted platforms, automation-heavy workflows, and
                    implementation support.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Compliance and Risk Division
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Internal governance support, documentation structure, risk
                    controls thinking, and operational policy alignment for
                    systems we build.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  In-house counsel note
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Our Compliance and Risk function is internal to Sovereign
                  Compliance Systems. In-house legal counsel supports internal
                  governance and documentation. No legal services are offered to
                  the public through this website.
                </p>
              </div>

              <p className="mt-6 text-sm text-white/60">
                This Governance Pack is a transparency page. It is not legal
                advice and should not be relied on as such.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">
                Security and data handling principles
              </h2>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Minimum necessary data collection aligned to the workflow
                    purpose.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Controlled access and role separation where systems require
                    it.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Audit-aware thinking for high-value actions and critical
                    records.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Clear disclosure for cookies, analytics, and third-party
                    services where used.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Third-party services
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Some sites use third-party services for analytics,
                  performance, or contact forms. If enabled, we aim to disclose
                  this in the Privacy and Cookie policies.
                </p>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Company details</h3>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-white/60">Entity</dt>
                  <dd className="text-white/85">
                    Sovereign Compliance Systems FZCO
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-white/60">Location</dt>
                  <dd className="text-white/85">Dubai, United Arab Emirates</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-white/60">Business email</dt>
                  <dd className="text-white/85">
                    <a
                      href="mailto:jesasolutions@yahoo.com"
                      className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    >
                      jesasolutions@yahoo.com
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-white/60">License</dt>
                  <dd className="text-white/60">
                    Add your free zone license number here once issued
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">What this page is for</h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                This is a client-facing trust page. It signals how we think. How
                we build. How we operate.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Next pages to add</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Terms and Conditions</li>
                <li>Legal Notice</li>
                <li>Security Statement</li>
              </ul>

              <p className="mt-4 text-xs text-white/60">
                If you want, I will generate these pages in the same style.
              </p>
            </div>

            <div
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <h3 className="text-base font-semibold">Contact</h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                For governance, documentation structure, or compliance-grade
                workflow design, contact us.
              </p>

              <a
                href="mailto:jesasolutions@yahoo.com?subject=Governance%20Pack%20Request"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
              >
                Email Governance Request
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-10 text-center text-sm text-white/60">
          This page is part of the authority layer.
        </div>
      </section>
    </main>
  );
}
