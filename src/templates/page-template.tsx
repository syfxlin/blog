import React from "react";
import { useU } from "@syfxlin/ustyled";
import { PageData } from "../queries/page";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { AspectRatio } from "../components/AspectRatio";
import { GatsbyImage } from "gatsby-plugin-image";
import { MetaInfo } from "../components/MetaInfo";
import { ExpireNotify } from "../components/ExpireNotify";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { LayoutType } from "../utils/urls";
import { Copyright } from "../components/Copyright";
import { Toc } from "../components/Toc";
import { LinkButton } from "../components/Button";
import { Left, Right } from "@icon-park/react";
import { Footer } from "../layouts/Footer";
import loadable from "@loadable/component";
import { Meta } from "../components/Meta";
import { Layout } from "../layouts/Layout";

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
  return (
    <Layout>
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
          <Meta title={props.title}>
            <MetaInfo
              date={props.dateCreated}
              categories={props.categories}
              tags={props.tags}
            />
          </Meta>
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
        {Artalk && <Artalk pageTitle={props.title} pageKey={props.link} />}
      </Main>
      <Footer />
    </Layout>
  );
};
