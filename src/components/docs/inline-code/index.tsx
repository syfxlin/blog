import * as React from "react";
import { ReactNode } from "react";

export interface InlineCodeProps {
  children: ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = (props) => {
  return <code className="rounded-[0.2rem] bg-error-background px-[0.24rem] py-[0.12rem] font-mono text-[0.86rem] break-all text-error-text">{props.children}</code>;
};
