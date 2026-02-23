import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { MagneticCursor } from "@/components/MagneticCursor";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

const manrope = Manrope({ subsets: ["latin"], weight: ["300","400","500","600","700"] });

export const metadata: Metadata = {
  title: site.name,
  description: `${site.taglineTop}. ${site.taglineBottom}. ${site.headline}`,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: site.name,
    description: `${site.taglineTop}. ${site.taglineBottom}. ${site.headline}`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <Preloader />
        <MagneticCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
