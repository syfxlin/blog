import React, { useMemo } from "react";
import { useU } from "@syfxlin/ustyled";
import { useFooterData } from "../queries/footer";
import { vars } from "../utils/vars";
import { css } from "@emotion/react";

export type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  const { u } = useU();
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
        max-width: ${u.fs(45)};
        margin: 0 auto;
        padding: ${u.sp(5)} ${u.sp(8)};
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        p,
        span,
        a {
          margin: ${u.sp(0.25)};
          color: ${u.c("gray6")};
          font-size: ${u.fs(0.875)};
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
