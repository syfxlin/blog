import Layout from "../layouts/Layout";
import React from "react";
import Hero from "../components/Hero";
import SplitPanel from "../layouts/SplitPanel";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { join } from "../utils/url";
import { useHeroData } from "../query";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { graphql } from "gatsby";
import { ListPageData } from "../query/types";

type Props = {
  data: QueryData;
  pageContext: {
    currentPage: number;
    pageSize: number;
  };
};

const ListPage: React.FC<Props> = (props) => {
  const hero = useHeroData();
  const data = convert(props.data);
  const pageContext = props.pageContext;
  return (
    <Layout titleTemplate={`%s`} url={join("page", pageContext.currentPage)}>
      <Hero {...hero} />
      <SplitPanel>
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
          onPage={`/page/`}
        />
      </SplitPanel>
    </Layout>
  );
};

export default ListPage;

type QueryData = {
  allMdx: {
    nodes: {
      frontmatter: {
        title: string;
        date: string;
        date_updated: string;
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
  query ListPageQuery($skip: Int!, $limit: Int!, $status: [String!]!) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          date_updated(formatString: "YYYY-MM-DD")
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

export const convert = (data: QueryData): ListPageData => {
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
