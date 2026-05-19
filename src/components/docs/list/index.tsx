import * as React from "react";
import { ReactElement } from "react";
import { cx } from "../../../utils/styles";

export interface ListProps {
  type: "ordered" | "unordered";
  direction?: "default" | "horizontal" | "vertical";
  children: ReactElement[];
}

const containerClassName = "ps-8 [&_li]:my-2 [&_p:last-of-type]:my-0";
const horizontalClassName = "m-0 flex list-none flex-row flex-wrap gap-x-3 gap-y-2 p-0";
const verticalClassName = "m-0 flex list-none flex-col flex-wrap gap-x-3 gap-y-2 p-0";

export const List: React.FC<ListProps> = (props) => {
  if (props.type === "ordered") {
    return (
      <ol
        className={cx(
          containerClassName,
          props.direction === "horizontal" && horizontalClassName,
          props.direction === "vertical" && verticalClassName,
        )}
      >
        {props.children.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  } else {
    return (
      <ul
        className={cx(
          containerClassName,
          props.direction === "horizontal" && horizontalClassName,
          props.direction === "vertical" && verticalClassName,
        )}
      >
        {props.children.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
};
