import * as React from "react";
import { ReactElement } from "react";

export interface LayoutProps {
  layout: [number, ...number[]];
  children: ReactElement[];
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="my-4 grid gap-2 [&>div>*]:my-0" style={{ gridTemplateColumns: props.layout.map(i => `${i}fr`).join(" ") }}>
      {props.children.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
