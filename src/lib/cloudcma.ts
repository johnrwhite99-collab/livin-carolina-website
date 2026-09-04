// Cloud CMA integration (via the CHS MLS partnership) for the seller
// valuation funnel. Confirmed against Cloud CMA's public developer docs
// (https://cloudcma.com/developers, "Broker Web Site Widgets > Create and
// deliver a Quick CMA") — this is not a guess like the initial stub was.
//
// A POST to https://cloudcma.com/cmas/widget with the consumer's
// name/email/address (plus the account's api_key) makes Cloud CMA build a
// branded CMA report from real MLS comps and email it directly to the
// consumer within about a minute. No separate agent ID is required — just
// the one API key, found in Cloud CMA under Settings > API.

const CLOUDCMA_WIDGET_URL = "https://cloudcma.com/cmas/widget";

export interface CmaRequestInput {
  fullName: string;
  email: string;
  propertyAddress: string;
}

export class CloudCmaConfigError extends Error {}
export class CloudCmaApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function requestCmaReport(input: CmaRequestInput): Promise<void> {
  const apiKey = process.env.CLOUDCMA_API_KEY;
  if (!apiKey) {
    throw new CloudCmaConfigError(
      "CLOUDCMA_API_KEY is not set. Add it as an environment variable (Netlify: Site settings > Environment variables) — never commit it to the repo."
    );
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    address: input.propertyAddress,
    name: input.fullName,
    email_to: input.email,
    headline: "What's My Home Worth?",
  });

  const res = await fetch(CLOUDCMA_WIDGET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new CloudCmaApiError(res.status, `Cloud CMA API responded ${res.status}: ${body}`);
  }
}
