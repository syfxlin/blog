import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export interface InlineCodeProps {
  children: ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = (props) => {
  return <code className={styles.container}>{props.children}</code>;
};
