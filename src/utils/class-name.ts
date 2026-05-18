import { CSSProperties } from "react";

type ClassValue = string | false | null | undefined;

export function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ") || undefined;
}

export function sx(...values: (CSSProperties | undefined)[]) {
  return Object.assign({}, ...values.filter(Boolean));
}
