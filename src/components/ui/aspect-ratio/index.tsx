"use client";
import * as React from "react";
import { forwardRef, HTMLAttributes } from "react";
import { cx, sx } from "../../../utils/class-name";
import styles from "./styles.module.css";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
};

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({ ratio: r, ...props }, ref) => {
  return (
    <div
      {...props}
      className={cx(props.className, styles.container)}
      style={sx(props.style, { "--ratio": `${((1 / r) * 100).toFixed(4)}%` } as React.CSSProperties)}
      ref={ref}
    />
  );
});
