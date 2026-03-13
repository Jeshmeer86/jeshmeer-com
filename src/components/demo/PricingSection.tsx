import React from "react";

const plans = [
  {
    name: "Foundation",
    price: "AED 1,250 / month",
    description:
      "For a single branch that needs controlled deal tracking and exportable evidence.",
    features: [
      "Deal dashboard",
      "Status tracking",
      "Notes and documents",
      "Evidence export",
      "1 branch",
    ],
    cta: "Request walkthrough",
    featured: false,
    badge: null,
  },
  {
    name: "Control",
    price: "AED 2,950 / month",
    description:
      "For dealerships that need stronger approvals, reporting, and operational oversight.",
    features: [
      "Everything in Foundation",
      "Approval workflow",
      "Branded exports",
      "Enhanced permissions",
      "Priority onboarding",
      "Operational reporting",
    ],
    cta: "Request walkthrough",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Command",
    price: "AED 5,900 / month",
    description:
      "For multi-branch groups that need custom workflows, executive visibility, and rollout support.",
    features: [
      "Everything in Control",
      "Multi-branch setup",
      "Custom workflow stages",
      "Integration support",
      "Executive oversight",
      "Priority support",
    ],
    cta: "Request walkthrough",
    featured: false,
    badge: null,
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black via-zinc-950 to-black px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-3 tracking-tight">
          Subscription options
        </h2>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto opacity-90">
          Choose the level of operational control, reporting, and rollout
          support that fits your dealership.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={
              "flex flex-col flex-1 min-w-[260px] max-w-md rounded-2xl border shadow-xl px-7 py-8 bg-black/80 border-zinc-800 " +
              (plan.featured
                ? "ring-2 ring-gold border-gold/60 z-10 scale-105 md:scale-110 shadow-2xl"
                : "")
            }
            style={{
              minHeight: 480,
              boxShadow: plan.featured
                ? "0 8px 32px 0 rgba(255, 215, 0, 0.10)"
                : undefined,
            }}
          >
            {plan.badge && (
              <div className="mb-3">
                <span className="inline-block rounded-full bg-gold/90 text-black text-xs font-semibold px-4 py-1 shadow">
                  {plan.badge}
                </span>
              </div>
            )}
            <div className="mb-2 text-xl font-bold text-gold tracking-wide uppercase">
              {plan.name}
            </div>
            <div className="mb-2 text-2xl font-extrabold text-white tracking-tight">
              {plan.price}
            </div>
            <div className="mb-4 text-zinc-300 text-sm min-h-[48px] opacity-90">
              {plan.description}
            </div>
            <ul className="mb-6 flex-1 flex flex-col gap-2 text-left">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-zinc-200 text-sm"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-gold/80" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={
                "mt-auto w-full rounded-lg px-6 py-3 font-semibold text-base transition-all " +
                (plan.featured
                  ? "bg-gold text-black shadow-lg hover:bg-gold/90"
                  : "bg-zinc-900 text-gold border border-gold/40 hover:bg-zinc-800")
              }
              style={{ minHeight: 48 }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 text-zinc-400 text-sm text-center max-w-2xl mx-auto opacity-80">
        Setup and onboarding priced separately. Private rollout available for
        multi-branch groups.
      </div>
    </section>
  );
}
