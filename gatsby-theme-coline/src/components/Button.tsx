import React, { ButtonHTMLAttributes } from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";
import Tippy, { TippyProps } from "@tippyjs/react";
import { css } from "@emotion/react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tippy?: TippyProps;
};
export type LinkButtonProps = Omit<GatsbyLinkProps<any>, "ref"> & {
  tippy?: TippyProps;
};

export const Button: React.FC<ButtonProps> = ({ tippy, ...props }) => {
  const { u } = useU();
  const element = (
    <button
      {...props}
      css={css`
        appearance: none;
        text-decoration: none;
        outline: none;
        border: none;
        background-color: unset;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        font: inherit;
        font-size: ${u.fs(1)};
        line-height: 1;
        padding: ${u.sp(2)} ${u.sp(2.5)};
        border-radius: ${u.br(0.8)};
        color: ${u.c("primary7", "primary3")};
        transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
        cursor: pointer;

        &.active,
        &:hover {
          background-color: ${u.c("primary1,3", "primary9,3")};
        }

        &:focus,
        &:active {
          box-shadow: 0 0 0 ${u.bw(2)} ${u.c("primary1", "primary9")};
        }

        .i-icon {
          margin: 0 ${u.sp(-0.5)};
          transform: scale(1.1);
        }
      `}
    />
  );
  return tippy ? <Tippy {...tippy}>{element}</Tippy> : element;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  tippy,
  ...props
}) => {
  const { u } = useU();

  const style = css`
    appearance: none;
    text-decoration: none;
    outline: none;
    border: none;
    background-color: unset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    font: inherit;
    font-size: ${u.fs(1)};
    line-height: 1;
    padding: ${u.sp(2)} ${u.sp(2.5)};
    border-radius: ${u.br(0.8)};
    color: ${u.c("primary7", "primary3")};
    transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
    cursor: pointer;

    &.active,
    &:hover {
      background-color: ${u.c("primary1,3", "primary9,3")};
    }

    &:focus,
    &:active {
      box-shadow: 0 0 0 ${u.bw(2)} ${u.c("primary1", "primary9")};
    }

    .i-icon {
      margin: 0 ${u.sp(-0.5)};
      transform: scale(1.1);
    }
  `;

  const internet = /(^https?:|^#)/.test(to);
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
