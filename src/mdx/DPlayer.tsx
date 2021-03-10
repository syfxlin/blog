import React from "react";
import type { ReactDplayerProps } from "react-dplayer";
import loadable from "@loadable/component";

const ReactDPlayer = loadable(() => import("react-dplayer"), { ssr: false });

const DPlayer: React.FC<ReactDplayerProps> = (props) => {
  if (!ReactDPlayer) {
    return null;
  }
  return <ReactDPlayer {...props} />;
};

export default DPlayer;
