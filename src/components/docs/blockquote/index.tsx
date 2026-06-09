import * as React from "react";
import { ReactNode } from "react";

export interface BlockquoteProps {
  children: ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = (props) => {
  return <blockquote className="ml-4 box-border border-l-[3px] border-text-primary py-2 pl-4 [&>*:first-child]:my-0 [&>*:last-child]:my-0">{props.children}</blockquote>;
};
