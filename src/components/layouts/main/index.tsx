import * as React from "react";
import { PropsWithChildren } from "react";
import { cx } from "../../../utils/styles";

export type MainProps = PropsWithChildren<{
  size?: "sm" | "md" | "lg";
}>;

const sizeClassNames = {
  sm: "max-w-[768px]",
  md: "max-w-[1024px] max-xl:max-w-[768px]",
  lg: "max-w-[1280px] max-2xl:max-w-[1024px] max-xl:max-w-[768px]",
};

export const Main: React.FC<MainProps> = ({ size, children }) => {
  return (
    <main className={cx("relative mt-[100px] mr-auto ml-auto w-full flex-1 px-8 animate-[fade-in_0.5s_ease]", sizeClassNames[size ?? "sm"])}>
      {children}
    </main>
  );
};
