import React, { ReactNode } from "react";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type MetaProps = {
  title: string;
  children: ReactNode;
};

export const Meta: React.FC<MetaProps> = (props) => {
  const { u } = useU();
  return (
    <section
      css={css`
        text-align: center;
        padding: ${u.sp(6)} 0 0;
        margin-bottom: ${u.sp(4)};
      `}
    >
      <h1
        css={css`
          font-size: ${u.fs(1.8)};
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
          color: ${u.c("gray9", "dark0")};
        `}
      >
        {props.title}
      </h1>
      <div
        css={css`
          font-weight: 400;
          font-size: ${u.fs(0.8)};
          line-height: 1.5;
          color: ${u.c("gray6")};
          margin: 0;
        `}
      >
        {props.children}
      </div>
    </section>
  );
};
