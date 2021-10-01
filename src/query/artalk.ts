import { ArtalkData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  artalkJson: {
    serverUrl: string;
  };
};

export const query = graphql`
  query ArtalkQuery {
    artalkJson {
      serverUrl
    }
  }
`;

export const convert = (data: QueryData): ArtalkData => {
  return data.artalkJson;
};

export const useArtalkData = () => convert(useStaticQuery(query));
