import { ArtalkData } from "./types";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  artalkJson: {
    server: string;
    site: string;
  };
};

export const query = graphql`
  query ArtalkQuery {
    artalkJson {
      server
      site
    }
  }
`;

export const convert = (data: QueryData): ArtalkData => {
  return data.artalkJson;
};

export const useArtalkData = () => convert(useStaticQuery(query));
