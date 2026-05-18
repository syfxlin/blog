"use client";
import Tippy, { TippyProps } from "@tippyjs/react";
import NLink, { LinkProps as NLinkProps } from "next/link";
import * as React from "react";
import { AnchorHTMLAttributes, forwardRef, ReactElement } from "react";
import { cx } from "../../../utils/class-name";
import styles from "./styles.module.css";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & NLinkProps & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ tooltip, unstyled, href, ...props }, ref) => {
  let element: ReactElement | undefined;
  if (typeof href === "string") {
    if (/^(?:https?:)?\/\/|\.[\da-z]+$/i.test(href)) {
      element = <a target="_blank" rel="nofollow noopener noreferrer" {...props} className={cx(props.className, !unstyled && styles.link)} href={href} ref={ref} />;
    }
    if (href.startsWith("#")) {
      element = <a {...props} className={cx(props.className, !unstyled && styles.link)} href={href} ref={ref} />;
    }
  }
  if (!element) {
    element = <NLink {...props} className={cx(props.className, !unstyled && styles.link)} href={href} ref={ref} />;
  }
  return tooltip ?
      (
        <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
          {element}
        </Tippy>
      ) :
      (
        element
      );
});
