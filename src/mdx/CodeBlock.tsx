import React, { ReactElement, useMemo } from "react";
import { useU } from "@syfxlin/ustyled";
import { PrismAsyncLight } from "react-syntax-highlighter";
import { okaidia, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export type CodeBlockProps = {
  children: ReactElement;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const { ctx, css } = useU();
  const language = useMemo(() => {
    const className = children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    return matches && matches.groups && matches.groups.lang
      ? matches.groups.lang
      : "language-markup";
  }, [children.props.className]);

  return (
    <PrismAsyncLight
      language={language}
      style={ctx.mode === "light" ? prism : okaidia}
      showLineNumbers={true}
      data-language={language}
      PreTag={(props) => (
        <pre
          {...props}
          css={css`
            position: relative;
            font-size: .fs(0.9) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            background: .c(gray3_3) !important;

            &:before {
              color: .c(gray6);
              opacity: 0.3;
              content: attr(data-language);
              font-size: .fs(1.2);
              position: absolute;
              right: .fs(1);
              top: .fs(0.5);
            }
          `}
        />
      )}
      CodeTag={(props) => (
        <code
          {...props}
          css={css`
            .linenumber {
              border-right: 1px solid .c(gray6);
              padding-right: .sp(2) !important;
              margin-right: .sp(2);
              min-width: .fs(2.7) !important;
            }
          `}
        />
      )}
    >
      {children.props.children.trim()}
    </PrismAsyncLight>
  );
};
