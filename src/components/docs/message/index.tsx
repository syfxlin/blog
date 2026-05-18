import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export interface MessageProps {
  type: "warn" | "info" | "error" | "success";
  children?: ReactNode;
}

export const Message: React.FC<MessageProps> = React.memo(({ type, children }) => {
  return <div className={styles[type ?? "success"]}>{children}</div>;
});
