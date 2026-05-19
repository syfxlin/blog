"use client";
import type ArtalkComment from "artalk";
import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useRef } from "react";
import { COLINE_ARTALK_SERVER_URL, COLINE_ARTALK_SITE_NAME } from "../../../env/public";
import { t } from "../../../locales";
import "artalk/dist/Artalk.css";

interface Props {
  name: string;
  link: string;
}

export const Artalk: React.FC<Props> = ({ name, link }) => {
  const { resolvedTheme } = useTheme();
  const artalk = useRef<ArtalkComment | null>(null);
  const element = useRef<HTMLElement>(null);
  useEffect(() => {
    import("artalk").then((mod) => {
      if (element.current) {
        let node = element.current.querySelector("#artalk") as HTMLElement | undefined;
        if (!node) {
          node = document.createElement("div");
          node.id = "artalk";
          element.current.append(node);
        }
        // eslint-disable-next-line new-cap
        artalk.current = new mod.default({
          el: node,
          pageTitle: name,
          pageKey: link,
          darkMode: resolvedTheme === "dark",
          server: COLINE_ARTALK_SERVER_URL,
          site: COLINE_ARTALK_SITE_NAME,
        });
      }
    });
    return () => {
      if (artalk.current) {
        artalk.current?.destroy();
      }
    };
  }, [name, link, resolvedTheme]);
  if (COLINE_ARTALK_SITE_NAME && COLINE_ARTALK_SERVER_URL) {
    return <section ref={element} aria-label={t("article.comment")} className="my-4 [&_.atk-list]:mx-auto [&_.atk-list]:max-w-[768px] [&_.atk-main-editor]:mx-auto [&_.atk-main-editor]:max-w-[768px] [&.artalk]:[--at-color-bg:var(--color-background-full)] [&.artalk]:[--at-color-deep:var(--color-text-paragraph)] [&.artalk]:[--at-color-font:var(--color-text-paragraph)] [&.artalk]:[--at-color-grey:var(--color-text-description)] [&.artalk]:[--at-color-main:var(--color-text-primary)] [&.artalk]:[--at-color-meta:var(--color-text-description)] [&.artalk]:[--at-color-sub:var(--color-text-description)]" />;
  } else {
    return null;
  }
};
