export type ArticlesData = {
  link: string;
  layout: string;
  title: string;
}[];

type QueryData = {
  allDirectusArticle: {
    nodes: {
      link: string;
      layout: string;
      title: string;
    }[];
  };
};

export const query = `
  query AllArticleQuery($status: [String!]!) {
    allDirectusArticle(
      sort: { order: DESC, fields: date_created }
      filter: { status: { in: $status } }
    ) {
      nodes {
        link
        layout
        title
      }
    }
  }
`;

export const convert = (data: QueryData): ArticlesData => {
  return data.allDirectusArticle.nodes;
};
