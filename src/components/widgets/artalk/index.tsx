"use client";
import "artalk/dist/Artalk.css";
import * as styles from "./styles.css";
import React, { useEffect, useRef } from "react";
import { COLINE_ARTALK_SERVER_URL, COLINE_ARTALK_SITE_NAME } from "../../../env/public";
import { useTheme } from "next-themes";

type Props = {
  name: string;
  link: string;
};

export const Artalk: React.FC<Props> = ({ name, link }) => {
  const artalk = useRef<any>();
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    import("artalk").then((mod) => {
      artalk.current = new mod.default({
        el: `#artalk`,
        pageTitle: name,
        pageKey: link,
        darkMode: resolvedTheme === "dark",
        server: COLINE_ARTALK_SERVER_URL,
        site: COLINE_ARTALK_SITE_NAME,
      });
    });
    return () => {
      if (artalk.current) {
        artalk.current.destroy();
      }
    };
  }, [name, link, resolvedTheme]);
  return <section id="artalk" aria-label="评论系统" className={styles.container} />;
};
