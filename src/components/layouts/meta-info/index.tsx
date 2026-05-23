import * as React from "react";
import { ReactNode } from "react";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";
import { ago, date } from "../../../utils/vender";
import { Divider } from "../../ui/divider";
import { Link } from "../../ui/link";

export interface MetaInfoProps {
  data: ArticleList;
}

const linkClassName = "relative !z-[1]";

export const MetaInfo: React.FC<MetaInfoProps> = ({ data }) => {
  // eslint-disable-next-line react/purity -- Relative modification time is based on the render-time snapshot.
  const now = new Date();
  return (
    <div className="relative m-0 text-[0.8rem] leading-normal font-normal text-text-description">
      <Link
        tooltip
        href={data.archives.link}
        className={linkClassName}
        aria-label={t("archive.desc", data.archives.name)}
      >
        {date(data.published)}
      </Link>
      {ago(data.published, data.modified) > 1 && (
        <Link
          tooltip
          className={linkClassName}
          href={data.archives.link}
          aria-label={t("article.modified.time", ago(now, data.modified))}
        >
          &nbsp;{t("article.modified.desc")}
        </Link>
      )}
      {!!data.categories?.length && <Divider orientation="vertical" />}
      {data.categories
        ?.slice(0, 2)
        .map(i => (
          <Link
            key={`category-${i.link}`}
            tooltip
            className={linkClassName}
            href={i.link}
            aria-label={t("category.desc", i.name)}
          >
            {i.name}
          </Link>
        ))
        .reduce((all: ReactNode[], item, index) => {
          if (index !== 0) {
            all.push(" / ");
          }
          all.push(item);
          return all;
        }, [])}
      {!!data.tags?.length && <Divider orientation="vertical" />}
      {data.tags
        ?.slice(0, 3)
        .map(i => (
          <Link
            key={`tag-${i.link}`}
            tooltip
            href={i.link}
            aria-label={t("tag.desc", i.name)}
            className={linkClassName}
          >
            #{i.name}
          </Link>
        ))
        .reduce((all: ReactNode[], item, index) => {
          if (index !== 0) {
            all.push(" / ");
          }
          all.push(item);
          return all;
        }, [])}
    </div>
  );
};
