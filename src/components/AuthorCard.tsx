import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import Card from "./Card";

type QueryProps = {
  site: {
    siteMetadata: {
      author: {
        name: string;
        avatar: string;
        image: string;
        introduction: string;
      };
    };
  };
};
const AuthorCard: React.FC<{ className?: string }> = ({ className }) => {
  const { site } = useStaticQuery<QueryProps>(graphql`
    query AuthorQuery {
      site {
        siteMetadata {
          author {
            name
            avatar
            image
            introduction
          }
        }
      }
    }
  `);
  return (
    <StyledCard className={className}>
      <Image
        style={{ backgroundImage: `url(${site.siteMetadata.author.image})` }}
      />
      <Avatar>
        <img src={site.siteMetadata.author.avatar} alt="Avatar" />
      </Avatar>
      <Introduction>
        <h5>{site.siteMetadata.author.name}</h5>
        {site.siteMetadata.author.introduction}
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

const Image = styled.div`
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

  img {
    border-radius: 50%;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 1;
  }
`;

const Introduction = styled.div`
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem 1.5rem 1.5rem;
  word-wrap: break-word;
  width: 100%;
`;

export default AuthorCard;
