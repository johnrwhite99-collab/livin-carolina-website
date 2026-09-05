# Lofty CRM integration

Both lead funnels are straight redirects to pages already hosted on the
team's Lofty site — there is no custom API code left in this repo talking
to Lofty. Lofty owns lead capture and the drip campaign for both, natively:

| Page on this site | Redirects to |
|---|---|
| `/buyers` | `siteConfig.buyerRelocationGuideUrl` — `https://johnwhite.charlestonarealiving.com/charleston-relocation` |
| `/sellers` | `siteConfig.sellerValuationUrl` — `https://johnwhite.charlestonarealiving.com/evaluation` |

Both URLs live in `src/lib/site-config.ts` — that's the one place to change
if either Lofty page moves.

## Why not a custom API integration

The original design captured leads on this site and pushed them to Lofty's
API (and, for sellers, Cloud CMA) via a Next.js API route. That turned out
to be more fragile than it was worth:

- The exact Lofty API payload shape was never fully verified against
  Lofty's authenticated developer docs.
- Environment variables set through Claude's Netlify MCP connector
  (`manage-env-vars`) reported success but never actually reached the
  deployed function — `LOFTY_API_KEY`/`CLOUDCMA_API_KEY` kept showing as
  "not set" in the function logs even after fresh deploys, and the cause
  was never fully isolated.
- Netlify's free-tier usage was also a constraint on how much back-and-forth
  redeploying-and-testing was practical.

Since the team already has both a buyer relocation guide page and a seller
valuation page hosted on Lofty's own platform, redirecting to them sidesteps
all of that: no API key to manage, no payload format to get right, no env
var propagation to debug. Lofty's own lead capture and automations — the
same ones already running for the team's existing Lofty site — just work.

## If a custom on-site form is wanted again later

If the team ever wants to capture leads directly on this site again instead
of redirecting (e.g., to control the on-site UX more tightly), the pattern
to rebuild is: a client form component posts to a Next.js Route Handler,
which calls Lofty's `/leads` API with `Authorization: Bearer <LOFTY_API_KEY>`.
Set `LOFTY_API_KEY` **directly in Netlify's environment variable UI**
(Site configuration → Environment variables) rather than through an MCP
connector, given the issue above — and verify it actually worked by
checking the Netlify Functions logs after a real form submission, not just
the "success" response from whatever tool set it.
