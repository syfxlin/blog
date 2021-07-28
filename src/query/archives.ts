import { ArchivesData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  allDirectusArticle: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

export const query = graphql`
  query ArchivesQuery {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: ["published"] } }
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

export const useArchivesData = () => convert(useStaticQuery(query));
