import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Root } from "./src/layouts/Root";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = (props) => {
  return <Root ssr={false}>{props.element}</Root>;
};
