import type { MetadataRoute } from "next";
import { products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const now = new Date();

  const productUrls = products.map((p) => ({
    url: base + `/products/${p.slug}`,
    lastModified: now,
  }));

  return [
    { url: base, lastModified: now },
    { url: base + "/products", lastModified: now },
    { url: base + "/hero-options", lastModified: now },
    ...productUrls,
    { url: base + "/ai-automation", lastModified: now },
    { url: base + "/how-we-work", lastModified: now },
    { url: base + "/security-assurance", lastModified: now },
    { url: base + "/company", lastModified: now },
    { url: base + "/contact", lastModified: now },
    { url: base + "/industries/luxury-automotive", lastModified: now },
    { url: base + "/industries/luxury-property", lastModified: now },
    { url: base + "/industries/hospitals-medical-centers", lastModified: now },
  ];
}
