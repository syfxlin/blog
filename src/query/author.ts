import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { AuthorData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  authorJson: {
    firstName: string;
    lastName: string;
    description: string;
    avatar: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    background: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
};

export const query = graphql`
  query AuthorQuery {
    authorJson {
      firstName
      lastName
      description
      avatar {
        childImageSharp {
          gatsbyImageData
        }
      }
      background {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export const convert = (data: QueryData): AuthorData => {
  return {
    firstName: data.authorJson.firstName,
    lastName: data.authorJson.lastName,
    description: data.authorJson.description,
    avatar: data.authorJson.avatar.childImageSharp.gatsbyImageData,
    background: data.authorJson.background.childImageSharp.gatsbyImageData
  };
};

export const useAuthorData = () => convert(useStaticQuery(query));
