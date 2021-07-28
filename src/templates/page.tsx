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
  directusArticle: {
    link: string;
    title: string;
    user_created: {
      first_name: string;
      last_name: string;
    };
    date_created: string;
    date_updated?: string;
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
        tableOfContents: { items: TocItem[] };
        body: string;
        excerpt: string;
      };
    };
  };
};

export const query = graphql`
  query PageQuery($link: String!) {
    directusArticle(link: { eq: $link }) {
      link
      title
      user_created {
        first_name
        last_name
      }
      date_created
      date_updated
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
          tableOfContents
          body
          excerpt
        }
      }
    }
  }
`;

export const convert = (data: QueryData): PageData => {
  return {
    link: data.directusArticle.link,
    title: data.directusArticle.title,
    author: `${data.directusArticle.user_created.first_name} ${data.directusArticle.user_created.last_name}`,
    dateCreated: data.directusArticle.date_created.substring(0, 10),
    dateUpdated: data.directusArticle.date_updated?.substring(0, 10),
    thumbnail:
      data.directusArticle.thumbnail?.localFile?.childImageSharp
        .gatsbyImageData,
    categories: data.directusArticle.categories.map(
      (category) => category.category_id.name
    ),
    tags: data.directusArticle.tags.map((tag) => tag.tag_id.name),
    excerpt: data.directusArticle.markdownNode.childMdx.excerpt,
    toc: data.directusArticle.markdownNode.childMdx.tableOfContents,
    body: data.directusArticle.markdownNode.childMdx.body
  };
};
