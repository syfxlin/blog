import React from "react";
import styled from "styled-components";
import Card from "./Card";

type Props = {
  name: string;
  url: string;
  avatar: string;
  bio?: string;
  author?: string;
};

const FriendCard: React.FC<Props> = ({ name, url, avatar, bio, author }) => {
  return (
    <StyledCard>
      <Link href={url} target={"_blank"} rel={"noreferrer"}>
        <Avatar>
          <img src={avatar} />
        </Avatar>
        <Info>
          <Name>{name}</Name>
          <Author>{author ? author : <span>&nbsp;</span>}</Author>
          <Bio>{bio || "No Note"}</Bio>
        </Info>
      </Link>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  padding: 1rem 1.3rem;
  margin-top: 0;
`;

const Link = styled.a`
  display: flex;
`;

const Avatar = styled.div`
  width: 25%;
  margin-right: 1rem;
  display: flex;
  align-items: center;

  img {
    margin-bottom: 0 !important;
  }
`;

const Info = styled.div`
  width: 75%;
`;

const Name = styled.div`
  font-size: 0.9rem;
`;

const Author = styled.div`
  font-size: 0.5rem;
`;

const Bio = styled.div`
  font-size: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default FriendCard;
