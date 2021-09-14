import React from "react";
import { CheckSSR } from "../src/utils/ssr";
import Global from "../src/layouts/Global";
import { WrapRootElementBrowserArgs } from "gatsby";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <CheckSSR.Provider value={false}>
    <Global>{element}</Global>
  </CheckSSR.Provider>
);
