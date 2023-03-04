export type ArticlesData = {
  link: string;
  layout: string;
  title: string;
  contentPath: string;
}[];

type QueryData = {
  allMdx: {
    nodes: any[];
  };
};

export const query = `
  query InitArticlesQuery($status: [String!]!) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
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
        parent {
          ... on File {
            absolutePath
          }
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
    // @ts-ignore
    contentPath: item.parent?.absolutePath as string,
  }));
};
