# Lofty CRM integration

There are two separate paths into Lofty now, deliberately different:

- **Buyer funnel (`/buyers`)** — we capture the lead ourselves and POST it
  to Lofty's API (`src/lib/lofty.ts`). We control the form; Lofty runs the
  drip once the lead lands.
- **Seller funnel (`/sellers`)** — no custom code at all. The page links
  straight out to a Lofty-hosted valuation tool
  (`siteConfig.sellerValuationUrl` in `src/lib/site-config.ts`, currently
  `https://johnwhite.charlestonarealiving.com/evaluation`). Lofty captures
  the lead and runs its drip natively — nothing on our side to keep working.

The seller path was switched to a straight redirect after the custom
Cloud CMA + Lofty API combination proved unreliable to stand up (env var
propagation issues on Netlify's side — see "Known issue" below). If Lofty
has an equivalent hosted page for the buyer relocation guide, the same
redirect approach could replace the buyer form too, removing this API
integration entirely. Worth asking if reliability keeps being a problem.

## What the buyer-funnel code sends

Every buyer submission is created in Lofty with:

| `source` | `tags` |
|---|---|
| `Website - Buyer Relocation Guide` | `website-lead`, `buyer-funnel` |

Name, email, and phone are included. Change the source/tag strings in
`src/lib/lofty.ts` (`BUYER_SOURCE`, `BUYER_TAGS`) if you'd rather match
existing Lofty naming.

**Field names are unverified.** The request body in `buildLoftyPayload()`
follows Lofty's publicly documented conventions (Bearer auth, `source` is
mandatory, `tags` drive routing), but the exact JSON schema comes from
`https://developer.lofty.com`, which requires a logged-in Lofty account to
view. Before relying on this in production: log into that page (or ask Lofty
support) and confirm the `/leads` payload shape matches what's in
`buildLoftyPayload()`. If it doesn't, that's the one function to edit.

## One-time setup in Lofty (do this before launch)

1. **Regenerate the API key.** Any key that was ever pasted into a chat
   window should be treated as compromised — regenerate it in Lofty
   (Settings → API Key Management) and use the new one below.
2. **Create the `Website - Buyer Relocation Guide` Source** (or rename the
   one in `lofty.ts` to match a source you already use).
3. **Create matching Tags** (`website-lead`, `buyer-funnel`) if you want to
   filter/report on website leads specifically.
4. **Build the automation** — the code only creates the lead, Lofty runs
   the nurture: a drip campaign triggered by that source that **delivers
   the buyer relocation guide by email** (this replaces a direct PDF
   download on the site) plus a follow-up sequence.
5. **Set the environment variable.** On Netlify: Site settings →
   Environment variables → add `LOFTY_API_KEY` with the regenerated key.
   Never put it in a file that gets committed to this repo. See the known
   issue below before assuming this worked.

For the seller side, there's no code-level setup here — whatever drip/tags
Lofty's evaluation tool already triggers is what runs. Check that page's
own settings in Lofty if the follow-up needs adjusting.

## Known issue: env vars silently not saving via the Netlify MCP connector

When this was first wired up, `LOFTY_API_KEY` (and, before it was removed,
`CLOUDCMA_API_KEY`) were set through Claude's Netlify connector
(`manage-env-vars`) and reported success, but the deployed function kept
logging `LOFTY_API_KEY is not set` — the values never actually persisted,
even after a fresh deploy and even when `getAllEnvVars` was checked
immediately after. Marking the variable "secret" was the common factor;
the cause wasn't fully isolated.

**Reliable workaround:** set the key directly in Netlify's UI —
Site configuration → Environment variables → Add a variable — rather than
through the connector, then trigger a fresh deploy and check the Functions
logs for a real (or absent) `[leads]` error line to confirm it worked.

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
