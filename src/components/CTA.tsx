import { Button } from "./Button";
import { site } from "@/content/site";

export function CTA() {
  return (
    <div className="glass borderGlow rounded-2xl p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="kicker text-xs font-semibold text-gold">
            High value delivery
          </div>
          <div className="mt-3 text-sm font-semibold text-gold">
            {site.taglineTop}. {site.taglineBottom}.
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-tight">
            Build a system that creates less work and more flow.
          </div>
          <div className="mt-2 text-sm text-muted">
            {site.pricingNote}. We work with reputable, branded businesses.
          </div>
        </div>
        <div className="flex gap-3">
          <Button href="/contact" variant="primary">
            Request a private consult
          </Button>
          <Button href="/products" variant="secondary">
            View products
          </Button>
        </div>
      </div>
    </div>
  );
}
