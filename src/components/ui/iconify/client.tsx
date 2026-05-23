"use client";
import * as React from "react";
import { cx } from "../../../utils/styles";

export interface IconifyProps {
  icon: string;
  className?: string;
}

export const Iconify: React.FC<IconifyProps> = (props) => {
  if (props.icon.startsWith("svg:")) {
    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- Supports the raw SVG icon form accepted by this component.
    return <svg width="1.1rem" height="1.1rem" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: props.icon.substring(4) }} className={cx("iconify", props.className)} />;
  }
  return <span className={cx("iconify", props.icon, props.className)} />;
};
