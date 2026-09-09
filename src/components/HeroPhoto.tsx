import Image from "next/image";

// Real-photo slot for the homepage hero. Pass `src` once a real Charleston/
// Lowcountry photo exists in public/images/ — until then this renders a
// deliberate, tasteful placeholder rather than a fake stock photo or a
// broken image. Recommended source dimensions: 1600x1200 or larger (4:3
// landscape) — see README for the full image-prep checklist.
export function HeroPhoto({
  src,
  alt,
  priority = false,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-black/[0.04] via-surface to-brand-gold/10"
      role="img"
      aria-label={alt}
    >
      <svg viewBox="0 0 400 300" className="h-2/3 w-2/3 opacity-70" aria-hidden="true">
        {/* Minimal line-art suggestion of a cable-stayed bridge over water —
            an abstract nod to the Ravenel Bridge, not a claim of a specific
            photo. Swapped out entirely once a real photo is supplied. */}
        <line x1="40" y1="230" x2="360" y2="230" stroke="var(--border)" strokeWidth="2" />
        <line x1="140" y1="60" x2="140" y2="230" stroke="var(--brand-black)" strokeOpacity="0.35" strokeWidth="3" />
        <line x1="260" y1="60" x2="260" y2="230" stroke="var(--brand-black)" strokeOpacity="0.35" strokeWidth="3" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`l-${i}`}
            x1={140 - i * 22}
            y1={70 + i * 32}
            x2={140}
            y2="230"
            stroke="var(--brand-gold)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`r-${i}`}
            x1={260 + i * 22}
            y1={70 + i * 32}
            x2={260}
            y2="230"
            stroke="var(--brand-gold)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <span className="absolute bottom-3 left-4 text-xs font-medium tracking-wide text-foreground/40">
        Charleston photo — coming soon
      </span>
    </div>
  );
}
