import { TagsData } from "./types";
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
  query TagsQuery {
    allDirectusArticle(
      filter: { layout: { eq: "post" }, status: { in: ["published"] } }
    ) {
      group(field: tags___tag_id___name) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const convert = (data: QueryData): TagsData => {
  return data.allDirectusArticle.group
    .map((item) => ({
      name: item.fieldValue,
      count: item.totalCount
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
};

export const useTagsData = () => convert(useStaticQuery(query));
