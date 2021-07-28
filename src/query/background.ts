import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BackgroundData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusBackground: {
    images: {
      directus_files_id: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        id: string;
      };
    }[];
  };
};

export const query = graphql`
  query BackgroundQuery {
    directusBackground {
      images {
        directus_files_id {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          id
        }
      }
    }
  }
`;

export const convert = (data: QueryData): BackgroundData => {
  return data.directusBackground.images.map(
    (image) => image.directus_files_id.localFile.childImageSharp.gatsbyImageData
  );
};

export const useBackgroundData = () => convert(useStaticQuery(query));
