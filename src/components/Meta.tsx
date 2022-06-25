import React, { ReactNode } from "react";
import { useU } from "@syfxlin/ustyled";

export type MetaProps = {
  title: string;
  children: ReactNode;
};

export const Meta: React.FC<MetaProps> = (props) => {
  const { css } = useU();
  return (
    <section
      css={css`
        text-align: center;
        padding: .sp(6) 0 0;
        margin-bottom: .sp(4);
      `}
    >
      <h1
        css={css`
          font-size: .fs(1.8);
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
          color: .c(gray9, dark0);
        `}
      >
        {props.title}
      </h1>
      <div
        css={css`
          font-weight: 400;
          font-size: .fs(0.8);
          line-height: 1.5;
          color: .c(gray6);
          margin: 0;
        `}
      >
        {props.children}
      </div>
    </section>
  );
};
