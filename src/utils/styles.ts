import type { ClassValue } from "clsx";
import clsx from "clsx";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export function cx(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export function sx(...values: (CSSProperties | undefined)[]) {
  return Object.assign({}, ...values.filter(Boolean));
}
