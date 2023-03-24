import React from "react";
import { convert } from "../queries/groups";
import GroupsTemplate from "./groups-template";
import { LayoutType } from "../utils/urls";
import { graphql } from "gatsby";
import { Root } from "../layouts/Root";

export type TagPageProps = {
  data: any;
  pageContext: {
    tag: string;
    current: number;
    size: number;
    total: number;
  };
};

const TagPage: React.FC<TagPageProps> = Root((props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <GroupsTemplate
      data={data}
      id={ctx.tag}
      type="标签"
      layout={LayoutType.CATEGORY}
      current={ctx.current}
      size={ctx.size}
      total={ctx.total}
    />
  );
});

export default TagPage;

export const query = graphql`
  query TagPageQuery(
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
