import React, { useMemo } from "react";
import { useU } from "@syfxlin/ustyled";
import { useFooterData } from "../queries/footer";
import { vars } from "../utils/vars";

export type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  const { css } = useU();
  const footer = useFooterData();

  const html = useMemo(
    () =>
      vars(footer, {
        year: () => String(new Date().getFullYear()),
      }),
    [footer]
  );
  return (
    <footer
      css={css`
        position: relative;
        max-width: .fs(45);
        margin: 0 auto;
        padding: .sp(5) .sp(8);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        p,
        span,
        a {
          margin: .sp(0.25);
          color: .c(gray6);
          font-size: .fs(0.875);
        }
      `}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        This page designed and built with by{" "}
        <a href="https://ixk.me">Otstar Lin</a> in 2022
      </p>
    </footer>
  );
};
