import React, { PropsWithChildren } from "react";
import { UstyledProvider } from "@syfxlin/ustyled";
import { MDXProvider } from "@mdx-js/react";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";
import { Canvas } from "../components/Canvas";

// styles
import "katex/dist/katex.min.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

export type RootProps = PropsWithChildren<{}>;

export const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <UstyledProvider>
      <NormalizeCSS />
      <GlobalStyles />
      <Canvas />
      <MDXProvider components={{}}>{children}</MDXProvider>
    </UstyledProvider>
  );
};
