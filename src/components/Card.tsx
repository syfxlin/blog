import React, { PropsWithChildren, ReactNode } from "react";
import { Link as GLink } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from "./Link";
import { archive, category, tag } from "../utils/urls";
import { Divider } from "./Divider";
import { useU } from "@syfxlin/ustyled";

export type CardProps = PropsWithChildren<{
  title: string;
  link: string;
  date: string;
  excerpt: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
}>;

export const Card: React.FC<CardProps> = (props) => {
  const { css } = useU();
  return (
    <GLink
      to={props.link}
      aria-label={props.title}
      css={css`
        appearance: none;
        text-decoration: none;
        outline: none;
        border: none;
        background-color: unset;
        display: flex;
        flex-direction: column;
        padding: .sp(4) .sp(5);
        margin: .sp(2) .sp(-5);
        border-radius: .r(0.8);
        color: .c(primary7, primary3);
        transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
        cursor: pointer;

        &:hover {
          background-color: .c(primary1_3, primary9_3);
        }

        &:focus,
        &:active {
          box-shadow: 0 0 0 .bw(2) .c(primary1, primary9);
        }
      `}
    >
      <h3
        css={css`
          margin: 0;
          font-weight: 400;
          font-size: .fs(1.25);
          color: .c(gray9, dark0);
        `}
      >
        {props.title}
      </h3>
      <p
        css={css`
          margin: .sp(1) 0;
          font-weight: 400;
          font-size: .fs(0.9);
          color: .c(gray7, dark2);
        `}
      >
        {props.excerpt}
      </p>
      <div
        css={css`
          font-weight: 400;
          font-size: .fs(0.8);
          color: .c(gray6);
        `}
      >
        <Link
          to={archive(props.date.substring(0, 4))}
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
              to={category(c)}
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
              to={tag(t)}
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
    </GLink>
  );
};
