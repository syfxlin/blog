import React, { PropsWithChildren } from "react";
import { UstyledProvider } from "@syfxlin/ustyled";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";
import { MDXProvider } from "@mdx-js/react";
import * as mdx from "../mdx";
import { CheckSSR } from "./CheckSSR";

export type RootProps = PropsWithChildren<{
  ssr: boolean;
}>;

export const Root: React.FC<RootProps> = ({ ssr, children }) => {
  return (
    <CheckSSR.Provider value={ssr}>
      <UstyledProvider>
        <NormalizeCSS />
        <GlobalStyles />
        <MDXProvider components={mdx}>{children}</MDXProvider>
      </UstyledProvider>
    </CheckSSR.Provider>
  );
};
