import React from "react";
import { CheckSSR } from "../src/utils/ssr";
import Root from "../src/layouts/Root";
import { WrapRootElementBrowserArgs } from "gatsby";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <CheckSSR.Provider value={false}>
    <Root>{element}</Root>
  </CheckSSR.Provider>
);
