import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNeighborhood, neighborhoods, annualCostRange } from "@/lib/neighborhoods";
import { getAllBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { FAQSection } from "@/components/FAQSection";
import { RelatedContent } from "@/components/RelatedContent";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(props: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) return {};
  return buildMetadata({
    title: `${neighborhood.name} Fees & Costs`,
    description: neighborhood.summary,
    path: `/neighborhoods/${neighborhood.slug}`,
  });
}

const STATUS_LABEL: Record<string, string> = {
  verified: "Verified",
  estimated: "Estimated",
  unverified: "Unverified",
};

const STATUS_STYLE: Record<string, string> = {
  verified: "bg-green-100 text-green-800",
  estimated: "bg-amber-100 text-amber-900",
  unverified: "bg-red-100 text-red-800",
};

export default async function NeighborhoodPage(props: PageProps<"/neighborhoods/[slug]">) {
  const { slug } = await props.params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) notFound();

  const range = annualCostRange(neighborhood);
  const relatedPosts = getAllBlogPosts().filter((p) => p.slug.includes("cdd"));

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={faqPageJsonLd(neighborhood.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Communities", path: "/neighborhoods" },
          { name: neighborhood.name, path: `/neighborhoods/${neighborhood.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Communities", href: "/neighborhoods" },
          { label: neighborhood.name, href: `/neighborhoods/${neighborhood.slug}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-brand-black sm:text-4xl">{neighborhood.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/70">{neighborhood.summary}</p>

      {!range.hasFigures && (
        <Callout type="unverified" title="No verified fee figures yet" >
          We don&rsquo;t have confirmed dollar amounts for {neighborhood.name} yet. The table below
          shows what fee mechanisms apply and what still needs verification — not estimated numbers
          presented as fact.
        </Callout>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-black text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Fee</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Est. annual</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {neighborhood.feeItems.map((item) => (
              <tr key={item.label} className="border-t border-border bg-surface align-top">
                <td className="px-4 py-3 text-brand-black">
                  {item.label}
                  {item.subsection && <span className="block text-xs text-foreground/50">{item.subsection}</span>}
                  {item.note && <span className="mt-1 block text-xs text-foreground/50">{item.note}</span>}
                </td>
                <td className="px-4 py-3 text-foreground/70">{item.entityName ?? item.feeType}</td>
                <td className="px-4 py-3 text-foreground/70">
                  {item.annualLow != null && item.annualHigh != null
                    ? `$${item.annualLow.toLocaleString()}–$${item.annualHigh.toLocaleString()}`
                    : "Not yet verified"}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLE[item.status]}`}>
                    {STATUS_LABEL[item.status]}
                  </span>
                </td>
              </tr>
            ))}
            {range.hasFigures && (
              <tr className="border-t border-border bg-brand-gold/10 font-semibold">
                <td className="px-4 py-3 text-brand-black" colSpan={2}>
                  Total (verified/estimated items only)
                </td>
                <td className="px-4 py-3 text-brand-black" colSpan={2}>
                  ${range.low.toLocaleString()}–${range.high.toLocaleString()}/yr
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-foreground/50">
        Fee mechanisms in South Carolina master-planned communities vary — HOA, POA, regime fee,
        improvement district, special assessment, and special purpose/tax district are legally
        distinct and a single community can carry more than one. (A Community Development District,
        or CDD, is a Florida-specific structure that South Carolina doesn&rsquo;t use.) Confirm current
        figures for a specific address before making an offer.
      </p>

      <FAQSection faqs={neighborhood.faqs} />

      <RelatedContent
        items={relatedPosts.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, description: p.description }))}
      />

      <div className="mt-12 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-6">
        <p className="font-semibold text-brand-black">
          Want the exact fee structure for a specific address in {neighborhood.name}?
        </p>
        <a
          href="/buyers"
          className="mt-4 inline-block rounded-full bg-brand-black px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-black/80"
        >
          Talk to the team
        </a>
      </div>
    </div>
  );
}
