import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useAuthorData } from "../query";
import { GatsbyImage } from "gatsby-plugin-image";
import { BgImage } from "gbimage-bridge";

const AuthorCard: React.FC<{ className?: string }> = ({ className }) => {
  const data = useAuthorData();
  return (
    <StyledCard className={className}>
      <CardImage image={data.background} />
      <Avatar>
        <AvatarImage alt={"Avatar"} image={data.avatar} />
      </Avatar>
      <Introduction>
        <h5>
          {data.firstName} {data.lastName}
        </h5>
        {data.description}
      </Introduction>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const CardImage = styled(BgImage)`
  height: 6rem;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Avatar = styled.div`
  margin-top: -2rem;
  height: 4rem;
  width: 4rem;
`;

const AvatarImage = styled(GatsbyImage)`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Introduction = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem 1.5rem 1.5rem;
  word-wrap: break-word;
  width: 100%;
`;

export default AuthorCard;
