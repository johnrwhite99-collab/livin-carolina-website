import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/authors";

// Homepage-specific trust cue — distinct from the smaller AuthorBox used at
// the bottom of articles. Supports a real headshot via `author.photo` (set
// it in src/lib/authors.ts once one exists — recommended: a square, at
// least 800x800 photo); falls back to an initials mark, same pattern
// already used by AuthorBox, rather than a generic person silhouette.
export function AuthorTrust({ author }: { author: Author }) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16 sm:py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {author.photo ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border sm:h-28 sm:w-28">
              <Image src={author.photo} alt={author.name} fill sizes="112px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-black text-2xl font-semibold text-white sm:h-28 sm:w-28">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
              Who&rsquo;s behind this
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-brand-black">{author.name}</h2>
            <p className="mt-2 max-w-2xl text-foreground/70">{author.bio}</p>
            <Link
              href="/about"
              className="mt-3 inline-block text-sm font-medium text-brand-gold-dark hover:underline"
            >
              More about {author.name.split(" ")[0]} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
