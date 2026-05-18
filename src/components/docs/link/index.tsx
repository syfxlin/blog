import * as React from "react";
import { ReactNode } from "react";
import { Iconify } from "../../ui/iconify";
import { Link as ULink } from "../../ui/link";
import styles from "./styles.module.css";

export interface LinkProps {
  href: string;
  children: ReactNode;
}

export const Link: React.FC<LinkProps> = (props) => {
  const pair = props.href.split("$$");
  if (pair.length <= 1) {
    return (
      <ULink href={props.href}>
        {props.children}
      </ULink>
    );
  } else {
    return (
      <ULink href={pair[1]} className={styles.link}>
        <Iconify icon={pair[0]} />
        {props.children}
      </ULink>
    );
  }
};
