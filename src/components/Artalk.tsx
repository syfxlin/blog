import { default as ArtalkComment } from "artalk";
import React, { useEffect } from "react";
import { useTheme } from "styled-components";
import "artalk/dist/Artalk.css";

type Props = {
  pageKey: string;
  serverUrl: string;
};

const Artalk: React.FC<Props> = ({ pageKey, serverUrl }) => {
  const theme = useTheme() as any;
  useEffect(() => {
    // @ts-ignore
    new ArtalkComment({
      el: `#comment`,
      pageKey,
      serverUrl,
      placeholder: "留下你的足迹 ∠( ᐛ 」∠)＿",
      noComment: "快来成为第一个评论的人吧~",
      readMore: {
        pageSize: 15,
        autoLoad: true
      },
      darkMode: theme.type === "dark"
    });
  }, [pageKey, serverUrl]);
  return <div id={"comment"} />;
};

export default Artalk;
