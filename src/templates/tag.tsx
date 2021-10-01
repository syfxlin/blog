import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import PostCard from "../components/PostCard";
import { join, tag } from "../utils/url";
import Pagination from "../components/Pagination";
import { StyledCard } from "../components/StyledCard";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { graphql } from "gatsby";
import { TagPageData } from "../query/types";

type Props = {
  data: QueryData;
  pageContext: {
    currentPage: number;
    pageSize: number;
    tag: string;
    totalCount: number;
  };
};

const TagPage: React.FC<Props> = (props) => {
  const data = convert(props.data);
  const pageContext = props.pageContext;
  return (
    <Layout
      title={`标签：${pageContext.tag}`}
      url={join(tag(pageContext.tag), "page", pageContext.currentPage)}
    >
      <SplitPanel>
        <StyledCard>
          <h1>标签：{pageContext.tag}</h1>
          <span>共 {pageContext.totalCount} 篇文章</span>
        </StyledCard>
        {data.map((node) => (
          <PostCard
            key={`post-list-${node.link}`}
            link={node.link}
            title={node.title}
            date={node.date}
            author={node.author}
            excerpt={node.excerpt}
            categories={node.categories}
            tags={node.tags}
            thumbnail={node.thumbnail}
          />
        ))}
        <Pagination
          currentPage={pageContext.currentPage}
          pageSize={pageContext.pageSize}
          onPage={join(tag(pageContext.tag), "page")}
        />
      </SplitPanel>
    </Layout>
  );
};

export default TagPage;

type QueryData = {
  allMdx: {
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
        tags: string[] | null;
      };
      fields: {
        slug: string;
      };
      excerpt: string;
    }[];
  };
  authorJson: {
    firstName: string;
    lastName: string;
  };
};

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
    authorJson {
      firstName
      lastName
    }
  }
`;

export const convert = (data: QueryData): TagPageData => {
  return data.allMdx.nodes.map((node) => ({
    link: node.fields.slug,
    title: node.frontmatter.title,
    author: `${data.authorJson.firstName} ${data.authorJson.lastName}`,
    date: node.frontmatter.date,
    thumbnail: node.frontmatter.thumbnail?.childImageSharp.gatsbyImageData,
    categories: node.frontmatter.categories || undefined,
    tags: node.frontmatter.tags || undefined,
    excerpt: node.excerpt
  }));
};
