import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export interface GridProps {
  children: ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};
