import React, { useState } from "react";
import { useU } from "@syfxlin/ustyled";
import { TocData } from "../queries/page";
import { LinkButton } from "./Button";
import cx from "classnames";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

export type TocProps = {
  items: TocData[];
};

const TocItem: React.FC<TocProps & { activeId: string }> = ({
  items,
  activeId,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={`toc-${item.url}`}>
          <LinkButton
            aria-label={`导航到 ${item.title} 部分`}
            to={item.url}
            className={cx(item.url === `#${activeId}` && "active")}
          >
            {item.title}
          </LinkButton>
          {item.items && <TocItem items={item.items} activeId={activeId} />}
        </li>
      ))}
    </ul>
  );
};

export const Toc: React.FC<TocProps> = ({ items }) => {
  const { css } = useU();
  const [activeId, setActiveId] = useState<string>("");
  useIntersectionObserver(setActiveId);
  return (
    <aside
      css={css`
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        margin-left: .fs(-14);
        width: .fs(12);
        max-height: .fs(30);
        padding: .sp(1);
        overflow-y: auto;

        @media (max-width: 70rem) {
          display: none;
        }

        ul {
          list-style: none;
          padding-left: .fs(1);
          gap: .sp(1);
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
