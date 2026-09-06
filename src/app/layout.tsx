import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { defaultAuthor } from "@/lib/authors";
import { realEstateAgentJsonLd, personJsonLd } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Editorial serif for headlines only — body copy and UI stay on Inter, so
// this is a deliberate accent rather than a wholesale typeface swap.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const siteUrl = process.env.SITE_URL ?? `https://${siteConfig.domain}`;
const defaultTitle = `${siteConfig.editorialBrand} | ${siteConfig.primaryArea} Relocation Guide`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.editorialBrand}`,
  },
  description: siteConfig.tagline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.editorialBrand,
    locale: "en_US",
    title: defaultTitle,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={realEstateAgentJsonLd()} />
        <JsonLd data={personJsonLd(defaultAuthor)} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
