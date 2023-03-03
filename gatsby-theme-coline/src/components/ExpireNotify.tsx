import React, { useMemo } from "react";
import { useU } from "@syfxlin/ustyled";
import { css } from "@emotion/react";

export type ExpireNotifyProps = {
  date: string;
};

export const ExpireNotify: React.FC<ExpireNotifyProps> = ({ date }) => {
  const { u } = useU();

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
            background-color: ${u.c("yellow2,3", "yellow4,3")};
            color: ${u.c("yellow6")};
            padding: ${u.sp(5)} ${u.sp(6)};
            margin-top: ${u.sp(4)};
            font-size: ${u.fs(0.9)};
          `}
        >
          本文最后更新于 {day} 天前，文中所描述的信息可能已发生改变
        </section>
      )}
    </>
  );
};
