# Cloud CMA integration

The seller funnel (`/sellers`) promises a free preliminary home valuation.
That's delivered by Cloud CMA, via the CHS MLS partnership — `/api/leads`
calls `requestCmaReport()` in `src/lib/cloudcma.ts` for every seller
submission, right after the lead is pushed to Lofty.

## How it works

A single `POST` to `https://cloudcma.com/cmas/widget` with the consumer's
name, email, and property address (plus the account's `api_key`) makes
Cloud CMA:

1. Search the MLS (via CHS MLS's RETS connection) for comparable listings
2. Build a branded CMA report from those comps
3. Email the report directly to the consumer — usually within about a
   minute

This is confirmed against Cloud CMA's public developer docs
(`https://cloudcma.com/developers`), not a guess — unlike the Lofty
integration, there was no ambiguity to flag here.

## Setup

1. In Cloud CMA: **Settings → API** (or **Account Settings → Integrations**,
   "Your API Key") to find the account's API key.
2. Set `CLOUDCMA_API_KEY` as an environment variable (Netlify: Site
   settings → Environment variables). Never commit it to the repo.

That's it — no separate agent ID, no webhook required for the basic flow.

## What this does *not* do (yet)

- **No CRM record of the report itself.** Cloud CMA emails the consumer
  directly; it doesn't tell Lofty a report was sent. The lead already gets
  created in Lofty separately (see `docs/lofty-integration.md`), so the
  team has the lead, just not a note that says "CMA emailed." If that
  matters, Cloud CMA supports a `callback_url` + `job_id` pair that POSTs
  back `{ job_id, pdf_url }` when the report finishes — a future
  enhancement would add a route handler for that callback and log a note
  on the Lofty lead.
- **No property type / bed / bath filtering.** Cloud CMA will use whatever
  it can find via tax records if `beds`/`baths`/`sqft`/`prop_type` aren't
  passed. Fine for a "quick estimate" funnel; not fine if you want tighter
  comps control later.

## Local testing without emailing real consumers

Leave `CLOUDCMA_API_KEY` unset locally. `requestCmaReport` throws a
`CloudCmaConfigError`, which `/api/leads` catches and logs — the seller
form still returns success to the visitor, so you can test the UI without
triggering a real Cloud CMA report and email.
