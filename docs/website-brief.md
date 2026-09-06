# Website Brief — John in Charleston

## What this site is

A Charleston-area relocation and real-estate knowledge site, published under
the editorial brand **John in Charleston**, run by John White of the **Livin'
Carolina Team at Realty ONE Group Coastal**. The information architecture and
user journey are inspired by livinginhawaii.com — answer the questions a
relocation buyer has *before* they call an agent, rather than leading with
listings — but the site's design, copy, and code are original, not copied.

The brokerage affiliation stays visible sitewide (header subline, footer
compliance line, `RealEstateAgent`/`Person` JSON-LD) per Realty ONE Group
Coastal's association rules. John in Charleston is the public-facing brand;
the brokerage relationship is disclosed, not hidden.

## Primary focus

The Charleston metro / Lowcountry: Charleston (peninsula, West Ashley, James
Island, Johns Island), the Summerville area (Nexton, Cane Bay Plantation,
Carnes Crossroads, The Ponds), Mount Pleasant, North Charleston, Goose Creek,
and Moncks Corner. This is not a statewide or regional SEO play — content
and the public service-area claims (footer, structured data) stay scoped to
this metro.

## Core differentiator(s)

Real cost transparency is **one** differentiator, not the whole site. South
Carolina master-planned communities can carry several legally distinct fee
mechanisms at once — HOA, POA, regime fee, an Improvement District, a
Municipal Improvement District, a special assessment, a special tax
district, or an actual Community Development District (CDD). These are not
interchangeable, and "CDD" is not a generic label for "master-planned-
community fee." Every community fee record is typed by mechanism and carries
a `verified` / `estimated` / `unverified` status — never a guess presented as
fact.

Beyond cost math, the site's broader value is being a genuinely useful,
well-organized answer to "should I move to Charleston, and where" — covering
relocation logistics, cost of living, and objective area comparisons, built
out incrementally as real, verified content rather than mass-generated thin
pages.

## Content and editorial rules

- **No invented factual figures.** HOA/POA/CDD/tax/insurance/pricing/school/
  market/builder/commute/assessment numbers are either sourced and marked
  `verified`, a clearly-labeled `estimated` range, or left `unverified` and
  visibly badged as such. Never presented as fact without a source.
- **No mass-generated location pages.** A new area or community gets a page
  when there's real, verified content for it — not to pad the sitemap.
- **Fair Housing compliant.** Area and community descriptions are objective
  (commute pattern, housing stock, fee structure, flood exposure) — never
  "best for families," "good schools," "safe neighborhood," or other
  steering/demographic-targeting language.
- **Content model**: long-form editorial prose (pillar guides, blog posts) is
  MDX under `content/`; verifiable facts (fees, geography, author info) are
  structured TypeScript data under `src/lib/`; shared components handle
  presentation. No CMS, no database — see `README.md` for the full model.

## Information architecture

Primary nav: Start Here / Moving / Cost of Living / Charleston Area / Blog /
Videos, plus a persistent "Book a Zoom" CTA
(`siteConfig.bookAZoomUrl` = `https://johnwhite.charlestonarealiving.com/book-a-zoom-call`).
Buyers/Sellers are secondary (footer + homepage real-estate CTA), each
redirecting to an existing Lofty-hosted page — no lead capture happens on
this site itself.

Geographic hierarchy (`src/lib/areas.ts`): Charleston Metro → Charleston /
Summerville Area / Goose Creek / North Charleston / Moncks Corner / Mount
Pleasant, with sub-areas nested underneath. This hierarchy is an editorial/
navigation grouping, kept explicitly separate from legal jurisdiction facts
(`GeoFacts` on each community record — mailing city, municipality, county —
which default to unverified/blank rather than inferred from the grouping).

## Brand voice

Clarity over perfection. Direct, transparent, math-and-fact-driven — no
"your dream home awaits" real estate cliché copy.

## Decisions on record

- **Team/business name:** Livin' Carolina Team at Realty ONE Group Coastal
- **Editorial brand:** John in Charleston
- **Compliance requirement:** brokerage name (Realty ONE Group Coastal) must
  appear on the site, per association rules
- **Brand colors:** black (#000000) and gold (#c5a95e)
- **Domain:** johnincharleston.com (live on Netlify)
- **Lead funnels:** buyer and seller pages each redirect to an existing
  Lofty-hosted landing page (see `docs/lofty-integration.md`) — Lofty owns
  lead capture and the nurture drip natively; there is no custom CRM API
  integration on this site
- **Book a Zoom:** `siteConfig.bookAZoomUrl` is the single source of truth
  for this URL; every CTA reuses it rather than hardcoding a copy

## Phase status

**Phase 1 (shipped):** content model, geographic and fee-taxonomy data
models, shared components, SEO/schema utilities, the relocation-portal
homepage, the Start Here / Moving / Cost of Living pillar guides, the
Charleston area hub, and the upgraded neighborhood/blog templates.

**Phase 2 (planned, not started):** the Charleston True Cost / Carrying Cost
Calculator — the first interactive tool, which is also what unlocks adding a
homepage "Tools" section (that section stays absent until a real tool
exists) — plus additional pillar content (new construction, PCS/military
relocation, buying in SC) and additional community guides, built out as real
content is researched and verified rather than generated in bulk.

## Still open

- Real, sourced fee figures and confirmed fee-type classifications for most
  communities in `src/lib/neighborhoods.ts` (currently `"unverified"`)
- Real logo/imagery in `public/` (currently text-only branding)
- A real contact phone number in `src/lib/site-config.ts` (currently blank)
