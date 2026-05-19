"use client";
import * as React from "react";

export const Articles: React.FC = React.memo(async () => {
  return (
    <ul className="ps-8 [&_li]:my-2 [&_p:last-of-type]:my-0">
      <li>Article 1</li>
      <li>Article 2</li>
      <li>Article 3</li>
    </ul>
  );
});
