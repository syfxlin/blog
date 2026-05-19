import * as React from "react";
import { ReactNode } from "react";
import { cx } from "../../../utils/class-name";

export interface MessageProps {
  type: "warn" | "info" | "error" | "success";
  children?: ReactNode;
}

const baseClassName = "my-4 px-6 py-5 text-[0.9rem]";
const typeClassNames = {
  info: "bg-info-background text-info-text",
  warn: "bg-warn-background text-warn-text",
  success: "bg-success-background text-success-text",
  error: "bg-error-background text-error-text",
};

export const Message: React.FC<MessageProps> = React.memo(({ type, children }) => {
  return <div className={cx(baseClassName, typeClassNames[type ?? "success"])}>{children}</div>;
});
