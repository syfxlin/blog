export type ArticlesData = {
  link: string;
  layout: string;
  title: string;
}[];

type QueryData = {
  allMdx: {
    nodes: {
      frontmatter: {
        layout: string;
        title: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
};

export const query = `
  query AllArticleQuery($status: [String!]!) {
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
    link: item.fields.slug,
    layout: item.frontmatter.layout,
    title: item.frontmatter.title
  }));
};
