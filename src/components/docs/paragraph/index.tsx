import * as React from "react";
import { ReactNode } from "react";

export interface ParagraphProps {
  textAlign: "center" | "end" | undefined;
  children: ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <p className="my-4" style={{ textAlign: props.textAlign }}>
      {props.children}
    </p>
  );
};
