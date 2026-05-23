"use client";
import mediumZoom, { Zoom } from "medium-zoom";
import NImage from "next/image";
import * as React from "react";
import { HTMLAttributes, useMemo, useRef } from "react";
import { breakpoints } from "../../../theme/tokens";
import { cx, sx } from "../../../utils/styles";

function parse(src: string, alt?: string) {
  const exec = /\.(\d+)x(\d+)\.\w+$/.exec(src);
  if (exec) {
    const width = Number.parseInt(exec[1]);
    const height = Number.parseInt(exec[2]);
    return {
      src,
      alt: alt ?? "image",
      fill: false,
      width,
      height,
      sizes: Object.values(breakpoints)
        .map(p => `(max-width: ${p}px) 100vw`)
        .join(","),
    };
  } else {
    return {
      src,
      alt: alt ?? "image",
      fill: true,
      width: undefined,
      height: undefined,
      sizes: Object.values(breakpoints)
        .map(p => `(max-width: ${p}px) 100vw`)
        .join(","),
    };
  }
}

export type ImageProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  zoom?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const containerClassName = "relative mx-auto flex max-w-full items-center justify-center overflow-hidden [filter:var(--image-filter)] transition-[filter] duration-300";
const placeholderClassName = "relative inset-0 block";
const imageClassName = "h-full w-full object-cover [filter:none] transition-[filter] duration-300 ease-out [&[loading='lazy'][style*='background-image']]:blur-[8px]";

export const Image: React.FC<ImageProps> = ({ src, alt, zoom, ref, ...props }) => {
  const parsed = useMemo(() => parse(src, alt), [src, alt]);
  const instanceRef = useRef<Zoom | null>(null);
  return (
    <span
      {...props}
      ref={ref}
      className={cx(containerClassName, props.className)}
      style={sx(props.style, { maxWidth: parsed.width !== undefined ? `${parsed.width}px` : `100%` })}
    >
      {parsed.width !== undefined && parsed.height !== undefined && (
        <span
          className={placeholderClassName}
          style={{ paddingBottom: `${((parsed.height / parsed.width) * 100).toFixed(4)}%` }}
        />
      )}
      {/* prettier-ignore */}
      <NImage
        src={parsed.src}
        alt={parsed.alt}
        fill={parsed.fill}
        sizes={parsed.sizes}
        width={parsed.width}
        height={parsed.height}
        className={imageClassName}
        placeholder="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='/%3E%3C/svg%3E"
        ref={(node) => {
          if (zoom) {
            const value = instanceRef.current = instanceRef.current ?? mediumZoom({ margin: 60 });
            if (node) {
              value.attach(node);
            } else {
              value.detach();
            }
          }
        }}
      />
    </span>
  );
};
