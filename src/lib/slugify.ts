export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

// Lightweight heading extraction for the table-of-contents component — a full
// remark AST pass isn't worth another dependency for our own authored MDX,
// which only ever uses plain "## "/"### " headings.
export function extractHeadings(mdxSource: string): Heading[] {
  const lines = mdxSource.split("\n");
  const headings: Heading[] = [];
  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) headings.push({ id: slugify(h2[1]), text: h2[1].trim(), level: 2 });
    else if (h3) headings.push({ id: slugify(h3[1]), text: h3[1].trim(), level: 3 });
  }
  return headings;
}
