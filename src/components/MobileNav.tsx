"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/start-here", label: "Start Here" },
  { href: "/moving-to-charleston", label: "Moving" },
  { href: "/cost-of-living", label: "Cost of Living" },
  { href: "/charleston-area", label: "Charleston Area" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-white/90 transition-colors hover:text-brand-gold"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-brand-black px-6 py-4"
        >
          <nav className="flex flex-col gap-1 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-white/90 transition-colors hover:bg-white/5 hover:text-brand-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={siteConfig.bookAZoomUrl}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-brand-gold px-4 py-2.5 text-center text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
          >
            Book a Zoom
          </a>
        </div>
      )}
    </div>
  );
}
