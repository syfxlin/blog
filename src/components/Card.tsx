import React, { ReactNode } from "react";
import { Link as GLink } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from "./Link";
import { Divider } from "./Divider";
import { useU } from "@syfxlin/ustyled";
import { layout, LayoutType } from "../utils/urls";

export type CardProps = {
  title: string;
  link: string;
  date: string;
  excerpt: string;
  thumbnail?: IGatsbyImageData;
  categories?: string[];
  tags?: string[];
};

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
        padding: .sp(4) .sp(5);
        margin: .sp(2) .sp(-5);
        border-radius: .br(0.8);
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
      <article
        css={css`
          flex: 1;
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
      </article>
      {props.thumbnail && (
        <GatsbyImage
          alt={`缩略图：${props.title}`}
          image={props.thumbnail}
          css={css`
            flex-basis: 30%;
            margin-left: .sp(4);
            transition: filter 0.3s;

            .dark() {
              filter: brightness(0.7);
            }
          `}
        />
      )}
    </GLink>
  );
};
