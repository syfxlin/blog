import Layout from "../layouts/Layout";
import React from "react";
import Hero from "../components/Hero";
import { graphql } from "gatsby";
import SplitPanel from "../layouts/SplitPanel";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { join } from "../utils/url";

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: {
          name: string;
        };
        hero: {
          title: string;
          subtitle: string;
          link: {
            label: string;
            href: string;
          };
          background: string[];
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
  };
};

const ListPage: React.FC<Props> = ({ data, pageContext }) => {
  return (
    <Layout
      title={data.site.siteMetadata.title}
      titleTemplate={`%s`}
      url={join("page", pageContext.currentPage)}
    >
      <Hero {...data.site.siteMetadata.hero} />
      <SplitPanel>
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
          onPage={`/page/`}
        />
      </SplitPanel>
    </Layout>
  );
};

export default ListPage;

export const query = graphql`
  query ListPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
        hero {
          title
          subtitle
          link {
            label
            href
          }
          background
        }
      }
    }
    allMdx(
      filter: { fields: { layout: { eq: "post" } } }
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
