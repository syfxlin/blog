import * as React from "react";
import { ReactNode } from "react";

export interface TitleProps {
  title: ReactNode;
  children: ReactNode;
}

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <section className="mb-8 pt-6 text-center">
      <h1 className="m-0 text-[1.8rem] leading-normal font-normal text-text-title">{props.title}</h1>
      {props.children && <div className="m-0 text-[0.8rem] leading-normal font-normal text-text-description">{props.children}</div>}
    </section>
  );
};
