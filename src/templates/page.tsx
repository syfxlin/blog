import React from "react";
import { graphql } from "gatsby";
import { convert } from "../queries/page";
import { PageTemplate } from "./page-template";

export type PageProps = {
  data: any;
  children: React.ReactNode;
  pageContext: {
    link: string;
    layout: string;
    next?: {
      link: string;
      title: string;
    };
    prev?: {
      link: string;
      title: string;
    };
  };
};

const Page: React.FC<PageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <PageTemplate
      link={data.link}
      title={data.title}
      dateCreated={data.dateCreated}
      dateUpdated={data.dateUpdated}
      excerpt={data.excerpt}
      thumbnail={data.thumbnail}
      categories={data.categories}
      tags={data.tags}
      toc={data.toc}
      layout={ctx.layout}
      prev={ctx.prev}
      next={ctx.next}
    >
      {props.children}
    </PageTemplate>
  );
};

export default Page;

export const query = graphql`
  query ($link: String!) {
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
      excerpt
      tableOfContents
    }
  }
`;
