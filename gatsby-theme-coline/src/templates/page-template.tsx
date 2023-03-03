import React from "react";
import { useU } from "@syfxlin/ustyled";
import { PageData } from "../queries/page";
import { Header } from "../layouts/Header";
import { Main } from "../layouts/Main";
import { AspectRatio } from "../components/AspectRatio";
import { GatsbyImage } from "gatsby-plugin-image";
import { MetaInfo } from "../components/MetaInfo";
import { ExpireNotify } from "../components/ExpireNotify";
import { LayoutType } from "../utils/urls";
import { Copyright } from "../components/Copyright";
import { Toc } from "../components/Toc";
import { LinkButton } from "../components/Button";
import { Left, Right } from "@icon-park/react";
import { Footer } from "../layouts/Footer";
import loadable from "@loadable/component";
import { Meta } from "../components/Meta";
import { css } from "@emotion/react";

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
  children?: React.ReactNode;
};

export const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const { u } = useU();
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
          {props.children}
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
            padding: ${u.sp(4)} 0;
            display: flex;
            gap: ${u.sp(2)};
          `}
        >
          {props.prev && (
            <LinkButton
              aria-label={`上一篇：${props.prev.title}`}
              to={props.prev.link}
              css={css`
                gap: ${u.sp(1)};
                font-size: ${u.fs(1.2)};
                flex: 1;
                text-align: center;
                justify-content: flex-start;
                padding: ${u.sp(4)};
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
                gap: ${u.sp(1)};
                font-size: ${u.fs(1.2)};
                flex: 1;
                text-align: center;
                justify-content: flex-end;
                padding: ${u.sp(4)};
              `}
            >
              {props.next.title} <Right />
            </LinkButton>
          )}
        </section>
        {Artalk && <Artalk pageTitle={props.title} pageKey={props.link} />}
      </Main>
      <Footer />
    </>
  );
};
