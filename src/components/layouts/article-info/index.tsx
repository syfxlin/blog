import Link from "next/link";
import * as React from "react";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";
import { LinkButton } from "../../ui/button";
import { Image } from "../../ui/image";
import { MetaInfo } from "../meta-info";

export interface ArticleInfoProps {
  data: ArticleList;
}

export const ArticleInfo: React.FC<ArticleInfoProps> = ({ data }) => {
  return (
    <article className="relative -mx-5 my-2 flex appearance-none rounded-[0.2rem] border-0 bg-transparent px-5 py-4 text-text-primary no-underline transition-[color,background-color,box-shadow] duration-300 outline-none hover:bg-background-hover focus:shadow-[0_0_0_2px_var(--color-background-focus)] active:shadow-[0_0_0_2px_var(--color-background-focus)]">
      <section className="flex-1">
        <Link href={data.link} aria-label={data.title} className="m-0 text-xl font-normal text-text-title no-underline">
          {data.title}
        </Link>
        <p className="my-1 text-[0.9rem] font-normal text-text-paragraph">{data.body.excerpts}</p>
        <MetaInfo data={data} />
      </section>
      {data.thumbnail && <Image className="ml-4 basis-[30%]" src={data.thumbnail} alt={t("article.thumbnail")} />}
      <LinkButton href={data.link} aria-hidden={true} className="absolute inset-0 bg-none" />
    </article>
  );
};
