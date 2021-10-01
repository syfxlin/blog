export type ArchivesData = {
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
  query ArchivesQuery($status: [String!]!) {
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

export const convert = (data: QueryData): ArchivesData => {
  return data.allMdx.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
