import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import { graphql, Link } from "gatsby";
import { PageSubInfo } from "../components/PageInfo";
import Card from "../components/Card";
import { StyledCard } from "./StyledCard";
import styled from "styled-components";
import { rgba } from "polished";
import { Excerpt } from "../components/PostCard";
import { join, layout } from "../utils/url";
import Pagination from "../components/Pagination";

type Props = {
  data: {
    site: {
      siteMetadata: {
        author: {
          name: string;
        };
      };
    };
    allMdx: {
      group: {
        fieldValue: string;
        nodes: {
          fields: {
            link: string;
          };
          frontmatter: {
            title: string;
            date: string;
            thumbnail?: string;
            categories?: string[];
            tags?: string[];
          };
          excerpt: string;
        }[];
      }[];
    };
  };
  pageContext: {
    currentPage: number;
    pageSize: number;
    archive?: string;
    totalCount: number;
  };
};

const ArchivePage: React.FC<Props> = ({ data, pageContext }) => {
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
          <h1>归档：{pageContext.archive}</h1>
          <span>共 {pageContext.totalCount} 篇文章</span>
        </StyledCard>
        <Card>
          <div className="timeline">
            {data.allMdx.group
              .sort(
                (g1, g2) => parseInt(g2.fieldValue) - parseInt(g1.fieldValue)
              )
              .map((g) => (
                <>
                  <div className="timeline-item">
                    <div className="timeline-left">
                      <div className="timeline-icon icon-lg" />
                    </div>
                    <div className="timeline-content">{g.fieldValue}</div>
                  </div>
                  {g.nodes.map((node) => (
                    <div
                      className="timeline-item"
                      key={`timeline-${node.fields.link}`}
                    >
                      <div className="timeline-left">
                        <div className="timeline-icon" />
                      </div>
                      <div className="timeline-content">
                        <Title>
                          <Link to={node.fields.link}>
                            {node.frontmatter.title}
                          </Link>
                        </Title>
                        <PageSubInfo
                          date={node.frontmatter.date}
                          author={data.site.siteMetadata.author.name}
                          categories={node.frontmatter.categories}
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

export const query = graphql`
  query ArchivePageQuery($archive: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    allMdx(
      filter: { fields: { year: { eq: $archive }, layout: { eq: "post" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      group(field: fields___year) {
        nodes {
          fields {
            link
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            thumbnail
            categories
          }
          excerpt(pruneLength: 50)
        }
        fieldValue
      }
    }
  }
`;
