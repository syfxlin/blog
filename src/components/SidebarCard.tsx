import React from "react";
import styled from "styled-components";
import { hsl, parseToHsl, rgba } from "polished";
import Card from "./Card";

type Props = {
  className?: string;
  title: string;
};

const SidebarCard: React.FC<Props> = ({ title, className, children }) => {
  return (
    <StyledCard className={className}>
      <h3>{title}</h3>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  margin-top: 1rem;
  font-size: 0.75rem;

  h3 {
    font-size: 0.9rem;
    position: relative;
    padding-bottom: 0.4rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      display: block;
      width: 2rem;
      height: 0.15rem;
      background: ${({ theme }) => {
        const h = parseToHsl(theme.primary);
        return `linear-gradient(
          ${hsl(h.hue, h.saturation, h.lightness + 0.1)} 30%,
          ${hsl(h)} 70%
        )`;
      }};
      box-shadow: 0 3px 3px ${({ theme }) => rgba(theme.primary, 0.4)};
      border-radius: 4px;
      transition: 0.25s;
      z-index: 1;
    }
  }

  ul {
    list-style: none;
    margin-bottom: 0;
  }

  > ul {
    margin-left: 0;
  }

  a {
    color: ${({ theme }) => rgba(theme.text, 0.9)};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export default SidebarCard;
