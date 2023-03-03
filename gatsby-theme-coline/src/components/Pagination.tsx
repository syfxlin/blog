import React from "react";
import { Left, Right } from "@icon-park/react";
import { range } from "../utils/vender";
import { LinkButton } from "./Button";
import { useU, useUp } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type PaginationProps = {
  current: number;
  size: number;
  onLink?: (page: number) => string;
  onPage?: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  current,
  size,
  onLink,
  onPage,
}) => {
  const { u } = useU();
  const desktop = useUp("md");
  return (
    <section
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${u.sp(1)};
        margin: ${u.sp(4)} 0;

        .pagination-active {
          background-color: ${u.c("primary7", "primary3")};
          color: ${u.c("white", "dark7")};
        }

        .pagination-more {
          padding-left: ${u.sp(1)};
          padding-right: ${u.sp(1)};
        }
      `}
    >
      {current !== 1 && (
        <LinkButton
          aria-label="上一页"
          to={onLink?.(current - 1) ?? "#"}
          onClick={() => onPage?.(current - 1)}
          css={css`
            gap: ${u.sp(1)};
          `}
        >
          <Left /> 上一页
        </LinkButton>
      )}
      {size >= 1 && (
        <LinkButton
          aria-label="第 1 页"
          to={onLink?.(1) ?? "#"}
          onClick={() => onPage?.(1)}
          className={current === 1 ? "pagination-active" : ""}
          key="page-1"
        >
          1
        </LinkButton>
      )}
      {current >= (desktop ? 4 : 3) && (
        <span className="pagination-more">...</span>
      )}
      {range(current - (desktop ? 2 : 1), current + (desktop ? 2 : 1))
        .filter((i) => i > 1 && i < size)
        .map((i) => (
          <LinkButton
            aria-label={`第 ${i} 页`}
            to={onLink?.(i) ?? "#"}
            onClick={() => onPage?.(i)}
            className={current === i ? "pagination-active" : ""}
            key={`page-${i}`}
          >
            {i}
          </LinkButton>
        ))}
      {current <= size - (desktop ? 4 : 3) && (
        <span className="pagination-more">...</span>
      )}
      {size >= 2 && (
        <LinkButton
          aria-label={`第 ${size} 页`}
          to={onLink?.(size) ?? "#"}
          onClick={() => onPage?.(size)}
          className={current === size ? "pagination-active" : ""}
          key={`page-${size}`}
        >
          {size}
        </LinkButton>
      )}
      {current !== size && (
        <LinkButton
          aria-label="下一页"
          to={onLink?.(current + 1) ?? "#"}
          onClick={() => onPage?.(current + 1)}
          css={css`
            gap: ${u.sp(1)};
          `}
        >
          下一页 <Right />
        </LinkButton>
      )}
    </section>
  );
};
