import Link from "next/link";
import type { Author } from "@/lib/authors";

export function AuthorBox({ author }: { author: Author }) {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-white">
        {author.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <p className="font-semibold text-brand-black">{author.name}</p>
        <p className="text-sm text-foreground/60">{author.role}</p>
        <p className="mt-2 text-sm text-foreground/70">{author.bio}</p>
        <Link href="/about" className="mt-2 inline-block text-sm font-medium text-brand-gold-dark hover:underline">
          More about {author.name.split(" ")[0]} &rarr;
        </Link>
      </div>
    </div>
  );
}
