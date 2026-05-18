"use client";
import * as React from "react";
import styles from "./styles.module.css";

export interface DividerProps {
  orientation: "vertical" | "horizontal";
}

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const span = <span className={styles.container} />;
  return orientation === "vertical" ?
      (
        span
      ) :
      (
        <div>
          {span}
          {span}
          {span}
        </div>
      );
};
