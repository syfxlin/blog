import katex from "katex";
import * as React from "react";
import styles from "./styles.module.css";
import "katex/dist/katex.css";

export interface KatexProps {
  math: string;
}

export const Katex: React.FC<KatexProps> = React.memo((props) => {
  const html = katex.renderToString(props.math, { throwOnError: false });
  return <span className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />;
});
