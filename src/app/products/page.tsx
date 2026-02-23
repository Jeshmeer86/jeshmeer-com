import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { products } from "@/content/products";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";
import { site } from "@/content/site";

export default function ProductsPage() {
  return (
    <Container>
      <div className="py-10">
        <div className="glass borderGlow rounded-2xl p-8">
          <div className="kicker text-xs font-semibold text-[rgba(200,162,74,0.95)]">
            Platform modules
          </div>
          <div className="mt-3 text-sm font-semibold text-gold">
            {site.taglineTop}. {site.taglineBottom}.
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Products
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Every product is designed with AI and automation as the first layer, so the system creates less work and more flow.
          </p>
        </div>
      </div>

      <Section
        title="Product list"
        subtitle="Flagship first. Then the core modules. Then add-ons."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <CTA />
      <div className="py-10" />
    </Container>
  );
}
