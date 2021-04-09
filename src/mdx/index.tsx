import loadable from "@loadable/component";

export const repo = loadable(() => import("react-repo-card"));
export const pre = loadable(() => import("./CodeBlock"));
// export const img = loadable(() => import("./Image"));
export const aplayer = loadable(() => import("./APlayer"));
export const dplayer = loadable(() => import("./DPlayer"));
export const message = loadable(() => import("./MessageBox"));
