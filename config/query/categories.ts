export type CategoriesData = {
  name: string;
  count: number;
}[];

type QueryData = {
  allMdx: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export const query = `
  query CategoriesQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): CategoriesData => {
  return data.allMdx.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
