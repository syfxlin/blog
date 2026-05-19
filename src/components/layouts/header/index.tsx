import * as React from "react";
import { fetcher } from "../../../contents";
import { t } from "../../../locales";
import { cx } from "../../../utils/styles";
import { Iconify } from "../../ui/iconify";
import { Image } from "../../ui/image";
import { Blog } from "./blog";
import { viewElasticClassName, viewElasticIconClassName, viewElasticTextClassName, viewIconClassName, viewTextClassName } from "./classes";
import { Link } from "./link";
import { Menu } from "./menu";
import { Search } from "./search";
import { Theme } from "./theme";

export const Header: React.FC = async () => {
  const [seo, header] = await Promise.all([fetcher.seo(), fetcher.header()]);
  return (
    <>
      <Menu icon={<Iconify icon="ri:menu-line" />} />
      <header className="fixed top-0 bottom-0 left-0 z-[5] flex h-full max-h-screen w-[100px] flex-col items-center justify-center overflow-y-auto transition-[transform,color,background-color] duration-300 max-md:-translate-x-[100px]">
        <div className="mt-1 mb-2 flex gap-1">
          <Link aria-label={t("header.home")} href="/">
            <Image className="flex h-8 w-8 overflow-hidden rounded-full [writing-mode:horizontal-tb]" src={seo.logo} alt={t("header.icon")} />
          </Link>
        </div>
        <div className="my-1 flex gap-1 [writing-mode:vertical-lr] [&_a]:px-2 [&_a]:py-2.5 [&_a_span_span]:inline-block [&_a_span_span]:tracking-[-0.3em] [&_a_span_span:first-child]:translate-y-[-0.3em]">
          <Blog icon={<Iconify icon="ri:article-line" />} />
          {header.main.map(item => (
            <Link
              tooltip={{ placement: "left" }}
              key={`nav-${item.link}`}
              href={item.link}
              aria-label={item.title}
              className={cx(
                item.view === "text" && viewTextClassName,
                item.view === "icon" && viewIconClassName,
                item.view === "elastic" && viewElasticClassName,
                item.view === "elastic-text" && viewElasticTextClassName,
                item.view === "elastic-icon" && viewElasticIconClassName,
              )}
            >
              <span><span>「</span>{item.title}<span>」</span></span>
              <Iconify icon={item.icon} />
            </Link>
          ))}
          <Theme icon={<Iconify icon="ri:sun-line" />} />
          <Search icon={<Iconify icon="ri:search-line" />} />
        </div>
      </header>
    </>
  );
};
