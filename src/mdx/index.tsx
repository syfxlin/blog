import loadable from "@loadable/component";
import Wrapper from "./Wrapper";

// inner component
export const wrapper = Wrapper;
export const pre = loadable(() => import("./CodeBlock"));

// custom component
export const Message = loadable(() => import("./MessageBox"));
export const Repo = loadable(() => import("./RepoCard"));
export const Post = loadable(() => import("./PostCard"));
