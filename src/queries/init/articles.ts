export type ArticlesData = {
  link: string;
  layout: string;
  title: string;
}[];

type QueryData = {
  allMdx: {
    nodes: Queries.Mdx[];
  };
};

export const query = `
  query InitArticlesQuery($status: [String!]!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { status: { in: $status } } }
    ) {
      nodes {
        frontmatter {
          layout
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;

export const convert = (data: QueryData): ArticlesData => {
  return data.allMdx.nodes.map((item) => ({
    link: item.fields?.slug as string,
    layout: item.frontmatter?.layout as string,
    title: item.frontmatter?.title as string,
  }));
};
