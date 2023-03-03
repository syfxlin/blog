import React from "react";
import { useAuthorData } from "../queries/author";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type HeroProps = {};

export const Hero: React.FC<HeroProps> = () => {
  const { u } = useU();
  const author = useAuthorData();
  return (
    <section
      css={css`
        margin: ${u.sp(4)} 0;
      `}
    >
      <GatsbyImage
        alt="头像"
        image={author.avatar}
        css={css`
          width: ${u.s(25)};
          height: ${u.s(25)};
          border-radius: 50%;
          transition: filter 0.3s;

          ${u.dark()} {
            filter: brightness(0.7);
          }
        `}
      />
      <h1
        css={css`
          font-family: "Comic Sans MS", "Comic Sans", cursive !important;
          font-size: ${u.fs(2)};
          line-height: 1.5;
          margin: ${u.sp(2)} 0 0 0;
          font-weight: 400;
        `}
      >
        {author.firstName} {author.lastName}
      </h1>
      <p
        css={css`
          font-size: ${u.fs(1)};
          line-height: 1.5;
          color: ${u.c("gray6")};
          margin: 0;
        `}
      >
        {author.description}
      </p>
    </section>
  );
};
