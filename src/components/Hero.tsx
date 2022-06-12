import React from "react";
import { useAuthorData } from "../queries/author";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU } from "@syfxlin/ustyled";

export type HeroProps = {};

export const Hero: React.FC<HeroProps> = () => {
  const { css } = useU();
  const author = useAuthorData();
  return (
    <div>
      <GatsbyImage
        alt="头像"
        image={author.avatar}
        css={css`
          width: .s(25);
          height: .s(25);
          border-radius: 50%;
        `}
      />
      <div
        css={css`
          font-family: "Comic Sans MS", "Comic Sans", cursive;
          font-size: .fs(2);
          line-height: 1.5;
          margin-top: .sp(2);
        `}
      >
        {author.firstName} {author.lastName}
      </div>
      <div
        css={css`
          font-size: .fs(1);
          line-height: 1.5;
          color: .c(gray6);
        `}
      >
        {author.description}
      </div>
    </div>
  );
};
