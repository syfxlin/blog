import * as React from "react";
import { ReactNode } from "react";

export interface GridProps {
  children: ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <section className="flex flex-wrap justify-center gap-2 max-xl:m-0 [&>*]:w-[calc((100%-1rem)/3)] max-xl:[&>*]:w-[calc((100%-0.5rem)/2)] max-sm:[&>*]:w-full">{children}</section>;
};
