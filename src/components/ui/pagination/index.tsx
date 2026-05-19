"use client";
import * as React from "react";
import { t } from "../../../locales";
import { range, resolve } from "../../../utils/vender";
import { LinkButton } from "../button";
import { Iconify } from "../iconify/client";

export interface PaginationProps {
  index: number;
  pages: number;
  links?: string;
  onLink?: (page: number) => string;
  onPage?: (page: number) => void;
}

const activeClassName = "bg-text-primary text-background-full";
const iconLeftClassName = "[--icon:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221.1rem%22%20height%3D%221.1rem%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22m10.828%2012l4.95%204.95l-1.414%201.415L8%2012l6.364-6.364l1.414%201.414z%22%2F%3E%3C%2Fsvg%3E)] inline-block h-[1.1rem] w-[1.1rem] bg-current [mask:var(--icon)_no-repeat] [mask-size:100%_100%] [-webkit-mask:var(--icon)_no-repeat] [-webkit-mask-size:100%_100%]";
const iconRightClassName = "[--icon:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221.1rem%22%20height%3D%221.1rem%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22m13.172%2012l-4.95-4.95l1.414-1.413L16%2012l-6.364%206.364l-1.414-1.415z%22%2F%3E%3C%2Fsvg%3E)] inline-block h-[1.1rem] w-[1.1rem] bg-current [mask:var(--icon)_no-repeat] [mask-size:100%_100%] [-webkit-mask:var(--icon)_no-repeat] [-webkit-mask-size:100%_100%]";

export const Pagination: React.FC<PaginationProps> = ({ index, pages, links, onLink, onPage }) => {
  return (
    <section className="my-4 flex items-center justify-center gap-1">
      {index !== 1 && (
        <LinkButton
          className="gap-1"
          aria-label={t("pagination.prev")}
          href={links !== undefined ? resolve(links, "page", index - 1) : onLink?.(index - 1) ?? "#"}
          onClick={() => onPage?.(index - 1)}
        >
          <Iconify icon={iconLeftClassName} /> {t("pagination.prev")}
        </LinkButton>
      )}
      {pages >= 1 && (
        <LinkButton
          className={index === 1 ? activeClassName : ""}
          aria-label={t("pagination.curr", 1)}
          href={links !== undefined && links !== null ? resolve(links, "page", 1) : onLink?.(1) ?? "#"}
          onClick={() => onPage?.(1)}
          key="page-1"
        >
          1
        </LinkButton>
      )}
      {index >= 3 && <span className="px-1">...</span>}
      {range(index - 1, index + 1)
        .filter(i => i > 1 && i < pages)
        .map(i => (
          <LinkButton
            className={index === i ? activeClassName : ""}
            aria-label={t("pagination.curr", i)}
            href={links !== undefined && links !== null ? resolve(links, "page", i) : onLink?.(i) ?? "#"}
            onClick={() => onPage?.(i)}
            key={`page-${i}`}
          >
            {i}
          </LinkButton>
        ))}
      {index <= pages - 3 && <span className="px-1">...</span>}
      {pages >= 2 && (
        <LinkButton
          className={index === pages ? activeClassName : ""}
          aria-label={t("pagination.curr", pages)}
          href={links !== undefined && links !== null ? resolve(links, "page", pages) : onLink?.(pages) ?? "#"}
          onClick={() => onPage?.(pages)}
          key={`page-${pages}`}
        >
          {pages}
        </LinkButton>
      )}
      {index !== pages && (
        <LinkButton
          className="gap-1"
          aria-label={t("pagination.next")}
          href={links !== undefined && links !== null ? resolve(links, "page", index + 1) : onLink?.(index + 1) ?? "#"}
          onClick={() => onPage?.(index + 1)}
        >
          {t("pagination.next")} <Iconify icon={iconRightClassName} />
        </LinkButton>
      )}
    </section>
  );
};

export interface TwoPaginationProps {
  prev?: {
    name: string;
    link: string;
  };
  next?: {
    name: string;
    link: string;
  };
}

export const TwoPagination: React.FC<TwoPaginationProps> = (props) => {
  return (
    <section className="my-4 flex gap-2 p-0">
      {props.prev && (
        <LinkButton
          className="flex-1 justify-center gap-1 p-4 text-center text-[1.2rem]"
          style={{ justifyContent: "flex-start" }}
          aria-label={t("pagination.prev")}
          href={props.prev.link}
        >
          <Iconify icon={iconLeftClassName} /> {props.prev.name}
        </LinkButton>
      )}
      {props.next && (
        <LinkButton
          className="flex-1 justify-center gap-1 p-4 text-center text-[1.2rem]"
          style={{ justifyContent: "flex-end" }}
          aria-label={t("pagination.next")}
          href={props.next.link}
        >
          {props.next.name} <Iconify icon={iconRightClassName} />
        </LinkButton>
      )}
    </section>
  );
};
