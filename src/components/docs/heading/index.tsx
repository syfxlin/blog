import * as React from "react";
import { JSX, ReactNode } from "react";
import { cx } from "../../../utils/class-name";

export interface HeadingProps {
  name: string;
  slug: string;
  link: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

const sizeClassNames = {
  1: "text-[1.8rem] [&>a]:before:content-['H1']",
  2: "text-[1.5rem] [&>a]:before:content-['H2']",
  3: "text-[1.3rem] [&>a]:before:content-['H3']",
  4: "text-[1.1rem] [&>a]:before:content-['H4']",
  5: "text-[0.9rem] [&>a]:before:content-['H5']",
  6: "text-[0.7rem] [&>a]:before:content-['H6']",
};

export const Heading: React.FC<HeadingProps> = (props) => {
  const Component: keyof JSX.IntrinsicElements = `h${props.level}`;
  return (
    <Component
      id={props.slug}
      className={cx(
        "relative mt-5 mb-3 border-b border-dashed border-background-focus pb-1 font-normal before:absolute before:bottom-[-1px] before:left-0 before:z-[1] before:block before:h-[2.5px] before:w-8 before:rounded before:bg-[linear-gradient(var(--color-text-primary)_30%,var(--color-text-primary)_70%)] before:shadow-[var(--color-text-primary)_0_1px_3px] before:transition-all before:duration-[250ms] before:content-[''] hover:[&>a]:opacity-100 [&>a]:absolute [&>a]:top-0 [&>a]:left-0 [&>a]:-translate-x-full [&>a]:border-0 [&>a]:pr-1 [&>a]:no-underline [&>a]:opacity-0 [&>a]:transition-[opacity,color,background-color] [&>a]:duration-300 [&>a]:before:pl-1 [&>a]:before:text-[0.5rem] [&>a]:before:text-text-description [&>a]:before:transition-[opacity,color,background-color] [&>a]:before:duration-300",
        sizeClassNames[props.level],
      )}
    >
      <a href={props.link} aria-label={`${props.name} permalink`} />
      {props.children}
    </Component>
  );
};
