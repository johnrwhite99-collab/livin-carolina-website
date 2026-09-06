import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllGuides, getAllBlogPosts, getGuideFrontmatter } from "@/lib/content";
import { defaultAuthor } from "@/lib/authors";
import { buildMetadata } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { HeroPhoto } from "@/components/HeroPhoto";
import { AuthorTrust } from "@/components/AuthorTrust";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.primaryArea} Relocation Guide`,
  description: siteConfig.tagline,
  path: "/",
});

// Set once a real photo lands in public/images/ — see README for the exact
// dimensions HeroPhoto expects. Left undefined renders the placeholder.
const HERO_IMAGE_SRC: string | undefined = undefined;

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
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <svg
          className="pointer-events-none absolute -bottom-6 -left-10 h-40 w-64 opacity-[0.07]"
          viewBox="0 0 300 120"
          aria-hidden="true"
        >
          <path
            d="M0 60 Q 37.5 30 75 60 T 150 60 T 225 60 T 300 60"
            fill="none"
            stroke="var(--brand-gold)"
            strokeWidth="6"
          />
          <path
            d="M0 90 Q 37.5 60 75 90 T 150 90 T 225 90 T 300 90"
            fill="none"
            stroke="var(--brand-black)"
            strokeWidth="6"
          />
        </svg>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
              {siteConfig.primaryArea} &middot; Relocation Guide
            </p>
            <h1 className="mt-4 font-display max-w-xl text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
              Thinking About Moving to Charleston? Start Here.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70">
              Housing costs, communities, new construction, storm season — the practical details
              people usually find out the hard way, written down before you need them.
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
          <HeroPhoto src={HERO_IMAGE_SRC} alt="Charleston, SC" priority />
        </div>
      </section>

      {/* Start-here decision cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold text-brand-black">Where to start</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {decisionCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-md"
            >
              <h3 className="font-semibold text-brand-black group-hover:text-brand-gold-dark">{card.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Author / trust */}
      <AuthorTrust author={defaultAuthor} />

      {/* Explore the Charleston area */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold text-brand-black">Explore the Charleston area</h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            How the different parts of the metro compare on commute, housing type, and new-construction
            availability — not a ranking, just the objective differences.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {areaHighlights.map((area) => (
              <div key={area.name} className="rounded-xl border border-border bg-surface p-5">
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
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-brand-black">Featured guides</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${guide.slug}`}
                  className="group rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-md"
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
          </div>
        </section>
      )}

      {/* Latest content */}
      {posts.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-brand-black">Latest from the blog</h2>
              <Link href="/blog" className="text-sm font-medium text-brand-gold-dark hover:underline">
                All posts &rarr;
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-md"
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
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold text-brand-black">Latest from YouTube</h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Charleston-area walkthroughs and market updates on the {siteConfig.editorialBrand} channel.
          </p>
          <a
            href={siteConfig.youtubeChannelUrl}
            className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
          >
            Watch on YouTube
          </a>
        </div>
      </section>

      {/* Relocation lead magnet */}
      <section className="border-t border-border bg-brand-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-white">Relocating to {siteConfig.primaryArea}?</h2>
              <p className="mt-2 max-w-xl text-white/70">
                Grab the buyer relocation guide &mdash; housing types, commute patterns, and the real
                fee math, in one place.
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
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <FAQSection faqs={homeFaqs} title="Common questions" />
        </section>
      )}

      {/* Real-estate CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-black">Ready to talk about the move?</h2>
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
