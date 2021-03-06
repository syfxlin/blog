import loadable from "@loadable/component";

export const pre = loadable(() => import("./CodeBlock"));
export const repo = loadable(() => import("./RepoCard"));
export const aplayer = loadable(() => import("./APlayer"));
export const dplayer = loadable(() => import("./DPlayer"));
export const message = loadable(() => import("./MessageBox"));
export const post = loadable(() => import("./PostCard"));
