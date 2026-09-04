# Website Brief — Summerville Real Estate Lead Capture Site

## Service Area
- **Primary focus:** Summerville, SC
- **Signature niche:** transparent, math-driven cost breakdowns of CDD-governed master-planned communities — Nexton, Cane Bay Plantation, Carnes Crossroads, The Ponds
- **Extended service area:** Charleston, Hilton Head, Beaufort, Myrtle Beach, Greenville

## Brand Voice
Clarity over perfection. Dry humor. Direct, transparent, math-driven — no fluff, no "your dream home awaits" real estate cliché copy.

## Core Differentiator
Nobody else is being straight about the *true all-in cost* of living in a CDD community (HOA + CDD fees + special assessments, not just the sticker price). That's the wedge already working on YouTube — the site should be built around it, not a generic "about me, search listings" template.

## Draft Site Structure
- **Home** — clear value prop, CTA to lead form
- **Neighborhood guides** — one page each for Nexton, Cane Bay Plantation, Carnes Crossroads, The Ponds, with real cost breakdowns
- **Blog** — relocation-buyer content, cost-transparency posts, market updates
- **Video hub** — embedded YouTube content, organized by neighborhood/topic
- **Buyer/Seller guides**
- **Lead capture** — form + calendar booking

## SEO / AEO Angle
The neighborhood + cost-transparency niche is naturally suited to answer-engine visibility: FAQ-formatted sections ("What are the CDD fees in Nexton?"), local business schema markup, and direct Q&A structure AI answer engines can lift cleanly.

## Decisions So Far
- **Team/business name:** Livin' Carolina Team at Realty ONE Group Coastal
- **Compliance requirement:** brokerage name (Realty ONE Group Coastal) must appear on the site, per association rules — same requirement likely applies to social/YouTube
- **Logo:** "Livin' Carolina" wordmark with palm tree, sun, and rooftop icon — blue/orange/green palette
- **Broker brand colors:** black (#000000) and gold (#c5a95e), per Canva brand kit
- **Color direction:** black and gold lead throughout — this is John's preferred personal brand palette outside the team logo too. Logo stays as-is for team identity, but site design (buttons, headers, accents) runs black/gold rather than the logo's beach palette.
- **Domain:** not secured yet — will buy new or reactivate an old GoDaddy domain
- **MLS/IDX:** live listings via the **CHS MLS** connection (already connected in Claude)
- **Lead form:** serves both buyers and sellers via separate landing pages and funnels (see below)

## Buyer & Seller Funnels

**Buyer landing page**
- Offer: free buyer relocation guide — updated version pending team leader approval; older guide usable as a placeholder in the meantime
- Capture: Name, Phone, Email

**Seller landing page**
- Offer: seller guide + complimentary preliminary home valuation
- Capture: Name, Phone, Email, Property Address (needed for the valuation)

Both funnels feed the same lead capture data back to John.

**Valuation:** decided — **Cloud CMA**, via the CHS MLS partnership. It has a public REST API purpose-built for "what's my home worth" lead capture: submit name/email/address, it auto-generates a branded CMA report from real MLS comps and emails it. Lead data then flows to Lofty for the drip sequence.

**Ruled out:** Palm Agent (no API/SSO access) — may still be useful elsewhere on the site as a buyer/seller cost calculator, just not for the valuation funnel.

**CRM / nurture:** team uses **Lofty CRM**. No pre-built connector exists — integration goes through Lofty's API directly. Wiring leads in, plus triggers and email drips, is a priority.

## Still Open
- Whether Realty ONE Group's internal app suite offers anything else worth connecting (check with broker IT/marketing)
- Final buyer relocation guide: content is done but awaiting team-leader sign-off; the older guide is being used as a launch placeholder (see `docs/lofty-integration.md` for how the swap works)
- Cloud CMA API credentials (agent ID + API key) from CHS MLS / Cloud CMA support — needed to finish `src/lib/cloudcma.ts`
- Domain name (buy new or reactivate an old GoDaddy domain) and a real contact email/phone to replace the placeholders in `src/lib/site-config.ts`
