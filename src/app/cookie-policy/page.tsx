import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Sovereign Compliance Systems",
  description:
    "Cookie Policy for Sovereign Compliance Systems. Learn what cookies are, why we use them, and how you can control them.",
};

const LAST_UPDATED = "25 February 2026";

type CookieRow = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
};

const COOKIE_EXAMPLES: CookieRow[] = [
  {
    name: "Essential site cookies",
    type: "Essential",
    purpose:
      "Support core website functionality such as navigation, security, and basic preferences.",
    duration: "Session or limited duration",
  },
  {
    name: "Preference cookies",
    type: "Preferences",
    purpose:
      "Remember selections such as language, region, or other settings (if enabled).",
    duration: "Varies",
  },
  {
    name: "Analytics cookies",
    type: "Analytics",
    purpose:
      "Help us understand how the site is used so we can improve performance and content (only if enabled).",
    duration: "Varies",
  },
  {
    name: "Marketing cookies",
    type: "Marketing",
    purpose:
      "Support advertising measurement or remarketing (only if enabled).",
    duration: "Varies",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs tracking-widest text-white/60">
            SOVEREIGN COMPLIANCE SYSTEMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            This Cookie Policy explains what cookies are, why they are used, and
            how you can control them when you use our website.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#what-are-cookies"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              What cookies are
            </a>
            <a
              href="#how-we-use"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              How we use cookies
            </a>
            <a
              href="#types"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Types
            </a>
            <a
              href="#controls"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Your controls
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
          <div className="md:col-span-2 space-y-10">
            <section
              id="what-are-cookies"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">What are cookies</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                Cookies are small text files stored on your device when you
                visit a website. They help websites work properly and can also
                support features like remembering preferences or measuring site
                performance.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Similar technologies
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  In addition to cookies, websites may use similar technologies
                  such as local storage, pixels, tags, or SDKs. This policy uses
                  the word cookies to refer to cookies and similar technologies.
                </p>
              </div>
            </section>

            <section
              id="how-we-use"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">How we use cookies</h2>

              <ul className="mt-5 space-y-3 text-white/80">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To support essential site functionality and basic security.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To remember preferences (only if those features are
                    enabled).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To measure site performance and usage (only if analytics are
                    enabled).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                  <span>
                    To support marketing measurement or remarketing (only if
                    enabled).
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-sm text-white/60">
                If you do not want non-essential cookies, you can block them in
                your browser settings. If we add a cookie consent banner in the
                future, you will be able to set preferences there as well.
              </p>
            </section>

            <section
              id="types"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Types of cookies</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                The website may use the following categories of cookies. Some
                categories may not be active at all times.
              </p>

              <div className="mt-6 space-y-4">
                {COOKIE_EXAMPLES.map((row) => (
                  <div
                    key={row.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <p className="text-sm font-semibold text-white">
                        {row.name}
                      </p>
                      <p className="text-xs text-white/60">{row.type}</p>
                    </div>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed">
                      {row.purpose}
                    </p>
                    <p className="mt-3 text-xs text-white/60">
                      Duration:{" "}
                      <span className="text-white/75">{row.duration}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">
                  Third-party cookies
                </p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  If third-party services are enabled (for example analytics,
                  performance tools, or contact form delivery), those providers
                  may set cookies or use similar technologies as part of their
                  service. Their processing is governed by their own policies.
                </p>
              </div>
            </section>

            <section
              id="controls"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">
                How you can control cookies
              </h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                You can control cookies in your browser settings. Most browsers
                allow you to remove existing cookies and block new cookies.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Block or remove cookies
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Use your browser settings to remove cookies or block cookies
                    entirely. This may impact some website features.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Private browsing
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Private browsing modes can limit cookie persistence
                    depending on your browser and settings.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Device controls
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Some devices provide additional privacy controls at the OS
                    level that affect tracking or advertising.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">
                    Consent tools
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    If we use a cookie consent tool, you will be able to set
                    preferences directly on the website.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold">Updates to this policy</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                We may update this Cookie Policy from time to time. Changes will
                be posted on this page with an updated date.
              </p>
            </section>

            <section
              id="contact"
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-xl font-semibold">Contact</h2>

              <p className="mt-3 text-white/80 leading-relaxed">
                If you have questions about this Cookie Policy, contact us:
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/85">
                  Email:{" "}
                  <a
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    href="mailto:jesasolutions@yahoo.com?subject=Cookie%20Policy%20Question"
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
                <li>Cookies support site functionality and performance.</li>
                <li>
                  Some cookies only apply if analytics or marketing tools are
                  enabled.
                </li>
                <li>You can control cookies in your browser settings.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-base font-semibold">Related pages</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
                <li>Legal Notice</li>
                <li>Security Statement</li>
              </ul>

              <p className="mt-4 text-xs text-white/60">
                Next page you want, I generate in the same style.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
