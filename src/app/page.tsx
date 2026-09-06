import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllGuides, getAllBlogPosts, getGuideFrontmatter } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.primaryArea} Relocation Guide`,
  description: siteConfig.tagline,
  path: "/",
});

const decisionCards = [
  { href: "/start-here", title: "Is Charleston Right for You?", description: "Start here if you haven't decided yet." },
  { href: "/cost-of-living", title: "Cost of Living", description: "What actually shows up in the monthly budget." },
  { href: "/moving-to-charleston", title: "Moving to Charleston", description: "Storm season, flood zones, and the logistics." },
  { href: "/charleston-area", title: "Where Should I Live?", description: "How the different parts of the metro compare." },
];

const areaHighlights = [
  { name: "Charleston (peninsula, West Ashley, James Island, Johns Island)", trait: "Closest to downtown employment and the historic core; older housing stock, higher walkability." },
  { name: "Summerville Area (Nexton, Cane Bay, Carnes Crossroads, The Ponds)", trait: "Longer commute to downtown, more new-construction inventory, community fee structures vary by community." },
  { name: "Mount Pleasant", trait: "Across the harbor from the peninsula; distinct commute pattern and price positioning." },
  { name: "North Charleston, Goose Creek, Moncks Corner", trait: "Closer to the aerospace/industrial employment corridor and Joint Base Charleston." },
];

export default function Home() {
  const guides = getAllGuides().filter((g) => g.featured);
  const posts = getAllBlogPosts().slice(0, 3);
  const homeFaqs = ["start-here", "cost-of-living", "moving-to-charleston"]
    .map((slug) => getGuideFrontmatter(slug)?.faq?.[0])
    .filter((faq): faq is { question: string; answer: string } => Boolean(faq));

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            {siteConfig.primaryArea} &middot; Relocation Guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-brand-black sm:text-5xl">
            Thinking About Moving to Charleston? Start Here.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Practical guides to Charleston, Summerville, and the Lowcountry — housing costs,
            communities, new construction, storm season, and the real-world details people
            discover after they start researching a move.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/start-here"
              className="rounded-full bg-brand-black px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-black/80"
            >
              Start Planning Your Move
            </Link>
            <a
              href={siteConfig.bookAZoomUrl}
              className="rounded-full border border-brand-black px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            >
              Book a Zoom With John
            </a>
          </div>
        </div>
      </section>

      {/* Start-here decision cards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-black">Where to start</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {decisionCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand-gold"
            >
              <h3 className="font-semibold text-brand-black group-hover:text-brand-gold-dark">{card.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore the Charleston area */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-brand-black">Explore the Charleston area</h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            How the different parts of the metro compare on commute, housing type, and new-construction
            availability — not a ranking, just the objective differences.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {areaHighlights.map((area) => (
              <div key={area.name} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-semibold text-brand-black">{area.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">{area.trait}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/charleston-area"
              className="rounded-full bg-brand-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-black/80"
            >
              See the full area guide
            </Link>
            <Link
              href="/neighborhoods"
              className="rounded-full border border-brand-black px-5 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            >
              Community cost guides
            </Link>
          </div>
        </div>
      </section>

      {/* Featured guides */}
      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-brand-black">Featured guides</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand-gold"
              >
                {guide.category && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">
                    {guide.category}
                  </p>
                )}
                <h3 className="mt-1 font-semibold text-brand-black group-hover:text-brand-gold-dark">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest content */}
      {posts.length > 0 && (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-brand-black">Latest from the blog</h2>
              <Link href="/blog" className="text-sm font-medium text-brand-gold-dark hover:underline">
                All posts &rarr;
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border bg-background p-5 transition-colors hover:border-brand-gold"
                >
                  <p className="text-xs text-foreground/50">
                    {new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h3 className="mt-1 font-semibold text-brand-black group-hover:text-brand-gold-dark">{post.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest from YouTube */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-black">Latest from YouTube</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Charleston-area walkthroughs and market updates on the {siteConfig.editorialBrand} channel.
        </p>
        <a
          href={siteConfig.youtubeChannelUrl}
          className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
        >
          Watch on YouTube
        </a>
      </section>

      {/* Relocation lead magnet */}
      <section className="border-t border-border bg-brand-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Relocating to {siteConfig.primaryArea}?</h2>
              <p className="mt-2 max-w-xl text-white/70">
                Grab the buyer relocation guide &mdash; neighborhoods, schools, commute times, and the
                real fee math, in one place.
              </p>
            </div>
            <Link
              href="/buyers"
              className="mt-6 inline-block shrink-0 rounded-full bg-brand-gold px-5 py-2.5 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark sm:mt-0"
            >
              Get the guide
            </Link>
          </div>
        </div>
      </section>

      {/* Common questions */}
      {homeFaqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <FAQSection faqs={homeFaqs} title="Common questions" />
        </section>
      )}

      {/* Real-estate CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-brand-black">Ready to talk about the move?</h2>
          <p className="mx-auto mt-2 max-w-xl text-foreground/70">
            No pressure, no script — just a conversation about what you&rsquo;re actually trying to figure out.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.bookAZoomUrl}
              className="rounded-full bg-brand-black px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-black/80"
            >
              Book a Zoom
            </a>
            <Link
              href="/sellers"
              className="rounded-full border border-brand-black px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            >
              Thinking about selling instead?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

