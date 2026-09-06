export interface Fact {
  label: string;
  value: string;
}

export function FactCard({ facts }: { facts: Fact[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label}>
          <p className="text-xs uppercase tracking-wide text-foreground/50">{fact.label}</p>
          <p className="mt-1 font-semibold text-brand-black">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}
