import React, { useState } from "react";
import { useU } from "@syfxlin/ustyled";
import { Card } from "./Card";
import { Close, Search } from "@icon-park/react";
import { Button } from "./Button";
import { useDebounce } from "react-use";
import useAlgolia from "../hooks/use-algolia";
import { SearchItem } from "../queries/init/search";
import { Pagination } from "./Pagination";
import { Loading } from "./Loading";

export type SpotlightProps = {
  active: boolean;
  setActive: (active: boolean) => void;
};

export const Spotlight: React.FC<SpotlightProps> = (props) => {
  if (
    !process.env.GATSBY_ALGOLIA_APP_ID ||
    !process.env.GATSBY_ALGOLIA_API_KEY ||
    !process.env.GATSBY_ALGOLIA_INDEX_NAME
  ) {
    return null;
  }

  const { css } = useU();
  const [search, setSearch] = useState("");
  const [state, requestDispatch] = useAlgolia<SearchItem>(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY,
    process.env.GATSBY_ALGOLIA_INDEX_NAME,
    { hitsPerPage: 10 }
  );
  useDebounce(
    () => {
      requestDispatch({ query: search });
    },
    750,
    [search]
  );
  return (
    <section
      css={css`
        visibility: ${props.active ? "visible" : "hidden"};
      `}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => props.setActive(false)}
        css={css`
          width: 100%;
          height: 100%;
          backdrop-filter: blur(3px);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;

          transition-property: opacity;
          transition-duration: 0.3s;
          transition-timing-function: ease;
          opacity: ${props.active ? 1 : 0};

          &::after {
            content: "";
            background-color: rgb(0, 0, 0);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.25;
          }
        `}
      />
      <div
        css={css`
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: .sp(20);
          padding-bottom: .sp(10);
          pointer-events: none;

          transition-property: opacity;
          transition-duration: 0.3s;
          transition-timing-function: ease;
          transform-origin: center center;
          opacity: ${props.active ? 1 : 0};
        `}
      >
        <div
          css={css`
            border-top-left-radius: .br(0.8);
            border-top-right-radius: .br(0.8);
            background-color: .c(white, dark7);
            border-bottom: .bw(1) solid .c(gray3, gray6);
            padding: .sp(4);
            width: 100%;
            max-width: .fs(40);
            display: flex;
            gap: .sp(2);
            pointer-events: auto;
          `}
        >
          <Search
            css={css`
              color: .c(primary7, primary3);
            `}
          />
          <input
            type="text"
            placeholder="搜索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            css={css`
              outline: none;
              border: none;
              font-size: .fs(1.1);
              line-height: 1.5;
              width: 100%;
              background: transparent;
              color: .c(gray7, dark0);

              &::placeholder {
                color: .c(gray4, gray7);
              }
            `}
          />
          <Button
            aria-label="关闭"
            tippy={{
              content: "关闭",
              animation: "shift-away",
            }}
            onClick={() => props.setActive(false)}
          >
            <Close />
          </Button>
        </div>
        {(state.loading || state.response) && (
          <div
            css={css`
              border-bottom-left-radius: .br(0.8);
              border-bottom-right-radius: .br(0.8);
              background-color: .c(white, dark7);
              padding: .sp(1) .sp(7);
              width: 100%;
              max-width: .fs(40);
              overflow-y: auto;
              pointer-events: auto;
            `}
          >
            {state.loading && (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  padding: .sp(2);
                `}
              >
                <Loading />
              </div>
            )}
            {state.hits.map((item) => (
              <Card
                key={`search-${item.link}`}
                title={item.title}
                link={item.link}
                date={item.date}
                excerpt={item.excerpt}
                categories={item.categories}
                tags={item.tags}
              />
            ))}
            {state.response && (
              <Pagination
                current={(state.response.page || 0) + 1}
                size={state.response.nbPages || 1}
                onPage={(page) => requestDispatch({ page: page - 1 })}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
