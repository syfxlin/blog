import React from "react";
import loadable from "@loadable/component";
import { graphql } from "gatsby";
import { convert } from "../queries/page";
import { PageTemplate } from "./page-template";

const Artalk = loadable(() => import("../components/Artalk"), { ssr: false });

export type PageProps = {
  data: Queries.PageQueryQuery;
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
      body={data.body}
      thumbnail={data.thumbnail}
      categories={data.categories}
      tags={data.tags}
      toc={data.toc}
      layout={ctx.layout}
      prev={ctx.prev}
      next={ctx.next}
    />
  );
};

export default Page;

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
      excerpt
      tableOfContents
      body
    }
  }
`;
