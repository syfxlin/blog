import React, { useState } from "react";
import Container from "../layouts/Container";
import styled from "styled-components";
import { rgba } from "polished";
import StyledHeader from "./StyledHeader";
import { useDebounce } from "react-use";
import PostCard from "./PostCard";
import useAlgolia from "../utils/useAlgolia";
import Pagination from "./Pagination";
import { useAlgoliaData } from "../query";

type SearchStore = {
  id: string;
  title: string;
  categories?: string[];
  tags?: string[];
  date: string;
  link: string;
  excerpt: string;
  author: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
};

const Search: React.FC<Props> = ({ show, onClose }) => {
  const config = useAlgoliaData();
  const [query, setQuery] = useState<string>("");
  const [searchState, requestDispatch] = useAlgolia<SearchStore>(
    config.appId,
    config.appKey,
    config.indexName,
    { hitsPerPage: 10 }
  );
  useDebounce(
    () => {
      requestDispatch({ query });
    },
    750,
    [query]
  );
  return (
    <Mask show={show} className="grid-md">
      <Header sticky={false}>
        <Container className={"navbar"}>
          <InputSection>
            <Input className="has-icon-right">
              <input
                className="form-input"
                type="text"
                placeholder="快来寻找你要的文章ヾ(≧▽≦*)o..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {searchState.loading && <i className="form-icon loading" />}
            </Input>
          </InputSection>
          <ButtonSection>
            <Icon>
              <img src="/algolia-blue-mark.svg" alt="Algolia-Icon" />
            </Icon>
            <Icon>
              <Close className="icon icon-cross" onClick={onClose} />
            </Icon>
          </ButtonSection>
        </Container>
      </Header>
      <List className="col-8 col-md-12">
        {searchState.hits.map((result: SearchStore) => {
          const post = result as SearchStore;
          return <PostCard key={`post-list-${post.link}`} {...post} />;
        })}
        {searchState.response && (
          <Pagination
            currentPage={(searchState.response?.page || 0) + 1}
            pageSize={searchState.response?.nbPages || 1}
            onPage={(page) => requestDispatch({ page: page - 1 })}
          />
        )}
      </List>
    </Mask>
  );
};

const Mask = styled.div<{ show: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 0.5s;
`;

const Header = styled(StyledHeader)`
  background-color: ${({ theme }) => theme.background};
`;

const InputSection = styled.section.attrs(() => ({
  className: "navbar-section"
}))``;

const ButtonSection = styled.section.attrs(() => ({
  className: "navbar-section"
}))`
  flex: none !important;
`;

const Input = styled.div`
  width: 100%;

  input {
    background: ${rgba("#b6dfe9", 0.4)};
    padding: 1.2rem 0.8rem;
    outline: 0;
    border: 0;
    font-size: 1rem;
  }
`;

const Icon = styled.div`
  margin: 1rem 0 1rem 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    height: 1.2rem;
    width: 1.2rem;
  }
`;

const Close = styled.i`
  cursor: pointer;
`;

const List = styled.div`
  margin-top: 4rem;
  background: ${({ theme }) => theme.background};
  overflow-y: auto;

  > div {
    margin-top: 0;
    box-shadow: none;
    border-bottom: 0.05rem solid ${({ theme }) => rgba(theme.divider, 0.3)};
  }
`;

export default Search;
