import React from "react";
import { css, Global } from "@emotion/react";
import { useU } from "@syfxlin/ustyled";

export const GlobalStyles: React.FC = () => {
  const { u, mode } = useU();
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          background-color: ${u.c("white", "dark7")};
        }

        html,
        body {
          --mode: ${mode};
          font-family: ${u.f("sans")};
          color: ${u.c("gray7", "dark0")};
          font-size: ${u.fs(1)};
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: ${u.ls("wide")};
          transition: color 0.3s, background-color 0.3s;
          scroll-behavior: smooth;
          word-break: break-word;
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
          background: ${u.c("black,1", "white,1")};
          box-shadow: inset 0 0 5px ${u.c("black,1", "white,1")};
        }

        /* 滚动条滑块 */

        ::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: ${u.c("black,2", "white,2")};
          box-shadow: inset 0 0 10px ${u.c("black,2", "white,2")};
        }

        * {
          scrollbar-width: thin;
        }
      `}
    />
  );
};
