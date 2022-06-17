import React from "react";
import { convert } from "../queries/groups";
import GroupsPage from "./groups";
import { LayoutType } from "../utils/urls";
import { graphql } from "gatsby";

export type TagsPageProps = {
  data: Queries.TagsPageQueryQuery;
  pageContext: {
    tag: number;
    current: number;
    size: number;
    total: number;
  };
};

const TagsPage: React.FC<TagsPageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <GroupsPage
      data={data}
      id={ctx.tag}
      type="分类"
      layout={LayoutType.CATEGORY}
      current={ctx.current}
      size={ctx.size}
      total={ctx.total}
    />
  );
};

export default TagsPage;

export const query = graphql`
  query TagsPageQuery(
    $tag: String!
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          tags: { eq: $tag }
          status: { in: $status }
        }
      }
      sort: { order: DESC, fields: frontmatter___date }
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
