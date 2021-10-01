export type AlgoliaIndexData = {
  objectID: string;
  link: string;
  title: string;
  author: string;
  date: string;
  categories?: string[];
  tags?: string[];
  excerpt: string;
  content: string;
}[];

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
  authorJson: {
    firstName: string;
    lastName: string;
  };
};

export const query = `
  query AlgoliaIndexQuery {
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
    authorJson {
      firstName
      lastName
    }
  }
`;

export const convert = (data: QueryData): AlgoliaIndexData => {
  return data.allMdx.nodes.map((node) => ({
    objectID: node.id,
    link: node.fields.slug,
    title: node.frontmatter.title,
    author: `${data.authorJson.firstName} ${data.authorJson.lastName}`,
    date: node.frontmatter.date,
    categories: node.frontmatter.categories || undefined,
    tags: node.frontmatter.tags || undefined,
    excerpt: node.excerpt,
    content: node.rawBody
  }));
};
