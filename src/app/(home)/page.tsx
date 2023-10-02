import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetcher } from "../../contents";
import { metadataArticles, TemplateArticles, TemplateArticlesProps } from "../../components/templates/articles";

type Props = {
  params?: {
    index?: string;
  };
};

const query = async ({ params }: Props): Promise<TemplateArticlesProps | undefined> => {
  try {
    const home = await fetcher.home();
    if (home.display === "document" && !params?.index) {
      return {
        display: "document",
        document: home.content,
      };
    } else {
      const query = await fetcher.posts();
      const index = params?.index ? parseInt(params.index) : 1;
      const value = query.pages;
      if (!value || value.pages < index) {
        return undefined;
      }
      return {
        display: "articles",
        articles: {
          index: index,
          pages: value.pages,
          total: value.total,
          items: value.page(index),
        },
      };
    }
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return metadataArticles(data);
};

export default async function ArticlesPage(props: Props) {
  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return <TemplateArticles {...data} />;
}
