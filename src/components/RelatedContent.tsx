import Link from "next/link";

export interface RelatedItem {
  href: string;
  title: string;
  description?: string;
}

export function RelatedContent({ title = "Related reading", items }: { title?: string; items: RelatedItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-brand-black">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand-gold"
          >
            <p className="font-semibold text-brand-black">{item.title}</p>
            {item.description && <p className="mt-1 text-sm text-foreground/70">{item.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
