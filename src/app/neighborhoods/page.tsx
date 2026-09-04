import Link from "next/link";
import type { Metadata } from "next";
import { neighborhoods, annualCostRange } from "@/lib/neighborhoods";

export const metadata: Metadata = {
  title: "Neighborhood CDD & HOA Cost Guides",
  description:
    "Itemized CDD, HOA, and special assessment breakdowns for Summerville's master-planned communities.",
};

export default function NeighborhoodsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-black">Neighborhood cost guides</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        The sticker price is never the whole story in a CDD community. Here&rsquo;s the itemized,
        all-in annual cost for each neighborhood we cover.
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
                Est. ${range.low.toLocaleString()}&ndash;${range.high.toLocaleString()}/yr in HOA + CDD
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
