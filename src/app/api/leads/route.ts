import { NextResponse } from "next/server";
import { createLoftyLead, LoftyApiError, LoftyConfigError } from "@/lib/lofty";

interface LeadRequestBody {
  name: string;
  email: string;
  phone: string;
}

export async function POST(request: Request) {
  let body: Partial<LeadRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Push the lead to Lofty — that's the system of record the team works
  // out of, and it's what drives the buyer nurture drip.
  try {
    await createLoftyLead({
      fullName: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
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

  return NextResponse.json({ ok: true });
}
