import React from "react";
import { CheckSSR } from "./src/layouts/CheckSSR";
import { Root } from "./src/layouts/Root";
import { GatsbySSR } from "gatsby";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = (props) => {
  return (
    <CheckSSR.Provider value={true}>
      <Root>{props.element}</Root>
    </CheckSSR.Provider>
  );
};
