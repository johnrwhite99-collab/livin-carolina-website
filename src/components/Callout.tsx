import type { ReactNode } from "react";

const STYLES = {
  info: "border-brand-gold/40 bg-brand-gold/10 text-brand-black",
  warning: "border-amber-400/50 bg-amber-50 text-amber-900",
  unverified: "border-red-300 bg-red-50 text-red-900",
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof STYLES;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 text-sm ${STYLES[type]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}
