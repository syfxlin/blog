import * as React from "react";
import { JSX, ReactNode } from "react";
import styles from "./styles.module.css";

export interface HeadingProps {
  name: string;
  slug: string;
  link: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const Component: keyof JSX.IntrinsicElements = `h${props.level}`;
  return (
    <Component id={props.slug} className={styles.container}>
      <a href={props.link} aria-label={`${props.name} permalink`} />
      {props.children}
    </Component>
  );
};
