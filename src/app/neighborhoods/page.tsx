import Link from "next/link";
import type { Metadata } from "next";
import { neighborhoods, annualCostRange } from "@/lib/neighborhoods";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Charleston-Area Community Cost Guides",
  description:
    "Itemized HOA, POA, and special-district fee breakdowns for Summerville-area master-planned communities — verified where we have sources, flagged clearly where we don't.",
  path: "/neighborhoods",
});

export default function NeighborhoodsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-black">Community cost guides</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        The sticker price is never the whole story in a master-planned community. Here&rsquo;s what
        we actually know about fees for each community we cover — and what&rsquo;s still unverified.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {neighborhoods.map((n) => {
          const range = annualCostRange(n);
          return (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-gold"
            >
              <h2 className="text-xl font-semibold text-brand-black">{n.name}</h2>
              <p className="mt-2 text-sm text-foreground/70">{n.summary}</p>
              <p className="mt-4 text-sm font-medium text-brand-gold-dark">
                {range.hasFigures
                  ? `Est. $${range.low.toLocaleString()}–$${range.high.toLocaleString()}/yr in fees`
                  : "Fee figures not yet verified"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
