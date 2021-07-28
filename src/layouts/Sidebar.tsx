import React from "react";
import SidebarCard from "../components/SidebarCard";
import AuthorCard from "../components/AuthorCard";
import styled from "styled-components";
import { Link } from "gatsby";
import { archive, category, tag } from "../utils/url";
import { Tag } from "../components/TagList";
import Toc, { TocItem } from "../components/Toc";
import TwitterCard from "../components/TwitterCard";
import { useArchivesData, useCategoriesData, useTagsData } from "../query";

type Props = {
  toc?: TocItem[];
  className?: string;
};

const Sidebar: React.FC<Props> = ({ className, toc }) => {
  const categories = useCategoriesData();
  const tags = useTagsData();
  const archives = useArchivesData();
  return (
    <StyledAside className={className}>
      <AuthorCard />
      <TwitterCard />
      <Sticky>
        {toc && <Toc toc={toc} />}
        <SidebarCard title={"分类"}>
          <ul>
            {categories.map((c, i) => (
              <li key={`category-${i}`}>
                <Link to={category(c.name)}>
                  {c.name} ({c.count})
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
        <TagCloud title={"标签"}>
          <div>
            {tags.map((t, i) => (
              <Tag to={tag(t.name)} key={`tag-${i}`}>
                {t.name} ({t.count})
              </Tag>
            ))}
          </div>
        </TagCloud>
        <SidebarCard title={"归档"}>
          <ul>
            {archives.map((a, i) => (
              <li key={`archive-${i}`}>
                <Link to={archive(a.name)}>
                  {a.name} ({a.count})
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
      </Sticky>
    </StyledAside>
  );
};

const StyledAside = styled.aside`
  padding: 0 0 0 1rem;

  @media (max-width: 840px) {
    padding-left: 0;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 1rem;
`;

const TagCloud = styled(SidebarCard)`
  div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default Sidebar;
