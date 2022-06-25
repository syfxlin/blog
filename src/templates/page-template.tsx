import React from "react";
import { useU } from "@syfxlin/ustyled";
import { PageData } from "../queries/page";
import { useArtalkData } from "../queries/artalk";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { AspectRatio } from "../components/AspectRatio";
import { GatsbyImage } from "gatsby-plugin-image";
import { MoreInfo } from "../components/MoreInfo";
import { ExpireNotify } from "../components/ExpireNotify";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { LayoutType } from "../utils/urls";
import { Copyright } from "../components/Copyright";
import { Toc } from "../components/Toc";
import { LinkButton } from "../components/Button";
import { Left, Right } from "@icon-park/react";
import { Footer } from "../layouts/Footer";
import loadable from "@loadable/component";

const Artalk = loadable(() => import("../components/Artalk"), { ssr: false });

export type PageTemplateProps = PageData & {
  layout: string;
  next?: {
    link: string;
    title: string;
  };
  prev?: {
    link: string;
    title: string;
  };
  render?: (article: JSX.Element) => JSX.Element | React.ReactNode;
};

export const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const { css } = useU();
  const artalk = useArtalkData();
  return (
    <>
      {/*prettier-ignore*/}
      <Header
        url={`{url}${props.link}`}
        title={`${props.title} | {title}`}
        description={props.excerpt}
        image={props.thumbnail?.images?.fallback?.src && `{url}${props.thumbnail?.images?.fallback?.src}`}
      />
      <Main>
        <article>
          {props.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <GatsbyImage
                alt={`缩略图：${props.title}`}
                image={props.thumbnail}
              />
            </AspectRatio>
          )}
          <section
            css={css`
              text-align: center;
              padding: .sp(6) 0 .sp(1) 0;
            `}
          >
            <h1
              css={css`
                margin: 0;
                font-weight: 400;
                font-size: .fs(1.8);
                color: .c(gray9, dark0);
              `}
            >
              {props.title}
            </h1>
            <MoreInfo
              date={props.dateCreated}
              categories={props.categories}
              tags={props.tags}
            />
          </section>
          {props.layout === LayoutType.POST && props.dateUpdated && (
            <ExpireNotify date={props.dateUpdated} />
          )}
          {props.body &&
            (props.render ? (
              props.render(<MDXRenderer>{props.body}</MDXRenderer>)
            ) : (
              <MDXRenderer>{props.body}</MDXRenderer>
            ))}
          {props.layout === LayoutType.POST && (
            <Copyright
              title={props.title}
              link={props.link}
              date={props.dateCreated}
            />
          )}
        </article>
        <Toc items={props.toc} />
        <section
          css={css`
            padding: .sp(4) 0;
            display: flex;
            gap: .sp(2);
          `}
        >
          {props.prev && (
            <LinkButton
              aria-label={`上一篇：${props.prev.title}`}
              to={props.prev.link}
              css={css`
                gap: .sp(1);
                font-size: .fs(1.2);
                flex: 1;
                text-align: left;
                justify-content: flex-start;
                padding: .sp(4);
              `}
            >
              <Left /> {props.prev.title}
            </LinkButton>
          )}
          {props.next && (
            <LinkButton
              aria-label={`下一篇：${props.next.title}`}
              to={props.next.link}
              css={css`
                gap: .sp(1);
                font-size: .fs(1.2);
                flex: 1;
                text-align: right;
                justify-content: flex-end;
                padding: .sp(4);
              `}
            >
              {props.next.title} <Right />
            </LinkButton>
          )}
        </section>
        {Artalk && artalk && (
          <Artalk pageTitle={props.title} pageKey={props.link} {...artalk} />
        )}
      </Main>
      <Footer />
    </>
  );
};
