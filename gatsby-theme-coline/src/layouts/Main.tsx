import React, { PropsWithChildren } from "react";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type MainProps = PropsWithChildren<{}>;

export const Main: React.FC<MainProps> = ({ children }) => {
  const { u } = useU();
  return (
    <main
      css={css`
        position: relative;
        max-width: ${u.fs(45)};
        margin: 0 auto;
        padding: 0 ${u.sp(8)};
      `}
    >
      {children}
    </main>
  );
};
