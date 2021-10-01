import React from "react";
import { CheckSSR } from "./src/utils/ssr";
import Root from "./src/layouts/Root";
import { GatsbySSR } from "gatsby";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <CheckSSR.Provider value={true}>
    <Root>{element}</Root>
  </CheckSSR.Provider>
);
