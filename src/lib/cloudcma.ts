// Cloud CMA integration (via the CHS MLS partnership) for the seller
// valuation funnel. Cloud CMA has a public REST API for generating a
// branded CMA report from a name/email/address submission, but it needs
// account-specific API credentials (agent ID + API key, issued by Cloud
// CMA / CHS MLS support) that this project does not have yet.
//
// This is a stub: it validates the shape of the request and no-ops until
// CLOUDCMA_API_KEY / CLOUDCMA_AGENT_ID are set, so the seller funnel can
// ship without blocking on the credentials. Once you have them, replace
// requestCmaReport's body with the real Cloud CMA "create report" call
// (see Cloud CMA's API docs / your CHS MLS Cloud CMA account for the exact
// endpoint and payload).

export interface CmaRequestInput {
  fullName: string;
  email: string;
  propertyAddress: string;
}

export async function requestCmaReport(input: CmaRequestInput): Promise<{ requested: boolean }> {
  const apiKey = process.env.CLOUDCMA_API_KEY;
  const agentId = process.env.CLOUDCMA_AGENT_ID;

  if (!apiKey || !agentId) {
    console.warn(
      "[cloudcma] CLOUDCMA_API_KEY / CLOUDCMA_AGENT_ID not set — skipping CMA report request for",
      input.email
    );
    return { requested: false };
  }

  // TODO: replace with the real Cloud CMA endpoint once credentials + API
  // docs are confirmed. Left unimplemented rather than guessing a payload
  // shape that could silently fail in production.
  console.warn("[cloudcma] Cloud CMA API call not yet implemented — wire up requestCmaReport().");
  return { requested: false };
}
