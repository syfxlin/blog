import React from "react";
import { CheckSSR } from "./src/utils/ssr";
import Root from "./src/layouts/Root";
import { GatsbyBrowser } from "gatsby";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element
}) => (
  <CheckSSR.Provider value={false}>
    <Root>{element}</Root>
  </CheckSSR.Provider>
);
