import { IGatsbyImageData } from "gatsby-plugin-image";

export type ArticlePageData = {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
}[];

// prettier-ignore
export const convert = (data: Queries.ArticlePageQueryQuery): ArticlePageData => {
  return data.allMdx.nodes.map((i) => ({
    link: i.fields?.slug as string,
    title: i.frontmatter?.title as string,
    date: i.frontmatter?.date as string,
    thumbnail: i.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData || undefined,
    categories: (i.frontmatter?.categories as string[]) || undefined,
    tags: (i.frontmatter?.tags as string[]) || undefined,
    excerpt: i.excerpt || ""
  }));
};
