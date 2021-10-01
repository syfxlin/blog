import React from "react";
import theme from "../theme";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "styled-components";
import Background from "../components/Background";
import APlayer from "../mdx/APlayer";
import * as mdxComponents from "../mdx";

// css
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/dist/spectre-icons.min.css";
import "katex/dist/katex.min.css";
import "react-medium-image-zoom/dist/styles.css";
import "../style/index.less";
import { useAplayerData, useBackgroundData } from "../query";
import ErrorBoundary from "./ErrorBoundary";

const Root: React.FC = ({ children }) => {
  const background = useBackgroundData();
  const aplayer = useAplayerData();
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider theme={theme.light}>
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          {background && <Background background={background} />}
          {aplayer?.enable && (
            <APlayer fixed={true} mini={true} auto={aplayer.playlist} />
          )}
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default Root;
