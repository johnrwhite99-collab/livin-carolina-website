// Central brand + compliance config. Change values here to update them site-wide.

export const siteConfig = {
  teamName: "Livin' Carolina Team",
  brokerageName: "Realty ONE Group Coastal",
  tagline: "The real cost of living in Summerville, spelled out in numbers.",
  primaryArea: "Summerville, SC",
  extendedAreas: ["Charleston", "Hilton Head", "Beaufort", "Myrtle Beach", "Greenville"],
  domain: "livincarolina.com", // placeholder until a domain is secured
  contactEmail: "hello@livincarolina.com", // placeholder — update once domain/email is live
  contactPhone: "", // placeholder — add team phone number
  // Lofty-hosted seller valuation tool. Redirecting here (rather than
  // capturing the lead ourselves and calling Lofty's API) means the lead
  // capture and drip campaign are entirely Lofty's own, native behavior —
  // no custom API integration to keep working. See docs/lofty-integration.md.
  sellerValuationUrl: "https://johnwhite.charlestonarealiving.com/evaluation",
  colors: {
    black: "#000000",
    gold: "#c5a95e",
  },
  compliance: {
    // Association rules require the brokerage name to appear on the site.
    footerLine: "Livin' Carolina Team at Realty ONE Group Coastal",
    equalHousing: "Equal Housing Opportunity",
  },
} as const;
