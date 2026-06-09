import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";
import { metadataArticles, TemplateArticles, TemplateArticlesProps } from "../../components/templates/articles";
import { fetcher } from "../../contents";

interface Props {
  params: Promise<{
    index?: string;
  }>;
}

const query = React.cache(async (_index?: string): Promise<TemplateArticlesProps | undefined> => {
  try {
    const [home, query] = await Promise.all([fetcher.home(), fetcher.posts()]);
    if (home.display === "document" && !_index) {
      return {
        display: "document",
        document: home.content,
        articles: query.items.slice(0, 3),
      };
    } else {
      const index = _index ? Number.parseInt(_index) : 1;
      const value = query.pages;
      if (!value || value.pages < index) {
        return undefined;
      }
      return {
        display: "articles",
        articles: {
          index,
          pages: value.pages,
          total: value.total,
          items: value.page(index),
        },
      };
    }
  } catch {
    return undefined;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { index } = await params;
  const data = await query(index);
  if (!data) {
    return notFound();
  }
  return metadataArticles(data);
}

export default async function ArticlesPage({ params }: Props) {
  const { index } = await params;
  const data = await query(index);
  if (!data) {
    return notFound();
  }
  return <TemplateArticles {...data} />;
}
