import React from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";
import Tippy, { TippyProps } from "@tippyjs/react";

export type LinkProps = Omit<GatsbyLinkProps<any>, "ref"> & {
  tippy?: TippyProps;
};

export const Link: React.FC<LinkProps> = ({ to, tippy, ...props }) => {
  const { css } = useU();

  const style = css`
    text-decoration: none;
    position: relative;
    color: .c(primary7, primary3);
    border-bottom: .bw(1) solid .c(primary1, primary9);
    transition: border 0.3s;

    &.active,
    &:hover,
    &:focus,
    &:active {
      border-bottom-color: .c(primary7, primary3);
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
