# Lofty CRM integration

The site never runs a nurture sequence itself. Every buyer/seller lead form
posts to `/api/leads` (`src/app/api/leads/route.ts`), which creates a lead in
Lofty via `src/lib/lofty.ts` — Lofty is where triggers, tags, and drip
campaigns actually live and run.

## What the code sends

Every lead is created with:

| Funnel | `source` | `tags` |
|---|---|---|
| Buyer form (`/buyers`) | `Website - Buyer Relocation Guide` | `website-lead`, `buyer-funnel` |
| Seller form (`/sellers`) | `Website - Seller Valuation Request` | `website-lead`, `seller-funnel` |

Name, email, phone, and (for sellers) the property address are included.
Change the source/tag strings in `src/lib/lofty.ts` (`FUNNEL_SOURCE`,
`FUNNEL_TAGS`) if you'd rather match existing Lofty naming.

**Field names are unverified.** The request body in `buildLoftyPayload()`
follows Lofty's publicly documented conventions (Bearer auth, `source` is
mandatory, `tags` drive routing), but the exact JSON schema comes from
`https://developer.lofty.com`, which requires a logged-in Lofty account to
view. Before relying on this in production: log into that page (or ask Lofty
support) and confirm the `/leads` payload shape matches what's in
`buildLoftyPayload()`. If it doesn't, that's the one function to edit.

## One-time setup in Lofty (do this before launch)

1. **Regenerate the API key.** The key that was pasted into a chat earlier
   should be treated as compromised — regenerate it in Lofty (Settings →
   API Key Management) and use the new one below.
2. **Create the two Sources** listed in the table above (or rename the ones
   in `lofty.ts` to match sources you already use) — this is what Lofty's
   lead-routing rules key off of.
3. **Create matching Tags** (`website-lead`, `buyer-funnel`, `seller-funnel`)
   if you want to filter/report on website leads specifically.
4. **Build the automations** (this is the "priority" part — the code only
   creates the lead, Lofty runs the nurture):
   - A drip campaign triggered by the `Website - Buyer Relocation Guide`
     source that **delivers the buyer relocation guide by email** (this
     replaces a direct PDF download on the site — see below) plus a
     follow-up sequence.
   - A drip campaign triggered by the `Website - Seller Valuation Request`
     source that follows up after the Cloud CMA report goes out (see
     `docs/cloud-cma-integration.md`... not yet written — Cloud CMA isn't
     wired up yet, see `src/lib/cloudcma.ts`).
   - Lead routing rules if leads should go to someone other than whoever
     owns the source by default.
5. **Set the environment variable.** On Netlify: Site settings →
   Environment variables → add `LOFTY_API_KEY` with the regenerated key.
   Never put it in a file that gets committed to this repo.

## Why the guide isn't a direct download

The buyer page doesn't link straight to a PDF. Instead, submitting the form
creates the Lofty lead, and guide delivery happens as the first step of that
lead's drip campaign in Lofty. That keeps delivery, follow-up, and the CRM
record in one place instead of splitting "download the file" from "get
added to the CRM." Until the Lofty-side automation is built, the guide
won't actually go out — wire up step 4 above before pointing real traffic
at `/buyers`.

## Local testing without hitting the real Lofty account

Leave `LOFTY_API_KEY` unset locally. `createLoftyLead` throws a
`LoftyConfigError`, which `/api/leads` catches and logs — the form still
returns success to the visitor, so you can test the UI without creating
test leads in the production Lofty account.
