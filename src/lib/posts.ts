// Blog content lives here for now — a handful of seed posts to prove out the
// template. Swap this for a CMS/MDX pipeline once there's enough volume to
// justify one; three posts don't need a content pipeline yet.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  body: string[]; // paragraphs
  source?: string; // data provenance, shown at the bottom of market-stat posts
}

export const posts: Post[] = [
  {
    slug: "summerville-market-update-august-2026",
    title: "Summerville Housing Market Update — August 2026",
    excerpt:
      "Inventory, pricing, days on market, and how much leverage buyers actually have right now — the real numbers, not a vibe.",
    date: "2026-09-01",
    body: [
      "Here's the actual state of the Summerville market as of August 2026, pulled straight from CHS MLS data — no \"hot market\" cliches, just the numbers.",
      "Active inventory sat at 1,529 listings, with 551 new listings hitting the market that month. That's a meaningful amount of choice for buyers compared to the ultra-tight inventory of a few years back.",
      "The active median list price was $415,000. Total active list volume across the market was roughly $672 million, against about $240 million in new list volume for the month — a rough sense of how much new supply is flowing in relative to what's already sitting on the market.",
      "Homes that sold moved at an average of 50.4 days on market, and the absorption rate came in at 3.39 months of supply — meaning at August's pace of sales, it would take about 3.4 months to sell through everything currently listed. That's generally considered a more balanced market than the seller-favored conditions of 2021-2022, but it's not a buyer's market either.",
      "The sale-to-original-list-price ratio was 96.6% — on average, sellers are getting most of what they originally asked, with modest negotiating room rather than the bidding-war premiums of a few years ago.",
      "None of this changes the CDD math for any specific neighborhood — that's still a separate, itemized cost on top of whatever the market is doing with price. But if you're deciding when to buy or list, this is the actual backdrop you're deciding against.",
    ],
    source: "CHS MLS market statistics, residential properties, City of Summerville, SC — data as of August 2026.",
  },
  {
    slug: "what-is-a-cdd-fee",
    title: "What is a CDD fee, actually?",
    excerpt:
      "Community Development District fees show up on almost every new-construction listing near Summerville. Here's what they pay for, and why they're not the same as HOA dues.",
    date: "2026-01-15",
    body: [
      "A Community Development District (CDD) is a special-purpose local government created to finance and build infrastructure for a new community — roads, water/sewer, amenity centers, sometimes even schools.",
      "The district issues bonds to pay for that infrastructure up front, then repays the bonds over 20-30 years through an annual assessment charged to every property in the district. That assessment shows up on the property tax bill.",
      "It's separate from HOA dues, which fund ongoing operations (landscaping, pool maintenance, management fees). A CDD assessment is closer to a mortgage payment on shared infrastructure than a membership fee.",
    ],
  },
  {
    slug: "cdd-vs-hoa-whats-the-difference",
    title: "CDD vs. HOA: what's the actual difference?",
    excerpt:
      "Two line items, two very different purposes. Here's how to read them on a listing sheet before you fall for a house.",
    date: "2026-02-02",
    body: [
      "HOA dues fund day-to-day operations of a community: landscaping, amenity upkeep, management. They're set by the HOA board and can rise with operating costs.",
      "CDD assessments fund infrastructure debt: the bonds that paid to build the roads and amenities in the first place. They follow an amortization schedule and, absent a new special assessment, generally trend down as the bond is paid off.",
      "Both are legally binding obligations tied to the property, not the person — so both transfer to you at closing. Get the exact current-year figures for both before writing an offer.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
