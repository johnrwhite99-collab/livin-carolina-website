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
