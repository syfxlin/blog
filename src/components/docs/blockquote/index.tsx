import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export interface BlockquoteProps {
  children: ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = (props) => {
  return <blockquote className={styles.container}>{props.children}</blockquote>;
};
