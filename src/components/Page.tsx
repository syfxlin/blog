import React from "react";
import Layout from "../layouts/Layout";
import SplitPanel from "../layouts/SplitPanel";
import Thumbnail from "./Thumbnail";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PageInfo from "./PageInfo";
import { Link } from "gatsby";
import styled from "styled-components";
import { hsl, parseToHsl, rgba } from "polished";
import Copyright from "./Copyright";
import TagList from "./TagList";
import Card from "./Card";
import loadable from "@loadable/component";
import { useArtalkData, useLicenseData, useSeoData } from "../query";
import Expire from "./Expire";
import { PageData } from "../query/types";

const Artalk = loadable(() => import("./Artalk"), { ssr: false });

type Props = {
  data: PageData;
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
  render?: (article: JSX.Element) => JSX.Element | React.ReactNode;
};

const Page: React.FC<Props> = ({
  data,
  pageContext,
  render = (element) => element
}) => {
  const seo = useSeoData();
  const artalk = useArtalkData();
  const license = useLicenseData();
  return (
    <Layout
      title={data.title}
      description={data.excerpt}
      url={pageContext.link}
    >
      <SplitPanel toc={data.toc?.items}>
        <Card>
          {data.thumbnail && <Thumbnail image={data.thumbnail} />}
          <PageInfo
            title={data.title}
            date={data.dateCreated}
            author={data.author}
            categories={data.categories}
          />
          {pageContext.layout === "post" && (
            <Expire date={data.dateUpdated || data.dateCreated} />
          )}
          <StyledArticle>
            {render(<MDXRenderer>{data.body}</MDXRenderer>)}
          </StyledArticle>
          {pageContext.layout === "post" && license && (
            <Copyright
              license={license}
              author={data.author}
              post={{
                label: data.title,
                href: seo.url + pageContext.link
              }}
            />
          )}
          <TagList tags={data.tags} />
        </Card>
        {pageContext.layout === "post" &&
          (pageContext.prev || pageContext.next) && (
            <PaginationCard>
              <ul className="pagination">
                {pageContext.prev && (
                  <li className="page-item page-prev">
                    <Link to={pageContext.prev.link}>
                      <i className="icon icon-back" />
                      <div>
                        <div className="page-item-subtitle">上一篇</div>
                        <div className="page-item-title h5">
                          {pageContext.prev.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                )}
                {pageContext.next && (
                  <li className="page-item page-next">
                    <Link to={pageContext.next.link}>
                      <div>
                        <div className="page-item-subtitle">下一篇</div>
                        <div className="page-item-title h5">
                          {pageContext.next.title}
                        </div>
                      </div>
                      <i className="icon icon-forward" />
                    </Link>
                  </li>
                )}
              </ul>
            </PaginationCard>
          )}
        {Artalk && artalk && (
          <Card>
            <Artalk pageKey={pageContext.link} {...artalk} />
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

  img.gatsby-resp-image-image {
    opacity: 1 !important;
    box-shadow: unset !important;
    color: unset !important;
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

  ul,
  ol {
    ul,
    ol {
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

export default Page;
