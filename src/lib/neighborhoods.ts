// Neighborhood cost-transparency data. This is the site's core differentiator —
// real, itemized CDD/HOA math instead of a generic "beautiful community" pitch.
// Figures below are placeholders (marked "verify") until pulled from current
// CDD budgets / HOA docs — swap them in before publishing.

export interface NeighborhoodFaq {
  question: string;
  answer: string;
}

export interface CostLineItem {
  label: string;
  annualLow: number;
  annualHigh: number;
  note?: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  summary: string;
  costItems: CostLineItem[];
  faqs: NeighborhoodFaq[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "nexton",
    name: "Nexton",
    summary:
      "Summerville's largest master-planned community, spanning Berkeley and Dorchester counties. CDD debt funds the roads, amenities, and infrastructure — and it shows up as a line item on every tax bill.",
    costItems: [
      { label: "CDD assessment (verify current bond year)", annualLow: 1500, annualHigh: 3200 },
      { label: "HOA dues", annualLow: 600, annualHigh: 1200 },
      { label: "Special assessments (verify — varies by phase/village)", annualLow: 0, annualHigh: 500 },
    ],
    faqs: [
      {
        question: "What are the CDD fees in Nexton?",
        answer:
          "Nexton is funded by multiple Community Development Districts, and the assessment depends on which village and phase a home sits in. Figures above are placeholders — request the current CDD budget for a specific address before making an offer.",
      },
      {
        question: "Do CDD fees in Nexton ever go away?",
        answer:
          "CDD bonds amortize over a set term (commonly 20–30 years). The assessment typically decreases as the bond is paid down, but it does not disappear until the bond is retired — confirm the payoff schedule for the specific district.",
      },
    ],
  },
  {
    slug: "cane-bay-plantation",
    name: "Cane Bay Plantation",
    summary:
      "A large CDD community northwest of Nexton, built around a network of lakes and trails. Multiple CDDs cover different sections, so the assessment varies by address.",
    costItems: [
      { label: "CDD assessment (verify current bond year)", annualLow: 1400, annualHigh: 2800 },
      { label: "HOA dues", annualLow: 500, annualHigh: 1000 },
      { label: "Special assessments (verify)", annualLow: 0, annualHigh: 400 },
    ],
    faqs: [
      {
        question: "What are the CDD fees in Cane Bay Plantation?",
        answer:
          "Cane Bay is covered by more than one CDD, and the per-home assessment varies by section. Figures above are placeholders — confirm the current-year assessment for the specific parcel before writing an offer.",
      },
    ],
  },
  {
    slug: "carnes-crossroads",
    name: "Carnes Crossroads",
    summary:
      "A smaller, walkable CDD community near Goose Creek with a town-center feel. The CDD assessment funds the shared amenities and infrastructure.",
    costItems: [
      { label: "CDD assessment (verify current bond year)", annualLow: 1200, annualHigh: 2600 },
      { label: "HOA dues", annualLow: 500, annualHigh: 900 },
      { label: "Special assessments (verify)", annualLow: 0, annualHigh: 400 },
    ],
    faqs: [
      {
        question: "What are the CDD fees in Carnes Crossroads?",
        answer:
          "Figures above are placeholders pending the current CDD budget. Request the district's current assessment roll for the specific address before making an offer.",
      },
    ],
  },
  {
    slug: "the-ponds",
    name: "The Ponds",
    summary:
      "A CDD community on the Summerville/Dorchester side, known for its farm and community garden amenities. Assessment covers the shared infrastructure and amenity debt.",
    costItems: [
      { label: "CDD assessment (verify current bond year)", annualLow: 1000, annualHigh: 2200 },
      { label: "HOA dues", annualLow: 400, annualHigh: 850 },
      { label: "Special assessments (verify)", annualLow: 0, annualHigh: 350 },
    ],
    faqs: [
      {
        question: "What are the CDD fees in The Ponds?",
        answer:
          "Figures above are placeholders pending the current CDD budget. Request the district's current assessment roll for the specific address before making an offer.",
      },
    ],
  },
];

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function annualCostRange(n: Neighborhood): { low: number; high: number } {
  return n.costItems.reduce(
    (acc, item) => ({
      low: acc.low + item.annualLow,
      high: acc.high + item.annualHigh,
    }),
    { low: 0, high: 0 }
  );
}
