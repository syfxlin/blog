import React from "react";
import { Link as GLink } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { useU } from "@syfxlin/ustyled";
import { MetaInfo } from "./MetaInfo";
import { LinkButton } from "./Button";
import { css } from "@emotion/react";

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
  const { u } = useU();
  return (
    <article
      css={css`
        appearance: none;
        text-decoration: none;
        outline: none;
        border: none;
        background-color: unset;
        display: flex;
        padding: ${u.sp(4)} ${u.sp(5)};
        margin: ${u.sp(2)} ${u.sp(-5)};
        border-radius: ${u.br(0.8)};
        color: ${u.c("primary7", "primary3")};
        transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
        position: relative;
        //cursor: pointer;

        &:hover {
          background-color: ${u.c("primary1,3", "primary9,3")};
        }

        &:focus,
        &:active {
          box-shadow: 0 0 0 ${u.bw(2)} ${u.c("primary1", "primary9")};
        }
      `}
    >
      <section
        css={css`
          flex: 1;
        `}
      >
        <GLink
          to={props.link}
          aria-label={props.title}
          css={css`
            margin: 0;
            font-weight: 400;
            font-size: ${u.fs(1.25)};
            color: ${u.c("gray9", "dark0")};
            text-decoration: none;
          `}
        >
          {props.title}
        </GLink>
        <p
          css={css`
            margin: ${u.sp(1)} 0;
            font-weight: 400;
            font-size: ${u.fs(0.9)};
            color: ${u.c("gray7", "dark2")};
          `}
        >
          {props.excerpt}
        </p>
        <MetaInfo
          date={props.date}
          categories={props.categories}
          tags={props.tags}
        />
      </section>
      {props.thumbnail && (
        <GatsbyImage
          alt={`缩略图：${props.title}`}
          image={props.thumbnail}
          css={css`
            flex-basis: 30%;
            margin-left: ${u.sp(4)};
            transition: filter 0.3s;

            ${u.dark()} {
              filter: brightness(0.7);
            }
          `}
        />
      )}
      <LinkButton
        to={props.link}
        aria-hidden={true}
        css={css`
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: none !important;
        `}
      />
    </article>
  );
};
