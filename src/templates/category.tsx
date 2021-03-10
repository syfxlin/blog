import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import { graphql } from "gatsby";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { category, join } from "../utils/url";
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
    category: string;
    totalCount: number;
  };
};

const CategoryPage: React.FC<Props> = ({ data, pageContext }) => {
  return (
    <Layout
      title={`分类：${pageContext.category}`}
      url={join(
        category(pageContext.category),
        "page",
        pageContext.currentPage
      )}
    >
      <SplitPanel>
        <StyledCard>
          <h1>分类：{pageContext.category}</h1>
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
          onPage={join(category(pageContext.category), "page")}
        />
      </SplitPanel>
    </Layout>
  );
};

export default CategoryPage;

export const query = graphql`
  query CategoryPageQuery($category: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    allMdx(
      filter: {
        frontmatter: { categories: { eq: $category } }
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
