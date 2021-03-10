import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "gatsby";

export type NavMenuItem = {
  url: string;
  title: string;
  sub?: {
    title: string;
    url: string;
  }[];
};

type Props = {
  k?: string;
  root?: boolean;
  menu?: NavMenuItem[];
  className?: string;
};

const NavMenu: React.FC<Props> = ({ className, root, menu, k }) => {
  const Menu = root ? StyledNavMenu : StyledSubMenu;
  return (
    <Menu className={className}>
      {menu?.map((item, i) => (
        <StyledMenuItem key={`${k || "nav"}-${i}`}>
          {item.url.startsWith("/") ? (
            <Link to={item.url}>
              {item.title}{" "}
              {root && item.sub && item.sub.length > 0 && (
                <span className="icon icon-arrow-down" />
              )}
            </Link>
          ) : (
            <a href={item.url}>
              {item.title}{" "}
              {root && item.sub && item.sub.length > 0 && (
                <span className="icon icon-arrow-down" />
              )}
            </a>
          )}
          {root && item.sub && item.sub.length > 0 && (
            <NavMenu menu={item.sub} k={`${k || "nav"}-${i}`} />
          )}
        </StyledMenuItem>
      ))}
    </Menu>
  );
};

const StyledNavMenu = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  transition: right 0.5s;

  @media (max-width: 840px) {
    position: fixed;
    top: 0;
    right: -70%;
    height: 100vh;
    width: 70vw;
    overflow-y: auto;
    background: ${({ theme }) => rgba(theme.background, 0.9)};
    margin: 0;
    flex-direction: column;
    align-items: start;
    z-index: 1000;
    padding: 0.5rem 0.3rem;

    &.active {
      box-shadow: 0 0.067em 1.2em ${({ theme }) => theme.shadow};
      right: 0;
    }
  }
`;

const StyledSubMenu = styled.ul`
  border-radius: 0.1rem;
  list-style: none;
  transition: all 0.35s;
  position: absolute;
  z-index: 1000;
  top: 3.5rem;
  opacity: 0;
  visibility: hidden;
  min-width: 10rem;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 0.067em 1.2em ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.background};

  @media (max-width: 840px) {
    position: relative;
    box-shadow: none !important;
    background-color: unset !important;
    visibility: visible;
    opacity: 1;
    top: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 1.3rem !important;
    padding-left: 0.6rem !important;
    border-left: 1px solid ${({ theme }) => rgba(theme.divider, 0.2)};
  }

  ul {
    margin-top: 0;
    margin-left: 3rem;
  }

  li {
    position: relative;

    &:hover a {
      color: ${({ theme }) => theme.primary};
    }

    a {
      font-size: 0.6rem;
      padding: 0.3rem 0;
      height: unset;
      color: ${({ theme }) => rgba(theme.text, 0.9)};
    }
  }
`;

const StyledMenuItem = styled.li`
  margin: 0;
  border-radius: 0.1rem;

  a {
    border-radius: 0.1rem;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    height: 1.8rem;
    line-height: 1.2rem;
    outline: 0;
    padding: 0.25rem 0.8rem;
    text-align: center;
    text-decoration: none;
    transition: border 0.2s, box-shadow 0.2s, color 0.2s;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:focus {
      box-shadow: none;
    }
  }

  @media (min-width: 841px) {
    &:hover ul {
      visibility: visible;
      opacity: 1;
      top: 2.2rem;
    }
  }

  @media (max-width: 840px) {
    width: 100%;

    a {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export default NavMenu;
