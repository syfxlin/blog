import React, { useState } from "react";
import { useU } from "@syfxlin/ustyled";
import { TocData } from "../queries/page";
import { LinkButton } from "./Button";
import cx from "classnames";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import scrollIntoView from "scroll-into-view-if-needed";
import { css } from "@emotion/react";

export type TocProps = {
  items?: TocData[];
};

const TocItem: React.FC<TocProps & { activeId: string }> = ({
  items,
  activeId,
}) => {
  if (!items || !items.length) {
    return null;
  }

  return (
    <ul>
      {items.map(
        (item) =>
          item.title &&
          item.url && (
            <li key={`toc-${item.url}`} id={`toc-${item.url.substring(1)}`}>
              <LinkButton
                aria-label={`导航到 ${item.title} 部分`}
                to={item.url}
                className={cx(item.url.substring(1) === activeId && "active")}
              >
                {item.title}
              </LinkButton>
              {item.items && <TocItem items={item.items} activeId={activeId} />}
            </li>
          )
      )}
    </ul>
  );
};

export const Toc: React.FC<TocProps> = ({ items }) => {
  if (!items || !items.length) {
    return null;
  }

  const { u } = useU();
  const [activeId, setActiveId] = useState<string>("");
  useIntersectionObserver((id) => {
    const toc = document.getElementById(`toc-${id}`);
    if (toc) {
      scrollIntoView(toc, {
        behavior: "smooth",
        scrollMode: "if-needed",
      });
    }
    setActiveId(id);
  });
  return (
    <aside
      css={css`
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        margin-left: ${u.fs(-14)};
        width: ${u.fs(12)};
        max-height: ${u.fs(30)};
        padding: ${u.sp(1)};
        overflow-y: auto;

        @media (max-width: 70rem) {
          display: none;
        }

        ul {
          list-style: none;
          padding-left: ${u.fs(1)};
          gap: ${u.sp(1)};
          display: flex;
          flex-direction: column;
        }

        > ul {
          margin: 0;
          padding: 0;
        }

        li {
          display: flex;
          flex-direction: column;

          a {
            flex-grow: 1;
            text-align: left;
            justify-content: flex-start;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow-x: hidden;
            display: inline-block;
          }
        }
      `}
    >
      <TocItem items={items} activeId={activeId} />
    </aside>
  );
};
