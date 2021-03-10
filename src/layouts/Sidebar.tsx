import React from "react";
import SidebarCard from "../components/SidebarCard";
import AuthorCard from "../components/AuthorCard";
import styled from "styled-components";
import { graphql, Link, useStaticQuery } from "gatsby";
import { archive, category, tag } from "../utils/url";
import { Tag } from "../components/TagList";
import Toc, { TocItem } from "../components/Toc";

type Props = {
  toc?: TocItem[];
  className?: string;
};

type SidebarQuery = {
  categories: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
  tags: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
  archives: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

const Sidebar: React.FC<Props> = ({ className, toc }) => {
  const { categories, tags, archives } = useStaticQuery<SidebarQuery>(graphql`
    query SidebarQuery {
      categories: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
      tags: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: frontmatter___tags, limit: 20) {
          fieldValue
          totalCount
        }
      }
      archives: allMdx(filter: { fields: { layout: { eq: "post" } } }) {
        group(field: fields___year) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  return (
    <StyledAside className={className}>
      <AuthorCard />
      <Sticky>
        {toc && <Toc toc={toc} />}
        <SidebarCard title={"分类"}>
          <ul>
            {categories.group.map((c, i) => (
              <li key={`category-${i}`}>
                <Link to={category(c.fieldValue)}>
                  {c.fieldValue} ({c.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
        <TagCloud title={"标签"}>
          <div>
            {tags.group.map((t, i) => (
              <Tag to={tag(t.fieldValue)} key={`tag-${i}`}>
                {t.fieldValue} ({t.totalCount})
              </Tag>
            ))}
          </div>
        </TagCloud>
        <SidebarCard title={"归档"}>
          <ul>
            {archives.group.map((a, i) => (
              <li key={`archive-${i}`}>
                <Link to={archive(a.fieldValue)}>
                  {a.fieldValue} ({a.totalCount})
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
