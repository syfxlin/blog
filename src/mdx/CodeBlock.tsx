import React, { ReactElement } from "react";
import { PrismAsyncLight } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/okaidia";
import styled, { useTheme } from "styled-components";
import "../style/prism-light.less";
import "../style/prism-dark.less";

type Props = {
  children: ReactElement;
};

const CodeBlock: React.FC<Props> = ({ children }) => {
  const className = children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const theme = useTheme() as { type: string };
  const language =
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : "";
  return (
    <PrismAsyncLight
      language={language}
      style={theme.type === "light" ? light : dark}
      showLineNumbers={true}
      PreTag={Pre}
      CodeTag={Code}
      data-lang={language}
    >
      {children.props.children.trim()}
    </PrismAsyncLight>
  );
};

const Pre = styled.div`
  border-radius: 0;
  width: 100%;
  background: ${({ theme }) => theme.codeBackground} !important;
  box-shadow: 0 1px 15px -6px ${({ theme }) => theme.shadow};
  position: relative;
  padding: 0 !important;

  &:before {
    color: ${({ theme }) => theme.text};
    opacity: 0.3;
    content: attr(data-lang);
    font-size: 1rem;
    position: absolute;
    right: 0.5rem;
    top: 0.1em;
  }
`;

const Code = styled.pre`
  margin: 0 !important;
  max-height: 50em;
  overflow: auto;
  padding: 1em 0.5em;

  .linenumber {
    border-right: 1px solid #999;
    padding-right: 0.8em !important;
    margin-right: 0.8em;
    min-width: 3em !important;
  }
`;

export default CodeBlock;
