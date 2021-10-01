export type TagsData = {
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
  query TagsQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): TagsData => {
  return data.allMdx.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
