import React from "react";
import cx from "classnames";
import { CodeBlock } from "./CodeBlock";
import { useU } from "@syfxlin/ustyled";

export const wrapper: React.FC<any> = (props) => {
  const { css, ctx } = useU();
  return (
    <section
      {...props}
      className={cx("han-init-context", props.className)}
      css={css`
        --mode: ${ctx.mode};

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 400;
          border-bottom: 1px dashed .c(black_1);
          margin-top: .sp(5);
          margin-bottom: .sp(3);

          &::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            display: block;
            width: .fs(2);
            height: .bw(2.5);
            background: linear-gradient(
              .c(primary7, primary3) 30%,
              .c(primary7, primary3) 70%
            );
            box-shadow: .c(primary7_4, primary3_4) 0 3px 3px;
            border-radius: 4px;
            transition: all 0.25s ease 0s;
            z-index: 1;
          }

          .anchor {
            opacity: 0;
            transition: opacity 0.3s;

            svg {
              display: none;
            }

            &::before {
              content: "H2";
              color: .c(gray6);
              font-size: .fs(0.5);
              padding-left: .sp(1);
              transition: opacity 0.3s;
            }
          }

          &:hover .anchor {
            opacity: 1;
          }
        }

        h1 {
          font-size: .fs(1.7);

          .anchor::before {
            content: "H1";
          }
        }

        h2 {
          font-size: .fs(1.5);

          .anchor::before {
            content: "H2";
          }
        }

        h3 {
          font-size: .fs(1.3);

          .anchor::before {
            content: "H3";
          }
        }

        h4 {
          font-size: .fs(1.1);

          .anchor::before {
            content: "H4";
          }
        }

        h5 {
          font-size: .fs(0.9);

          .anchor::before {
            content: "H5";
          }
        }

        h6 {
          font-size: .fs(0.7);

          .anchor::before {
            content: "H6";
          }
        }

        p {
          margin-top: 0;
          margin-bottom: .sp(4);
        }

        figure,
        blockquote {
          border-left: .bw(3) solid .c(primary7, primary3);
          margin-left: .fs(1);
          padding-left: .fs(1);
          box-sizing: border-box;
        }

        ul,
        ol {
          padding-inline-start: .fs(2);

          li {
            margin: .sp(2) 0;
          }

          p:last-of-type {
            margin-bottom: 0;
          }
        }

        table {
          width: 100%;
          border-collapse: collapse;
          caption-side: top;

          th,
          td {
            padding: .sp(2) .sp(3);
          }

          tr {
            border-top: .bw(1) solid .c(gray3, gray6);
            border-bottom: .bw(1) solid .c(gray3, gray6);
          }

          thead {
            background-color: .c(primary1_3, primary9_3);
          }
        }

        code {
          background-color: .c(red1_3);
          color: .c(red7);
          font-size: .fs(0.86);
          padding: .fs(0.12) .fs(0.24);
          border-radius: .br(0.8);
        }

        em {
          font-style: italic;
        }

        hr {
          width: 80%;
          border: 0;
          height: .bw(2);
          background-image: linear-gradient(
            to right,
            .c(primary6_0),
            .c(primary6_7),
            .c(primary6_0)
          );
        }

        a:not(.anchor) {
          text-decoration: none;
          position: relative;
          color: .c(primary7, primary3);
          border-bottom: .bw(1) solid .c(primary1, primary9);
          transition: border 0.3s;

          &:hover,
          &:focus,
          &:active {
            border-bottom-color: .c(primary7, primary3);
          }
        }

        a.anchor {
          text-decoration: none;
        }

        img {
          max-width: 100%;
        }
      `}
    >
      {props.children}
    </section>
  );
};

export const pre = CodeBlock;
