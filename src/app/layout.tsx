import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { MagneticCursor } from "@/components/MagneticCursor";
import { Footer } from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/content/site";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeshmeer.com"),
  title: {
    default: "Sovereign Compliance Systems",
    template: "%s | Sovereign Compliance Systems",
  },
  description:
    "Governance, proof, and control. We design and build compliance grade software for high value transactions, with audit ready traceability, automated workflows, and evidence you can rely on. Built for reputable, branded businesses.",
  openGraph: {
    title: "Sovereign Compliance Systems",
    description:
      "Governance, proof, and control. We design and build compliance grade software for high value transactions, with audit ready traceability, automated workflows, and evidence you can rely on. Built for reputable, branded businesses.",
    url: "https://jeshmeer.com",
    siteName: "Sovereign Compliance Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Compliance Systems",
    description:
      "Governance, proof, and control. We design and build compliance grade software for high value transactions, with audit ready traceability, automated workflows, and evidence you can rely on. Built for reputable, branded businesses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body suppressHydrationWarning>
        <ClerkProvider>
          <MagneticCursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
