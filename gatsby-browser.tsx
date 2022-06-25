import React from "react";
import { GatsbyBrowser } from "gatsby";
import { CheckSSR } from "./src/layouts/CheckSSR";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = (props) => {
  return <CheckSSR.Provider value={false}>{props.element}</CheckSSR.Provider>;
};
