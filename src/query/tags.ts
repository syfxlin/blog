import { TagsData } from "./types";
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
  query TagsQuery {
    allMdx(
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: ["publish"] } }
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
  return data.allMdx.group
    .map((item) => ({
      name: item.fieldValue,
      count: item.totalCount
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
};

export const useTagsData = () => convert(useStaticQuery(query));
