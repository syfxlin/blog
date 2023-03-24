import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/groups";
import { LayoutType } from "../utils/urls";
import GroupsTemplate from "./groups-template";
import { Root } from "../layouts/Root";

export type ArchivePageProps = {
  data: any;
  pageContext: {
    archive: number;
    current: number;
    size: number;
    total: number;
  };
};

const ArchivePage: React.FC<ArchivePageProps> = Root((props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <GroupsTemplate
      data={data}
      id={ctx.archive}
      type="归档"
      layout={LayoutType.ARCHIVE}
      current={ctx.current}
      size={ctx.size}
      total={ctx.total}
    />
  );
});

export default ArchivePage;

export const query = graphql`
  query ArchivePageQuery(
    $archive: Int
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        fields: { date_year: { eq: $archive } }
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
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
