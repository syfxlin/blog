"use client";
import Tippy, { TippyProps } from "@tippyjs/react";
import NLink, { LinkProps as NLinkProps } from "next/link";
import * as React from "react";
import { AnchorHTMLAttributes, forwardRef, ReactElement } from "react";
import { cx } from "../../../utils/styles";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & NLinkProps & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};

const linkClassName = "bg-[linear-gradient(to_right,transparent,transparent),linear-gradient(to_right,var(--color-background-focus),var(--color-background-focus))] bg-[length:100%_40%,0_40%] bg-[position:100%_100%,0_100%] bg-no-repeat text-text-primary no-underline transition-[background-size,color,background-color] duration-300 hover:bg-[length:0_40%,100%_40%] focus:bg-[length:0_40%,100%_40%] active:bg-[length:0_40%,100%_40%] [&.active]:bg-[length:0_40%,100%_40%]";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ tooltip, unstyled, href, ...props }, ref) => {
  let element: ReactElement | undefined;
  if (typeof href === "string") {
    if (/^(?:https?:)?\/\/|\.[\da-z]+$/i.test(href)) {
      element = <a target="_blank" rel="nofollow noopener noreferrer" {...props} className={cx(!unstyled && linkClassName, props.className)} href={href} ref={ref} />;
    }
    if (href.startsWith("#")) {
      element = <a {...props} className={cx(!unstyled && linkClassName, props.className)} href={href} ref={ref} />;
    }
  }
  if (!element) {
    element = <NLink {...props} className={cx(!unstyled && linkClassName, props.className)} href={href} ref={ref} />;
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
