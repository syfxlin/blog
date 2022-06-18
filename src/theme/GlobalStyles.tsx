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

        /* 滚动槽 */

        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.06);
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
        }

        /* 滚动条滑块 */

        ::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.12);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        * {
          scrollbar-width: thin;
        }
      `}
    />
  );
};
