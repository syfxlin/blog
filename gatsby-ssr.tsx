import React from "react";
import { GatsbySSR } from "gatsby";
import { Root } from "./src/layouts/Root";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = (props) => {
  return <Root ssr={true}>{props.element}</Root>;
};
