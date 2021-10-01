import React from "react";
import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { TocItem } from "../components/Toc";
import { PageData } from "../query/types";
import Page from "../components/Page";

type Props = {
  data: QueryData;
  pageContext: {
    link: string;
    next?: {
      link: string;
      title: string;
    };
    prev?: {
      link: string;
      title: string;
    };
    layout: string;
  };
};

const PageTemplate: React.FC<Props> = (props) => {
  const data = convert(props.data);
  const pageContext = props.pageContext;
  return <Page data={data} pageContext={pageContext} />;
};

export default PageTemplate;

type QueryData = {
  mdx: {
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
    tableOfContents: { items: TocItem[] };
    body: string;
    excerpt: string;
  };
  authorJson: {
    firstName: string;
    lastName: string;
  };
};

export const query = graphql`
  query PageQuery($link: String!) {
    mdx(fields: { slug: { eq: $link } }) {
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
      tableOfContents
      body
      excerpt
    }
    authorJson {
      firstName
      lastName
    }
  }
`;

export const convert = (data: QueryData): PageData => {
  return {
    link: data.mdx.fields.slug,
    title: data.mdx.frontmatter.title,
    author: `${data.authorJson.firstName} ${data.authorJson.lastName}`,
    dateCreated: data.mdx.frontmatter.date,
    dateUpdated: data.mdx.frontmatter.date_updated,
    thumbnail: data.mdx.frontmatter.thumbnail?.childImageSharp.gatsbyImageData,
    categories: data.mdx.frontmatter.categories || undefined,
    tags: data.mdx.frontmatter.tags || undefined,
    excerpt: data.mdx.excerpt,
    toc: data.mdx.tableOfContents,
    body: data.mdx.body
  };
};
