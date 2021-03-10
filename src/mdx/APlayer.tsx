import React, { useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import loadable from "@loadable/component";

const ReactAplayer = loadable(() => import("react-aplayer"), { ssr: false });

const metingApi =
  "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r";

const rules = [
  ["music.163.com.*song.*id=(\\d+)", "netease", "song"],
  ["music.163.com.*album.*id=(\\d+)", "netease", "album"],
  ["music.163.com.*artist.*id=(\\d+)", "netease", "artist"],
  ["music.163.com.*playlist.*id=(\\d+)", "netease", "playlist"],
  ["music.163.com.*discover/toplist.*id=(\\d+)", "netease", "playlist"],
  ["y.qq.com.*song/(\\w+).html", "tencent", "song"],
  ["y.qq.com.*album/(\\w+).html", "tencent", "album"],
  ["y.qq.com.*singer/(\\w+).html", "tencent", "artist"],
  ["y.qq.com.*playsquare/(\\w+).html", "tencent", "playlist"],
  ["y.qq.com.*playlist/(\\w+).html", "tencent", "playlist"],
  ["xiami.com.*song/(\\w+)", "xiami", "song"],
  ["xiami.com.*album/(\\w+)", "xiami", "album"],
  ["xiami.com.*artist/(\\w+)", "xiami", "artist"],
  ["xiami.com.*collect/(\\w+)", "xiami", "playlist"]
];

const parseUrl = (url?: string) => {
  if (!url) return null;
  for (const rule of rules) {
    const reg = new RegExp(rule[0]);
    const res = reg.exec(url);
    if (res !== null) {
      return {
        server: rule[1],
        type: rule[2],
        id: res[1]
      };
    }
  }
  return null;
};

type AplayerAudio = {
  name: string;
  artist: string;
  url: string;
  cover: string;
  lrc: string;
  theme: string;
  type: string;
};

const parse = (meta: {
  server: string;
  type: string;
  id: string;
  auth?: string;
}): Promise<AplayerAudio[]> => {
  const url = metingApi
    .replace(":server", meta.server)
    .replace(":type", meta.type)
    .replace(":id", meta.id)
    .replace(":auth", meta.auth || "")
    .replace(":r", String(Math.random()));

  return fetch(url).then((res) => res.json());
};

type Props = {
  auto?: string;
  onInit?: (player: any) => void;
  // belows are the same props with aplayer
  fixed?: boolean;
  mini?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: "all" | "one" | "none";
  order?: "list" | "random";
  preload?: "auto" | "metadata" | "none";
  volume?: number;
  audio?: AplayerAudio[];
  customAudioType?: Record<
    string,
    (audioElement: HTMLElement, audio: AplayerAudio, player: any) => void
  >;
  mutex?: boolean;
  lrcType?: number;
  listFolded?: boolean;
  listMaxHeight?: string;
  storageName?: string;

  // events
  onAbort?: () => void;
  onCanplay?: () => void;
  onCanplaythrough?: () => void;
  onDurationchange?: () => void;
  onEmptied?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onLoadeddata?: () => void;
  onLoadedmetadata?: () => void;
  onLoadstart?: () => void;
  onMozaudioavailable?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onPlaying?: () => void;
  onProgress?: () => void;
  onRatechange?: () => void;
  onSeeked?: () => void;
  onSeeking?: () => void;
  onStalled?: () => void;
  onSuspend?: () => void;
  onTimeupdate?: () => void;
  onVolumechange?: () => void;
  onWaiting?: () => void;

  onListshow?: () => void;
  onListhide?: () => void;
  onListadd?: () => void;
  onListremove?: () => void;
  onListswitch?: () => void;
  onListclear?: () => void;
  onNoticeshow?: () => void;
  onNoticehide?: () => void;
  onDestroy?: () => void;
  onLrcshow?: () => void;
  onLrchide?: () => void;
};

const APlayer: React.FC<Props> = ({ auto, ...props }) => {
  if (!ReactAplayer || !props) {
    return null;
  }
  const ref = useRef<any>(null);
  useEffect(() => {
    const meta = parseUrl(auto);
    if (meta) {
      parse(meta).then((audio) => {
        ref.current?.list.add(audio);
      });
    }
  }, [auto]);
  const theme = useTheme() as any;
  return (
    <ReactAplayer
      theme={theme.primary}
      {...props}
      lrcType={props.lrcType || 3}
      onInit={(p: any) => (ref.current = p)}
    />
  );
};

export default APlayer;
