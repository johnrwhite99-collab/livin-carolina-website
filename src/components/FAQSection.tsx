export interface Faq {
  question: string;
  answer: string;
}

export function FAQSection({ faqs, title = "Common questions" }: { faqs: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-brand-black">{title}</h2>
      <div className="mt-4 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <p className="font-semibold text-brand-black">{faq.question}</p>
            <p className="mt-1 text-foreground/70">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
