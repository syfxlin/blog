import { IGatsbyImageData } from "gatsby-plugin-image";

export type TocData = {
  url?: string;
  title?: string;
  items?: TocData[];
};

export type PageData = {
  link: string;
  title: string;
  dateCreated: string;
  dateUpdated?: string;
  excerpt?: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
  toc: TocData[];
};

// prettier-ignore
export const convert = (data: any): PageData => {
  return {
    link: data.mdx?.fields?.slug as string,
    title: data.mdx?.frontmatter?.title as string,
    dateCreated: data.mdx?.frontmatter?.date as string,
    dateUpdated: (data.mdx?.frontmatter?.date_updated || data.mdx?.frontmatter?.date) as string,
    excerpt: data.mdx?.excerpt || "",
    thumbnail: data.mdx?.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    categories: (data.mdx?.frontmatter?.categories as string[]) || undefined,
    tags: (data.mdx?.frontmatter?.tags as string[]) || undefined,
    toc: data.mdx?.tableOfContents?.items as any
  };
};
