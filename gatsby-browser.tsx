import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Root } from "./src/layouts/Root";
import { CheckSSR } from "./src/layouts/CheckSSR";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = (props) => {
  return (
    <CheckSSR.Provider value={false}>
      <Root>{props.element}</Root>
    </CheckSSR.Provider>
  );
};
