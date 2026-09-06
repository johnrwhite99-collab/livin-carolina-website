import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Buyer Relocation Guide",
  description:
    "Get the Charleston-area buyer relocation guide: housing types, commute patterns, and the real HOA/POA and carrying-cost math.",
  alternates: { canonical: "/buyers" },
};

export default function BuyersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            For buyers &amp; relocations
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-black">
            The free relocation guide that actually explains the numbers.
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Commute patterns, housing types, community characteristics &mdash; and the HOA/POA and
            special-assessment math nobody puts in a brochure.
          </p>
          <ul className="mt-8 space-y-3 text-foreground/80">
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              Community-by-community cost breakdowns
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              What HOA, POA, and special-assessment fees are, and how they can change over time
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              A straight answer, not a sales pitch
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-brand-black">Get the guide</h2>
          <p className="mt-1 text-sm text-foreground/60">
            We&rsquo;ll text and email it right over.
          </p>
          <a
            href={siteConfig.buyerRelocationGuideUrl}
            className="mt-6 inline-block w-full rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
          >
            Send me the guide
          </a>
          <p className="mt-3 text-xs text-foreground/50">
            Opens the relocation guide sign-up &mdash; drop your info there to get it sent over.
          </p>
        </div>
      </div>
    </div>
  );
}
