# Technical SEO / indexing notes

## Canonical host
`johnincharleston.com` (apex, not `www`) is the Netlify primary domain.
`netlify.toml` also codifies an explicit `www` → apex 301 redirect so this
doesn't depend solely on the Netlify dashboard setting. HTTP → HTTPS is
handled automatically by Netlify once a domain has an issued certificate.

## robots.txt
`src/app/robots.ts` allows normal crawling plus explicit rules for
`OAI-SearchBot` (ChatGPT search discoverability) and `GPTBot` (OpenAI's
AI-training crawler) — both allowed, since this is public marketing/
editorial content meant for maximum visibility. Preview/deploy-branch URLs
(Netlify's `*.netlify.app` branch deploys) are separate hosts from the
production domain's sitemap/canonical URLs, so they don't create duplicate
indexed content as long as the canonical tag (which every page sets via
`buildMetadata()`) always points at the production host.

## IndexNow (prepared, not yet wired up)
IndexNow lets you actively notify Bing/other participating search engines
the moment a page is published or updated, instead of waiting for a crawl.
Not wired up yet because there's no publish trigger to hang it off — content
is static MDX committed to the repo, not published through a CMS webhook.

To implement in Phase 2:
1. Generate an IndexNow key (any GUID-like string) and host it at
   `https://johnincharleston.com/<key>.txt` containing just the key —
   easiest is a static file in `public/`.
2. On deploy (e.g. a small script run by a Netlify build hook, or a GitHub
   Action step after merge), POST the list of new/changed URLs to
   `https://api.indexnow.org/indexnow` with the key.
3. Since this repo doesn't diff "what changed" today, the simplest Phase 2
   version can just re-submit the full sitemap URL list on every deploy —
   IndexNow doesn't penalize re-submitting unchanged URLs.

## Sitemap
`src/app/sitemap.ts` includes all static routes, every neighborhood/
community page, and every published (non-draft) blog post. New pillar pages
get added to the static route list by hand as they're built — there's no
dynamic `[slug]` route for pillars in Phase 1 (each is its own page), so
there's nothing to auto-generate from.
