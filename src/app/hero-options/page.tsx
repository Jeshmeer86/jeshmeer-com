import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import Link from "next/link";
import Image from "next/image";

const options = [
  {
    key: "loop",
    label: "Cinematic loop (animated)",
    src: "/hero/hero-loop.webp",
  },
  { key: "car", label: "Car focus", src: "/hero/hero-car.jpg" },
  { key: "skyline", label: "Dubai skyline", src: "/hero/hero-skyline.jpg" },
  { key: "abstract", label: "Abstract luxury", src: "/hero/hero-abstract.jpg" },
];

export default function HeroOptionsPage() {
  return (
    <Container>
      <div className="py-10">
        <div className="glass borderGlow rounded-2xl p-8">
          <div className="kicker text-xs font-semibold text-gold">
            Hero background options
          </div>
          <div className="mt-3 text-sm font-semibold text-gold">
            {site.taglineTop}. {site.taglineBottom}.
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Choose a cinematic hero
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Pick the option you want and tell me the key: loop, car, skyline, or
            abstract.
          </p>
        </div>
      </div>

      <Section
        title="Options"
        subtitle="These are included in your project and can be swapped in seconds."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {options.map((o) => (
            <div
              key={o.key}
              className="glass borderGlow rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={o.src}
                  className="h-48 w-full object-cover"
                  alt={o.label}
                  width={600}
                  height={192}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-sm font-semibold">{o.label}</div>
                <div className="mt-1 text-xs text-muted">Key: {o.key}</div>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/"
                    className="rounded-2xl border border-line bg-bg/30 px-4 py-2 text-sm font-semibold hover:border-gold"
                    data-magnetic
                  >
                    Use on home
                  </Link>
                  <Link
                    href={o.src}
                    className="text-sm font-semibold text-gold hover:opacity-90"
                    data-magnetic
                  >
                    Open image
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="py-10" />
    </Container>
  );
}
