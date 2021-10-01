import { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import { BackgroundData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  backgroundJson: {
    global: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    }[];
  };
};

export const query = graphql`
  query BackgroundQuery {
    backgroundJson {
      global {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export const convert = (data: QueryData): BackgroundData => {
  return data.backgroundJson.global.map(
    (image) => image.childImageSharp.gatsbyImageData
  );
};

export const useBackgroundData = () => convert(useStaticQuery(query));
