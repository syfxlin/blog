import React from "react";
import { graphql, useStaticQuery } from "gatsby";
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

type QueryProps = {
  site: {
    siteMetadata: {
      background?: string[];
      aplayer?: string;
    };
  };
};

const Global: React.FC = ({ children }) => {
  const { site } = useStaticQuery<QueryProps>(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          background
          aplayer
        }
      }
    }
  `);
  return (
    <>
      <ThemeProvider theme={theme.light}>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        {site.siteMetadata.background && (
          <Background background={site.siteMetadata.background} />
        )}
        {site.siteMetadata.aplayer && (
          <APlayer fixed={true} mini={true} auto={site.siteMetadata.aplayer} />
        )}
      </ThemeProvider>
    </>
  );
};

export default Global;
