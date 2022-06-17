import React, { ReactNode } from "react";
import { Link } from "./Link";
import { layout, LayoutType } from "../utils/urls";
import { Divider } from "./Divider";
import { useU } from "@syfxlin/ustyled";

export type MoreInfoProps = {
  date: string;
  categories?: string[];
  tags?: string[];
};

export const MoreInfo: React.FC<MoreInfoProps> = (props) => {
  const { css } = useU();

  return (
    <div
      css={css`
        font-weight: 400;
        font-size: .fs(0.8);
        color: .c(gray6);
      `}
    >
      <Link
        to={layout(LayoutType.ARCHIVE, props.date.substring(0, 4))}
        aria-label={`归档：${props.date.substring(0, 4)}`}
        tippy={{
          content: `归档：${props.date.substring(0, 4)}`,
          animation: "shift-away",
        }}
      >
        {props.date}
      </Link>
      <Divider orientation="vertical" />
      {(props.categories ?? [])
        .slice(0, 2)
        .map((c) => (
          <Link
            key={`category-${c}`}
            to={layout(LayoutType.CATEGORY, c)}
            aria-label={`分类：${c}`}
            tippy={{
              content: `分类：${c}`,
              animation: "shift-away",
            }}
          >
            {c}
          </Link>
        ))
        .reduce((all: ReactNode[], item, index) => {
          if (index !== 0) {
            all.push(" / ");
          }
          all.push(item);
          return all;
        }, [])}
      <Divider orientation="vertical" />
      {(props.tags ?? [])
        .slice(0, 3)
        .map((t) => (
          <Link
            key={`tag-${t}`}
            to={layout(LayoutType.TAG, t)}
            aria-label={`标签：${t}`}
            tippy={{
              content: `标签：${t}`,
              animation: "shift-away",
            }}
          >
            {t}
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
