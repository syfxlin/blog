import React from "react";
import { useU } from "@syfxlin/ustyled";

export type MetaProps = {
  name: string;
  description: string;
};

export const Meta: React.FC<MetaProps> = (props) => {
  const { css } = useU();
  return (
    <section
      css={css`
        margin: .sp(4) 0;
      `}
    >
      <h1
        css={css`
          font-size: .fs(1.7);
          line-height: 1.5;
          margin: .sp(2) 0 0 0;
          font-weight: 400;
        `}
      >
        {props.name}
      </h1>
      <p
        css={css`
          font-size: .fs(1);
          line-height: 1.5;
          color: .c(gray6);
          margin: 0;
        `}
      >
        {props.description}
      </p>
    </section>
  );
};
