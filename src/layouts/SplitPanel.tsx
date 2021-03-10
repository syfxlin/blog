import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { TocItem } from "../components/Toc";
import classNames from "classnames";

type Props = {
  className?: string;
  toc?: TocItem[];
};

const SplitPanel: React.FC<Props> = ({ className, toc, children }) => {
  return (
    <StyledMain className={classNames("columns", "grid-md", className)}>
      <StyledContent className={"column col-8 col-md-12"}>
        {children}
      </StyledContent>
      <Sidebar className={"column col-4 col-md-12"} toc={toc} />
    </StyledMain>
  );
};

const StyledMain = styled.main``;

const StyledContent = styled.section`
  padding: 0;
`;

export default SplitPanel;
