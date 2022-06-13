import React, { ButtonHTMLAttributes } from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";
import Tippy, { TippyProps } from "@tippyjs/react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tippy?: TippyProps;
};
export type LinkButtonProps = Omit<GatsbyLinkProps<any>, "ref"> & {
  tippy?: TippyProps;
};

export const Button: React.FC<ButtonProps> = ({ tippy, ...props }) => {
  const { css } = useU();
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
        font: inherit;
        font-size: .fs(1);
        line-height: 1;
        height: .fs(2);
        padding: .sp(2) .sp(2.5);
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

        .i-icon {
          margin: 0 .sp(-0.5);
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
  const { css } = useU();

  const style = css`
    appearance: none;
    text-decoration: none;
    outline: none;
    border: none;
    background-color: unset;
    display: inline-flex;
    font: inherit;
    font-size: .fs(1);
    line-height: 1;
    height: .fs(2);
    padding: .sp(2) .sp(2.5);
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

    .i-icon {
      margin: 0 .sp(-0.5);
      transform: scale(1.1);
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
