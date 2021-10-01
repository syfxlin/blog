import React, { createContext, useContext } from "react";

export const isSSR = typeof window === "undefined";

export const CheckSSR = createContext(false);

export const useSSR = () => useContext(CheckSSR);

export const InsideSSR: React.FC = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => isSsr && children}</CheckSSR.Consumer>
);

export const OutsideSSR: React.FC = ({ children }) => (
  <CheckSSR.Consumer>{(isSsr) => !isSsr && children}</CheckSSR.Consumer>
);
