"use client";

import { useState, type FormEvent } from "react";

interface LeadFormProps {
  funnel: "buyer" | "seller";
  submitLabel: string;
  successMessage: string;
}

export function LeadForm({ funnel, submitLabel, successMessage }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      funnel,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      propertyAddress: funnel === "seller" ? String(data.get("propertyAddress") ?? "") : undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-6 text-brand-black">
        <p className="font-semibold">You&rsquo;re in.</p>
        <p className="mt-1 text-sm text-brand-black/80">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-black">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-brand-black outline-none focus:border-brand-gold"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-black">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-brand-black outline-none focus:border-brand-gold"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-black">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-brand-black outline-none focus:border-brand-gold"
        />
      </div>
      {funnel === "seller" && (
        <div>
          <label htmlFor="propertyAddress" className="mb-1 block text-sm font-medium text-brand-black">
            Property address
          </label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-brand-black outline-none focus:border-brand-gold"
          />
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending that. Try again, or reach out directly.
        </p>
      )}
    </form>
  );
}
