import * as React from "react";
import { ReactElement } from "react";
import { cx } from "../../../utils/styles";

export interface ListProps {
  type: "ordered" | "unordered";
  direction?: "default" | "horizontal" | "vertical";
  children: ReactElement[];
}

const containerClassName = "ps-8 [&_li]:my-2 [&_p:last-of-type]:my-0";
const orderedClassName = "list-decimal";
const unorderedClassName = "list-disc";
const horizontalClassName = "m-0 flex list-none flex-row flex-wrap gap-x-3 gap-y-2 p-0";
const verticalClassName = "m-0 flex flex-col flex-wrap gap-x-3 gap-y-2";

export const List: React.FC<ListProps> = (props) => {
  if (props.type === "ordered") {
    return (
      <ol
        className={cx(
          containerClassName,
          orderedClassName,
          props.direction === "horizontal" && horizontalClassName,
          props.direction === "vertical" && verticalClassName,
        )}
      >
        {props.children.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key -- Document list items are positional.
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  } else {
    return (
      <ul
        className={cx(
          containerClassName,
          unorderedClassName,
          props.direction === "horizontal" && horizontalClassName,
          props.direction === "vertical" && verticalClassName,
        )}
      >
        {props.children.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key -- Document list items are positional.
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
};
