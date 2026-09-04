import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Free Home Valuation",
  description:
    "Get a complimentary preliminary home valuation built from real MLS comps, plus the seller guide.",
};

export default function SellersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            For sellers
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-black">
            What&rsquo;s your home actually worth? Real comps, not a guess.
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Your preliminary valuation is built from real MLS comparables through our CHS MLS
            connection &mdash; not a generic algorithm. You&rsquo;ll also get the seller guide.
          </p>
          <ul className="mt-8 space-y-3 text-foreground/80">
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              A branded CMA report from real, local comps
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              The seller guide &mdash; what actually moves price in this market
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              No obligation, no pressure
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-black">Get my valuation</h2>
          <p className="mt-1 text-sm text-foreground/60">Takes about a minute.</p>
          <div className="mt-6">
            <LeadForm
              funnel="seller"
              submitLabel="Get my free valuation"
              successMessage="Your preliminary valuation and the seller guide are on the way. We'll follow up shortly."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
