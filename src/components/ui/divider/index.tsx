"use client";
import * as React from "react";

export interface DividerProps {
  orientation: "vertical" | "horizontal";
}

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const span = <span className="mx-2 inline-block h-[0.2rem] w-[0.2rem] rounded-full bg-text-paragraph/70 text-center align-middle" />;
  return orientation === "vertical" ?
      (
        span
      ) :
      (
        <div>
          {span}
          {span}
          {span}
        </div>
      );
};
