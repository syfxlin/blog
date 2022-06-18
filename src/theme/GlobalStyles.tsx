import React from "react";
import { Global } from "@emotion/react";
import { useU } from "@syfxlin/ustyled";

export const GlobalStyles: React.FC = () => {
  const { css, mode } = useU();
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          background-color: .c(white, dark7);
        }

        html,
        body {
          --mode: ${mode};
          font-family: .f(sans);
          color: .c(gray7, dark0);
          font-size: .fs(1);
          font-weight: 400;
          line-height: 1.5;
          transition: color 0.3s, background-color 0.3s;
          scroll-behavior: smooth;
        }

        .i-icon {
          vertical-align: middle;
          text-align: center;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      `}
    />
  );
};
