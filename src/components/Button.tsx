import React, { ButtonHTMLAttributes } from "react";
import { GatsbyLinkProps, Link as GLink } from "gatsby";
import { useU } from "@syfxlin/ustyled";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkButtonProps = Omit<GatsbyLinkProps<any>, "ref">;

export const Button: React.FC<ButtonProps> = (props) => {
  const { css } = useU();
  return (
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
        padding: .sp(2);
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
    />
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({ to, ...other }) => {
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

    .i-icon {
      margin: 0 .sp(-0.5);
      transform: scale(1.1);
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

export const IconButton: React.FC<LinkButtonProps> = (props) => {
  const { css } = useU();
  return <GLink {...props} css={css``} />;
};
