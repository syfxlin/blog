import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import { graphql, Link } from "gatsby";
import { PageSubInfo } from "../components/PageInfo";
import Card from "../components/Card";
import { StyledCard } from "../components/StyledCard";
import styled from "styled-components";
import { rgba } from "polished";
import { Excerpt } from "../components/PostCard";
import { join, layout } from "../utils/url";
import Pagination from "../components/Pagination";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { ArchivePageData } from "../query/types";

type Props = {
  data: QueryData;
  pageContext: {
    currentPage: number;
    pageSize: number;
    archive?: number;
    totalCount: number;
  };
};

const ArchivePage: React.FC<Props> = (props: Props) => {
  const data = convert(props.data);
  const pageContext = props.pageContext;
  return (
    <Layout
      title={`归档：${pageContext.archive || "时光轴"}`}
      url={join(
        layout(
          pageContext.archive || "",
          pageContext.archive ? "archive" : "timeline"
        ),
        "page",
        pageContext.currentPage
      )}
    >
      <SplitPanel>
        <StyledCard>
          <h1>归档：{pageContext.archive || "时光轴"}</h1>
          <span>共 {pageContext.totalCount} 篇文章</span>
        </StyledCard>
        <Card>
          <div className="timeline">
            {data
              .sort((g1, g2) => parseInt(g2.name) - parseInt(g1.name))
              .map((g) => (
                <>
                  <div className="timeline-item">
                    <div className="timeline-left">
                      <div className="timeline-icon icon-lg" />
                    </div>
                    <div className="timeline-content">{g.name}</div>
                  </div>
                  {g.items.map((node) => (
                    <div
                      className="timeline-item"
                      key={`timeline-${node.link}`}
                    >
                      <div className="timeline-left">
                        <div className="timeline-icon" />
                      </div>
                      <div className="timeline-content">
                        <Title>
                          <Link to={node.link}>{node.title}</Link>
                        </Title>
                        <PageSubInfo
                          date={node.date}
                          author={node.author}
                          categories={node.categories}
                        />
                        <Excerpt>{node.excerpt}</Excerpt>
                      </div>
                    </div>
                  ))}
                </>
              ))}
          </div>
        </Card>
        <Pagination
          currentPage={pageContext.currentPage}
          pageSize={pageContext.pageSize}
          onPage={join(
            layout(
              pageContext.archive || "",
              pageContext.archive ? "archive" : "timeline"
            ),
            "page"
          )}
        />
      </SplitPanel>
    </Layout>
  );
};

const Title = styled.div`
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => rgba(theme.text, 0.9)};
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export default ArchivePage;

type QueryData = {
  allMdx: {
    group: {
      fieldValue: string;
      nodes: {
        frontmatter: {
          title: string;
          date: string;
          thumbnail: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          } | null;
          categories: string[] | null;
        };
        fields: {
          slug: string;
        };
        excerpt: string;
      }[];
    }[];
  };
  authorJson: {
    firstName: string;
    lastName: string;
  };
};

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
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      group(field: fields___date_year) {
        fieldValue
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
          }
          fields {
            slug
          }
          excerpt(pruneLength: 50)
        }
      }
    }
    authorJson {
      firstName
      lastName
    }
  }
`;

export const convert = (data: QueryData): ArchivePageData => {
  return data.allMdx.group.map((archive) => ({
    name: archive.fieldValue,
    items: archive.nodes.map((node) => ({
      link: node.fields.slug,
      title: node.frontmatter.title,
      author: `${data.authorJson.firstName} ${data.authorJson.lastName}`,
      date: node.frontmatter.date,
      thumbnail: node.frontmatter.thumbnail?.childImageSharp.gatsbyImageData,
      categories: node.frontmatter.categories || undefined,
      excerpt: node.excerpt
    }))
  }));
};
