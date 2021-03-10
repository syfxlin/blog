import React, { useMemo } from "react";
import Container from "./Container";
import styled from "styled-components";
import { useInterval } from "react-use";
import { rgba } from "polished";
import { graphql, useStaticQuery } from "gatsby";

type Props = {
  copyright?: string;
  align?: "left" | "center" | "right";
};

const processVar = (name: string, value?: string) => {
  switch (name) {
    case "face":
      return `<span class="my-face">${value ? value : "(●'◡'●)ﾉ"}</span>`;
    case "date":
      return `<span data-start="${value}"></span>`;
    case "year":
      return `${new Date().getFullYear()}`;
  }
  return "";
};

const convert = (str?: string) => {
  if (!str) {
    return null;
  }
  const regexp = /{([^:}]+):?([^}]*)}/g;
  let match;
  do {
    match = regexp.exec(str);
    if (match) {
      str = str.replace(
        match[0],
        processVar(match[1], match.length > 2 ? match[2] : undefined)
      );
    }
  } while (match);
  return str;
};

const Footer: React.FC<Props> = ({ align }) => {
  const { site } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          footer
        }
      }
    }
  `);
  const copyright = site.siteMetadata.footer;
  const html = useMemo(() => convert(copyright), [site]);
  useInterval(() => {
    const element = document.querySelector("span[data-start]");
    if (element) {
      const now = new Date() as any;
      const grt = new Date(element.getAttribute("data-start") as string) as any;
      now.setTime(now.getTime() + 250);
      const days = (now - grt) / 1000 / 60 / 60 / 24;
      const dnum = Math.floor(days);
      const hours = (now - grt) / 1000 / 60 / 60 - 24 * dnum;
      let hnum = Math.floor(hours) as any;
      if (String(hnum).length == 1) {
        hnum = "0" + hnum;
      }
      const minutes = (now - grt) / 1000 / 60 - 24 * 60 * dnum - 60 * hnum;
      let mnum = Math.floor(minutes) as any;
      if (String(mnum).length == 1) {
        mnum = "0" + mnum;
      }
      const seconds =
        (now - grt) / 1000 - 24 * 60 * 60 * dnum - 60 * 60 * hnum - 60 * mnum;
      let snum = Math.round(seconds) as any;
      if (String(snum).length == 1) {
        snum = "0" + snum;
      }
      element.innerHTML = `${dnum}天${hnum}小时${mnum}分${snum}秒`;
    }
  }, 1000);
  return (
    <StyledFooter align={align}>
      <Copyright>
        {copyright && (
          <>
            <span dangerouslySetInnerHTML={{ __html: html || "" }} />
            <br />
          </>
        )}
        <span>
          Theme - <a href="https://blog.ixk.me/theme-origami.html">Origami</a>{" "}
          By <a href="https://www.ixk.me">Otstar Lin</a>
        </span>
      </Copyright>
    </StyledFooter>
  );
};

const StyledFooter = styled(Container).attrs(() => ({
  className: "columns"
}))<{ align?: "left" | "center" | "right" }>`
  justify-content: ${({ align }) => {
    if (align === "left") {
      return `flex-start`;
    } else if (align === "center") {
      return `center`;
    } else {
      return `flex-end`;
    }
  }};
`;

const Copyright = styled.section.attrs(() => ({
  className: "col-4 col-sm-12"
}))`
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1.3rem;
  font-size: 0.6rem;
  color: ${({ theme }) => rgba(theme.text, 0.7)};

  a {
    color: ${({ theme }) => rgba(theme.text, 0.7)};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

export default Footer;
