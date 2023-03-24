import React from "react";
import * as mdx from "../mdx";
import { useMount } from "react-use";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { NormalizeCSS } from "../theme/NormalizeCSS";
import { GlobalStyles } from "../theme/GlobalStyles";
import { MDXProvider } from "@mdx-js/react";
import { UstyledProvider } from "@syfxlin/ustyled";

// styles
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "katex/dist/katex.css";
import "@code-hike/mdx/dist/index.css";

export const Root = <T,>(Component: React.FC<T>): React.FC<T> => {
  return (props) => {
    // prettier-ignore
    useMount(() => {
      const e1 = "line-height:22px;border-radius:3px;color:#FFF;background:#7048e8;";
      const e2 = "line-height:22px;border-radius:3px;";
      console.info("%c \u9752\u7a7a\u4e4b\u84dd %c", e1, "", "https://ixk.me");
      console.info("%c Gatsby \u4e3b\u9898 %c", e1, "", "https://github.com/syfxlin/blog");
      console.info("%c \u26f5 \u53d1\u73b0\u63a7\u5236\u53f0\u62a5\u9519\u8bf7\u52a1\u5fc5\u8054\u7cfb\u535a\u4e3b \u26f5", e2);
    });
    return (
      <UstyledProvider>
        <NormalizeCSS />
        <GlobalStyles />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MDXProvider components={mdx}>
            {/*@ts-ignore*/}
            <Component {...props} />
          </MDXProvider>
        </ErrorBoundary>
      </UstyledProvider>
    );
  };
};
