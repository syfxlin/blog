import katex from "katex";
import * as React from "react";
import "katex/dist/katex.css";

export interface KatexProps {
  math: string;
}

export const Katex: React.FC<KatexProps> = React.memo((props) => {
  const html = katex.renderToString(props.math, { throwOnError: false });
  return <span className="my-4 flex w-full items-center justify-center" dangerouslySetInnerHTML={{ __html: html }} />;
});
