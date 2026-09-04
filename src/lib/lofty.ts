// Lofty CRM (formerly Chime) integration.
//
// This posts every website lead into Lofty as a new lead, tagged by funnel
// (buyer/seller) and source. Lofty-side automations (drip campaigns,
// triggers, guide delivery) key off the `source` and `tags` values below —
// create matching Sources/Tags and automations in Lofty before going live.
// See /docs/lofty-integration.md for the recommended setup.
//
// IMPORTANT: the exact field names in the request body below are based on
// Lofty's publicly documented conventions (Bearer auth, "source" is
// mandatory, "tags" drive organization/routing) but have NOT been verified
// against the authenticated API reference at https://developer.lofty.com —
// that page requires a logged-in Lofty account to view. Confirm the payload
// shape there (or with Lofty support) before relying on this in production,
// and adjust the `buildLoftyPayload` function below if field names differ.

const LOFTY_API_BASE = process.env.LOFTY_API_BASE_URL ?? "https://api.lofty.com/v1.0";

export type LeadFunnel = "buyer" | "seller";

export interface LoftyLeadInput {
  fullName: string;
  email: string;
  phone?: string;
  funnel: LeadFunnel;
  propertyAddress?: string;
  notes?: string;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1),
  };
}

const FUNNEL_SOURCE: Record<LeadFunnel, string> = {
  buyer: "Website - Buyer Relocation Guide",
  seller: "Website - Seller Valuation Request",
};

const FUNNEL_TAGS: Record<LeadFunnel, string[]> = {
  buyer: ["website-lead", "buyer-funnel"],
  seller: ["website-lead", "seller-funnel"],
};

function buildLoftyPayload(input: LoftyLeadInput) {
  const { firstName, lastName } = splitName(input.fullName);
  return {
    firstName,
    lastName,
    email: input.email,
    phone: input.phone,
    source: FUNNEL_SOURCE[input.funnel],
    tags: FUNNEL_TAGS[input.funnel],
    remarks: [input.propertyAddress ? `Property address: ${input.propertyAddress}` : null, input.notes]
      .filter(Boolean)
      .join(" | "),
  };
}

export class LoftyConfigError extends Error {}
export class LoftyApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function createLoftyLead(input: LoftyLeadInput): Promise<void> {
  const apiKey = process.env.LOFTY_API_KEY;
  if (!apiKey) {
    throw new LoftyConfigError(
      "LOFTY_API_KEY is not set. Add it as an environment variable (Netlify: Site settings > Environment variables) — never commit it to the repo."
    );
  }

  const res = await fetch(`${LOFTY_API_BASE}/leads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildLoftyPayload(input)),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new LoftyApiError(res.status, `Lofty API responded ${res.status}: ${body}`);
  }
}
