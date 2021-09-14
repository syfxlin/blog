export type TagsData = {
  name: string;
  count: number;
}[];

type QueryData = {
  allDirectusArticle: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export const query = `
  query TagsQuery($status: [String!]!) {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: $status } }
    ) {
      group(field: tags___tag_id___name) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): TagsData => {
  return data.allDirectusArticle.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
