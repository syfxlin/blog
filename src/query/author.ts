import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { AuthorData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusSystem: {
    users_me: {
      first_name: string;
      last_name: string;
      avatar: {
        id: string;
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
      description: string;
    };
  };
};

export const query = graphql`
  query AuthorQuery {
    directusSystem {
      users_me {
        first_name
        last_name
        avatar {
          id
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        description
      }
    }
  }
`;

export const convert = (data: QueryData): AuthorData => {
  return {
    firstName: data.directusSystem.users_me.first_name,
    lastName: data.directusSystem.users_me.last_name,
    avatar:
      data.directusSystem.users_me.avatar.localFile.childImageSharp
        .gatsbyImageData,
    description: data.directusSystem.users_me.description
  };
};

export const useAuthorData = () => convert(useStaticQuery(query));
