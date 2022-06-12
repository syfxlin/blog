import React from "react";
import { useU } from "@syfxlin/ustyled";

export type DividerProps = {
  orientation: "vertical" | "horizontal";
};

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const { css } = useU();
  const span = (
    <span
      css={css`
        display: inline-block;
        width: .fs(0.2);
        height: .fs(0.2);
        border-radius: 50%;
        background-color: .c(gray6);
        margin: 0 .sp(2);
        vertical-align: middle;
        text-align: center;
      `}
    />
  );
  return orientation === "vertical" ? (
    span
  ) : (
    <div>
      {span}
      {span}
      {span}
    </div>
  );
};
