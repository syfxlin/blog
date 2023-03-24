import React, { PropsWithChildren } from "react";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type MessageBoxProps = PropsWithChildren<{
  type: "warn" | "info" | "error" | "success";
}>;

const mapping: Record<MessageBoxProps["type"], string> = {
  info: "blue",
  warn: "yellow",
  error: "red",
  success: "green",
};

const MessageBox: React.FC<MessageBoxProps> = ({ type, children }) => {
  const { u } = useU();
  const color = mapping[type ?? "success"];
  return (
    <div
      css={css`
        background-color: ${u.c(`${color}2,3`, `${color}4,3`)};
        color: ${u.c(`${color}6`)};
        padding: ${u.sp(5)} ${u.sp(6)};
        font-size: ${u.fs(0.9)};
        margin-top: ${u.sp(4)};
        margin-bottom: ${u.sp(4)};
      `}
    >
      {children}
    </div>
  );
};

export default MessageBox;
