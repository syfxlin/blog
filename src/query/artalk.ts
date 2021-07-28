import { ArtalkData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  directusConfig: {
    value?: {
      serverUrl: string;
    };
  };
};

export const query = graphql`
  query ArtalkQuery {
    directusConfig(key: { eq: "artalk" }) {
      value
    }
  }
`;

export const convert = (data: QueryData): ArtalkData => {
  return data.directusConfig.value;
};

export const useArtalkData = () => convert(useStaticQuery(query));
