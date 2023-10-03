"use client";
import "artalk/dist/Artalk.css";
import * as styles from "./styles.css";
import React, { useEffect } from "react";
import ArtalkComment from "artalk";
import { COLINE_ARTALK_SERVER_URL, COLINE_ARTALK_SITE_NAME } from "../../../env/public.mjs";
import { useTheme } from "next-themes";

type Props = {
  name: string;
  link: string;
};

export const Artalk: React.FC<Props> = ({ name, link }) => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    try {
      ArtalkComment.init({
        el: `#comment`,
        pageTitle: name,
        pageKey: link,
        placeholder: "留下你的足迹 ∠( ᐛ 」∠)＿",
        noComment: "快来成为第一个评论的人吧~",
        pagination: {
          readMore: true,
          autoLoad: true,
          pageSize: 15,
        },
        darkMode: resolvedTheme === "dark",
        server: COLINE_ARTALK_SERVER_URL,
        site: COLINE_ARTALK_SITE_NAME,
      });
    } catch (e) {
      // ignore
    }
  }, [name, link, resolvedTheme]);
  return <section id="comment" aria-label="评论系统" className={styles.container} />;
};
