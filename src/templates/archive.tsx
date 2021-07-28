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
    archive?: string;
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
  allDirectusArticle: {
    group: {
      fieldValue: string;
      nodes: {
        link: string;
        title: string;
        user_created: {
          first_name: string;
          last_name: string;
        };
        date_created: string;
        thumbnail?: {
          localFile?: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
        };
        categories: {
          category_id: {
            name: string;
          };
        }[];
        markdownNode: {
          childMdx: {
            excerpt: string;
          };
        };
      }[];
    }[];
  };
};

export const query = graphql`
  query ArchivePageQuery(
    $archive: String
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allDirectusArticle(
      skip: $skip
      limit: $limit
      filter: {
        fields: { date_created_year: { eq: $archive } }
        layout: { eq: "post" }
        status: { in: $status }
      }
      sort: { order: DESC, fields: date_created }
    ) {
      group(field: fields___date_created_year) {
        fieldValue
        nodes {
          link
          title
          user_created {
            first_name
            last_name
          }
          date_created
          thumbnail {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          categories {
            category_id {
              name
            }
          }
          markdownNode {
            childMdx {
              excerpt(pruneLength: 50)
            }
          }
        }
      }
    }
  }
`;

export const convert = (data: QueryData): ArchivePageData => {
  return data.allDirectusArticle.group.map((archive) => ({
    name: archive.fieldValue,
    items: archive.nodes.map((node) => ({
      link: node.link,
      title: node.title,
      author: `${node.user_created.first_name} ${node.user_created.last_name}`,
      date: node.date_created.substring(0, 10),
      thumbnail: node.thumbnail?.localFile?.childImageSharp.gatsbyImageData,
      categories: node.categories.map((category) => category.category_id.name),
      excerpt: node.markdownNode.childMdx.excerpt
    }))
  }));
};
