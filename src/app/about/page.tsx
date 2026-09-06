import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { defaultAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/JsonLd";
import { personJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: `About ${defaultAuthor.name}`,
  description: defaultAuthor.bio,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={personJsonLd(defaultAuthor)} />
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">About</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-black">{defaultAuthor.name}</h1>
      <p className="mt-2 text-lg text-foreground/60">{defaultAuthor.role}</p>
      <p className="mt-6 text-lg leading-relaxed text-foreground/80">{defaultAuthor.bio}</p>
      <p className="mt-8 rounded-xl border border-border bg-surface p-5 text-sm text-foreground/70">
        {defaultAuthor.name} is affiliated with {defaultAuthor.brokerageAffiliation}.{" "}
        {siteConfig.compliance.equalHousing}.
      </p>
      <a
        href={siteConfig.bookAZoomUrl}
        className="mt-8 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
      >
        Book a Zoom with {defaultAuthor.name.split(" ")[0]}
      </a>
    </div>
  );
}
