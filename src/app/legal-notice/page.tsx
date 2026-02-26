import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice | Sovereign Compliance Systems",
  description:
    "Legal Notice for Sovereign Compliance Systems. Disclosures, ownership, disclaimers, and legal information for website use.",
};

const LAST_UPDATED = "25 February 2026";

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Legal Notice
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            This page provides legal and disclosure information about this
            website.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#operator"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Website operator
            </a>
            <a
              href="#disclaimers"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Disclaimers
            </a>
            <a
              href="#ip"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Ownership
            </a>
            <a
              href="#third-parties"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Third parties
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
              id="operator"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Website operator</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                This website is operated by:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Sovereign Compliance Systems FZCO
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Dubai, United Arab Emirates
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:jesasolutions@yahoo.com"
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                  >
                    jesasolutions@yahoo.com
                  </a>
                  <br />
                  License number:{" "}
                  <span className="text-white/60">
                    Add your free zone license number once issued
                  </span>
                </p>
              </div>

              <p className="mt-6 text-sm text-white/60">
                This Legal Notice supports transparency and responsible use. It
                is not legal advice.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Scope</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                This Legal Notice applies to this website and its publicly
                available pages, content, and materials.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Related pages
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
                      href="/terms"
                      className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    >
                      Terms and Conditions
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
                    Content on this website is general and provided for
                    information and transparency. It is not legal advice and
                    should not be relied on as such.
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
                    Accuracy and availability
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We aim to keep the website accurate and available, but we do
                    not guarantee completeness, timeliness, or uninterrupted
                    access.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Professional engagement
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Any services, scopes, timelines, and fees become binding
                    only when confirmed in a written agreement. Website content
                    does not create a client relationship by itself.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="ip"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                Ownership and intellectual property
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                The website, branding, design, text, visuals, and code are owned
                by us or licensed to us, unless stated otherwise.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Permitted use
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  You may view, download, and print portions of the website for
                  your personal use or internal business evaluation, provided
                  you do not remove notices and you do not misuse the materials.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">Restrictions</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  You must not reproduce, distribute, publish, sell, or create
                  derivative works from our materials without written
                  permission, except where permitted by law.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">Trademarks</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Names, logos, and marks displayed on the website may be
                  trademarks. Use without permission may violate applicable
                  rights.
                </p>
              </div>
            </section>

            <section
              id="third-parties"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                Third-party websites and services
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                The website may include links to third-party websites or use
                third-party services to support hosting, performance, analytics,
                or contact form delivery.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">No control</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  We do not control third-party sites or services and are not
                  responsible for their content, privacy practices, or
                  availability.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Reporting concerns</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If you believe content on this website infringes rights, is
                inaccurate, or raises a security concern, contact us with
                details so we can review it.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Contact</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Legal notice questions:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/85">
                  Email:{" "}
                  <a
                    href="mailto:jesasolutions@yahoo.com?subject=Legal%20Notice%20Question"
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
                <li>This page is transparency information.</li>
                <li>Website content is not legal advice.</li>
                <li>Materials are owned or licensed.</li>
                <li>Third-party links are outside our control.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Next page to add</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Security Statement</li>
                <li>Data Handling Summary</li>
              </ul>
              <p className="mt-4 text-xs text-white/60">
                Tell me which one next.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
