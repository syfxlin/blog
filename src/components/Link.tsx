import React from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";

export type LinkProps = Omit<GatsbyLinkProps<any>, "ref">;

export const Link: React.FC<LinkProps> = ({ to, ...other }) => {
  const { css } = useU();

  const style = css`
    text-decoration: none;
    position: relative;
    font-size: .fs(1);
    color: .c(primary7, primary3);
    border-bottom: .bw(2) solid .c(primary1, primary9);
    transition: border 0.3s;

    &:hover,
    &:focus,
    &:active {
      border-bottom-color: .c(primary7, primary3);
    }
  `;

  const internet = /^https?:/.test(to);
  const file = /\.[\da-z]+$/i.test(to);
  if (internet || file) {
    return <a href={to} {...other} css={style} />;
  } else {
    return <GLink to={to} {...other} css={style} />;
  }
};
