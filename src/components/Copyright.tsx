import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

type Props = {
  license: {
    label: string;
    href: string;
  };
  post: {
    label: string;
    href: string;
  };
  author: string;
};

const Copyright: React.FC<Props> = ({ license, author, post }) => {
  return (
    <StyledCopyright>
      <Title>{post.label}</Title>
      <Link>
        <a href={post.href}>{post.href}</a>
      </Link>
      <MetaList>
        <Meta>
          <div>许可协议</div>
          <div>
            <a href={license.href}>{license.label}</a>
          </div>
        </Meta>
        <Meta>
          <div>本文作者</div>
          <div>{author}</div>
        </Meta>
      </MetaList>
      转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！
    </StyledCopyright>
  );
};

const StyledCopyright = styled.div`
  position: relative;
  line-height: 1.2;
  font-size: 0.75rem;
  background: ${rgba("#dbe7f8", 0.7)};
  color: #4a4a4a;
  margin: 0.7rem -1.5rem;
  overflow: hidden;
  display: block;
  padding: 1.5em 2em;

  &:after {
    position: absolute;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'%3E%3Cpath fill='%234a4a4a' d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E");
    content: " ";
    height: 200px;
    width: 200px;
    right: -40px;
    top: -45px;
    opacity: 0.1;
  }
`;

const Title = styled.div`
  margin: 0 0 0.1rem;
`;

const Link = styled.div`
  margin: 0 0 0.7rem;
  font-size: 0.6rem;
`;

const MetaList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Meta = styled.div`
  margin: 0 2rem 0.7em 0;

  div {
    &:first-of-type {
      font-size: 0.6rem;
      margin: 0 0 0.1rem;
    }
  }
`;

export default Copyright;
