import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/groups";
import GroupsTemplate from "./groups-template";
import { LayoutType } from "../utils/urls";
import { Root } from "../layouts/Root";

export type CategoryPageProps = {
  data: any;
  pageContext: {
    category: string;
    current: number;
    size: number;
    total: number;
  };
};

const CategoryPage: React.FC<CategoryPageProps> = Root((props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <GroupsTemplate
      data={data}
      id={ctx.category}
      type="分类"
      layout={LayoutType.CATEGORY}
      current={ctx.current}
      size={ctx.size}
      total={ctx.total}
    />
  );
});

export default CategoryPage;

export const query = graphql`
  query CategoryPageQuery(
    $category: String!
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        frontmatter: {
          categories: { eq: $category }
          layout: { eq: "post" }
          status: { in: $status }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          categories
          tags
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
