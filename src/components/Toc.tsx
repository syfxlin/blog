import React from "react";
import styled from "styled-components";
import SidebarCard from "./SidebarCard";
import { rgba } from "polished";

export type TocItem = {
  url: string;
  title: string;
  items?: TocItem[];
};

type Props = {
  toc: TocItem[];
};

const TocUl: React.FC<Props> = ({ toc }) => {
  return (
    <ul>
      {toc.map((t) => (
        <li key={`toc-${t.url}`}>
          <a href={t.url}>{t.title}</a>
          {t.items && <TocUl toc={t.items} />}
        </li>
      ))}
    </ul>
  );
};

const Toc: React.FC<Props> = ({ toc }) => {
  return (
    <StyledCard title={"目录"}>
      <TocUl toc={toc} />
    </StyledCard>
  );
};

const StyledCard = styled(SidebarCard)`
  max-height: 50vh;
  overflow-y: auto;

  ul {
    margin-top: 0;
    border-left: 1px solid ${({ theme }) => rgba(theme.divider, 0.2)};
    margin-left: 0.4rem;
    padding-left: 0.4rem;
  }

  > ul {
    margin-top: 0.8rem;
    margin-left: 0;
    padding-left: 0;
    border: none;
  }
`;

export default Toc;
