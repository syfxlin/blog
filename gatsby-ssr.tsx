import React from "react";
import { CheckSSR } from "./src/layouts/CheckSSR";
import { GatsbySSR } from "gatsby";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = (props) => {
  return <CheckSSR.Provider value={true}>{props.element}</CheckSSR.Provider>;
};
