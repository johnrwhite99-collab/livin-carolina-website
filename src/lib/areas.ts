// Editorial/geographic hierarchy for navigation and SEO grouping.
//
// IMPORTANT: this hierarchy is an editorial and market-area grouping for
// navigation and search purposes — e.g. grouping Nexton under "Summerville
// Area" because that's how buyers search and how the community is commonly
// referenced, NOT a claim about legal jurisdiction. Whether a specific
// community is inside an incorporated municipality, in unincorporated
// county land, etc. is a separate, per-community question — see the
// `GeoFacts` type in neighborhoods.ts, which stays unverified until
// confirmed rather than being inferred from this tree.
//
// Nodes without a `href` don't have a page yet — they exist so the
// hierarchy and future navigation/breadcrumbs are structurally correct
// without mass-generating thin pages ahead of real content.

export interface AreaNode {
  slug: string;
  name: string;
  href?: string; // present only once a real page exists for this node
  children?: AreaNode[];
}

export const areaHierarchy: AreaNode = {
  slug: "charleston-metro",
  name: "Charleston Metro",
  href: "/charleston-area",
  children: [
    {
      slug: "charleston",
      name: "Charleston",
      children: [
        { slug: "west-ashley", name: "West Ashley" },
        { slug: "james-island", name: "James Island" },
        { slug: "johns-island", name: "Johns Island" },
      ],
    },
    {
      slug: "summerville-area",
      name: "Summerville Area",
      children: [
        { slug: "nexton", name: "Nexton", href: "/neighborhoods/nexton" },
        { slug: "cane-bay-plantation", name: "Cane Bay Plantation", href: "/neighborhoods/cane-bay-plantation" },
        { slug: "carnes-crossroads", name: "Carnes Crossroads", href: "/neighborhoods/carnes-crossroads" },
        { slug: "the-ponds", name: "The Ponds", href: "/neighborhoods/the-ponds" },
      ],
    },
    { slug: "goose-creek", name: "Goose Creek" },
    { slug: "north-charleston", name: "North Charleston" },
    { slug: "moncks-corner", name: "Moncks Corner" },
    { slug: "mount-pleasant", name: "Mount Pleasant" },
  ],
};

export function flattenAreas(node: AreaNode = areaHierarchy): AreaNode[] {
  return [node, ...(node.children ?? []).flatMap((child) => flattenAreas(child))];
}

export function findArea(slug: string, node: AreaNode = areaHierarchy): AreaNode | undefined {
  if (node.slug === slug) return node;
  for (const child of node.children ?? []) {
    const found = findArea(slug, child);
    if (found) return found;
  }
  return undefined;
}
