import React, { PropsWithChildren } from "react";
import { UstyledProvider } from "@syfxlin/ustyled";
import { MDXProvider } from "@mdx-js/react";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";

// styles
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "katex/dist/katex.css";
import * as mdx from "../mdx";

export type RootProps = PropsWithChildren<{}>;

export const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <UstyledProvider>
      <NormalizeCSS />
      <GlobalStyles />
      <MDXProvider components={mdx}>{children}</MDXProvider>
    </UstyledProvider>
  );
};
