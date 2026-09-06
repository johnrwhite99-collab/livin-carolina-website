# John in Charleston

A Charleston-area relocation knowledge site — practical guides to moving to
Charleston, Summerville, and the Lowcountry, run editorially under "John in
Charleston" but affiliated with the Livin' Carolina Team at Realty ONE Group
Coastal. Modeled on livinginhawaii.com's information architecture and user
journey (not its design, copy, or code): answer the questions a relocation
buyer has *before* they call an agent, rather than leading with listings.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + MDX.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` if you want a real `SITE_URL` locally —
otherwise the site runs fine with no env vars set at all. There's no CRM API
key to manage; both lead funnels redirect externally (see below).

## Content model

Two different kinds of content live in two different places — don't put one
in the other:

- **Editorial prose** (pillar guides, blog posts) is **MDX**, in `content/guides/*.mdx`
  and `content/blog/*.mdx`. Frontmatter carries metadata (title, description,
  category, author, dates, `featured`, `draft`, `faq`, etc.) — see
  `DocFrontmatter` in `src/lib/content.ts` for the full shape. The body is
  Markdown, and can use the shared components registered in
  `src/components/mdx-components.tsx` directly, e.g. `<Callout>`,
  `<FactCard facts={[...]} />`, `<SourceNote sources={[...]} />`.
- **Verifiable facts** (community fees, geographic hierarchy, author info)
  are **structured TypeScript data** in `src/lib/`: `neighborhoods.ts`,
  `areas.ts`, `authors.ts`. This is what should change when a fact gets
  verified, not prose.

### Adding a blog post
Create `content/blog/your-slug.mdx` with frontmatter matching the shape in
`src/lib/content.ts`, write the body in Markdown, set `draft: false` when
ready. It shows up in `/blog`, the sitemap, and the homepage's "Latest from
the blog" automatically — no other file needs to change.

### Adding a pillar guide
Same idea under `content/guides/`, but each pillar is still its own route
(`src/app/start-here/page.tsx`, etc. — thin wrappers around the shared
`GuidePage` component in `src/components/GuidePage.tsx`) rather than a
generic `[slug]` route, so a new pillar needs one new route file plus the
MDX content file, and a line added to `src/app/sitemap.ts`.

### The critical rule on factual content
**Do not invent HOA, CDD, tax, insurance, pricing, school, market, builder,
commute, or assessment figures.** South Carolina communities can carry
several legally distinct fee mechanisms at once (HOA, POA, regime fee,
improvement district, special assessment, special tax district, or an
actual CDD) — these are not interchangeable, and "CDD" is not a generic
label for "master-planned-community fee." Every `CommunityFeeItem` in
`neighborhoods.ts` has a `status: "verified" | "estimated" | "unverified"`
field — leave it `"unverified"` rather than guessing, and the community
page will visibly badge it as such instead of presenting a guess as fact.

## Site structure

- `src/app/page.tsx` — home (relocation portal: hero, start-here decision
  cards, area explorer, featured guides, latest posts, YouTube, lead magnet,
  FAQ, real-estate CTA)
- `src/app/start-here/`, `/moving-to-charleston/`, `/cost-of-living/` —
  pillar guide pages (MDX-backed via `GuidePage`)
- `src/app/charleston-area/` — geographic area hub (`src/lib/areas.ts`)
- `src/app/neighborhoods/` — community fee-cost pages for Nexton, Cane Bay
  Plantation, Carnes Crossroads, The Ponds (`src/lib/neighborhoods.ts`)
- `src/app/blog/` — MDX-backed blog
- `src/app/videos/` — links out to the real YouTube channel
- `src/app/about/` — author page
- `src/app/buyers/`, `src/app/sellers/` — each a marketing page with a
  single CTA that redirects to a Lofty-hosted page; no lead capture happens
  on this site
- `src/lib/site-config.ts` — brand name, brokerage compliance line, contact
  info, colors, and every external URL (Lofty redirects, Book a Zoom,
  YouTube channel) — edit this rather than hunting for hardcoded strings
- `src/lib/seo.ts`, `src/lib/schema.ts` — shared metadata builder and
  JSON-LD builders; every page should use these rather than hand-rolling
  metadata (Next.js doesn't deep-merge nested `openGraph` across segments,
  which is why `buildMetadata()` re-specifies the constant parts every call)

## Lofty CRM

Both the buyer and seller funnels redirect to pages already hosted on the
team's Lofty site — Lofty handles lead capture and the nurture drip
natively, with no API integration on this side to keep working. See
`docs/lofty-integration.md` for the URLs and why this approach was chosen
over a custom API integration.

## SEO / indexing

See `docs/seo-indexing.md` for canonical-host handling, the robots.txt
AI-crawler policy (GPTBot and OAI-SearchBot both explicitly allowed), and
the planned IndexNow setup.

## Deploying

`netlify.toml` is set up for Netlify's zero-config Next.js support
(`@netlify/plugin-nextjs`) and an explicit `www` → apex redirect. Connect
the repo in Netlify and deploy — no environment variables are required.

## Content still needed

- Real fee figures and confirmed fee-type classifications in
  `src/lib/neighborhoods.ts` (currently `"unverified"` — see the critical
  rule above)
- Real logo/imagery in `public/` (currently text-only branding)
- Phase 2 content: remaining pillar pages (new construction, PCS/military
  relocation, buying in SC), more communities, and the Charleston True
  Cost / Carrying Cost calculator (the first interactive tool — the
  homepage Tools section stays hidden until it exists)
