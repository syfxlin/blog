import { IGatsbyImageData } from "gatsby-plugin-image";

export type GroupsPageData = {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
}[];

// prettier-ignore
export const convert = (data: any): GroupsPageData => {
  return data.allMdx.nodes.map((node: any) => ({
    link: node.fields?.slug as string,
    title: node.frontmatter?.title as string,
    date: node.frontmatter?.date as string,
    thumbnail: node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData || undefined,
    excerpt: node.excerpt || "",
    categories: (node.frontmatter?.categories as string[]) || undefined,
    tags: (node.frontmatter?.tags as string[]) || undefined
  }));
};
