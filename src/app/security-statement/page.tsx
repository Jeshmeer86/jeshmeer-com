import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Statement | Sovereign Compliance Systems",
  description:
    "Security Statement for Sovereign Compliance Systems. Our approach to security, access control, monitoring, incident response, and responsible disclosure.",
};

const LAST_UPDATED = "25 February 2026";

export default function SecurityStatementPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Security Statement
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            This page explains how we approach security across our website and
            the systems we build: risk awareness, access control, audit-ready
            thinking, and responsible operations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#principles"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Principles
            </a>
            <a
              href="#controls"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Controls
            </a>
            <a
              href="#incident-response"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Incident response
            </a>
            <a
              href="#responsible-disclosure"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Responsible disclosure
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
          {/* Main */}
          <div className="md:col-span-2 space-y-10">
            <section
              id="principles"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Security principles</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We design with security in mind from the start. Our goal is to
                reduce risk, reduce ambiguity, and build systems that can be
                trusted under pressure.
              </p>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Least privilege access and role separation where needed.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Defense-in-depth across authentication, data, and
                    infrastructure.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Audit-ready thinking for critical actions and records.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Secure defaults and practical controls aligned to business
                    risk.
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-sm text-white/60">
                No system is guaranteed to be 100% secure. Security is a risk
                management discipline, not a promise of perfection.
              </p>
            </section>

            <section
              id="controls"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Security controls</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Controls vary depending on the service and environment, but we
                generally aim for the following baseline:
              </p>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Access control and authentication
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Role-based access, least privilege, secure credential
                    handling, and strong authentication where available (for
                    example MFA for administrative access).
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Data protection
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Reasonable safeguards for data in transit and at rest, and
                    careful handling of sensitive fields. Data collection is
                    aligned to purpose.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Logging and audit visibility
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Where appropriate, we design logging for key events and
                    critical actions to support investigation, integrity, and
                    operational review.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Secure development discipline
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Code review habits, dependency awareness, controlled secrets
                    handling, and change tracking. Security decisions are
                    treated as part of the build process.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Infrastructure and deployment
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We aim to follow strong cloud hygiene: least privilege
                    access, environment separation, and controlled deployment
                    workflows where the platform supports it.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">User responsibilities</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Security is shared. If you interact with us through forms,
                email, or messaging:
              </p>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Do not send passwords, one-time codes, or banking secrets.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Use secure channels for sensitive documents when agreed in
                    writing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Notify us if you believe an account or message thread is
                    compromised.
                  </span>
                </li>
              </ul>
            </section>

            <section
              id="incident-response"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Incident response</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If we become aware of a security incident that materially
                affects the confidentiality, integrity, or availability of our
                systems, we aim to respond quickly and responsibly.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Response steps
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Containment and initial assessment.</li>
                  <li>Investigation and root-cause analysis.</li>
                  <li>Remediation and control improvement.</li>
                  <li>
                    Notification where required by applicable law or agreement.
                  </li>
                </ul>
              </div>
            </section>

            <section
              id="responsible-disclosure"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Responsible disclosure</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If you believe you have found a security vulnerability, we ask
                that you report it responsibly so we can investigate and address
                it.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">Please do</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Provide clear steps to reproduce the issue.</li>
                  <li>Share impact assessment if known.</li>
                  <li>
                    Allow reasonable time for investigation and remediation.
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Please do not
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>Access or modify data that is not your own.</li>
                  <li>Disrupt service availability.</li>
                  <li>
                    Publicly disclose the issue before we have had a chance to
                    respond.
                  </li>
                </ul>
              </div>

              <p className="mt-6 text-sm text-white/60">
                We do not authorize testing that violates law or harms users.
                Any testing must be ethical and limited.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Contact</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Security questions or responsible disclosure reports:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/85">
                  Email:{" "}
                  <a
                    href="mailto:jesasolutions@yahoo.com?subject=Security%20Report"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    jesasolutions@yahoo.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Aside */}
          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Quick summary</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Security-by-design and least privilege.</li>
                <li>Reasonable safeguards for data and access.</li>
                <li>Incident response discipline.</li>
                <li>Responsible disclosure process.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Related pages</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <a
                    href="/privacy-policy"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/cookie-policy"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/legal-notice"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    Legal Notice
                  </a>
                </li>
                <li>
                  <a
                    href="/governance-pack"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    Governance Pack
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
