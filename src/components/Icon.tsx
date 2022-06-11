import React, { SVGAttributes } from "react";

export type IconProps = SVGAttributes<SVGElement> & {
  data: string;
};

export const Icon: React.FC<IconProps> = ({ data, ...props }) => {
  return (
    <span className="i-icon">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        fill="none"
        {...props}
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    </span>
  );
};
