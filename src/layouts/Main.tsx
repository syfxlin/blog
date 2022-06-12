import React, { PropsWithChildren } from "react";
import { useU } from "@syfxlin/ustyled";

export type MainProps = PropsWithChildren<{}>;

export const Main: React.FC<MainProps> = ({ children }) => {
  const { css } = useU();
  return (
    <main
      css={css`
        position: relative;
        max-width: .fs(45);
        margin: 0 auto;
        padding: 0 .sp(8);
      `}
    >
      {children}
    </main>
  );
};
