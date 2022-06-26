import React from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";
import Tippy, { TippyProps } from "@tippyjs/react";
import { css } from "@emotion/react";

export type LinkProps = Omit<GatsbyLinkProps<any>, "ref"> & {
  tippy?: TippyProps;
};

export const Link: React.FC<LinkProps> = ({ to, tippy, ...props }) => {
  const { u } = useU();

  const style = css`
    text-decoration: none;
    position: relative;
    color: ${u.c("primary7", "primary3")};
    border-bottom: ${u.bw(1)} solid ${u.c("primary1", "primary9")};
    transition: border 0.3s;

    &.active,
    &:hover,
    &:focus,
    &:active {
      border-bottom-color: ${u.c("primary7", "primary3")};
    }
  `;

  const internet = /^https?:/.test(to);
  const file = /\.[\da-z]+$/i.test(to);
  if (internet || file) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    const element = <a href={to} {...props} css={style} />;
    return tippy ? <Tippy {...tippy}>{element}</Tippy> : element;
  } else {
    const element = <GLink to={to} {...props} css={style} />;
    return tippy ? <Tippy {...tippy}>{element}</Tippy> : element;
  }
};
