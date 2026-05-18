"use client";
import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useRef } from "react";
import { render } from "../../../utils/canvas";
import styles from "./styles.module.css";

export const Canvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (ref.current) {
      render(
        ref.current,
        ref.current.clientWidth,
        ref.current.clientHeight,
        resolvedTheme === "light" ? "#000000" : "#ffffff",
        0.25,
      );
    }
  }, [resolvedTheme]);

  return <canvas ref={ref} className={styles.container} />;
};
