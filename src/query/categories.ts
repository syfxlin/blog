import { CategoriesData } from "./types";
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
  query CategoriesQuery {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: ["publish"] } }
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
  return data.allMdx.group
    .map((item) => ({
      name: item.fieldValue,
      count: item.totalCount
    }))
    .sort((a, b) => b.count - a.count);
};

export const useCategoriesData = () => convert(useStaticQuery(query));
