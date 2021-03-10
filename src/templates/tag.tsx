import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import { graphql } from "gatsby";
import PostCard from "../components/PostCard";
import { join, tag } from "../utils/url";
import Pagination from "../components/Pagination";
import { StyledCard } from "./StyledCard";

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
    };
  };
  pageContext: {
    currentPage: number;
    pageSize: number;
    tag: string;
    totalCount: number;
  };
};

const TagPage: React.FC<Props> = ({ data, pageContext }) => {
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
        {data.allMdx.nodes.map((node) => (
          <PostCard
            key={`post-list-${node.fields.link}`}
            link={node.fields.link}
            author={data.site.siteMetadata.author.name}
            excerpt={node.excerpt}
            {...node.frontmatter}
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

export const query = graphql`
  query TagPageQuery($tag: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    allMdx(
      filter: {
        frontmatter: { tags: { eq: $tag } }
        fields: { layout: { eq: "post" } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          link
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          thumbnail
          categories
          tags
        }
        excerpt
      }
    }
  }
`;
