import React, { useEffect } from "react";
import ArtalkComment from "artalk";
// module import not working
import "../../node_modules/artalk/dist/Artalk.css";
import { useU } from "@syfxlin/ustyled";

type Props = {
  pageTitle: string;
  pageKey: string;
};

const Artalk: React.FC<Props> = ({ pageTitle, pageKey }) => {
  const { ctx } = useU();
  useEffect(() => {
    new ArtalkComment({
      el: `#comment`,
      pageTitle,
      pageKey,
      placeholder: "留下你的足迹 ∠( ᐛ 」∠)＿",
      noComment: "快来成为第一个评论的人吧~",
      readMore: {
        pageSize: 15,
        autoLoad: true,
      },
      darkMode: ctx.mode === "dark",
      server: process.env.GATSBY_ARTALK_SERVER_URL,
      site: process.env.GATSBY_ARTALK_SITE_NAME,
    });
  }, [pageTitle, pageKey, ctx.mode]);
  return <section id="comment" aria-label="评论系统" />;
};

export default Artalk;
