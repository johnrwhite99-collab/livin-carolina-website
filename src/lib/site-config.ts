// Central brand + compliance config. Change values here to update them site-wide.

export const siteConfig = {
  // "John in Charleston" is the primary editorial/public brand — the
  // homepage and guide content present this name. teamName/brokerageName
  // remain for the required real-estate compliance disclosures and schema
  // affiliation (footer, RealEstateAgent JSON-LD) — both stay visible,
  // per Realty ONE Group Coastal's association rules.
  editorialBrand: "John in Charleston",
  teamName: "Livin' Carolina Team",
  brokerageName: "Realty ONE Group Coastal",
  tagline: "Practical, transparent guides to moving to Charleston, Summerville, and the Lowcountry.",
  primaryArea: "Charleston, SC",
  extendedAreas: ["Summerville", "Mount Pleasant", "Hilton Head", "Beaufort", "Myrtle Beach", "Greenville"],
  domain: "johnincharleston.com",
  contactEmail: "hello@johnincharleston.com", // placeholder — update once a real inbox exists
  contactPhone: "", // placeholder — add team phone number
  // Lofty-hosted pages. Redirecting to these (rather than capturing leads
  // ourselves and calling Lofty's API) means lead capture and the drip
  // campaign are entirely Lofty's own, native behavior — nothing custom
  // on our side to keep working. See docs/lofty-integration.md.
  sellerValuationUrl: "https://johnwhite.charlestonarealiving.com/evaluation",
  buyerRelocationGuideUrl: "https://johnwhite.charlestonarealiving.com/charleston-relocation",
  bookAZoomUrl: "https://johnwhite.charlestonarealiving.com/book-a-zoom-call",
  youtubeChannelUrl: "https://www.youtube.com/channel/UCUkgHXxycRpS0G4cASLeCaA",
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
