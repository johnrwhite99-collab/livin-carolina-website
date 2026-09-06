export interface Source {
  label: string;
  url?: string;
}

export function SourceNote({
  sources,
  lastVerified,
}: {
  sources: Source[];
  lastVerified?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-10 border-t border-border pt-4 text-xs text-foreground/50">
      <p>
        Sources:{" "}
        {sources.map((s, i) => (
          <span key={s.label}>
            {i > 0 && ", "}
            {s.url ? (
              <a href={s.url} className="underline hover:text-brand-gold-dark" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              s.label
            )}
          </span>
        ))}
      </p>
      {lastVerified && (
        <p className="mt-1">
          Last verified:{" "}
          {new Date(lastVerified).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
