import ArtalkComment from "artalk";
import React, { useEffect } from "react";
import { useTheme } from "styled-components";
// module import not working
import "../../node_modules/artalk/dist/Artalk.css";

type Props = {
  pageKey: string;
  server: string;
  site: string;
};

const Artalk: React.FC<Props> = ({ pageKey, server, site }) => {
  const theme = useTheme();
  useEffect(() => {
    new ArtalkComment({
      el: `#comment`,
      pageKey,
      server,
      site,
      placeholder: "留下你的足迹 ∠( ᐛ 」∠)＿",
      noComment: "快来成为第一个评论的人吧~",
      readMore: {
        pageSize: 15,
        autoLoad: true
      },
      darkMode: theme.type === "dark"
    });
  }, [pageKey, server, site, theme]);
  return <div id={"comment"} />;
};

export default Artalk;
