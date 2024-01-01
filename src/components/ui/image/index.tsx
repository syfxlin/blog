"use client";
import * as styles from "./styles.css";
import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import NImage from "next/image";
import { cx, sx } from "@syfxlin/reve";
import { breakpoints } from "../../../theme/tokens";

const parse = (src: string) => {
  const exec = /\.(\d+)x(\d+)(\.\w+)$/.exec(src);
  if (exec) {
    const width = parseInt(exec[1]);
    const height = parseInt(exec[2]);
    return {
      src: src,
      sizes: { width, height },
    };
  } else {
    return {
      src: src,
      sizes: undefined,
    };
  }
};

export type ImageProps = HTMLAttributes<HTMLDivElement> & { src: string; alt: string };

export const Image = forwardRef<HTMLDivElement, ImageProps>(({ src, alt, ...props }, ref) => {
  const parsed = useMemo(() => parse(src), [src]);
  return (
    <span
      {...props}
      ref={ref}
      className={cx(styles.container, props.className)}
      style={sx(props.style, { maxWidth: parsed.sizes ? `${parsed.sizes.width}px` : `100%` })}
    >
      {parsed.sizes && (
        <span
          className={styles.placeholder}
          style={{ paddingBottom: `${((parsed.sizes.height / parsed.sizes.width) * 100).toFixed(4)}%` }}
        />
      )}
      {/*prettier-ignore*/}
      <NImage
        src={parsed.src}
        alt={alt ?? "image"}
        sizes={Object.values(breakpoints).map((p) => `(max-width: ${p}) 100vw`).join(",")}
        className={styles.image}
        placeholder="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='/%3E%3C/svg%3E"
        {...(parsed.sizes ? parsed.sizes : { fill: true })}
      />
    </span>
  );
});
