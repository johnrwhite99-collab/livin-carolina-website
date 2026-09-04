// Blog content lives here for now — a handful of seed posts to prove out the
// template. Swap this for a CMS/MDX pipeline once there's enough volume to
// justify one; three posts don't need a content pipeline yet.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  body: string[]; // paragraphs
}

export const posts: Post[] = [
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
