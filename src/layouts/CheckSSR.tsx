import React, { createContext, PropsWithChildren, useContext } from "react";

export const isSSR = typeof window === "undefined";

export const CheckSSR = createContext(false);

export const useSSR = () => useContext(CheckSSR);

export type CheckSSRProps = PropsWithChildren<{}>;

export const InsideSSR: React.FC<CheckSSRProps> = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => isSsr && children}</CheckSSR.Consumer>
);

export const OutsideSSR: React.FC<CheckSSRProps> = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => !isSsr && children}</CheckSSR.Consumer>
);
