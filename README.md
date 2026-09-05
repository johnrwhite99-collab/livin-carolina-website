# Livin' Carolina Team — website

Lead-capture site for the Livin' Carolina Team at Realty ONE Group Coastal.
Built around the team's core differentiator: itemized, real-number CDD/HOA
cost breakdowns for Summerville's master-planned communities, feeding a
buyer funnel into Lofty CRM and a seller funnel into a Lofty-hosted
valuation tool.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` and fill in values as they become
available — the site runs fine with it blank (the buyer form still submits,
it just doesn't reach Lofty until the key is set; see below).

## Site structure

- `src/app/page.tsx` — home
- `src/app/neighborhoods/` — cost-breakdown pages for Nexton, Cane Bay
  Plantation, Carnes Crossroads, The Ponds (`src/lib/neighborhoods.ts` holds
  the data — update the placeholder dollar figures with real CDD/HOA numbers
  before launch)
- `src/app/buyers/` — buyer lead funnel (captures the lead on-site)
- `src/app/sellers/` — seller funnel; the page itself just links out to
  `siteConfig.sellerValuationUrl`, a Lofty-hosted valuation tool — no custom
  integration on our side for sellers
- `src/app/blog/`, `src/app/videos/` — blog and video hub (seed content only)
- `src/app/api/leads/route.ts` — buyer form submissions land here, then get
  pushed to Lofty
- `src/lib/lofty.ts` — the buyer-funnel Lofty integration (see
  `docs/lofty-integration.md`)
- `src/lib/site-config.ts` — brand name, brokerage compliance line, contact
  info, colors, the seller valuation URL — edit this rather than hunting for
  hardcoded strings

## Integrations

### Lofty CRM

Two different paths, deliberately:

- **Buyer funnel** (`/buyers`) — the form posts to Lofty's API
  (`src/lib/lofty.ts`), tagged so Lofty's own triggers/automations run the
  nurture drip.
- **Seller funnel** (`/sellers`) — no API integration at all. The page
  redirects to a Lofty-hosted valuation page, so Lofty captures the lead
  and runs its drip natively.

**Read `docs/lofty-integration.md` before launch** — it covers the required
Lofty-side setup for the buyer funnel, flags that the request payload shape
hasn't been verified against Lofty's authenticated API reference, and notes
a real issue hit while building this: env vars set through Claude's Netlify
connector didn't actually persist — set `LOFTY_API_KEY` directly in
Netlify's UI instead (Site configuration → Environment variables).

### Buyer relocation guide

The team's current guide (older version, standing in for the updated one
pending team-leader sign-off) is delivered as a step in the Lofty drip
triggered off the buyer funnel — not a direct file download on the site.
See `docs/lofty-integration.md` for why, and swap in the updated guide in
Lofty (not in this repo) once it's approved.

## Deploying

`netlify.toml` is set up for Netlify's zero-config Next.js support
(`@netlify/plugin-nextjs`). Connect the repo in Netlify, set `LOFTY_API_KEY`
directly in Netlify's environment variable UI, and deploy — no other build
config needed.

## Content still needed before real launch traffic

- Real CDD/HOA dollar figures in `src/lib/neighborhoods.ts` (currently
  placeholders marked "verify")
- Domain, contact email, and phone in `src/lib/site-config.ts`
- Lofty-side automation for the buyer guide (see `docs/lofty-integration.md`)
- Real logo/imagery in `public/` (currently text-only branding)
