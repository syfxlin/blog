import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import Thumbnail from "../components/Thumbnail";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PageInfo from "../components/PageInfo";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { hsl, parseToHsl, rgba } from "polished";
import Copyright from "../components/Copyright";
import TagList from "../components/TagList";
import Card from "../components/Card";
import { TocItem } from "../components/Toc";
import loadable from "@loadable/component";

const Artalk = loadable(() => import("../components/Artalk"), { ssr: false });

type Page = {
  body: string;
  fields: {
    link: string;
  };
  frontmatter: {
    title: string;
    date: string;
    thumbnail?: string;
    categories?: string[];
    tags: string[];
  };
  tableOfContents: {
    items: TocItem[];
  };
  excerpt: string;
};

type Props = {
  data: {
    mdx: Page;
    site: {
      siteMetadata: {
        siteUrl: string;
        author: {
          name: string;
          email: string;
        };
        license: {
          label: string;
          href: string;
        };
        artalk: {
          serverUrl: string;
        };
      };
    };
  };
  pageContext: {
    link: string;
    next?: Page;
    prev?: Page;
    layout: string;
  };
};

const PageTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const thumbnail = data.mdx.frontmatter.thumbnail;
  return (
    <Layout
      title={data.mdx.frontmatter.title}
      description={data.mdx.excerpt}
      url={pageContext.link}
    >
      <SplitPanel toc={data.mdx.tableOfContents.items}>
        <Card>
          {thumbnail && <Thumbnail url={thumbnail} />}
          <PageInfo
            title={data.mdx.frontmatter.title}
            date={data.mdx.frontmatter.date}
            author={data.site.siteMetadata.author.name}
            categories={data.mdx.frontmatter.categories}
          />
          <StyledArticle>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </StyledArticle>
          {pageContext.layout === "post" && (
            <Copyright
              license={data.site.siteMetadata.license}
              author={data.site.siteMetadata.author.name}
              post={{
                label: data.mdx.frontmatter.title,
                href: data.site.siteMetadata.siteUrl + pageContext.link
              }}
            />
          )}
          <TagList tags={data.mdx.frontmatter.tags} />
        </Card>
        {pageContext.layout === "post" &&
          (pageContext.prev || pageContext.next) && (
            <PaginationCard>
              <ul className="pagination">
                {pageContext.prev && (
                  <li className="page-item page-prev">
                    <Link to={pageContext.prev.fields.link}>
                      <i className="icon icon-back" />
                      <div>
                        <div className="page-item-subtitle">上一篇</div>
                        <div className="page-item-title h5">
                          {pageContext.prev.frontmatter.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                )}
                {pageContext.next && (
                  <li className="page-item page-next">
                    <Link to={pageContext.next.fields.link}>
                      <div>
                        <div className="page-item-subtitle">下一篇</div>
                        <div className="page-item-title h5">
                          {pageContext.next.frontmatter.title}
                        </div>
                      </div>
                      <i className="icon icon-forward" />
                    </Link>
                  </li>
                )}
              </ul>
            </PaginationCard>
          )}
        {Artalk && data.site.siteMetadata.artalk && (
          <Card>
            <Artalk
              pageKey={pageContext.link}
              {...data.site.siteMetadata.artalk}
            />
          </Card>
        )}
      </SplitPanel>
    </Layout>
  );
};

const StyledArticle = styled.article`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => rgba(theme.text, 0.9)};
  word-break: break-word;
  margin-top: 1rem;
  line-height: 1.8;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;
    width: 100%;
    border: 0.05rem solid #dadee4;
    margin-top: 1rem;

    td {
      border-bottom: 0.05rem solid #dadee4;
      border-left: 0.05rem solid #dadee4;
      padding: 0.6rem 0.4rem;
    }

    th {
      border-bottom: 0.05rem solid #dadee4;
      border-left: 0.05rem solid #dadee4;
      padding: 0.6rem 0.4rem;
      border-bottom-width: 0.1rem;
    }
  }

  blockquote {
    border-left: 0.2rem solid #dadee4;
  }

  hr {
    border: none;
    border-bottom: 2px solid #8f98a1;
    width: 20%;

    &.is-style-wide,
    &.is-style-dots {
      width: 100%;
    }

    &:not(.is-style-dots) {
      position: relative;
      background-color: #cacfd6;
      border: none;
      overflow: hidden;
      height: 2px;

      &::before {
        position: absolute;
        content: "";
        top: -2px;
        width: 64px;
        height: 4px;
        background: linear-gradient(
          90deg,
          ${({ theme }) => rgba(theme.primary, 0)},
          ${({ theme }) => rgba(theme.primary, 1)}
        );
        transform: translate3d(-64px, 0, 0);
        animation: hrLine 6s ease-in-out 0s infinite;
      }
    }
  }

  p {
    margin: 0 0 0.6rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border-bottom: 1px dashed ${({ theme }) => rgba(theme.divider, 0.1)};
    padding-bottom: 0.4rem;
    color: ${({ theme }) => rgba(theme.text, 0.9)};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    position: relative;

    a {
      display: none !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      display: block;
      width: 2rem;
      height: 0.15rem;
      background: ${({ theme }) => {
        const h = parseToHsl(theme.primary);
        return `linear-gradient(
          ${hsl(h.hue, h.saturation, h.lightness + 0.1)} 30%,
          ${hsl(h)} 70%
        )`;
      }};
      box-shadow: 0 3px 3px ${({ theme }) => rgba(theme.primary, 0.4)};
      border-radius: 4px;
      transition: 0.25s;
      z-index: 1;
    }
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 0.8rem;
  }

  code {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }

  img {
    height: auto;
    display: block;
    max-width: 100%;
    margin-bottom: 15px;

    &.lazy:not(.loaded) {
      width: 100%;
      height: 200px;
    }
  }

  a {
    text-decoration: none;
    position: relative;

    transition: background-size 0.25s ease-out;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 0 2px;
    background-image: ${({ theme }) => theme.primary};

    &:hover {
      background-size: 100% 2px;
      background-position: bottom left;
    }
  }

  ul {
    ul {
      margin-top: 0;
      margin-bottom: 0;

      ul {
        list-style-type: square;
      }
    }
  }
`;

const PaginationCard = styled(Card)`
  padding: 0 1.5rem !important;

  .page-prev,
  .page-next {
    a {
      display: flex;
      align-items: center;
    }
  }

  .page-prev {
    i {
      margin-right: 0.8rem;
    }
  }

  .page-next {
    a {
      justify-content: flex-end;
    }

    i {
      margin-left: 0.8rem;
    }
  }
`;

export default PageTemplate;

export const query = graphql`
  query PageBySlug($link: String!) {
    site {
      siteMetadata {
        siteUrl
        author {
          name
          email
        }
        license {
          label
          href
        }
        artalk {
          serverUrl
        }
      }
    }
    mdx(fields: { link: { eq: $link } }) {
      body
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
      tableOfContents
      excerpt
    }
  }
`;
