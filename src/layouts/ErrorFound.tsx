import React, { ReactNode } from "react";
import { useU } from "@syfxlin/ustyled";
import { SEO } from "./SEO";
import { Canvas } from "../components/Canvas";
import { Link } from "../components/Link";
import { css } from "@emotion/react";

export type ErrorFoundProps = {
  code: number;
  message: string;
  children?: ReactNode;
};

export const ErrorFound: React.FC<ErrorFoundProps> = (props) => {
  const { u } = useU();

  return (
    <>
      <SEO title={`${props.code} ${props.message}`} />
      <Canvas />
      <main
        css={css`
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: ${u.sp(4)};
        `}
      >
        <section
          css={css`
            font-size: ${u.fs(1.2)};
            display: flex;

            div {
              padding: 0 ${u.sp(4)};

              &:first-of-type {
                border-right: ${u.bw(1)} solid ${u.c("gray6")};
              }
            }
          `}
        >
          <div>{props.code}</div>
          <div>{props.message}</div>
        </section>
        {props.children && (
          <section
            css={css`
              font-size: ${u.fs(0.9)};
            `}
          >
            {props.children}
          </section>
        )}
        <section>
          <Link to="/" aria-label="返回首页">
            返回首页
          </Link>
        </section>
      </main>
    </>
  );
};
