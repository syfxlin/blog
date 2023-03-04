import loadable from "@loadable/component";
import Wrapper from "./Wrapper";

// codehike components
export { CH } from "@code-hike/mdx/components";

// inner components
export const wrapper = Wrapper;

// custom components
export const Message = loadable(() => import("./MessageBox"));
export const Repo = loadable(() => import("./RepoCard"));
export const Post = loadable(() => import("./PostCard"));
