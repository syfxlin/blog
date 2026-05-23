import * as React from "react";
import { cx } from "../../../utils/styles";
import { iconify } from "./query";

export interface IconifyProps {
  icon: string;
  className?: string;
}

export const Iconify: React.FC<IconifyProps> = async (props) => {
  if (props.icon.startsWith("svg:")) {
    // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- Supports the raw SVG icon form accepted by this component.
    return <svg width="1.1rem" height="1.1rem" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: props.icon.substring(4) }} className={cx("iconify", props.className)} />;
  }
  const { attributes, body } = iconify.svg(props.icon);
  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- Iconify generates the icon markup from bundled data.
  return <svg {...attributes} dangerouslySetInnerHTML={{ __html: body }} className={cx("iconify", props.className)} />;
};
