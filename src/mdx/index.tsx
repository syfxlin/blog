import loadable from "@loadable/component";
import Wrapper from "./Wrapper";

export const wrapper = Wrapper;
export const pre = loadable(() => import("./CodeBlock"));
export const message = loadable(() => import("./MessageBox"));
export const repo = loadable(() => import("./RepoCard"));
