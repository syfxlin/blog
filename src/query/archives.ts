import { ArchivesData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  allMdx: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export const query = graphql`
  query ArchivesQuery {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: ["publish"] } }
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

export const useArchivesData = () => convert(useStaticQuery(query));
