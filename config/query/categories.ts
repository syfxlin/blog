export type CategoriesData = {
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
  query CategoriesQuery($status: [String!]!) {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: $status } }
    ) {
      group(field: categories___category_id___name) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): CategoriesData => {
  return data.allDirectusArticle.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
