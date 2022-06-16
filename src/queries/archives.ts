import { IGatsbyImageData } from "gatsby-plugin-image";

export type ArchivesPageData = {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
}[];

// prettier-ignore
export const convert = (data: Queries.ArchivesPageQueryQuery): ArchivesPageData => {
  return data.allMdx.nodes.map((node) => ({
    link: node.fields?.slug as string,
    title: node.frontmatter?.title as string,
    date: node.frontmatter?.date as string,
    thumbnail: node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData || undefined,
    excerpt: node.excerpt || "",
    categories: (node.frontmatter?.categories as string[]) || undefined,
    tags: (node.frontmatter?.tags as string[]) || undefined
  }));
};
