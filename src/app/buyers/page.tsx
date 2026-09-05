import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Free Buyer Relocation Guide",
  description:
    "Get the Summerville buyer relocation guide: neighborhoods, schools, commute times, and the real CDD/HOA cost math.",
};

export default function BuyersPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            For buyers &amp; relocations
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-black">
            The free relocation guide that actually explains the numbers.
          </h1>
          <p className="mt-6 text-lg text-foreground/70">
            Schools, commute times, neighborhood personalities &mdash; and the CDD/HOA math nobody
            puts in a brochure. Drop your info and it&rsquo;s on its way.
          </p>
          <ul className="mt-8 space-y-3 text-foreground/80">
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              Neighborhood-by-neighborhood cost breakdowns
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              What CDD fees are, and how they change over time
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold-dark">&#9679;</span>
              A straight answer, not a sales pitch
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-black">Get the guide</h2>
          <p className="mt-1 text-sm text-foreground/60">
            We&rsquo;ll text and email it right over.
          </p>
          <div className="mt-6">
            <LeadForm
              submitLabel="Send me the guide"
              successMessage="The relocation guide is on its way to your inbox. Reply to that email anytime with questions."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
