import React, { ReactElement, useMemo } from "react";
import { useU } from "@syfxlin/ustyled";
import { PrismAsyncLight } from "react-syntax-highlighter";
import { okaidia, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { css } from "@emotion/react";

export type CodeBlockProps = {
  children: ReactElement;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const { ctx, u } = useU();
  const language = useMemo(() => {
    const className = children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    return matches && matches.groups && matches.groups.lang
      ? matches.groups.lang
      : "";
  }, [children.props.className]);

  return (
    <PrismAsyncLight
      language={language}
      style={ctx.mode === "light" ? prism : okaidia}
      showLineNumbers={true}
      data-language={language}
      PreTag={(props) => (
        <div
          {...props}
          css={css`
            position: relative;
            font-size: ${u.fs(0.9)} !important;
            padding: 0 !important;
            background: ${u.c("gray3,3", "gray6,3")} !important;
            margin-top: ${u.sp(4)};
            margin-bottom: ${u.sp(4)};

            &::before {
              color: ${u.c("primary7", "primary3")};
              text-shadow: 1px 1px 3px ${u.c("gray5")};
              opacity: 1;
              content: attr(data-language);
              font-size: ${u.fs(1)};
              padding: ${u.fs(0.3)} ${u.fs(0.9)};
              position: absolute;
              right: 0;
              top: 0;
              z-index: 1;
              transition: opacity 0.3s;
            }

            &:hover::before {
              opacity: 0;
            }
          `}
        />
      )}
      CodeTag={(props) => (
        <pre
          {...props}
          css={css`
            max-height: 50em;
            overflow: auto;
            padding: ${u.fs(0.9)} 0 !important;
            margin: 0 !important;

            .linenumber {
              border-right: 1px solid ${u.c("gray6")};
              padding-right: ${u.sp(2)} !important;
              margin-right: ${u.sp(2)};
              min-width: ${u.fs(2.7)} !important;
            }
          `}
        />
      )}
    >
      {children.props.children.trim()}
    </PrismAsyncLight>
  );
};

export default CodeBlock;
