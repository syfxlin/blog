export type Groups = {
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

export const convert = (data: QueryData): Groups => {
  return data.allMdx.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount,
  }));
};

export const archives = `
  query InitArchivesQuery($status: [String!]!) {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
    ) {
      group(field: fields___date_year) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const categories = `
  query InitCategoriesQuery($status: [String!]!) {
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

export const tags = `
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
