import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.SITE_URL ?? `https://${siteConfig.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.teamName} | ${siteConfig.primaryArea} Real Estate`,
    template: `%s | ${siteConfig.teamName}`,
  },
  description: siteConfig.tagline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.teamName,
    locale: "en_US",
    title: `${siteConfig.teamName} | ${siteConfig.primaryArea} Real Estate`,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.teamName} | ${siteConfig.primaryArea} Real Estate`,
    description: siteConfig.tagline,
  },
};

const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.teamName,
  areaServed: [siteConfig.primaryArea, ...siteConfig.extendedAreas],
  parentOrganization: {
    "@type": "Organization",
    name: siteConfig.brokerageName,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
