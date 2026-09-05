import Link from "next/link";
import type { Metadata } from "next";
import { neighborhoods } from "@/lib/neighborhoods";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            {siteConfig.primaryArea} &middot; CDD Communities
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-brand-black sm:text-5xl">
            Nobody tells you the real, all-in cost of a CDD community. We do the math anyway.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            HOA dues are the easy number. CDD assessments and special assessments are the ones that
            surprise people two years in. We break down Nexton, Cane Bay Plantation, Carnes Crossroads,
            and The Ponds line by line &mdash; so you know the number before you sign, not after.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/buyers"
              className="rounded-full bg-brand-black px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-black/80"
            >
              Get the Buyer Relocation Guide
            </Link>
            <Link
              href="/sellers"
              className="rounded-full border border-brand-black px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            >
              Get a Free Home Valuation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-black">Neighborhood cost breakdowns</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Real numbers, not brochure copy. Pick a community to see the itemized HOA + CDD math.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand-gold"
            >
              <h3 className="font-semibold text-brand-black group-hover:text-brand-gold-dark">
                {n.name}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{n.summary}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-gold-dark">
                See the numbers &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-brand-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-bold text-white">Relocating to {siteConfig.primaryArea}?</h3>
            <p className="mt-2 text-white/70">
              Grab the buyer relocation guide &mdash; neighborhoods, schools, commute times, and the
              CDD math, in one place.
            </p>
            <Link
              href="/buyers"
              className="mt-6 inline-block rounded-full bg-brand-gold px-5 py-2.5 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
            >
              Get the guide
            </Link>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-bold text-white">Thinking about selling?</h3>
            <p className="mt-2 text-white/70">
              Get a complimentary preliminary valuation built from real MLS comps &mdash; not an
              algorithm guess.
            </p>
            <Link
              href="/sellers"
              className="mt-6 inline-block rounded-full bg-brand-gold px-5 py-2.5 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
            >
              Get my valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
