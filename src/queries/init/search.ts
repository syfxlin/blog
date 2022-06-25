export type SearchItem = {
  objectID: string;
  link: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  categories?: string[];
  tags?: string[];
};

export type SearchData = SearchItem[];

type QueryData = {
  allMdx: {
    nodes: {
      id: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        date: string;
        categories: string[] | null;
        tags: string[] | null;
      };
      excerpt: string;
      rawBody: string;
    }[];
  };
};

export const query = `
  query InitSearchQuery {
    allMdx(filter: { frontmatter: { status: { in: ["publish"] } } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          categories
          tags
        }
        excerpt
        rawBody
      }
    }
  }
`;

export const convert = (data: QueryData): SearchData => {
  return data.allMdx.nodes.map((node) => ({
    objectID: node.id,
    link: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    categories: node.frontmatter.categories || undefined,
    tags: node.frontmatter.tags || undefined,
    excerpt: node.excerpt,
    content: node.rawBody,
  }));
};
