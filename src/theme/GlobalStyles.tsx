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
          color: .c(black, dark0);
          line-height: 1.5;
        }

        .i-icon {
          vertical-align: middle;
        }
      `}
    />
  );
};
