export type ArchivesData = {
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
  query ArchivesQuery($status: [String!]!) {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: $status } }
    ) {
      group(field: fields___date_created_year) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): ArchivesData => {
  return data.allDirectusArticle.group.map((item) => ({
    name: item.fieldValue,
    count: item.totalCount
  }));
};
