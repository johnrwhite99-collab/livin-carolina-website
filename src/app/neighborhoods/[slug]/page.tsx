import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNeighborhood, neighborhoods, annualCostRange } from "@/lib/neighborhoods";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(props: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) return {};
  return {
    title: `${neighborhood.name} CDD & HOA Costs`,
    description: neighborhood.summary,
  };
}

export default async function NeighborhoodPage(props: PageProps<"/neighborhoods/[slug]">) {
  const { slug } = await props.params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) notFound();

  const range = annualCostRange(neighborhood);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: neighborhood.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Link href="/neighborhoods" className="text-sm font-medium text-brand-gold-dark">
        &larr; All neighborhoods
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-brand-black sm:text-4xl">{neighborhood.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/70">{neighborhood.summary}</p>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-black text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Line item</th>
              <th className="px-4 py-3 font-semibold">Est. annual cost</th>
            </tr>
          </thead>
          <tbody>
            {neighborhood.costItems.map((item) => (
              <tr key={item.label} className="border-t border-border bg-surface">
                <td className="px-4 py-3 text-brand-black">{item.label}</td>
                <td className="px-4 py-3 text-foreground/70">
                  ${item.annualLow.toLocaleString()}&ndash;${item.annualHigh.toLocaleString()}
                </td>
              </tr>
            ))}
            <tr className="border-t border-border bg-brand-gold/10 font-semibold">
              <td className="px-4 py-3 text-brand-black">Total (est.)</td>
              <td className="px-4 py-3 text-brand-black">
                ${range.low.toLocaleString()}&ndash;${range.high.toLocaleString()}/yr
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-foreground/50">
        Estimates only &mdash; CDD assessments change as bonds amortize and vary by phase/section.
        Confirm current figures for a specific address before making an offer.
      </p>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-brand-black">FAQ</h2>
        <div className="mt-4 space-y-6">
          {neighborhood.faqs.map((faq) => (
            <div key={faq.question}>
              <p className="font-semibold text-brand-black">{faq.question}</p>
              <p className="mt-1 text-foreground/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-6">
        <p className="font-semibold text-brand-black">
          Want the exact CDD assessment for a specific address in {neighborhood.name}?
        </p>
        <Link
          href="/buyers"
          className="mt-4 inline-block rounded-full bg-brand-black px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-black/80"
        >
          Talk to the team
        </Link>
      </div>
    </div>
  );
}
