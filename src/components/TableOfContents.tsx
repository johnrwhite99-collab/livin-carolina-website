import type { Heading } from "@/lib/slugify";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav className="rounded-xl border border-border bg-surface p-4 text-sm">
      <p className="font-semibold text-brand-black">On this page</p>
      <ul className="mt-2 space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a href={`#${h.id}`} className="text-foreground/70 hover:text-brand-gold-dark">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
