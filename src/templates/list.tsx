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
  allDirectusArticle: {
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
      tags: {
        tag_id: {
          name: string;
        };
      }[];
      markdownNode: {
        childMdx: {
          excerpt: string;
        };
      };
    }[];
  };
};

export const query = graphql`
  query ListPageQuery($skip: Int!, $limit: Int!, $status: [String!]!) {
    allDirectusArticle(
      skip: $skip
      limit: $limit
      filter: { layout: { eq: "post" }, status: { in: $status } }
      sort: { order: DESC, fields: date_created }
    ) {
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
        tags {
          tag_id {
            name
          }
        }
        markdownNode {
          childMdx {
            excerpt
          }
        }
      }
    }
  }
`;

export const convert = (data: QueryData): ListPageData => {
  return data.allDirectusArticle.nodes.map((node) => ({
    link: node.link,
    title: node.title,
    author: `${node.user_created.first_name} ${node.user_created.last_name}`,
    date: node.date_created.substring(0, 10),
    thumbnail: node.thumbnail?.localFile?.childImageSharp.gatsbyImageData,
    categories: node.categories.map((category) => category.category_id.name),
    tags: node.tags.map((tag) => tag.tag_id.name),
    excerpt: node.markdownNode.childMdx.excerpt
  }));
};
