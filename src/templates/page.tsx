import React from "react";
import { graphql } from "gatsby";
import { convert } from "../queries/page";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage } from "gatsby-plugin-image";
import { AspectRatio } from "../components/AspectRatio";
import { Footer } from "../layouts/Footer";
import { useU } from "@syfxlin/ustyled";
import { MoreInfo } from "../components/MoreInfo";
import { ExpireNotify } from "../components/ExpireNotify";

export type PageProps = {
  data: any;
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
  const { css } = useU();
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <>
      {/*prettier-ignore*/}
      <Header
        url={`{url}${ctx.link}`}
        title={`${data.title} | {title}`}
        description={data.excerpt}
        image={data.thumbnail?.images?.fallback?.src && `{url}${data.thumbnail?.images?.fallback?.src}`}
      />
      <Main>
        <article>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <GatsbyImage
                alt={`缩略图：${data.title}`}
                image={data.thumbnail}
              />
            </AspectRatio>
          )}
          <header
            css={css`
              text-align: center;
              padding: .sp(6) 0 .sp(1) 0;
            `}
          >
            <h1
              css={css`
                margin: 0;
                font-weight: 400;
                font-size: .fs(1.7);
                color: .c(gray9, dark0);
              `}
            >
              {data.title}
            </h1>
            <MoreInfo
              date={data.dateCreated}
              categories={data.categories}
              tags={data.tags}
            />
          </header>
          <ExpireNotify date={data.dateUpdated} />
          <MDXRenderer>{data.body}</MDXRenderer>
        </article>
      </Main>
      <Footer />
    </>
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
