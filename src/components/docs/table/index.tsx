import * as React from "react";
import { ReactNode } from "react";

export interface TableProps {
  head?: Array<{
    children: ReactNode;
    colSpan?: number;
    rowSpan?: number;
  }>;
  body: Array<
    Array<{
      children: ReactNode;
      colSpan?: number;
      rowSpan?: number;
    }>
  >;
}

export const Table: React.FC<TableProps> = ({ head, body }) => {
  return (
    <table className="w-full caption-top border-collapse [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_thead]:bg-background-hover [&_tr]:border-y [&_tr]:border-text-description">
      {head && (
        <thead>
          <tr>
            {head.map((x, i) => (
              <th key={i} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                {x.children}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {body.map((row, i) => (
          <tr key={i}>
            {row.map((x, j) => (
              <td key={j} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                {x.children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
