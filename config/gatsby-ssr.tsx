import React from "react";
import { CheckSSR } from "../src/utils/ssr";
import Global from "../src/layouts/Global";
import { WrapPageElementNodeArgs } from "gatsby";

export const wrapRootElement = ({ element }: WrapPageElementNodeArgs) => (
  <CheckSSR.Provider value={true}>
    <Global>{element}</Global>
  </CheckSSR.Provider>
);
