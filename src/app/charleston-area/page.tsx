import Link from "next/link";
import type { Metadata } from "next";
import { areaHierarchy, type AreaNode } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Charleston Area Guide",
  description:
    "An overview of the Charleston metro's communities and sub-areas — grouped for navigation, not a claim about legal jurisdiction.",
  path: "/charleston-area",
});

function AreaGroup({ node, depth = 0 }: { node: AreaNode; depth?: number }) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  return (
    <div className={depth > 0 ? "mt-6" : ""}>
      {depth > 0 && (
        <h3 className={depth === 1 ? "text-lg font-semibold text-brand-black" : "font-medium text-brand-black"}>
          {node.name}
        </h3>
      )}
      {hasChildren && (
        <ul className={`mt-2 ${depth === 0 ? "space-y-8" : "grid gap-2 sm:grid-cols-2"}`}>
          {node.children!.map((child) =>
            depth === 0 ? (
              <li key={child.slug}>
                <AreaGroup node={child} depth={depth + 1} />
              </li>
            ) : (
              <li key={child.slug}>
                {child.href ? (
                  <Link href={child.href} className="text-brand-gold-dark hover:underline">
                    {child.name} &rarr;
                  </Link>
                ) : (
                  <span className="text-foreground/60">{child.name}</span>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default function CharlestonAreaPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Charleston Area", path: "/charleston-area" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Charleston Area", href: "/charleston-area" }]} />
      <h1 className="mt-4 text-3xl font-bold text-brand-black sm:text-4xl">Charleston area guide</h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground/70">
        A map of the communities and sub-areas we cover, grouped the way people actually search for
        them. These groupings are editorial/navigation labels, not legal jurisdiction claims — a
        community&rsquo;s actual municipality or county is a separate, per-community fact we verify on its
        own page.
      </p>
      <div className="mt-10">
        <AreaGroup node={areaHierarchy} />
      </div>
      <p className="mt-10 text-xs text-foreground/50">
        Areas without a link yet don&rsquo;t have a dedicated guide published — we&rsquo;d rather
        leave a place unlinked than publish a thin page with nothing useful in it.
      </p>
    </div>
  );
}
