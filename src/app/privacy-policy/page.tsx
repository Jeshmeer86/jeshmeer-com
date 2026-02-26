import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sovereign Compliance Systems",
  description:
    "Privacy Policy for Sovereign Compliance Systems. Learn what data we collect, why we collect it, how we use it, and the choices you have.",
};

const LAST_UPDATED = "25 February 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            This Privacy Policy explains how we collect, use, disclose, and
            protect personal information when you use our website and contact
            channels.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#who-we-are"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Who we are
            </a>
            <a
              href="#what-we-collect"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              What we collect
            </a>
            <a
              href="#how-we-use"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              How we use it
            </a>
            <a
              href="#sharing"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Sharing
            </a>
            <a
              href="#rights"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Your rights
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

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-10">
            <section
              id="who-we-are"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Who we are</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Sovereign Compliance Systems FZCO (we, us, our) operates this
                website and related contact channels.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">Controller</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Sovereign Compliance Systems FZCO
                  <br />
                  Dubai, United Arab Emirates
                  <br />
                  Email:{" "}
                  <a
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href="mailto:jesasolutions@yahoo.com"
                  >
                    jesasolutions@yahoo.com
                  </a>
                </p>
              </div>

              <p className="mt-6 text-sm text-white/60">
                This policy is provided for transparency. It is not legal
                advice. For a jurisdiction-specific version, have in-house
                counsel review it before publishing.
              </p>
            </section>

            <section
              id="what-we-collect"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                What information we collect
              </h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Information you provide
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    When you contact us (for example via a contact form, email,
                    WhatsApp, or bookings), you may provide information such as
                    your name, email address, phone number, company name, and
                    the contents of your message.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Information collected automatically
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    When you use the website, certain technical data may be
                    collected automatically, such as IP address, device and
                    browser type, pages viewed, timestamps, and approximate
                    location derived from IP.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Cookies and similar technologies
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We may use cookies or similar technologies for essential
                    site functionality, performance, analytics, and preferences.
                    If enabled, details are described in our Cookie Policy.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="how-we-use"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">How we use information</h2>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To respond to enquiries and provide requested information.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To evaluate and discuss potential projects and services.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To operate, maintain, and improve the website and user
                    experience.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To help detect, prevent, and investigate abuse or security
                    issues.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To comply with legal obligations where applicable.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Lawful basis (where required)
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Where applicable law requires a lawful basis, we process
                  personal information based on one or more of the following:
                  your consent, performance of a contract or steps requested by
                  you, legitimate interests (such as operating a secure website
                  and responding to enquiries), and compliance with legal
                  obligations.
                </p>
              </div>
            </section>

            <section
              id="sharing"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                How we share information
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We do not sell personal information. We may share information
                with trusted service providers only as needed to operate the
                website and communications.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Hosting and infrastructure
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    The website may be hosted on third-party infrastructure.
                    Hosting providers may process technical logs and network
                    data to deliver the service.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Email delivery
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    If you submit a contact form, a third-party email delivery
                    provider may process message content to deliver it to us.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Analytics (if enabled)
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    If analytics tools are enabled, they may process usage data
                    to help us understand site performance and improve the
                    experience.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Legal and protection
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    We may disclose information if required by law or to protect
                    our rights, users, and systems from harm or abuse.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  International transfers
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Service providers may process data in different countries.
                  Where required, we use reasonable safeguards to support lawful
                  cross-border transfers.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Data retention</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We keep personal information only for as long as needed for the
                purposes described in this policy, including responding to
                enquiries, maintaining records, resolving disputes, and meeting
                legal obligations where applicable.
              </p>

              <p className="mt-4 text-sm text-white/60">
                If you want us to delete a specific message thread or contact
                record, email us and we will evaluate your request in line with
                applicable requirements.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Security</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We use reasonable technical and organizational measures designed
                to protect personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <p className="mt-4 text-sm text-white/60">
                No system is guaranteed to be 100% secure. If you believe your
                interaction with us is no longer secure, contact us immediately.
              </p>
            </section>

            <section
              id="rights"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Your rights and choices</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Depending on your location and applicable law, you may have
                rights such as:
              </p>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Request access to personal information we hold about you.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Request correction of inaccurate or incomplete information.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>Request deletion, where applicable.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>Object to certain processing, where applicable.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    Withdraw consent, where processing is based on consent.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  How to exercise rights
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Email{" "}
                  <a
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href="mailto:jesasolutions@yahoo.com?subject=Privacy%20Request"
                  >
                    jesasolutions@yahoo.com
                  </a>{" "}
                  with your request. We may ask for information to verify your
                  identity.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Children</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                This website is not intended for children. We do not knowingly
                collect personal information from children.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Changes to this policy</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated date.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Contact</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If you have questions about this Privacy Policy or how we handle
                personal information, contact us:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/85">
                  Email:{" "}
                  <a
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href="mailto:jesasolutions@yahoo.com?subject=Privacy%20Policy%20Question"
                  >
                    jesasolutions@yahoo.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Quick summary</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>We collect what you submit via contact channels.</li>
                <li>We may collect basic technical data for site operation.</li>
                <li>We do not sell personal information.</li>
                <li>
                  Service providers may process data to deliver the site and
                  email.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Related pages</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Cookie Policy</li>
                <li>Terms and Conditions</li>
                <li>Legal Notice</li>
                <li>Security Statement</li>
              </ul>
              <p className="mt-4 text-xs text-white/60">
                Tell me which one you want next and I will generate it.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
