import React, { useMemo } from "react";
import { useU } from "@syfxlin/ustyled";

export type ExpireNotifyProps = {
  date: string;
};

export const ExpireNotify: React.FC<ExpireNotifyProps> = ({ date }) => {
  const { css } = useU();

  const day = useMemo(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = new Date();
    const last = new Date(date);
    return Math.round(Math.abs((now.getTime() - last.getTime()) / oneDay));
  }, [date]);

  return (
    <>
      {day >= 180 && (
        <section
          css={css`
            background-color: .c(yellow3_3);
            color: .c(yellow6);
            padding: .sp(5) .sp(6);
            margin-top: .sp(4);
            font-size: .fs(0.9);
          `}
        >
          本文最后更新于 {day} 天前，文中所描述的信息可能已发生改变
        </section>
      )}
    </>
  );
};
