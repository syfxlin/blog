import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { category, join } from "../utils/url";
import { StyledCard } from "../components/StyledCard";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { graphql } from "gatsby";
import { CategoryPageData } from "../query/types";

type Props = {
  data: QueryData;
  pageContext: {
    currentPage: number;
    pageSize: number;
    category: string;
    totalCount: number;
  };
};

const CategoryPage: React.FC<Props> = (props: Props) => {
  const data = convert(props.data);
  const pageContext = props.pageContext;
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
          onPage={join(category(pageContext.category), "page")}
        />
      </SplitPanel>
    </Layout>
  );
};

export default CategoryPage;

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

export const convert = (data: QueryData): CategoryPageData => {
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
