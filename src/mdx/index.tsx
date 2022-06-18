import React from "react";
import cx from "classnames";
import { CodeBlock } from "./CodeBlock";

export const wrapper: React.FC<any> = (props) => {
  return (
    <section {...props} className={cx(props.className, "han-init-context")}>
      {props.children}
    </section>
  );
};

export const pre = CodeBlock;
