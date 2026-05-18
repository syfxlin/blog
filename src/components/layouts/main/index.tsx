import * as React from "react";
import { PropsWithChildren } from "react";
import { cx } from "../../../utils/class-name";
import styles from "./styles.module.css";

export type MainProps = PropsWithChildren<{
  size?: "sm" | "md" | "lg";
}>;

export const Main: React.FC<MainProps> = ({ size, children }) => {
  return (
    <main className={cx(styles.container, styles[size ?? "sm"])}>
      {children}
    </main>
  );
};
