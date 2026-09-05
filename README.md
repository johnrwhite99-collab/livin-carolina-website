# Livin' Carolina Team — website

Lead-capture site for the Livin' Carolina Team at Realty ONE Group Coastal.
Built around the team's core differentiator: itemized, real-number CDD/HOA
cost breakdowns for Summerville's master-planned communities, with a buyer
and a seller funnel that hand off to the team's existing Lofty-hosted pages.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` if you want a real `SITE_URL` locally —
otherwise the site runs fine with no env vars set at all. There's no CRM API
key to manage; see below.

## Site structure

- `src/app/page.tsx` — home
- `src/app/neighborhoods/` — cost-breakdown pages for Nexton, Cane Bay
  Plantation, Carnes Crossroads, The Ponds (`src/lib/neighborhoods.ts` holds
  the data — update the placeholder dollar figures with real CDD/HOA numbers
  before launch)
- `src/app/buyers/`, `src/app/sellers/` — each is a marketing page with a
  single CTA that redirects to a Lofty-hosted page; no lead capture happens
  on this site
- `src/app/blog/`, `src/app/videos/` — blog and video hub (seed content only)
- `src/lib/site-config.ts` — brand name, brokerage compliance line, contact
  info, colors, and the two Lofty redirect URLs — edit this rather than
  hunting for hardcoded strings

## Lofty CRM

Both funnels redirect to pages already hosted on the team's Lofty site —
Lofty handles lead capture and the nurture drip natively, with no API
integration on this side to keep working. See `docs/lofty-integration.md`
for the URLs, why this approach was chosen over a custom API integration,
and how to rebuild a custom on-site form later if that's ever wanted.

### Buyer relocation guide

The team's current guide (older version, standing in for the updated one
pending team-leader sign-off) is delivered through the Lofty page's own
flow — swap in the updated guide in Lofty (not in this repo) once it's
approved.

## Deploying

`netlify.toml` is set up for Netlify's zero-config Next.js support
(`@netlify/plugin-nextjs`). Connect the repo in Netlify and deploy — no
environment variables are required.

## Content still needed before real launch traffic

- Real CDD/HOA dollar figures in `src/lib/neighborhoods.ts` (currently
  placeholders marked "verify")
- Domain, contact email, and phone in `src/lib/site-config.ts`
- Real logo/imagery in `public/` (currently text-only branding)
