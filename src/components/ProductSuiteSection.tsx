import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { products } from "@/content/products";
import { ProductCard } from "@/components/ProductCard";

function byTier(a: (typeof products)[number], b: (typeof products)[number]) {
  const rank = (t: string) => (t === "Flagship" ? 0 : t === "Core" ? 1 : 2);
  return rank(a.priceTier) - rank(b.priceTier);
}

export function ProductSuiteSection() {
  const sorted = [...products].sort(byTier);

  const flagship = sorted.filter((p) => p.priceTier === "Flagship");
  const core = sorted.filter((p) => p.priceTier === "Core");
  const addOns = sorted.filter((p) => p.priceTier === "Add-on");

  return (
    <Section
      title="Product Suite"
      subtitle="Flagship platform, core modules, and add-ons. Built for ambitious businesses."
    >
      <Container>
        {/* Flagship */}
        {flagship.length > 0 && (
          <div className="mb-8" data-reveal>
            <div className="kicker text-[10px] font-semibold text-muted">
              Flagship
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {flagship.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* Core */}
        {core.length > 0 && (
          <div className="mb-8" data-reveal>
            <div className="kicker text-[10px] font-semibold text-muted">
              Core modules
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {core.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {addOns.length > 0 && (
          <div className="mb-8" data-reveal>
            <div className="kicker text-[10px] font-semibold text-muted">
              Add-ons
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {addOns.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* Shortcuts */}
        <div className="grid gap-4 md:grid-cols-2" data-reveal>
          <Card>
            <div className="text-sm font-semibold">Automation & AI</div>
            <p className="mt-2 text-sm text-muted">
              Automate business workflows, reduce manual work, and unlock new
              capabilities with AI.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/ai-automation" variant="secondary">
                See AI Automation
              </Button>
              <Button href="/contact" variant="primary">
                Start your project
              </Button>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold">How we work</div>
            <p className="mt-2 text-sm text-muted">
              Premium, direct, and software-focused. No agency fluff.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/how-we-work" variant="secondary">
                How we work
              </Button>
              <Button href="/contact" variant="primary">
                Start your project
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-reveal>
          <Button href="/products" variant="secondary">
            View full product list
          </Button>
          <Button href="/contact" variant="primary">
            Start your project
          </Button>
        </div>
      </Container>
    </Section>
  );
}
