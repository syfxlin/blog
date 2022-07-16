import React from "react";
import { useU } from "@syfxlin/ustyled";
import cx from "classnames";
import { css } from "@emotion/react";

const Wrapper: React.FC<any> = (props) => {
  const { u, ctx } = useU();
  return (
    <section
      className={cx("han-init-context", props.className)}
      css={css`
        --mode: ${ctx.mode};

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          position: relative;
          font-weight: 400;
          border-bottom: 1px dashed ${u.c("black,1")};
          margin-top: ${u.sp(5)};
          margin-bottom: ${u.sp(3)};
          padding-bottom: ${u.sp(1)};

          &::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            display: block;
            width: ${u.fs(2)};
            height: ${u.bw(2.5)};
            background: linear-gradient(
              ${u.c("primary7", "primary3")} 30%,
              ${u.c("primary7", "primary3")} 70%
            );
            box-shadow: ${u.c("primary7,4", "primary3,4")} 0 3px 3px;
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
              color: ${u.c("gray6")};
              font-size: ${u.fs(0.5)};
              padding-left: ${u.sp(1)};
              transition: opacity 0.3s;
            }
          }

          &:hover .anchor {
            opacity: 1;
          }
        }

        h1 {
          font-size: ${u.fs(1.8)};

          .anchor::before {
            content: "H1";
          }
        }

        h2 {
          font-size: ${u.fs(1.5)};

          .anchor::before {
            content: "H2";
          }
        }

        h3 {
          font-size: ${u.fs(1.3)};

          .anchor::before {
            content: "H3";
          }
        }

        h4 {
          font-size: ${u.fs(1.1)};

          .anchor::before {
            content: "H4";
          }
        }

        h5 {
          font-size: ${u.fs(0.9)};

          .anchor::before {
            content: "H5";
          }
        }

        h6 {
          font-size: ${u.fs(0.7)};

          .anchor::before {
            content: "H6";
          }
        }

        p {
          margin-top: ${u.sp(4)};
          margin-bottom: ${u.sp(4)};
        }

        figure,
        blockquote {
          border-left: ${u.bw(3)} solid ${u.c("primary7", "primary3")};
          margin-left: ${u.fs(1)};
          padding-left: ${u.fs(1)};
          box-sizing: border-box;
        }

        ul,
        ol {
          padding-inline-start: ${u.fs(2)};

          li {
            margin: ${u.sp(2)} 0;
          }

          p:last-of-type {
            margin-top: 0;
            margin-bottom: 0;
          }
        }

        table {
          width: 100%;
          border-collapse: collapse;
          caption-side: top;

          th,
          td {
            padding: ${u.sp(2)} ${u.sp(3)};
          }

          tr {
            border-top: ${u.bw(1)} solid ${u.c("gray3", "gray6")};
            border-bottom: ${u.bw(1)} solid ${u.c("gray3", "gray6")};
          }

          thead {
            background-color: ${u.c("primary1,3", "primary9,3")};
          }
        }

        code:not(.ch-code-scroll-parent) {
          background-color: ${u.c("red1,3")};
          color: ${u.c("red7")};
          font-size: ${u.fs(0.86)};
          padding: ${u.fs(0.12)} ${u.fs(0.24)};
          border-radius: ${u.br(0.8)};
          word-break: break-all;
        }

        em {
          font-style: italic;
        }

        hr {
          width: 80%;
          border: 0;
          height: ${u.bw(2)};
          background-image: linear-gradient(
            to right,
            ${u.c("primary6,0")},
            ${u.c("primary6,7")},
            ${u.c("primary6,0")}
          );
        }

        a:not(.anchor) {
          text-decoration: none;
          position: relative;
          color: ${u.c("primary7", "primary3")};
          border-bottom: ${u.bw(1)} solid ${u.c("primary1", "primary9")};
          transition: border 0.3s;

          &:hover,
          &:focus,
          &:active {
            border-bottom-color: ${u.c("primary7", "primary3")};
          }
        }

        a.anchor {
          text-decoration: none;
        }

        img {
          max-width: 100%;
        }

        .ch-code-scroll-parent {
          font-size: ${u.fs(0.9)};
        }

        .ch-spotlight,
        .ch-scrollycoding {
          .ch-spotlight-sticker,
          .ch-scrollycoding-sticker {
            width: ${u.fs(28)};
            margin-right: ${u.fs(-14)};

            @media (max-width: ${u.fs(75)}) {
              width: 50%;
              margin-right: 0;
            }
          }
        }
      `}
    >
      {props.children}
    </section>
  );
};

export default Wrapper;
