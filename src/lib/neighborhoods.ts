// Community cost-transparency data. This is the site's core differentiator —
// real, itemized cost math instead of a generic "beautiful community" pitch.
//
// CRITICAL: South Carolina master-planned communities can carry several
// different, legally distinct fee mechanisms at once — HOA, POA, regime
// fee, a Municipal Improvement District, a special assessment, a special
// tax district, or an actual Community Development District (CDD). These
// are NOT interchangeable, and "CDD" is not a generic label for "master-
// planned-community fee." Every fee item below defaults to `feeType:
// "Unverified"` unless a specific classification has been directly
// confirmed (see the `note` field for provenance) — never inferred by
// pattern-matching against other CDD communities.
//
// All dollar figures below are placeholders pending a current CDD/HOA
// budget, assessment roll, or other primary source — `status: "unverified"`
// on every item reflects that, independent of whether the fee-type
// classification itself is known.

export interface NeighborhoodFaq {
  question: string;
  answer: string;
}

export type FeeType =
  | "HOA"
  | "POA"
  | "Regime Fee"
  | "Improvement District"
  | "Municipal Improvement District"
  | "Special Assessment"
  | "Special Tax District"
  | "CDD"
  | "Unverified";

export type VerificationStatus = "verified" | "estimated" | "unverified";

export interface CommunityFeeItem {
  feeType: FeeType;
  entityName?: string; // the actual named district/association, if known, e.g. "Nexton Improvement District"
  label: string;
  subsection?: string; // for communities where different sections carry different fees
  annualLow?: number;
  annualHigh?: number;
  status: VerificationStatus;
  source?: string;
  lastVerified?: string;
  note?: string;
}

export interface GeoFacts {
  editorialArea: string; // navigation/SEO grouping (e.g. "Summerville Area") — not a jurisdiction claim
  mailingCity?: string; // USPS mailing city — a postal fact, not a legal one
  municipality?: string; // left unset until confirmed
  county?: string; // left unset until confirmed
  jurisdictionVerified: boolean; // false unless municipality/county above are actually confirmed
}

export interface Neighborhood {
  slug: string;
  name: string;
  summary: string;
  geoFacts: GeoFacts;
  feeItems: CommunityFeeItem[];
  faqs: NeighborhoodFaq[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "nexton",
    name: "Nexton",
    summary:
      "One of the largest master-planned communities in the Charleston area, with a Summerville, SC mailing address in Berkeley County. Infrastructure and amenities are funded through the Nexton Improvement District, a special-assessment mechanism distinct from a Community Development District (CDD) — the assessment shows up as a line item on the tax bill, and a Property Owners Association (POA) with neighborhood-specific regime fees applies on top of it.",
    geoFacts: {
      editorialArea: "Summerville Area",
      mailingCity: "Summerville, SC",
      county: "Berkeley County",
      jurisdictionVerified: true,
    },
    feeItems: [
      {
        feeType: "Improvement District",
        entityName: "Nexton Improvement District",
        label: "Improvement District assessment",
        status: "unverified",
        note: "Entity/classification confirmed by the site owner; the dollar figure has not been verified against a current assessment roll and is not shown until it is.",
      },
      {
        feeType: "POA",
        entityName: "Nexton Property Owners Association",
        label: "POA dues / regime fee",
        subsection: "Varies by neighborhood section",
        status: "unverified",
        note: "Nexton uses a Property Owners Association structure with neighborhood-specific POA/regime fee information published per section — entity/classification confirmed by the site owner; dollar figures not yet verified against a current budget.",
      },
      {
        feeType: "Unverified",
        label: "Special assessments (varies by phase/village)",
        status: "unverified",
      },
    ],
    faqs: [
      {
        question: "Does Nexton have a CDD?",
        answer:
          "No — Nexton's infrastructure assessment runs through the Nexton Improvement District, not a Community Development District (CDD). It functions similarly (an assessment tied to infrastructure financing), but it's a legally distinct mechanism, and it applies on top of separate Property Owners Association (POA) dues — Nexton uses a POA structure, not an HOA. Confirm the current assessment amount for a specific address before making an offer.",
      },
      {
        question: "What will I actually pay in fees at Nexton?",
        answer:
          "Expect at least two separate line items: the Nexton Improvement District assessment and POA dues (which vary by neighborhood section), and possibly a phase-specific special assessment on top. We don't have current verified figures for any of these yet — ask for the current assessment roll and the specific section's POA/regime budget for the address before writing an offer.",
      },
    ],
  },
  {
    slug: "cane-bay-plantation",
    name: "Cane Bay Plantation",
    summary:
      "A large master-planned community northwest of Nexton, built around a network of lakes and trails. Different sections of Cane Bay may carry different HOA, POA, or assessment structures — we don't yet have verified, section-by-section fee data, so no fee classification is asserted below at the master-community level.",
    geoFacts: {
      editorialArea: "Summerville Area",
      mailingCity: "Summerville, SC",
      jurisdictionVerified: false,
    },
    feeItems: [
      {
        feeType: "Unverified",
        label: "Community association / district fees",
        status: "unverified",
        note: "Cane Bay Plantation includes multiple sections that may have different fee structures (HOA, POA, CDD, or other special district). No single classification is asserted here — verify the specific structure for the section a given address is in.",
      },
    ],
    faqs: [
      {
        question: "Does Cane Bay Plantation have a CDD?",
        answer:
          "Not confirmed. Cane Bay is a large community with multiple sections, and different sections may use different fee mechanisms (HOA, POA, or a special district). Don't assume a CDD applies — verify the specific structure and current fee amount for the section a given address is in.",
      },
    ],
  },
  {
    slug: "carnes-crossroads",
    name: "Carnes Crossroads",
    summary:
      "A smaller, walkable master-planned community near Goose Creek with a town-center feel. We don't yet have a verified fee-type classification for this community's assessments.",
    geoFacts: {
      editorialArea: "Summerville Area",
      mailingCity: "Summerville, SC",
      jurisdictionVerified: false,
    },
    feeItems: [
      {
        feeType: "Unverified",
        label: "Community association / district fees",
        status: "unverified",
        note: "Fee-type classification and current amounts not yet verified.",
      },
    ],
    faqs: [
      {
        question: "What kind of fees does Carnes Crossroads have?",
        answer:
          "Not yet verified. Request the current HOA budget and any district assessment roll for the specific address before making an offer — we'll update this page once we have confirmed figures.",
      },
    ],
  },
  {
    slug: "the-ponds",
    name: "The Ponds",
    summary:
      "A master-planned community on the Summerville side, known for its farm and community garden amenities. We don't yet have a verified fee-type classification for this community's assessments.",
    geoFacts: {
      editorialArea: "Summerville Area",
      mailingCity: "Summerville, SC",
      jurisdictionVerified: false,
    },
    feeItems: [
      {
        feeType: "Unverified",
        label: "Community association / district fees",
        status: "unverified",
        note: "Fee-type classification and current amounts not yet verified.",
      },
    ],
    faqs: [
      {
        question: "What kind of fees does The Ponds have?",
        answer:
          "Not yet verified. Request the current HOA budget and any district assessment roll for the specific address before making an offer — we'll update this page once we have confirmed figures.",
      },
    ],
  },
];

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

// Only sums items with actual verified/estimated dollar figures — unverified
// items (the default, right now, for everything) contribute nothing rather
// than silently rendering as $0.
export function annualCostRange(n: Neighborhood): { low: number; high: number; hasFigures: boolean } {
  const priced = n.feeItems.filter((item) => item.annualLow != null && item.annualHigh != null);
  return {
    low: priced.reduce((sum, item) => sum + (item.annualLow ?? 0), 0),
    high: priced.reduce((sum, item) => sum + (item.annualHigh ?? 0), 0),
    hasFigures: priced.length > 0,
  };
}
