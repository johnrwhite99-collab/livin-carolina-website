import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/neighborhoods", label: "Neighborhood Costs" },
  { href: "/buyers", label: "Buyers" },
  { href: "/sellers", label: "Sellers" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-brand-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-tight">
            Livin&rsquo; Carolina
          </span>
          <span className="text-xs text-brand-gold">{siteConfig.primaryArea}</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 transition-colors hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/sellers"
          className="rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
        >
          What&rsquo;s My Home Worth?
        </Link>
      </div>
    </header>
  );
}
