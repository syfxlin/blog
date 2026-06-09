"use client";
import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useDebounce } from "react-use";
import useSWR from "swr";
import { SearchResponse } from "../../../app/api/search/route";
import { t } from "../../../locales";
import { ArticleInfo } from "../../layouts/article-info";
import { Button } from "../../ui/button";
import { ClientOnly } from "../../ui/client-only/ClientOnly";
import { Iconify } from "../../ui/iconify/client";
import { Loading } from "../../ui/loading";
import { Pagination } from "../../ui/pagination";

async function fetcher([path, page, search]: [string, number, string]) {
  const url = new URL(path, location.href);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(10));
  url.searchParams.set("query", search);
  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  const data = json as SearchResponse;
  const total = data.total;
  const items = data.items.map(i => ({ ...i, published: new Date(i.published), modified: new Date(i.modified) }));
  return { total, items };
}

export interface SpotlightProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const iconSearchClassName = "[--icon:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221.1rem%22%20height%3D%221.1rem%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22m18.031%2016.617l4.283%204.282l-1.415%201.415l-4.282-4.283A8.96%208.96%200%200%201%2011%2020c-4.968%200-9-4.032-9-9s4.032-9%209-9s9%204.032%209%209a8.96%208.96%200%200%201-1.969%205.617m-2.006-.742A6.98%206.98%200%200%200%2018%2011c0-3.867-3.133-7-7-7s-7%203.133-7%207s3.133%207%207%207a6.98%206.98%200%200%200%204.875-1.975z%22%2F%3E%3C%2Fsvg%3E)] inline-block h-[1.1rem] w-[1.1rem] bg-current [mask:var(--icon)_no-repeat] [mask-size:100%_100%] [-webkit-mask:var(--icon)_no-repeat] [-webkit-mask-size:100%_100%]";
const iconCloseClassName = "[--icon:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221.1rem%22%20height%3D%221.1rem%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22m12%2010.587l4.95-4.95l1.414%201.414l-4.95%204.95l4.95%204.95l-1.415%201.414l-4.95-4.95l-4.949%204.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05%205.638z%22%2F%3E%3C%2Fsvg%3E)] inline-block h-[1.1rem] w-[1.1rem] bg-current [mask:var(--icon)_no-repeat] [mask-size:100%_100%] [-webkit-mask:var(--icon)_no-repeat] [-webkit-mask-size:100%_100%]";

export const Spotlight: React.FC<SpotlightProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  useDebounce(() => setDebounce(search), 750, [search]);
  const query = useSWR(debounce ? ["/api/search", page, debounce] : null, fetcher);

  return (
    <ClientOnly>
      {() => createPortal(
        <section className="transition-[visibility,color,background-color] duration-300 ease-[ease]" style={{ visibility: props.active ? "visible" : "hidden" }}>
          <div
            className="fixed inset-0 z-[9] h-full w-full backdrop-blur-[3px] transition-[opacity,color,background-color] duration-300 ease-[ease] after:absolute after:inset-0 after:bg-black after:opacity-25 after:content-['']"
            style={{ opacity: props.active ? 1 : 0 }}
            onClick={() => props.setActive(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-10 flex origin-center flex-col items-center overflow-hidden px-4 pt-20 pb-10 transition-[opacity,color,background-color] duration-300 ease-[ease] [writing-mode:horizontal-tb]" style={{ opacity: props.active ? 1 : 0 }}>
            <div className="pointer-events-auto flex w-full max-w-[640px] gap-2 rounded-t-[0.25rem] border-b border-text-description bg-background-full p-4">
              <div className="mr-0.5 flex items-center justify-center text-text-primary">
                <Iconify icon={iconSearchClassName} />
              </div>
              <input
                className="w-full border-0 bg-transparent text-[1.1rem] leading-normal text-text-paragraph outline-none placeholder:text-text-description"
                type="text"
                value={search}
                placeholder={t("spotlight.input")}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
              <Button aria-label={t("spotlight.close")} onClick={() => props.setActive(false)}>
                <Iconify icon={iconCloseClassName} />
              </Button>
            </div>
            {(query.isLoading || query.data) && (
              <div className="pointer-events-auto w-full max-w-[640px] overflow-y-auto rounded-b-[0.2rem] bg-background-full px-7 py-1">
                {query.isLoading && <Loading />}
                {query.data?.items.map(item => (
                  <ArticleInfo key={`search-${item.link}`} data={item} />
                ))}
                {query.data && (
                  <Pagination index={page} pages={Math.ceil(query.data.total / 10)} onPage={page => setPage(page)} />
                )}
              </div>
            )}
          </div>
        </section>,
        document.body,
      )}
    </ClientOnly>
  );
};
