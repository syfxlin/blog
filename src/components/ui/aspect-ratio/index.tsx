"use client";
import * as React from "react";
import { forwardRef, HTMLAttributes } from "react";
import { cx, sx } from "../../../utils/class-name";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
};

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({ ratio: r, ...props }, ref) => {
  return (
    <div
      {...props}
      className={cx(
        props.className,
        "relative max-w-full overflow-hidden before:block before:h-0 before:pb-[var(--ratio)] before:content-[''] after:table after:clear-both after:content-[''] [&>*:not(style)]:absolute [&>*:not(style)]:inset-0 [&>*:not(style)]:flex [&>*:not(style)]:w-full [&>*:not(style)]:items-center [&>*:not(style)]:justify-center [&>*:not(style)]:overflow-hidden [&>img]:object-cover [&>video]:object-cover",
      )}
      style={sx(props.style, { "--ratio": `${((1 / r) * 100).toFixed(4)}%` } as React.CSSProperties)}
      ref={ref}
    />
  );
});
