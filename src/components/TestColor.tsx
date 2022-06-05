import { useU } from "@syfxlin/ustyled";
import React, { PropsWithChildren } from "react";

export const TestColor: React.FC<PropsWithChildren<any>> = (props) => {
  const { css, mode, setMode } = useU();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 95vw;
        height: 95vh;
        background-color: .c(white, dark7);
      `}
    >
      {props.children}
      <button onClick={() => setMode()}>{mode}</button>
    </div>
  );
};
