import { Metadata } from "next";
import * as React from "react";
import { ReactNode } from "react";
import { ArticleList, DocumentData } from "../../../contents/types";
import { t } from "../../../locales";
import { resolve } from "../../../utils/vender";
import { Renderer } from "../../docs";
import { ArticleInfo } from "../../layouts/article-info";
import { Footer } from "../../layouts/footer";
import { Header } from "../../layouts/header";
import { Hero } from "../../layouts/hero";
import { Main } from "../../layouts/main";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";
import { Pagination } from "../../ui/pagination";

export interface HeadingProps {
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h2 className="relative mt-5 mb-3 border-b border-dashed border-background-focus pb-1 text-[1.3rem] font-normal text-text-title before:absolute before:bottom-[-1px] before:left-0 before:z-[1] before:block before:h-[2.5px] before:w-8 before:rounded before:bg-[linear-gradient(var(--color-text-primary)_30%,var(--color-text-primary)_70%)] before:shadow-[var(--color-text-primary)_0_1px_3px] before:transition-all before:duration-[250ms] before:content-['']">
      {props.children}
    </h2>
  );
};

export type TemplateArticlesProps =
  | {
    display: "document";
    document?: DocumentData;
    articles: ReadonlyArray<ArticleList>;
  } |
  {
    display: "articles";
    articles: {
      index: number;
      pages: number;
      total: number;
      items: ReadonlyArray<ArticleList>;
    };
  };

export function metadataArticles(props: TemplateArticlesProps): Promise<Metadata> {
  if (props.display === "document") {
    return generateMetadata({
      title: undefined,
      link: "/",
    });
  } else {
    return generateMetadata({
      title: props.articles.index !== 1 ? t("articles.desc", t("pagination.curr", props.articles.index)) : undefined,
      link: props.articles.index !== 1 ? resolve("page", props.articles.index) : "/",
    });
  }
}

export const TemplateArticles: React.FC<TemplateArticlesProps> = (props) => {
  return (
    <>
      <Header />
      {props.display === "document" && (
        <Main size="lg">
          <div className="flex gap-8 max-xl:block [&>section]:flex-1 [&>section:first-child]:basis-[170%] [&>section:last-child]:basis-full">
            <section>
              <Hero />
              <Renderer document={props.document?.document} position="top" />
            </section>
            <section>
              <Heading>{t("articles.heading")}</Heading>
              {props.articles.map(item => <ArticleInfo key={`article-${item.link}`} data={item} />)}
              <LinkButton className="w-full! text-base! leading-normal! [&>.iconify]:h-[1.2rem] [&>.iconify]:w-[1.2rem]" aria-label={t("articles.more")} href="/page/1" tooltip={false}>
                <Iconify icon="ri:arrow-right-double-line" />
                {t("articles.more")}
                <Iconify icon="ri:arrow-left-double-line" />
              </LinkButton>
            </section>
          </div>
        </Main>
      )}
      {props.display === "articles" && (
        <Main>
          <Hero />
          <section>
            {props.articles.items.map(item => (
              <ArticleInfo key={`article-${item.link}`} data={item} />
            ))}
          </section>
          <Pagination links="/" index={props.articles.index} pages={props.articles.pages} />
        </Main>
      )}
      <Footer />
    </>
  );
};
