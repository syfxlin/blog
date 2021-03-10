import React, { useEffect, useRef, useState } from "react";
import Head, { HeadProps } from "../components/Head";
import Container from "./Container";
import NavMenu, { NavMenuItem } from "../components/NavMenu";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled, { useTheme } from "styled-components";
import classNames from "classnames";
import { usePrevious, useWindowScroll } from "react-use";
import StyledHeader from "./StyledHeader";
import loadable from "@loadable/component";

const Search = loadable(() => import("../components/Search"), { ssr: false });

type Props = HeadProps;

type QueryProps = {
  site: {
    siteMetadata: {
      nav: NavMenuItem[];
    };
  };
};

const Header: React.FC<Props> = ({ children, ...props }) => {
  const [active, setActive] = useState(false);
  const { site } = useStaticQuery<QueryProps>(graphql`
    query HeadQuery {
      site {
        siteMetadata {
          nav {
            title
            url
            sub {
              title
              url
            }
          }
        }
      }
    }
  `);
  const ref = useRef<HTMLElement>(null);
  const currY = useWindowScroll().y;
  const prevY = usePrevious(currY);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const state = currY > (prevY || 0);
    if (state !== sticky) setSticky(state);
  }, [currY]);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <Head {...props} />
      <StyledHeader sticky={!active && sticky} ref={ref}>
        <Container className={`navbar`}>
          <section className={"navbar-section"}>
            <Icon to={"/"}>
              <img
                src="https://cdn.jsdelivr.net/gh/syfxlin/pic/blog/icon.png"
                alt="Site Logo"
              />
            </Icon>
          </section>
          <NavbarSection>
            <NavMenu
              menu={site.siteMetadata.nav}
              root={true}
              className={classNames({ active })}
            />
            <Button onClick={() => setShowSearch(true)}>
              <SearchIcon />
            </Button>
            <MobileButton
              className={classNames({ active })}
              onClick={() => setActive(!active)}
            >
              <span />
              <span />
              <span />
              <span />
            </MobileButton>
          </NavbarSection>
        </Container>
      </StyledHeader>
      <Search show={showSearch} onClose={() => setShowSearch(false)} />
      {children}
    </>
  );
};

const NavbarSection = styled.section.attrs(() => ({
  className: "navbar-section"
}))`
  @media (max-width: 840px) {
    margin-right: 2rem;
  }
`;

const Icon = styled(Link)`
  display: flex;
  align-items: center;
`;

const MobileButton = styled.div`
  width: 1.2rem;
  height: 1rem;
  margin: 0 0.4rem;
  cursor: pointer;
  transform: rotate(0);
  transition: 0.5s ease-in-out;
  display: none;

  @media (max-width: 840px) {
    display: block;
    position: absolute;
    right: 10px;
    transition: right 0.5s;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
    opacity: 1;
    left: 0;
    border-radius: 2px;
    transform: rotate(0);
    transition: 0.5s ease-in-out;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 8px;
    }

    &:nth-child(4) {
      top: 16px;
    }
  }

  &.active {
    position: absolute;
    right: 70%;

    span {
      &:nth-child(1),
      &:nth-child(4) {
        top: 10px;
        width: 0;
        left: 50%;
      }

      &:nth-child(2) {
        transform: rotate(45deg);
      }

      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
`;

const Button = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0 0 0.4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    height: 100%;
    width: 100%;
  }
`;

const SearchIcon = () => {
  const theme = useTheme() as any;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
        fill="none"
        stroke={theme.primary}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M26.6568 14.3431C25.2091 12.8954 23.2091 12 21 12C18.7909 12 16.7909 12.8954 15.3431 14.3431"
        stroke={theme.primary}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M33.2218 33.2218L41.7071 41.7071"
        stroke={theme.primary}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Header;
