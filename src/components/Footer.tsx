import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-black text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">{siteConfig.compliance.footerLine}</p>
            <p className="mt-1">{siteConfig.compliance.equalHousing}</p>
          </div>
          <div className="text-white/60">
            <p>Serving {siteConfig.primaryArea} &amp; {siteConfig.extendedAreas.join(", ")}</p>
          </div>
        </div>
        <p className="mt-6 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.compliance.footerLine}. All information deemed
          reliable but not guaranteed. CDD, HOA, and assessment figures shown on this site are estimates —
          verify current amounts for any specific property before making a purchase decision.
        </p>
      </div>
    </footer>
  );
}
