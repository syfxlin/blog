import React from "react";
import styled from "styled-components";
import Card from "./Card";

const TwitterCard: React.FC = () => {
  return (
    <StyledCard>
      <iframe src={"/twitter.html"} frameBorder={0} />
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  display: flex;

  iframe {
    flex: 1;
    width: 100%;
    height: 400px;
    margin: 0 -0.7rem;
  }
`;

export default TwitterCard;
