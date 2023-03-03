import React, { HTMLAttributes } from "react";
import { css } from "@emotion/react";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
};

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  ...props
}) => {
  return (
    <div
      {...props}
      css={css`
        position: relative;
        max-width: 100%;

        &::before {
          content: "";
          height: 0;
          display: block;
          padding-bottom: ${(1 / ratio) * 100}%;
        }

        &::after {
          content: "";
          display: table;
          clear: both;
        }

        & > *:not(style) {
          overflow: hidden;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        & > img,
        & > video {
          object-fit: cover;
        }
      `}
    />
  );
};
