import React, { PropsWithChildren } from "react";
import { useU } from "@syfxlin/ustyled";

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
  const { css } = useU();
  const color = mapping[type ?? "success"];
  return (
    <div
      css={css`
        background-color: .c(${color}2_3, ${color}4_3);
        color: .c(${color}6);
        padding: .sp(5) .sp(6);
        font-size: .fs(0.9);
        margin-bottom: .sp(4);
      `}
    >
      {children}
    </div>
  );
};

export default MessageBox;
