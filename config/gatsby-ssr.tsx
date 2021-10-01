import React from "react";
import { CheckSSR } from "../src/utils/ssr";
import Root from "../src/layouts/Root";
import { WrapPageElementNodeArgs } from "gatsby";

export const wrapRootElement = ({ element }: WrapPageElementNodeArgs) => (
  <CheckSSR.Provider value={true}>
    <Root>{element}</Root>
  </CheckSSR.Provider>
);
