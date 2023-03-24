import React, { PropsWithChildren } from "react";

export const isSSR = typeof window === "undefined";

export type CheckSSRProps = PropsWithChildren<{}>;

export const InsideSSR: React.FC<CheckSSRProps> = ({ children }) => (
  <>{isSSR && children}</>
);

export const OutsideSSR: React.FC<CheckSSRProps> = ({ children }) => (
  <>{!isSSR && children}</>
);
