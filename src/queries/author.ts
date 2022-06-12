import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export type AuthorData = {
  firstName: string;
  lastName: string;
  description: string;
  avatar: IGatsbyImageData;
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
    }
  }
`;

export const convert = (data: Queries.AuthorQueryQuery): AuthorData => {
  // prettier-ignore
  return {
    firstName: data.authorJson?.firstName as string,
    lastName: data.authorJson?.lastName as string,
    description: data.authorJson?.description as string,
    avatar: data.authorJson?.avatar?.childImageSharp?.gatsbyImageData as IGatsbyImageData,
  };
};

export const useAuthorData = () => convert(useStaticQuery(query));
