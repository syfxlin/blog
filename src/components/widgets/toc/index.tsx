"use client";
import { TocData } from "@syfxlin/reks";
import * as React from "react";
import { useState } from "react";
import { useIntersectionObserver } from "../../../hooks/use-intersection-observer";
import { cx } from "../../../utils/class-name";
import { Link } from "../../ui/link";

export interface TocProps {
  data: ReadonlyArray<TocData>;
}

const Item: React.FC<TocProps & { active: string }> = ({ data, active }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <ul className="flex list-none flex-col gap-1 pl-4">
      {data.map(i => (
        <li key={`toc-${i.slug}`} id={`toc-${i.slug}`} className="mx-2.5 overflow-x-hidden text-start text-[0.9rem] text-ellipsis whitespace-nowrap text-text-description [&_a]:inline [&_a]:text-[0.9rem] [&_a]:text-text-description">
          {"- "}
          <Link className={cx(i.slug === active && "active")} href={`#${i.slug}`} aria-label={i.name}>
            {i.name}
          </Link>
          {i.children && <Item data={i.children} active={active} />}
        </li>
      ))}
    </ul>
  );
};

export const Toc: React.FC<TocProps> = ({ data }) => {
  const [active, setActive] = useState<string>("");

  useIntersectionObserver(id => setActive(id));

  return (
    <aside className="absolute top-0 right-[-1rem] h-full w-[250px] translate-x-full p-1 max-xl:hidden [&>ul]:sticky [&>ul]:top-10 [&>ul]:m-0 [&>ul]:overflow-x-hidden [&>ul]:overflow-y-auto [&>ul]:p-0 [&>ul]:opacity-50 [&>ul]:transition-[opacity,color,background-color] [&>ul]:duration-[600ms] hover:[&>ul]:opacity-100">
      <Item data={data} active={active} />
    </aside>
  );
};
