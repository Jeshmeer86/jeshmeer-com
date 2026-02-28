import Link from "next/link";

export default function TrustCenterPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Trust Center</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What We Implement</h2>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li>
            Privacy policy framework aligned to UAE PDPL-style transparency
            expectations
          </li>
          <li>
            Cookie consent banner + preference controls (essential vs optional)
          </li>
          <li>
            Terms &amp; Conditions designed for online journeys (forms,
            bookings, deposits, portals)
          </li>
          <li>
            Data capture minimization (only collect what is needed) and
            retention notes
          </li>
          <li>
            Audit trail options for key user actions (consent, submissions,
            approvals)
          </li>
          <li>
            Evidence pack documentation for internal governance and
            accountability
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What Laws This Supports</h2>
        <p className="text-base text-muted mb-2">
          Our compliance approach is designed to support UAE digital commerce
          and data protection requirements at a high level. We do not claim
          legal certification, but implement best-practice controls for
          transparency, privacy, and accountability.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What We Do Not Claim</h2>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li>
            We do not provide legal advice or guarantee regulatory approval.
          </li>
          <li>
            We do not claim to replace your own legal review or compliance
            obligations.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Why Legal Pages Matter</h2>
        <p className="text-base text-muted mb-2">
          Having clear and accessible Privacy Policy, Cookie Policy, and Terms
          &amp; Conditions pages helps support compliance and signals that
          Sovereign Compliance Systems (jeshmeer.com) operates with
          transparency, integrity, and professional ethics.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li>Respect user privacy and handle data responsibly</li>
          <li>Are transparent about cookies and tracking technologies</li>
          <li>
            Set clear expectations and responsibilities for users and customers
          </li>
        </ul>
        <p className="text-base text-muted mt-2">
          Incorporating these legal pages shows that your organization takes
          compliance seriously and follows best-practice digital governance,
          reinforcing trust with clients and partners.
        </p>
      </section>
      <div className="mt-8">
        <Link href="/" className="text-gold font-semibold hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
