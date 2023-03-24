import React, { ReactNode, useState } from "react";
import { useSeoData } from "../queries/seo";
import { GatsbyImage } from "gatsby-plugin-image";
import { useU, useUp } from "@syfxlin/ustyled";
import { Button, LinkButton } from "../components/Button";
import { NavViewType, useNavData } from "../queries/nav";
import { Icon } from "../components/Icon";
import { DarkMode, Search } from "@icon-park/react";
import { Canvas } from "../components/Canvas";
import { Spotlight } from "../components/Spotlight";
import { SEO, SEOProps } from "./SEO";
import { css } from "@emotion/react";

export type HeaderProps = SEOProps;

export const Header: React.FC<HeaderProps> = (props) => {
  const { u, mode, setMode } = useU();
  // TODO: SSG 会导致 desktop 为 false，从而引起首次加载时跳变
  const desktop = useUp("md");
  const seo = useSeoData();
  const nav = useNavData();

  const [active, setActive] = useState(false);

  return (
    <>
      <SEO
        title={props.title}
        description={props.description}
        url={props.url}
        image={props.image}
      />
      <header
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <LinkButton
          aria-label="首页"
          to="/"
          css={css`
            display: flex;
            margin: ${u.fs(1)};
          `}
        >
          {seo.logo && (
            <GatsbyImage
              alt="站点图标"
              image={seo.logo}
              css={css`
                display: block;
                width: ${u.fs(2)};
                height: ${u.fs(2)};
                border-radius: 50%;
                overflow: hidden;
                transition: filter 0.3s;
                margin-right: ${u.sp(2)};

                ${u.dark()} {
                  filter: brightness(0.7);
                }
              `}
            />
          )}
          {desktop && seo.title}
        </LinkButton>
        <div
          css={css`
            display: flex;
            gap: ${u.sp(1)};
            padding-right: ${u.fs(1.5)};
          `}
        >
          {nav.map((item) => {
            let element: ReactNode = null;

            if (desktop) {
              if (item.view === NavViewType.ALWAYS) {
                element = item.title;
              }
              if (item.view === NavViewType.ELASTIC) {
                element = item.title;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ELASTIC_ICON) {
                element = <Icon data={item.icon} />;
              }
            } else {
              if (item.view === NavViewType.ALWAYS) {
                element = item.title;
              }
              if (item.view === NavViewType.ELASTIC) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = <Icon data={item.icon} />;
              }
              if (item.view === NavViewType.ALWAYS_ICON) {
                element = null;
              }
            }
            return (
              element && (
                <LinkButton
                  key={`nav-${item.url}`}
                  to={item.url}
                  aria-label={item.title}
                  tippy={{
                    content: item.title,
                    animation: "shift-away",
                  }}
                >
                  {element}
                </LinkButton>
              )
            );
          })}
          <Button
            aria-label="搜索"
            tippy={{
              content: "搜索",
              animation: "shift-away",
            }}
            onClick={() => setActive((p) => !p)}
          >
            <Search />
          </Button>
          <Button
            aria-label="切换暗色模式"
            tippy={{
              content: `当前模式：${mode}`,
              animation: "shift-away",
            }}
            onClick={() =>
              setMode((p) => {
                if (p === "auto") {
                  return "light";
                }
                if (p === "light") {
                  return "dark";
                }
                if (p === "dark") {
                  return "auto";
                }
                return "auto";
              })
            }
          >
            <DarkMode />
          </Button>
        </div>
      </header>
      <Canvas />
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
