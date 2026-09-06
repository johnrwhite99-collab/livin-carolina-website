// Author records — used for guide/blog bylines, the author box, and Person
// JSON-LD. Kept separate from siteConfig since a multi-author site would
// need more than one of these; today there's just the one.

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  brokerageAffiliation: string;
  photo?: string;
}

export const authors: Record<string, Author> = {
  "john-white": {
    slug: "john-white",
    name: "John White",
    role: "Realtor, Livin' Carolina Team",
    bio: "John White has lived and worked in the Charleston area since 1998, helping people relocate to Summerville, Charleston, Mount Pleasant, and the rest of the Lowcountry. John in Charleston is his ongoing effort to answer the questions people actually ask before they call an agent — real costs, real neighborhoods, no filler.",
    brokerageAffiliation: "Livin' Carolina Team at Realty ONE Group Coastal",
  },
};

export function getAuthor(slug: string): Author {
  const author = authors[slug];
  if (!author) throw new Error(`Unknown author: ${slug}`);
  return author;
}

export const defaultAuthor = authors["john-white"];
