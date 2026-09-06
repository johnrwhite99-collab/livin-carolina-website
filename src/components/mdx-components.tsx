import type { ComponentProps } from "react";
import { slugify } from "@/lib/slugify";
import { FactCard } from "./FactCard";
import { ComparisonTable } from "./ComparisonTable";
import { Callout } from "./Callout";
import { SourceNote } from "./SourceNote";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { RelatedContent } from "./RelatedContent";
import { FAQSection } from "./FAQSection";

function textContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textContent).join("");
  return "";
}

// Maps both plain Markdown elements (styled to match the brand) and the
// custom components guide/blog MDX content can use directly, e.g. <Callout>.
export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 id={slugify(textContent(props.children))} className="mt-10 text-2xl font-bold text-brand-black" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 id={slugify(textContent(props.children))} className="mt-6 text-xl font-semibold text-brand-black" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground/80" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/80" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/80" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-brand-gold-dark underline hover:text-brand-black" {...props} />,
  table: (props: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => <thead className="bg-brand-black text-white" {...props} />,
  th: (props: ComponentProps<"th">) => <th className="px-4 py-3 font-semibold" {...props} />,
  td: (props: ComponentProps<"td">) => <td className="border-t border-border px-4 py-3 text-foreground/70" {...props} />,
  FactCard,
  ComparisonTable,
  Callout,
  SourceNote,
  YouTubeEmbed,
  RelatedContent,
  FAQSection,
};
