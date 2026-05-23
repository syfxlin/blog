"use client";
import * as React from "react";
import { HTMLAttributes } from "react";
import { cx, sx } from "../../../utils/styles";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
  ref?: React.Ref<HTMLDivElement>;
};

export const AspectRatio: React.FC<AspectRatioProps> = ({ ratio: r, ref, ...props }) => {
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
};
