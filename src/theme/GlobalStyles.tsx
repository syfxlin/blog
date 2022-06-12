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

        html,
        body {
          --mode: ${mode};
          font-family: .f(sans);
          background-color: .c(white, dark7);
          color: .c(gray9, dark0);
          font-size: .fs(1);
          font-weight: 400;
          line-height: 1.5;
          transition: color 0.3s, background-color 0.3s;
        }

        .i-icon {
          vertical-align: middle;
        }
      `}
    />
  );
};
