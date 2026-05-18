import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export interface ParagraphProps {
  textAlign: "center" | "end" | undefined;
  children: ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <p className={styles.container} style={{ textAlign: props.textAlign }}>
      {props.children}
    </p>
  );
};
