@AGENTS.md

# Standing editorial publishing rule

Claude Code is responsible for building and maintaining this website, but it
must NOT autonomously invent and publish editorial history. This applies to
all future editorial content (blog posts, guides, any MDX under `content/`):

- Do not invent `datePublished` values.
- Do not backdate content to make the site appear older or more established.
- Do not invent market statistics, MLS data, fee amounts, tax figures,
  quotes, sources, testimonials, transaction history, or other factual
  evidence.
- Do not imply an article existed before it actually existed.
- Do not autonomously create published blog posts merely to populate a
  template.
- New AI-drafted editorial articles should default to `draft: true` unless
  explicitly instructed to publish them.
- `datePublished` should reflect the actual publication date unless another
  legitimate date is explicitly provided.
- Content generated from an authorized connector (e.g. CHS MLS) may be
  published when explicitly instructed to create/publish that content.
- Existing content specifically identified as legitimate should not be
  treated as synthetic merely because AI helped create it.
- Website templates may contain structural example text during local
  development, but fabricated example editorial content must never be
  deployed as if it were real published material.

When unsure whether editorial content is approved for publication, keep it
as a draft. This is one of the cases where you MAY ask, because publication
is a public-facing marketing/editorial decision.
