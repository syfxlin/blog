import { CategoriesData } from "./types";
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
  query CategoriesQuery {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: ["published"] } }
    ) {
      group(field: categories___category_id___name) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): CategoriesData => {
  return data.allDirectusArticle.group
    .map((item) => ({
      name: item.fieldValue,
      count: item.totalCount
    }))
    .sort((a, b) => b.count - a.count);
};

export const useCategoriesData = () => convert(useStaticQuery(query));
