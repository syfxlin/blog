"use client";
import Tippy, { TippyProps } from "@tippyjs/react";
import Link, { LinkProps } from "next/link";
import * as React from "react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { cx } from "../../../utils/styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};

const buttonClassName = "inline-flex appearance-none items-center justify-center gap-1 rounded-[0.25rem] border-0 bg-transparent px-2.5 py-2 text-center align-middle text-base leading-none text-text-primary no-underline outline-none transition-[color,background-color,box-shadow] duration-300 [font:inherit] hover:bg-background-hover focus:shadow-[0_0_0_2px_var(--color-background-focus)] active:shadow-[0_0_0_2px_var(--color-background-focus)] [&.active]:bg-background-hover [&>.iconify]:mx-[-0.1rem] [&>.iconify]:h-[1.1rem] [&>.iconify]:w-[1.1rem]";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ tooltip, unstyled, ...props }, ref) => {
  const element = <button {...props} className={cx(!unstyled && buttonClassName, props.className)} ref={ref} />;
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

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ tooltip, unstyled, href, ...props }, ref) => {
    if (typeof href === "string" && /^(?:https?:)?\/\/|^#|\.[\da-z]+$/i.test(href)) {
      const element = (
        <a {...props} className={cx(!unstyled && buttonClassName, props.className)} href={href} ref={ref} />
      );
      return tooltip ?
          (
            <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
              {element}
            </Tippy>
          ) :
          (
            element
          );
    } else {
      const element = (
        <Link {...props} className={cx(!unstyled && buttonClassName, props.className)} href={href} ref={ref} />
      );
      return tooltip ?
          (
            <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
              {element}
            </Tippy>
          ) :
          (
            element
          );
    }
  },
);
