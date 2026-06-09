import * as React from "react";
import { ReactNode } from "react";
import { Iconify } from "../../ui/iconify";
import { Link as ULink } from "../../ui/link";

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
      <ULink href={pair[1]} className="inline-flex items-center gap-1 [&_.iconify]:h-[1em] [&_.iconify]:w-[1em] [&+&]:ml-1">
        <Iconify icon={pair[0]} />
        {props.children}
      </ULink>
    );
  }
};
