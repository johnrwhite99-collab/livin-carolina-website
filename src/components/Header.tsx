import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "@/components/MobileNav";

const navLinks = [
  { href: "/start-here", label: "Start Here" },
  { href: "/moving-to-charleston", label: "Moving" },
  { href: "/cost-of-living", label: "Cost of Living" },
  { href: "/charleston-area", label: "Charleston Area" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-gold/30 bg-brand-black text-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold tracking-tight">{siteConfig.editorialBrand}</span>
          <span className="text-[0.65rem] leading-tight text-brand-gold sm:text-xs sm:leading-normal">
            Real estate by the {siteConfig.teamName}
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium lg:flex">
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
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={siteConfig.bookAZoomUrl}
            className="rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
          >
            Book a Zoom
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
