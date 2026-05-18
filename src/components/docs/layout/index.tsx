import * as React from "react";
import { ReactElement } from "react";
import styles from "./styles.module.css";

export interface LayoutProps {
  layout: [number, ...number[]];
  children: ReactElement[];
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={styles.container} style={{ gridTemplateColumns: props.layout.map(i => `${i}fr`).join(" ") }}>
      {props.children.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
