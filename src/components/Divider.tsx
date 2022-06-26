import React from "react";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type DividerProps = {
  orientation: "vertical" | "horizontal";
};

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const { u } = useU();
  const span = (
    <span
      css={css`
        display: inline-block;
        width: ${u.fs(0.2)};
        height: ${u.fs(0.2)};
        border-radius: 50%;
        background-color: ${u.c("gray6")};
        margin: 0 ${u.sp(2)};
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
