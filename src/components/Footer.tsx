import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const secondaryLinks = [
  { href: "/buyers", label: "Buyer Relocation Guide" },
  { href: "/sellers", label: "Free Home Valuation" },
  { href: "/about", label: "About John" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-black text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">{siteConfig.compliance.footerLine}</p>
            <p className="mt-1">{siteConfig.compliance.equalHousing}</p>
            <p className="mt-1 text-white/60">
              Serving {siteConfig.primaryArea} &amp; {siteConfig.extendedAreas.join(", ")}
            </p>
          </div>
          <nav className="flex flex-col gap-1 sm:items-end">
            {secondaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/70 hover:text-brand-gold">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.compliance.footerLine}. All information deemed
          reliable but not guaranteed. Fee, tax, insurance, pricing, and other factual figures on this
          site are estimates or unverified placeholders unless explicitly marked as verified with a
          source and date — confirm current amounts for any specific property before making a decision.
        </p>
      </div>
    </footer>
  );
}
