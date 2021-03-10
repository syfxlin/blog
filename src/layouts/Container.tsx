import React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1560px) {
    max-width: 1400px;
  }
`;

export default Container;
