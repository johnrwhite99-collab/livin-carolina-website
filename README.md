# Livin' Carolina Team — website

Lead-capture site for the Livin' Carolina Team at Realty ONE Group Coastal.
Built around the team's core differentiator: itemized, real-number CDD/HOA
cost breakdowns for Summerville's master-planned communities, feeding a
buyer and a seller funnel into Lofty CRM.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` and fill in values as they become
available — the site runs fine with all of them blank (leads still submit,
they just don't reach Lofty/Cloud CMA until keys are set; see below).

## Site structure

- `src/app/page.tsx` — home
- `src/app/neighborhoods/` — cost-breakdown pages for Nexton, Cane Bay
  Plantation, Carnes Crossroads, The Ponds (`src/lib/neighborhoods.ts` holds
  the data — update the placeholder dollar figures with real CDD/HOA numbers
  before launch)
- `src/app/buyers/`, `src/app/sellers/` — the two lead funnels
- `src/app/blog/`, `src/app/videos/` — blog and video hub (seed content only)
- `src/app/api/leads/route.ts` — form submissions land here, then get pushed
  to Lofty (and, for sellers, Cloud CMA)
- `src/lib/lofty.ts`, `src/lib/cloudcma.ts` — the two CRM/valuation
  integrations (see `docs/lofty-integration.md`)
- `src/lib/site-config.ts` — brand name, brokerage compliance line, contact
  info, colors — edit this rather than hunting for hardcoded strings

## Integrations

### Lofty CRM (priority)

Every lead form posts into Lofty, tagged by funnel, so Lofty's own
triggers/automations run the nurture drip. **Read
`docs/lofty-integration.md` before launch** — it covers the required
Lofty-side setup (sources, tags, the automation that actually sends the
buyer guide) and flags that the request payload shape hasn't been verified
against Lofty's authenticated API reference yet.

Set `LOFTY_API_KEY` as an environment variable (Netlify: Site settings →
Environment variables). Regenerate the key in Lofty first if it was ever
pasted anywhere outside an env var or secrets manager.

### Cloud CMA (via CHS MLS)

Seller valuation reports come from Cloud CMA — every seller submission
triggers a branded CMA report, built from real MLS comps and emailed
directly to the lead. See `docs/cloudcma-integration.md`.

Set `CLOUDCMA_API_KEY` as an environment variable (find it in Cloud CMA
under Settings → API).

### Buyer relocation guide

The team's current guide (older version, standing in for the updated one
pending team-leader sign-off) is delivered as a step in the Lofty drip
triggered off the buyer funnel — not a direct file download on the site.
See `docs/lofty-integration.md` for why, and swap in the updated guide in
Lofty (not in this repo) once it's approved.

## Deploying

`netlify.toml` is set up for Netlify's zero-config Next.js support
(`@netlify/plugin-nextjs`). Connect the repo in Netlify, set the environment
variables from `.env.example`, and deploy — no other build config needed.

## Content still needed before real launch traffic

- Real CDD/HOA dollar figures in `src/lib/neighborhoods.ts` (currently
  placeholders marked "verify")
- Domain, contact email, and phone in `src/lib/site-config.ts`
- Lofty-side automations (see `docs/lofty-integration.md`)
- Real logo/imagery in `public/` (currently text-only branding)
