import React from "react";
import styled from "styled-components";
import { tag } from "../utils/url";
import { Link } from "gatsby";
import { rgba } from "polished";

type Props = {
  tags?: string[];
};

const TagList: React.FC<Props> = ({ tags }) => {
  if (!tags) {
    return null;
  }
  return (
    <StyledTagList>
      {tags.map((t, i) => (
        <Tag to={tag(t)} key={`tags-${i}`}>
          #{t}
        </Tag>
      ))}
    </StyledTagList>
  );
};

const StyledTagList = styled.div``;

export const Tag = styled(Link)`
  border: 1px solid ${({ theme }) => rgba(theme.divider, 0.2)};
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    opacity: 0.7;
    color: ${({ theme }) => theme.background} !important;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
  }
`;

export default TagList;
