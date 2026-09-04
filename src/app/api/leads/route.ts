import { NextResponse } from "next/server";
import { createLoftyLead, LoftyApiError, LoftyConfigError, type LeadFunnel } from "@/lib/lofty";
import { requestCmaReport } from "@/lib/cloudcma";

interface LeadRequestBody {
  funnel: LeadFunnel;
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;
}

function isValidFunnel(value: unknown): value is LeadFunnel {
  return value === "buyer" || value === "seller";
}

export async function POST(request: Request) {
  let body: Partial<LeadRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { funnel, name, email, phone, propertyAddress } = body;

  if (!isValidFunnel(funnel) || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (funnel === "seller" && !propertyAddress?.trim()) {
    return NextResponse.json({ error: "Property address is required for a valuation" }, { status: 400 });
  }

  // Push the lead to Lofty first — that's the system of record the team
  // works out of, and it's what drives the nurture drip.
  try {
    await createLoftyLead({
      fullName: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      funnel,
      propertyAddress: propertyAddress?.trim(),
    });
  } catch (error) {
    if (error instanceof LoftyConfigError) {
      console.error("[leads] Lofty is not configured:", error.message);
    } else if (error instanceof LoftyApiError) {
      console.error("[leads] Lofty API rejected the lead:", error.message);
    } else {
      console.error("[leads] Unexpected error sending lead to Lofty:", error);
    }
    // Don't fail the visitor's submission over a downstream CRM outage —
    // but this IS a lost lead until someone checks the function logs, so
    // surface it loudly server-side.
  }

  if (funnel === "seller" && propertyAddress) {
    try {
      await requestCmaReport({ fullName: name.trim(), email: email.trim(), propertyAddress: propertyAddress.trim() });
    } catch (error) {
      console.error("[leads] Cloud CMA request failed:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
