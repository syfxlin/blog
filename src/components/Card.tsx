import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

type Props = {
  className?: string;
};

const Card: React.FC<Props> = ({ className, children }) => {
  return <StyledCard className={className}>{children}</StyledCard>;
};

const StyledCard = styled.div`
  margin-top: 1.3rem;
  padding: 1.3rem 1.5rem;
  background-color: ${({ theme }) => rgba(theme.background, 0.7)};
  box-shadow: 0 1px 20px -6px ${({ theme }) => theme.shadow};

  @media (max-width: 840px) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.7rem;
  }
`;

export default Card;
