import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sovereign Compliance Systems",
  description:
    "Terms and Conditions for Sovereign Compliance Systems. Website use rules, disclaimers, limitations, and key legal terms.",
};

const LAST_UPDATED = "25 February 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            These Terms govern your use of this website and our public online
            content. If you do not agree, do not use the website.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#overview"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Overview
            </a>
            <a
              href="#use"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Acceptable use
            </a>
            <a
              href="#intellectual-property"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Intellectual property
            </a>
            <a
              href="#disclaimers"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Disclaimers
            </a>
            <a
              href="#liability"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Liability
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
              id="overview"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Overview</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                This website is operated by Sovereign Compliance Systems FZCO
                (we, us, our). These Terms apply to your access to and use of
                our website, pages, content, and public materials.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Related policies
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Your use of the site is also subject to:
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-white/80 md:grid-cols-2">
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
                      href="/governance-pack"
                      className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    >
                      Governance Pack
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Eligibility</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                By using this website, you confirm that you can legally enter
                into a binding agreement in your jurisdiction.
              </p>
            </section>

            <section
              id="use"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Acceptable use</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                You agree to use the website lawfully and respectfully. You must
                not use the website in any way that could damage, disable,
                disrupt, or impair the website or our systems.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">You must not</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li>
                    Attempt to gain unauthorized access to any system or data.
                  </li>
                  <li>
                    Probe, scan, or test vulnerabilities without written
                    permission.
                  </li>
                  <li>Send malware, spam, or abusive automated traffic.</li>
                  <li>
                    Copy, scrape, or harvest data in a way that violates rights
                    or law.
                  </li>
                  <li>
                    Use the site to transmit unlawful, harmful, or misleading
                    content.
                  </li>
                </ul>
              </div>

              <p className="mt-6 text-sm text-white/60">
                We may suspend or restrict access if we believe there is misuse
                or a security risk.
              </p>
            </section>

            <section
              id="intellectual-property"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Intellectual property</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                The website, branding, design, text, visuals, code, and content
                are owned by us or licensed to us. You may view and use the site
                for personal or internal business evaluation purposes.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">Restrictions</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  You must not reproduce, distribute, modify, publish, sell, or
                  create derivative works from our content without written
                  permission, except where permitted by applicable law.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">
                Enquiries and submissions
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If you contact us through a form, email, or messaging channel,
                you agree that the information you provide is accurate to the
                best of your knowledge.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Do not send confidential information
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Do not send highly sensitive, confidential, or regulated
                  information unless we have explicitly agreed in writing and
                  provided a secure method for transfer.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">
                Project engagement terms
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Any professional services, deliverables, pricing, timelines, and
                scopes are only binding when confirmed in a written agreement
                (for example a proposal acceptance, statement of work, or master
                services agreement).
              </p>

              <p className="mt-4 text-sm text-white/60">
                Website content is informative. It is not a binding offer.
              </p>
            </section>

            <section
              id="disclaimers"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Disclaimers</h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    No legal advice
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Information on this website is general and for transparency.
                    It is not legal advice and should not be relied on as such.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    In-house counsel disclosure
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Our Compliance and Risk function is internal. In-house legal
                    counsel supports internal governance and documentation. No
                    legal services are offered to the public through this
                    website.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Website availability and accuracy
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We aim to keep the website accurate and available, but we do
                    not guarantee that content will always be current, complete,
                    or error free, or that access will always be uninterrupted.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Third-party links
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    The website may include links to third-party sites or tools.
                    We are not responsible for third-party content, policies, or
                    practices.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="liability"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Limitation of liability</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                To the maximum extent permitted by applicable law, we are not
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits, revenue, data, or
                goodwill arising from your use of the website.
              </p>

              <p className="mt-4 text-white/80 leading-relaxed">
                Where liability cannot be excluded, our liability is limited to
                the maximum extent permitted by applicable law.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Indemnity</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                You agree to indemnify and hold us harmless from claims, losses,
                liabilities, and expenses arising from your misuse of the
                website, violation of these Terms, or infringement of any
                rights.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Changes to these Terms</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                We may update these Terms from time to time. Updated Terms will
                be posted on this page with a revised date.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Governing law</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                These Terms are governed by the laws applicable in the United
                Arab Emirates, and the courts with appropriate jurisdiction will
                have authority over disputes, subject to mandatory legal rules.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Contact</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Questions about these Terms:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/85">
                  Email:{" "}
                  <a
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href="mailto:jesasolutions@yahoo.com?subject=Terms%20and%20Conditions%20Question"
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
                <li>Use the website lawfully.</li>
                <li>Do not attempt unauthorized access.</li>
                <li>Content is owned by us or licensed.</li>
                <li>Website content is informational, not legal advice.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">
                Recommended next pages
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Legal Notice</li>
                <li>Security Statement</li>
                <li>Data Handling Summary</li>
              </ul>

              <p className="mt-4 text-xs text-white/60">
                Tell me which one to generate next.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
