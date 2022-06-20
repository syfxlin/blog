import loadable from "@loadable/component";
import Wrapper from "./Wrapper";

export const wrapper = Wrapper;
export const pre = loadable(() => import("./CodeBlock"));
export const message = loadable(() => import("./MessageBox"));
