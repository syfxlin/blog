import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { GatsbyImage } from "gatsby-plugin-image";

type Props = {
  name: string;
  url: string;
  avatar: IGatsbyImageData;
  bio?: string;
  author?: string;
};

const FriendCard: React.FC<Props> = ({ name, url, avatar, bio, author }) => {
  return (
    <StyledCard>
      <Link href={url} target={"_blank"} rel={"noreferrer"}>
        <Avatar>
          <GatsbyImage alt={name} image={avatar} color={"transparent"} />
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
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;

  img {
    margin-bottom: 0 !important;
    width: 5rem;
    height: 5rem;
  }
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Name = styled.div`
  font-size: 0.9rem;
`;

const Author = styled.div`
  font-size: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Bio = styled.div`
  font-size: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
`;

export default FriendCard;
