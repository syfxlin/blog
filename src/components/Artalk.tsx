import React, { useEffect } from "react";
import ArtalkComment from "artalk";
// module import not working
import "../../node_modules/artalk/dist/Artalk.css";
import { useU } from "@syfxlin/ustyled";

type Props = {
  pageTitle: string;
  pageKey: string;
  server: string;
  site: string;
};

const Artalk: React.FC<Props> = ({ pageTitle, pageKey, server, site }) => {
  const { ctx } = useU();
  useEffect(() => {
    new ArtalkComment({
      el: `#comment`,
      pageTitle,
      pageKey,
      server,
      site,
      placeholder: "留下你的足迹 ∠( ᐛ 」∠)＿",
      noComment: "快来成为第一个评论的人吧~",
      readMore: {
        pageSize: 15,
        autoLoad: true,
      },
      darkMode: ctx.mode === "dark",
    });
  }, [pageKey, server, site, ctx.mode]);
  return <section id="comment" />;
};

export default Artalk;
