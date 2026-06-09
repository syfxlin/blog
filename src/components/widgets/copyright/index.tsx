import * as React from "react";
import { fetcher } from "../../../contents";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";
import { date, resolve } from "../../../utils/vender";
import { Link } from "../../ui/link";

const sectionClassName = String.raw`relative my-4 block overflow-hidden bg-info-background px-6 py-5 text-[0.6rem] text-text-paragraph after:absolute after:top-[-45px] after:right-[-40px] after:h-[200px] after:w-[200px] after:bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill=%22hsl(230,%201%,%2062%)%22 viewBox='0 0 496 512'%3E%3Cpath d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E")] after:opacity-10 after:content-['']`;

export interface CopyrightProps {
  data: ArticleList;
}

export const Copyright: React.FC<CopyrightProps> = async (props) => {
  const [seo, author, license] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.license()]);
  return (
    <section className={sectionClassName}>
      <p className="m-0 text-[0.9rem]">{props.data.title}</p>
      <Link href={resolve(seo.link, props.data.link)}>{resolve(seo.link, props.data.link)}</Link>
      <ul className="my-3 flex list-none flex-wrap items-center justify-start gap-6 p-0">
        <li>
          <p className="m-0">{t("article.copyright.license.name")}</p>
          <p className="m-0 text-[0.9rem]" aria-label={t("article.copyright.license.desc", license.name)}>
            {license.name}
          </p>
        </li>
        <li>
          <p className="m-0">{t("article.copyright.author.name")}</p>
          <p className="m-0 text-[0.9rem]" aria-label={t("article.copyright.author.desc", author.fullname)}>
            {author.fullname}
          </p>
        </li>
        <li>
          <p className="m-0">{t("article.copyright.published.name")}</p>
          <p className="m-0 text-[0.9rem]" aria-label={t("article.copyright.published.desc", date(props.data.published))}>
            {date(props.data.published)}
          </p>
        </li>
      </ul>
      <p>{t("article.copyright.notice")}</p>
    </section>
  );
};
